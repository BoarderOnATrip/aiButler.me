import { API_BASE } from "../../api";

export type MarketingChatTurn = {
  role: "assistant" | "user";
  text: string;
};

export type MarketingChatRequest = {
  segment: string;
  sourcePath: string;
  sessionId?: string;
  message: string;
  history: MarketingChatTurn[];
};

export type MarketingLeadCaptureRequest = {
  email: string;
  segment: string;
  audienceLabel: string;
  offer: string;
  sourcePath: string;
  note?: string;
  conversation?: MarketingChatTurn[];
};

type StreamHandlers = {
  signal?: AbortSignal;
  onToken: (text: string) => void;
  onDone?: (payload: Record<string, unknown>) => void;
};

function parseSseBlock(block: string) {
  let event = "message";
  const dataLines: string[] = [];

  for (const rawLine of block.split(/\r?\n/)) {
    const line = rawLine.trimEnd();
    if (!line || line.startsWith(":")) continue;
    if (line.startsWith("event:")) {
      event = line.slice(6).trim();
      continue;
    }
    if (line.startsWith("data:")) {
      dataLines.push(line.slice(5).trimStart());
    }
  }

  const dataText = dataLines.join("\n");
  let payload: Record<string, unknown> = {};
  if (dataText) {
    try {
      payload = JSON.parse(dataText) as Record<string, unknown>;
    } catch {
      payload = { text: dataText };
    }
  }

  return { event, payload };
}

export async function streamMarketingReply(
  payload: MarketingChatRequest,
  { signal, onToken, onDone }: StreamHandlers,
) {
  const response = await fetch(`${API_BASE}/marketing/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
    },
    body: JSON.stringify(payload),
    signal,
  });

  if (!response.ok || !response.body) {
    const errorText = await response.text().catch(() => "");
    throw new Error(errorText || `Chat request failed (${response.status})`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    buffer += decoder.decode(value || new Uint8Array(), { stream: !done });

    const blocks = buffer.split("\n\n");
    buffer = blocks.pop() || "";

    for (const block of blocks) {
      const parsed = parseSseBlock(block);
      if (parsed.event === "token") {
        onToken(String(parsed.payload.text || ""));
      } else if (parsed.event === "done") {
        onDone?.(parsed.payload);
      } else if (parsed.event === "error") {
        throw new Error(String(parsed.payload.message || "Stream failed"));
      }
    }

    if (done) break;
  }
}

export async function captureMarketingLead(payload: MarketingLeadCaptureRequest) {
  const response = await fetch(`${API_BASE}/marketing/leads/capture`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) {
    throw new Error(data?.detail || `Lead capture failed (${response.status})`);
  }
  return data;
}
