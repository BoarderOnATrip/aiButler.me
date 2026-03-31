import * as React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { cn } from "../../../lib/utils";

type HeroShellProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  stats?: Array<{ label: string; value: string; detail: string }>;
  accentLabel?: string;
  className?: string;
};

export function HeroShell({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  onPrimaryClick,
  onSecondaryClick,
  stats = [],
  accentLabel = "Mira",
  className,
}: HeroShellProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-[36px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.16),transparent_30%),linear-gradient(180deg,rgba(12,14,18,0.96),rgba(7,9,12,0.88))] px-6 py-7 shadow-[0_28px_120px_rgba(0,0,0,0.3)] md:px-10 md:py-12",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(255,255,255,0.08),transparent_22%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
      <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.9fr)] lg:items-end">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-stone-300">
              <Sparkles size={12} className="text-amber-300" />
              {eyebrow}
            </span>
            <span className="text-xs uppercase tracking-[0.22em] text-amber-100/70">{accentLabel}</span>
          </div>
          <div className="max-w-3xl space-y-4">
            <h1 className="font-[family-name:var(--font-display)] text-4xl leading-[0.98] tracking-tight text-stone-50 md:text-6xl">
              {title}
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-stone-300/90 md:text-lg">{subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="accent"
              size="lg"
              onClick={onPrimaryClick}
              className="shadow-[0_16px_36px_rgba(245,158,11,0.22)]"
            >
              {primaryCta}
              <ArrowRight size={16} className="ml-2" />
            </Button>
            <Button variant="secondary" size="lg" onClick={onSecondaryClick}>
              {secondaryCta}
            </Button>
          </div>
        </div>

        <Card className="relative overflow-hidden border-white/10 bg-[linear-gradient(180deg,rgba(19,23,28,0.92),rgba(8,10,14,0.96))] p-5">
          <div className="absolute right-4 top-4 h-24 w-24 rounded-full border border-amber-300/25 bg-amber-300/10 blur-2xl" />
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-stone-400">Live signal</div>
                <div className="mt-1 font-[family-name:var(--font-display)] text-2xl text-stone-50">
                  Control, not clutter
                </div>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-orange-300/30 bg-orange-300/10 shadow-[0_0_24px_rgba(251,146,60,0.16)]">
                <div className="h-4 w-4 rounded-full bg-gradient-to-br from-amber-200 to-orange-400" />
              </div>
            </div>
            <div className="space-y-3">
              {stats.slice(0, 3).map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.18em] text-stone-400">{stat.label}</div>
                      <div className="mt-1 text-base text-stone-100">{stat.detail}</div>
                    </div>
                    <div className="text-lg font-semibold text-amber-100">{stat.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
