import { useEffect } from "react";
import { captureEvent } from "../../lib/posthog";
import { funnels, funnelFromPath, type FunnelDefinition } from "../content/funnels";
import ChatWidget from "../components/chat/ChatWidget";
import FunnelCta from "../components/shared/FunnelCta";
import IngestionGrid from "../components/shared/IngestionGrid";
import ProofRibbon from "../components/shared/ProofRibbon";
import SectionShell from "../components/shared/SectionShell";
import ServiceTierCards from "../components/shared/ServiceTierCards";

type MarketingSiteProps = {
  pathname: string;
  onNavigate: (path: string) => void;
};

const awarenessRails = [
  {
    title: "Hook the desire already in motion",
    copy: "Cold traffic needs a felt problem and a vivid promise first. Do not start with architecture diagrams or a lecture about features.",
  },
  {
    title: "Let the page breathe before the pitch lands",
    copy: "The strongest funnels here move from atmosphere to appetite to action. The offer appears after the visitor can picture the relief.",
  },
  {
    title: "Different doors for different awareness",
    copy: "Investors, warm prospects, existing buyers, and brand-new visitors should not all hit the same headline, CTA, or proof sequence.",
  },
];

const investorRail = [
  "Single-user indispensability before team scale",
  "Trust architecture and workflow history as moat",
  "Origami Encryption framed as research, not theater",
  "Phased expansion into provenance, vault, and office layers",
];

