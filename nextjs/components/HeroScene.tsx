import { Orb } from "./primitives";
import { Icon } from "./Icon";

const CANDS = [
  { name: "Aisha K.", role: "HR Advisor", tags: ["CIPD", "ER"], matched: false },
  { name: "James O.", role: "Service Advisor", tags: ["CRM", "O365"], matched: true },
];
const EMPS = [
  { company: "ACS", role: "HR Advisor", type: "Permanent", salary: "£30–35k" },
  { company: "Serco", role: "Svc. Advisor", type: "Permanent", salary: "£23–25k" },
];

function MiniCandidate({ name, role, tags, matched = false, deep = false }: {
  name: string; role: string; tags: string[]; matched?: boolean; deep?: boolean;
}) {
  return (
    <div className={"hx-card hx-card-cand" + (deep ? " hx-deep" : "")}>
      <div className="hx-card-head">
        <div className="hx-avatar hx-avatar-cand">
          <span>{name.split(" ").map((w) => w[0]).join("")}</span>
        </div>
        <div style={{ minWidth: 0 }}>
          <div className="hx-name">{name}</div>
          <div className="hx-sub">{role}</div>
        </div>
      </div>
      <div className="hx-tags">
        {tags.slice(0, 2).map((t) => <span key={t} className="hx-chip">{t}</span>)}
      </div>
      <div className="hx-status hx-status-cand">
        <span className="hx-status-dot" />
        {matched ? "Match found" : "Available now"}
      </div>
    </div>
  );
}

function MiniEmployer({ company, role, type, salary, deep = false }: {
  company: string; role: string; type: string; salary: string; deep?: boolean;
}) {
  return (
    <div className={"hx-card hx-card-emp" + (deep ? " hx-deep" : "")}>
      <div className="hx-card-head">
        <div className="hx-avatar hx-avatar-emp">
          <Icon name="building" size={14} style={{ color: "#fff" }} stroke={2} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div className="hx-name">{role}</div>
          <div className="hx-sub">{company}</div>
        </div>
      </div>
      <div className="hx-row">
        <span className="hx-salary">{salary}</span>
        <span className="hx-pill-type">{type}</span>
      </div>
      <div className="hx-status hx-status-emp">
        <span className="hx-status-dot" />
        Seeking candidates
      </div>
    </div>
  );
}

