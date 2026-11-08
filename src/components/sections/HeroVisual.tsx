import { site } from "@/content/site";
import { LogoMark } from "@/components/brand/LogoMark";
import { Parallax } from "@/components/motion/Parallax";

const C = 300; // centro del viewBox 600×600

function polar(r: number, deg: number): [number, number] {
  const a = ((deg - 90) * Math.PI) / 180;
  return [C + r * Math.cos(a), C + r * Math.sin(a)];
}
const f = (n: number) => n.toFixed(1);

function arc(r: number, from: number, to: number) {
  const [x1, y1] = polar(r, from);
  const [x2, y2] = polar(r, to);
  return `M${f(x1)} ${f(y1)} A${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${f(x2)} ${f(y2)}`;
}

function ticks(rOuter: number, step: number, major: number, len: number, lenMajor: number) {
  const out: string[] = [];
  for (let d = 0; d < 360; d += step) {
    const l = d % major === 0 ? lenMajor : len;
    const [x1, y1] = polar(rOuter, d);
    const [x2, y2] = polar(rOuter - l, d);
    out.push(`M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}`);
  }
  return out.join("");
}

function spokes(r1: number, r2: number, step: number) {
  const out: string[] = [];
  for (let d = 0; d < 360; d += step) {
    const [x1, y1] = polar(r1, d);
    const [x2, y2] = polar(r2, d);
    out.push(`M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}`);
  }
  return out.join("");
}

/** Tracce "circuito": dal bordo verso gli anelli, con curve a 45° e nodi finali. Specchiate nei 4 angoli. */
const TRACES = ["M10 128H92L132 168H186", "M44 70H116L154 108", "M12 205H60L88 233"] as const;
const NODES: Array<[number, number]> = [
  [186, 168],
  [154, 108],
  [88, 233],
];
const MIRRORS = ["", "translate(600 0) scale(-1 1)", "translate(0 600) scale(1 -1)", "translate(600 600) scale(-1 -1)"] as const;

const Svg = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <svg aria-hidden="true" viewBox="0 0 600 600" fill="none" className={className ?? "absolute inset-0 h-full w-full"}>
    {children}
  </svg>
);

/**
 * Sfondo tecnico dietro il logo (stile HUD): anelli concentrici con tacche, archi e nodi che ruotano
 * piano in direzioni opposte, raggi, tracce di circuito agli angoli. Ogni anello è un livello separato
 * ruotato via CSS transform (composited): nessun repaint continuo.
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[36rem]">
      {/* Alone */}
      <div aria-hidden="true" className="absolute -inset-[14%] rounded-full bg-[radial-gradient(circle,var(--glow-cobalt)_0%,transparent_62%)]" />

      <Parallax mode="page" rate={-0.05} className="absolute inset-0">
        {/* Base statica: cerchi sottili, raggi, circuiti */}
        <Svg>
          <g stroke="var(--color-azure-400)" strokeWidth="1">
            <circle cx={C} cy={C} r="160" strokeOpacity="0.45" strokeDasharray="1 7" />
            <circle cx={C} cy={C} r="205" strokeOpacity="0.16" />
            <circle cx={C} cy={C} r="250" strokeOpacity="0.14" />
            <circle cx={C} cy={C} r="292" strokeOpacity="0.2" />
          </g>
          <path d={spokes(166, 204, 10)} stroke="var(--color-azure-300)" strokeOpacity="0.28" strokeWidth="1" />
          <path d={spokes(206, 292, 30)} stroke="var(--color-azure-300)" strokeOpacity="0.1" strokeWidth="1" />
          {MIRRORS.map((t, i) => (
            <g key={i} transform={t || undefined}>
              {TRACES.map((d) => (
                <path key={d} d={d} stroke="var(--color-azure-400)" strokeOpacity="0.4" strokeWidth="1.5" strokeLinejoin="round" />
              ))}
              {NODES.map(([x, y]) => (
                <g key={`${x}-${y}`}>
                  <circle cx={x} cy={y} r="3.5" fill="var(--color-gold-300)" />
                  <circle cx={x} cy={y} r="8" stroke="var(--color-gold-300)" strokeOpacity="0.35" />
                </g>
              ))}
            </g>
          ))}
        </Svg>

        {/* Anello esterno: tacche + archi oro (senso orario, lento) */}
        <div className="absolute inset-0 animate-[spin_160s_linear_infinite] will-change-transform">
          <Svg>
            <path d={ticks(280, 2, 10, 5, 11)} stroke="var(--color-fg-2)" strokeOpacity="0.4" strokeWidth="1" />
            <g stroke="var(--color-gold-300)" strokeWidth="3" strokeLinecap="round">
              <path d={arc(262, 12, 68)} />
              <path d={arc(262, 142, 172)} />
              <path d={arc(262, 236, 304)} />
            </g>
            {[12, 68, 142, 236, 304].map((d) => {
              const [x, y] = polar(262, d);
              return <circle key={d} cx={f(x)} cy={f(y)} r="3.5" fill="var(--color-gold-100)" />;
            })}
          </Svg>
        </div>

        {/* Anello intermedio: azzurro (senso antiorario) */}
        <div className="absolute inset-0 animate-[spin_95s_linear_infinite_reverse] will-change-transform">
          <Svg>
            <circle cx={C} cy={C} r="228" stroke="var(--color-fg-2)" strokeOpacity="0.5" strokeDasharray="1 9" />
            <g stroke="var(--color-azure-300)" strokeWidth="2.5" strokeLinecap="round">
              <path d={arc(216, 0, 96)} />
              <path d={arc(216, 180, 226)} />
            </g>
            {[0, 96, 180, 226].map((d) => {
              const [x, y] = polar(216, d);
              return <circle key={d} cx={f(x)} cy={f(y)} r="3" fill="var(--color-azure-300)" />;
            })}
          </Svg>
        </div>

        {/* Anello interno: tratteggio + arco oro (orario, molto lento) */}
        <div className="absolute inset-0 animate-[spin_220s_linear_infinite] will-change-transform">
          <Svg>
            <circle cx={C} cy={C} r="184" stroke="var(--color-azure-glow)" strokeOpacity="0.7" strokeWidth="1.5" strokeDasharray="10 14" />
            <path d={arc(172, 300, 356)} stroke="var(--color-gold-300)" strokeWidth="2" strokeLinecap="round" />
          </Svg>
        </div>
      </Parallax>

      {/* Glow caldo dietro il logo: appare, poi pulsa (opacity/transform) */}
      <div aria-hidden="true" className="absolute inset-[24%] animate-[fade-in_1.4s_0.6s_var(--ease-soft)_both]">
        <div className="h-full w-full animate-[glow-pulse_5s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,var(--glow-gold)_0%,transparent_66%)] opacity-70" />
      </div>

      {/* Logo reale */}
      <Parallax mode="page" rate={-0.09} className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 w-[44%] -translate-x-1/2 -translate-y-1/2 sm:w-[48%]">
          <LogoMark
            alt={site.hero.symbolAlt}
            loading="eager"
            sizes="(min-width: 640px) 280px, 44vw"
            className="h-auto w-full drop-shadow-[0_18px_36px_rgb(0_0_0/0.55)]"
          />
        </div>
      </Parallax>
    </div>
  );
}
