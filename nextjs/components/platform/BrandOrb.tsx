"use client";

import * as React from "react";
import type { CSSProperties } from "react";

export type BrandOrbSize = "sm" | "md" | "lg" | "hero";
export type BrandOrbTone = "default" | "trust" | "opportunity" | "muted";

export interface BrandOrbProps {
  size?: BrandOrbSize;
  /** Exact pixel diameter override for legacy decorative placements. */
  px?: number;
  tone?: BrandOrbTone;
  animated?: boolean;
  interactive?: boolean;
  /** Compatibility only: legacy callers pass spin, but Phase 9A forbids continuous spin. */
  spin?: boolean;
  glow?: boolean;
  decorative?: boolean;
  label?: string;
  className?: string;
  style?: CSSProperties;
}

const uniqueId = (base: string, suffix: string) =>
  `${base.replace(/[^a-zA-Z0-9_-]/g, "")}-${suffix}`;

export function BrandOrb({
  size = "md",
  px,
  tone = "default",
  animated = false,
  interactive = false,
  glow = false,
  decorative = true,
  label = "thefutureworks",
  className,
  style,
}: BrandOrbProps): React.JSX.Element {
  const reactId = React.useId();
  const idBase = uniqueId(reactId, "tfw");
  const ids = {
    red: `${idBase}-red`,
    gold: `${idBase}-gold`,
    green: `${idBase}-green`,
    indigo: `${idBase}-indigo`,
    rim: `${idBase}-rim`,
    spec: `${idBase}-spec`,
    sweep: `${idBase}-sweep`,
    blurHi: `${idBase}-blur-hi`,
    blurMd: `${idBase}-blur-md`,
    clip: `${idBase}-clip`,
  };

  const rootClassName = [
    "tfw-orb",
    px ? "tfw-orb--custom" : `tfw-orb--${size}`,
    `tfw-orb--${tone}`,
    animated ? "tfw-orb--animated" : "",
    interactive ? "tfw-orb--interactive" : "",
    glow ? "tfw-orb--glow" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const a11y = decorative
    ? ({ "aria-hidden": true } as const)
    : ({ role: "img", "aria-label": label } as const);

  const customStyle = px
    ? ({ ["--tfw-orb-size" as string]: `${px}px`, ...style } as CSSProperties)
    : style;

  return (
    <span className={rootClassName} style={customStyle} {...a11y}>
      <span className="tfw-orb__shadow" aria-hidden="true" />
      <svg
        className="tfw-orb__svg"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
      >
        {!decorative ? <title>{label}</title> : null}

        <defs>
          <linearGradient id={ids.red} x1="16%" y1="6%" x2="92%" y2="98%">
            <stop offset="0%" style={{ stopColor: "var(--tfw-orb-red-hi)" }} />
            <stop offset="32%" style={{ stopColor: "var(--tfw-orb-red)" }} />
            <stop offset="100%" style={{ stopColor: "var(--tfw-orb-red-deep)" }} />
          </linearGradient>
          <linearGradient id={ids.gold} x1="24%" y1="8%" x2="86%" y2="96%">
            <stop offset="0%" style={{ stopColor: "var(--tfw-orb-gold-hi)" }} />
            <stop offset="44%" style={{ stopColor: "var(--tfw-orb-gold)" }} />
            <stop offset="100%" style={{ stopColor: "var(--tfw-orb-gold-deep)" }} />
          </linearGradient>
          <linearGradient id={ids.green} x1="8%" y1="10%" x2="92%" y2="96%">
            <stop offset="0%" style={{ stopColor: "var(--tfw-orb-green-hi)" }} />
            <stop offset="46%" style={{ stopColor: "var(--tfw-orb-green)" }} />
            <stop offset="100%" style={{ stopColor: "var(--tfw-orb-green-deep)" }} />
          </linearGradient>
          <linearGradient id={ids.indigo} x1="20%" y1="10%" x2="92%" y2="98%">
            <stop offset="0%" style={{ stopColor: "var(--tfw-orb-indigo-hi)" }} />
            <stop offset="44%" style={{ stopColor: "var(--tfw-orb-indigo)" }} />
            <stop offset="100%" style={{ stopColor: "var(--tfw-orb-indigo-deep)" }} />
          </linearGradient>

          <radialGradient id={ids.rim} cx="36%" cy="26%" r="80%">
            <stop offset="50%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.55" />
          </radialGradient>
          <radialGradient id={ids.spec} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#ffffff" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={ids.sweep} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <filter id={ids.blurHi} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4.5" />
          </filter>
          <filter id={ids.blurMd} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3" />
          </filter>

          <clipPath id={ids.clip}>
            <circle cx="100" cy="100" r="88" />
          </clipPath>
        </defs>

        <g clipPath={`url(#${ids.clip})`}>
          <circle cx="100" cy="100" r="88" style={{ fill: "var(--tfw-orb-core)" }} />

          <path
            className="tfw-seg tfw-seg--tl"
            fill={`url(#${ids.red})`}
            d="M108,108 Q128,52 99,12 A88,88 0 0 0 12,100 Q58,124 108,108 Z"
          />
          <path
            className="tfw-seg tfw-seg--tr"
            fill={`url(#${ids.gold})`}
            d="M108,108 Q128,52 99,12 A88,88 0 0 1 188,100 Q150,120 108,108 Z"
          />
          <path
            className="tfw-seg tfw-seg--bl"
            fill={`url(#${ids.green})`}
            d="M108,108 Q58,124 12,100 A88,88 0 0 0 100,188 Q118,152 108,108 Z"
          />
          <path
            className="tfw-seg tfw-seg--br"
            fill={`url(#${ids.indigo})`}
            d="M108,108 Q150,120 188,100 A88,88 0 0 1 100,188 Q118,152 108,108 Z"
          />

          <g className="tfw-orb__gloss">
            <ellipse
              cx="122"
              cy="68"
              rx="8"
              ry="27"
              transform="rotate(-7 122 68)"
              style={{ fill: "var(--tfw-orb-gold-streak)" }}
              opacity="0.8"
              filter={`url(#${ids.blurMd})`}
            />
            <ellipse
              cx="123"
              cy="138"
              rx="7"
              ry="23"
              transform="rotate(-5 123 138)"
              style={{ fill: "var(--tfw-orb-indigo-streak)" }}
              opacity="0.8"
              filter={`url(#${ids.blurMd})`}
            />
            <ellipse
              cx="52"
              cy="140"
              rx="20"
              ry="11"
              transform="rotate(-20 52 140)"
              style={{ fill: "var(--tfw-orb-green-streak)" }}
              opacity="0.42"
              filter={`url(#${ids.blurMd})`}
            />
            <ellipse
              cx="69"
              cy="54"
              rx="35"
              ry="21"
              transform="rotate(-22 69 54)"
              fill={`url(#${ids.spec})`}
              filter={`url(#${ids.blurHi})`}
            />
            <ellipse
              cx="61"
              cy="47"
              rx="13"
              ry="7"
              transform="rotate(-22 61 47)"
              fill="#ffffff"
              opacity="0.9"
              filter={`url(#${ids.blurHi})`}
            />
          </g>

          <g className="tfw-orb__seams">
            <path
              d="M99,12 Q128,52 108,108 Q118,152 100,188"
              fill="none"
              style={{ stroke: "var(--tfw-orb-seam)" }}
              strokeWidth="9"
              strokeLinecap="round"
            />
            <path
              d="M12,100 Q58,124 108,108 Q150,120 188,100"
              fill="none"
              style={{ stroke: "var(--tfw-orb-seam)" }}
              strokeWidth="9"
              strokeLinecap="round"
            />
            <path
              d="M99,12 Q128,52 108,108 Q118,152 100,188"
              fill="none"
              style={{ stroke: "var(--tfw-orb-seam-edge)" }}
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.55"
              transform="translate(-2,0)"
            />
          </g>

          <circle cx="100" cy="100" r="88" fill={`url(#${ids.rim})`} />

          <g className="tfw-orb__sweep">
            <rect
              x="-40"
              y="-30"
              width="46"
              height="260"
              transform="skewX(-14)"
              fill={`url(#${ids.sweep})`}
            />
          </g>
        </g>

        <circle cx="100" cy="100" r="87.5" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" />
      </svg>
    </span>
  );
}

export default BrandOrb;
