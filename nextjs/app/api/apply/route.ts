import { NextResponse } from "next/server";
import type { ApplicationPayload, ApiResult } from "@/lib/types";

// POST /api/apply — job-application handler (STUB).
//
// Integration point: validate, store the candidate + CV, push to your ATS,
// and email the consultant who owns the role. A real implementation would
// accept multipart/form-data so the CV file is uploaded too.
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

  // TODO: persist candidate + CV, notify the owning consultant.

  const ref = "APP-" + Date.now().toString(36).toUpperCase();
  return NextResponse.json<ApiResult>({ ok: true, message: "Application received.", ref });
}
