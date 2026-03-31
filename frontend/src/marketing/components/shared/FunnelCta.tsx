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
  const [submitted, setSubmitted] = useState(false);
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
      setSubmitted(true);
    } catch (captureError: any) {
      setError(captureError?.message || "Lead capture failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="marketing-cta-shell">
      <div>
        <p className="marketing-eyebrow">Low-friction conversion</p>
        <h3 className="marketing-cta-title">{title}</h3>
        <p className="marketing-section-subtitle max-w-2xl">{body}</p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {nextSteps.map((step, index) => (
            <div key={step} className="marketing-highlight-card">
              <p className="marketing-eyebrow">0{index + 1}</p>
              <p className="text-sm leading-6 text-[var(--marketing-cream-muted)]">{step}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="marketing-cta-card">
        {!submitted ? (
          <form className="space-y-3" onSubmit={handleSubmit}>
            <p className="text-sm text-[var(--marketing-cream-muted)]">{offer}</p>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="marketing-email-input"
              placeholder="Email for the next step"
              type="email"
            />
            <button type="submit" className="marketing-primary-button w-full">
              {submitting ? "Routing you..." : ctaLabel}
            </button>
            {error ? <p className="text-sm text-rose-200">{error}</p> : null}
          </form>
        ) : (
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--marketing-copper)]">Captured cleanly</p>
            <p className="text-base text-[var(--marketing-cream)]">
              Beautiful. Mira will treat that as the start of the conversation, not the end of a form.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
