/* StatsGrid — glassmorphism stat cards with network map bg */
function StatsGrid() {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "var(--ink-950)", paddingBlock: "clamp(48px,7vw,96px)" }}
      aria-label="Key statistics">
      <div style={{ position: "absolute", inset: 0, opacity: 0.18, pointerEvents: "none" }} aria-hidden="true"><NetworkMapBg /></div>
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <Reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 36 }}>
          <div className="on-dark">
            <span className="eyebrow on-dark"><Icon name="chart" size={14} /> By the numbers</span>
            <h2 className="h3" style={{ color: "#fff", margin: "10px 0 0" }}>A track record the region trusts</h2>
          </div>
          <Btn to="/about" variant="ghost" size="sm" icon="arrowRight">Our story</Btn>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }} className="statband" role="list">
          {STATS.map(function(s, i) {
            var m = STAT_META[i];
            return (
              <Reveal key={s.label} d={(i % 5) + 1} className="glass-stat" style={{ padding: "clamp(16px,2.2vw,28px)" }} role="listitem">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <span style={{ display: "grid", placeItems: "center", width: 38, height: 38, borderRadius: 11, background: m.bg, flexShrink: 0 }} aria-hidden="true">
                    <Icon name={m.icon} size={18} style={{ color: m.color }} />
                  </span>
                  <span className="stat-dot" style={{ color: m.color, marginTop: 6 }} aria-hidden="true"></span>
                </div>
                <div className="glass-stat-num" style={{ fontSize: "clamp(26px,3.2vw,44px)" }} aria-label={s.num.toLocaleString() + " " + s.label}><CountUp end={s.num} /></div>
                <div style={{ fontWeight: 700, fontSize: 14, marginTop: 8, color: "#fff" }}>{s.label}</div>
                <div style={{ fontSize: 12.5, color: "var(--t-on-dark-dim)", marginTop: 3 }}>{s.sub}</div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
Object.assign(window, { StatsGrid });
