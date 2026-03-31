function resolveApiBase() {
  const configured = (import.meta as any).env.VITE_API_BASE;
  if (configured) return configured;
  if (typeof window === "undefined") return "http://127.0.0.1:8001";
  const host = window.location.hostname;
  return host === "localhost" || host === "127.0.0.1" ? "http://127.0.0.1:8001" : "";
}

export const API_BASE = resolveApiBase();

export function getToken() {
  return localStorage.getItem("token") || "";
}

export async function api(path: string, opts: RequestInit = {}) {
  const headers: any = { "Content-Type": "application/json", ...(opts.headers || {}) };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...opts, headers });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const msg = data?.detail || data?.message || `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data;
}
