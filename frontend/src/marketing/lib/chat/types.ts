export type MiraAudience =
  | "random-traffic"
  | "investor"
  | "user"
  | "returning-customer"
  | "new-visitor";

export type ChatRole = "mira" | "user" | "system" | "hint";

export type ChatSurfaceMode = "hero" | "panel" | "widget";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  createdAt: number;
  accent?: "copper" | "amber" | "cream";
  isStreaming?: boolean;
}

export interface ChatAudienceConfig {
  id: MiraAudience;
  label: string;
  eyebrow: string;
  headline: string;
  description: string;
  cta: string;
  proofPoints: string[];
  opening: string;
  followUp: string;
}

export interface BubbleLayout {
  width: number;
  height: number;
  lineCount: number;
}

export interface ChatStreamState {
  status: "idle" | "connecting" | "streaming" | "complete" | "error";
  draft: string;
  committedText: string;
  tokenCount: number;
  lastUpdated: number;
}
