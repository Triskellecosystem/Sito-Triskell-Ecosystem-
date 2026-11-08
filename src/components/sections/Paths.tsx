import { site, type Path } from "@/content/site";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { CountUp } from "@/components/motion/CountUp";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { formatNumber } from "@/lib/format";

type CSSVars = React.CSSProperties & { [key: `--${string}`]: string | number };
const BARS = [22, 30, 27, 41, 52, 48, 66, 84, 100];

/** Una colonna di impatto: pochi punti decisivi in cascata, con numeri che compaiono e crescono. */
function ImpactColumn({ path, tone }: { path: Path; tone: "gold" | "azure" }) {
  const gold = tone === "gold";
  const { impact } = path;
  const accent = gold ? "text-gold-300" : "text-azure-300";
  const border = gold ? "border-gold-400/45" : "border-azure-400/45";

  return (
    <div
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-card border bg-[linear-gradient(170deg,var(--color-surface)_0%,var(--color-night-raised)_100%)] p-6 sm:p-8",
        gold ? "border-gold-400/35" : "border-azure-400/30",
      )}
    >
      <div aria-hidden="true" className={cn("absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent to-transparent", gold ? "via-gold-300/80" : "via-azure-300/80")} />
      <h3 className={cn("font-display text-[clamp(2.25rem,1.8rem+2vw,3.25rem)] font-bold leading-none tracking-[-0.045em]", gold ? "text-gold" : "text-azure-300")}>{path.name}</h3>
      <p className="mt-2.5 text-[1.0625rem] font-semibold leading-snug tracking-tight text-fg">{path.tagline}</p>

      {/* catena di effetti: ogni riga si accende dopo la precedente */}
      <ol className="relative mt-7">
        {impact.points.map((pt, i) => (
          <li key={pt.title} style={{ "--i": i } as CSSVars} className="impact-row relative flex items-center gap-4 pb-6 last:pb-0">
            {/* collegamento verso il basso */}
            <span aria-hidden="true" className={cn("impact-link absolute left-[1.5rem] top-[3.25rem] h-[calc(100%-3rem)] w-px -translate-x-1/2 bg-gradient-to-b", gold ? "from-gold-300/80 to-gold-300/10" : "from-azure-300/80 to-azure-300/10")} />
            <span className={cn("impact-dot relative z-[1] grid h-12 w-12 shrink-0 place-items-center rounded-full border bg-night", border, accent)}>
              <Icon name={pt.icon} className="h-5 w-5" strokeWidth={1.7} />
            </span>
            <div className="min-w-0 flex-1">
              <h4 className="font-display text-[1.125rem] font-semibold tracking-tight text-fg">{pt.title}</h4>
              <p className="mt-0.5 text-[0.9375rem] leading-snug text-fg-2">{pt.text}</p>
            </div>
            {pt.stat && (
              <p className="shrink-0 text-right">
                {pt.stat.still ? (
                  <span className={cn("block font-display text-[clamp(1.5rem,1.2rem+1.1vw,2.125rem)] font-bold leading-none tracking-[-0.04em]", accent)}>
                    {pt.stat.prefix}
                    {formatNumber(pt.stat.value, 0)}
                  </span>
                ) : (
                  <CountUp {...pt.stat} className={cn("block font-display text-[clamp(1.5rem,1.2rem+1.1vw,2.125rem)] font-bold leading-none tracking-[-0.04em]", accent)} />
                )}
                <span className="mt-1 block text-[0.75rem] leading-tight text-fg-2">{pt.stat.label}</span>
              </p>
            )}
          </li>
        ))}
      </ol>

      {/* Agency: il grafico cresce · Academy: le competenze si riempiono */}
      {impact.meters ? (
        <ul className="mt-6 space-y-3.5">
          {impact.meters.map((m, i) => (
            <li key={m} style={{ "--i": i } as CSSVars}>
              <div className="flex items-center justify-between text-[0.8125rem] font-medium text-fg-2">
                <span>{m}</span>
                <span className={cn("impact-badge inline-flex items-center gap-1 text-[0.6875rem] font-semibold uppercase tracking-wider", accent)}>
                  <Icon name="check" className="h-3 w-3" strokeWidth={2.6} />
                  Autonomo
                </span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-line">
                <span className="impact-meter block h-full origin-left rounded-full bg-gradient-to-r from-azure-400 via-azure-300 to-gold-300" />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 flex min-h-24 flex-1 items-end gap-1.5" aria-hidden="true">
          {BARS.map((h, i) => (
            <span key={i} style={{ height: `${h}%`, "--i": i } as CSSVars} className="impact-bar block flex-1 origin-bottom rounded-t-md bg-gradient-to-t from-gold-600/70 to-gold-300" />
          ))}
        </div>
      )}

      {/* traguardo */}
      <div className={cn("impact-finale mt-5 flex items-center gap-3.5 rounded-2xl border bg-night/50 px-4 py-3", border)}>
        <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-full", gold ? "bg-gold-300 text-night" : "bg-azure-300 text-night")}>
          <Icon name={impact.finale.icon} className="h-5 w-5" strokeWidth={1.8} />
        </span>
        <p className="text-[0.9375rem] leading-snug text-fg-2">
          <span className={cn("block font-display text-[1.0625rem] font-bold", accent)}>{impact.finale.label}</span>
          {impact.finale.text}
        </p>
      </div>

      <div className="mt-auto pt-7">
        <Button href={path.cta.href} size="md" icon="arrow-right">
          {path.cta.label}
        </Button>
      </div>
    </div>
  );
}

/** "Cosa ottieni": due colonne, Agency e Academy, con pochi punti decisivi e numeri che crescono. */
export function Paths() {
  const { paths } = site;
  return (
    <Section id="percorsi" labelledBy="paths-title">
      <TechBackdrop tone="mixed" />
      <SectionHeading id="paths-title" overline={paths.overline} title={paths.title} line={paths.line} align="center" />
      <RevealGroup className="mx-auto mt-10 grid max-w-5xl gap-5 sm:mt-14 lg:grid-cols-2 lg:gap-8" stagger={0.14} alternate="far">
        <RevealItem y={0}>
          <ImpactColumn path={paths.agency} tone="gold" />
        </RevealItem>
        <RevealItem y={0}>
          <ImpactColumn path={paths.academy} tone="azure" />
        </RevealItem>
      </RevealGroup>
    </Section>
  );
}
