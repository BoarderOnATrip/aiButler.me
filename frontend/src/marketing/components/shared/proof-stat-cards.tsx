import * as React from "react";
import { cn } from "../../../lib/utils";

export type ProofStat = {
  label: string;
  value: string;
  detail: string;
};

type ProofStatCardsProps = {
  stats: ProofStat[];
  className?: string;
};

export function ProofStatCards({ stats, className }: ProofStatCardsProps) {
  return (
    <div className={cn("grid gap-3 md:grid-cols-3", className)}>
      {stats.map((stat, index) => (
        <article
          key={`${stat.label}-${index}`}
          className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(22,26,30,0.94),rgba(10,12,16,0.92))] p-4 shadow-[0_20px_70px_rgba(0,0,0,0.18)] transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:-translate-y-0.5"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.12),transparent_38%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative z-10 flex items-baseline justify-between gap-3">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-stone-400">{stat.label}</div>
              <div className="mt-2 text-sm leading-6 text-stone-300">{stat.detail}</div>
            </div>
            <div className="text-2xl font-semibold tracking-tight text-amber-100">{stat.value}</div>
          </div>
        </article>
      ))}
    </div>
  );
}
