import * as React from "react";
import { ArrowRight, Eye, Rocket, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { cn } from "../../../lib/utils";
import type { AudienceFunnelCopy } from "../../content";

type IngestionPointCardsProps = {
  funnels: AudienceFunnelCopy[];
  onSelect?: (key: AudienceFunnelCopy["key"]) => void;
  className?: string;
};

const iconFor = {
  "random-traffic": Eye,
  investors: Rocket,
  users: Sparkles,
  "returning-buyers": ShieldCheck,
  "brand-new-visitors": ArrowRight,
} as const;

export function IngestionPointCards({ funnels, onSelect, className }: IngestionPointCardsProps) {
  return (
    <div className={cn("grid gap-4 lg:grid-cols-2", className)}>
      {funnels.map((funnel, index) => {
        const Icon = iconFor[funnel.key];
        return (
          <Card
            key={funnel.key}
            className="group relative overflow-hidden border-white/10 bg-[linear-gradient(180deg,rgba(18,22,27,0.96),rgba(8,10,14,0.9))] p-5 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.14),transparent_34%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10 flex h-full flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-stone-300">
                    <Icon size={12} className="text-amber-300" />
                    {funnel.audience}
                  </div>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl leading-tight text-stone-50">
                    {funnel.hero.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-stone-300/90">{funnel.intent}</p>
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-stone-500">0{index + 1}</div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {funnel.proofPoints.slice(0, 2).map((point) => (
                  <div key={point.label} className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-stone-400">{point.label}</div>
                    <div className="mt-2 flex items-end justify-between gap-3">
                      <div className="text-sm leading-6 text-stone-300">{point.detail}</div>
                      <div className="text-lg font-semibold text-amber-100">{point.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-3 pt-1">
                <Button variant="accent" size="sm" onClick={() => onSelect?.(funnel.key)}>
                  {funnel.hero.primaryCta}
                </Button>
                <span className="text-xs text-stone-400">{funnel.ctas.microcopy}</span>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
