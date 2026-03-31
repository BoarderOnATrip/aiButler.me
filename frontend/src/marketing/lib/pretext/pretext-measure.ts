import { layout, walkLineRanges } from "@chenglou/pretext";
import { getPreparedSegments } from "./pretext-engine";

export type TightBlockMetrics = {
  width: number;
  height: number;
  lineCount: number;
};

export function shrinkwrapWidth(text: string, font: string, containerWidth: number, lineHeight: number, minWidth = 180) {
  const prepared = getPreparedSegments(text, font);
  const { lineCount: targetLines } = layout(prepared, containerWidth, lineHeight);
  let lo = minWidth;
  let hi = containerWidth;

  while (hi - lo > 1) {
    const mid = (hi + lo) / 2;
    const { lineCount } = layout(prepared, mid, lineHeight);
    if (lineCount <= targetLines) {
      hi = mid;
    } else {
      lo = mid;
    }
  }

  return Math.round(hi);
}

export function measureTightBlock(
  text: string,
  font: string,
  containerWidth: number,
  lineHeight: number,
  minWidth = 180,
): TightBlockMetrics {
  const prepared = getPreparedSegments(text, font);
  const width = shrinkwrapWidth(text, font, containerWidth, lineHeight, minWidth);
  const result = layout(prepared, width, lineHeight);
  return {
    width,
    height: result.height,
    lineCount: result.lineCount,
  };
}

export function widestMeasuredLine(text: string, font: string, containerWidth: number) {
  const prepared = getPreparedSegments(text, font);
  let widest = 0;
  walkLineRanges(prepared, containerWidth, (line) => {
    if (line.width > widest) widest = line.width;
  });
  return widest;
}
