import { useId } from "react";
import { ARM_PATH } from "./triskell-path";

/**
 * Medaglione 3D del simbolo (hero): anello oro metallico, fondo blu notte,
 * triskell che si disegna. Il glow pulsante è un layer CSS (HeroVisual), non un filtro SVG.
 */
export function HeroSymbol({ label }: { label: string }) {
  const uid = useId().replace(/:/g, "");
  const metal = `metal-${uid}`;
  const fill = `fill-${uid}`;
  const arm = `arm-${uid}`;
  const rotations = [0, 120, 240];

  return (
    <svg viewBox="0 0 400 400" role="img" aria-label={label} className="h-full w-full overflow-visible">
      <defs>
        <linearGradient id={metal} x1="40" y1="30" x2="360" y2="370" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--color-gold-100)" />
          <stop offset="0.25" stopColor="var(--color-gold-200)" />
          <stop offset="0.55" stopColor="var(--color-gold-500)" />
          <stop offset="0.8" stopColor="var(--color-gold-600)" />
          <stop offset="1" stopColor="var(--color-gold-800)" />
        </linearGradient>
        <radialGradient id={fill} cx="50%" cy="38%" r="70%">
          <stop offset="0" stopColor="var(--color-cobalt-400)" />
          <stop offset="0.45" stopColor="var(--color-cobalt-700)" />
          <stop offset="1" stopColor="var(--color-cobalt-900)" />
        </radialGradient>
        {/* coordinate nello spazio 100×100 del gruppo scalato */}
        <linearGradient id={arm} x1="18" y1="6" x2="82" y2="94" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--color-gold-200)" />
          <stop offset="0.38" stopColor="var(--color-gold-400)" />
          <stop offset="0.7" stopColor="var(--color-gold-500)" />
          <stop offset="1" stopColor="var(--color-gold-700)" />
        </linearGradient>
      </defs>

      {/* anello luminoso esterno (azure) */}
      <circle cx="200" cy="200" r="190" stroke="var(--color-azure-glow)" strokeOpacity="0.55" strokeWidth="2" fill="none" />
      <circle cx="200" cy="200" r="182" stroke="var(--color-azure-400)" strokeOpacity="0.18" strokeWidth="1" fill="none" />

      {/* anello oro metallico */}
      <circle cx="200" cy="200" r="168" fill="none" stroke={`url(#${metal})`} strokeWidth="11" />
      <circle cx="200" cy="200" r="160" fill="none" stroke="var(--color-gold-800)" strokeOpacity="0.7" strokeWidth="1.5" />

      {/* medaglione */}
      <circle cx="200" cy="200" r="154" fill={`url(#${fill})`} />
      <circle cx="200" cy="200" r="142" fill="none" stroke="var(--color-cobalt-300)" strokeOpacity="0.28" strokeWidth="1" strokeDasharray="2 7" />
      <path d="M62 170 A142 142 0 0 1 200 58" fill="none" stroke="var(--color-fg)" strokeOpacity="0.2" strokeWidth="2" strokeLinecap="round" />

      {/* triskell */}
      <g
        transform="translate(200 200) scale(2.55) translate(-50 -50)"
        stroke={`url(#${arm})`}
        strokeWidth="4.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {rotations.map((deg, i) => (
          <path
            key={deg}
            d={ARM_PATH}
            transform={deg ? `rotate(${deg} 50 50)` : undefined}
            pathLength={1}
            className="draw-path"
            style={{ "--draw-delay": `${0.5 + i * 0.3}s`, "--draw-dur": "2s" } as React.CSSProperties}
          />
        ))}
      </g>
    </svg>
  );
}
