import { useRef } from "react";
import { useBubbleLayout } from "./BubbleLayout";
import type { ChatMessage } from "../../lib/chat";

type ChatBubbleProps = {
  message: ChatMessage;
  maxWidth: number;
};

export function ChatBubble({ message, maxWidth }: ChatBubbleProps) {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const layout = useBubbleLayout(
    bubbleRef,
    message.text,
    message.role,
    maxWidth,
  );

  const isMira = message.role === "mira" || message.role === "hint";

  return (
    <article
      ref={bubbleRef}
      className={[
        "mira-bubble",
        isMira ? "mira-bubble--mira" : "mira-bubble--user",
        message.isStreaming ? "is-streaming" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        width: `${layout.width}px`,
        minHeight: `${layout.height}px`,
      }}
    >
      <div className="mira-bubble__chrome">
        <span className="mira-bubble__role">
          {message.role === "hint" ? "Mira note" : message.role === "mira" ? "Mira" : "You"}
        </span>
        <span className="mira-bubble__timestamp">
          {message.role === "user" ? "Just now" : "Live"}
        </span>
      </div>
      <p className="mira-bubble__text">{message.text}</p>
    </article>
  );
}
