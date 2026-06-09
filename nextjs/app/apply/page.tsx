import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { GeneralApplyForm } from "@/components/forms/GeneralApplyForm";
import { PageHero } from "@/components/sections";
import { JOBS } from "@/data/jobs";

export const metadata: Metadata = {
  title: "Apply for a role",
  description: "Apply for a live thefutureworks vacancy across Coventry and the West Midlands.",
};

export default function ApplyPage() {
  return (
    <>
      <PageHero
        eyebrow={<><Icon name="send" size={14} /> Applications</>}
        title="Apply for a role"
        sub="Choose a live vacancy, share your details and our consultants will take it from there."
      />
      <section className="bg-paper section">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div className="card" style={{ padding: "clamp(24px,4vw,40px)" }}>
            <GeneralApplyForm jobs={JOBS} />
          </div>
        </div>
      </section>
    </>
  );
}
