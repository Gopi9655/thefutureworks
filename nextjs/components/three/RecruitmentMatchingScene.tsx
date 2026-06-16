"use client";

const fallbackNodes: { cx: number; cy: number; fill: string }[] = [
  { cx: 150, cy: 132, fill: "#5FA82A" },
  { cx: 146, cy: 298, fill: "#5FA82A" },
  { cx: 310, cy: 210, fill: "#F7F8F3" },
  { cx: 482, cy: 132, fill: "#1E6FB8" },
  { cx: 478, cy: 298, fill: "#1E6FB8" },
];

function MatchingFallback() {
  return (
    <div className="home-matching-fallback">
      <svg viewBox="0 0 620 420" role="presentation" focusable="false" aria-hidden="true">
        <defs>
          <linearGradient id="matching-path" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5FA82A" />
            <stop offset="100%" stopColor="#1E6FB8" />
          </linearGradient>
        </defs>
        <path d="M150 132 C250 120 280 190 310 210 C348 236 390 150 482 132" stroke="url(#matching-path)" strokeWidth="3" fill="none" opacity=".62" />
        <path d="M146 298 C242 292 272 226 310 210 C356 184 392 276 478 298" stroke="url(#matching-path)" strokeWidth="3" fill="none" opacity=".5" />
        <path d="M150 132 C214 204 241 244 146 298" stroke="#9ECF7D" strokeWidth="2" fill="none" opacity=".32" />
        <path d="M482 132 C410 206 392 242 478 298" stroke="#7EB0DA" strokeWidth="2" fill="none" opacity=".32" />
        {fallbackNodes.map(({ cx, cy, fill }) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r="42" fill={fill} opacity=".16" />
            <circle cx={cx} cy={cy} r="20" fill={fill} stroke="rgba(10,22,48,.12)" strokeWidth="2" />
          </g>
        ))}
      </svg>
    </div>
  );
}

export function RecruitmentMatchingScene() {
  return (
    <div className="home-matching-scene" aria-hidden="true">
      <MatchingFallback />
    </div>
  );
}

export default RecruitmentMatchingScene;
