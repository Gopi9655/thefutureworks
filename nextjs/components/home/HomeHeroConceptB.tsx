import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";

/**
 * Concept B — Coventry talent network.
 *
 * Left: concise headline, subtext, two CTAs, trust chips.
 * Right: a regional map/grid with Coventry as the hub plus surrounding
 * towns, an employer-demand card (blue), a candidate-readiness card (green)
 * and a Coventry University Group trust strip. Decorative visual is
 * aria-hidden; the hub pulse respects prefers-reduced-motion.
 *
 * Synthetic concept data only.
 */
export function HomeHeroConceptB() {
  return (
    <section className="lab-hero concept-b">
      <div className="lab-hero-copy">
        <span className="lab-hero-eyebrow">
          <Icon name="mapPin" size={13} stroke={1.9} /> Coventry &amp; Warwickshire network
        </span>
        <h2 className="lab-hero-title">
          One region.{" "}
          <span className="lab-accent-blue">Connected</span> talent and{" "}
          <span className="lab-accent-green">opportunity</span>.
        </h2>
        <p className="lab-hero-sub">
          A live picture of who is ready and who is hiring across Coventry,
          Warwickshire and the West Midlands — owned by Coventry University
          Group and built to give back to the region.
        </p>
        <div className="lab-hero-actions">
          <Button to="/vacancies" variant="primary" size="lg" icon="arrowRight">
            Explore jobs
          </Button>
          <Button to="/employers" variant="ghost-blue" size="lg" iconLeft="handshake">
            Find staff
          </Button>
        </div>
        <div className="lab-hero-chips">
          <span className="lab-trust-chip is-blue">
            <Icon name="cap" size={14} /> University-owned
          </span>
          <span className="lab-trust-chip">
            <Icon name="mapPin" size={14} /> West Midlands focus
          </span>
          <span className="lab-trust-chip is-blue">
            <Icon name="check" size={14} stroke={2.4} /> Est. 2005
          </span>
        </div>
      </div>

      <div className="lab-visual concept-b-visual" aria-hidden="true">
        <div className="concept-b-map">
          <svg viewBox="0 0 360 300" preserveAspectRatio="none">
            <defs>
              <linearGradient id="labBlinkA" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#1E6FB8" />
                <stop offset="1" stopColor="#5FA82A" />
              </linearGradient>
            </defs>
            {/* connection lines from hub to surrounding nodes */}
            <path d="M180 150 L78 70" stroke="rgba(30,111,184,0.30)" strokeWidth="2" fill="none" />
            <path className="lab-beam" d="M180 150 L78 70" stroke="url(#labBlinkA)" strokeWidth="1.8" />
            <path d="M180 150 L292 78" stroke="rgba(95,168,42,0.30)" strokeWidth="2" fill="none" />
            <path className="lab-beam" d="M180 150 L292 78" stroke="url(#labBlinkA)" strokeWidth="1.8" style={{ animationDelay: "-0.8s" }} />
            <path d="M180 150 L96 234" stroke="rgba(95,168,42,0.30)" strokeWidth="2" fill="none" />
            <path className="lab-beam" d="M180 150 L96 234" stroke="url(#labBlinkA)" strokeWidth="1.8" style={{ animationDelay: "-1.4s" }} />
            <path d="M180 150 L286 222" stroke="rgba(30,111,184,0.30)" strokeWidth="2" fill="none" />
            <path className="lab-beam" d="M180 150 L286 222" stroke="url(#labBlinkA)" strokeWidth="1.8" style={{ animationDelay: "-2s" }} />
          </svg>

          <span className="concept-b-place is-hub" style={{ top: "50%", left: "50%" }}>
            <span className="concept-b-hub-pulse lab-pulse" />
            <Icon name="mapPin" size={12} /> Coventry
          </span>
          <span className="concept-b-place" style={{ top: "23%", left: "22%" }}>
            <span className="lab-dot lab-dot-blue" /> Nuneaton
          </span>
          <span className="concept-b-place" style={{ top: "26%", left: "81%" }}>
            <span className="lab-dot lab-dot-green" /> Rugby
          </span>
          <span className="concept-b-place" style={{ top: "78%", left: "27%" }}>
            <span className="lab-dot lab-dot-green" /> Warwick
          </span>
          <span className="concept-b-place" style={{ top: "74%", left: "79%" }}>
            <span className="lab-dot lab-dot-blue" /> Solihull
          </span>
        </div>

        <div className="lab-mini concept-b-demand lab-float-2">
          <div className="lab-mini-head">
            <span className="lab-dot lab-dot-blue" />
            <span className="lab-mini-label">Employer demand</span>
          </div>
          <div className="lab-mini-name">+18% this quarter</div>
          <div className="lab-bar"><span style={{ width: "72%" }} /></div>
        </div>

        <div className="lab-mini concept-b-ready lab-float">
          <div className="lab-mini-head">
            <span className="lab-dot lab-dot-green" />
            <span className="lab-mini-label">Candidate readiness</span>
          </div>
          <div className="lab-mini-name">8,196 active</div>
          <div className="lab-bar"><span style={{ width: "84%" }} /></div>
        </div>

        <div className="concept-b-strip">
          <span className="concept-b-strip-cap">
            <Icon name="cap" size={17} />
          </span>
          <span className="concept-b-strip-text">
            <strong>Coventry University Group</strong>
            <span>Not-for-private-profit · Reinvested in the region</span>
          </span>
        </div>
      </div>
    </section>
  );
}

export default HomeHeroConceptB;
