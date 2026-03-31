import { useEffect } from "react";
import { ArrowRight, ChevronLeft, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  origamiApplications,
  origamiClaims,
  origamiDisclosureParagraph,
  origamiDistinctives,
  origamiFlowCards,
  origamiHero,
  origamiPrinciples,
  origamiResearchLadder,
  origamiSources,
  origamiStatusTiles,
  origamiSystemPhases,
} from "../content/origami";

type OrigamiResearchPageProps = {
  onNavigate: (path: string) => void;
};

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return;
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function OrigamiResearchPage({ onNavigate }: OrigamiResearchPageProps) {
  useEffect(() => {
    document.title = "Origami Encryption";
  }, []);

  return (
    <div className="origami-page">
      <div className="origami-shell">
        <header className="origami-topbar">
          <button type="button" className="origami-brand" onClick={() => onNavigate("/")}>
            <span className="origami-brand-mark" aria-hidden="true" />
            <span>
              Origami Encryption
              <small>Projection, hidden structure, controlled unfolding</small>
            </span>
          </button>

          <nav className="origami-nav" aria-label="Origami sections">
            <a
              href="#thesis"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("thesis");
              }}
            >
              Thesis
            </a>
            <a
              href="#claims"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("claims");
              }}
            >
              Claims
            </a>
            <a
              href="#roadmap"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("roadmap");
              }}
            >
              Research Ladder
            </a>
            <a
              href="#applications"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("applications");
              }}
            >
              Applications
            </a>
            <a
              href="#sources"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("sources");
              }}
            >
              Sources
            </a>
          </nav>

          <div className="origami-topbar-actions">
            <button type="button" className="origami-secondary-link" onClick={() => onNavigate("/investors")}>
              Investor path
            </button>
            <button type="button" className="origami-secondary-link" onClick={() => onNavigate("/")}>
              <ChevronLeft size={14} />
              aiButler
            </button>
            <button type="button" className="origami-primary-link" onClick={() => onNavigate("/users")}>See Butler flow</button>
          </div>
        </header>

        <main className="origami-main">
          <section className="origami-hero" id="top">
            <div className="origami-hero-copy origami-reveal">
              <div className="origami-hero-chip">
                <Sparkles size={14} />
                {origamiHero.eyebrow}
              </div>
              <h1 className="origami-hero-title">{origamiHero.title}</h1>
              <p className="origami-hero-subtitle">{origamiHero.subtitle}</p>

              <div className="origami-hero-actions">
                <Button variant="accent" size="lg" onClick={() => scrollToSection("thesis")}>
                  Read the thesis
                  <ArrowRight size={16} className="ml-2" />
                </Button>
                <Button variant="secondary" size="lg" onClick={() => scrollToSection("roadmap")}>
                  See the research ladder
                </Button>
              </div>

              <div className="origami-status-grid">
                {origamiStatusTiles.map((tile, index) => (
                  <article
                    key={tile.label}
                    className="origami-status-card origami-reveal"
                    style={{ animationDelay: `${120 + index * 70}ms` }}
                  >
                    <div className="origami-micro-label">{tile.label}</div>
                    <h2>{tile.value}</h2>
                    <p>{tile.detail}</p>
                  </article>
                ))}
              </div>
            </div>

            <aside
              className="origami-stage origami-reveal"
              style={{ animationDelay: "180ms" }}
              aria-label="Conceptual origami flow"
            >
              <div className="origami-stage-grid" aria-hidden="true" />
              {origamiFlowCards.map((card, index) => (
                <article key={card.title} className={`origami-paper-card origami-paper-card--${index + 1}`}>
                  <div className="origami-micro-label">{card.kicker}</div>
                  <h2>{card.title}</h2>
                  <p>{card.body}</p>
                </article>
              ))}
              <div className="origami-stage-note">
                <div className="origami-micro-label">Core question</div>
                <p>{origamiHero.question}</p>
              </div>
            </aside>
          </section>

          <section className="origami-section" id="thesis">
            <div className="origami-section-head">
              <div>
                <div className="origami-eyebrow">The thesis</div>
                <h2 className="origami-section-title">
                  The public object may be materially poorer than the hidden state it parameterizes.
                </h2>
              </div>
              <div className="origami-quote-card">
                <div className="origami-micro-label">Research question</div>
                <p>{origamiHero.question}</p>
              </div>
            </div>

            <div className="origami-principle-grid">
              {origamiPrinciples.map((item, index) => (
                <article
                  key={item.title}
                  className="origami-panel origami-reveal"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <div className="origami-step-badge">0{index + 1}</div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="origami-section">
            <div className="origami-section-head">
              <div>
                <div className="origami-eyebrow">Why it is distinct</div>
                <h2 className="origami-section-title">This is not just another hard-problem pitch.</h2>
              </div>
              <p className="origami-section-copy">
                What makes Origami Encryption interesting is the combination of public flat structure, hidden folded structure,
                projection loss, and controlled unfolding inside one candidate family.
              </p>
            </div>

            <div className="origami-distinctive-grid">
              {origamiDistinctives.map((item, index) => (
                <article
                  key={item}
                  className="origami-distinctive-card origami-reveal"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <span>{`0${index + 1}`}</span>
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="origami-section" id="claims">
            <div className="origami-section-head">
              <div>
                <div className="origami-eyebrow">Claim discipline</div>
                <h2 className="origami-section-title">
                  The website has to stay serious about what exists now and what does not.
                </h2>
              </div>
              <p className="origami-section-copy">
                The strongest version of the story is narrower, not smaller: research credibility now, primitive-level proof later.
              </p>
            </div>

            <div className="origami-claims-grid">
              <article className="origami-claim-card is-safe">
                <div className="origami-claim-head">
                  <ShieldCheck size={18} />
                  <div>
                    <div className="origami-micro-label">Safe now</div>
                    <h3>Responsible claims</h3>
                  </div>
                </div>
                <ul>
                  {origamiClaims.safe.map((claim) => (
                    <li key={claim}>{claim}</li>
                  ))}
                </ul>
              </article>

              <article className="origami-claim-card is-caution">
                <div className="origami-claim-head">
                  <span className="origami-caution-dot" aria-hidden="true" />
                  <div>
                    <div className="origami-micro-label">Not safe now</div>
                    <h3>Claims to avoid</h3>
                  </div>
                </div>
                <ul>
                  {origamiClaims.unsafe.map((claim) => (
                    <li key={claim}>{claim}</li>
                  ))}
                </ul>
              </article>
            </div>
          </section>

          <section className="origami-section" id="roadmap">
            <div className="origami-section-head">
              <div>
                <div className="origami-eyebrow">Research ladder</div>
                <h2 className="origami-section-title">A real primitive would need a lot more than beautiful geometry.</h2>
              </div>
              <p className="origami-section-copy">
                The next move is formalization: hard problems, instance families, trapdoors, leakage bounds, and reductions or disciplined assumptions.
              </p>
            </div>

            <div className="origami-roadmap-grid">
              <div className="origami-roadmap-stack">
                {origamiResearchLadder.map((item, index) => (
                  <article
                    key={item.step}
                    className="origami-roadmap-card origami-reveal"
                    style={{ animationDelay: `${index * 65}ms` }}
                  >
                    <div className="origami-roadmap-step">{item.step}</div>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  </article>
                ))}
              </div>

              <aside className="origami-roadmap-aside">
                <div className="origami-micro-label">Most realistic near-term architecture</div>
                <h3>Origami as relation language. Proven crypto as the security engine.</h3>
                <p>
                  The best product path right now is to keep secrecy and authenticity anchored in established cryptographic primitives while
                  origami supplies the semantics of fold, unfold, partial reveal, and provenance.
                </p>
              </aside>
            </div>
          </section>

          <section className="origami-section" id="applications">
            <div className="origami-section-head">
              <div>
                <div className="origami-eyebrow">Product path</div>
                <h2 className="origami-section-title">Useful before primitive-level proof.</h2>
              </div>
              <p className="origami-section-copy">
                The near-term win is not a new cipher. It is a cleaner trust language for selective reveal, provenance, approvals, and recovery.
              </p>
            </div>

            <div className="origami-app-grid">
              {origamiApplications.map((item, index) => (
                <article
                  key={item.title}
                  className="origami-panel origami-reveal"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <div className="origami-micro-label">Application</div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>

            <div className="origami-phase-grid">
              {origamiSystemPhases.map((phase, index) => (
                <article
                  key={phase.phase}
                  className="origami-phase-card origami-reveal"
                  style={{ animationDelay: `${120 + index * 70}ms` }}
                >
                  <div className="origami-micro-label">{phase.phase}</div>
                  <h3>{phase.title}</h3>
                  <p>{phase.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="origami-section" id="sources">
            <div className="origami-section-head">
              <div>
                <div className="origami-eyebrow">Evidence base</div>
                <h2 className="origami-section-title">The site should feel editorial, but it still needs a paper trail.</h2>
              </div>
              <p className="origami-section-copy">
                The case for Origami Encryption starts with computational origami and ends with disciplined cryptographic caution.
              </p>
            </div>

            <div className="origami-source-grid">
              {origamiSources.map((source, index) => (
                <a
                  key={source.title}
                  className="origami-source-card origami-reveal"
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{ animationDelay: `${index * 55}ms` }}
                >
                  <div className="origami-micro-label">Primary source</div>
                  <h3>{source.title}</h3>
                  <p>{source.note}</p>
                </a>
              ))}
            </div>

            <article className="origami-disclosure">
              <div>
                <div className="origami-eyebrow">Disclosure paragraph</div>
                <h3>Product claims and research claims stay separate.</h3>
              </div>
              <p>{origamiDisclosureParagraph}</p>
              <div className="origami-disclosure-actions">
                <Button variant="secondary" size="lg" onClick={() => onNavigate("/investors")}>
                  Investor framing
                </Button>
                <Button variant="accent" size="lg" onClick={() => onNavigate("/users")}>
                  See Butler flow
                </Button>
              </div>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
}
