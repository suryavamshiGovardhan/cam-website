/* eslint-disable react-refresh/only-export-components */
/**
 * CAM brand illustrations — hand-drawn SVGs in @cam.voyce brand colours only.
 * Colors come from CSS vars set by the .cam-art-block wrapper:
 *   --art-a (main), --art-b (accent 1), --art-c (accent 2), --art-d (ink)
 * Every animated element has data-anim; motion is transform/opacity only.
 */

const FONT = "'Plus Jakarta Sans', system-ui, sans-serif";

export function SpeechBubbles() {
  return (
    <svg viewBox="0 0 400 250" className="camva" aria-hidden="true" focusable="false">
      <g data-anim style={{ animation: "camva-pop 700ms cubic-bezier(.34,1.56,.64,1) both" }}>
        <path d="M74 96 a26 26 0 0 1 26 -26 h120 a26 26 0 0 1 26 26 v34 a26 26 0 0 1 -26 26 h-84 l-26 24 v-24 h-10 a26 26 0 0 1 -26 -26 z" fill="var(--art-a)" stroke="var(--art-d)" strokeWidth="4" />
        <text x="160" y="116" textAnchor="middle" fill="var(--art-d)" fontSize="19" fontWeight="800" fontFamily={FONT}>Doctor?</text>
      </g>
      <g data-anim style={{ animation: "camva-pop 700ms cubic-bezier(.34,1.56,.64,1) 300ms both" }}>
        <path d="M226 52 a24 24 0 0 1 24 -24 h84 a24 24 0 0 1 24 24 v32 a24 24 0 0 1 -24 24 h-6 v20 l-22 -20 h-56 a24 24 0 0 1 -24 -24 z" fill="var(--art-b)" stroke="var(--art-d)" strokeWidth="4" />
        <text x="292" y="74" textAnchor="middle" fill="var(--art-d)" fontSize="17" fontWeight="800" fontFamily={FONT}>Engineer.</text>
      </g>
      <g data-anim style={{ animation: "camva-pop 700ms cubic-bezier(.34,1.56,.64,1) 600ms both" }}>
        <path d="M60 178 a24 24 0 0 1 24 -24 h150 a24 24 0 0 1 24 24 v30 a24 24 0 0 1 -24 24 h-92 l-24 22 v-22 h-34 a24 24 0 0 1 -24 -24 z" fill="var(--art-c)" stroke="var(--art-d)" strokeWidth="4" />
        <text x="159" y="200" textAnchor="middle" fill="var(--art-d)" fontSize="17" fontWeight="800" fontFamily={FONT}>…or 2,000 others?</text>
      </g>
      <circle data-anim cx="340" cy="190" r="7" fill="var(--art-b)" style={{ animation: "camva-drift 4s ease-in-out infinite" }} />
      <circle data-anim cx="366" cy="164" r="5" fill="var(--art-a)" style={{ animation: "camva-drift 5s ease-in-out 600ms infinite" }} />
    </svg>
  );
}

export function GapCanyon() {
  return (
    <svg viewBox="0 0 400 250" className="camva" aria-hidden="true" focusable="false">
      <path data-anim d="M110 108 Q 200 44 290 118" fill="none" stroke="var(--art-d)" strokeWidth="4" strokeDasharray="10 10" style={{ animation: "camva-dash 900ms linear infinite" }} />
      <g data-anim style={{ animation: "camva-walk 3.6s ease-in-out infinite" }}>
        <circle cx="100" cy="86" r="9" fill="var(--art-d)" />
        <rect x="92" y="95" width="16" height="20" rx="7" fill="var(--art-b)" stroke="var(--art-d)" strokeWidth="3" />
      </g>
      <path d="M20 250 v-120 a30 30 0 0 1 30 -30 h100 a30 30 0 0 1 30 30 v120 z" fill="var(--art-c)" stroke="var(--art-d)" strokeWidth="4" />
      <path d="M380 250 v-74 a26 26 0 0 0 -26 -26 h-58 a26 26 0 0 0 -26 26 v74 z" fill="var(--art-a)" stroke="var(--art-d)" strokeWidth="4" />
      <text x="100" y="180" textAnchor="middle" fill="var(--art-d)" fontSize="13" fontWeight="800" fontFamily={FONT}>2,000+ jobs</text>
      <text x="325" y="215" textAnchor="middle" fill="var(--art-d)" fontSize="13" fontWeight="800" fontFamily={FONT}>the 6 you know</text>
      <circle data-anim cx="352" cy="60" r="6" fill="var(--art-b)" style={{ animation: "camva-blink 2.4s ease-in-out infinite" }} />
      <circle data-anim cx="70" cy="52" r="5" fill="var(--art-a)" style={{ animation: "camva-blink 3s ease-in-out 500ms infinite" }} />
    </svg>
  );
}

