import { prepareWithSegments, walkLineRanges } from "@chenglou/pretext";

import { clampMeasureWidth, fontStackFor } from "../pretext";
import type { BubbleLayout, ChatRole } from "./types";

const FALLBACK_MIRA_FONT = '400 18px "Cormorant Garamond", serif';
const FALLBACK_USER_FONT = '500 16px "Outfit", Arial, sans-serif';

type TextMeasurer = (text: string) => number;

function createMeasurer(font: string): TextMeasurer {
  if (typeof document === "undefined") {
    return (text: string) => text.length * 8;
  }

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    return (text: string) => text.length * 8;
  }

  context.font = font;
  return (text: string) => context.measureText(text).width;
}

function fallbackMeasure(options: {
  text: string;
  role: ChatRole;
  maxWidth: number;
  lineHeight: number;
  paddingX: number;
  paddingY: number;
}): BubbleLayout {
  const measure = createMeasurer(options.role === "user" ? FALLBACK_USER_FONT : FALLBACK_MIRA_FONT);
  const words = options.text.split(/\s+/g).filter(Boolean);
  let current = "";
  let lineCount = 1;
  let maxLineWidth = 0;
  const availableWidth = Math.max(120, options.maxWidth - options.paddingX * 2);

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (measure(next) <= availableWidth) {
      current = next;
    } else {
      maxLineWidth = Math.max(maxLineWidth, measure(current));
      current = word;
      lineCount += 1;
    }
  }

  maxLineWidth = Math.max(maxLineWidth, measure(current));

  return {
    width: clampMeasureWidth(maxLineWidth + options.paddingX * 2, 180, options.maxWidth),
    height: lineCount * options.lineHeight + options.paddingY * 2,
    lineCount,
  };
}

function countLines(prepared: ReturnType<typeof prepareWithSegments>, width: number) {
  let lines = 0;
  walkLineRanges(prepared, width, () => {
    lines += 1;
  });
  return Math.max(lines, 1);
}

function widestLineWidth(prepared: ReturnType<typeof prepareWithSegments>, width: number) {
  let widest = 0;
  walkLineRanges(prepared, width, (line) => {
    widest = Math.max(widest, line.width);
  });
  return widest;
}

export function getBubbleFont(role: ChatRole) {
  return role === "user" ? fontStackFor("ui") : fontStackFor("body");
}

export function measureBubbleLayout(options: {
  text: string;
  role: ChatRole;
  maxWidth: number;
  lineHeight?: number;
  paddingX?: number;
  paddingY?: number;
}): BubbleLayout {
  const {
    text,
    role,
    maxWidth,
    lineHeight = 26,
    paddingX = 20,
    paddingY = 16,
  } = options;

  if (typeof document === "undefined") {
    return fallbackMeasure({ text, role, maxWidth, lineHeight, paddingX, paddingY });
  }

  const font = getBubbleFont(role);
  const fontsReady = "fonts" in document ? document.fonts.check(font) : false;
  if (!fontsReady) {
    return fallbackMeasure({ text, role, maxWidth, lineHeight, paddingX, paddingY });
  }

  try {
    const prepared = prepareWithSegments(text || " ", font, { whiteSpace: "pre-wrap" });
    const contentMaxWidth = Math.max(140, maxWidth - paddingX * 2);
    const targetLineCount = countLines(prepared, contentMaxWidth);
    const minBubbleContentWidth = role === "user" ? 140 : 220;
    let low = Math.min(minBubbleContentWidth, contentMaxWidth);
    let high = contentMaxWidth;

    while (high - low > 1) {
      const mid = (high + low) / 2;
      const candidateLineCount = countLines(prepared, mid);
      if (candidateLineCount <= targetLineCount) {
        high = mid;
      } else {
        low = mid;
      }
    }

    const fittedWidth = Math.max(minBubbleContentWidth, high);
    const lineCount = countLines(prepared, fittedWidth);
    const actualTextWidth = widestLineWidth(prepared, fittedWidth);

    return {
      width: clampMeasureWidth(actualTextWidth + paddingX * 2 + 4, 180, maxWidth),
      height: lineCount * lineHeight + paddingY * 2,
      lineCount,
    };
  } catch {
    return fallbackMeasure({ text, role, maxWidth, lineHeight, paddingX, paddingY });
  }
}
