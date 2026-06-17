"use client";

import { Component, useEffect, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { BrandOrb, type BrandOrbTone } from "./BrandOrb";

// ============================================================
// Phase 6B / 6B.1 — ShowcaseOrb
// Renders the premium dimensional CSS BrandOrb everywhere, and can
// progressively upgrade to a Three.js scene in a single showcase.
//
// 6B.1 fix: the installed @react-three/fiber v8 is incompatible with
// the current React/three versions and throws at mount
// ("Cannot read properties of undefined (reading 'ReactCurrentBatchConfig')"),
// which crashed /jobs/[slug] in the browser. A decorative orb must
// NEVER break a route, so the WebGL path is disabled by default and the
// stable CSS BrandOrb is used instead. Even when re-enabled, the scene
// is wrapped in an error boundary that falls back to BrandOrb.
//
// Re-enable only after aligning the @react-three/fiber / three / React
// versions, by flipping ENABLE_WEBGL_ORB to true.
// ============================================================
const ENABLE_WEBGL_ORB = false;

const BrandOrbScene = dynamic(() => import("@/components/three/BrandOrbScene"), {
  ssr: false,
  loading: () => null,
});

/** Catches any render-time failure from the decorative 3D scene and
 *  shows the CSS fallback instead of letting it bubble to the route. */
class OrbErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    // Decorative only — intentionally swallow.
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function webglSupported(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return (
      typeof window !== "undefined" &&
      !!window.WebGLRenderingContext &&
      !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export interface ShowcaseOrbProps {
  px?: number;
  tone?: BrandOrbTone;
  className?: string;
  /** Expose as a labelled image; otherwise decorative (aria-hidden). */
  label?: string;
}

export function ShowcaseOrb({ px = 92, tone = "default", className, label }: ShowcaseOrbProps) {
  const [use3d, setUse3d] = useState(false);

  useEffect(() => {
    if (!ENABLE_WEBGL_ORB) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!reduced && webglSupported()) setUse3d(true);
  }, []);

  const fallback = <BrandOrb px={px} tone={tone} glow />;

  return (
    <span
      className={className}
      style={{
        position: "relative",
        display: "inline-block",
        width: px,
        height: px,
        flex: "0 0 auto",
        borderRadius: "50%",
        overflow: "hidden",
        filter: "drop-shadow(0 10px 22px rgba(10, 22, 48, 0.28))",
      }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {use3d ? (
        <OrbErrorBoundary fallback={fallback}>
          <BrandOrbScene />
        </OrbErrorBoundary>
      ) : (
        fallback
      )}
    </span>
  );
}

export default ShowcaseOrb;
