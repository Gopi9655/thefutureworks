import { NextResponse } from "next/server";
import type { ContactPayload, ApiResult } from "@/lib/types";

// POST /api/contact — contact-form handler (STUB).
//
// Integration point: validate server-side, then persist + notify. e.g.
//   - save to your DB / CRM
//   - send an email (Resend, SendGrid, Nodemailer)
//   - forward into your ATS
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

  // TODO: persist + notify here.

  const ref = "TFW-" + Date.now().toString(36).toUpperCase();
  return NextResponse.json<ApiResult>({ ok: true, message: "Message received.", ref });
}
