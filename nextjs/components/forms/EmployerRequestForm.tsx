"use client";

import { useCallback, useState, type ChangeEvent } from "react";
import { Icon } from "../Icon";
import { Button } from "../Button";
import { Field, SubmitButton, FormErrorSummary } from "./fields";
import { useFormSubmit } from "./useFormSubmit";
import { SECTORS } from "@/data/jobs";
import type { ApiResult } from "@/lib/types";

// ============================================================
// Phase 5A — employer "request staff" concept form.
// A premium, accessible staffing-brief journey. Fully STUBBED:
// submission is simulated client-side (no fetch, no backend, no
// storage, no email). Blue = employer/trust, green = opportunity.
// ============================================================

interface RequestValues {
  company: string;
  contactName: string;
  email: string;
  phone: string;
  roleTitle: string;
  sector: string;
  roleCount: string;
  location: string;
  workMode: string;
  contractType: string;
  timeline: string;
  urgency: string;
  requirements: string;
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function validateRequest(v: RequestValues): Record<string, string> {
  const er: Record<string, string> = {};
  if (!v.company.trim()) er["req-company"] = "Add your organisation name";
  if (!v.contactName.trim()) er["req-contact"] = "Add a contact name";
  if (!v.email.trim()) er["req-email"] = "Add a work email";
  else if (!EMAIL_RE.test(v.email)) er["req-email"] = "Enter a valid email address";
  if (!v.roleTitle.trim()) er["req-role"] = "Add the role you need to fill";
  if (!v.sector) er["req-sector"] = "Choose a sector";
  if (!v.location.trim()) er["req-location"] = "Add a location";
  return er;
}

const CONTRACT_TYPES = ["Permanent", "Temporary", "Fixed-term", "Contract", "Part-time"];
const WORK_MODES = ["Office", "Hybrid", "Remote"];
const ROLE_COUNTS = ["1", "2", "3–5", "6+"];
const TIMELINES = ["As soon as possible", "Within 2–4 weeks", "This quarter", "Flexible / planning ahead"];
const URGENCIES = ["Standard", "Priority", "Urgent"];

const groupLegend: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 9,
  padding: 0,
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  fontSize: 16.5,
  color: "var(--t-ink)",
};
const groupReset: React.CSSProperties = { border: 0, margin: 0, padding: 0, minWidth: 0 };

function LegendIcon({ name, tone }: { name: string; tone: "blue" | "green" }) {
  const color = tone === "green" ? "var(--g-green)" : "var(--g-blue)";
  return (
    <span style={{ display: "grid", placeItems: "center", width: 30, height: 30, borderRadius: 9, flex: "0 0 auto", background: `${color}14`, color }}>
      <Icon name={name} size={16} stroke={2} />
    </span>
  );
}

