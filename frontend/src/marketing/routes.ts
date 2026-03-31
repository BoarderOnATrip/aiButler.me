import type { AudienceKey } from "./content";

export const MARKETING_AUDIENCE_PATHS: Record<AudienceKey, string> = {
  "random-traffic": "/",
  investors: "/investors",
  users: "/users",
  "returning-buyers": "/returning",
  "brand-new-visitors": "/welcome",
};

export function isCrmPath(pathname: string) {
  return pathname === "/app" || pathname.startsWith("/app/") || pathname === "/login";
}

export function isOrigamiPath(pathname: string) {
  const normalized = normalizePathname(pathname);
  return normalized === "/origami" || normalized.startsWith("/origami/");
}

export function normalizePathname(pathname: string) {
  const trimmed = pathname.trim();
  if (!trimmed) return "/";
  return trimmed.length > 1 && trimmed.endsWith("/") ? trimmed.slice(0, -1) : trimmed;
}

export function audienceFromPath(pathname: string): AudienceKey {
  const normalized = normalizePathname(pathname);
  if (normalized === "/investors") return "investors";
  if (normalized === "/users") return "users";
  if (normalized === "/returning" || normalized === "/buyers" || normalized === "/customers") {
    return "returning-buyers";
  }
  if (normalized === "/welcome" || normalized === "/new" || normalized === "/brand-new") {
    return "brand-new-visitors";
  }
  return "random-traffic";
}

export function pathForAudience(audience: AudienceKey) {
  return MARKETING_AUDIENCE_PATHS[audience];
}
