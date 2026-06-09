/* global React, Icon, Orb, Reveal, Btn */
const { useState: useStateH, useEffect: useEffectH, useRef: useRefH } = React;

/* ============================================================
   NETWORK MAP BACKGROUND — kept for stats/region sections
   ============================================================ */
function NetworkMapBg() {
  const nodes = [
    { x: 340, y: 258, main: true,  r: 7 },
    { x: 120, y: 178, main: false, r: 4 },
    { x: 432, y: 116, main: false, r: 3.5 },
    { x: 490, y: 190, main: false, r: 3 },
    { x: 288, y: 368, main: false, r: 3.5 },
    { x: 258, y: 400, main: false, r: 3 },
    { x: 210, y: 228, main: false, r: 3 },
    { x: 302, y: 316, main: false, r: 3 },
  ];
  const edges = [[0,1],[0,2],[0,3],[0,4],[0,6],[0,7],[1,6],[4,7],[4,5]];
  return (
    <svg viewBox="0 0 600 500" style={{ width: "100%", height: "100%", overflow: "visible" }} aria-hidden="true">
      <defs>
        <radialGradient id="nmG1" cx="57%" cy="52%" r="42%">
          <stop offset="0" stopColor="rgba(225,29,42,0.28)" />
          <stop offset="1" stopColor="rgba(225,29,42,0)" />
        </radialGradient>
        <radialGradient id="nmG2" cx="20%" cy="36%" r="30%">
          <stop offset="0" stopColor="rgba(30,111,184,0.22)" />
          <stop offset="1" stopColor="rgba(30,111,184,0)" />
        </radialGradient>
        <filter id="nodeGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <ellipse cx="340" cy="258" rx="250" ry="210" fill="url(#nmG1)" />
      <ellipse cx="120" cy="178" rx="150" ry="110" fill="url(#nmG2)" />
      {edges.map(([a, b], i) => {
        const na = nodes[a], nb = nodes[b];
        const len = Math.hypot(nb.x - na.x, nb.y - na.y);
        const dashLen = Math.min(18, len * 0.12);
        return (
          <g key={i}>
            <line x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
            <line x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="rgba(225,29,42,0.80)" strokeWidth="2"
              strokeLinecap="round" strokeDasharray={`${dashLen} ${len}`}
              className="nm-travel"
              style={{ animationDelay: `${i * 0.42}s`, animationDuration: `${2.0 + i * 0.27}s` }} />
          </g>
        );
      })}
      {nodes.map((n, i) => (
        <g key={i} filter={n.main ? "url(#nodeGlow)" : undefined}>
          {n.main && <>
            <circle cx={n.x} cy={n.y} r="30" fill="none" stroke="rgba(225,29,42,0.13)" strokeWidth="1"
              className="nm-pulse" style={{ animationDelay: "0s", transformOrigin: `${n.x}px ${n.y}px` }} />
            <circle cx={n.x} cy={n.y} r="20" fill="none" stroke="rgba(225,29,42,0.22)" strokeWidth="1"
              className="nm-pulse" style={{ animationDelay: "0.5s", transformOrigin: `${n.x}px ${n.y}px` }} />
          </>}
          <circle cx={n.x} cy={n.y} r={n.r}
            fill={n.main ? "rgba(225,29,42,0.95)" : "rgba(255,255,255,0.32)"}
            stroke={n.main ? "rgba(255,120,120,0.7)" : "rgba(255,255,255,0.18)"}
            strokeWidth={n.main ? 2 : 1}
            className="nm-pulse"
            style={{ animationDelay: `${i * 0.36}s`, transformOrigin: `${n.x}px ${n.y}px` }} />
        </g>
      ))}
    </svg>
  );
}

/* ============================================================
   SCENE DATA
   ============================================================ */
const CANDS = [
  { name: "Aisha K.", role: "HR Advisor",      tags: ["CIPD", "ER"],   matched: false },
  { name: "James O.", role: "Service Advisor", tags: ["CRM", "O365"],  matched: true  },
];
const EMPS = [
  { company: "ACS",   role: "HR Advisor",   type: "Permanent", salary: "£30–35k" },
  { company: "Serco", role: "Svc. Advisor", type: "Permanent", salary: "£23–25k" },
];

/* ============================================================
   MINI CANDIDATE CARD — fluid width, green left-border accent
   ============================================================ */
function MiniCandidate({ name, role, tags, matched = false, className = "" }) {
  return (
    <div className={className} style={{
      padding: "10px 11px", borderRadius: 12,
      background: "#fff",
      border: "1px solid var(--paper-line)",
      borderLeft: "3px solid var(--g-green)",
      boxShadow: "0 6px 20px -8px rgba(0,0,0,.10)",
      color: "var(--t-ink)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, flex: "0 0 auto",
          background: "linear-gradient(135deg, var(--g-green), var(--g-lime))",
          display: "grid", placeItems: "center" }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11, color: "#fff" }}>
            {name.split(" ").map(w => w[0]).join("")}
          </span>
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 12.5, lineHeight: 1.1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</div>
          <div style={{ fontSize: 10.5, color: "var(--t-ink-mut)", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{role}</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 4, marginTop: 7, flexWrap: "wrap" }}>
        {tags.slice(0, 2).map(t => (
          <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 999,
            background: "rgba(95,168,42,.10)", border: "1px solid rgba(95,168,42,.22)", color: "var(--g-green)" }}>{t}</span>
        ))}
      </div>
      <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 5, fontSize: 10, fontWeight: 700, color: "var(--g-green)" }}>
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--g-green)", flexShrink: 0, boxShadow: "0 0 6px var(--cand-glow)" }}></span>
        {matched ? "Match found" : "Available now"}
      </div>
    </div>
  );
}

