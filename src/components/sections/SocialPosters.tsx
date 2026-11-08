import { cn } from "@/lib/cn";

/**
 * Sei grafiche da profilo Instagram di una palestra, disegnate in SVG con la stessa palette
 * (blu notte, oro, azzurro) e lo stesso schema: titolo grande, illustrazione, piccola etichetta.
 */
export type PosterKind = "open" | "hiit" | "prova" | "trasf" | "orari" | "team";

const BG: Record<PosterKind, string> = {
  open: "bg-[linear-gradient(150deg,var(--color-gold-600),var(--color-cobalt-800)_80%)]",
  hiit: "bg-[linear-gradient(150deg,var(--color-azure-glow),var(--color-cobalt-900)_85%)]",
  prova: "bg-[linear-gradient(150deg,var(--color-gold-500),var(--color-cobalt-700)_85%)]",
  trasf: "bg-[linear-gradient(150deg,var(--color-cobalt-500),var(--color-night-deep)_90%)]",
  orari: "bg-[linear-gradient(150deg,var(--color-azure-400),var(--color-cobalt-800)_85%)]",
  team: "bg-[linear-gradient(150deg,var(--color-gold-700),var(--color-cobalt-900)_85%)]",
};

const G = "var(--color-gold-200)";
const A = "var(--color-azure-300)";
const W = "var(--color-fg)";

function Art({ kind }: { kind: PosterKind }) {
  switch (kind) {
    case "open":
      return (
        <g>
          <g transform="rotate(-24 70 62)" fill={W}>
            <rect x="40" y="58" width="60" height="7" rx="3" />
            <rect x="34" y="48" width="9" height="27" rx="3" fill={G} />
            <rect x="97" y="48" width="9" height="27" rx="3" fill={G} />
            <rect x="26" y="53" width="8" height="17" rx="3" />
            <rect x="106" y="53" width="8" height="17" rx="3" />
          </g>
          <circle cx="24" cy="26" r="13" fill="none" stroke={G} strokeWidth="2.5" />
          <path d="M18 26l4 4 8-9" fill="none" stroke={G} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );
    case "hiit":
      return (
        <g>
          <path d="M78 12L46 64h22l-8 40 40-56H78z" fill={G} />
          <path d="M20 90q14-18 28 0t28 0" fill="none" stroke={A} strokeWidth="3" strokeLinecap="round" />
        </g>
      );
    case "prova":
      return (
        <g>
          <path d="M18 52h104v18a9 9 0 0 0 0 18v18H18V88a9 9 0 0 0 0-18z" fill={G} transform="translate(0 -14)" />
          <path d="M92 40v56" stroke="var(--color-cobalt-800)" strokeWidth="2.5" strokeDasharray="5 5" />
          <path d="M42 62l6 6 12-14" fill="none" stroke="var(--color-cobalt-800)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );
    case "trasf":
      return (
        <g>
          <rect x="16" y="58" width="42" height="48" rx="5" fill="none" stroke={A} strokeWidth="2" opacity=".7" />
          <rect x="82" y="30" width="42" height="76" rx="5" fill={G} opacity=".95" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={22 + i * 11} y={96 - (i + 1) * 8} width="7" height={(i + 1) * 8 + 4} rx="2" fill={A} />
          ))}
          <path d="M60 82h18m-7-8l8 8-8 8" fill="none" stroke={W} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );
    case "orari":
      return (
        <g>
          <circle cx="70" cy="64" r="38" fill="none" stroke={W} strokeWidth="4" />
          <circle cx="70" cy="64" r="3.5" fill={G} />
          <path d="M70 64V40M70 64l16 10" stroke={G} strokeWidth="5" strokeLinecap="round" />
          {Array.from({ length: 12 }, (_, i) => (
            <path key={i} d={`M70 ${28}v${i % 3 === 0 ? 7 : 4}`} stroke={A} strokeWidth="2.4" strokeLinecap="round" transform={`rotate(${i * 30} 70 64)`} />
          ))}
        </g>
      );
    case "team":
      return (
        <g>
          {[28, 70, 112].map((x, i) => (
            <g key={x}>
              <circle cx={x} cy={i === 1 ? 52 : 62} r={i === 1 ? 16 : 13} fill={i === 1 ? G : W} />
              <path d={`M${x - (i === 1 ? 26 : 22)} ${i === 1 ? 108 : 112}q${i === 1 ? 26 : 22} -${i === 1 ? 40 : 34} ${i === 1 ? 52 : 44} 0z`} fill={i === 1 ? G : A} opacity={i === 1 ? 1 : 0.85} />
            </g>
          ))}
        </g>
      );
  }
}

const TITLE: Record<PosterKind, [string, string]> = {
  open: ["OPEN", "DAY"],
  hiit: ["HIIT", "45'"],
  prova: ["PROVA", "GRATIS"],
  trasf: ["PRIMA", "DOPO"],
  orari: ["NUOVI", "ORARI"],
  team: ["IL", "TEAM"],
};

export function Poster({ kind, className }: { kind: PosterKind; className?: string }) {
  const [a, b] = TITLE[kind];
  return (
    <div className={cn("relative aspect-square overflow-hidden", BG[kind], className)}>
      <span aria-hidden="true" className="bg-grid absolute inset-0 opacity-25" />
      <svg viewBox="0 0 140 140" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <Art kind={kind} />
      </svg>
      <span className="absolute left-1.5 top-1.5 flex flex-col font-display text-[0.8125rem] font-extrabold uppercase leading-[1.08] tracking-tight text-fg drop-shadow">
        <span>{a}</span>
        <span className="text-gold-200">{b}</span>
      </span>
    </div>
  );
}

/** Logo della palestra, usato come foto profilo. */
export function GymLogo() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="gl-bg" cx="50%" cy="30%" r="80%">
          <stop offset="0" stopColor="var(--color-cobalt-500)" />
          <stop offset="1" stopColor="var(--color-night-deep)" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="url(#gl-bg)" />
      <circle cx="50" cy="50" r="41" fill="none" stroke="var(--color-gold-300)" strokeWidth="2" />
      <g fill="var(--color-gold-200)">
        <rect x="24" y="31" width="7" height="22" rx="2" />
        <rect x="69" y="31" width="7" height="22" rx="2" />
        <rect x="19" y="36" width="6" height="12" rx="2" />
        <rect x="75" y="36" width="6" height="12" rx="2" />
        <rect x="31" y="40" width="38" height="5" rx="2" />
      </g>
      <text x="50" y="72" textAnchor="middle" fontFamily="var(--font-display), sans-serif" fontWeight="800" fontSize="15" fill="var(--color-fg)" letterSpacing="1">
        PE
      </text>
      <text x="50" y="82" textAnchor="middle" fontFamily="var(--font-display), sans-serif" fontWeight="700" fontSize="5.4" fill="var(--color-azure-300)" letterSpacing="2.4">
        PALESTRA
      </text>
    </svg>
  );
}
