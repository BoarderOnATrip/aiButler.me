import type { FunnelDefinition } from "../../content/funnels";

export type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
};

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

export function initialGreeting(segment: FunnelDefinition): ChatMessage {
  return {
    id: makeId(),
    role: "assistant",
    text: segment.prompt,
  };
}

export function createUserMessage(text: string): ChatMessage {
  return { id: makeId(), role: "user", text };
}

export function createAssistantMessage(text = ""): ChatMessage {
  return { id: makeId(), role: "assistant", text };
}

export function buildMiraReply(segment: FunnelDefinition, input: string) {
  const lower = input.toLowerCase();

  if (segment.key === "investors") {
    if (lower.includes("moat") || lower.includes("defensible")) {
      return "The moat is not one prompt. It is relationship memory, secure continuity, workflow embeddings, and the trust people place in delegated execution. Origami Encryption stays in the research lane until it earns stronger claims.";
    }
    if (lower.includes("why now") || lower.includes("timing")) {
      return "Because the models are finally good enough to delegate meaningful work, while most products still stop at copilots. The gap now is trust, continuity, and orchestration — that is exactly where Butler lives.";
    }
    return "For investors, I usually start with the wedge: single-user indispensability first, team expansion second, differentiated trust architecture third. If you want, I can route you to moat, roadmap, or the capital narrative next.";
  }

  if (lower.includes("price") || lower.includes("cost") || lower.includes("tier")) {
    return "I frame price after fit. The right first move is usually Tasting for clarity, Barrel Select for implementation, and Reserve for the office that wants the full operating layer. Tell me the bottleneck and I will point you to the right tier.";
  }

  if (lower.includes("calendar") || lower.includes("schedule")) {
    return "Calendar choreography is one of the strongest surfaces. Mira is not just booking. She protects focus blocks, clusters similar work, and keeps low-value requests from breaking the shape of the day.";
  }

  if (lower.includes("email") || lower.includes("messages") || lower.includes("inbox")) {
    return "The promise is signal over noise. Mira triages, drafts, routes, and escalates with memory of tone and relationship context, so the user feels protected rather than buried.";
  }

  if (lower.includes("new") || lower.includes("plain english") || lower.includes("what is this")) {
    return "In plain English: aiButler is a private operating layer for people whose messages, calendar, follow-up, and receipts create too much drag. Mira makes the first step feel conversational, then routes the right people to the right next move.";
  }

  if (segment.key === "returning") {
    return "Since you are already in the system, I would skip the generic pitch and go straight to continuity: add a workflow, deepen the vault and approvals layer, or expand into team support. Which path feels closest?";
  }

  return "The shortest answer is this: Mira is built to turn coordination drag into a guided next step. If you tell me what feels heaviest right now, I will narrow the path instead of dumping the entire brochure on you.";
}

export async function* streamReply(reply: string) {
  const words = reply.split(/\s+/).filter(Boolean);
  let built = "";
  for (const word of words) {
    built = built ? `${built} ${word}` : word;
    yield built;
    await new Promise((resolve) => window.setTimeout(resolve, 42));
  }
}
