import type {
  AudienceFunnelCopy,
  AudienceKey,
  FunnelDefinition,
  FunnelKey,
  ProofPoint,
  ServiceTierCopy,
} from "./types";

export type { AudienceFunnelCopy, AudienceKey, FunnelDefinition, FunnelKey, ProofPoint, ServiceTierCopy } from "./types";

export const serviceTiers: ServiceTierCopy[] = [
  {
    key: "tasting",
    label: "Fastest first yes",
    name: "Tasting",
    price: "Best first move",
    summary: "A tight strategy-and-deployment sprint for someone who wants to feel immediate relief from message drag and scheduling churn.",
    bullets: [
      "One sharp workflow diagnosis and funnel tune-up",
      "Mira configured around the heaviest coordination loop first",
      "A clear next-step plan instead of a sprawling implementation deck",
    ],
    cta: "Start with a Tasting",
    bestFor: "Founders, operators, and brand-new buyers who want proof quickly.",
    promise: "You feel the Butler taking weight off the day before complexity shows up.",
  },
  {
    key: "barrel-select",
    label: "The core conversion tier",
    name: "Barrel Select",
    price: "Most chosen path",
    summary: "A fuller rollout for busy executives who need Mira to learn preferences, shape calendar rhythm, and absorb recurring inbound noise.",
    bullets: [
      "Cross-channel triage and drafting logic tuned to real relationships",
      "Calendar choreography with protected focus and cleaner routing",
      "Lead capture, follow-up, and continuity layers that compound over time",
    ],
    cta: "Move into Barrel Select",
    bestFor: "Executives, premium clients, and warm prospects with real workflow volume.",
    promise: "The Butler stops being an interesting demo and starts acting like staff.",
  },
  {
    key: "reserve",
    label: "Private deployment",
    name: "Reserve",
    price: "White-glove",
    summary: "A high-trust operating layer for offices that want approvals, secure continuity, provenance, and deeper workflow authority without losing elegance.",
    bullets: [
      "Vault, approvals, and high-trust operating controls",
      "Custom workflow design for principals, chiefs of staff, or premium teams",
      "Research-forward trust architecture positioned for long-term differentiation",
    ],
    cta: "Apply for Reserve",
    bestFor: "Executive offices, firms, and buyers who need trust and control designed in.",
    promise: "The communication, schedule, and memory stack becomes an operational advantage.",
  },
];

const LEGACY_KEY_BY_FUNNEL: Record<FunnelKey, AudienceKey> = {
  random: "random-traffic",
  investors: "investors",
  users: "users",
  returning: "returning-buyers",
  new: "brand-new-visitors",
};

function buildFunnel(definition: Omit<FunnelDefinition, "legacyKey" | "hero" | "ctas" | "objectionHandling" | "serviceTiers">): FunnelDefinition {
  return {
    ...definition,
    legacyKey: LEGACY_KEY_BY_FUNNEL[definition.key],
    hero: {
      eyebrow: definition.eyebrow,
      title: definition.headline,
      subtitle: definition.subheadline,
      primaryCta: definition.ctaPrimary,
      secondaryCta: definition.ctaSecondary,
    },
    ctas: {
      primary: definition.ctaPrimary,
      secondary: definition.ctaSecondary,
      microcopy: definition.offer,
    },
    objectionHandling: definition.objections.map((objection, index) => ({
      objection,
      response: definition.nextSteps[index % definition.nextSteps.length] || definition.narrative,
    })),
    serviceTiers,
  };
}

