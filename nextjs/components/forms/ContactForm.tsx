"use client";

import { useState, type ChangeEvent } from "react";
import { Reveal } from "../primitives";
import { Button } from "../Button";
import { Field, SubmitButton, FormErrorSummary, FormSuccess } from "./fields";
import { useFormSubmit } from "./useFormSubmit";
import { validateContact } from "./validators";
import { submitContact } from "@/lib/api";
import type { ContactPayload } from "@/lib/types";

const EMPTY: ContactPayload = { name: "", email: "", phone: "", who: "Candidate", message: "" };

export function ContactForm() {
  const [form, setForm] = useState<ContactPayload>(EMPTY);
  const { status, errors, serverError, submittedOnce, submit, clearError, reset } = useFormSubmit<ContactPayload>(
    validateContact,
    submitContact,
  );

  const set = (k: keyof ContactPayload, id?: string) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [k]: e.target.value }));
      if (id) clearError(id);
    };

  const startOver = () => { setForm(EMPTY); reset(); };

  return (
    <Reveal className="card" style={{ padding: "clamp(24px, 4vw, 40px)" }}>
      {status === "success" ? (
        <FormSuccess
          title="Message sent"
          onReset={startOver}
          resetLabel="Send another message"
          extra={<Button to="/vacancies" variant="primary" icon="arrowRight">Browse jobs meanwhile</Button>}
        >
          Thanks {form.name.split(" ")[0] || "there"} — a consultant will be in touch within one working day.
        </FormSuccess>
      ) : (
        <>
          <h2 className="h3" style={{ marginTop: 0 }}>Send us a message</h2>
          <p className="t-mut" style={{ marginTop: 8, marginBottom: 24, fontSize: 15 }}>Fill in the form and we&apos;ll route you to the right consultant.</p>
          <form onSubmit={(e) => { e.preventDefault(); void submit(form); }} noValidate>
            <FormErrorSummary errors={errors} submittedOnce={submittedOnce} serverError={serverError} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="cards-2">
              <Field id="contact-name" label="Full name" required autoComplete="name"
                value={form.name} onChange={set("name", "contact-name")} error={errors["contact-name"]} placeholder="Jane Smith" />
              <Field id="contact-email" label="Email" type="email" required autoComplete="email" inputMode="email"
                value={form.email} onChange={set("email", "contact-email")} error={errors["contact-email"]} placeholder="jane@email.com" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }} className="cards-2">
              <Field id="contact-phone" label="Phone" optional type="tel" autoComplete="tel" inputMode="tel"
                value={form.phone ?? ""} onChange={set("phone")} placeholder="07000 000000" />
              <Field id="contact-who" label="I am a…" as="select"
                value={form.who} onChange={set("who")}
                options={["Candidate", "Employer", "University partner", "Other"]} />
            </div>
            <div style={{ marginTop: 16 }}>
              <Field id="contact-message" label="Message" as="textarea" rows={5} required
                value={form.message} onChange={set("message", "contact-message")} error={errors["contact-message"]}
                placeholder="Tell us how we can help…" />
            </div>
            <SubmitButton status={status} idle="Send message" submitting="Sending…" icon="send" style={{ marginTop: 22, width: "100%" }} />
            <p style={{ fontSize: 12.5, color: "var(--t-ink-dim)", marginTop: 14, textAlign: "center" }}>
              By submitting you agree to our privacy policy. We never share your details.
            </p>
          </form>
        </>
      )}
    </Reveal>
  );
}

export default ContactForm;
