"use client";

import { useRef, type ChangeEvent, type CSSProperties, type ReactNode } from "react";
import { Icon } from "../Icon";
import type { FormStatus } from "./useFormSubmit";

// ---------------------------------------------------------------
// Field — labelled, described, validated input / textarea / select
// ---------------------------------------------------------------
export interface FieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
  as?: "input" | "textarea" | "select";
  options?: Array<string | { value: string; label: string; disabled?: boolean }>;
  rows?: number;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric";
  hint?: string;
}

export function Field({
  id, label, type = "text", value, onChange, error, placeholder, required, optional,
  as = "input", options = [], rows = 5, autoComplete, inputMode, hint,
}: FieldProps) {
  const describedBy: string[] = [];
  if (hint && !error) describedBy.push(id + "-hint");
  if (error) describedBy.push(id + "-err");

  // inline error border so it is reliable regardless of stylesheet cascade
  const errStyle: CSSProperties | undefined = error
    ? { borderColor: "var(--err)", boxShadow: "0 0 0 4px var(--err-ring)" }
    : undefined;

  const common = {
    id,
    name: id,
    className: "field",
    value,
    onChange,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy.join(" ") || undefined,
    "aria-required": required ? true : undefined,
  } as const;

  return (
    <div>
      <label className="field-label" htmlFor={id}>
        {label}
        {required && <span className="req" aria-hidden="true">*</span>}
        {optional && <span className="opt"> (optional)</span>}
      </label>
      {as === "textarea" ? (
        <textarea {...common} rows={rows} placeholder={placeholder} style={{ resize: "vertical", ...errStyle }} />
      ) : as === "select" ? (
        <select {...common} style={errStyle}>
          {options.map((o) => {
            const option = typeof o === "string" ? { value: o, label: o } : o;
            return <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>;
          })}
        </select>
      ) : (
        <input {...common} type={type} placeholder={placeholder} autoComplete={autoComplete} inputMode={inputMode} style={errStyle} />
      )}
      {hint && !error && (
        <span id={id + "-hint"} style={{ fontSize: 12, color: "var(--t-ink-dim)", marginTop: 6, display: "block" }}>{hint}</span>
      )}
      {error && (
        <span id={id + "-err"} className="field-error" role="alert">
          <Icon name="x" size={13} stroke={2.6} /> {error}
        </span>
      )}
    </div>
  );
}

// ---------------------------------------------------------------
// FileField — styled file picker that shows the chosen name
// ---------------------------------------------------------------
export function FileField({ id, label, value, onChange, hint, accept }: {
  id: string; label: string; value: string; onChange: (e: ChangeEvent<HTMLInputElement>) => void; hint?: string; accept?: string;
}) {
  const ref = useRef<HTMLInputElement | null>(null);
  return (
    <div>
      <label className="field-label" htmlFor={id}>{label} <span className="opt"> (optional)</span></label>
      <input ref={ref} id={id} name={id} type="file" accept={accept} onChange={onChange}
        style={{ position: "absolute", width: 1, height: 1, opacity: 0, overflow: "hidden", clip: "rect(0 0 0 0)" }} />
      <button type="button" onClick={() => ref.current?.click()} className="field"
        style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", textAlign: "left", background: "#fff" }}>
        <span className="premium-tile premium-tile-blue" style={{ width: 32, height: 32, borderRadius: 9 }}>
          <Icon name="send" size={16} style={{ color: "var(--g-blue)" }} />
        </span>
        <span style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: value ? "var(--t-ink)" : "var(--t-ink-dim)", fontWeight: value ? 600 : 400 }}>
          {value || "Choose a file (PDF or Word)"}
        </span>
      </button>
      {hint && <span style={{ fontSize: 12, color: "var(--t-ink-dim)", marginTop: 6, display: "block" }}>{hint}</span>}
    </div>
  );
}

// ---------------------------------------------------------------
// SubmitButton — reflects the submitting state
// ---------------------------------------------------------------
export function SubmitButton({ status, idle, submitting, icon = "send", className = "", style }: {
  status: FormStatus; idle: string; submitting: string; icon?: string; className?: string; style?: CSSProperties;
}) {
  const busy = status === "submitting";
  return (
    <button type="submit" className={"btn btn-primary btn-lg " + className} disabled={busy} aria-busy={busy} style={style}>
      {busy
        ? <><span className="spinner" aria-hidden="true" /> {submitting}</>
        : <>{idle} <Icon name={icon} size={18} /></>}
    </button>
  );
}

// ---------------------------------------------------------------
// FormErrorSummary — top-of-form summary after a failed submit
// ---------------------------------------------------------------
export function FormErrorSummary({ errors, submittedOnce, serverError }: {
  errors: Record<string, string>; submittedOnce: React.MutableRefObject<boolean>; serverError?: string | null;
}) {
  const n = Object.keys(errors).length;
  if (serverError) {
    return (
      <div className="form-alert" role="alert">
        <Icon name="x" size={16} stroke={2.4} style={{ marginTop: 1 }} />
        <span>{serverError}</span>
      </div>
    );
  }
  if (!submittedOnce.current || n === 0) return null;
  return (
    <div className="form-alert" role="alert">
      <Icon name="x" size={16} stroke={2.4} style={{ marginTop: 1 }} />
      <span>Please fix the {n === 1 ? "highlighted field" : n + " highlighted fields"} below to continue.</span>
    </div>
  );
}

// ---------------------------------------------------------------
// FormSuccess — confirmation panel
// ---------------------------------------------------------------
export function FormSuccess({ title, children, onReset, resetLabel = "Send another", extra }: {
  title: string; children: ReactNode; onReset?: () => void; resetLabel?: string; extra?: ReactNode;
}) {
  return (
    <div role="status" aria-live="polite" style={{ textAlign: "center", padding: "32px 10px" }}>
      <span style={{ display: "grid", placeItems: "center", width: 72, height: 72, borderRadius: 50, margin: "0 auto 20px", background: "rgba(31,146,84,.14)" }}>
        <Icon name="checkCircle" size={40} stroke={2} style={{ color: "var(--ok)" }} />
      </span>
      <h2 className="h2">{title}</h2>
      <p className="t-mut" style={{ marginTop: 12, maxWidth: 400, marginInline: "auto" }}>{children}</p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 24, flexWrap: "wrap" }}>
        {extra}
        {onReset && <button onClick={onReset} className="btn btn-outline">{resetLabel}</button>}
      </div>
    </div>
  );
}
