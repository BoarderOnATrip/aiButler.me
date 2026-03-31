export const marketingTheme = {
  colors: {
    bg: "#12100f",
    bgAlt: "#1a1715",
    surface: "rgba(34, 29, 26, 0.86)",
    surfaceStrong: "rgba(41, 34, 30, 0.95)",
    text: "#f4ede4",
    textMuted: "rgba(244, 237, 228, 0.72)",
    textSoft: "rgba(244, 237, 228, 0.54)",
    copper: "#b87333",
    copperBright: "#d59758",
    amber: "#d4a847",
    ember: "#6d3c22",
    line: "rgba(244, 237, 228, 0.1)",
    lineStrong: "rgba(184, 115, 51, 0.28)",
  },
  fonts: {
    display: '"Playfair Display", "Iowan Old Style", "Palatino Linotype", "Book Antiqua", serif',
    body: '"Cormorant Garamond", "Iowan Old Style", "Palatino Linotype", serif',
    ui: '"Outfit", "Inter", "Helvetica Neue", Arial, sans-serif',
    mono: '"SFMono-Regular", "Menlo", "Monaco", Consolas, monospace',
  },
  motion: {
    easeLiquid: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    easeGentle: "cubic-bezier(0.16, 1, 0.3, 1)",
    easeSnap: "cubic-bezier(0.2, 0.8, 0.2, 1)",
    fast: 140,
    base: 220,
    slow: 420,
    ambient: 900,
  },
  radius: {
    lg: 28,
    md: 20,
    sm: 14,
  },
  layout: {
    maxWidth: 1180,
    pagePadding: "clamp(20px, 3vw, 40px)",
    gutter: "clamp(16px, 2vw, 24px)",
    measure: "64ch",
  },
} as const;

export function marketingVar(name: string): string {
  return `var(${name})`;
}

export function marketingColor(name: keyof typeof marketingTheme.colors): string {
  return marketingTheme.colors[name];
}

