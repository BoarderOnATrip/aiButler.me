import { ArrowRight, Check, Copy, MessageSquareText, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { captureEvent } from "../../lib/posthog";
import ChatWidget from "../components/chat/ChatWidget";
import FunnelCta from "../components/shared/FunnelCta";
import {
  decisionQuestions,
  frameworkBuckets,
  guideHighlights,
  implementationDays,
  implementationMistakes,
  leverageRisks,
  leverageStrengths,
  promptTemplates,
  pullQuotes,
} from "../content/discerning-ai";
import { funnels } from "../content/funnels";

type DiscerningAiPageProps = {
  pathname: string;
  onNavigate: (path: string) => void;
};

function scrollToId(id: string) {
  if (typeof document === "undefined") return;
  const element = document.getElementById(id);
  if (!element) return;
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

export default function DiscerningAiPage({ pathname, onNavigate }: DiscerningAiPageProps) {
  const guideSegment = useMemo(() => funnels.users, []);
  const [copiedPromptKey, setCopiedPromptKey] = useState<string | null>(null);

  useEffect(() => {
    document.body.classList.add("marketing-body");
    document.title = "aiButler — The Discerning Business Owner’s Guide to AI";
    captureEvent("marketing_page_viewed", {
      segment: "discerning-ai-guide",
      path: pathname,
    });
    return () => document.body.classList.remove("marketing-body");
  }, [pathname]);

  function openGuideChat(source: string) {
    captureEvent("marketing_cta_clicked", {
      segment: "discerning-ai-guide",
      path: pathname,
      source,
    });
    window.dispatchEvent(
      new CustomEvent("aibutler:open-chat", {
        detail: {
          segment: "discerning-ai-guide",
          source,
        },
      }),
    );
  }

  async function handleCopyPrompt(promptKey: string, promptBody: string) {
    await copyText(promptBody);
    setCopiedPromptKey(promptKey);
    window.setTimeout(() => {
      setCopiedPromptKey((current) => (current === promptKey ? null : current));
    }, 1800);
    captureEvent("marketing_prompt_copied", {
      segment: "discerning-ai-guide",
      path: pathname,
      promptKey,
    });
  }

  return (
    <div className="marketing-root marketing-root--users discerning-root">
      <div className="site-shell">
        <header className="site-header discerning-header">
          <button type="button" className="site-brand" onClick={() => onNavigate("/")}>
            <span className="site-brand-mark" aria-hidden="true" />
            <span>
              aiButler
              <small>Discerning AI field guide</small>
            </span>
          </button>

          <nav className="discerning-nav" aria-label="Guide sections">
            <button type="button" className="site-nav-link" onClick={() => scrollToId("real-game")}>
              Real game
            </button>
            <button type="button" className="site-nav-link" onClick={() => scrollToId("framework")}>
              Framework
            </button>
            <button type="button" className="site-nav-link" onClick={() => scrollToId("prompts")}>
              Prompt library
            </button>
            <button type="button" className="site-nav-link" onClick={() => scrollToId("implementation")}>
              Implementation
            </button>
          </nav>

          <div className="site-header-actions">
            <button type="button" className="marketing-secondary-button" onClick={() => onNavigate("/")}>
              Back to aiButler
            </button>
            <button type="button" className="marketing-primary-button" onClick={() => openGuideChat("header")}>
              Talk to Mira
            </button>
          </div>
        </header>

        <main className="site-main discerning-main">
          <section className="discerning-hero">
            <div className="discerning-hero-copy">
              <div className="site-hero-kicker">
                <Sparkles size={14} />
                Premium field guide for founders, operators, and business owners
              </div>

              <h1 className="discerning-hero-title">The Discerning Business Owner’s Guide to AI</h1>
              <p className="discerning-hero-subtitle">
                How to harness AI for real business leverage without losing your voice, standards, or edge.
              </p>
              <p className="discerning-lead">
                Most business owners do not need more AI hype. They need a practical system for using AI well. This guide is for the
                owner who wants speed without sounding robotic, leverage without dependence, and better output without lowering the bar.
              </p>

              <div className="site-hero-actions">
                <button type="button" className="marketing-primary-button" onClick={() => scrollToId("framework")}>
                  Read the framework
                  <ArrowRight size={16} />
                </button>
                <button type="button" className="marketing-secondary-button" onClick={() => openGuideChat("hero")}>
                  <MessageSquareText size={16} />
                  Ask Mira where to start
                </button>
              </div>

              <div className="discerning-chip-grid">
                {guideHighlights.map((item) => (
                  <span key={item} className="site-chip discerning-chip">
                    {item}
                  </span>
                ))}
              </div>

              <article className="discerning-quote-card">
                <p>“{pullQuotes[0]}”</p>
                <span>The rule that should govern almost everything.</span>
              </article>
            </div>

            <aside className="discerning-rail">
              <article className="site-stage-card site-stage-card--accent discerning-rail-card">
                <span className="site-card-kicker">This guide is for</span>
                <h2>Owners who want leverage, not slop.</h2>
                <ul className="discerning-checklist">
                  <li>save time without sounding artificial</li>
                  <li>use AI without outsourcing judgment</li>
                  <li>speed up communication, writing, and planning</li>
                  <li>protect the parts of the business where trust still matters most</li>
                </ul>
              </article>

              <article className="discerning-mini-stats">
                <div>
                  <span>Read time</span>
                  <strong>12 min</strong>
                </div>
                <div>
                  <span>Prompt pack</span>
                  <strong>6 core prompts</strong>
                </div>
                <div>
                  <span>First test</span>
                  <strong>1 week</strong>
                </div>
              </article>

              <article className="discerning-rail-card discerning-rail-card--soft">
                <span className="site-card-kicker">Best next move</span>
                <p>
                  Read the framework first. If you already know where the friction is, skip straight to the prompt library and the
                  one-week implementation plan.
                </p>
                <div className="discerning-rail-actions">
                  <button type="button" className="marketing-secondary-button" onClick={() => scrollToId("prompts")}>
                    Jump to prompts
                  </button>
                  <button type="button" className="marketing-secondary-button" onClick={() => scrollToId("capture")}>
                    Get tailored help
                  </button>
                </div>
              </article>
            </aside>
          </section>

          <section className="site-section discerning-section" id="real-game">
            <div className="site-section-head discerning-section-head">
              <div>
                <span className="site-section-number">01</span>
                <h2>The real game: use AI for leverage, not substitution.</h2>
              </div>
              <p>
                AI is powerful. AI is not wise. It can accelerate drafting, organization, summarization, and option generation. It
                becomes dangerous when business owners mistake fluency for quality or speed for discernment.
              </p>
            </div>

            <div className="discerning-dual-grid">
              <article className="site-pillar-card discerning-feature-card">
                <span className="site-card-kicker">What AI is excellent at</span>
                <h3>Fast, structured leverage</h3>
                <ul className="discerning-bullet-list">
                  {leverageStrengths.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="site-pillar-card discerning-feature-card discerning-feature-card--warning">
                <span className="site-card-kicker">Where it breaks down</span>
                <h3>Average by default unless you supervise it</h3>
                <ul className="discerning-bullet-list">
                  {leverageRisks.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>

            <div className="discerning-callout-grid">
              <article className="site-stage-card discerning-callout">
                <span className="site-card-kicker">The mental model that saves people</span>
                <p className="discerning-callout-copy">
                  AI is a fast, tireless junior operator with broad pattern knowledge and zero real-world accountability.
                </p>
              </article>

              <article className="site-stage-card discerning-callout">
                <span className="site-card-kicker">What follows from that</span>
                <p className="discerning-callout-copy">
                  Use AI for speed. Use yourself for truth, trust, taste, judgment, and final quality.
                </p>
              </article>
            </div>
          </section>

          <section className="site-section discerning-section" id="framework">
            <div className="site-section-head discerning-section-head">
              <div>
                <span className="site-section-number">02</span>
                <h2>The discernment framework: automate, assist, or protect.</h2>
              </div>
              <p>
                Every task in the business falls into one of three buckets. Sort them properly and AI becomes useful fast. Sort them
                badly and it weakens trust, voice, and quality.
              </p>
            </div>

            <div className="discerning-framework-grid">
              {frameworkBuckets.map((bucket) => (
                <article key={bucket.key} className={`site-tier-detail discerning-bucket discerning-bucket--${bucket.key}`}>
                  <div>
                    <span className="site-card-kicker">Bucket</span>
                    <h3>{bucket.title}</h3>
                    <p>{bucket.summary}</p>
                  </div>

                  <div className="discerning-bucket-meta">
                    <div>
                      <span>Examples</span>
                      <ul className="discerning-bullet-list discerning-bullet-list--compact">
                        {bucket.examples.map((example) => (
                          <li key={example}>{example}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span>What good looks like</span>
                      <p>{bucket.goodLooksLike}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="discerning-filter-grid">
              <article className="site-aside-card discerning-filter-card">
                <span className="site-card-kicker">Five-question decision filter</span>
                <ol className="site-next-step-list">
                  {decisionQuestions.map((question) => (
                    <li key={question}>{question}</li>
                  ))}
                </ol>
              </article>

              <article className="site-aside-card discerning-filter-card discerning-filter-card--accent">
                <span className="site-card-kicker">Fast decision rule</span>
                <div className="discerning-rule-stack">
                  <div>
                    <strong>Repetitive + low-stakes</strong>
                    <p>Automate.</p>
                  </div>
                  <div>
                    <strong>Nuanced but draftable</strong>
                    <p>Assist.</p>
                  </div>
                  <div>
                    <strong>Trust-heavy or consequence-heavy</strong>
                    <p>Protect.</p>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section className="site-section discerning-section">
            <div className="site-cta-band discerning-inline-band">
              <div>
                <span className="site-card-kicker">If you only take one thing</span>
                <h2>The winners will not be the people using AI the most. They will be the people using it with the most discernment.</h2>
                <p>
                  The right next step is not “put AI everywhere.” It is “find the single workflow where AI removes friction without
                  weakening trust.”
                </p>
              </div>

              <div className="site-cta-actions">
                <button type="button" className="marketing-primary-button" onClick={() => openGuideChat("mid-band")}>
                  Ask Mira to sort your workflows
                </button>
                <button type="button" className="marketing-secondary-button" onClick={() => scrollToId("capture")}>
                  Get the tailored next step
                </button>
              </div>
            </div>
          </section>

          <section className="site-section discerning-section" id="prompts">
            <div className="site-section-head discerning-section-head">
              <div>
                <span className="site-section-number">03</span>
                <h2>The prompt library: high-leverage prompts you can actually use.</h2>
              </div>
              <p>
                Weak output usually starts with weak instructions. Serious prompts give the model a role, context, constraints, and a
                quality bar. These six are designed to create commercially useful work, not generic AI copy.
              </p>
            </div>

            <div className="discerning-prompt-grid">
              {promptTemplates.map((prompt, index) => (
                <article key={prompt.key} className="site-stage-card discerning-prompt-card">
                  <div className="discerning-prompt-head">
                    <div>
                      <span className="site-card-kicker">{`Prompt 0${index + 1}`}</span>
                      <h3>{prompt.title}</h3>
                    </div>

                    <button
                      type="button"
                      className={`discerning-copy-button ${copiedPromptKey === prompt.key ? "is-copied" : ""}`}
                      onClick={() => handleCopyPrompt(prompt.key, prompt.body)}
                    >
                      {copiedPromptKey === prompt.key ? <Check size={15} /> : <Copy size={15} />}
                      {copiedPromptKey === prompt.key ? "Copied" : "Copy prompt"}
                    </button>
                  </div>

                  <p className="discerning-prompt-usecase">{prompt.useCase}</p>
                  <p>{prompt.summary}</p>

                  <details className="discerning-prompt-details">
                    <summary>Open full prompt</summary>
                    <pre>{prompt.body}</pre>
                  </details>
                </article>
              ))}
            </div>
          </section>

          <section className="site-section discerning-section" id="implementation">
            <div className="site-section-head discerning-section-head">
              <div>
                <span className="site-section-number">04</span>
                <h2>The one-week implementation plan: start without making a mess.</h2>
              </div>
              <p>
                Do not try to transform the whole business in one weekend. Run one intelligent test, evaluate it honestly, and only
                keep what actually earns its place.
              </p>
            </div>

            <div className="discerning-timeline">
              {implementationDays.map((item) => (
                <article key={item.day} className="discerning-timeline-card">
                  <span className="site-card-kicker">{item.day}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>

            <div className="discerning-mistakes-shell">
              <div className="discerning-mistakes-head">
                <span className="site-card-kicker">The seven mistakes that make AI disappointing</span>
                <h3>Most bad AI use is not a model problem. It is an implementation problem.</h3>
              </div>

              <div className="discerning-mistake-grid">
                {implementationMistakes.map((mistake, index) => (
                  <article key={mistake} className="site-stat-card discerning-mistake-card">
                    <span>{`0${index + 1}`}</span>
                    <p>{mistake}</p>
                  </article>
                ))}
              </div>
            </div>

            <article className="discerning-bottom-line">
              <p>AI can make you more effective. It can also make you more average.</p>
              <span>The difference is not the model. The difference is discernment.</span>
            </article>
          </section>

          <section className="site-section discerning-section" id="capture">
            <FunnelCta
              title="Want help applying this to your business?"
              body="A generic AI strategy is not much of a strategy. The real value comes from identifying where AI fits into your workflows, bottlenecks, and customer experience without flattening the standards that matter."
              offer="Get a tailored discovery session focused on your highest-ROI workflow, what should stay human-led, and the cleanest first implementation path."
              ctaLabel="Route me to the right next step"
              segment="discerning-ai-guide"
              audienceLabel="Discerning AI guide readers"
              sourcePath={pathname}
            />
          </section>
        </main>

        <ChatWidget segment={guideSegment} />
      </div>
    </div>
  );
}
