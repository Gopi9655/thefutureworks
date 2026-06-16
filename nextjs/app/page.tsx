import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import {
  PlatformCard,
  PlatformCTA,
  PlatformFieldList,
  PlatformMetric,
  PlatformPill,
  PlatformSection,
  PlatformShell,
} from "@/components/platform";
import { RecruitmentMatchingScene } from "@/components/three/RecruitmentMatchingScene";
import { candidateProfiles, dashboardMetrics, employerRequests, matchSignals, platformJobs } from "@/data/platform";

const candidatePathway = [
  {
    title: "Discover aligned roles",
    body: "Candidates see opportunities shaped by sector, location, availability and role direction.",
  },
  {
    title: "Build a readiness view",
    body: "Synthetic profile signals show how skills, work mode and consultant review could support a shortlist.",
  },
  {
    title: "Move with confidence",
    body: "A future workflow can make every step clearer without replacing human recruitment judgement.",
  },
];

const employerPathway = [
  {
    title: "Frame the brief",
    body: "Employers can express role needs, timing and working pattern through a structured request model.",
  },
  {
    title: "Review matched talent",
    body: "Consultant-led shortlists can surface candidate fit, availability and match rationale.",
  },
  {
    title: "Track demand clearly",
    body: "Request status, opportunity records and review flags can sit in one trust-led employer view.",
  },
];

const workflow = [
  { title: "Request", icon: "building", tone: "blue" as const, body: "Employer demand enters the concept intake model." },
  { title: "Profile", icon: "users", tone: "green" as const, body: "Synthetic candidate records provide readiness context." },
  { title: "Signal", icon: "target", tone: "green" as const, body: "Match signals explain skill, sector and location alignment." },
  { title: "Review", icon: "shield", tone: "blue" as const, body: "Consultant review remains central to the proposed workflow." },
];

