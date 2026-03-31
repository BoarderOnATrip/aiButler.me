import { serviceTiers } from "../../content/funnels";

export default function ServiceTierCards() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {serviceTiers.map((tier) => (
        <article key={tier.name} className="marketing-tier-card">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="marketing-tier-kicker">{tier.label}</p>
              <h3 className="marketing-tier-name">{tier.name}</h3>
            </div>
            <span className="marketing-tier-price">{tier.price}</span>
          </div>
          <p className="marketing-tier-summary">{tier.summary}</p>
          <ul className="marketing-tier-list">
            {tier.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <button type="button" className="marketing-secondary-button w-full">
            {tier.cta}
          </button>
        </article>
      ))}
    </div>
  );
}
