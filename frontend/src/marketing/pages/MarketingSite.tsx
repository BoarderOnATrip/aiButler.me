import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ChevronRight, MessageSquareText, ShieldCheck, Sparkles } from "lucide-react";
import { captureEvent } from "../../lib/posthog";
import { funnels, funnelFromPath, serviceTiers, type FunnelDefinition } from "../content/funnels";
import ChatWidget from "../components/chat/ChatWidget";

type MarketingSiteProps = {
  pathname: string;
  onNavigate: (path: string) => void;
};

const operatingPillars = [
  {
    title: "Communication triage",
    body: "Signal gets surfaced, low-value inbound gets absorbed, and the user stops acting as the human router for every incoming thread.",
  },
  {
    title: "Calendar choreography",
    body: "The goal is not just booking. It is shaping the day around focus, momentum, and fewer unnecessary transitions.",
  },
  {
    title: "Memory with utility",
    body: "Receipts, commitments, relationship context, and proof artifacts get attached where they become useful later.",
  },
  {
    title: "Delegated follow-through",
    body: "Routine loops become supervised execution: follow-up, reminders, summaries, routing, and approvals.",
  },
] as const;

const architectureLayers = [
  { label: "Relationship memory", detail: "People, tone, history, obligations, and pattern recognition that compounds over time." },
  { label: "Workflow graph", detail: "Tasks, approvals, timing, dependencies, and daily operational sequence." },
  { label: "Capability vault", detail: "Trusted tool access, continuity, and the right to act without loose credential sprawl." },
  { label: "Audit ledger", detail: "What happened, why it happened, and what authority or approval allowed it." },
] as const;

const workerLoops = ["Triage", "Scheduling", "Follow-up", "Receipts", "Comms"] as const;

const investorBridgeCards = [
  {
    label: "Business now",
    title: "The wedge is operational pain that shows up every day.",
    body: "The first product win is simple: fewer bad interruptions, cleaner follow-through, and a day that gets shaped instead of constantly broken apart.",
  },
  {
    label: "Compounding moat",
    title: "Retention deepens through memory, trust, and delegated authority.",
    body: "The longer the Butler is in use, the better it understands tone, timing, approvals, and what matters enough to surface.",
  },
  {
    label: "Claims discipline",
    title: "Research stays separate until it earns stronger claims.",
    body: "Long-horizon trust architecture may matter later, but the current product case stands on utility, continuity, and execution rather than speculative cryptography.",
  },
] as const;

const segmentAngles: Record<
  FunnelDefinition["key"],
  {
    label: string;
    title: string;
    body: string;
    proof: string;
  }
> = {
  random: {
    label: "Cold traffic",
    title: "Make the first minute feel like relief, not software.",
    body: "This route has to create appetite before it starts explaining mechanics. The promise is emotional first: less drag, cleaner control, a calmer day.",
    proof: "Mood before mechanics. Desire before detail. A page that feels like walking into the right room.",
  },
  investors: {
    label: "Capital narrative",
    title: "Keep the product credible and the research edge disciplined.",
    body: "This route separates commercial traction from long-horizon trust architecture. The business is the Butler. Origami Encryption is the research frontier, not the quarterly revenue story.",
    proof: "One-user indispensability first. Trust architecture as moat. Claims discipline everywhere.",
  },
  users: {
    label: "Operator path",
    title: "Show the lived workflow, not a glossy abstraction.",
    body: "Warm prospects need to picture what happens to their inbox, calendar, receipts, and follow-up loop within the first screenful.",
    proof: "Before-and-after day design beats feature catalog copy.",
  },
  returning: {
    label: "Continuation path",
    title: "Returning users should feel remembered instead of re-pitched.",
    body: "Continuity is the asset here. The site should acknowledge history, surface what deepened, and make the next layer feel inevitable.",
    proof: "Memory, momentum, and next-step clarity are the conversion lever.",
  },
  new: {
    label: "First welcome",
    title: "Give brand-new visitors a graceful first yes.",
    body: "This route should lower perceived complexity. The product feels premium, but the first commitment feels light, precise, and safe.",
    proof: "A clean invitation beats a hard close when trust is still being formed.",
  },
};

function scrollToId(id: string) {
  if (typeof document === "undefined") return;
  const element = document.getElementById(id);
  if (!element) return;
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openMiraChat(segment: FunnelDefinition, source: string) {
  captureEvent("marketing_cta_clicked", {
    segment: segment.key,
    path: segment.path,
    source,
  });
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("aibutler:open-chat", {
        detail: {
          segment: segment.key,
          source,
        },
      }),
    );
  }
}

function renderAudienceCard(item: FunnelDefinition, activePath: string, onNavigate: (path: string) => void) {
  const isActive = item.path === activePath;
  return (
    <button
      key={item.key}
      type="button"
      className={`site-door-card ${isActive ? "is-active" : ""}`}
      onClick={() => onNavigate(item.path)}
    >
      <span className="site-door-label">{item.audienceLabel}</span>
      <strong>{item.hero.primaryCta}</strong>
      <p>{item.intent}</p>
      <span className="site-door-cta">
        Enter this route
        <ChevronRight size={14} />
      </span>
    </button>
  );
}

