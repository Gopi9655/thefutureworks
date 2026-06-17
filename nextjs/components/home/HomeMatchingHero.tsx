import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";

/**
 * Homepage hero — Concept A "Glass matching cockpit".
 *
 * Selected from /design-lab and applied to the real homepage `/`.
 * Left: compact headline, subtext, two strong CTAs, trust chips.
 * Right: a central match-engine orb with green (candidate) and blue
 * (employer) connection beams feeding floating glass cards plus a synthetic
 * opportunity card. The decorative visual is aria-hidden; motion respects
 * prefers-reduced-motion via the `.hc-beam` / `.hc-float` / `.hc-pulse`
 * classes in app/home-hero.css.
 *
 * Synthetic concept data only — no real candidate data.
 */
export function HomeMatchingHero() {
  return (
    <div className="hc-hero">
      <div className="hc-copy">
        <span className="hc-eyebrow">
          <Icon name="sparkles" size={13} stroke={1.9} /> Coventry University-owned · Matching engine
        </span>
        <h1 className="hc-title">
          The right match,{" "}
          <span className="hc-accent-grad">engineered</span> for Coventry.
        </h1>
        <p className="hc-sub">
          thefutureworks pairs ready candidates with employers across Coventry,
          Warwickshire and the West Midlands — scored, explainable and
          human-checked before anyone is introduced.
        </p>
        <div className="hc-actions">
          <Button to="/vacancies" variant="primary" size="lg" icon="arrowRight">
            Find jobs
          </Button>
          <Button to="/employers" variant="ghost-blue" size="lg" iconLeft="building">
            Hire staff
          </Button>
        </div>
        <div className="hc-chips">
          <span className="hc-chip">
            <Icon name="check" size={14} stroke={2.4} /> Coventry University Group
          </span>
          <span className="hc-chip is-blue">
            <Icon name="shield" size={14} /> Human-checked matches
          </span>
          <span className="hc-chip">
            <Icon name="users" size={14} /> 8,196 candidates ready
          </span>
        </div>
      </div>

      <div className="hc-stage" aria-hidden="true">
        <svg className="hc-links" viewBox="0 0 440 430" preserveAspectRatio="none">
          <defs>
            <linearGradient id="hcGradGreen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#5FA82A" />
              <stop offset="1" stopColor="#8DC63F" />
            </linearGradient>
            <linearGradient id="hcGradBlue" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#1E6FB8" />
              <stop offset="1" stopColor="#1AA39A" />
            </linearGradient>
          </defs>
          {/* candidate path (green) */}
          <path d="M220 215 C 158 188 120 140 96 104" stroke="rgba(95,168,42,0.34)" strokeWidth="7" fill="none" />
          <path className="hc-beam" d="M220 215 C 158 188 120 140 96 104" stroke="url(#hcGradGreen)" strokeWidth="2.8" />
          {/* employer path (blue) */}
          <path d="M220 215 C 296 190 332 142 352 108" stroke="rgba(30,111,184,0.34)" strokeWidth="7" fill="none" />
          <path className="hc-beam" d="M220 215 C 296 190 332 142 352 108" stroke="url(#hcGradBlue)" strokeWidth="2.8" style={{ animationDelay: "-1.2s" }} />
          {/* opportunity path (gold) */}
          <path d="M220 215 C 212 285 206 330 204 366" stroke="rgba(225,128,26,0.32)" strokeWidth="7" fill="none" />
          <path className="hc-beam" d="M220 215 C 212 285 206 330 204 366" stroke="#E1801A" strokeWidth="2.6" style={{ animationDelay: "-0.6s" }} />
        </svg>

        <div className="hc-core">
          <span className="hc-core-ring hc-pulse" />
          <div>
            <div className="hc-core-label">Match score</div>
            <div className="hc-core-score">94%</div>
            <div className="hc-core-sub">3 strong fits</div>
          </div>
        </div>

        <div className="hc-card hc-cand hc-float">
          <div className="hc-card-head">
            <span className="hc-badge is-green" aria-hidden="true">
              <Icon name="users" size={16} stroke={2} />
            </span>
            <span className="hc-card-label">Candidate</span>
            <span className="hc-card-badge is-green">96%</span>
          </div>
          <div className="hc-card-name">Warehouse Team Lead</div>
          <div className="hc-card-meta">Ready now · CV-checked</div>
        </div>

        <div className="hc-card hc-empl hc-float-2">
          <div className="hc-card-head">
            <span className="hc-badge is-blue" aria-hidden="true">
              <Icon name="building" size={16} stroke={2} />
            </span>
            <span className="hc-card-label">Employer</span>
            <span className="hc-card-badge is-blue">5 roles</span>
          </div>
          <div className="hc-card-name">Coventry Logistics</div>
          <div className="hc-card-meta">Hiring · CV6 · Free advice</div>
        </div>

        <div className="hc-card hc-opp hc-float-3">
          <div className="hc-card-head">
            <span className="hc-badge is-orange" aria-hidden="true">
              <Icon name="sparkles" size={16} stroke={2} />
            </span>
            <span className="hc-card-label">Role</span>
            <span className="hc-card-badge is-green">New</span>
          </div>
          <div className="hc-card-name">Production Operative</div>
          <div className="hc-card-meta">£26,500 · Coventry · 12 matched</div>
        </div>
      </div>
    </div>
  );
}

export default HomeMatchingHero;