function HomeHero() {
  return (
    <section className="home-platform-hero" aria-labelledby="home-hero-title">
      <div className="home-hero-scene-layer">
        <RecruitmentMatchingScene />
      </div>
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <div className="home-hero-content">
          <div className="platform-eyebrow"><Icon name="sparkles" size={14} /> Advanced Platform v2 concept</div>
          <h1 id="home-hero-title" className="home-hero-title">
            Recruitment built around <span className="platform-gradient-text">Coventry talent</span>, employers and opportunity.
          </h1>
          <p className="home-hero-lead">
            A high-fidelity prototype for a more connected recruitment experience across candidates, employers and consultant-led matching.
          </p>
          <div className="platform-actions">
            <Button to="/vacancies" variant="primary" size="lg" icon="arrowRight">Find work</Button>
            <Button to="/request-staff" variant="blue" size="lg" iconLeft="building">Request staff</Button>
            <Button to="/dashboard" variant="outline" size="lg" iconLeft="chart">View dashboard</Button>
          </div>
          <div className="home-trust-strip" aria-label="Platform concept trust signals">
            <PlatformPill tone="blue" icon="shield">Concept prototype</PlatformPill>
            <PlatformPill tone="blue" icon="building">Coventry University Group</PlatformPill>
            <PlatformPill tone="green" icon="mapPin">Coventry and West Midlands</PlatformPill>
          </div>
        </div>

        <div className="home-hero-proof" aria-label="Synthetic platform metrics">
          {dashboardMetrics.map((metric) => (
            <div key={metric.id} className="home-proof-item">
              <div className="home-proof-value">{metric.value}</div>
              <div className="home-proof-label">{metric.label}</div>
              <div className="platform-muted" style={{ marginTop: 7, fontSize: 12 }}>{metric.change}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PathwaySection() {
  return (
    <PlatformSection
      id="pathways"
      eyebrow={<><Icon name="layers" size={14} /> Candidate and employer pathways</>}
      title="Two sides of one recruitment platform concept"
      description="The homepage now introduces both journeys without turning the prototype into a live service claim."
    >
      <div className="platform-grid-2">
        <PlatformCard
          title="Candidate pathway"
          icon="users"
          tone="green"
          eyebrow={<PlatformPill tone="green">Jobs and opportunity</PlatformPill>}
          footer={<Button to="/candidates" variant="outline" icon="arrowRight">For candidates</Button>}
        >
          <div className="home-pathway-list">
            {candidatePathway.map((item, index) => (
              <div key={item.title} className="home-pathway-row">
                <span className="home-pathway-index">{index + 1}</span>
                <div>
                  <h3 className="platform-card-title" style={{ fontSize: 16 }}>{item.title}</h3>
                  <p className="platform-muted" style={{ margin: "6px 0 0", lineHeight: 1.5 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </PlatformCard>

        <PlatformCard
          title="Employer staffing pathway"
          icon="building"
          tone="blue"
          eyebrow={<PlatformPill tone="blue">Trust and clarity</PlatformPill>}
          footer={<Button to="/request-staff" variant="blue" icon="arrowRight">Request staff</Button>}
        >
          <div className="home-pathway-list">
            {employerPathway.map((item, index) => (
              <div key={item.title} className="home-pathway-row">
                <span className="home-pathway-index" style={{ background: "var(--platform-blue-soft)", color: "var(--platform-blue)" }}>{index + 1}</span>
                <div>
                  <h3 className="platform-card-title" style={{ fontSize: 16 }}>{item.title}</h3>
                  <p className="platform-muted" style={{ margin: "6px 0 0", lineHeight: 1.5 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </PlatformCard>
      </div>
    </PlatformSection>
  );
}

function OpportunitiesSection() {
  return (
    <PlatformSection
      id="opportunities"
      tone="navy"
      eyebrow={<><Icon name="briefcase" size={14} /> Opportunity records</>}
      title="Featured opportunity cards from the platform model"
      description="These are synthetic concept records for testing the premium homepage layout and route pathways."
    >
      <div className="platform-grid-4">
        {platformJobs.map((job) => (
          <PlatformCard
            key={job.id}
            title={job.title}
            icon="briefcase"
            tone="green"
            eyebrow={<PlatformPill tone="green">{job.status}</PlatformPill>}
            footer={<PlatformPill tone="navy">{job.signalIds.length} match signals</PlatformPill>}
          >
            <PlatformFieldList
              items={[
                { label: "Sector", value: job.sector },
                { label: "Location", value: job.location },
                { label: "Mode", value: job.workMode },
                { label: "Band", value: job.salaryBand },
              ]}
            />
          </PlatformCard>
        ))}
      </div>
    </PlatformSection>
  );
}

function WorkflowSection() {
  return (
    <PlatformSection
      id="matching-intelligence"
      eyebrow={<><Icon name="target" size={14} /> Matching intelligence</>}
      title="A consultant-led matching workflow"
      description="The concept uses lightweight signals to support recruitment judgement, not replace it."
    >
      <div className="home-workflow">
        {workflow.map((item) => (
          <PlatformCard
            key={item.title}
            className="home-workflow-step"
            title={item.title}
            icon={item.icon}
            tone={item.tone}
            eyebrow={<PlatformPill tone={item.tone}>{item.title}</PlatformPill>}
          >
            <p className="platform-muted" style={{ margin: 0, lineHeight: 1.55 }}>{item.body}</p>
          </PlatformCard>
        ))}
      </div>

      <div className="platform-grid-3" style={{ marginTop: 22 }}>
        {matchSignals.slice(0, 3).map((signal) => (
          <PlatformCard
            key={signal.id}
            title={signal.label}
            icon="target"
            tone={signal.kind === "availability" || signal.kind === "skill" ? "green" : "blue"}
            eyebrow={<PlatformPill tone="navy">{signal.kind} - {signal.strength}%</PlatformPill>}
          >
            <p className="platform-muted" style={{ margin: 0, lineHeight: 1.55 }}>{signal.rationale}</p>
          </PlatformCard>
        ))}
      </div>
    </PlatformSection>
  );
}

function MetricsSection() {
  return (
    <PlatformSection
      id="platform-metrics"
      eyebrow={<><Icon name="chart" size={14} /> Synthetic metrics</>}
      title="Live-style platform metrics, clearly marked as concept data"
      description="The numbers support the prototype story and come from the static Phase 1 data scaffold."
    >
      <div className="platform-grid-4">
        {dashboardMetrics.map((metric) => <PlatformMetric key={metric.id} metric={metric} />)}
      </div>
    </PlatformSection>
  );
}

function RegionTrustSection() {
  return (
    <PlatformSection
      id="coventry-region"
      eyebrow={<><Icon name="mapPin" size={14} /> Coventry region trust</>}
      title="Rooted in Coventry, designed for regional recruitment clarity"
      description="The concept keeps the service grounded in candidate opportunity, employer trust and local consultant knowledge."
    >
      <div className="home-region-panel">
        <div className="home-region-map" aria-hidden="true" />
        <div className="platform-grid-2">
          <PlatformCard title="Candidate profile summary" icon="users" tone="green" eyebrow={<PlatformPill tone="green">Synthetic profiles</PlatformPill>}>
            <PlatformFieldList
              items={[
                { label: "Profiles", value: candidateProfiles.length },
                { label: "High-fit records", value: candidateProfiles.filter((candidate) => candidate.matchScore >= 85).length },
                { label: "Hybrid ready", value: candidateProfiles.filter((candidate) => candidate.workMode === "Hybrid").length },
              ]}
            />
          </PlatformCard>
          <PlatformCard title="Employer request summary" icon="building" tone="blue" eyebrow={<PlatformPill tone="blue">Synthetic briefs</PlatformPill>}>
            <PlatformFieldList
              items={[
                { label: "Requests", value: employerRequests.length },
                { label: "In shortlisting", value: employerRequests.filter((request) => request.status === "shortlisting").length },
                { label: "Urgent priority", value: employerRequests.filter((request) => request.priority === "urgent").length },
              ]}
            />
          </PlatformCard>
        </div>
      </div>
    </PlatformSection>
  );
}

function FinalSplitCTA() {
  return (
    <PlatformSection tight>
      <div className="home-cta-split">
        <PlatformCard
          title="Find work"
          icon="users"
          tone="green"
          eyebrow={<PlatformPill tone="green">Candidate journey</PlatformPill>}
          footer={<Button to="/vacancies" variant="primary" icon="arrowRight">Browse vacancies</Button>}
        >
          <p className="platform-muted" style={{ margin: 0, lineHeight: 1.6 }}>
            Explore the existing vacancy route while the v2 platform concept develops around matching and candidate readiness.
          </p>
        </PlatformCard>
        <PlatformCard
          title="Request staff"
          icon="building"
          tone="blue"
          eyebrow={<PlatformPill tone="blue">Employer journey</PlatformPill>}
          footer={<Button to="/request-staff" variant="blue" icon="arrowRight">Open request concept</Button>}
        >
          <p className="platform-muted" style={{ margin: 0, lineHeight: 1.6 }}>
            View the static employer intake concept. It does not submit live details or create production requests.
          </p>
        </PlatformCard>
      </div>
      <div style={{ marginTop: 18 }}>
        <PlatformCTA
          eyebrow="Advanced Platform v2"
          title="A recruitment homepage concept built for Phase 4 refinement"
          description="Next work can deepen interaction states, QA screenshots and page-level storytelling while keeping production integrations out of scope."
          actions={[
            { label: "View dashboard", href: "/dashboard", icon: "arrowRight" },
            { label: "Contact route", href: "/contact", icon: "arrowUpRight" },
          ]}
        />
      </div>
    </PlatformSection>
  );
}

export default function HomePage() {
  return (
    <PlatformShell>
      <HomeHero />
      <PathwaySection />
      <OpportunitiesSection />
      <WorkflowSection />
      <MetricsSection />
      <RegionTrustSection />
      <FinalSplitCTA />
    </PlatformShell>
  );
}
