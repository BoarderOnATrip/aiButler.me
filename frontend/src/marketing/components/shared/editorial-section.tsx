import * as React from "react";
import { cn } from "../../../lib/utils";

type EditorialSectionProps = React.HTMLAttributes<HTMLElement> & {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "amber" | "copper" | "neutral";
};

const toneClasses: Record<NonNullable<EditorialSectionProps["tone"]>, string> = {
  amber: "from-amber-300/20 via-amber-300/5 to-transparent",
  copper: "from-orange-300/18 via-orange-300/5 to-transparent",
  neutral: "from-white/10 via-white/5 to-transparent",
};

export function EditorialSection({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "amber",
  className,
  children,
  ...props
}: EditorialSectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,20,24,0.92),rgba(9,12,16,0.82))] px-5 py-6 shadow-[0_24px_90px_rgba(0,0,0,0.24)] md:px-8 md:py-8",
        className,
      )}
      {...props}
    >
      <div className={cn("pointer-events-none absolute inset-0 opacity-90", toneClasses[tone])} />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className={cn("relative z-10 flex flex-col gap-3", align === "center" && "items-center text-center")}>
        {eyebrow && (
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-amber-100/75">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_16px_rgba(251,191,36,0.7)]" />
            {eyebrow}
          </div>
        )}
        <div className={cn("max-w-3xl space-y-2", align === "center" && "mx-auto")}>
          <h2 className="font-[family-name:var(--font-display)] text-3xl leading-[1.04] tracking-tight text-stone-50 md:text-4xl">
            {title}
          </h2>
          {subtitle && <p className="max-w-2xl text-sm leading-6 text-stone-300/90 md:text-base">{subtitle}</p>}
        </div>
        {children && <div className="relative z-10 w-full pt-3">{children}</div>}
      </div>
    </section>
  );
}
