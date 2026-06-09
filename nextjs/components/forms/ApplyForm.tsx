"use client";

import { useState, type ChangeEvent } from "react";
import { Reveal } from "../primitives";
import { Icon } from "../Icon";
import { Button } from "../Button";
import { Field, FileField, SubmitButton, FormErrorSummary, FormSuccess } from "./fields";
import { useFormSubmit } from "./useFormSubmit";
import { validateApply } from "./validators";
import { submitApplication } from "@/lib/api";
import type { Job, ApplicationPayload } from "@/lib/types";

type ApplyForm = ApplicationPayload & { note: string; cvFileName: string };

export function ApplyForm({ job }: { job: Job }) {
  const empty: ApplyForm = { jobId: job.id, name: "", email: "", phone: "", note: "", cvFileName: "" };
  const [form, setForm] = useState<ApplyForm>(empty);
  const { status, errors, serverError, submittedOnce, submit, clearError, reset } = useFormSubmit<ApplyForm>(
    validateApply,
    (v) => submitApplication({ jobId: v.jobId, name: v.name, email: v.email, phone: v.phone, note: v.note, cvFileName: v.cvFileName }),
  );

  const set = (k: keyof ApplyForm, id?: string) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [k]: e.target.value }));
      if (id) clearError(id);
    };
  const setFile = (e: ChangeEvent<HTMLInputElement>) => {
    const fn = e.target.files?.[0];
    setForm((f) => ({ ...f, cvFileName: fn ? fn.name : "" }));
    clearError("apply-note");
  };
  const startOver = () => { setForm(empty); reset(); };

  return (
    <Reveal id="apply" className="card" style={{ marginTop: 34, padding: "clamp(24px,3vw,36px)", scrollMarginTop: 96 }}>
      {status === "success" ? (
        <FormSuccess
          title="Application received"
          onReset={startOver}
          resetLabel="Apply for another role"
          extra={<Button to="/vacancies" variant="primary" icon="arrowRight">Browse more roles</Button>}
        >
          Thanks {form.name.split(" ")[0] || "there"} — a consultant will review your application for <strong>{job.title}</strong> and be in touch within one working day.
        </FormSuccess>
      ) : (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ display: "grid", placeItems: "center", width: 44, height: 44, borderRadius: 12, flex: "0 0 auto", background: "rgba(95,168,42,.10)" }}>
              <Icon name="send" size={20} style={{ color: "var(--g-green)" }} />
            </span>
            <div>
              <h2 className="h3" style={{ margin: 0 }}>Apply for this role</h2>
              <p className="t-mut" style={{ margin: "3px 0 0", fontSize: 14 }}>{job.title} · {job.company}</p>
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); void submit(form); }} noValidate style={{ marginTop: 24 }}>
            <FormErrorSummary errors={errors} submittedOnce={submittedOnce} serverError={serverError} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="cards-2">
              <Field id="apply-name" label="Full name" required autoComplete="name"
                value={form.name} onChange={set("name", "apply-name")} error={errors["apply-name"]} placeholder="Jane Smith" />
              <Field id="apply-email" label="Email" type="email" required autoComplete="email" inputMode="email"
                value={form.email} onChange={set("email", "apply-email")} error={errors["apply-email"]} placeholder="jane@email.com" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }} className="cards-2">
              <Field id="apply-phone" label="Phone" required type="tel" autoComplete="tel" inputMode="tel"
                value={form.phone} onChange={set("phone", "apply-phone")} error={errors["apply-phone"]} placeholder="07000 000000" />
              <FileField id="apply-cv" label="Upload CV" accept=".pdf,.doc,.docx" value={form.cvFileName} onChange={setFile}
                hint="PDF or Word — or paste a note below instead." />
            </div>
            <div style={{ marginTop: 16 }}>
              <Field id="apply-note" label="Covering note" as="textarea" rows={4} optional
                value={form.note} onChange={set("note", "apply-note")} error={errors["apply-note"]}
                placeholder="Tell us why you're a great fit…" />
            </div>
            <SubmitButton status={status} idle="Submit application" submitting="Submitting…" icon="arrowRight" style={{ marginTop: 22, width: "100%" }} />
            <p style={{ fontSize: 12.5, color: "var(--t-ink-dim)", marginTop: 14, textAlign: "center" }}>
              By applying you agree to our privacy policy. Your details are only shared with this employer.
            </p>
          </form>
        </>
      )}
    </Reveal>
  );
}

export default ApplyForm;
