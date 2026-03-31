import posthog from "posthog-js";

type EventProps = Record<string, unknown>;

const env = (import.meta as any).env || {};
const POSTHOG_KEY = String(env.VITE_POSTHOG_KEY || "").trim();
const POSTHOG_HOST = String(env.VITE_POSTHOG_HOST || "https://us.i.posthog.com").trim();
const ANALYTICS_ENABLED = POSTHOG_KEY.length > 0;

let initialized = false;

function baseProps(): EventProps {
  return {
    environment: env.MODE || "unknown",
  };
}

export function initAnalytics(): void {
  if (!ANALYTICS_ENABLED || initialized) {
    return;
  }
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: "identified_only",
    capture_pageview: false,
    capture_pageleave: true,
    autocapture: true,
    session_recording: {
      maskAllInputs: true,
      maskInputOptions: {
        password: true,
        email: true,
      },
    },
  });
  initialized = true;
}

export function captureEvent(event: string, props: EventProps = {}): void {
  if (!ANALYTICS_ENABLED || !initialized || !event) {
    return;
  }
  posthog.capture(event, {
    ...baseProps(),
    ...props,
  });
}

export function identifyUser(userId: string, props: EventProps = {}): void {
  if (!ANALYTICS_ENABLED || !initialized || !userId) {
    return;
  }
  posthog.identify(userId, {
    ...baseProps(),
    ...props,
  });
}

export function identifyOrg(orgId: string, props: EventProps = {}): void {
  if (!ANALYTICS_ENABLED || !initialized || !orgId) {
    return;
  }
  posthog.group("organization", orgId, {
    ...baseProps(),
    ...props,
  });
}

export function resetAnalytics(): void {
  if (!ANALYTICS_ENABLED || !initialized) {
    return;
  }
  posthog.reset();
}
