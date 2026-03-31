import { useMemo } from "react";
import { MIRA_FONT } from "../../lib/pretext/pretext-engine";
import { measureTightBlock } from "../../lib/pretext/pretext-measure";

type MiraBubbleProps = {
  text: string;
  maxWidth: number;
  isLatest?: boolean;
};

export default function MiraBubble({ text, maxWidth, isLatest = false }: MiraBubbleProps) {
  const metrics = useMemo(() => {
    if (!text) {
      return { width: Math.min(320, maxWidth), height: 32, lineCount: 1 };
    }
    return measureTightBlock(text, MIRA_FONT, maxWidth, 28, 214);
  }, [maxWidth, text]);

  return (
    <div
      className={`marketing-bubble marketing-bubble--mira ${isLatest ? "marketing-bubble--live" : ""}`}
      style={{ width: `${Math.min(maxWidth, metrics.width + 34)}px`, minHeight: `${metrics.height + 24}px` }}
    >
      <p className="marketing-mira-copy">{text}</p>
    </div>
  );
}
