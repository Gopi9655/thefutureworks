"use client";

import { useLayoutEffect, useEffect, useRef, useState, type CSSProperties, type ReactNode, type ElementType } from "react";
import { BrandOrb } from "./platform/BrandOrb";

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function prefersReduced(): boolean {
  return typeof window !== "undefined" && !!window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// ============================================================
// ORB — recurring brand motif.
// Phase 6B: delegates to the premium dimensional BrandOrb so every
// legacy usage (logo, trust strip, decorative marks) upgrades from
// the old flat conic sticker with no layout change.
// ============================================================
export function Orb({ size = 44, spin = false, glow = false, style = {}, className = "" }: {
  size?: number | string; spin?: boolean; glow?: boolean; style?: CSSProperties; className?: string;
}) {
  const px = typeof size === "number" ? size : undefined;
  const sizeStyle: CSSProperties = px === undefined && typeof size === "string" ? { width: size, height: size } : {};
  return (
    <BrandOrb px={px} spin={spin} glow={glow} className={className} style={{ ...sizeStyle, ...style }} />
  );
}

// ============================================================
// LOGO — wordmark + orb
// ============================================================
export function Logo({ variant = "dark", size = 22, withTagline = false }: {
  variant?: "dark" | "light"; size?: number; withTagline?: boolean;
}) {
  const main = variant === "dark" ? "#fff" : "var(--ink-900)";
  const mut = variant === "dark" ? "rgba(233,238,248,.55)" : "#8A93A8";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: size, letterSpacing: "-0.03em", color: mut }}>
          the<span style={{ fontWeight: 700, color: main }}>future</span>works
        </span>
        {withTagline && (
          <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: size * 0.42, letterSpacing: "0.02em", color: "var(--g-green)", marginTop: 4 }}>
            Jobs for your future
          </span>
        )}
      </span>
      <span className="logo-float">
        <Orb size={size * 1.18} spin />
      </span>
    </span>
  );
}

// ============================================================
// REVEAL — never leaves content hidden; no above-the-fold animation
// ============================================================
type RevealMode = "instant" | "waiting" | "animate";
export function Reveal({ children, d, as = "div", className = "", style, ...rest }: {
  children: ReactNode; d?: number; as?: ElementType; className?: string; style?: CSSProperties; [k: string]: unknown;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [mode, setMode] = useState<RevealMode>("instant");
  useIso(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced() || typeof IntersectionObserver === "undefined") return;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (r.top < vh * 0.96 && r.bottom > 0) return;
    setMode("waiting");
    let done = false;
    const mark = () => { if (!done) { done = true; setMode("animate"); io.disconnect(); clearTimeout(t); } };
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) mark(); }), {
      threshold: 0.12, rootMargin: "0px 0px -8% 0px",
    });
    io.observe(el);
    const t = setTimeout(mark, 1400);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);
  const El = as as ElementType;
  const cls = "reveal " + (mode === "waiting" ? "reveal-waiting " : "in ") + (mode === "instant" ? "reveal-instant " : "") + className;
  return (
    <El ref={ref} data-d={d} className={cls} style={style} {...rest}>
      {children}
    </El>
  );
}

// ============================================================
// COUNT-UP — animates to a figure, never stuck at 0
// ============================================================
export function CountUp({ end, dur = 1500, suffix = "", className = "", style }: {
  end: number; dur?: number; suffix?: string; className?: string; style?: CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced()) { setVal(end); return; }
    const run = () => {
      if (started.current) return;
      started.current = true;
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / dur);
        const e2 = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(end * e2));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    let io: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { run(); io?.disconnect(); } }), { threshold: 0.4 });
      io.observe(el);
    }
    const t = setTimeout(run, 1600);
    return () => { io?.disconnect(); clearTimeout(t); };
  }, [end, dur]);
  return <span ref={ref} className={className} style={style}>{val.toLocaleString()}{suffix}</span>;
}
