import { marketingTheme } from "./theme";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function transition(duration = marketingTheme.motion.base, easing = marketingTheme.motion.easeGentle): string {
  return `all ${duration}ms ${easing}`;
}

export function staggerDelay(index: number, base = 60): string {
  return `${Math.max(0, index) * base}ms`;
}

export function fadeUpStyle(index = 0): Record<string, string> {
  return {
    animationDelay: staggerDelay(index),
  };
}

