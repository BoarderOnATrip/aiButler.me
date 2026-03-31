import { prepare, prepareWithSegments, type PrepareOptions, type PreparedText, type PreparedTextWithSegments } from "@chenglou/pretext";

export const MIRA_FONT = '500 18px "Cormorant Garamond"';
export const USER_FONT = '500 16px "Outfit"';
export const HEADING_FONT = '700 30px "Playfair Display"';

const preparedCache = new Map<string, PreparedText>();
const preparedSegmentsCache = new Map<string, PreparedTextWithSegments>();

function cacheKey(text: string, font: string, options?: PrepareOptions) {
  return `${font}::${options?.whiteSpace ?? "normal"}::${text}`;
}

export function getPreparedText(text: string, font: string, options?: PrepareOptions) {
  const key = cacheKey(text, font, options);
  const cached = preparedCache.get(key);
  if (cached) return cached;
  const next = prepare(text, font, options);
  preparedCache.set(key, next);
  return next;
}

export function getPreparedSegments(text: string, font: string, options?: PrepareOptions) {
  const key = cacheKey(text, font, options);
  const cached = preparedSegmentsCache.get(key);
  if (cached) return cached;
  const next = prepareWithSegments(text, font, options);
  preparedSegmentsCache.set(key, next);
  return next;
}
