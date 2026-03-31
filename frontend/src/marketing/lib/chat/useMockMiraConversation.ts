import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import { CHAT_AUDIENCE_ORDER, getAudienceConfig } from "./audiences";
import { asSeedThread, buildMockResponse, INITIAL_CHAT_STREAM, nextMessageId, streamTextTokens } from "./mock-stream";
import type { ChatAudienceConfig, ChatMessage, ChatStreamState, MiraAudience } from "./types";

type UseMockMiraConversationOptions = {
  initialAudience?: MiraAudience;
};

export function useMockMiraConversation(options: UseMockMiraConversationOptions = {}) {
  const [audience, setAudience] = useState<MiraAudience>(options.initialAudience ?? "new-visitor");
  const [messages, setMessages] = useState<ChatMessage[]>(() => asSeedThread(options.initialAudience ?? "new-visitor"));
  const [draft, setDraft] = useState("");
  const [stream, setStream] = useState<ChatStreamState>(INITIAL_CHAT_STREAM);
  const [sessionCounter, setSessionCounter] = useState(0);
  const cleanupRef = useRef<null | (() => void)>(null);

  const audienceConfig = useMemo<ChatAudienceConfig>(() => getAudienceConfig(audience), [audience]);

  useEffect(() => {
    setMessages(asSeedThread(audience));
    setDraft("");
    setStream(INITIAL_CHAT_STREAM);
    setSessionCounter(0);
    cleanupRef.current?.();
    cleanupRef.current = null;
  }, [audience]);

  useEffect(() => {
    return () => {
      cleanupRef.current?.();
    };
  }, []);

  function stopStream() {
    cleanupRef.current?.();
    cleanupRef.current = null;
  }

  function sendMessage(text: string) {
    const normalized = text.trim();
    if (!normalized) return;

    stopStream();

    const userMessage: ChatMessage = {
      id: nextMessageId("user", sessionCounter + 1),
      role: "user",
      text: normalized,
      createdAt: Date.now(),
      accent: "amber",
    };

    const snapshot = [...messages, userMessage];
    startTransition(() => {
      setMessages(snapshot);
      setDraft("");
      setStream({
        status: "connecting",
        draft: "",
        committedText: "",
        tokenCount: 0,
        lastUpdated: Date.now(),
      });
      setSessionCounter((value) => value + 1);
    });

    const response = buildMockResponse(audience, normalized, snapshot);
    const tokens: string[] = [];
    const pace = normalized.length > 48 ? 28 : 34;

    const startTimer = window.setTimeout(() => {
      setStream((current) => ({ ...current, status: "streaming", lastUpdated: Date.now() }));
      const cancelTokens = streamTextTokens(
        response,
        (chunk, index) => {
          tokens.push(chunk);
          setStream((current) => ({
            ...current,
            status: "streaming",
            draft: tokens.join(""),
            tokenCount: index + 1,
            lastUpdated: Date.now(),
          }));
        },
        () => {
          const finalText = tokens.join("").trim() || response;
          const miraMessage: ChatMessage = {
            id: nextMessageId("mira", sessionCounter + 2),
            role: "mira",
            text: finalText,
            createdAt: Date.now(),
            accent: "copper",
          };

          startTransition(() => {
            setMessages((current) => [...current, miraMessage]);
            setStream({
              status: "complete",
              draft: finalText,
              committedText: finalText,
              tokenCount: tokens.length,
              lastUpdated: Date.now(),
            });
          });
        },
        pace,
      );

      cleanupRef.current = () => {
        window.clearTimeout(startTimer);
        cancelTokens();
      };
    }, 380);

    cleanupRef.current = () => {
      window.clearTimeout(startTimer);
    };
  }

  function sendSuggestedPrompt() {
    sendMessage(audienceConfig.followUp);
  }

  function resetConversation(nextAudience: MiraAudience = audience) {
    stopStream();
    setAudience(nextAudience);
  }

  return {
    audience,
    audienceConfig,
    audienceOptions: CHAT_AUDIENCE_ORDER.map((id) => getAudienceConfig(id)),
    messages,
    draft,
    setDraft,
    sendMessage,
    sendSuggestedPrompt,
    stream,
    resetConversation,
    setAudience,
  };
}
