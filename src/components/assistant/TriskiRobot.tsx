import { cn } from "@/lib/cn";

/**
 * Triskiello: un piccolo robot simpatico, disegnato in SVG con i colori del brand (blu notte, azzurro, oro).
 * Occhi grandi che sbattono le palpebre, antenna che pulsa, sorriso. Solo transform/opacity in CSS.
 */
export function TriskiRobot({ className, talking }: { className?: string; talking?: boolean }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className={cn("triski", talking && "triski--talk", className)}>
      <defs>
        <linearGradient id="tr-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3aa4d4" />
          <stop offset="1" stopColor="#0b5a8d" />
        </linearGradient>
        <linearGradient id="tr-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fdda5a" />
          <stop offset="1" stopColor="#c98a10" />
        </linearGradient>
        <radialGradient id="tr-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ffd86b" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffd86b" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* antenna */}
      <line x1="60" y1="22" x2="60" y2="11" stroke="#9fd8f3" strokeWidth="3" strokeLinecap="round" />
      <circle className="triski-bulb" cx="60" cy="8" r="9" fill="url(#tr-glow)" />
      <circle cx="60" cy="8" r="4.5" fill="url(#tr-gold)" />
      {/* orecchie / cuffie */}
      <rect x="8" y="48" width="11" height="26" rx="5.5" fill="url(#tr-gold)" />
      <rect x="101" y="48" width="11" height="26" rx="5.5" fill="url(#tr-gold)" />
      {/* corpo */}
      <path d="M36 98c0-8 6-13 24-13s24 5 24 13v8a8 8 0 0 1-8 8H44a8 8 0 0 1-8-8z" fill="#0d3e66" stroke="#3aa4d4" strokeWidth="2" />
      <circle cx="60" cy="100" r="4" fill="url(#tr-gold)" />
      {/* testa */}
      <rect x="16" y="22" width="88" height="68" rx="30" fill="url(#tr-face)" stroke="#bfeaff" strokeWidth="2.5" />
      <rect x="26" y="34" width="68" height="44" rx="22" fill="#05213a" />
      <ellipse cx="48" cy="36" rx="18" ry="5" fill="#fff" opacity="0.16" />
      {/* occhi */}
      <g className="triski-eyes">
        <ellipse cx="46" cy="55" rx="8" ry="10" fill="#e9f8ff" />
        <ellipse cx="74" cy="55" rx="8" ry="10" fill="#e9f8ff" />
        <circle cx="48" cy="57" r="4.4" fill="#06263a" />
        <circle cx="76" cy="57" r="4.4" fill="#06263a" />
        <circle cx="49.6" cy="54.6" r="1.5" fill="#fff" />
        <circle cx="77.6" cy="54.6" r="1.5" fill="#fff" />
      </g>
      {/* guance e sorriso */}
      <circle cx="35" cy="68" r="4" fill="#ff9a8a" opacity="0.55" />
      <circle cx="85" cy="68" r="4" fill="#ff9a8a" opacity="0.55" />
      <path className="triski-mouth" d="M52 68q8 7 16 0" fill="none" stroke="#fdda5a" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
