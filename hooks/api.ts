const API_BASE = "";

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(data.error || `HTTP ${res.status}`);
  }

  return res.json();
}

export const api = {
  get: <T>(url: string) => fetchJson<T>(url),
  post: <T>(url: string, body: unknown) =>
    fetchJson<T>(url, { method: "POST", body: JSON.stringify(body) }),
  put: <T>(url: string, body: unknown) =>
    fetchJson<T>(url, { method: "PUT", body: JSON.stringify(body) }),
  delete: <T>(url: string) => fetchJson<T>(url, { method: "DELETE" }),
};

export function trackAnalytics(event: string, properties: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  fetch("/api/analytics/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, properties }),
  }).catch(() => {});
}