// Desktop: premium 3D-style recruitment matching engine.
export function HeroScene() {
  return (
    <div className="hx-scene" aria-hidden="true">
      <div className="hx-scene-bg" />
      <div className="hx-scene-grid" />
      <span className="hx-amb hx-amb-green" />
      <span className="hx-amb hx-amb-blue" />

      <div className="hx-content">
        <div className="hx-labels">
          <span className="hx-tag" style={{ color: "var(--g-green)" }}>
            <span className="hx-tag-dot" style={{ background: "var(--g-green)" }} /> Candidates
          </span>
          <span className="hx-tag hx-tag-engine">Matching engine</span>
          <span className="hx-tag" style={{ color: "var(--g-blue)", justifyContent: "flex-end" }}>
            Employers <span className="hx-tag-dot" style={{ background: "var(--g-blue)" }} />
          </span>
        </div>

        <div className="hx-stage">
          <svg className="hx-beams" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="hxArcC" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="rgba(95,168,42,0.10)" />
                <stop offset="1" stopColor="rgba(95,168,42,0.65)" />
              </linearGradient>
              <linearGradient id="hxArcE" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="rgba(30,111,184,0.65)" />
                <stop offset="1" stopColor="rgba(30,111,184,0.10)" />
              </linearGradient>
            </defs>
            {/* base + flowing signal beams: candidate -> core */}
            <path d="M 33 30 C 44 30, 46 50, 50 50" fill="none" stroke="rgba(95,168,42,0.16)" strokeWidth="1.1" />
            <path d="M 33 70 C 44 70, 46 50, 50 50" fill="none" stroke="rgba(95,168,42,0.16)" strokeWidth="1.1" />
            <path className="hx-beam-flow" d="M 33 30 C 44 30, 46 50, 50 50" fill="none" stroke="url(#hxArcC)" strokeWidth="1.4" strokeLinecap="round" />
            <path className="hx-beam-flow" style={{ animationDelay: "-0.8s" }} d="M 33 70 C 44 70, 46 50, 50 50" fill="none" stroke="url(#hxArcC)" strokeWidth="1.4" strokeLinecap="round" />
            {/* core -> employer */}
            <path d="M 50 50 C 54 50, 56 30, 67 30" fill="none" stroke="rgba(30,111,184,0.16)" strokeWidth="1.1" />
            <path d="M 50 50 C 54 50, 56 70, 67 70" fill="none" stroke="rgba(30,111,184,0.16)" strokeWidth="1.1" />
            <path className="hx-beam-flow" style={{ animationDelay: "-0.4s" }} d="M 50 50 C 54 50, 56 30, 67 30" fill="none" stroke="url(#hxArcE)" strokeWidth="1.4" strokeLinecap="round" />
            <path className="hx-beam-flow" style={{ animationDelay: "-1.2s" }} d="M 50 50 C 54 50, 56 70, 67 70" fill="none" stroke="url(#hxArcE)" strokeWidth="1.4" strokeLinecap="round" />
          </svg>

          <div className="hx-col">
            <div className="hx-float"><MiniCandidate {...CANDS[0]} /></div>
            <div className="hx-float hx-float-2"><MiniCandidate {...CANDS[1]} deep /></div>
          </div>

          <div className="hx-core">
            <div className="hx-core-rings">
              <span className="hx-ring" />
              <span className="hx-ring" style={{ animationDelay: "-1.2s" }} />
              <Orb size={56} glow spin />
            </div>
            <div className="hx-badge">
              <div className="hx-badge-t">MATCH</div>
              <div className="hx-badge-t">FOUND</div>
            </div>
          </div>

          <div className="hx-col">
            <div className="hx-float hx-float-2"><MiniEmployer {...EMPS[0]} /></div>
            <div className="hx-float hx-float-3"><MiniEmployer {...EMPS[1]} deep /></div>
          </div>
        </div>

        <div className="hx-metrics">
          {[
            { n: "2,150+", label: "Active matches", color: "var(--g-green)" },
            { n: "98%", label: "Placement rate", color: "var(--g-blue)" },
            { n: "48hrs", label: "Avg. time to hire", color: "var(--g-teal)" },
          ].map((s) => (
            <div key={s.label} className="hx-metric">
              <div className="hx-metric-n" style={{ color: s.color }}>{s.n}</div>
              <div className="hx-metric-l">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Mobile: compact static layout (animations frozen via CSS)
export function MobileHeroScene() {
  const cand = CANDS[1];
  const emp = EMPS[0];
  return (
    <div style={{ width: "100%", maxWidth: "100%", boxSizing: "border-box", overflow: "hidden", paddingBottom: 4 }}>
      <div style={{ display: "flex", justifyContent: "center", paddingBlock: "10px 28px" }}>
        <div style={{ position: "relative", display: "grid", placeItems: "center" }}>
          <span className="pulse-ring" style={{ width: 58, height: 58, position: "absolute", left: "50%", top: "50%", marginLeft: -29, marginTop: -29 }} />
          <Orb size={52} glow spin />
          <div style={{ position: "absolute", bottom: -26, left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 9, letterSpacing: ".2em", color: "var(--ink-800)", background: "rgba(255,255,255,.95)", padding: "3px 9px", borderRadius: 999, border: "1px solid var(--paper-line)", boxShadow: "0 2px 8px -2px rgba(0,0,0,.10)" }}>
            MATCH FOUND
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div style={{ padding: 10, borderRadius: 14, boxSizing: "border-box", background: "#fff", border: "1px solid var(--paper-line)", borderLeft: "3px solid var(--g-green)", boxShadow: "0 4px 16px -6px rgba(0,0,0,.10)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, background: "linear-gradient(135deg, var(--g-green), var(--g-lime))", display: "grid", placeItems: "center" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11, color: "#fff" }}>JO</span>
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 12, color: "var(--t-ink)", lineHeight: 1.1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cand.name}</div>
              <div style={{ fontSize: 10, color: "var(--t-ink-mut)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cand.role}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 8 }}>
            {cand.tags.map((tag) => (
              <span key={tag} style={{ fontSize: 9.5, fontWeight: 600, padding: "2px 6px", borderRadius: 999, background: "rgba(95,168,42,.10)", border: "1px solid rgba(95,168,42,.22)", color: "var(--g-green)" }}>{tag}</span>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, fontWeight: 700, color: "var(--g-green)" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--g-green)", flexShrink: 0, boxShadow: "0 0 8px var(--cand-glow)" }} />
            Match found
          </div>
        </div>
        <div style={{ padding: 10, borderRadius: 14, background: "#fff", border: "1px solid var(--paper-line)", borderLeft: "3px solid var(--g-blue)", boxSizing: "border-box", boxShadow: "0 4px 16px -6px rgba(0,0,0,.10)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, background: "linear-gradient(135deg, var(--g-blue), #2280d0)", display: "grid", placeItems: "center" }}>
              <Icon name="building" size={14} style={{ color: "#fff" }} stroke={2} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 12, color: "var(--ink-900)", lineHeight: 1.1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{emp.role}</div>
              <div style={{ fontSize: 10, color: "var(--t-ink-mut)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{emp.company}</div>
            </div>
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12.5, color: "var(--ink-900)", marginBottom: 6 }}>{emp.salary}</div>
          <span style={{ fontSize: 9.5, fontWeight: 700, color: "var(--g-blue)", background: "rgba(30,111,184,.08)", padding: "2px 8px", borderRadius: 999, display: "inline-block" }}>{emp.type}</span>
        </div>
      </div>
    </div>
  );
}