export function EmployerRequestForm() {
  const empty: RequestValues = {
    company: "", contactName: "", email: "", phone: "",
    roleTitle: "", sector: "", roleCount: "1", location: "",
    workMode: "Hybrid", contractType: "Permanent",
    timeline: "Within 2–4 weeks", urgency: "Standard", requirements: "",
  };
  const [form, setForm] = useState<RequestValues>(empty);
  const [ref, setRef] = useState("");

  // Stubbed submit — simulated only. No network, storage or email.
  const submitRequest = useCallback(async (): Promise<ApiResult> => {
    const code = "TFW-" + Math.random().toString(36).slice(2, 7).toUpperCase();
    setRef(code);
    await new Promise((r) => setTimeout(r, 1100));
    return { ok: true, message: "Concept brief captured", ref: code };
  }, []);

  const { status, errors, serverError, submittedOnce, submit, clearError, reset } =
    useFormSubmit<RequestValues>(validateRequest, submitRequest);

  const set = (key: keyof RequestValues, id?: string) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      if (id) clearError(id);
    };
  const startOver = () => { setForm(empty); setRef(""); reset(); };

  if (status === "success") {
    const recap: [string, string][] = [
      ["Organisation", form.company],
      ["Role", form.roleTitle],
      ["Sector", form.sector],
      ["Location", form.location],
      ["Roles needed", form.roleCount],
      ["Contract", form.contractType],
      ["Working pattern", form.workMode],
      ["Timeline", form.timeline],
      ["Urgency", form.urgency],
    ];
    return (
      <div className="emp-confirm" role="status" aria-live="polite">
        <span className="emp-confirm-ic" aria-hidden="true">
          <Icon name="checkCircle" size={40} stroke={2} />
        </span>
        <h2 className="h2" style={{ marginTop: 18 }}>Concept brief captured</h2>
        <p className="t-mut" style={{ margin: "10px auto 0", maxWidth: 480 }}>
          Thanks {form.contactName.split(" ")[0] || "there"} — in this concept your reference is{" "}
          <strong>{ref}</strong>. Nothing has been submitted, stored or emailed; the steps below show
          what a live intake would do next.
        </p>

        <dl className="emp-recap">
          {recap.map(([k, v]) => (
            <div key={k} className="emp-recap-row">
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>

        <div className="emp-consult">
          <LegendIcon name="users" tone="blue" />
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "var(--t-ink-mut)" }}>
            A thefutureworks consultant would normally call within one working day to confirm the brief,
            agree a shortlist plan and map synthetic candidate readiness to your role.
          </p>
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 24, flexWrap: "wrap" }}>
          <Button to="/dashboard/employers" variant="blue" icon="arrowRight">View employer dashboard</Button>
          <button type="button" onClick={startOver} className="btn btn-outline">Submit another brief</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); void submit(form); }} noValidate>
      <FormErrorSummary errors={errors} submittedOnce={submittedOnce} serverError={serverError} />

      <fieldset style={groupReset}>
        <legend style={groupLegend}><LegendIcon name="building" tone="blue" /> Your organisation</legend>
        <div style={{ marginTop: 16, display: "grid", gap: 16 }}>
          <Field id="req-company" label="Organisation name" required autoComplete="organization"
            value={form.company} onChange={set("company", "req-company")} error={errors["req-company"]} placeholder="Acme Logistics Ltd" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="cards-2">
            <Field id="req-contact" label="Contact name" required autoComplete="name"
              value={form.contactName} onChange={set("contactName", "req-contact")} error={errors["req-contact"]} placeholder="Jane Smith" />
            <Field id="req-email" label="Work email" type="email" required autoComplete="email" inputMode="email"
              value={form.email} onChange={set("email", "req-email")} error={errors["req-email"]} placeholder="jane@acme.co.uk" />
          </div>
          <Field id="req-phone" label="Phone" optional type="tel" autoComplete="tel" inputMode="tel"
            value={form.phone} onChange={set("phone")} placeholder="024 0000 0000" />
        </div>
      </fieldset>

      <fieldset style={{ ...groupReset, marginTop: 28 }}>
        <legend style={groupLegend}><LegendIcon name="target" tone="green" /> Role requirements</legend>
        <div style={{ marginTop: 16, display: "grid", gap: 16 }}>
          <Field id="req-role" label="Role you need to fill" required
            value={form.roleTitle} onChange={set("roleTitle", "req-role")} error={errors["req-role"]} placeholder="Customer Service Advisor" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="cards-2">
            <Field id="req-sector" label="Sector" as="select" required
              value={form.sector} onChange={set("sector", "req-sector")} error={errors["req-sector"]}
              options={[{ value: "", label: "Choose a sector", disabled: true }, ...SECTORS]} />
            <Field id="req-location" label="Location" required
              value={form.location} onChange={set("location", "req-location")} error={errors["req-location"]} placeholder="Coventry" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="cards-2">
            <Field id="req-count" label="Roles needed" as="select"
              value={form.roleCount} onChange={set("roleCount")} options={ROLE_COUNTS} />
            <Field id="req-mode" label="Working pattern" as="select"
              value={form.workMode} onChange={set("workMode")} options={WORK_MODES} />
          </div>
          <Field id="req-notes" label="Key requirements" as="textarea" rows={4} optional
            value={form.requirements} onChange={set("requirements")} placeholder="Must-have skills, shift pattern, salary guide…" />
        </div>
      </fieldset>

      <fieldset style={{ ...groupReset, marginTop: 28 }}>
        <legend style={groupLegend}><LegendIcon name="calendar" tone="blue" /> Timeline &amp; contract</legend>
        <div style={{ marginTop: 16, display: "grid", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="cards-2">
            <Field id="req-contract" label="Contract type" as="select"
              value={form.contractType} onChange={set("contractType")} options={CONTRACT_TYPES} />
            <Field id="req-timeline" label="Target start" as="select"
              value={form.timeline} onChange={set("timeline")} options={TIMELINES} />
          </div>
          <Field id="req-urgency" label="Urgency" as="select"
            value={form.urgency} onChange={set("urgency")} options={URGENCIES}
            hint="Priority and Urgent briefs would be flagged for faster consultant review." />
        </div>
      </fieldset>

      <div className="form-alert" style={{ margin: "24px 0 0", background: "rgba(30,111,184,.07)", borderColor: "rgba(30,111,184,.22)", color: "var(--g-blue)" }}>
        <Icon name="shield" size={16} stroke={2} style={{ marginTop: 1 }} />
        <span>Concept demo: this brief is simulated only — nothing is submitted, stored or emailed. A real intake pipeline would be connected before production.</span>
      </div>

      <SubmitButton status={status} idle="Request staff" submitting="Capturing brief…" icon="arrowRight" style={{ marginTop: 22, width: "100%" }} />
      <p style={{ fontSize: 12.5, color: "var(--t-ink-dim)", marginTop: 14, textAlign: "center" }}>
        A consultant reviews every brief — typically within one working day in this concept.
      </p>
    </form>
  );
}

export default EmployerRequestForm;
