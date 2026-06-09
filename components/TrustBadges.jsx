/* TrustBadges — marquee strip of accreditations */
function TrustStrip({ items, label }) {
  var list = items || ["REC Member", "BIOR Affiliated", "Coventry University Group"];
  var doubled = list.concat(list);
  return (
    <div style={{ borderBlock: "1px solid var(--line)", background: "rgba(255,255,255,.02)", overflow: "hidden", padding: "20px 0" }}
      role="marquee" aria-label={label || "Trust badges"}>
      <div className="wrap" style={{ marginBottom: 14 }}>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--t-on-dark-dim)", letterSpacing: ".12em", textTransform: "uppercase" }}>
          {label || "Trusted across Coventry, Warwickshire & the West Midlands"}
        </span>
      </div>
      <div style={{ position: "relative", maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }}>
        <div className="marquee">
          {doubled.map(function(c, i) {
            return <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--t-on-dark-mut)", fontWeight: 600, fontSize: 16, whiteSpace: "nowrap" }}><Orb size={18} /> {c}</span>;
          })}
        </div>
      </div>
    </div>
  );
}
Object.assign(window, { TrustStrip });
