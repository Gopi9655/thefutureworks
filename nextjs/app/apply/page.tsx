import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { GeneralApplyForm } from "@/components/forms/GeneralApplyForm";
import { PageHero } from "@/components/sections";
import { JOBS } from "@/data/jobs";

export const metadata: Metadata = {
  title: "Apply for a role",
  description: "Apply for a static vacancy snapshot role in the concept prototype.",
};

const STEPS: { icon: string; title: string; body: string }[] = [
  { icon: "send", title: "Share your details", body: "Pick a snapshot role and tell us how to reach you - it takes a couple of minutes." },
  { icon: "users", title: "A consultant reviews", body: "A human checks every application and sense-checks the match before anything moves." },
  { icon: "checkCircle", title: "We introduce you", body: "If it's a strong fit, we put you forward and keep you updated at each step." },
];

const REASSURANCE: string[] = [
  "Your details are only shared with the relevant employer.",
  "No automated decisions — a person reviews every application.",
  "Concept demo: the CV upload is filename-only and nothing is stored.",
];

export default function ApplyPage() {
  return (
    <>
      <PageHero
        eyebrow={<><Icon name="send" size={14} /> Applications</>}
        title="Apply for a role"
        sub="Choose a static snapshot vacancy and share your details. This prototype simulates submission and does not store real CVs."
      />
      <section className="bg-paper section">
        <div className="wrap apply-grid">
          <aside className="apply-rail">
            <h2 className="h3" style={{ marginTop: 0 }}>How it works</h2>
            <ol className="apply-steps">
              {STEPS.map((s, i) => (
                <li key={s.title} className="apply-step">
                  <span className="apply-step-ic" aria-hidden="true"><Icon name={s.icon} size={18} stroke={2} /></span>
                  <div>
                    <div className="apply-step-title"><span className="apply-step-num">{i + 1}</span> {s.title}</div>
                    <p className="t-mut" style={{ margin: "4px 0 0", fontSize: 14, lineHeight: 1.5 }}>{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="apply-reassure">
              {REASSURANCE.map((r) => (
                <div key={r} className="apply-reassure-row">
                  <Icon name="shield" size={15} stroke={2} style={{ color: "var(--g-blue)", flex: "0 0 auto", marginTop: 1 }} />
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </aside>

          <div className="card" style={{ padding: "clamp(24px,4vw,40px)" }}>
            <GeneralApplyForm jobs={JOBS} />
          </div>
        </div>
      </section>
    </>
  );
}
