import { useMemo, useState } from "react";
import { captureEvent } from "../../../lib/posthog";
import { captureMarketingLead } from "../../lib/marketing-api";

type FunnelCtaProps = {
  title: string;
  body: string;
  offer: string;
  ctaLabel: string;
  segment?: string;
  audienceLabel?: string;
  sourcePath?: string;
};

export default function FunnelCta({
  title,
  body,
  offer,
  ctaLabel,
  segment = "random",
  audienceLabel = "Curious visitors",
  sourcePath = "/",
}: FunnelCtaProps) {
  const [email, setEmail] = useState("");
  const [submissionMode, setSubmissionMode] = useState<"captured" | "handoff" | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const nextSteps = useMemo(
    () => [
      "Mira tags the segment and preserves the context.",
      "The right asset or follow-up room is selected automatically.",
      "The next step feels like a handoff, not a dead autoresponder.",
    ],
    [],
  );

  const fallbackMailto = useMemo(() => {
    const trimmed = email.trim();
    const subject = `aiButler inquiry — ${audienceLabel}`;
    const body = [
      `Email: ${trimmed || "[enter email]"}`,
      `Segment: ${segment}`,
      `Audience: ${audienceLabel}`,
      `Offer: ${offer}`,
      `Source: ${sourcePath}`,
      "",
      "I’m replying from the aiButler public site.",
    ].join("\n");
    return `mailto:Tyler@TylerSteeves.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [audienceLabel, email, offer, segment, sourcePath]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    setSubmitting(true);
    setError("");
    window.localStorage.setItem("aibutler-lead-email", trimmed);
    captureEvent("marketing_lead_submit_started", {
      segment,
      path: sourcePath,
    });

    try {
      await captureMarketingLead({
        email: trimmed,
        segment,
        audienceLabel,
        offer,
        sourcePath,
      });
      captureEvent("marketing_lead_captured", {
        segment,
        path: sourcePath,
      });
      setSubmissionMode("captured");
    } catch (captureError: any) {
      captureEvent("marketing_lead_handoff", {
        segment,
        path: sourcePath,
      });
      setSubmissionMode("handoff");
      setError("");
      window.location.href = fallbackMailto;
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="marketing-cta-shell">
      <div>
        <p className="marketing-eyebrow">Low-friction conversion</p>
        <h3 className="marketing-cta-title">{title}</h3>
        <p className="marketing-section-subtitle marketing-section-subtitle--wide">{body}</p>
        <div className="marketing-cta-steps">
          {nextSteps.map((step, index) => (
            <div key={step} className="marketing-highlight-card">
              <p className="marketing-eyebrow">0{index + 1}</p>
              <p className="marketing-highlight-copy">{step}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="marketing-cta-card">
        {!submissionMode ? (
          <form className="marketing-cta-form" onSubmit={handleSubmit}>
            <p className="marketing-cta-offer">{offer}</p>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="marketing-email-input"
              placeholder="Email for the next step"
              type="email"
            />
            <button type="submit" className="marketing-primary-button marketing-primary-button--block">
              {submitting ? "Routing you..." : ctaLabel}
            </button>
            {error ? <p className="marketing-cta-error">{error}</p> : null}
          </form>
        ) : submissionMode === "captured" ? (
          <div className="marketing-cta-state">
            <p className="marketing-cta-state-label">Captured cleanly</p>
            <p className="marketing-cta-state-copy">
              Mira will treat that as the start of a tailored next step, not the end of a dead form.
            </p>
          </div>
        ) : (
          <div className="marketing-cta-state">
            <p className="marketing-cta-state-label">Direct handoff</p>
            <p className="marketing-cta-state-copy">
              This surface is running without the live capture backend, so I opened a direct email handoff instead. If Mail did not open, use the link below.
            </p>
            <a className="marketing-secondary-button marketing-secondary-button--block" href={fallbackMailto}>
              Email Tyler directly
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
