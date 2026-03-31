import { useEffect, useMemo, useRef, useState } from "react";
import type { FunnelDefinition } from "../../content/funnels";
import { captureEvent } from "../../../lib/posthog";
import { streamMarketingReply } from "../../lib/marketing-api";
import { ensureMarketingFonts } from "../../lib/pretext/font-loader";
import { buildMiraReply, createAssistantMessage, createUserMessage, initialGreeting, streamReply, type ChatMessage } from "../../lib/chat/mock-mira";
import MiraBubble from "./MiraBubble";
import TypingIndicator from "./TypingIndicator";
import UserBubble from "./UserBubble";

type ChatPanelProps = {
  segment: FunnelDefinition;
  open: boolean;
  onClose: () => void;
};

function bubbleMaxWidth() {
  if (typeof window === "undefined") return 320;
  return window.innerWidth < 768 ? Math.min(window.innerWidth - 92, 320) : 336;
}

export default function ChatPanel({ segment, open, onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [initialGreeting(segment)]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);
  const [maxWidth, setMaxWidth] = useState(() => bubbleMaxWidth());
  const [sessionId, setSessionId] = useState("");
  const threadRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    ensureMarketingFonts().then(() => setFontsReady(true));
    const onResize = () => setMaxWidth(bubbleMaxWidth());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const storageKey = `aibutler:mira-session:${segment.key}`;
    const existing = window.localStorage.getItem(storageKey);
    if (existing) {
      setSessionId(existing);
      return;
    }
    const next = `${segment.key}-${Math.random().toString(36).slice(2, 10)}`;
    window.localStorage.setItem(storageKey, next);
    setSessionId(next);
  }, [segment.key]);

  useEffect(() => {
    setMessages([initialGreeting(segment)]);
    setTyping(false);
    setInput("");
  }, [segment]);

  useEffect(() => {
    if (!open) return;
    captureEvent("marketing_chat_opened", {
      segment: segment.key,
      path: segment.path,
    });
  }, [open, segment.key, segment.path]);

  useEffect(() => {
    const node = threadRef.current;
    if (!node) return;
    node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const quickPrompts = useMemo(() => segment.chatPrompts.slice(0, 3), [segment.chatPrompts]);

  async function sendMessage(rawText: string) {
    const text = rawText.trim();
    if (!text) return;

    const userMessage = createUserMessage(text);
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTyping(true);
    captureEvent("marketing_chat_message_sent", {
      segment: segment.key,
      path: segment.path,
      prompt_length: text.length,
    });

    const replyText = buildMiraReply(segment, text);
    const assistantMessage = createAssistantMessage("");
    setMessages((prev) => [...prev, assistantMessage]);

    try {
      await streamMarketingReply(
        {
          segment: segment.key,
          sourcePath: segment.path,
          sessionId,
          message: text,
          history: [...messages, userMessage].map((message) => ({
            role: message.role,
            text: message.text,
          })),
        },
        {
          onToken: (partial) => {
            setTyping(false);
            setMessages((prev) =>
              prev.map((message) => (message.id === assistantMessage.id ? { ...message, text: partial } : message)),
            );
          },
          onDone: (payload) => {
            const nextSession = String(payload.session_id || "").trim();
            if (nextSession) {
              window.localStorage.setItem(`aibutler:mira-session:${segment.key}`, nextSession);
              setSessionId(nextSession);
            }
            captureEvent("marketing_chat_reply_completed", {
              segment: segment.key,
              path: segment.path,
            });
          },
        },
      );
      setTyping(false);
      return;
    } catch {
      await new Promise((resolve) => window.setTimeout(resolve, 320));
      setTyping(false);
    }

    for await (const partial of streamReply(replyText)) {
      setMessages((prev) =>
        prev.map((message) => (message.id === assistantMessage.id ? { ...message, text: partial } : message)),
      );
    }
  }

  if (!open) return null;

  return (
    <div className="marketing-chat-overlay" role="dialog" aria-modal="true" aria-label="Chat with Mira">
      <div className="marketing-chat-panel">
        <div className="marketing-chat-header">
          <div className="flex items-center gap-3">
            <div className="mira-orb mira-orb--small" />
            <div>
              <p className="marketing-chat-kicker">Mira</p>
              <p className="marketing-chat-status">{segment.audienceLabel}</p>
            </div>
          </div>
          <button type="button" className="marketing-icon-button" onClick={onClose}>
            Close
          </button>
        </div>

        <div ref={threadRef} className="marketing-chat-thread">
          {!fontsReady && (
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-[var(--marketing-cream-muted)]">
              Loading the type system so Mira’s words fit like they were set by hand.
            </div>
          )}

          {messages.map((message, index) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              {message.role === "assistant" ? (
                <MiraBubble text={message.text} maxWidth={maxWidth} isLatest={index === messages.length - 1} />
              ) : (
                <UserBubble text={message.text} maxWidth={Math.min(maxWidth, 280)} />
              )}
            </div>
          ))}

          {typing && <TypingIndicator />}
        </div>

        <div className="marketing-chat-prompts">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              className="marketing-chip-button"
              onClick={() => sendMessage(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>

        <form
          className="marketing-chat-inputbar"
          onSubmit={(event) => {
            event.preventDefault();
            void sendMessage(input);
          }}
        >
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="marketing-chat-input"
            placeholder="What brought you in?"
          />
          <button type="submit" className="marketing-primary-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
