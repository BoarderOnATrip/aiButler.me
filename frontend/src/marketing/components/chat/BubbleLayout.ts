import { useLayoutEffect, useState, type RefObject } from "react";
import { measureBubbleLayout } from "../../lib/chat/layout";
import { ensurePretextFontsReady } from "../../lib/pretext";
import type { BubbleLayout, ChatRole } from "../../lib/chat/types";

export function useBubbleLayout(
  ref: RefObject<HTMLElement>,
  text: string,
  role: ChatRole,
  maxWidth: number,
): BubbleLayout {
  const [layout, setLayout] = useState<BubbleLayout>(() =>
    measureBubbleLayout({ text, role, maxWidth }),
  );

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;
    let cancelled = false;
    const compute = () => {
      frame = window.requestAnimationFrame(() => {
        setLayout(measureBubbleLayout({ text, role, maxWidth }));
      });
    };

    compute();
    void ensurePretextFontsReady().then(() => {
      if (!cancelled) {
        compute();
      }
    });

    const observer = new ResizeObserver(compute);
    observer.observe(element);
    window.addEventListener("resize", compute);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, [maxWidth, ref, role, text]);

  return layout;
}
