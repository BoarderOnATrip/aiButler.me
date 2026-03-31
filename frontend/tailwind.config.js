/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // ── Canvas backgrounds ──────────────────────────────────
      // Use these for page/surface backgrounds instead of raw slate-* values.
      colors: {
        canvas: "#0b111c",    // page background (deepest)
        surface: "#111a2a",   // elevated surface (sidebars, panels)
        elevated: "#1d2438",  // highest elevation (tooltips, modals)
      },

      // ── Typography ──────────────────────────────────────────
      // Three canonical levels (see design-system.md).
      // xs = label/metadata, sm = body, lg+ = display.
      // Arbitrary sizes (text-[11px], text-[10px]) are banned.
      fontFamily: {
        sans: ["Space Grotesk", ...fontFamily.sans],
        serif: ["Playfair Display", ...fontFamily.serif],
      },

      // ── Border radius ───────────────────────────────────────
      // Three levels: item (tight) → card → panel (major sections)
      borderRadius: {
        item: "6px",
        card: "12px",
        panel: "16px",
      },

      // ── Animation ───────────────────────────────────────────
      // Slower, calmer ping for StatusDot transient states
      animation: {
        "ping-slow": "ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
};
