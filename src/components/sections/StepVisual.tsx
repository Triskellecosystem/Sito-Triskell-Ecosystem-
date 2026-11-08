/** Illustrazioni SVG per i 4 step del metodo. Solo token di colore, nessun asset esterno. */
export function StepVisual({ step }: { step: number }) {
  const common = { viewBox: "0 0 320 200", fill: "none", "aria-hidden": true, className: "h-full w-full" } as const;

  switch (step) {
    case 0: // Analisi: grafico + lente
      return (
        <svg {...common}>
          <g stroke="var(--color-line-strong)" strokeWidth="1">
            {[40, 80, 120, 160].map((y) => (
              <line key={y} x1="24" x2="296" y1={y} y2={y} />
            ))}
          </g>
          {[
            [44, 110, 50],
            [92, 84, 76],
            [140, 120, 40],
            [188, 60, 100],
            [236, 96, 64],
          ].map(([x, y, h], i) => (
            <rect key={i} x={x} y={y} width="28" height={h} rx="5" fill="var(--color-cobalt-500)" opacity={0.45 + i * 0.1} />
          ))}
          <circle cx="206" cy="92" r="40" stroke="var(--color-gold-300)" strokeWidth="5" fill="rgb(247 200 92 / 0.06)" />
          <line x1="236" y1="122" x2="272" y2="158" stroke="var(--color-gold-300)" strokeWidth="8" strokeLinecap="round" />
        </svg>
      );
    case 1: // Strategia: mappa di nodi
      return (
        <svg {...common}>
          <path d="M44 150 C 90 150, 100 60, 150 60 S 220 140, 272 52" stroke="var(--color-azure-400)" strokeWidth="2" strokeDasharray="5 6" />
          {[
            [44, 150, "var(--color-cobalt-400)"],
            [150, 60, "var(--color-azure-400)"],
            [210, 128, "var(--color-cobalt-400)"],
            [272, 52, "var(--color-gold-300)"],
          ].map(([x, y, c], i) => (
            <g key={i}>
              <circle cx={x as number} cy={y as number} r="16" fill="var(--color-night-raised)" stroke={c as string} strokeWidth="3" />
              <circle cx={x as number} cy={y as number} r="5" fill={c as string} />
            </g>
          ))}
          <rect x="120" y="150" width="70" height="8" rx="4" fill="var(--color-line-strong)" />
          <rect x="120" y="166" width="46" height="8" rx="4" fill="var(--color-line)" />
        </svg>
      );
    case 2: // Produzione: fotogrammi + timeline
      return (
        <svg {...common}>
          {[
            [28, 30, "var(--color-cobalt-600)"],
            [120, 22, "var(--color-cobalt-500)"],
            [212, 30, "var(--color-gold-600)"],
          ].map(([x, y, c], i) => (
            <g key={i}>
              <rect x={x as number} y={y as number} width="80" height="96" rx="10" fill={c as string} opacity="0.5" stroke="var(--color-line-strong)" />
              <path d={`M${(x as number) + 32} ${(y as number) + 36} l20 12 -20 12z`} fill="var(--color-fg)" opacity="0.85" />
            </g>
          ))}
          <rect x="28" y="152" width="264" height="8" rx="4" fill="var(--color-line)" />
          <rect x="28" y="152" width="170" height="8" rx="4" fill="var(--color-gold-300)" />
          <circle cx="198" cy="156" r="9" fill="var(--color-gold-200)" />
        </svg>
      );
    default: // Risultati: crescita
      return (
        <svg {...common}>
          <g stroke="var(--color-line-strong)" strokeWidth="1">
            {[40, 80, 120, 160].map((y) => (
              <line key={y} x1="24" x2="296" y1={y} y2={y} />
            ))}
          </g>
          <path d="M28 160 L90 132 L148 140 L206 84 L292 34" stroke="var(--color-gold-300)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M28 160 L90 132 L148 140 L206 84 L292 34 L292 170 L28 170Z" fill="url(#grow)" opacity="0.35" />
          <defs>
            <linearGradient id="grow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--color-gold-300)" />
              <stop offset="1" stopColor="var(--color-gold-300)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[
            [90, 132],
            [148, 140],
            [206, 84],
          ].map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r="6" fill="var(--color-night)" stroke="var(--color-gold-200)" strokeWidth="3" />
          ))}
          <circle cx="292" cy="34" r="9" fill="var(--color-gold-100)" />
        </svg>
      );
  }
}
