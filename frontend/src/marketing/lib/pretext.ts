export type PretextFontSpec = {
  display: string;
  body: string;
  ui: string;
};

export const pretextFontSpec: PretextFontSpec = {
  display: '700 28px "Playfair Display"',
  body: '400 18px "Cormorant Garamond"',
  ui: '500 16px "Outfit"',
};

export const pretextLineHeights = {
  display: 1.02,
  body: 1.45,
  ui: 1.15,
} as const;

let fontsReadyPromise: Promise<void> | null = null;

export function fontStackFor(kind: keyof PretextFontSpec): string {
  return pretextFontSpec[kind];
}

export function ensurePretextFontsReady() {
  if (fontsReadyPromise) {
    return fontsReadyPromise;
  }

  fontsReadyPromise = (async () => {
    if (typeof document === "undefined" || !("fonts" in document)) {
      return;
    }

    const fonts = Object.values(pretextFontSpec);
    await Promise.all(fonts.map((font) => document.fonts.load(font)));
    await document.fonts.ready;
  })();

  return fontsReadyPromise;
}

export function estimateMeasureWidth(chars: number, kind: keyof PretextFontSpec = "body"): number {
  const scale = kind === "display" ? 1.08 : kind === "ui" ? 0.95 : 1;
  return Math.max(180, Math.round(chars * 9.2 * scale));
}

export function clampMeasureWidth(width: number, min = 220, max = 760) {
  return Math.max(min, Math.min(max, Math.round(width)));
}
