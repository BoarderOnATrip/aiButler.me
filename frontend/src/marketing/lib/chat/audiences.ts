import type { ChatAudienceConfig, MiraAudience } from "./types";

export const CHAT_AUDIENCE_ORDER: MiraAudience[] = [
  "new-visitor",
  "random-traffic",
  "user",
  "returning-customer",
  "investor",
];

export const CHAT_AUDIENCES: Record<MiraAudience, ChatAudienceConfig> = {
  "new-visitor": {
    id: "new-visitor",
    label: "Brand new",
    eyebrow: "First impression",
    headline: "A calm entrance for people who are just discovering the Butler.",
    description:
      "Start with a simple orientation: what the Butler does, why it matters, and how quickly it can reduce coordination drag.",
    cta: "Show me what this does",
    proofPoints: [
      "Instantly frames the problem in plain language",
      "Demonstrates a warm, high-status tone",
      "Routes the visitor to the right next step",
    ],
    opening:
      "Welcome in. I am Mira. If you are new here, I can show you what the Butler actually does in under a minute.",
    followUp:
      "Tell me whether you are here for personal workflow relief, a team rollout, or a deeper look at the system itself.",
  },
  "random-traffic": {
    id: "random-traffic",
    label: "Random traffic",
    eyebrow: "Open loop",
    headline: "Turn curiosity into clarity before it decays into a bounce.",
    description:
      "Use a fast, editorial first pass to qualify interest, surface value, and decide whether the visitor should stay.",
    cta: "Keep me engaged",
    proofPoints: [
      "Immediate context and voice",
      "A guided first question instead of a dead form",
      "Natural handoff into lead capture when interest is real",
    ],
    opening:
      "You landed in the right place. I can help you quickly understand whether this is worth your time.",
    followUp:
      "If you are just browsing, I can give you a 30 second overview. If you are comparing solutions, I can go deeper.",
  },
  user: {
    id: "user",
    label: "Users",
    eyebrow: "Daily operator",
    headline: "Show the mechanics of the Butler when someone wants to see how it feels in use.",
    description:
      "Make the interface feel like a working assistant: triage, memory, rhythm, and controlled action.",
    cta: "Show me the workflow",
    proofPoints: [
      "Message triage with judgment",
      "Calendar shaping and follow-up relief",
      "Capability vault and audited delegation",
    ],
    opening:
      "If you want the practical version, I can walk you through the everyday workflow without the marketing gloss.",
    followUp:
      "I can show the message flow, the calendar layer, or the receipt and provenance layer first.",
  },
  "returning-customer": {
    id: "returning-customer",
    label: "Returning buyer",
    eyebrow: "Already purchased",
    headline: "Return visitors should feel remembered, not reset.",
    description:
      "Use context to resume the previous conversation, reinforce value, and move toward implementation or expansion.",
    cta: "Pick up where we left off",
    proofPoints: [
      "Recalls the last thread without friction",
      "Skips the beginner explanation",
      "Moves directly to next-step planning",
    ],
    opening:
      "Welcome back. I remember the thread. We can continue from the last point and skip the reset.",
    followUp:
      "If you want, I can move straight to rollout options, packaging, or the next integration step.",
  },
  investor: {
    id: "investor",
    label: "Investors",
    eyebrow: "Capital conversation",
    headline: "Lead with category, moat, and the compounding trust layer.",
    description:
      "The investor route should make the product legible in one pass: pain, wedge, retention, expansion, and research edge.",
    cta: "Show me the thesis",
    proofPoints: [
      "A large, recurring pain surface",
      "Single-user utility that can expand into a team layer",
      "Origami Encryption as the differentiated research track",
    ],
    opening:
      "If you are looking at this through an investor lens, I can keep the story sharp: product wedge, moat, and expansion path.",
    followUp:
      "I can start with the user pain, the product architecture, or the long-term trust research edge.",
  },
};

export function getAudienceConfig(id: MiraAudience): ChatAudienceConfig {
  return CHAT_AUDIENCES[id];
}