function investorNarrative(segment: FunnelDefinition) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr,0.9fr]">
      <div className="marketing-editorial-card">
        <p className="marketing-eyebrow">Capital narrative</p>
        <h3 className="marketing-section-title">The investor page should answer the hard questions without sounding defensive.</h3>
        <p className="marketing-section-subtitle">
          Lead with premium pain, category timing, wedge, and moat. Keep the research edge clear, disciplined, and clearly separated from
          current production security claims.
        </p>
      </div>
      <div className="grid gap-3">
        {investorRail.map((item) => (
          <div key={item} className="marketing-highlight-card">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MarketingSite({ pathname, onNavigate }: MarketingSiteProps) {
  const funnel = funnels[funnelFromPath(pathname)];

  useEffect(() => {
    document.body.classList.add("marketing-body");
    return () => document.body.classList.remove("marketing-body");
  }, []);

  useEffect(() => {
    document.title = funnel.key === "random" ? "aiButler — Mira" : `aiButler — ${funnel.audienceLabel}`;
  }, [funnel]);

  useEffect(() => {
    captureEvent("marketing_page_viewed", {
      segment: funnel.key,
      path: pathname,
    });
  }, [funnel.key, pathname]);

  return (
    <div className="marketing-root">
      <div className="mx-auto max-w-7xl px-4 py-5 md:px-6 lg:px-8">
        <header className="marketing-topbar-shell">
          <button type="button" className="marketing-wordmark" onClick={() => onNavigate("/")}>
            aiButler
            <span>Mira in the room</span>
          </button>
          <nav className="marketing-nav">
            {Object.values(funnels).map((item) => {
              const active = item.key === funnel.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  className={`marketing-nav-link ${active ? "is-active" : ""}`}
                  onClick={() => onNavigate(item.path)}
                >
                  {item.navLabel}
                </button>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <button type="button" className="marketing-secondary-button" onClick={() => onNavigate("/investors")}>
              Investor path
            </button>
            <button type="button" className="marketing-secondary-button" onClick={() => onNavigate("/origami")}>
              Origami research
            </button>
            <button type="button" className="marketing-primary-button" onClick={() => onNavigate("/users")}>
              See the Butler flow
            </button>
          </div>
        </header>

        <main className="space-y-10 pb-20">
          <section className="grid gap-6 pt-4 lg:grid-cols-[1.1fr,0.9fr] lg:pt-8">
            <div className="space-y-6">
              <div className="marketing-hero-shell">
                <p className="marketing-eyebrow">{funnel.eyebrow}</p>
                <h1 className="marketing-hero-title">{funnel.headline}</h1>
                <p className="marketing-hero-copy">{funnel.subheadline}</p>
                <div className="flex flex-wrap gap-3">
                  <button type="button" className="marketing-primary-button" onClick={() => onNavigate(funnel.path)}>
                    {funnel.ctaPrimary}
                  </button>
                  <button type="button" className="marketing-secondary-button" onClick={() => onNavigate("/users")}>
                    {funnel.ctaSecondary}
                  </button>
                </div>
              </div>
              <ProofRibbon points={funnel.proofPoints} />
            </div>

            <aside className="marketing-editorial-card marketing-editorial-card--hero">
              <div className="flex items-start gap-4">
                <div className="mira-orb" />
                <div className="space-y-2">
                  <p className="marketing-eyebrow">Mira’s read</p>
                  <h2 className="marketing-section-title text-[clamp(1.5rem,3vw,2.35rem)]">
                    The first impression should feel like someone interesting turned toward you.
                  </h2>
                </div>
              </div>
              <div className="copper-divider" />
              <p className="marketing-section-subtitle">{funnel.narrative}</p>
              <div className="grid gap-3 md:grid-cols-3">
                {awarenessRails.map((rail) => (
                  <div key={rail.title} className="marketing-highlight-card">
                    <p className="marketing-eyebrow">{rail.title}</p>
                    <p className="text-sm leading-6 text-[var(--marketing-cream-muted)]">{rail.copy}</p>
                  </div>
                ))}
              </div>
            </aside>
          </section>

          <SectionShell
            eyebrow="Segmented entry points"
            title="Five doors. Five levels of awareness. Five cleaner funnels."
            subtitle="Random traffic, investors, warm users, returning buyers, and brand-new visitors each deserve their own conversation, promise, and next step."
          >
            <IngestionGrid currentPath={pathname} onNavigate={onNavigate} />
          </SectionShell>

          <SectionShell
            eyebrow="What the system actually changes"
            title="The site should sell relief, control, and movement — then prove it with specifics."
            subtitle="These sections move from felt outcome into concrete operational value without breaking the mood."
          >
            <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
              {funnel.highlights.map((item) => (
                <article key={item} className="marketing-highlight-card">
                  <p className="text-base leading-7 text-[var(--marketing-cream)]">{item}</p>
                </article>
              ))}
            </div>
          </SectionShell>

          {funnel.key === "investors" ? (
            <SectionShell
              eyebrow="Investor lens"
              title="A credible capital story lives in sequencing, not theatrics."
              subtitle="The investor funnel should separate the immediate product from the long-horizon research edge while making the expansion logic feel inevitable."
            >
              {investorNarrative(funnel)}
            </SectionShell>
          ) : (
            <SectionShell
              eyebrow="Soft objections"
              title="Visitors keep scrolling when the page answers resistance without turning defensive."
              subtitle="A good funnel lets the visitor feel understood before it asks for a commitment."
            >
              <div className="grid gap-4 lg:grid-cols-3">
                {funnel.objections.map((item) => (
                  <article key={item} className="marketing-objection-card">
                    <p className="marketing-eyebrow">Common tension</p>
                    <p className="text-base leading-7 text-[var(--marketing-cream)]">{item}</p>
                  </article>
                ))}
              </div>
            </SectionShell>
          )}

          <SectionShell
            eyebrow="Offer architecture"
            title="The offer ladder needs to match readiness."
            subtitle="People should be able to start light, move into implementation, and expand into deeper trust layers without feeling like they have changed worlds."
          >
            <ServiceTierCards />
          </SectionShell>

          <SectionShell
            eyebrow="Next-step choreography"
            title="Every segment should know what happens after the first yes."
            subtitle="The strongest funnels lower friction by making the path visible: diagnose, route, book, or continue."
          >
            <div className="grid gap-4 lg:grid-cols-3">
              {funnel.nextSteps.map((step, index) => (
                <article key={step} className="marketing-step-card">
                  <span className="marketing-step-index">0{index + 1}</span>
                  <p className="text-base leading-7 text-[var(--marketing-cream)]">{step}</p>
                </article>
              ))}
            </div>
          </SectionShell>

          <FunnelCta
            title="Capture the lead without killing the mood."
            body="The offer should feel like the next scene in the story: audit, memo, tasting flight, or the right follow-up room. That keeps the funnel direct-response sharp without feeling pushy."
            offer={funnel.offer}
            ctaLabel={funnel.ctaPrimary}
            segment={funnel.key}
            audienceLabel={funnel.audienceLabel}
            sourcePath={funnel.path}
          />
        </main>
      </div>

      <ChatWidget segment={funnel} />
    </div>
  );
}
