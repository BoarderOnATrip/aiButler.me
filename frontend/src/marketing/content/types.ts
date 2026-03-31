export type AudienceKey =
  | "random-traffic"
  | "investors"
  | "users"
  | "returning-buyers"
  | "brand-new-visitors";

export type FunnelKey = "random" | "investors" | "users" | "returning" | "new";

export type ServiceTierKey = "tasting" | "barrel-select" | "reserve";

export interface FunnelHero {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
}

export interface ProofPoint {
  label: string;
  value: string;
  detail: string;
}

export interface FunnelObjection {
  objection: string;
  response: string;
}

export interface ServiceTierCopy {
  key: ServiceTierKey;
  label: string;
  name: string;
  price: string;
  summary: string;
  bullets: string[];
  cta: string;
  bestFor: string;
  promise: string;
}

export interface FunnelDefinition {
  key: FunnelKey;
  legacyKey: AudienceKey;
  path: string;
  navLabel: string;
  audienceLabel: string;
  audience: string;
  intent: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  narrative: string;
  proofPoints: ProofPoint[];
  highlights: string[];
  objections: string[];
  nextSteps: string[];
  offer: string;
  prompt: string;
  chatPrompts: string[];
  hero: FunnelHero;
  ctas: {
    primary: string;
    secondary: string;
    microcopy: string;
  };
  objectionHandling: FunnelObjection[];
  serviceTiers: ServiceTierCopy[];
  sectionNotes: string[];
}

export interface AudienceFunnelCopy {
  key: AudienceKey;
  audience: string;
  intent: string;
  hero: FunnelHero;
  proofPoints: ProofPoint[];
  ctas: {
    primary: string;
    secondary: string;
    microcopy: string;
  };
  objectionHandling: FunnelObjection[];
  serviceTiers: ServiceTierCopy[];
  sectionNotes: string[];
}

export type FunnelProofPoint = ProofPoint;
