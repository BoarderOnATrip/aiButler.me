import * as React from "react";
import { cn } from "../../../lib/utils";

type NarrativeBlockProps = {
  title: string;
  quote: string;
  attribution?: string;
  className?: string;
};

export function NarrativeBlock({ title, quote, attribution, className }: NarrativeBlockProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,18,20,0.96),rgba(8,9,12,0.92))] px-6 py-6 shadow-[0_20px_80px_rgba(0,0,0,0.22)] md:px-8 md:py-8",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(251,191,36,0.12),transparent_35%)]" />
      <div className="relative z-10 space-y-4">
        <div className="text-xs uppercase tracking-[0.22em] text-amber-100/70">{title}</div>
        <blockquote className="max-w-3xl font-[family-name:var(--font-display)] text-2xl leading-[1.25] text-stone-50 md:text-3xl">
          {quote}
        </blockquote>
        {attribution && <div className="text-sm text-stone-400">{attribution}</div>}
      </div>
    </section>
  );
}