/* ============================================================
   MINI EMPLOYER CARD — fluid width, blue left-border accent
   ============================================================ */
function MiniEmployer({ company, role, type, salary, className = "" }) {
  return (
    <div className={className} style={{
      padding: "10px 11px", borderRadius: 12,
      background: "#fff",
      border: "1px solid var(--paper-line)",
      borderLeft: "3px solid var(--g-blue)",
      boxShadow: "0 6px 20px -8px rgba(0,0,0,.10)",
      color: "var(--t-ink)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, flex: "0 0 auto",
          background: "linear-gradient(135deg, var(--g-blue), #2280d0)",
          display: "grid", placeItems: "center" }}>
          <Icon name="building" size={14} style={{ color: "#fff" }} stroke={2} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 12.5, lineHeight: 1.1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{role}</div>
          <div style={{ fontSize: 10.5, color: "var(--t-ink-mut)", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{company}</div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 7 }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12.5 }}>{salary}</span>
        <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 999,
          background: "rgba(30,111,184,.10)", color: "var(--g-blue)" }}>{type}</span>
      </div>
      <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: "var(--t-ink-dim)", fontWeight: 600 }}>
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--g-blue)", flexShrink: 0 }}></span>
        Seeking candidates now
      </div>
    </div>
  );
}

/* ============================================================
   HERO SCENE — clean 3-column matching diagram, no clipping
   ============================================================ */
