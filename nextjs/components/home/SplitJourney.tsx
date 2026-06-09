"use client";

import { useState } from "react";
import { Icon } from "../Icon";
import { Orb } from "../primitives";
import { Button } from "../Button";
import { SectionHead } from "../sections";

type Side = "candidate" | "employer";

const JOURNEYS: Record<Side, {
  icon: string; bg: string; title: string; sub: string;
  steps: { t: string; d: string; icon: string }[];
  cta: { label: string; to: string }; cta2: { label: string; to: string };
}> = {
  candidate: {
    icon: "users",
    bg: "linear-gradient(135deg, #0a2218, #1AA39A)",
    title: "Looking for a job?",
    sub: "From first conversation to first day — guidance, honesty and opportunities that fit.",
    steps: [
      { t: "Register & share your goals", d: "Email your CV or call 02476 158815. You don't have to be a student.", icon: "send" },
      { t: "Get matched to real roles", d: "Hand-picked vacancies that fit your skills and salary expectations.", icon: "target" },
      { t: "Interview with us first", d: "We brief you, prep you and present you at your best to every client.", icon: "compass" },
      { t: "Placed & supported", d: "CV advice, interview prep and honest market-salary guidance throughout.", icon: "checkCircle" },
    ],
    cta: { label: "Find jobs", to: "/vacancies" },
    cta2: { label: "How it works", to: "/candidates" },
  },
  employer: {
    icon: "building",
    bg: "linear-gradient(135deg, #0e1d3a, var(--g-blue))",
    title: "Looking for staff?",
    sub: "Permanent, temporary and part-time staffing across the region. Our advice is always free.",
    steps: [
      { t: "Brief us once, properly", d: "We map the role, culture and requirements in full — no cut-and-paste.", icon: "doc" },
      { t: "We search & assess", d: "Rigorous candidate selection from our deep local talent database.", icon: "target" },
      { t: "Receive a vetted shortlist", d: "Reference-checked, interview-ready — no speculative CV bundles.", icon: "layers" },
      { t: "Success-fee, guaranteed", d: "Permanent placements on a success-fee basis, with a guarantee period.", icon: "shield" },
    ],
    cta: { label: "Hire staff", to: "/employers" },
    cta2: { label: "Our process", to: "/employers" },
  },
};

export function SplitJourney() {
  const [active, setActive] = useState<Side>("candidate");
  const j = JOURNEYS[active];
  return (
    <section className="bg-paper-2 section">
      <div className="wrap">
        <SectionHead align="center" eyebrow={<><Icon name="compass" size={14} /> Two ways we help</>} title="Whichever side of the desk you're on" sub="One team, helping with long and short-term temporary assignments and permanent recruitment." max={620} />

        <div style={{ display: "flex", gap: 10, marginTop: 34, maxWidth: 500, marginInline: "auto" }}>
          {([["candidate", "users", "I'm looking for a job"], ["employer", "building", "I need to hire staff"]] as [Side, string, string][]).map(([k, ic, label]) => (
            <button key={k} className={"split-tab" + (active === k ? " active" : "")} onClick={() => setActive(k)} aria-pressed={active === k}>
              <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <span style={{ display: "grid", placeItems: "center", width: 32, height: 32, borderRadius: 9, flexShrink: 0, background: active === k ? (k === "candidate" ? "rgba(95,168,42,0.12)" : "rgba(30,111,184,0.12)") : "var(--paper-3)" }}>
                  <Icon name={ic} size={17} style={{ color: active === k ? (k === "candidate" ? "var(--g-green)" : "var(--g-blue)") : "var(--t-ink-dim)" }} />
                </span>
                <span style={{ fontWeight: 700, fontSize: 14.5, color: active === k ? "var(--t-ink)" : "var(--t-ink-mut)" }}>{label}</span>
              </span>
            </button>
          ))}
        </div>

        <div key={active} className="card slide-in-panel" style={{ marginTop: 18, padding: 0, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr" }} className="cards-2">
            <div style={{ background: j.bg, padding: "clamp(26px,3vw,44px)", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 24, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", right: -30, top: -30, opacity: 0.22 }}><Orb size={168} spin /></div>
              <div style={{ position: "relative" }}>
                <span style={{ display: "grid", placeItems: "center", width: 54, height: 54, borderRadius: 15, background: "rgba(255,255,255,0.16)", border: "1px solid rgba(255,255,255,.22)", marginBottom: 20 }}>
                  <Icon name={j.icon} size={26} style={{ color: "#fff" }} />
                </span>
                <h3 className="h3" style={{ color: "#fff", margin: "0 0 10px" }}>{j.title}</h3>
                <p style={{ color: "rgba(255,255,255,.80)", margin: 0, fontSize: 15.5, lineHeight: 1.55, maxWidth: 340 }}>{j.sub}</p>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Button to={j.cta.to} variant="light" icon="arrowRight">{j.cta.label}</Button>
                <Button to={j.cta2.to} variant="ghost">{j.cta2.label}</Button>
              </div>
            </div>
            <div style={{ padding: "clamp(24px,3vw,40px)", display: "flex", flexDirection: "column", gap: 0 }}>
              {j.steps.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 16, paddingBottom: i < j.steps.length - 1 ? 24 : 0, position: "relative" }}>
                  {i < j.steps.length - 1 && (
                    <div style={{ position: "absolute", left: 19, top: 42, width: 2, bottom: 0, background: "linear-gradient(var(--paper-line), transparent)" }} />
                  )}
                  <span style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 12, flexShrink: 0, background: active === "candidate" ? "rgba(95,168,42,0.09)" : "rgba(30,111,184,0.09)", border: active === "candidate" ? "1px solid rgba(95,168,42,0.18)" : "1px solid rgba(30,111,184,0.18)", zIndex: 1 }}>
                    <Icon name={s.icon} size={19} style={{ color: active === "candidate" ? "var(--g-green)" : "var(--g-blue)" }} />
                  </span>
                  <div style={{ paddingTop: 6 }}>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{s.t}</div>
                    <div className="t-mut" style={{ fontSize: 14, marginTop: 4, lineHeight: 1.5 }}>{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SplitJourney;
