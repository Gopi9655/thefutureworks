import type { Metadata } from "next";
import "./lab.css";
import { HomeHeroConceptA } from "@/components/home/HomeHeroConceptA";
import { HomeHeroConceptB } from "@/components/home/HomeHeroConceptB";
import { HomeHeroConceptC } from "@/components/home/HomeHeroConceptC";

export const metadata: Metadata = {
  title: "Homepage Visual Lab · thefutureworks (concept)",
  description:
    "Phase 3A isolated visual lab — premium homepage hero concepts for thefutureworks Advanced Platform v2. Concept/prototype only.",
  robots: { index: false, follow: false },
};

const CONCEPTS = [
  {
    id: "concept-a",
    tag: "Concept A",
    name: "Glass matching cockpit",
    note: "Central match-engine orb with green/blue connection beams feeding floating candidate, employer and opportunity cards.",
    Hero: HomeHeroConceptA,
  },
  {
    id: "concept-b",
    tag: "Concept B",
    name: "Coventry talent network",
    note: "Regional map with Coventry as the hub, employer-demand and candidate-readiness cards, and a Coventry University Group trust strip.",
    Hero: HomeHeroConceptB,
  },
  {
    id: "concept-c",
    tag: "Concept C",
    name: "Agency command centre",
    note: "Glass dashboard with pipeline metrics, a scored candidate queue and a live employer staffing request.",
    Hero: HomeHeroConceptC,
  },
];

export default function DesignLabPage() {
  return (
    <main className="lab-page">
      <div className="lab-wrap">
        <header className="lab-pageintro">
          <span className="lab-kicker">Phase 3A · Visual lab</span>
          <h1 className="lab-pagetitle">Homepage hero concepts</h1>
          <p className="lab-pagelede">
            An isolated lab for comparing premium homepage hero directions
            before any one is applied to the real homepage. The live route{" "}
            <code>/</code> is untouched. Each concept is shown standalone in
            its own framed card. Synthetic concept data only.
          </p>
          <nav className="lab-jump" aria-label="Jump to concept">
            {CONCEPTS.map((c) => (
              <a key={c.id} href={`#${c.id}`}>
                {c.tag} · {c.name}
              </a>
            ))}
          </nav>
        </header>

        {CONCEPTS.map(({ id, tag, name, note, Hero }) => (
          <section key={id} id={id} className="lab-frame" aria-label={`${tag} — ${name}`}>
            <div className="lab-frame-bar">
              <div className="lab-frame-id">
                <span className="lab-frame-tag">{tag}</span>
                <span className="lab-frame-name">{name}</span>
              </div>
              <p className="lab-frame-note">{note}</p>
            </div>
            <div className="lab-stage">
              <Hero />
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
