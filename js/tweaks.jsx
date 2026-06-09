/* global React, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakToggle, Orb */

const TFW_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroMetaphor": "converge",
  "accent": "#5FA82A",
  "animations": true
}/*EDITMODE-END*/;

window.__tfw = window.__tfw || { ...TFW_DEFAULTS };

function hexToRgb(h) {
  h = h.replace("#", "");
  if (h.length === 3) h = h.split("").map(c => c + c).join("");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function lighten(hex, amt = 0.22) {
  const [r, g, b] = hexToRgb(hex);
  const m = (c) => Math.round(c + (255 - c) * amt);
  return `rgb(${m(r)}, ${m(g)}, ${m(b)})`;
}
function hexA(hex, a) { const [r, g, b] = hexToRgb(hex); return `rgba(${r}, ${g}, ${b}, ${a})`; }

function applyTfw(t) {
  const root = document.documentElement;
  root.style.setProperty("--red-500", t.accent);
  root.style.setProperty("--accent", t.accent);
  root.style.setProperty("--red-400", lighten(t.accent, 0.2));
  root.style.setProperty("--red-600", lighten(t.accent, -0.15) === "rgb(NaN, NaN, NaN)" ? t.accent : `rgb(${hexToRgb(t.accent).map(c => Math.round(c * 0.82)).join(",")})`);
  root.style.setProperty("--red-glow", hexA(t.accent, 0.45));
  root.style.setProperty("--g-green", t.accent);
  root.style.setProperty("--g-lime", lighten(t.accent, 0.15));
  root.style.setProperty("--cand-glow", hexA(t.accent, 0.45));
  document.body.classList.toggle("no-anim", !t.animations);
}

/* shared store hook for the main app */
function useTfw() {
  const [t, setT] = React.useState(window.__tfw || TFW_DEFAULTS);
  React.useEffect(() => {
    const on = (e) => setT({ ...e.detail });
    window.addEventListener("tfw-change", on);
    if (window.__tfw) setT({ ...window.__tfw });
    return () => window.removeEventListener("tfw-change", on);
  }, []);
  return t;
}

function TweaksRoot() {
  const [t, setTweak] = useTweaks(TFW_DEFAULTS);
  React.useEffect(() => {
    window.__tfw = t;
    applyTfw(t);
    window.dispatchEvent(new CustomEvent("tfw-change", { detail: t }));
  }, [t]);

  const metaphors = [
    { id: "converge", label: "Converge" },
    { id: "orbit", label: "Orbit" },
    { id: "streams", label: "Streams" },
  ];

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Hero matching visual" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 4 }}>
        {metaphors.map((m) => {
          const on = t.heroMetaphor === m.id;
          return (
            <button key={m.id} onClick={() => setTweak("heroMetaphor", m.id)}
              style={{
                cursor: "pointer", padding: "12px 6px 9px", borderRadius: 12, textAlign: "center",
                background: on ? "rgba(225,29,42,.12)" : "rgba(0,0,0,.03)",
                border: on ? "1.5px solid var(--red-500)" : "1.5px solid transparent",
                transition: "all .15s",
              }}>
              <span style={{ display: "block", height: 30, position: "relative", marginBottom: 8 }}>
                <MetaIcon kind={m.id} />
              </span>
              <span style={{ fontSize: 12, fontWeight: 700, color: on ? "var(--red-600)" : "#555" }}>{m.label}</span>
            </button>
          );
        })}
      </div>

      <TweakSection label="Accent colour" />
      <TweakColor label="Brand accent" value={t.accent}
        options={["#5FA82A", "#1E6FB8", "#F08A24", "#E11D2A", "#1AA39A"]}
        onChange={(v) => setTweak("accent", v)} />

      <TweakSection label="Motion" />
      <TweakToggle label="Ambient animations" value={t.animations} onChange={(v) => setTweak("animations", v)} />
    </TweaksPanel>
  );
}

/* tiny schematic icons for the metaphor picker */
function MetaIcon({ kind }) {
  const dot = (x, y, r, c) => <circle cx={x} cy={y} r={r} fill={c} />;
  return (
    <svg viewBox="0 0 60 30" style={{ width: "100%", height: 30 }}>
      {kind === "converge" && (<>
        <line x1="8" y1="8" x2="30" y2="15" stroke="#ccc" strokeWidth="1.2" />
        <line x1="8" y1="22" x2="30" y2="15" stroke="#ccc" strokeWidth="1.2" />
        <line x1="52" y1="8" x2="30" y2="15" stroke="#ccc" strokeWidth="1.2" />
        <line x1="52" y1="22" x2="30" y2="15" stroke="#ccc" strokeWidth="1.2" />
        {dot(8, 8, 3, "#5FA82A")}{dot(8, 22, 3, "#8DC63F")}{dot(52, 8, 3, "#F08A24")}{dot(52, 22, 3, "#1AA39A")}{dot(30, 15, 5, "var(--red-500)")}
      </>)}
      {kind === "orbit" && (<>
        <ellipse cx="30" cy="15" rx="20" ry="9" fill="none" stroke="#ccc" strokeWidth="1.2" />
        {dot(30, 15, 5, "var(--red-500)")}{dot(10, 15, 3, "#5FA82A")}{dot(50, 15, 3, "#F08A24")}{dot(30, 6, 3, "#1AA39A")}
      </>)}
      {kind === "streams" && (<>
        <line x1="14" y1="6" x2="14" y2="24" stroke="#5FA82A" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="30" y1="6" x2="30" y2="24" stroke="var(--red-500)" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="46" y1="6" x2="46" y2="24" stroke="#F08A24" strokeWidth="2.4" strokeLinecap="round" />
      </>)}
    </svg>
  );
}

/* apply defaults immediately so first paint is correct */
applyTfw(window.__tfw);

Object.assign(window, { TweaksRoot, useTfw, TFW_DEFAULTS });
