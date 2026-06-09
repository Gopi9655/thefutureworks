import type { ContactPayload, ApplicationPayload, ApiResult } from "@/lib/types";

// ============================================================
// API CLIENT — the single place the UI talks to the backend.
//
// Right now these POST to local Next.js route handlers (app/api/*) which
// simulate success. To go live, either:
//   1. Replace the route handlers with real persistence / email / ATS calls, OR
//   2. Point fetch() at an external API and delete the local routes.
//
// The forms never call fetch directly — they call submitContact() /
// submitApplication() so swapping the backend touches only this file.
// ============================================================

const SIMULATE_LATENCY = true; // remove once a real backend is wired

async function post<T>(url: string, body: T): Promise<ApiResult> {
  if (SIMULATE_LATENCY) await new Promise((r) => setTimeout(r, 1300));
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await res.json()) as ApiResult;
    if (!res.ok) return { ok: false, message: data.message || "Something went wrong. Please try again." };
    return data;
  } catch {
    return { ok: false, message: "Could not reach the server. Please check your connection and try again." };
  }
}

export function submitContact(payload: ContactPayload): Promise<ApiResult> {
  return post("/api/contact", payload);
}

export function submitApplication(payload: ApplicationPayload): Promise<ApiResult> {
  return post("/api/apply", payload);
}
