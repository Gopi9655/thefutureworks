import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";

/**
 * Concept A — Premium glass recruitment matching cockpit.
 *
 * Left: concise headline, subtext, two CTAs, trust chips.
 * Right: a central "match engine" orb with green (candidate) and blue
 * (employer) connection beams feeding floating glass cards plus a synthetic
 * opportunity card. Decorative visual is aria-hidden; motion respects
 * prefers-reduced-motion via the `.lab-beam` / `.lab-float` classes.
 *
 * Synthetic concept data only.
 */
export function HomeHeroConceptA() {
  return (
    <section className="lab-hero concept-a">
      <div className="lab-hero-copy">
        <span className="lab-hero-eyebrow">
          <Icon name="sparkles" size={13} stroke={1.9} /> Matching engine · Live concept
        </span>
        <h2 className="lab-hero-title">
          The right match,{" "}
          <span className="lab-accent-grad">engineered</span> for Coventry.
        </h2>
        <p className="lab-hero-sub">
          thefutureworks pairs ready candidates with employers across the West
          Midlands — scored, explainable and human-checked before anyone is
          introduced.
        </p>
        <div className="lab-hero-actions">
          <Button to="/vacancies" variant="primary" size="lg" icon="arrowRight">
            Find jobs
          </Button>
          <Button to="/employers" variant="ghost-blue" size="lg" iconLeft="building">
            Hire talent
          </Button>
        </div>
        <div className="lab-hero-chips">
          <span className="lab-trust-chip">
            <Icon name="check" size={14} stroke={2.4} /> Coventry University Group
          </span>
          <span className="lab-trust-chip is-blue">
            <Icon name="shield" size={14} /> Human-checked matches
          </span>
          <span className="lab-trust-chip">
            <Icon name="users" size={14} /> 8,196 candidates ready
          </span>
        </div>
      </div>

      <div className="lab-visual concept-a-stage" aria-hidden="true">
        <svg className="concept-a-links" viewBox="0 0 440 430" preserveAspectRatio="none">
          <defs>
            <linearGradient id="labGradGreen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#5FA82A" />
              <stop offset="1" stopColor="#8DC63F" />
            </linearGradient>
            <linearGradient id="labGradBlue" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#1E6FB8" />
              <stop offset="1" stopColor="#1AA39A" />
            </linearGradient>
          </defs>
          {/* candidate path (green) */}
          <path d="M220 215 C 158 188 120 140 96 104" stroke="rgba(95,168,42,0.28)" strokeWidth="6" fill="none" />
          <path className="lab-beam" d="M220 215 C 158 188 120 140 96 104" stroke="url(#labGradGreen)" strokeWidth="2.4" />
          {/* employer path (blue) */}
          <path d="M220 215 C 296 190 332 142 352 108" stroke="rgba(30,111,184,0.28)" strokeWidth="6" fill="none" />
          <path className="lab-beam" d="M220 215 C 296 190 332 142 352 108" stroke="url(#labGradBlue)" strokeWidth="2.4" style={{ animationDelay: "-1.2s" }} />
          {/* opportunity path */}
          <path d="M220 215 C 212 285 206 330 204 366" stroke="rgba(240,138,36,0.26)" strokeWidth="6" fill="none" />
          <path className="lab-beam" d="M220 215 C 212 285 206 330 204 366" stroke="#F08A24" strokeWidth="2.2" style={{ animationDelay: "-0.6s" }} />
        </svg>

        <div className="concept-a-core">
          <span className="concept-a-core-ring lab-pulse" />
          <div>
            <div className="concept-a-core-label">Match score</div>
            <div className="concept-a-core-score">94%</div>
            <div className="concept-a-core-sub">3 strong fits</div>
          </div>
        </div>

        <div className="lab-mini concept-a-cand lab-float">
          <div className="lab-mini-head">
            <span className="lab-avatar is-green">AO</span>
            <span className="lab-mini-label">Candidate</span>
            <span className="lab-mini-badge is-green">96%</span>
          </div>
          <div className="lab-mini-name">Amara O.</div>
          <div className="lab-mini-meta">Warehouse Team Lead · Ready now</div>
        </div>

        <div className="lab-mini concept-a-empl lab-float-2">
          <div className="lab-mini-head">
            <span className="lab-avatar is-blue">CL</span>
            <span className="lab-mini-label">Employer</span>
            <span className="lab-mini-badge is-blue">5 roles</span>
          </div>
          <div className="lab-mini-name">Coventry Logistics</div>
          <div className="lab-mini-meta">Hiring · CV6 · Free advice</div>
        </div>

        <div className="lab-mini concept-a-opp lab-float-3">
          <div className="lab-mini-head">
            <span className="lab-dot lab-dot-orange" />
            <span className="lab-mini-label">Opportunity</span>
            <span className="lab-mini-badge is-green">New</span>
          </div>
          <div className="lab-mini-name">Production Operative</div>
          <div className="lab-mini-meta">£26,500 · Coventry · 12 matched</div>
        </div>
      </div>
    </section>
  );
}

export default HomeHeroConceptA;
