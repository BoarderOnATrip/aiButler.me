import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../lib/utils";

type CtaBandProps = {
  title: string;
  subtitle?: string;
  primaryLabel: string;
  secondaryLabel?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  className?: string;
};

export function CtaBand({
  title,
  subtitle,
  primaryLabel,
  secondaryLabel,
  onPrimaryClick,
  onSecondaryClick,
  className,
}: CtaBandProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-[32px] border border-amber-300/15 bg-[linear-gradient(135deg,rgba(34,22,12,0.96),rgba(11,12,14,0.98))] px-6 py-6 shadow-[0_20px_80px_rgba(0,0,0,0.2)] md:px-8 md:py-8",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.24),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_20%)]" />
      <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl space-y-2">
          <div className="text-xs uppercase tracking-[0.22em] text-amber-100/70">Next step</div>
          <h3 className="font-[family-name:var(--font-display)] text-3xl leading-[1.04] text-stone-50 md:text-4xl">
            {title}
          </h3>
          {subtitle && <p className="max-w-xl text-sm leading-6 text-stone-300/90 md:text-base">{subtitle}</p>}
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="accent" size="lg" onClick={onPrimaryClick}>
            {primaryLabel}
            <ArrowRight size={16} className="ml-2" />
          </Button>
          {secondaryLabel && (
            <Button variant="secondary" size="lg" onClick={onSecondaryClick}>
              {secondaryLabel}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
