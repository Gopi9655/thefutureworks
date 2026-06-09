"use client";

import { useLayoutEffect, useEffect, useRef, useState, type CSSProperties, type ReactNode, type ElementType } from "react";

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function prefersReduced(): boolean {
  return typeof window !== "undefined" && !!window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// ============================================================
// ORB — recurring globe brand motif
// ============================================================
export function Orb({ size = 44, spin = false, glow = false, style = {}, className = "" }: {
  size?: number | string; spin?: boolean; glow?: boolean; style?: CSSProperties; className?: string;
}) {
  const s = typeof size === "number" ? size + "px" : size;
  return (
    <span
      className={"orb " + (spin ? "spin-slow " : "") + className}
      style={{
        width: s, height: s, display: "inline-block", position: "relative", borderRadius: "50%",
        background:
          "conic-gradient(from 200deg, var(--g-green), var(--g-lime) 14%, var(--g-orange) 32%, var(--g-red) 52%, var(--g-teal) 72%, var(--g-blue) 86%, var(--g-green))",
        boxShadow:
          "inset -6px -7px 16px rgba(0,0,0,.45), inset 5px 5px 12px rgba(255,255,255,.25)" +
          (glow ? ", 0 0 36px -2px var(--cand-glow)" : ""),
        ...style,
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.4 }}>
        <ellipse cx="50" cy="50" rx="48" ry="22" fill="none" stroke="rgba(0,0,0,.5)" strokeWidth="1" />
        <ellipse cx="50" cy="50" rx="22" ry="48" fill="none" stroke="rgba(0,0,0,.5)" strokeWidth="1" />
        <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(0,0,0,.35)" strokeWidth="1" />
      </svg>
    </span>
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