function HeroScene({ metaphor = "converge" }) {
  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      padding: "20px 18px 16px", gap: 10,
      boxSizing: "border-box"
    }}>

      {/* Column labels */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 72px 1fr", gap: "0 14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--g-green)", flexShrink: 0 }}></span>
          <span style={{ fontSize: 10, fontWeight: 700, color: "var(--g-green)", letterSpacing: ".10em", textTransform: "uppercase" }}>Candidates</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 9, fontWeight: 700, color: "var(--t-ink-dim)", letterSpacing: ".08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>Matching</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 5 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: "var(--g-blue)", letterSpacing: ".10em", textTransform: "uppercase" }}>Employers</span>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--g-blue)", flexShrink: 0 }}></span>
        </div>
      </div>

      {/* Main matching area */}
      <div style={{ flex: 1, position: "relative", minHeight: 0 }}>

        {/* Decorative connection arcs — coordinate-free percentage paths */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
          <defs>
            <linearGradient id="arcC" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="rgba(95,168,42,0.50)" />
              <stop offset="1" stopColor="rgba(95,168,42,0.06)" />
            </linearGradient>
            <linearGradient id="arcE" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="rgba(30,111,184,0.06)" />
              <stop offset="1" stopColor="rgba(30,111,184,0.50)" />
            </linearGradient>
          </defs>
          {/* Cand 1 → Orb */}
          <path d="M 40 24 C 46 24, 50 50, 50 50" fill="none" stroke="url(#arcC)" strokeWidth="1.1" />
          {/* Cand 2 → Orb */}
          <path d="M 40 76 C 46 76, 50 50, 50 50" fill="none" stroke="url(#arcC)" strokeWidth="1.1" />
          {/* Orb → Emp 1 */}
          <path d="M 50 50 C 54 50, 58 24, 60 24" fill="none" stroke="url(#arcE)" strokeWidth="1.1" />
          {/* Orb → Emp 2 */}
          <path d="M 50 50 C 54 50, 58 76, 60 76" fill="none" stroke="url(#arcE)" strokeWidth="1.1" />
        </svg>

        {/* Three-column matching grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 72px 1fr",
          gap: "12px 14px",
          height: "100%",
          alignContent: "center",
          position: "relative", zIndex: 1
        }}>
          {/* Left: Candidates */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <MiniCandidate {...CANDS[0]} className="floaty" />
            <MiniCandidate {...CANDS[1]} className="floaty-2" />
          </div>

          {/* Centre: Orb + match badge */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0 }}>
            <div style={{ position: "relative", display: "grid", placeItems: "center" }}>
              <span className="pulse-ring" style={{ width: 62, height: 62, position: "absolute", left: "50%", top: "50%", marginLeft: -31, marginTop: -31 }}></span>
              <Orb size={54} glow spin />
            </div>
            <div style={{
              marginTop: 10,
              background: "rgba(255,255,255,.97)",
              borderRadius: 8, padding: "4px 7px",
              border: "1px solid rgba(95,168,42,.24)",
              boxShadow: "0 2px 10px -4px rgba(95,168,42,.22)",
              textAlign: "center"
            }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 7.5, letterSpacing: ".16em", color: "var(--g-green)", whiteSpace: "nowrap", lineHeight: 1.5 }}>MATCH</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 7.5, letterSpacing: ".16em", color: "var(--g-green)", whiteSpace: "nowrap", lineHeight: 1.5 }}>FOUND</div>
            </div>
          </div>

          {/* Right: Employers */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <MiniEmployer {...EMPS[0]} className="floaty-2" />
            <MiniEmployer {...EMPS[1]} className="floaty-3" />
          </div>
        </div>
      </div>

      {/* Bottom stat bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 18,
        paddingTop: 8, borderTop: "1px solid var(--paper-line)"
      }}>
        {[
          { n: "2,150+", label: "Active matches", color: "var(--g-green)" },
          { n: "98%",    label: "Placement rate", color: "var(--g-blue)"  },
          { n: "48hrs",  label: "Avg. time to hire", color: "var(--g-teal)" },
        ].map(s => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: s.color, lineHeight: 1 }}>{s.n}</div>
            <div style={{ fontSize: 9.5, color: "var(--t-ink-dim)", marginTop: 2, fontWeight: 600, letterSpacing: ".02em" }}>{s.label}</div>
          </div>
        ))}
      </div>

    </div>
  );
}

/* ============================================================
   MOBILE HERO SCENE — compact static layout
   ============================================================ */
function MobileHeroScene() {
  const cand = CANDS[1];
  const emp  = EMPS[0];
  return (
    <div style={{ width: "100%", maxWidth: "100%", boxSizing: "border-box", overflow: "hidden", paddingBottom: 4 }}>
      <div style={{ display: "flex", justifyContent: "center", paddingBlock: "10px 28px" }}>
        <div style={{ position: "relative", display: "grid", placeItems: "center" }}>
          <span className="pulse-ring" style={{ width: 58, height: 58, position: "absolute", left: "50%", top: "50%", marginLeft: -29, marginTop: -29 }}></span>
          <Orb size={52} glow spin />
          <div style={{ position: "absolute", bottom: -26, left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap",
            fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 9, letterSpacing: ".2em",
            color: "var(--ink-800)", background: "rgba(255,255,255,.95)", padding: "3px 9px",
            borderRadius: 999, border: "1px solid var(--paper-line)", boxShadow: "0 2px 8px -2px rgba(0,0,0,.10)" }}>
            MATCH FOUND
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div style={{ padding: 10, borderRadius: 14, boxSizing: "border-box", background: "#fff",
          border: "1px solid var(--paper-line)", borderLeft: "3px solid var(--g-green)",
          boxShadow: "0 4px 16px -6px rgba(0,0,0,.10)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0,
              background: "linear-gradient(135deg, var(--g-green), var(--g-lime))", display: "grid", placeItems: "center" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11, color: "#fff" }}>JO</span>
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 12, color: "var(--t-ink)", lineHeight: 1.1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cand.name}</div>
              <div style={{ fontSize: 10, color: "var(--t-ink-mut)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cand.role}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 8 }}>
            {cand.tags.map(tag => (
              <span key={tag} style={{ fontSize: 9.5, fontWeight: 600, padding: "2px 6px", borderRadius: 999,
                background: "rgba(95,168,42,.10)", border: "1px solid rgba(95,168,42,.22)", color: "var(--g-green)" }}>{tag}</span>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, fontWeight: 700, color: "var(--g-green)" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--g-green)", flexShrink: 0, boxShadow: "0 0 8px var(--cand-glow)" }}></span>
            Match found
          </div>
        </div>
        <div style={{ padding: 10, borderRadius: 14, background: "#fff", border: "1px solid var(--paper-line)",
          borderLeft: "3px solid var(--g-blue)", boxSizing: "border-box", boxShadow: "0 4px 16px -6px rgba(0,0,0,.10)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0,
              background: "linear-gradient(135deg, var(--g-blue), #2280d0)", display: "grid", placeItems: "center" }}>
              <Icon name="building" size={14} style={{ color: "#fff" }} stroke={2} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 12, color: "var(--ink-900)", lineHeight: 1.1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{emp.role}</div>
              <div style={{ fontSize: 10, color: "var(--t-ink-mut)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{emp.company}</div>
            </div>
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12.5, color: "var(--ink-900)", marginBottom: 6 }}>{emp.salary}</div>
          <span style={{ fontSize: 9.5, fontWeight: 700, color: "var(--g-blue)", background: "rgba(30,111,184,.08)",
            padding: "2px 8px", borderRadius: 999, display: "inline-block" }}>{emp.type}</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HeroScene, MobileHeroScene, NetworkMapBg });
