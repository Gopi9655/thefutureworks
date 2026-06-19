import { NextResponse } from "next/server";
import type { ApplicationPayload, ApiResult } from "@/lib/types";

// POST /api/apply — job-application handler (STUB).
//
// Prototype stub only: validates the demo JSON payload and returns a reference.
// No CV file is uploaded or stored, and nothing is pushed to an ATS.
export async function POST(request: Request) {
  let body: Partial<ApplicationPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json<ApiResult>({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  if (!body.jobId || !body.name || !body.email || !body.phone) {
    return NextResponse.json<ApiResult>(
      { ok: false, message: "Name, email and phone are required." },
      { status: 422 },
    );
  }

  // Intentionally no persistence in this prototype.

  const ref = "APP-" + Date.now().toString(36).toUpperCase();
  return NextResponse.json<ApiResult>({ ok: true, message: "Application received.", ref });
}