export default function MarketingSite({ pathname, onNavigate }: MarketingSiteProps) {
  const funnel = funnels[funnelFromPath(pathname)];
  const audienceDoors = useMemo(() => Object.values(funnels), []);
  const [activeTierKey, setActiveTierKey] = useState(serviceTiers[1]?.key ?? serviceTiers[0].key);
  const activeTier = useMemo(
    () => serviceTiers.find((tier) => tier.key === activeTierKey) ?? serviceTiers[1] ?? serviceTiers[0],
    [activeTierKey],
  );
  const segmentAngle = segmentAngles[funnel.key];

  useEffect(() => {
    document.body.classList.add("marketing-body");
    return () => document.body.classList.remove("marketing-body");
  }, []);

  useEffect(() => {
    document.title = funnel.key === "random" ? "aiButler" : `aiButler — ${funnel.audienceLabel}`;
  }, [funnel]);

  useEffect(() => {
    captureEvent("marketing_page_viewed", {
      segment: funnel.key,
      path: pathname,
    });
  }, [funnel.key, pathname]);

  return (
    <div className={`marketing-root marketing-root--${funnel.key}`}>
      <div className="site-shell">
        <header className="site-header">
          <button type="button" className="site-brand" onClick={() => onNavigate("/")}>
            <span className="site-brand-mark" aria-hidden="true" />
            <span>
              aiButler
              <small>The AI that breathes on screen</small>
            </span>
          </button>

          <nav className="site-nav" aria-label="Audience routes">
            {audienceDoors.map((item) => {
              const active = item.key === funnel.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  className={`site-nav-link ${active ? "is-active" : ""}`}
                  onClick={() => onNavigate(item.path)}
                >
                  {item.navLabel}
                </button>
              );
            })}
          </nav>

          <div className="site-header-actions">
            <button type="button" className="marketing-secondary-button" onClick={() => scrollToId("ingestion-points")}>
              See the paths
            </button>
            <button type="button" className="marketing-primary-button" onClick={() => openMiraChat(funnel, "header")}>
              Talk to Mira
            </button>
          </div>
        </header>

        <main className="site-main">
          <section className="site-hero">
            <div className="site-hero-copy">
              <div className="site-hero-kicker">
                <Sparkles size={14} />
                {funnel.eyebrow}
              </div>
              <h1>{funnel.headline}</h1>
              <p className="site-hero-subtitle">{funnel.subheadline}</p>

              <div className="site-hero-actions">
                <button type="button" className="marketing-primary-button" onClick={() => scrollToId("offer-ladder")}>
                  {funnel.ctaPrimary}
                </button>
                <button type="button" className="marketing-secondary-button" onClick={() => openMiraChat(funnel, "hero")}>
                  <MessageSquareText size={16} />
                  {funnel.ctaSecondary}
                </button>
              </div>

              <div className="site-chip-list">
                {funnel.sectionNotes.map((note) => (
                  <span key={note} className="site-chip">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <aside className="site-stage">
              <article className="site-stage-card site-stage-card--accent">
                <span className="site-card-kicker">{segmentAngle.label}</span>
                <h2>{segmentAngle.title}</h2>
                <p>{segmentAngle.body}</p>
                <div className="site-proof-line">
                  <strong>Why this page converts:</strong>
                  <span>{segmentAngle.proof}</span>
                </div>
              </article>

              <div className="site-stat-grid">
                {funnel.proofPoints.map((point) => (
                  <article key={point.label} className="site-stat-card">
                    <span>{point.label}</span>
                    <strong>{point.value}</strong>
                    <p>{point.detail}</p>
                  </article>
                ))}
              </div>

              <article className="site-stage-card">
                <span className="site-card-kicker">Mira’s opening move</span>
                <p className="site-stage-prompt">“{funnel.prompt}”</p>
                <div className="site-prompt-list">
                  {funnel.chatPrompts.slice(0, 3).map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      className="site-chat-prompt"
                      onClick={() => openMiraChat(funnel, `prompt:${prompt}`)}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </article>
            </aside>
          </section>

          <section className="site-section" id="ingestion-points">
            <div className="site-section-head">
              <div>
                <span className="site-section-number">01</span>
                <h2>Five doors. Five levels of readiness. One Butler behind them.</h2>
              </div>
              <p>
                The public site should not treat investors, warm buyers, returning customers, and brand-new visitors like the same person.
                Each route keeps the promise consistent but changes the conversation shape.
              </p>
            </div>

            <div className="site-door-grid">
              {audienceDoors.map((item) => renderAudienceCard(item, funnel.path, onNavigate))}
            </div>
          </section>

          <section className="site-section">
            <div className="site-section-head">
              <div>
                <span className="site-section-number">02</span>
                <h2>The product story has to land as felt relief before it lands as architecture.</h2>
              </div>
              <p>{funnel.narrative}</p>
            </div>

            <div className="site-pillar-grid">
              {operatingPillars.map((pillar) => (
                <article key={pillar.title} className="site-pillar-card">
                  <span className="site-card-kicker">Core movement</span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="site-section">
            <div className="site-section-head">
              <div>
                <span className="site-section-number">03</span>
                <h2>Trust architecture is what turns an interesting assistant into delegated staff.</h2>
              </div>
              <p>
                The Butler only becomes indispensable when memory, workflow authority, credentials, and audit history are coordinated in one
                operating surface instead of scattered across disconnected tools.
              </p>
            </div>

            <div className="site-architecture-shell">
              <div className="site-architecture-top">Butler Shell</div>

              <div className="site-architecture-grid">
                {architectureLayers.map((layer) => (
                  <article key={layer.label} className="site-architecture-card">
                    <span className="site-card-kicker">Foundation</span>
                    <h3>{layer.label}</h3>
                    <p>{layer.detail}</p>
                  </article>
                ))}
              </div>

              <div className="site-worker-row">
                <span className="site-worker-label">Supervised AI employees</span>
                <div className="site-worker-chips">
                  {workerLoops.map((loop) => (
                    <span key={loop} className="site-worker-chip">
                      {loop}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="site-section">
            <div className="site-section-head">
              <div>
                <span className="site-section-number">04</span>
                <h2>
                  {funnel.key === "investors"
                    ? "The capital story works when the business and the research program stay cleanly separated."
                    : "The strongest funnel answers resistance before it starts sounding like it is defending itself."}
                </h2>
              </div>
              <p>
                {funnel.key === "investors"
                  ? "Investors need the immediate product case, the expansion path, and the claim boundary. The research edge becomes stronger when it is presented narrowly and honestly."
                  : "Visitors should feel understood as they move through the page. Objections become momentum when the response is practical, specific, and paced correctly."}
              </p>
            </div>

            {funnel.key === "investors" ? (
              <div className="site-bridge-grid">
                {investorBridgeCards.map((card, index) => (
                  <article
                    key={card.title}
                    className={`site-bridge-card ${index === 0 ? "site-bridge-card--accent" : ""}`}
                  >
                    <span className="site-card-kicker">{card.label}</span>
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="site-response-grid">
                <div className="site-response-stack">
                  {funnel.objectionHandling.map((item, index) => (
                    <article key={item.objection} className="site-response-card">
                      <span className="site-card-kicker">{`Objection 0${index + 1}`}</span>
                      <h3>{item.objection}</h3>
                      <p>{item.response}</p>
                    </article>
                  ))}
                </div>

                <aside className="site-aside-card">
                  <span className="site-card-kicker">What happens next</span>
                  <h3>Every route should make the next step feel obvious.</h3>
                  <ol className="site-next-step-list">
                    {funnel.nextSteps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </aside>
              </div>
            )}
          </section>

          <section className="site-section" id="offer-ladder">
            <div className="site-section-head">
              <div>
                <span className="site-section-number">05</span>
                <h2>The offer ladder should feel like progression, not escalation.</h2>
              </div>
              <p>
                The first yes should be easy. The deeper tiers should feel like a natural consequence of trust, workflow volume, and the
                value of delegated continuity.
              </p>
            </div>

            <div className="site-tier-grid">
              {serviceTiers.map((tier) => {
                const active = tier.key === activeTier.key;
                return (
                  <button
                    key={tier.key}
                    type="button"
                    className={`site-tier-card ${active ? "is-active" : ""}`}
                    onClick={() => setActiveTierKey(tier.key)}
                  >
                    <span className="site-card-kicker">{tier.label}</span>
                    <strong>{tier.name}</strong>
                    <p>{tier.price}</p>
                    <span className="site-tier-link">
                      Inspect this path
                      <ChevronRight size={14} />
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="site-tier-detail">
              <div>
                <span className="site-card-kicker">Selected path</span>
                <h3>{activeTier.name}</h3>
                <p>{activeTier.summary}</p>
              </div>

              <div className="site-tier-meta">
                <div>
                  <span>Best for</span>
                  <strong>{activeTier.bestFor}</strong>
                </div>
                <div>
                  <span>Promise</span>
                  <strong>{activeTier.promise}</strong>
                </div>
              </div>

              <div className="site-tier-bullets">
                {activeTier.bullets.map((bullet) => (
                  <div key={bullet} className="site-tier-bullet">
                    <ShieldCheck size={15} />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="site-section site-section--final">
            <div className="site-cta-band">
              <div>
                <span className="site-card-kicker">Next step choreography</span>
                <h2>{funnel.offer}</h2>
                <p>
                  Keep the page elegant, the route explicit, and the next action easy. The close should feel like the next scene in the
                  conversation, not the beginning of a heavy implementation process.
                </p>
              </div>

              <div className="site-cta-actions">
                <button type="button" className="marketing-primary-button" onClick={() => openMiraChat(funnel, "final-cta")}>
                  Start with Mira
                  <ArrowRight size={16} />
                </button>
                <button type="button" className="marketing-secondary-button" onClick={() => scrollToId("offer-ladder")}>
                  Review the offer ladder
                </button>
              </div>
            </div>
          </section>
        </main>
        <ChatWidget segment={funnel} />
      </div>
    </div>
  );
}
