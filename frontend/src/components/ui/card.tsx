import * as React from "react";

import { cn } from "../../lib/utils";

// ── Severity ─────────────────────────────────────────────────────────────────
// Adds a left-border accent to signal operator attention at the container level.
// Use this for sections/cards that need review — NOT for individual row state
// (use <StatusDot> for that).
//
// See design-system.md: Two-Layer Status Display.

type CardSeverity = "default" | "attention" | "blocked" | "failed";

const SEVERITY_CLASSES: Record<CardSeverity, string> = {
  default: "",
  attention: "border-l-2 border-l-amber-400/75",
  blocked:   "border-l-2 border-l-orange-400/75",
  failed:    "border-l-2 border-l-red-400/75",
};

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  severity?: CardSeverity;
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, severity = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-white/10 bg-slate-950/60 shadow-xl backdrop-blur-md",
        SEVERITY_CLASSES[severity],
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-5 pt-5", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-base font-semibold", className)} {...props} />
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-slate-400", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-5", className)} {...props} />
  ),
);
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardTitle, CardDescription, CardContent };
export type { CardSeverity };
