import { funnels, type FunnelKey } from "../../content/funnels";
import ChatWidget from "./ChatWidget";

export type MiraAudience =
  | "random-traffic"
  | "investor"
  | "user"
  | "returning-customer"
  | "new-visitor";

type MiraChatSurfaceProps = {
  initialAudience?: MiraAudience;
};

const audienceMap: Record<MiraAudience, FunnelKey> = {
  "random-traffic": "random",
  investor: "investors",
  user: "users",
  "returning-customer": "returning",
  "new-visitor": "new",
};

export function MiraChatSurface({ initialAudience = "new-visitor" }: MiraChatSurfaceProps) {
  return <ChatWidget segment={funnels[audienceMap[initialAudience]]} />;
}
