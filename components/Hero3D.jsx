/* global React, Icon, Orb, Reveal, Btn */
const { useState: useStateH, useEffect: useEffectH, useRef: useRefH } = React;

/* ============================================================
   NETWORK MAP BACKGROUND — Coventry / WM city constellation
   ============================================================ */
function NetworkMapBg() {
  const nodes = [
    { x: 340, y: 258, main: true,  r: 7 },   // Coventry
    { x: 120, y: 178, main: false, r: 4 },   // Birmingham
    { x: 432, y: 116, main: false, r: 3.5 }, // Nuneaton
    { x: 490, y: 190, main: false, r: 3 },   // Rugby
    { x: 288, y: 368, main: false, r: 3.5 }, // Warwick
    { x: 258, y: 400, main: false, r: 3 },   // Leamington
    { x: 210, y: 228, main: false, r: 3 },   // Solihull
    { x: 302, y: 316, main: false, r: 3 },   // Kenilworth
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

      {/* edges */}
      {edges.map(([a, b], i) => {
        const na = nodes[a], nb = nodes[b];
        const len = Math.hypot(nb.x - na.x, nb.y - na.y);
        const dashLen = Math.min(18, len * 0.12);
        return (
          <g key={i}>
            <line x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
              stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
            <line x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
              stroke="rgba(225,29,42,0.80)" strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${dashLen} ${len}`}
              className="nm-travel"
              style={{ animationDelay: `${i * 0.42}s`, animationDuration: `${2.0 + i * 0.27}s` }} />
          </g>
        );
      })}

      {/* nodes */}
      {nodes.map((n, i) => (
        <g key={i} filter={n.main ? "url(#nodeGlow)" : undefined}>
          {n.main && <>
            <circle cx={n.x} cy={n.y} r="30" fill="none"
              stroke="rgba(225,29,42,0.13)" strokeWidth="1"
              className="nm-pulse"
              style={{ animationDelay: "0s", transformOrigin: `${n.x}px ${n.y}px` }} />
            <circle cx={n.x} cy={n.y} r="20" fill="none"
              stroke="rgba(225,29,42,0.22)" strokeWidth="1"
              className="nm-pulse"
              style={{ animationDelay: "0.5s", transformOrigin: `${n.x}px ${n.y}px` }} />
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
   LOCATION PIN — floating city label
   ============================================================ */
function LocationPin({ city, note, style }) {
  return (
    <div className="loc-pin" style={style}>
      <Icon name="mapPin" size={12} stroke={2.5} style={{ color: "#7eb8f7", flexShrink: 0 }} />
      <span>{city}</span>
      {note && <span style={{ opacity: .5, fontSize: 10.5 }}>{note}</span>}
    </div>
  );
}

/* ============================================================
   SALARY CHIP — floating wage pill
   ============================================================ */
function SalaryChip({ salary, type, style }) {
  return (
    <div className="salary-chip" style={style}>
      <span style={{ color: "var(--g-lime)", fontSize: 11, fontWeight: 800 }}>£</span>
      <span>{salary}</span>
      {type && <span style={{ opacity: .5, fontSize: 10.5 }}>· {type}</span>}
    </div>
  );
}

/* ============================================================
   MINI CANDIDATE CARD
   ============================================================ */
function MiniCandidate({ name, role, tags, accent = "var(--g-green)", matched = false }) {
  return (
    <div className="glass" style={{ width: 194, padding: 14, borderRadius: 16, color: "#fff", boxShadow: "0 22px 48px -20px rgba(0,0,0,.7)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 38, height: 38, borderRadius: 11, flex: "0 0 auto", background: "linear-gradient(135deg, var(--ink-600), var(--ink-700))", display: "grid", placeItems: "center", border: "1px solid var(--line-2)" }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15, color: "#fff" }}>{name.split(" ").map(w => w[0]).join("")}</span>
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</div>
          <div style={{ fontSize: 11.5, color: "var(--t-on-dark-mut)", marginTop: 2 }}>{role}</div>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 10 }}>
        {tags.map((t) => (
          <span key={t} style={{ fontSize: 10.5, fontWeight: 600, padding: "3px 8px", borderRadius: 999, background: "rgba(255,255,255,.07)", border: "1px solid var(--line-2)", color: "var(--t-on-dark-mut)" }}>{t}</span>
        ))}
      </div>
      <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, color: matched ? "var(--g-lime)" : accent }}>
        <span style={{ width: 7, height: 7, borderRadius: 50, flexShrink: 0, background: matched ? "var(--g-lime)" : accent, boxShadow: `0 0 10px ${matched ? "var(--g-lime)" : accent}` }}></span>
        {matched ? "Match found" : "Available now"}
      </div>
    </div>
  );
}

/* ============================================================
   MINI EMPLOYER CARD
   ============================================================ */
function MiniEmployer({ company, role, type, salary }) {
  return (
    <div style={{ width: 198, padding: 14, borderRadius: 16, background: "#fff", color: "var(--ink-900)", boxShadow: "0 26px 52px -22px rgba(0,0,0,.6)", border: "1px solid rgba(255,255,255,.65)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 38, height: 38, borderRadius: 11, flex: "0 0 auto", background: "linear-gradient(135deg, var(--red-500), var(--g-orange))", display: "grid", placeItems: "center" }}>
          <Icon name="building" size={19} style={{ color: "#fff" }} stroke={2} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.1 }}>{role}</div>
          <div style={{ fontSize: 11.5, color: "var(--t-ink-mut)", marginTop: 2 }}>{company}</div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 11 }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14 }}>{salary}</span>
        <span style={{ fontSize: 10.5, fontWeight: 700, padding: "3px 8px", borderRadius: 999, background: "rgba(225,29,42,.1)", color: "var(--red-600)" }}>{type}</span>
      </div>
      <div style={{ marginTop: 9, display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--t-ink-dim)", fontWeight: 600 }}>
        <Icon name="users" size={11} /> Seeking candidates now
      </div>
    </div>
  );
}

/* ============================================================
   SCENE DATA
   ============================================================ */
const CANDS = [
  { name: "Aisha K.", role: "HR Advisor",        tags: ["CIPD", "ER", "Onboarding"], accent: "var(--g-green)", pos: [13, 20], matched: false },
  { name: "James O.", role: "Service Advisor",   tags: ["CRM", "O365", "Calls"],     accent: "var(--g-lime)",  pos: [9,  52], matched: true  },
  { name: "Priya S.", role: "Finance Assistant", tags: ["Sage", "Excel"],            accent: "var(--g-teal)",  pos: [16, 83], matched: false },
];
const EMPS = [
  { company: "ACS",            role: "HR Advisor",     type: "Permanent", salary: "£30–35k", pos: [86, 19] },
  { company: "Serco",          role: "Svc. Advisor",   type: "Permanent", salary: "£23–25k", pos: [90, 50] },
  { company: "The Box Factory",role: "Accountant",     type: "Permanent", salary: "£42–48k", pos: [84, 82] },
];

/* ============================================================
   HERO SCENE
   ============================================================ */
function HeroScene({ metaphor = "converge" }) {
  const sceneRef = useRefH(null);
  const targetRef = useRefH({ x: 0, y: 0 });
  const curRef = useRefH({ x: 0, y: 0 });
  const rafRef = useRefH(0);

  useEffectH(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const onMove = (e) => {
      targetRef.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      targetRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    const loop = () => {
      curRef.current.x += (targetRef.current.x - curRef.current.x) * 0.055;
      curRef.current.y += (targetRef.current.y - curRef.current.y) * 0.055;
      const el = sceneRef.current;
      if (el) el.style.transform = `rotateX(${-curRef.current.y * 6}deg) rotateY(${curRef.current.x * 8}deg)`;
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(rafRef.current); };
  }, []);

  let cands = CANDS, emps = EMPS, node = [50, 50];
  if (metaphor === "orbit") {
    const r = 36, ry = 30;
    const a1 = [-90, 30, 150], a2 = [-30, 90, 210];
    cands = CANDS.map((c, i) => ({ ...c, pos: [50 + r * Math.cos(a1[i] * Math.PI / 180), 50 + ry * Math.sin(a1[i] * Math.PI / 180)] }));
    emps  = EMPS.map((c, i)  => ({ ...c, pos: [50 + r * Math.cos(a2[i] * Math.PI / 180), 50 + ry * Math.sin(a2[i] * Math.PI / 180)] }));
  } else if (metaphor === "streams") {
    cands = CANDS.map((c, i) => ({ ...c, pos: [22, 16 + i * 33] }));
    emps  = EMPS.map((c, i)  => ({ ...c, pos: [78, 16 + i * 33] }));
  }
  const all = [...cands.map(c => c.pos), ...emps.map(c => c.pos)];

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", perspective: 1400, perspectiveOrigin: "50% 45%" }}>
      {/* WM network map backdrop */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.26, pointerEvents: "none", zIndex: 0 }}>
        <NetworkMapBg />
      </div>

      <div ref={sceneRef} style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d", zIndex: 1 }}>

        {/* connecting beams */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none" }}>
          <defs>
            <linearGradient id="beam2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0"   stopColor="var(--g-green)"  stopOpacity="0.08" />
              <stop offset="0.5" stopColor="var(--red-400)"  stopOpacity="0.95" />
              <stop offset="1"   stopColor="var(--g-orange)" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          {all.map((p, i) => {
            const mx = (p[0] + node[0]) / 2;
            const d = `M ${p[0]} ${p[1]} C ${mx} ${p[1]}, ${mx} ${node[1]}, ${node[0]} ${node[1]}`;
            return <path key={i} d={d} fill="none" stroke="url(#beam2)" strokeWidth="1.3"
              vectorEffect="non-scaling-stroke" className="hero-beam"
              style={{ strokeDasharray: 6, animation: `beamflow 2.5s linear ${i * 0.22}s infinite` }} />;
          })}
        </svg>

        {/* match node — dual pulse ring */}
        <div style={{ position: "absolute", left: `${node[0]}%`, top: `${node[1]}%`, transform: "translate(-50%,-50%) translateZ(42px)" }}>
          <div style={{ position: "relative", display: "grid", placeItems: "center" }}>
            <span className="pulse-ring" style={{ width: 100, height: 100, position: "absolute", left: "50%", top: "50%", marginLeft: -50, marginTop: -50 }} />
            <span className="pulse-ring" style={{ width: 100, height: 100, position: "absolute", left: "50%", top: "50%", marginLeft: -50, marginTop: -50, animationDelay: "1.2s" }} />
            <Orb size={96} glow spin />
            <div style={{ position: "absolute", bottom: -34, left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11, letterSpacing: ".22em", color: "#fff", background: "rgba(6,8,15,.88)", padding: "5px 12px", borderRadius: 999, border: "1px solid var(--line-2)", backdropFilter: "blur(8px)" }}>
              MATCH FOUND
            </div>
          </div>
        </div>

        {/* candidate cards */}
        {cands.map((c, i) => (
          <div key={"c" + i} className={["floaty","floaty-2","floaty-3"][i % 3]}
            style={{ position: "absolute", left: `${c.pos[0]}%`, top: `${c.pos[1]}%`, transform: `translate(-50%,-50%) translateZ(${20 + i * 8}px)` }}>
            <MiniCandidate {...c} />
          </div>
        ))}

        {/* employer cards */}
        {emps.map((c, i) => (
          <div key={"e" + i} className={["floaty","floaty-2","floaty-3"][i % 3]}
            style={{ position: "absolute", left: `${c.pos[0]}%`, top: `${c.pos[1]}%`, transform: `translate(-50%,-50%) translateZ(${24 + i * 6}px)` }}>
            <MiniEmployer {...c} />
          </div>
        ))}

        {/* location pins */}
        <div className="floaty" style={{ position: "absolute", left: "48%", top: "5%", transform: "translate(-50%,-50%) translateZ(64px)" }}>
          <LocationPin city="Coventry" note="CV1" />
        </div>
        <div className="floaty-3" style={{ position: "absolute", left: "33%", top: "73%", transform: "translate(-50%,-50%) translateZ(50px)" }}>
          <LocationPin city="Warwickshire" />
        </div>
        <div className="floaty-2" style={{ position: "absolute", left: "67%", top: "91%", transform: "translate(-50%,-50%) translateZ(38px)" }}>
          <LocationPin city="West Midlands" />
        </div>

        {/* salary chips */}
        <div className="floaty-2" style={{ position: "absolute", left: "31%", top: "14%", transform: "translate(-50%,-50%) translateZ(58px)" }}>
          <SalaryChip salary="28–32k" type="perm" />
        </div>
        <div className="floaty-3" style={{ position: "absolute", left: "67%", top: "67%", transform: "translate(-50%,-50%) translateZ(52px)" }}>
          <SalaryChip salary="42–48k" />
        </div>

        {/* check / match ticks */}
        <div className="floaty" style={{ position: "absolute", left: "44%", top: "26%", transform: "translateZ(72px)" }}>
          <span style={{ display: "grid", placeItems: "center", width: 34, height: 34, borderRadius: 50, background: "var(--g-green)", boxShadow: "0 10px 24px -6px rgba(95,168,42,.75)" }}>
            <Icon name="check" size={18} stroke={2.6} style={{ color: "#fff" }} />
          </span>
        </div>
        <div className="floaty-2" style={{ position: "absolute", left: "57%", top: "70%", transform: "translateZ(62px)" }}>
          <span style={{ display: "grid", placeItems: "center", width: 30, height: 30, borderRadius: 50, background: "var(--red-500)", boxShadow: "0 10px 24px -6px var(--red-glow)" }}>
            <Icon name="handshake" size={16} stroke={2.2} style={{ color: "#fff" }} />
          </span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HeroScene, NetworkMapBg, LocationPin, SalaryChip });

/* ============================================================
   DEFERRED HERO — lazy-loads 3D scene to avoid blocking FCP
   ============================================================ */
function DeferredHero3D({ metaphor }) {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    var id = typeof requestIdleCallback === "function"
      ? requestIdleCallback(function() { setReady(true); })
      : setTimeout(function() { setReady(true); }, 120);
    return function() {
      if (typeof cancelIdleCallback === "function") cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, []);
  if (!ready) return (
    <div style={{ display: "grid", placeItems: "center", width: "100%", height: "100%" }} aria-hidden="true" role="presentation">
      <Orb size={96} glow />
    </div>
  );
  return <HeroScene metaphor={metaphor} />;
}

Object.assign(window, { DeferredHero3D });
