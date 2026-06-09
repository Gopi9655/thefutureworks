/* global React, Icon */
/* ============================================================
   FORM PRIMITIVES — idle / validation-error / submitting / success
   Front-end only. Swap the simulated submit in useFormSubmit() for a
   real API/server-action call — see PRODUCTION-NOTES.md.
   ============================================================ */
const { useState: useFS, useRef: useFR } = React;

/* validate-on-submit, then clear errors live as the user fixes them */
function useFormSubmit(validate, opts = {}) {
  const [status, setStatus] = useFS("idle");   // idle | submitting | success
  const [errors, setErrors] = useFS({});
  const submittedOnce = useFR(false);

  const submit = (values) => {
    submittedOnce.current = true;
    const er = (validate ? validate(values) : {}) || {};
    setErrors(er);
    if (Object.keys(er).length) {
      // move keyboard focus to the first invalid field
      requestAnimationFrame(() => {
        const first = document.getElementById(Object.keys(er)[0]);
        if (first && first.focus) first.focus();
      });
      return;
    }
    setStatus("submitting");
    // === Backend integration point ===
    // Replace this timeout with: await fetch('/api/...', { method:'POST', body })
    setTimeout(() => setStatus("success"), opts.delay || 1300);
  };

  const clearError = (k) => setErrors((e) => {
    if (!e[k]) return e;
    const n = { ...e }; delete n[k]; return n;
  });
  const reset = () => { setStatus("idle"); setErrors({}); submittedOnce.current = false; };

  return { status, errors, submit, clearError, reset, submittedOnce };
}

/* labelled, described, validated field (input / textarea / select) */
function Field({ id, label, type = "text", value, onChange, error, placeholder, required, optional,
                as = "input", options, rows, autoComplete, inputMode, hint }) {
  const describedBy = [];
  if (hint && !error) describedBy.push(id + "-hint");
  if (error) describedBy.push(id + "-err");
  const common = {
    id, name: id, className: "field", value, onChange,
    "aria-invalid": error ? "true" : undefined,
    "aria-describedby": describedBy.join(" ") || undefined,
    "aria-required": required ? "true" : undefined,
    // inline so the error border is reliable across environments (see PRODUCTION-NOTES)
    style: error ? { borderColor: "var(--err)", boxShadow: "0 0 0 4px var(--err-ring)" } : undefined,
  };
  return (
    <div>
      <label className="field-label" htmlFor={id}>
        {label}
        {required && <span className="req" aria-hidden="true">*</span>}
        {optional && <span className="opt"> (optional)</span>}
      </label>
      {as === "textarea" ? (
        <textarea {...common} rows={rows || 5} placeholder={placeholder} style={{ resize: "vertical", ...(common.style || {}) }}></textarea>
      ) : as === "select" ? (
        <select {...common}>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input {...common} type={type} placeholder={placeholder} autoComplete={autoComplete} inputMode={inputMode} />
      )}
      {hint && !error && (
        <span id={id + "-hint"} style={{ fontSize: 12, color: "var(--t-ink-dim)", marginTop: 6, display: "block" }}>{hint}</span>
      )}
      {error && (
        <span id={id + "-err"} className="field-error" role="alert">
          <Icon name="x" size={13} stroke={2.6} aria-hidden="true" /> {error}
        </span>
      )}
    </div>
  );
}

/* styled file input that shows the chosen filename */
function FileField({ id, label, value, onChange, hint, accept }) {
  const ref = useFR(null);
  return (
    <div>
      <label className="field-label" htmlFor={id}>{label} <span className="opt"> (optional)</span></label>
      <input ref={ref} id={id} name={id} type="file" accept={accept} onChange={onChange}
        style={{ position: "absolute", width: 1, height: 1, opacity: 0, overflow: "hidden", clip: "rect(0 0 0 0)" }} />
      <button type="button" onClick={() => ref.current && ref.current.click()}
        className="field"
        style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", textAlign: "left", background: "#fff" }}>
        <span style={{ display: "grid", placeItems: "center", width: 32, height: 32, borderRadius: 8, flex: "0 0 auto", background: "rgba(30,111,184,.10)" }}>
          <Icon name="send" size={16} style={{ color: "var(--g-blue)" }} aria-hidden="true" />
        </span>
        <span style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: value ? "var(--t-ink)" : "var(--t-ink-dim)", fontWeight: value ? 600 : 400 }}>
          {value || "Choose a file (PDF or Word)"}
        </span>
      </button>
      {hint && <span style={{ fontSize: 12, color: "var(--t-ink-dim)", marginTop: 6, display: "block" }}>{hint}</span>}
    </div>
  );
}

/* submit button that reflects the submitting state */
function SubmitButton({ status, idle, submitting, icon = "send", className = "", style }) {
  const busy = status === "submitting";
  return (
    <button type="submit" className={"btn btn-primary btn-lg " + className} disabled={busy} aria-busy={busy} style={style}>
      {busy
        ? <><span className="spinner" aria-hidden="true"></span> {submitting}</>
        : <>{idle} <Icon name={icon} size={18} aria-hidden="true" /></>}
    </button>
  );
}

/* top-of-form error summary, shown once a submit has surfaced errors */
function FormErrorSummary({ errors, submittedOnce }) {
  const n = Object.keys(errors).length;
  if (!submittedOnce.current || n === 0) return null;
  return (
    <div className="form-alert" role="alert">
      <Icon name="x" size={16} stroke={2.4} aria-hidden="true" style={{ marginTop: 1 }} />
      <span>Please fix the {n === 1 ? "highlighted field" : n + " highlighted fields"} below to continue.</span>
    </div>
  );
}

/* success confirmation panel */
function FormSuccess({ title, children, onReset, resetLabel = "Send another", extra }) {
  return (
    <div role="status" aria-live="polite" style={{ textAlign: "center", padding: "32px 10px" }}>
      <span style={{ display: "grid", placeItems: "center", width: 72, height: 72, borderRadius: 50, margin: "0 auto 20px", background: "rgba(31,146,84,.14)" }}>
        <Icon name="checkCircle" size={40} stroke={2} style={{ color: "var(--ok)" }} aria-hidden="true" />
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

Object.assign(window, { useFormSubmit, Field, FileField, SubmitButton, FormErrorSummary, FormSuccess });
