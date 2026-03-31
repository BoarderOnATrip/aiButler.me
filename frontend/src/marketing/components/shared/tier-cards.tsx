import * as React from "react";
import { BadgeCheck, Sparkles } from "lucide-react";
import { Card } from "../../../components/ui/card";
import { cn } from "../../../lib/utils";
import type { ServiceTierCopy } from "../../content";

type TierCardsProps = {
  tiers: ServiceTierCopy[];
  className?: string;
};

export function TierCards({ tiers, className }: TierCardsProps) {
  return (
    <div className={cn("grid gap-4 lg:grid-cols-3", className)}>
      {tiers.map((tier, index) => (
        <Card
          key={tier.key}
          className={cn(
            "relative overflow-hidden border-white/10 p-5",
            index === 1 && "border-amber-300/20 bg-[linear-gradient(180deg,rgba(31,24,19,0.96),rgba(10,11,14,0.92))]",
          )}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.12),transparent_36%)]" />
          <div className="relative z-10 flex h-full flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-stone-400">Tier {index + 1}</div>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl text-stone-50">{tier.name}</h3>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-300/20 bg-amber-300/10">
                {index === 1 ? <Sparkles size={16} className="text-amber-200" /> : <BadgeCheck size={16} className="text-amber-100" />}
              </div>
            </div>
            <p className="text-sm leading-6 text-stone-300/90">{tier.summary}</p>
            <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
              <div className="text-[11px] uppercase tracking-[0.18em] text-stone-400">Best for</div>
              <div className="mt-1 text-sm leading-6 text-stone-200">{tier.bestFor}</div>
            </div>
            <div className="mt-auto border-t border-white/8 pt-4">
              <div className="text-[11px] uppercase tracking-[0.18em] text-stone-400">Promise</div>
              <p className="mt-1 text-sm leading-6 text-amber-100">{tier.promise}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
