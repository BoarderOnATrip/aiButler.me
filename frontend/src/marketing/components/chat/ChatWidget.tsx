import { MessageSquareText, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { FunnelDefinition } from "../../content/funnels";
import ChatPanel from "./ChatPanel";

type ChatWidgetProps = {
  segment: FunnelDefinition;
};

export function ChatWidget({ segment }: ChatWidgetProps) {
  const [open, setOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const previewCopy = useMemo(() => segment.prompt.split(". ").slice(0, 2).join(". "), [segment.prompt]);

  useEffect(() => {
    const storageKey = `aibutler:preview-seen:${segment.key}`;
    if (window.sessionStorage.getItem(storageKey)) {
      setShowPreview(false);
      return;
    }
    const timer = window.setTimeout(() => setShowPreview(true), 2800);
    return () => window.clearTimeout(timer);
  }, [segment.key]);

  function handleOpen() {
    window.sessionStorage.setItem(`aibutler:preview-seen:${segment.key}`, "1");
    setShowPreview(false);
    setOpen(true);
  }

  useEffect(() => {
    const onOpenRequested = () => handleOpen();
    window.addEventListener("aibutler:open-chat", onOpenRequested as EventListener);
    return () => window.removeEventListener("aibutler:open-chat", onOpenRequested as EventListener);
  }, [segment.key]);

  return (
    <div className="marketing-chat-launcher">
      {showPreview && !open && (
        <button type="button" className="marketing-chat-preview text-left" onClick={handleOpen}>
          <p className="marketing-eyebrow">Mira is ready</p>
          <p className="text-sm leading-6 text-[var(--marketing-cream)]">{previewCopy}</p>
          <span className="inline-flex items-center gap-2 text-sm text-[var(--marketing-amber)]">
            Open the guided conversation
            <MessageSquareText size={14} />
          </span>
        </button>
      )}

      <button
        className="marketing-chat-trigger"
        type="button"
        aria-label="Open Mira chat"
        onClick={() => (open ? setOpen(false) : handleOpen())}
      >
        <span className="sr-only">Talk to Mira</span>
        <div className="mira-orb mira-orb--small flex items-center justify-center">
          <Sparkles size={16} className="text-[rgba(26,26,26,0.9)]" />
        </div>
      </button>

      <ChatPanel segment={segment} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export default ChatWidget;
