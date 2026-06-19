import { NextResponse } from "next/server";
import type { ContactPayload, ApiResult } from "@/lib/types";

// POST /api/contact — contact-form handler (STUB).
//
// Prototype stub only: validates server-side and returns a reference.
// No database, CRM, email or ATS integration is connected here.
// Return { ok, message, ref } so the client can show a confirmation.
export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json<ApiResult>({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  // Minimal server-side validation (never trust the client).
  if (!body.name || !body.email || !body.message) {
    return NextResponse.json<ApiResult>(
      { ok: false, message: "Name, email and message are required." },
      { status: 422 },
    );
  }

  // Intentionally no persistence or notification in this prototype.

  const ref = "TFW-" + Date.now().toString(36).toUpperCase();
  return NextResponse.json<ApiResult>({ ok: true, message: "Message received.", ref });
}
