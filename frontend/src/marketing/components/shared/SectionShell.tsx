import type { PropsWithChildren, ReactNode } from "react";

type SectionShellProps = PropsWithChildren<{
  eyebrow: string;
  title: string;
  subtitle?: string;
  aside?: ReactNode;
}>;

export default function SectionShell({ eyebrow, title, subtitle, aside, children }: SectionShellProps) {
  return (
    <section className="marketing-section-shell">
      <div className="marketing-section-head">
        <div>
          <p className="marketing-eyebrow">{eyebrow}</p>
          <h2 className="marketing-section-title">{title}</h2>
          {subtitle && <p className="marketing-section-subtitle">{subtitle}</p>}
        </div>
        {aside ? <div className="max-w-xs">{aside}</div> : null}
      </div>
      {children}
    </section>
  );
}
