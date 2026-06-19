import { Icon } from "../Icon";
import { Reveal } from "../primitives";

/* Towns thefutureworks recruits across. No role-count numbers are shown —
   those were never verified official facts. Cards describe the service area
   only; `tone` alternates green (candidate reach) / blue (employer network). */
const REGION_TOWNS = [
  { name: "Coventry", note: "Head office", x: 50, y: 48, tone: "blue", hub: true },
  { name: "Birmingham", note: "West Midlands", x: 20, y: 28, tone: "blue" },
  { name: "Nuneaton", note: "Warwickshire", x: 68, y: 20, tone: "green" },
  { name: "Rugby", note: "Warwickshire", x: 80, y: 42, tone: "blue" },
  { name: "Solihull", note: "West Midlands", x: 27, y: 60, tone: "green" },
  { name: "Leamington Spa", note: "Warwickshire", x: 78, y: 66, tone: "green" },
  { name: "Kenilworth", note: "Warwickshire", x: 42, y: 72, tone: "green" },
  { name: "Warwick", note: "Warwickshire", x: 60, y: 75, tone: "blue" },
];

const HUB = REGION_TOWNS[0];

export function RegionSection() {
  return (
    <section className="region-section">
      <div className="wrap">
        <div className="region-grid">
          {/* ─────────── LEFT — MESSAGE + SERVICE-AREA CARDS ─────────── */}
          <div>
            <Reveal>
              <span className="eyebrow"><Icon name="mapPin" size={14} /> The region</span>
              <h2 className="h2" style={{ color: "var(--t-ink)", margin: "16px 0 0" }}>
                Coventry, Warwickshire &amp; the West Midlands
              </h2>
              <p className="lead" style={{ color: "var(--t-ink-mut)", margin: "16px 0 0" }}>
                thefutureworks recruits across Coventry, Warwickshire and the West Midlands —
                connecting local candidates with employers right across the region.
              </p>
            </Reveal>
            <Reveal d={1} className="region-cards">
              {REGION_TOWNS.map((t) => (
                <div
                  key={t.name}
                  className={"region-card " + (t.hub ? "region-card-hub" : t.tone === "green" ? "region-card-g" : "region-card-b")}
                >
                  <span className="region-card-dot" />
                  <span className="region-card-text">
                    <span className="region-card-name">{t.name}</span>
                    <span className="region-card-sub">{t.hub ? "Coventry HQ" : t.note}</span>
                  </span>
                  {t.hub && <span className="region-card-badge">HQ</span>}
                </div>
              ))}
            </Reveal>
          </div>

          {/* ─────────── RIGHT — REGIONAL COVERAGE MAP ─────────── */}
          <Reveal d={2} className="region-map" aria-hidden="true">
            <span className="region-map-grid" />

            {/* faint area labels behind the network */}
            <span className="region-area region-area-wm">West Midlands</span>
            <span className="region-area region-area-wk">Warwickshire</span>

            {/* connection lines: Coventry hub → every town (draws softly) */}
            <svg className="region-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
              {REGION_TOWNS.filter((t) => !t.hub).map((t, i) => (
                <line
                  key={t.name}
                  className={"region-line " + (t.tone === "green" ? "region-line-g" : "region-line-b")}
                  x1={HUB.x} y1={HUB.y} x2={t.x} y2={t.y}
                  pathLength={1}
                  vectorEffect="non-scaling-stroke"
                  style={{ animationDelay: `${0.25 + i * 0.1}s` }}
                />
              ))}
            </svg>

            {/* nodes */}
            {REGION_TOWNS.map((t, i) => (
              <div
                key={t.name}
                className={"region-node " + (t.hub ? "region-node-hub" : t.tone === "green" ? "region-node-g" : "region-node-b")}
                style={{ left: `${t.x}%`, top: `${t.y}%`, animationDelay: `${0.4 + i * 0.08}s` }}
              >
                {t.hub && <span className="region-node-glow" />}
                <span className="region-node-dot" />
                <span className="region-node-label">{t.hub ? "Coventry HQ" : t.name}</span>
              </div>
            ))}

            {/* legend — what the two colours mean */}
            <div className="region-legend">
              <span className="region-legend-item"><span className="region-legend-dot region-dot-b" /> Employer network</span>
              <span className="region-legend-item"><span className="region-legend-dot region-dot-g" /> Candidate reach</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default RegionSection;
