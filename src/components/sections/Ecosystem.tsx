import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { LogoMark } from "@/components/brand/LogoMark";
import { BeamCard } from "@/components/ui/BeamCard";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Spotlight } from "@/components/ui/Spotlight";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

interface BranchProps {
  question: string;
  name: string;
  line: string;
  points: string[];
  cta: { label: string; href: string };
  icon: IconName;
  badge?: string;
  tone: "gold" | "azure";
}

/** Un ramo: domanda → freccia → nome del ramo → una riga → 3 punti → pulsante. Stessa struttura per entrambi. */
function Branch({ question, name, line, points, cta, icon, badge, tone }: BranchProps) {
  const gold = tone === "gold";
  return (
    <BeamCard hoverOnly={!gold} className="h-full">
      <Spotlight
        tone={tone}
        className={cn(
          "flex h-full flex-col rounded-[inherit] border border-line p-7 sm:p-9",
          gold
            ? "bg-[linear-gradient(160deg,var(--color-surface-3)_0%,var(--color-surface)_60%,var(--color-night-glow)_100%)]"
            : "bg-[linear-gradient(170deg,var(--color-surface)_0%,var(--color-night-raised)_100%)]",
        )}
      >
        <div className="relative z-[2] flex h-full flex-col">
          <div className="flex min-h-7 items-center">
            {badge && (
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-300/10 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-gold-300">
                <Icon name="sparkles" className="h-3.5 w-3.5" />
                {badge}
              </span>
            )}
          </div>

          <p className="mt-3 font-display text-[clamp(1.375rem,1.05rem+1.3vw,1.875rem)] font-semibold leading-snug tracking-tight text-fg lg:min-h-[5.25rem]">{question}</p>

          <div aria-hidden="true" className={cn("my-5 flex items-center gap-3", gold ? "text-gold-300" : "text-azure-300")}>
            <span className="h-px flex-1 bg-gradient-to-r from-current to-transparent opacity-60" />
            <span className="grid h-9 w-9 place-items-center rounded-full border border-current">
              <Icon name="arrow-down" className="h-4 w-4" strokeWidth={2} />
            </span>
          </div>

          <h3 className={cn("flex items-center gap-4 font-display text-[clamp(2.25rem,1.6rem+2.8vw,3.5rem)] font-bold leading-none tracking-[-0.04em]", gold ? "text-gold" : "text-azure-300")}>
            <Icon name={icon} className="h-[0.8em] w-[0.8em] shrink-0 text-fg" strokeWidth={1.5} />
            {name}
          </h3>
          <p className="mt-4 max-w-md text-lead text-fg-2">{line}</p>

          <ul className="mt-6 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-3 text-[0.9375rem] text-fg">
                <span className={cn("grid h-6 w-6 shrink-0 place-items-center rounded-full border", gold ? "border-gold-400/50 bg-gold-300/10 text-gold-300" : "border-azure-400/50 bg-azure-400/10 text-azure-300")}>
                  <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-9">
            <Button href={cta.href} variant={gold ? "primary" : "secondary"} size="lg" icon="arrow-right">
              {cta.label}
            </Button>
          </div>
        </div>
      </Spotlight>
    </BeamCard>
  );
}

/**
 * Cos'è Triskell Ecosystem? Definizione in una riga, i 4 settori, poi uno SCHEMA: il logo in alto
 * (l'ecosistema) si divide in due rami, ognuno introdotto dalla domanda a cui risponde:
 * «Vuoi delegare tutto a noi? → Agency» oppure «Vuoi imparare…? → Academy».
 */
export function Ecosystem() {
  const { ecosystem: e } = site;

  return (
    <Section id={e.id} labelledBy="eco-title">
      <SectionHeading id="eco-title" overline={e.overline} title={e.title} line={e.line} />

      <Reveal delay={0.1} className="mt-8">
        <p className="mb-3 text-overline font-semibold uppercase tracking-[var(--text-overline--letter-spacing)] text-fg-3">{e.sectorsLabel}</p>
        <ul className="flex flex-wrap gap-2.5">
          {e.sectors.map((sector) => (
            <li key={sector} className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/70 px-4 py-2 text-[0.9375rem] font-medium text-fg">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold-300" />
              {sector}
            </li>
          ))}
        </ul>
      </Reveal>

      {/* ---- SCHEMA ---- */}
      <div className="mt-16 sm:mt-20">
        {/* Nodo: l'ecosistema */}
        <Reveal y={20} blur={0} className="mx-auto flex w-fit flex-col items-center text-center">
          <span className="relative grid place-items-center">
            <span aria-hidden="true" className="absolute -inset-6 rounded-full bg-[radial-gradient(circle,var(--glow-azure),transparent_66%)] opacity-70" />
            <LogoMark size={104} sizes="104px" className="relative h-[104px] w-[104px] drop-shadow-[0_10px_24px_rgb(0_0_0/0.5)]" />
          </span>
          <p className="mt-4 font-display text-[1.25rem] font-bold tracking-tight text-fg">{e.nodeLabel}</p>
          <p className="mt-1 text-small text-fg-3">{e.nodeHint}</p>
        </Reveal>

        {/* Connettore (desktop): gambo → barra → due discese. Si disegna con transform. */}
        <Reveal y={0} blur={0} className="hidden lg:block">
          <div aria-hidden="true" className="relative mx-auto h-16 w-full">
            <span className="grow-y absolute left-1/2 top-0 h-1/2 w-px -translate-x-1/2 bg-gold-300/80" style={{ transitionDelay: "0.1s" }} />
            <span className="grow-x absolute left-[calc(25%-0.375rem)] right-[calc(25%-0.375rem)] top-1/2 h-px bg-gradient-to-r from-gold-300/80 via-gold-300/60 to-azure-400/80" style={{ transitionDelay: "0.45s" }} />
            <span className="grow-y absolute left-[calc(25%-0.375rem)] top-1/2 bottom-0 w-px bg-gold-300/80" style={{ transitionDelay: "0.9s" }} />
            <span className="grow-y absolute right-[calc(25%-0.375rem)] top-1/2 bottom-0 w-px bg-azure-400/80" style={{ transitionDelay: "0.9s" }} />
          </div>
        </Reveal>
        {/* Gambo (mobile) */}
        <div aria-hidden="true" className="mx-auto h-10 w-px bg-gradient-to-b from-gold-300/80 to-gold-300/10 lg:hidden" />

        {/* I due rami */}
        <RevealGroup className="relative grid gap-4 lg:grid-cols-2 lg:gap-6" stagger={0.1}>
          <RevealItem y={36}>
            <Branch tone="gold" icon="target" {...e.agency} />
          </RevealItem>

          {/* "oppure": in mezzo tra le card (inline su mobile, sovrapposto al centro su desktop) */}
          <div className="grid place-items-center lg:hidden">
            <span className="rounded-full border border-line-strong bg-night px-4 py-1.5 font-display text-small font-semibold uppercase tracking-[0.14em] text-fg-2">{e.or}</span>
          </div>
          <span className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-line-strong bg-night px-3 py-1 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-fg-2 lg:block">
            {e.or}
          </span>

          <RevealItem y={36}>
            <Branch tone="azure" icon="graduation" {...e.academy} />
          </RevealItem>
        </RevealGroup>
      </div>
    </Section>
  );
}
