"use client";

import { useState, type ChangeEvent } from "react";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { Field, FileField, SubmitButton, FormErrorSummary, FormSuccess } from "./fields";
import { useFormSubmit } from "./useFormSubmit";
import { validateGeneralApply } from "./validators";
import { submitApplication } from "@/lib/api";
import type { ApplicationPayload, Job } from "@/lib/types";

type GeneralApplyValues = ApplicationPayload & { note: string; cvFileName: string };

export function GeneralApplyForm({ jobs }: { jobs: Job[] }) {
  const empty: GeneralApplyValues = { jobId: "", name: "", email: "", phone: "", note: "", cvFileName: "" };
  const [form, setForm] = useState<GeneralApplyValues>(empty);
  const { status, errors, serverError, submittedOnce, submit, clearError, reset } = useFormSubmit<GeneralApplyValues>(
    validateGeneralApply,
    submitApplication,
  );

  const selectedJob = jobs.find((job) => job.id === form.jobId);
  const set = (key: keyof GeneralApplyValues, id?: string) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((current) => ({ ...current, [key]: event.target.value }));
      if (id) clearError(id);
    };
  const setFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setForm((current) => ({ ...current, cvFileName: file?.name ?? "" }));
    clearError("apply-note");
  };
  const startOver = () => { setForm(empty); reset(); };

  if (status === "success") {
    return (
      <FormSuccess
        title="Application received"
        onReset={startOver}
        resetLabel="Apply for another role"
        extra={<Button to="/vacancies" variant="primary" icon="arrowRight">Browse more roles</Button>}
      >
        Thanks {form.name.split(" ")[0] || "there"} — a consultant will review your application for <strong>{selectedJob?.title ?? "your selected role"}</strong> and be in touch within one working day.
      </FormSuccess>
    );
  }

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span className="premium-tile premium-tile-green" style={{ width: 46, height: 46 }}>
          <Icon name="send" size={20} style={{ color: "var(--g-green)" }} />
        </span>
        <div>
          <h2 className="h3" style={{ margin: 0 }}>Candidate details</h2>
          <p className="t-mut" style={{ margin: "3px 0 0", fontSize: 14 }}>Choose a snapshot role and tell us how to reach you.</p>
        </div>
      </div>

      <form onSubmit={(event) => { event.preventDefault(); void submit(form); }} noValidate style={{ marginTop: 24 }}>
        <FormErrorSummary errors={errors} submittedOnce={submittedOnce} serverError={serverError} />
        <Field
          id="apply-role"
          label="Role"
          as="select"
          required
          value={form.jobId}
          onChange={set("jobId", "apply-role")}
          error={errors["apply-role"]}
          options={[
            { value: "", label: "Choose a snapshot role", disabled: true },
            ...jobs.map((job) => ({ value: job.id, label: `${job.title} · ${job.location}` })),
          ]}
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }} className="cards-2">
          <Field id="apply-name" label="Full name" required autoComplete="name"
            value={form.name} onChange={set("name", "apply-name")} error={errors["apply-name"]} placeholder="Jane Smith" />
          <Field id="apply-email" label="Email" type="email" required autoComplete="email" inputMode="email"
            value={form.email} onChange={set("email", "apply-email")} error={errors["apply-email"]} placeholder="jane@email.com" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }} className="cards-2">
          <Field id="apply-phone" label="Phone" required type="tel" autoComplete="tel" inputMode="tel"
            value={form.phone} onChange={set("phone", "apply-phone")} error={errors["apply-phone"]} placeholder="07000 000000" />
          <FileField id="apply-cv" label="Upload CV" accept=".pdf,.doc,.docx" value={form.cvFileName} onChange={setFile}
            hint="PDF or Word — or add a covering note below instead." />
        </div>
        <div style={{ marginTop: 16 }}>
          <Field id="apply-note" label="Covering note" as="textarea" rows={5} optional
            value={form.note} onChange={set("note", "apply-note")} error={errors["apply-note"]}
            placeholder="Tell us why you're a great fit…" />
        </div>
        <div className="form-alert" style={{ margin: "20px 0 0", background: "rgba(30,111,184,.07)", borderColor: "rgba(30,111,184,.22)", color: "var(--g-blue)" }}>
          <Icon name="shield" size={16} stroke={2} style={{ marginTop: 1 }} />
          <span>Demo form: submission is simulated and only the CV filename is sent. Real CV upload and storage must be connected before production.</span>
        </div>
        <SubmitButton status={status} idle="Submit application" submitting="Submitting…" icon="arrowRight" style={{ marginTop: 22, width: "100%" }} />
      </form>
    </>
  );
}

export default GeneralApplyForm;
