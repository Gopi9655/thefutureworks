// Decorative West-Midlands network map — used as a faint background behind
// stats and the region section. Animations are CSS-gated on reduced-motion.
const NODES = [
  { x: 340, y: 258, main: true, r: 7 },
  { x: 120, y: 178, main: false, r: 4 },
  { x: 432, y: 116, main: false, r: 3.5 },
  { x: 490, y: 190, main: false, r: 3 },
  { x: 288, y: 368, main: false, r: 3.5 },
  { x: 258, y: 400, main: false, r: 3 },
  { x: 210, y: 228, main: false, r: 3 },
  { x: 302, y: 316, main: false, r: 3 },
];
const EDGES: [number, number][] = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 6], [0, 7], [1, 6], [4, 7], [4, 5]];

export function NetworkMapBg() {
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
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <ellipse cx="340" cy="258" rx="250" ry="210" fill="url(#nmG1)" />
      <ellipse cx="120" cy="178" rx="150" ry="110" fill="url(#nmG2)" />
      {EDGES.map(([a, b], i) => {
        const na = NODES[a], nb = NODES[b];
        const len = Math.hypot(nb.x - na.x, nb.y - na.y);
        const dashLen = Math.min(18, len * 0.12);
        return (
          <g key={i}>
            <line x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
            <line x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="rgba(225,29,42,0.80)" strokeWidth="2"
              strokeLinecap="round" strokeDasharray={`${dashLen} ${len}`} className="nm-travel"
              style={{ animationDelay: `${i * 0.42}s`, animationDuration: `${2.0 + i * 0.27}s` }} />
          </g>
        );
      })}
      {NODES.map((n, i) => (
        <g key={i} filter={n.main ? "url(#nodeGlow)" : undefined}>
          {n.main && (
            <>
              <circle cx={n.x} cy={n.y} r="30" fill="none" stroke="rgba(225,29,42,0.13)" strokeWidth="1" className="nm-pulse" style={{ animationDelay: "0s", transformOrigin: `${n.x}px ${n.y}px` }} />
              <circle cx={n.x} cy={n.y} r="20" fill="none" stroke="rgba(225,29,42,0.22)" strokeWidth="1" className="nm-pulse" style={{ animationDelay: "0.5s", transformOrigin: `${n.x}px ${n.y}px` }} />
            </>
          )}
          <circle cx={n.x} cy={n.y} r={n.r}
            fill={n.main ? "rgba(225,29,42,0.95)" : "rgba(255,255,255,0.32)"}
            stroke={n.main ? "rgba(255,120,120,0.7)" : "rgba(255,255,255,0.18)"}
            strokeWidth={n.main ? 2 : 1} className="nm-pulse"
            style={{ animationDelay: `${i * 0.36}s`, transformOrigin: `${n.x}px ${n.y}px` }} />
        </g>
      ))}
    </svg>
  );
}

export default NetworkMapBg;
