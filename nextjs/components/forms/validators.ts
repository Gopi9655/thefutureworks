import type { ContactPayload, ApplicationPayload } from "@/lib/types";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function validateContact(f: ContactPayload): Record<string, string> {
  const er: Record<string, string> = {};
  if (!f.name.trim()) er["contact-name"] = "Please tell us your name";
  if (!f.email.trim()) er["contact-email"] = "Please add your email";
  else if (!EMAIL_RE.test(f.email)) er["contact-email"] = "Enter a valid email address";
  if (!f.message.trim()) er["contact-message"] = "Add a short message so we can help";
  return er;
}

export function validateApply(f: ApplicationPayload & { note?: string; cvFileName?: string }): Record<string, string> {
  const er: Record<string, string> = {};
  if (!f.name.trim()) er["apply-name"] = "Please enter your full name";
  if (!f.email.trim()) er["apply-email"] = "Please add your email";
  else if (!EMAIL_RE.test(f.email)) er["apply-email"] = "Enter a valid email address";
  if (!f.phone.trim()) er["apply-phone"] = "A contact number helps us reach you fast";
  if (!f.cvFileName && !(f.note || "").trim()) er["apply-note"] = "Attach a CV above, or add a short note about your experience";
  return er;
}

export function validateGeneralApply(f: ApplicationPayload & { note?: string; cvFileName?: string }): Record<string, string> {
  return {
    ...(!f.jobId ? { "apply-role": "Choose the role you want to apply for" } : {}),
    ...validateApply(f),
  };
}
