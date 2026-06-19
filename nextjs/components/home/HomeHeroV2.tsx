"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";

/**
 * Homepage hero — "Matching engine" (one atmospheric stage)
 *
 * Translates the approved tweaked Claude Design hero into the existing
 * Next.js/React/CSS codebase. The redesign drops the bordered card-in-card
 * panel: both halves float on a single atmospheric off-white field. The left
 * carries the message + quiet brand evidence; the right is a calm recruitment
 * match atlas — candidate (green) and employer (blue) resolving through a
 * central 94% match ring to an open role.
 *
 * Depth is built without WebGL: layered glass cards on a perspective stage,
 * a soft dot-grid + grouping aura, radial glow, drawing SVG connectors and
 * gentle floating motion. Framer Motion drives the staged entrance; continuous
 * float / halo / draw live in CSS so they stay cheap and respect
 * prefers-reduced-motion. Synthetic concept data only.
 */
export function HomeHeroV2() {
  const reduce = useReducedMotion();
  const ease: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

  const copyStagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.085, delayChildren: 0.04 } },
  };
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
  };
  const cardIn = (delay: number): Variants => ({
    hidden: { opacity: 0, y: reduce ? 0 : 26, scale: reduce ? 1 : 0.96 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, delay, ease } },
  });
  const ringIn: Variants = {
    hidden: { opacity: 0, scale: reduce ? 1 : 0.82 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.15, ease } },
  };

  return (
    <div className="hh2-root">
      <div className="hh2-grid">

        {/* ─────────── LEFT — MESSAGE + EVIDENCE ─────────── */}
        <motion.div
          className="hh2-copy"
          variants={copyStagger}
          initial="hidden"
          animate="show"
        >
          <motion.span className="hh2-kick" variants={fadeUp}>
            <span className="hh2-kick-dot" aria-hidden="true" />
            Matching engine
          </motion.span>

          <motion.h1 className="hh2-title" variants={fadeUp}>
            The right match,<br />
            <span className="hh2-grad">engineered for Coventry.</span>
          </motion.h1>

          <motion.p className="hh2-sub" variants={fadeUp}>
            thefutureworks is a Coventry University-owned recruitment agency
            supporting permanent, temporary, full-time and part-time recruitment
            across Coventry, Warwickshire and the West Midlands.
          </motion.p>

          <motion.div className="hh2-actions" variants={fadeUp}>
            <Button to="/vacancies" variant="primary" size="lg" icon="arrowRight">
              Find jobs
            </Button>
            <Button to="/employers" variant="ghost-blue" size="lg" iconLeft="building">
              Hire staff
            </Button>
          </motion.div>

          {/* evidence strip — verified official statistics on a hairline baseline */}
          <motion.div className="hh2-proof" variants={fadeUp}>
            <div className="hh2-proof-row">
              <div className="hh2-proof-item">
                <span className="hh2-proof-n">8,196</span>
                <span className="hh2-proof-l">candidates registered</span>
              </div>
              <div className="hh2-proof-item">
                <span className="hh2-proof-n">2,456</span>
                <span className="hh2-proof-l">jobs posted</span>
              </div>
              <div className="hh2-proof-item">
                <span className="hh2-proof-n">953</span>
                <span className="hh2-proof-l">positions filled</span>
              </div>
              <div className="hh2-proof-item">
                <span className="hh2-proof-n">257</span>
                <span className="hh2-proof-l">companies supplied</span>
              </div>
            </div>

            <div className="hh2-marks">
              <span className="hh2-mark"><span className="hh2-mark-dot hh2-dot-g" />REC corporate member</span>
              <span className="hh2-mark-sep" aria-hidden="true" />
              <span className="hh2-mark"><span className="hh2-mark-dot hh2-dot-b" />BIOR member</span>
              <span className="hh2-mark-sep" aria-hidden="true" />
              <span className="hh2-mark"><span className="hh2-mark-dot hh2-dot-l" />70+ years experience</span>
            </div>
          </motion.div>
        </motion.div>

        {/* ─────────── RIGHT — MATCH ATLAS ─────────── */}
        <motion.div
          className="hh2-atlas"
          aria-hidden="true"
          initial="hidden"
          animate="show"
        >
          {/* grouping field: soft aura + faint dot-grid (no box) */}
          <span className="hh2-atlas-aura" />
          <span className="hh2-atlas-grid" />

          <div className="hh2-atlas-head">
            <span className="hh2-atlas-lbl">Live match</span>
            <span className="hh2-atlas-active"><span className="hh2-active-dot" />Engine active</span>
          </div>

          <div className="hh2-stagearea">
            {/* connectors — candidate → core ← employer, core → role */}
            <svg className="hh2-connectors" viewBox="0 0 600 520" preserveAspectRatio="none">
              <defs>
                <linearGradient id="hh2lnA" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#5FA82A" stopOpacity=".7" />
                  <stop offset="1" stopColor="#5FA82A" stopOpacity=".1" />
                </linearGradient>
                <linearGradient id="hh2lnB" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#1E6FB8" stopOpacity=".7" />
                  <stop offset="1" stopColor="#1E6FB8" stopOpacity=".1" />
                </linearGradient>
                <linearGradient id="hh2lnC" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#1AA39A" stopOpacity=".55" />
                  <stop offset="1" stopColor="#1AA39A" stopOpacity=".1" />
                </linearGradient>
              </defs>
              <path className="hh2-ln hh2-ln-a" d="M120 150 C 188 210, 232 232, 250 250" fill="none" stroke="url(#hh2lnA)" strokeWidth="2.5" strokeLinecap="round" />
              <path className="hh2-ln hh2-ln-b" d="M480 150 C 412 210, 368 232, 350 250" fill="none" stroke="url(#hh2lnB)" strokeWidth="2.5" strokeLinecap="round" />
              <path className="hh2-ln hh2-ln-c" d="M300 372 C 300 400, 300 412, 300 432" fill="none" stroke="url(#hh2lnC)" strokeWidth="2.5" strokeLinecap="round" />
              <circle className="hh2-ln-dot" cx="120" cy="150" r="3.5" fill="#5FA82A" />
              <circle className="hh2-ln-dot" cx="480" cy="150" r="3.5" fill="#1E6FB8" />
              <circle className="hh2-ln-dot" cx="300" cy="432" r="3.5" fill="#1AA39A" />
            </svg>

            {/* candidate node — green, top-left */}
            <div className="hh2-pos hh2-pos-cand">
              <motion.div variants={cardIn(0.1)}>
                <div className="hh2-float hh2-float-a">
                  <div className="hh2-card hh2-card-cand">
                    <div className="hh2-card-head">
                      <span className="hh2-avatar hh2-avatar-g">JO</span>
                      <div className="hh2-card-id">
                        <span className="hh2-card-name">Jordan Okafor</span>
                        <span className="hh2-card-role">Mechanical Engineer</span>
                      </div>
                      <span className="hh2-card-kicker hh2-kicker-g">Candidate</span>
                    </div>
                    <div className="hh2-tags">
                      <span className="hh2-tag hh2-tag-g">CAD</span>
                      <span className="hh2-tag hh2-tag-g">Maintenance</span>
                      <span className="hh2-tag hh2-tag-g">CV1</span>
                    </div>
                    <div className="hh2-card-status hh2-status-g">
                      <span className="hh2-status-dot hh2-dot-g" />Available now
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* employer node — blue, top-right */}
            <div className="hh2-pos hh2-pos-emp">
              <motion.div variants={cardIn(0.18)}>
                <div className="hh2-float hh2-float-b">
                  <div className="hh2-card hh2-card-emp">
                    <div className="hh2-card-head">
                      <span className="hh2-avatar hh2-avatar-b"><Icon name="building" size={17} stroke={2.1} /></span>
                      <div className="hh2-card-id">
                        <span className="hh2-card-name">Coventry Components</span>
                        <span className="hh2-card-role">Manufacturing · Coventry</span>
                      </div>
                      <span className="hh2-card-kicker hh2-kicker-b">Employer</span>
                    </div>
                    <div className="hh2-tags">
                      <span className="hh2-tag hh2-tag-b">Permanent</span>
                      <span className="hh2-tag hh2-tag-b">Full-time</span>
                      <span className="hh2-tag hh2-tag-b">On-site</span>
                    </div>
                    <div className="hh2-card-status hh2-status-b">
                      <span className="hh2-status-dot hh2-dot-b" />Hiring now
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* central match ring */}
            <div className="hh2-pos hh2-pos-ring">
              <motion.div variants={ringIn}>
                <div className="hh2-float hh2-float-ring">
                  <div className="hh2-ring">
                    <span className="hh2-ring-halo" />
                    <svg className="hh2-ring-svg" viewBox="0 0 200 200">
                      <defs>
                        <linearGradient id="hh2ring" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0" stopColor="#5FA82A" />
                          <stop offset=".5" stopColor="#1AA39A" />
                          <stop offset="1" stopColor="#1E6FB8" />
                        </linearGradient>
                      </defs>
                      <circle cx="100" cy="100" r="90" fill="none" stroke="#E9EEF7" strokeWidth="9" />
                      <circle
                        className="hh2-ring-prog"
                        cx="100" cy="100" r="90" fill="none" stroke="url(#hh2ring)"
                        strokeWidth="9" strokeLinecap="round"
                        strokeDasharray="565.5" strokeDashoffset="34"
                      />
                    </svg>
                    <div className="hh2-ring-disc">
                      <span className="hh2-ring-num">94<span className="hh2-ring-pct">%</span></span>
                      <span className="hh2-ring-lbl">Match score</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* open role node — dark, bottom-center */}
            <div className="hh2-pos hh2-pos-role">
              <motion.div variants={cardIn(0.28)}>
                <div className="hh2-float hh2-float-c">
                  <div className="hh2-role">
                    <div className="hh2-role-main">
                      <span className="hh2-role-kicker">Open role</span>
                      <span className="hh2-role-title">Maintenance Engineer</span>
                      <span className="hh2-role-meta">£38–44k · Coventry, CV1</span>
                    </div>
                    <div className="hh2-role-aside">
                      <span className="hh2-role-num">3</span>
                      <span className="hh2-role-sub">shortlisted</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default HomeHeroV2;
