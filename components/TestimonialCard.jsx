/* TestimonialCard */
function TestimonialCard({ t, light }) {
  return (
    <figure className={light ? "card" : "card-dark"} style={{ margin: 0, padding: 28, display: "flex", flexDirection: "column", gap: 18, height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Icon name="quote" size={30} style={{ color: "var(--red-500)" }} aria-hidden="true" />
        <span className={"chip " + (light ? "" : "on-dark")} style={{ textTransform: "capitalize" }}>{t.kind}</span>
      </div>
      <blockquote style={{ margin: 0, fontSize: 16.5, lineHeight: 1.55, fontWeight: 500, color: light ? "var(--t-ink)" : "#fff", flex: 1 }}>
        \u201C{t.quote}\u201D
      </blockquote>
      <figcaption style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 16, borderTop: light ? "1px solid var(--paper-line)" : "1px solid var(--line)" }}>
        <div style={{ width: 40, height: 40, borderRadius: 50, background: "linear-gradient(135deg, var(--g-green), var(--g-teal))", display: "grid", placeItems: "center", color: "#fff", fontWeight: 700, fontSize: 14, fontFamily: "var(--font-display)" }} aria-hidden="true">
          {t.name.split(" ").map(function(w){return w[0];}).join("").slice(0, 2)}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14.5, color: light ? "var(--t-ink)" : "#fff" }}>{t.name}</div>
          <div style={{ fontSize: 13, color: light ? "var(--t-ink-mut)" : "var(--t-on-dark-mut)" }}>{t.role}</div>
        </div>
      </figcaption>
    </figure>
  );
}
Object.assign(window, { TestimonialCard });
