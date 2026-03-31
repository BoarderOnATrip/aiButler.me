import { useMemo } from "react";
import { USER_FONT } from "../../lib/pretext/pretext-engine";
import { measureTightBlock } from "../../lib/pretext/pretext-measure";

type UserBubbleProps = {
  text: string;
  maxWidth: number;
};

export default function UserBubble({ text, maxWidth }: UserBubbleProps) {
  const metrics = useMemo(
    () => measureTightBlock(text, USER_FONT, maxWidth, 24, 150),
    [maxWidth, text],
  );

  return (
    <div
      className="marketing-bubble marketing-bubble--user"
      style={{ width: `${Math.min(maxWidth, metrics.width + 28)}px`, minHeight: `${metrics.height + 18}px` }}
    >
      <p className="marketing-user-copy">{text}</p>
    </div>
  );
}
