import { clearCache } from "@chenglou/pretext";

let lastClearTs = 0;

export function clearPretextCache(force = false) {
  const now = Date.now();
  if (!force && now - lastClearTs < 15000) {
    return;
  }
  clearCache();
  lastClearTs = now;
}