export function RippleGrid() {
  const dots = [] as React.ReactNode[];
  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 11; c++) {
      dots.push(
        <circle key={`${r}-${c}`} cx={40 + c * 32} cy={34 + r * 30} r="5.5" fill="var(--art-a)" opacity="0.85" />
      );
    }
  }
  return (
    <svg viewBox="0 0 400 250" className="camva" aria-hidden="true" focusable="false">
      <g data-anim style={{ animation: "camva-pop 600ms ease both" }}>{dots}</g>
      <circle data-anim cx="200" cy="124" r="34" fill="none" stroke="var(--art-b)" strokeWidth="5" style={{ animation: "camva-ripple 2.6s ease-out infinite" }} />
      <circle data-anim cx="200" cy="124" r="34" fill="none" stroke="var(--art-c)" strokeWidth="4" style={{ animation: "camva-ripple 2.6s ease-out 1.3s infinite" }} />
      <circle cx="200" cy="124" r="10" fill="var(--art-b)" stroke="var(--art-d)" strokeWidth="3" />
    </svg>
  );
}

export function QuestionBounce() {
  return (
    <svg viewBox="0 0 400 250" className="camva" aria-hidden="true" focusable="false">
      <g data-anim style={{ animation: "camva-bounce 1.6s ease-in-out infinite" }}>
        <circle cx="200" cy="112" r="62" fill="var(--art-b)" stroke="var(--art-d)" strokeWidth="4" />
        <text x="200" y="140" textAnchor="middle" fill="var(--art-d)" fontSize="76" fontWeight="800" fontFamily={FONT}>?</text>
      </g>
      <rect data-anim x="118" y="196" width="40" height="14" rx="7" fill="var(--art-a)" style={{ animation: "camva-blink 1.8s ease-in-out infinite" }} />
      <rect data-anim x="180" y="196" width="40" height="14" rx="7" fill="var(--art-c)" style={{ animation: "camva-blink 1.8s ease-in-out 300ms infinite" }} />
      <rect data-anim x="242" y="196" width="40" height="14" rx="7" fill="var(--art-a)" style={{ animation: "camva-blink 1.8s ease-in-out 600ms infinite" }} />
    </svg>
  );
}

export function RocketOrbit() {
  return (
    <svg viewBox="0 0 400 250" className="camva" aria-hidden="true" focusable="false">
      <ellipse cx="200" cy="128" rx="120" ry="52" fill="none" stroke="var(--art-c)" strokeWidth="4" strokeDasharray="6 10" />
      <g data-anim style={{ animation: "camva-orbit 9s linear infinite" }}>
        <g transform="translate(320 128)">
          <path d="M0 -22 C 12 -8 12 8 4 20 l-8 4 -8 -4 C -12 8 -12 -8 0 -22 z" fill="var(--art-a)" stroke="var(--art-d)" strokeWidth="4" />
          <circle cx="0" cy="-4" r="5" fill="var(--art-b)" />
          <path d="M-4 24 l4 12 4 -12 z" fill="var(--art-b)" />
        </g>
      </g>
      <circle cx="200" cy="128" r="26" fill="var(--art-b)" stroke="var(--art-d)" strokeWidth="4" />
      <circle data-anim cx="86" cy="66" r="4" fill="var(--art-a)" style={{ animation: "camva-blink 2.2s ease-in-out infinite" }} />
      <circle data-anim cx="330" cy="60" r="5" fill="var(--art-c)" style={{ animation: "camva-blink 2.8s ease-in-out 400ms infinite" }} />
      <circle data-anim cx="150" cy="210" r="4" fill="var(--art-a)" style={{ animation: "camva-blink 2.5s ease-in-out 800ms infinite" }} />
    </svg>
  );
}

