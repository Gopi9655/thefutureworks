"use client";

import { useState } from "react";
import { Icon } from "../Icon";
import { Reveal } from "../primitives";
import { NetworkMapBg } from "../NetworkMap";

const REGION_CITIES = [
  { name: "Coventry", jobs: "1,240+", x: "57%", y: "51%", main: true },
  { name: "Birmingham", jobs: "320+", x: "20%", y: "36%", main: false },
  { name: "Nuneaton", jobs: "184", x: "72%", y: "23%", main: false },
  { name: "Warwick", jobs: "156", x: "48%", y: "74%", main: false },
  { name: "Rugby", jobs: "98", x: "82%", y: "38%", main: false },
  { name: "Leamington Spa", jobs: "112", x: "43%", y: "80%", main: false },
  { name: "Solihull", jobs: "142", x: "35%", y: "46%", main: false },
  { name: "Kenilworth", jobs: "68", x: "50%", y: "64%", main: false },
];

export function RegionSection() {
  const [hov, setHov] = useState<string | null>(null);
  return (
    <section style={{ background: "var(--ink-850)", position: "relative", overflow: "hidden", paddingBlock: "clamp(56px,8vw,110px)" }}>
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: 52, alignItems: "center" }} className="cards-2">
          <div className="on-dark">
            <Reveal>
              <span className="eyebrow on-dark"><Icon name="mapPin" size={14} /> The region</span>
              <h2 className="h2" style={{ color: "#fff", margin: "16px 0 0" }}>Coventry, Warwickshire &amp; the West Midlands</h2>
              <p className="lead" style={{ margin: "16px 0 28px" }}>
                Almost twenty years recruiting across the region — we know the employers, business parks and the local talent inside out.
              </p>
            </Reveal>
            <Reveal d={1} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
              {REGION_CITIES.map((c) => (
                <div key={c.name} className="glass" style={{ padding: "12px 15px", borderRadius: 13, cursor: "default", border: hov === c.name ? "1px solid rgba(30,111,184,0.42)" : "1px solid var(--line)", transition: "border-color .2s, background .2s", background: hov === c.name ? "rgba(30,111,184,0.08)" : "rgba(20,28,52,0.55)" }}
                  onMouseEnter={() => setHov(c.name)} onMouseLeave={() => setHov(null)}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
                    <span style={{ width: 7, height: 7, borderRadius: 50, flexShrink: 0, background: c.main ? "var(--g-blue)" : "rgba(255,255,255,.45)" }} />
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: c.main ? "#fff" : "var(--t-on-dark-mut)" }}>{c.name}</span>
                  </div>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "#fff" }}>{c.jobs}</span>
                  <span style={{ fontSize: 11, color: "var(--t-on-dark-dim)", marginLeft: 4 }}>roles</span>
                </div>
              ))}
            </Reveal>
          </div>

          <Reveal d={2} style={{ position: "relative", aspectRatio: "6/5", borderRadius: "var(--radius-lg)", overflow: "hidden", background: "var(--ink-950)", border: "1px solid var(--line-2)" }}>
            <div style={{ position: "absolute", inset: 0, opacity: 0.7 }}>
              <NetworkMapBg />
            </div>
            {REGION_CITIES.map((c) => (
              <div key={c.name} style={{ position: "absolute", left: c.x, top: c.y, transform: "translate(-50%,-50%)", zIndex: 2 }}
                onMouseEnter={() => setHov(c.name)} onMouseLeave={() => setHov(null)}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "default" }}>
                  <div style={{ width: c.main ? 14 : 8, height: c.main ? 14 : 8, borderRadius: 50, transition: "box-shadow .2s, transform .2s", background: c.main ? "var(--g-blue)" : "rgba(255,255,255,0.5)", transform: hov === c.name ? "scale(1.5)" : "scale(1)", boxShadow: c.main ? "0 0 18px var(--g-blue), 0 0 40px rgba(30,111,184,.28)" : hov === c.name ? "0 0 12px rgba(255,255,255,0.6)" : "none", border: c.main ? "2px solid rgba(100,170,230,.7)" : "1px solid rgba(255,255,255,.3)" }} />
                  {hov === c.name && (
                    <div className="glass" style={{ padding: "5px 11px", borderRadius: 9, pointerEvents: "none", whiteSpace: "nowrap" }}>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11.5, color: "#fff" }}>{c.name}</div>
                      <div style={{ fontSize: 10.5, color: "var(--g-lime)", fontWeight: 600 }}>{c.jobs} roles</div>
                    </div>
                  )}
                  {c.main && hov !== c.name && (
                    <div className="glass" style={{ padding: "4px 10px", borderRadius: 8, pointerEvents: "none" }}>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 10.5, color: "#fff", letterSpacing: ".08em" }}>COVENTRY HQ</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default RegionSection;
