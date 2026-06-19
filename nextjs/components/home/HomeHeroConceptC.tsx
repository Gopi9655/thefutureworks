import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";

/**
 * Concept C — Agency command centre.
 *
 * Left: concise headline, subtext, two CTAs, trust chips.
 * Right: a glass dashboard panel with job-pipeline metrics, a scored
 * candidate queue and an employer staffing-request card. Decorative visual
 * is aria-hidden; the only motion is the soft float, which respects
 * prefers-reduced-motion.
 *
 * Synthetic concept data only.
 */
export function HomeHeroConceptC() {
  return (
    <section className="lab-hero concept-c">
      <div className="lab-hero-copy">
        <span className="lab-hero-eyebrow">
          <Icon name="chart" size={13} stroke={1.9} /> Consultant command centre
        </span>
        <h2 className="lab-hero-title">
          Recruitment, run with{" "}
          <span className="lab-accent-grad">total clarity</span>.
        </h2>
        <p className="lab-hero-sub">
          Every role, every shortlist and every employer request in one calm
          view — so our consultants place the right people faster, with no CVs
          lost in an inbox.
        </p>
        <div className="lab-hero-actions">
          <Button to="/vacancies" variant="primary" size="lg" icon="arrowRight">
            Browse roles
          </Button>
          <Button to="/request-staff" variant="ghost-blue" size="lg" iconLeft="briefcase">
            Request staff
          </Button>
        </div>
        <div className="lab-hero-chips">
          <span className="lab-trust-chip">
            <Icon name="bolt" size={14} /> Avg. shortlist in 48h
          </span>
          <span className="lab-trust-chip is-blue">
            <Icon name="shield" size={14} /> Consultant-led
          </span>
          <span className="lab-trust-chip">
            <Icon name="heart" size={14} /> Free employer advice
          </span>
        </div>
      </div>

      <div className="lab-visual concept-c-visual" aria-hidden="true">
        <div className="concept-c-panel lab-float">
          <div className="concept-c-top">
            <div className="concept-c-tl"><span /><span /><span /></div>
            <span className="concept-c-title">Placement desk</span>
            <span className="concept-c-live">
              <span className="lab-dot lab-dot-green" /> Live
            </span>
          </div>

          <div className="concept-c-body">
            <div className="concept-c-metrics">
              <div className="concept-c-metric">
                <div className="concept-c-metric-num is-green">142</div>
                <div className="concept-c-metric-label">Open roles</div>
              </div>
              <div className="concept-c-metric">
                <div className="concept-c-metric-num is-blue">37</div>
                <div className="concept-c-metric-label">In pipeline</div>
              </div>
              <div className="concept-c-metric">
                <div className="concept-c-metric-num">19</div>
                <div className="concept-c-metric-label">Filled / week</div>
              </div>
            </div>

            <div className="concept-c-cols">
              <div>
                <div className="concept-c-sub">
                  <span>Candidate queue</span>
                  <span>Match</span>
                </div>
                <div className="concept-c-queue">
                  <div className="concept-c-row">
                    <span className="lab-avatar is-green">JM</span>
                    <span>
                      <span className="concept-c-row-name">Jacob M.</span>
                      <span className="concept-c-row-role">CNC Machinist</span>
                    </span>
                    <span className="concept-c-score"><b>95%</b><span>Fit</span></span>
                  </div>
                  <div className="concept-c-row">
                    <span className="lab-avatar is-teal">PR</span>
                    <span>
                      <span className="concept-c-row-name">Priya R.</span>
                      <span className="concept-c-row-role">Care Assistant</span>
                    </span>
                    <span className="concept-c-score"><b>91%</b><span>Fit</span></span>
                  </div>
                  <div className="concept-c-row">
                    <span className="lab-avatar is-blue">TD</span>
                    <span>
                      <span className="concept-c-row-name">Tomas D.</span>
                      <span className="concept-c-row-role">Warehouse Op.</span>
                    </span>
                    <span className="concept-c-score"><b>88%</b><span>Fit</span></span>
                  </div>
                </div>
              </div>

              <div className="concept-c-request">
                <div className="concept-c-sub">
                  <span>Staffing request</span>
                  <Icon name="building" size={13} />
                </div>
                <div className="concept-c-request-co">Midlands Care Group</div>
                <dl style={{ margin: "8px 0 0" }}>
                  <div className="concept-c-request-row">
                    <dt>Role</dt>
                    <dd>Support Worker ×4</dd>
                  </div>
                  <div className="concept-c-request-row">
                    <dt>Location</dt>
                    <dd>Coventry CV1</dd>
                  </div>
                  <div className="concept-c-request-row">
                    <dt>Start</dt>
                    <dd>Within 2 weeks</dd>
                  </div>
                  <div className="concept-c-request-row">
                    <dt>Status</dt>
                    <dd style={{ color: "var(--g-green)" }}>Shortlisting</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeHeroConceptC;