export function FingerprintScan() {
  const arcs = [18, 30, 42, 54, 66].map((r, i) => (
    <circle key={r} cx="150" cy="118" r={r} fill="none" stroke="var(--art-a)" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${60 + i * 14} ${140 - i * 10}`} transform={`rotate(${-30 + i * 28} 150 118)`} />
  ));
  return (
    <svg viewBox="0 0 400 250" className="camva" aria-hidden="true" focusable="false">
      <g data-anim style={{ animation: "camva-pop 700ms ease both" }}>{arcs}</g>
      <g data-anim style={{ animation: "camva-sweep 3.4s ease-in-out infinite" }}>
        <circle cx="268" cy="110" r="40" fill="none" stroke="var(--art-d)" strokeWidth="8" />
        <circle cx="268" cy="110" r="32" fill="var(--art-b)" opacity="0.35" />
        <line x1="296" y1="140" x2="330" y2="176" stroke="var(--art-d)" strokeWidth="10" strokeLinecap="round" />
      </g>
      <rect data-anim x="118" y="208" width="164" height="10" rx="5" fill="var(--art-c)" style={{ animation: "camva-blink 2.4s ease-in-out infinite" }} />
    </svg>
  );
}

export function CalendarTick() {
  const cells = Array.from({ length: 12 }, (_, i) => (
    <g key={i} data-anim style={{ animation: `camva-tick 5s ease ${i * 380}ms infinite` }}>
      <rect x={86 + (i % 4) * 58} y={108 + Math.floor(i / 4) * 46} width="40" height="34" rx="8" fill="var(--art-a)" stroke="var(--art-d)" strokeWidth="3" />
      <path d={`M${96 + (i % 4) * 58} ${124 + Math.floor(i / 4) * 46} l8 9 14 -16`} fill="none" stroke="var(--art-d)" strokeWidth="4" strokeLinecap="round" />
    </g>
  ));
  return (
    <svg viewBox="0 0 400 250" className="camva" aria-hidden="true" focusable="false">
      <rect x="52" y="42" width="296" height="180" rx="18" fill="var(--art-b)" stroke="var(--art-d)" strokeWidth="4" />
      <rect x="52" y="42" width="296" height="44" rx="18" fill="var(--art-d)" />
      <circle cx="82" cy="64" r="8" fill="var(--art-a)" />
      <circle cx="106" cy="64" r="8" fill="var(--art-c)" />
      {cells}
    </svg>
  );
}

export function DnaHelix() {
  const rungs = Array.from({ length: 7 }, (_, i) => {
    const x = 90 + i * 34;
    const y = 60 + i * 20;
    const w = i % 2 ? 46 : 30;
    return (
      <g key={i} data-anim style={{ animation: `camva-drift 3.6s ease-in-out ${i * 240}ms infinite` }}>
        <line x1={x} y1={y} x2={x + w} y2={y + 26} stroke="var(--art-a)" strokeWidth="5" strokeLinecap="round" />
        <circle cx={x} cy={y} r="7" fill="var(--art-b)" />
        <circle cx={x + w} cy={y + 26} r="7" fill="var(--art-c)" />
      </g>
    );
  });
  return (
    <svg viewBox="0 0 400 250" className="camva" aria-hidden="true" focusable="false">
      <path d="M80 46 Q 180 100 280 46 Q 340 20 372 60" fill="none" stroke="var(--art-a)" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
      <path d="M80 138 Q 180 84 280 138 Q 340 164 372 124" fill="none" stroke="var(--art-a)" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
      {rungs}
      <circle data-anim cx="330" cy="196" r="10" fill="var(--art-b)" style={{ animation: "camva-drift 4.2s ease-in-out infinite" }} />
      <circle data-anim cx="62" cy="196" r="8" fill="var(--art-c)" style={{ animation: "camva-drift 5s ease-in-out 600ms infinite" }} />
      <circle data-anim cx="356" cy="160" r="6" fill="var(--art-a)" style={{ animation: "camva-drift 4.6s ease-in-out 300ms infinite" }} />
    </svg>
  );
}

export function EqualizerBars() {
  const bars = Array.from({ length: 9 }, (_, i) => (
    <rect
      key={i}
      data-anim
      x={62 + i * 32}
      y={90}
      width="18"
      height="90"
      rx="8"
      fill={i % 3 === 1 ? "var(--art-b)" : "var(--art-a)"}
      stroke="var(--art-d)"
      strokeWidth="3"
      style={{ transformOrigin: "50% 100%", animation: `camva-eq ${900 + (i % 4) * 260}ms ease-in-out ${i * 120}ms infinite` }}
    />
  ));
  return (
    <svg viewBox="0 0 400 250" className="camva" aria-hidden="true" focusable="false">
      <rect x="30" y="60" width="340" height="150" rx="18" fill="none" stroke="var(--art-d)" strokeWidth="4" />
      {bars}
      <path data-anim d="M30 42 q 20 -18 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0" fill="none" stroke="var(--art-c)" strokeWidth="5" strokeLinecap="round" style={{ animation: "camva-sweep 2.8s ease-in-out infinite" }} />
    </svg>
  );
}

export function PixelJump() {
  return (
    <svg viewBox="0 0 400 250" className="camva" aria-hidden="true" focusable="false">
      <rect x="30" y="196" width="340" height="14" fill="var(--art-d)" />
      <g data-anim style={{ animation: "camva-jump 1.8s cubic-bezier(.34,0,.64,1) infinite" }}>
        <rect x="130" y="132" width="44" height="44" fill="var(--art-a)" stroke="var(--art-d)" strokeWidth="4" />
        <rect x="142" y="144" width="8" height="8" fill="var(--art-d)" />
        <rect x="162" y="144" width="8" height="8" fill="var(--art-d)" />
        <rect x="140" y="164" width="24" height="6" fill="var(--art-b)" />
        <rect x="120" y="176" width="12" height="12" fill="var(--art-b)" />
        <rect x="172" y="176" width="12" height="12" fill="var(--art-b)" />
      </g>
      <rect x="252" y="168" width="22" height="28" fill="var(--art-c)" stroke="var(--art-d)" strokeWidth="4" />
      <rect data-anim x="300" y="176" width="22" height="20" fill="var(--art-a)" style={{ animation: "camva-blink 1.6s ease-in-out infinite" }} />
      <rect data-anim x="70" y="176" width="22" height="20" fill="var(--art-b)" style={{ animation: "camva-blink 2s ease-in-out 400ms infinite" }} />
      <text x="200" y="70" textAnchor="middle" fill="var(--art-d)" fontSize="20" fontWeight="800" fontFamily={FONT}>+10</text>
    </svg>
  );
}

export function CircuitNodes() {
  const nodes2 = [
    { x: 70, y: 70 }, { x: 200, y: 46 }, { x: 330, y: 84 }, { x: 110, y: 170 }, { x: 250, y: 150 },
  ];
  const nodes = [
    { x: 70, y: 70, d: 0 }, { x: 200, y: 46, d: 300 }, { x: 330, y: 84, d: 600 },
    { x: 110, y: 170, d: 900 }, { x: 250, y: 150, d: 1200 }, { x: 340, y: 196, d: 1500 },
  ].map((n, i) => (
    <g key={i} data-anim style={{ animation: `camva-blink 2.8s ease-in-out ${n.d}ms infinite` }}>
      <line x1={i === 0 ? 70 : nodes2[i - 1].x} y1={i === 0 ? 70 : nodes2[i - 1].y} x2={n.x} y2={n.y} stroke="var(--art-c)" strokeWidth="4" strokeDasharray="7 8" />
      <circle cx={n.x} cy={n.y} r="13" fill={i % 2 ? "var(--art-b)" : "var(--art-a)"} stroke="var(--art-d)" strokeWidth="3.5" />
      <circle cx={n.x} cy={n.y} r="4.5" fill="var(--art-d)" />
    </g>
  ));
  return (
    <svg viewBox="0 0 400 250" className="camva" aria-hidden="true" focusable="false">
      {nodes}
      <g data-anim style={{ transformOrigin: "200px 230px", animation: "camva-arm 3s ease-in-out infinite" }}>
        <rect x="188" y="206" width="24" height="30" rx="6" fill="var(--art-b)" stroke="var(--art-d)" strokeWidth="3.5" />
        <rect x="196" y="176" width="10" height="34" rx="5" fill="var(--art-a)" stroke="var(--art-d)" strokeWidth="3.5" />
        <circle cx="201" cy="170" r="8" fill="var(--art-c)" stroke="var(--art-d)" strokeWidth="3.5" />
      </g>
    </svg>
  );
}

export function TurbineLeaf() {
  return (
    <svg viewBox="0 0 400 250" className="camva" aria-hidden="true" focusable="false">
      <g data-anim style={{ animation: "camva-spin 8s linear infinite" }}>
        <g transform="translate(140 120)">
          <ellipse cx="0" cy="-38" rx="12" ry="30" fill="var(--art-a)" stroke="var(--art-d)" strokeWidth="3.5" />
          <ellipse cx="33" cy="19" rx="12" ry="30" fill="var(--art-b)" stroke="var(--art-d)" strokeWidth="3.5" transform="rotate(120)" />
          <ellipse cx="-33" cy="19" rx="12" ry="30" fill="var(--art-c)" stroke="var(--art-d)" strokeWidth="3.5" transform="rotate(-120)" />
          <circle r="10" fill="var(--art-d)" />
        </g>
      </g>
      <rect x="132" y="150" width="16" height="64" fill="var(--art-d)" />
      <g data-anim style={{ transformOrigin: "300px 214px", animation: "camva-grow 3s ease-in-out infinite" }}>
        <path d="M300 214 q -6 -52 34 -70 q 6 52 -34 70 z" fill="var(--art-b)" stroke="var(--art-d)" strokeWidth="4" />
        <line x1="300" y1="214" x2="328" y2="152" stroke="var(--art-d)" strokeWidth="3.5" />
      </g>
      <rect x="30" y="214" width="340" height="10" rx="5" fill="var(--art-c)" />
    </svg>
  );
}

export type ArtName =
  | "speech-bubbles" | "gap-canyon" | "ripple-grid" | "question-bounce"
  | "rocket-orbit" | "fingerprint-scan" | "calendar-tick" | "dna-helix"
  | "equalizer-bars" | "pixel-jump" | "circuit-nodes" | "turbine-leaf";

export const ARTWORKS: Record<ArtName, () => React.JSX.Element> = {
  "speech-bubbles": SpeechBubbles,
  "gap-canyon": GapCanyon,
  "ripple-grid": RippleGrid,
  "question-bounce": QuestionBounce,
  "rocket-orbit": RocketOrbit,
  "fingerprint-scan": FingerprintScan,
  "calendar-tick": CalendarTick,
  "dna-helix": DnaHelix,
  "equalizer-bars": EqualizerBars,
  "pixel-jump": PixelJump,
  "circuit-nodes": CircuitNodes,
  "turbine-leaf": TurbineLeaf,
};
