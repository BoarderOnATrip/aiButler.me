import type { ChatAudienceConfig, ChatMessage, ChatRole, ChatStreamState, MiraAudience } from "./types";
import { getAudienceConfig } from "./audiences";

export const INITIAL_CHAT_STREAM: ChatStreamState = {
  status: "idle",
  draft: "",
  committedText: "",
  tokenCount: 0,
  lastUpdated: Date.now(),
};

function sentenceForAudience(audience: MiraAudience, prompt: string): string {
  const base = getAudienceConfig(audience);
  switch (audience) {
    case "investor":
      return `${base.opening} The wedge is daily pain, the moat is trust and memory, and the research edge is Origami Encryption. You are not buying a generic chatbot. You are buying an operating layer that can compound across users, teams, and future trust systems.`;
    case "user":
      return `${base.opening} The practical value is simple: I help reduce noise, shape the calendar, and keep the right work in front of you. If you want, I can show the message triage loop, the receipt memory, or the capability vault first.`;
    case "returning-customer":
      return `${base.opening} The next sensible step is to move from explanation to implementation. We can refine the rollout plan, the tiering, or the exact workflows you want the Butler to own.`;
    case "random-traffic":
      return `${base.opening} If your attention is still in the room, I can earn it with a quick overview of the product, the problem it solves, and the reasons it feels different.`;
    case "new-visitor":
    default:
      return `${base.opening} Start with the everyday problem it solves: too many messages, too much context switching, and too much coordination overhead. Then we can move into what the product actually does.`;
  }
}

export function getAudienceOpening(audience: MiraAudience): ChatMessage[] {
  const config = getAudienceConfig(audience);
  return [
    {
      id: `${audience}-mira-open`,
      role: "mira",
      text: config.opening,
      createdAt: Date.now(),
      accent: "copper",
    },
    {
      id: `${audience}-mira-followup`,
      role: "hint",
      text: config.followUp,
      createdAt: Date.now(),
    },
  ];
}

export function buildMockResponse(
  audience: MiraAudience,
  prompt: string,
  history: ChatMessage[],
): string {
  const trimmedPrompt = prompt.trim();
  const base = sentenceForAudience(audience, trimmedPrompt);
  const persona = getAudienceConfig(audience);
  const priorUser = [...history].reverse().find((message) => message.role === "user");
  const suffix = priorUser
    ? ` You mentioned: "${priorUser.text.slice(0, 96)}${priorUser.text.length > 96 ? "..." : ""}".`
    : "";

  return `${base} ${suffix} ${persona.followUp}`;
}

export function tokenizeResponse(text: string): string[] {
  const tokens: string[] = [];
  const parts = text.split(/(\s+)/g).filter(Boolean);
  let buffer = "";

  for (const part of parts) {
    buffer += part;
    if (buffer.length >= 16 || /\n/.test(part) || /\.\s*$/.test(part) || /[!?]\s*$/.test(part)) {
      tokens.push(buffer);
      buffer = "";
    }
  }

  if (buffer) {
    tokens.push(buffer);
  }

  return tokens;
}

export function streamTextTokens(
  text: string,
  onChunk: (chunk: string, index: number) => void,
  onComplete: () => void,
  paceMs = 38,
): () => void {
  const tokens = tokenizeResponse(text);
  const timers: number[] = [];

  tokens.forEach((chunk, index) => {
    const timer = window.setTimeout(() => {
      onChunk(chunk, index);
      if (index === tokens.length - 1) {
        onComplete();
      }
    }, index * paceMs);
    timers.push(timer);
  });

  return () => {
    timers.forEach((timer) => window.clearTimeout(timer));
  };
}

export function nextMessageId(prefix: ChatRole, counter: number): string {
  return `${prefix}-${counter}-${Math.random().toString(36).slice(2, 8)}`;
}

export function asSeedThread(audience: MiraAudience): ChatMessage[] {
  return getAudienceOpening(audience);
}
