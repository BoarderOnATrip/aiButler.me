const REQUIRED_FONTS = [
  '500 18px "Cormorant Garamond"',
  '500 16px "Outfit"',
  '700 28px "Playfair Display"',
];

let fontReadyPromise: Promise<void> | null = null;

export function ensureMarketingFonts() {
  if (typeof document === "undefined" || !("fonts" in document)) {
    return Promise.resolve();
  }

  if (!fontReadyPromise) {
    fontReadyPromise = Promise.all(REQUIRED_FONTS.map((font) => document.fonts.load(font)))
      .then(() => document.fonts.ready)
      .then(() => undefined)
      .catch(() => undefined);
  }

  return fontReadyPromise;
}