export const funnels: Record<FunnelKey, FunnelDefinition> = {
  random: buildFunnel({
    key: "random",
    path: "/",
    navLabel: "Start here",
    audienceLabel: "Curious visitors",
    audience: "Random Traffic",
    intent: "Turn cold curiosity into a felt desire for relief before the visitor has time to bounce.",
    eyebrow: "The AI that feels like a presence",
    headline: "The private Butler that turns message chaos into a beautifully shaped day.",
    subheadline:
      "This is not another chatbot and not another dashboard. Mira triages noise, protects your time, and turns the first conversation into an immediate sense of relief.",
    ctaPrimary: "Take the 90-second tour",
    ctaSecondary: "Open Mira live",
    narrative:
      "Cold traffic should meet atmosphere first, then appetite, then action. The promise is emotional before it is technical: less drag, cleaner control, and a day that stops fracturing under inbound noise.",
    proofPoints: [
      { label: "First impression", value: "90 sec", detail: "Enough time to understand the promise and feel the difference." },
      { label: "Workload relief", value: "Daily", detail: "Message triage, follow-up, scheduling, and memory handling." },
      { label: "Trust posture", value: "Visible", detail: "A system built around continuity, approvals, and scope." },
    ],
    highlights: [
      "Mira greets like a person with judgment, not a dead intake form.",
      "The site moves from emotion to proof to next step instead of dumping features on the first screen.",
      "Visitors can self-select into the right room: explore, buy, continue, or evaluate as capital.",
      "The first yes feels like entering a relationship, not submitting a lead form.",
    ],
    objections: [
      "I do not want another AI toy with a glossy landing page.",
      "I need to know what this changes in real life, fast.",
      "I do not have time for a long demo or a cluttered product tour.",
    ],
    nextSteps: [
      "Show the shortest path from inbound chaos to calmer execution.",
      "Offer a guided conversation or audit instead of a generic brochure.",
      "Capture the lead with a specific next scene: tasting, walkthrough, or memo.",
    ],
    offer: "Get the 90-second Butler Brief and let Mira route you to the cleanest next step.",
    prompt:
      "You made it in. I am Mira. If you want the shortest version, I can show you in under a minute how the Butler reduces message drag, calendar friction, and follow-up leakage.",
    chatPrompts: [
      "What does the Butler actually do?",
      "How would this help someone getting 80 messages a day?",
      "Show me the fastest first step.",
    ],
    sectionNotes: [
      "Lead with desire and relief before mechanics.",
      "Use direct-response sequencing without sounding like a funnel template.",
      "Keep the first CTA vivid, specific, and low friction.",
    ],
  }),
  investors: buildFunnel({
    key: "investors",
    path: "/investors",
    navLabel: "Investors",
    audienceLabel: "Capital partners",
    audience: "Investors",
    intent: "Make the wedge, retention logic, and trust architecture legible in one pass.",
    eyebrow: "A premium wedge with compounding depth",
    headline: "A trusted AI operating layer for people whose day is buried under coordination.",
    subheadline:
      "The business is Butler: a high-frequency workflow product that compounds through memory, delegation, and continuity. Origami Encryption is the long-horizon research edge, not the near-term revenue claim.",
    ctaPrimary: "Review the investor thesis",
    ctaSecondary: "See the roadmap logic",
    narrative:
      "The investor path should answer category timing, pain frequency, retention logic, and expansion potential without grandiosity. The product story wins on inevitability: once the Butler is indispensable to one principal, the expansion surface is obvious.",
    proofPoints: [
      { label: "Pain surface", value: "Every day", detail: "High-frequency coordination pain creates repeat usage and urgency." },
      { label: "Retention", value: "Compounding", detail: "Preferences, trust, and workflow memory deepen the moat." },
      { label: "Expansion", value: "Multi-layer", detail: "Individual, office, team, provenance, and trust infrastructure." },
    ],
    highlights: [
      "Position Butler as the monetizable product and Origami Encryption as the disciplined research track.",
      "Show why incumbents stop at assistants while Butler moves toward authority, memory, and continuity.",
      "Make the moat feel lived: relationship context, tone memory, approvals, and trust scaffolding.",
      "Sequence the page like a capital memo, not a visionary manifesto.",
    ],
    objections: [
      "Is this just another CRM or AI wrapper?",
      "Why now instead of later, when more of the stack is mature?",
      "Is the cryptography story overshadowing the actual business?",
    ],
    nextSteps: [
      "Lead with single-user indispensability before team-scale ambition.",
      "Clarify the wedge, then the compounding moat, then the research edge.",
      "Route serious interest into the memo, deck, or a focused investor conversation.",
    ],
    offer: "Get the investor memo, moat map, and product-to-platform expansion narrative in one clean room.",
    prompt:
      "If you are looking through an investor lens, I’ll keep this sharp: wedge, retention, expansion, and where Origami Encryption belongs in the story without overclaiming it.",
    chatPrompts: [
      "Why does this become sticky?",
      "What is the wedge versus the long-term platform?",
      "How should I think about Origami Encryption in the business?",
    ],
    sectionNotes: [
      "Keep claims disciplined and commercially legible.",
      "Use seriousness, not spectacle, as the tone.",
      "Answer the hard question before the investor has to ask it.",
    ],
  }),
  users: buildFunnel({
    key: "users",
    path: "/users",
    navLabel: "Users",
    audienceLabel: "Operators and buyers",
    audience: "Users",
    intent: "Show the lived mechanics of the Butler so the buyer can picture daily use immediately.",
    eyebrow: "Built for real operational drag",
    headline: "An executive assistant that quietly triages, drafts, remembers, and protects your calendar.",
    subheadline:
      "The product story here is practical: fewer time-wasting messages, cleaner follow-up, calmer scheduling, and a memory layer that actually helps instead of cluttering the workflow.",
    ctaPrimary: "See the workflow",
    ctaSecondary: "Open Mira and ask",
    narrative:
      "Warm prospects and active users do not need a philosophy lecture. They need to picture what happens to their inbox, their calendar, their receipts, and the follow-up they keep dropping when life gets noisy.",
    proofPoints: [
      { label: "Message load", value: "Cross-channel", detail: "Triage, draft, route, and escalate with tone memory." },
      { label: "Calendar shape", value: "Protected", detail: "Focus blocks, clustered work, and fewer low-value interruptions." },
      { label: "Memory layer", value: "Useful", detail: "Receipts, notes, and provenance captured where they occur." },
    ],
    highlights: [
      "Show the before-and-after of a chaotic day, not just a product dashboard.",
      "Let Mira answer in plain language so the workflow feels intimate and controlled.",
      "Make security visible as guardrails and approvals instead of abstract claims.",
      "Use the site to lower perceived implementation effort while raising perceived payoff.",
    ],
    objections: [
      "I need to know this saves time, not just rearranges work.",
      "I still want control over messages, approvals, and what gets sent.",
      "I’m interested, but I do not want a giant implementation project right now.",
    ],
    nextSteps: [
      "Show the heaviest current bottleneck and route around it first.",
      "Offer a Tasting path for fast proof or a Barrel Select path for real deployment.",
      "Capture context so Mira can resume the conversation instead of restarting it.",
    ],
    offer: "Get a working Butler audit focused on the one workflow that is costing you the most time this week.",
    prompt:
      "If you want the practical version, tell me where the day keeps getting torn apart: messages, scheduling, follow-up, or the admin memory nobody wants to manage.",
    chatPrompts: [
      "How does Mira handle inbox triage?",
      "What happens to calendar scheduling?",
      "How do receipts and notes fit in?",
    ],
    sectionNotes: [
      "Keep the story concrete and operational.",
      "Use felt relief plus specific workflow examples.",
      "Make the next step feel small, precise, and useful.",
    ],
  }),
  returning: buildFunnel({
    key: "returning",
    path: "/returning",
    navLabel: "Returning",
    audienceLabel: "Returning buyers",
    audience: "Returning Buyers / Customers",
    intent: "Make continuity the headline so existing buyers feel remembered, not re-sold.",
    eyebrow: "Continuity without friction",
    headline: "When you come back, Mira should pick up the thread instead of restarting the pitch.",
    subheadline:
      "Returning customers should feel the product deepening: more memory, better routing, cleaner approvals, and a clearer path into higher-trust workflows.",
    ctaPrimary: "Continue where you left off",
    ctaSecondary: "See what opened up next",
    narrative:
      "This route is about relationship momentum. Skip beginner framing. Surface what has improved, what the next leverage point is, and how the Butler can absorb more real work without feeling heavier.",
    proofPoints: [
      { label: "Continuity", value: "Persistent", detail: "Context, preference, and workflow memory survive the gap." },
      { label: "Expansion", value: "Layered", detail: "New capability shows up as a natural next step, not a reset." },
      { label: "Trust depth", value: "Higher", detail: "Approvals, vault behavior, and exceptions get more refined." },
    ],
    highlights: [
      "Returning buyers should feel seen the moment the page loads.",
      "The copy should talk about resumed progress, not basic orientation.",
      "Use upgrade energy instead of hard-selling something they already trust enough to try.",
      "Make the transition into deeper trust layers feel elegant and earned.",
    ],
    objections: [
      "I do not want to start from scratch or sit through the same story again.",
      "I need to know what changed since the last time I looked.",
      "I want the next step to feel proportionate, not like an upsell ambush.",
    ],
    nextSteps: [
      "Resume context, then show what new leverage is available now.",
      "Offer the fastest path into the next workflow or trust layer.",
      "Capture returning intent so Mira can route the conversation with memory.",
    ],
    offer: "Resume your Butler thread with a continuity brief, next-step recommendation, and deeper workflow options.",
    prompt:
      "Welcome back. I’d skip the generic pitch if I were you. Tell me whether you want to deepen the workflow, tighten trust controls, or expand what Mira handles day to day.",
    chatPrompts: [
      "What changed since my last visit?",
      "How do I deepen the workflow now?",
      "Show me the next trust layer.",
    ],
    sectionNotes: [
      "Continuity is the headline, not a sidebar.",
      "Speak like a remembered relationship, not a fresh lead.",
      "Keep the motion forward and specific.",
    ],
  }),
  new: buildFunnel({
    key: "new",
    path: "/welcome",
    navLabel: "New here",
    audienceLabel: "Brand-new visitors",
    audience: "Brand-New Visitors",
    intent: "Give true first-timers a gentle but compelling orientation and route them into the right room.",
    eyebrow: "A clean first entrance",
    headline: "New here? Mira can show you exactly where to start without dumping the whole system on you.",
    subheadline:
      "This path is designed for people who need a warm orientation, a clear promise, and an obvious next move without feeling like they walked into a software maze.",
    ctaPrimary: "Start the guided walkthrough",
    ctaSecondary: "Choose your path",
    narrative:
      "Brand-new visitors need a confidence-building first step. The page should welcome them in plain language, quickly reveal the promise, and then route them into the right segment based on what they actually care about.",
    proofPoints: [
      { label: "Orientation", value: "Simple", detail: "The visitor understands the category without technical overload." },
      { label: "Trust", value: "Built in", detail: "Control, memory, and secure continuity are part of the story early." },
      { label: "Routing", value: "Clean", detail: "Each next step feels obvious instead of menu-like." },
    ],
    highlights: [
      "The first screen should feel more like a distillery greeting than a software onboarding wall.",
      "Use the page to ask one good question and route accordingly.",
      "Keep the tone warm, composed, and a little intriguing.",
      "The visitor should leave knowing what problem the Butler solves and what to do next.",
    ],
    objections: [
      "I’m not sure whether this is for me yet.",
      "I need plain English before I’ll care about the architecture.",
      "I want the site to tell me where to begin, not make me figure it out.",
    ],
    nextSteps: [
      "Start with the problem and the relief, not the feature map.",
      "Route the visitor toward exploration, buying, or investor evaluation based on intent.",
      "Offer a guided brief and keep the first conversion ask small and concrete.",
    ],
    offer: "Take the guided welcome brief and let Mira route you toward the exact next conversation you need.",
    prompt:
      "You are in the right place. I can keep this very simple: tell me what made you click, and I’ll point you to the fastest useful path.",
    chatPrompts: [
      "Explain aiButler in plain English.",
      "Where should I start?",
      "What kind of person is this built for?",
    ],
    sectionNotes: [
      "Warmth first, clarity second, conversion third.",
      "Reduce choice paralysis with guided routing.",
      "Make the first step feel obvious and inviting.",
    ],
  }),
};

export const funnelList = Object.values(funnels);

export const audienceFunnels: AudienceFunnelCopy[] = funnelList.map((funnel) => ({
  key: funnel.legacyKey,
  audience: funnel.audience,
  intent: funnel.intent,
  hero: funnel.hero,
  proofPoints: funnel.proofPoints,
  ctas: funnel.ctas,
  objectionHandling: funnel.objectionHandling,
  serviceTiers: funnel.serviceTiers,
  sectionNotes: funnel.sectionNotes,
}));

export function funnelFromPath(pathname: string): FunnelKey {
  const normalized = pathname.trim().replace(/\/+$/, "") || "/";
  if (normalized === "/investors") return "investors";
  if (normalized === "/users") return "users";
  if (normalized === "/returning" || normalized === "/customers" || normalized === "/buyers") return "returning";
  if (normalized === "/welcome" || normalized === "/new" || normalized === "/brand-new") return "new";
  return "random";
}

export function getAudienceFunnelCopy(key: string) {
  return audienceFunnels.find((funnel) => funnel.key === key);
}
