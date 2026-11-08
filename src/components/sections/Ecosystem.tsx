import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { LogoMark } from "@/components/brand/LogoMark";
import { BeamCard } from "@/components/ui/BeamCard";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Spotlight } from "@/components/ui/Spotlight";
import { Tilt } from "@/components/ui/Tilt";
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
          "flex h-full flex-col rounded-[inherit] border border-line p-8 sm:p-12 lg:min-h-[41rem]",
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

          <p className="mt-4 font-display text-[clamp(1.5rem,1.1rem+1.8vw,2.375rem)] font-semibold leading-snug tracking-tight text-fg lg:min-h-[7.25rem]">{question}</p>

          <div aria-hidden="true" className={cn("my-6 flex items-center gap-3", gold ? "text-gold-300" : "text-azure-300")}>
            <span className="h-px flex-1 bg-gradient-to-r from-current to-transparent opacity-60" />
            <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-current">
              <Icon name="arrow-down" className="h-5 w-5" strokeWidth={2} />
            </span>
          </div>

          <h3 className={cn("flex items-center gap-4 font-display text-[clamp(3rem,2rem+4.4vw,5.5rem)] font-bold leading-none tracking-[-0.045em]", gold ? "text-gold" : "text-azure-300")}>
            <Icon name={icon} className="h-[0.8em] w-[0.8em] shrink-0 text-fg" strokeWidth={1.5} />
            {name}
          </h3>
          <p className="mt-5 max-w-md text-[clamp(1.125rem,1rem+0.6vw,1.5rem)] leading-snug text-fg-2">{line}</p>

          <ul className="mt-8 space-y-3.5">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-3.5 text-[1.125rem] text-fg">
                <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-full border", gold ? "border-gold-400/50 bg-gold-300/10 text-gold-300" : "border-azure-400/50 bg-azure-400/10 text-azure-300")}>
                  <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-10">
            <Button href={cta.href} size="lg" icon="arrow-right">
              {cta.label}
            </Button>
          </div>
        </div>
      </Spotlight>
    </BeamCard>
  );
}

/** Un settore: pillola con icona. */
function Sector({ label, icon, align }: { label: string; icon: IconName; align: "left" | "right" | "center" }) {
  return (
    <li className={cn("flex items-center", align === "left" && "lg:flex-row-reverse")}>
      <span className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-surface/80 px-4 py-2.5 font-display text-[0.9375rem] font-semibold tracking-tight text-fg shadow-card backdrop-blur-sm">
        <Icon name={icon} className="h-[1.125rem] w-[1.125rem] text-gold-300" strokeWidth={1.7} />
        {label}
      </span>
      {align !== "center" && (
        <span aria-hidden="true" className="relative mx-1 hidden h-px w-14 flex-1 overflow-hidden bg-gold-300/25 lg:block xl:w-24">
          <span className={cn("dot-flow absolute inset-0 block", align === "left" ? "" : "dot-flow--rev")} />
        </span>
      )}
    </li>
  );
}

/**
 * Cos'è Triskell Ecosystem? Tutto centrato: titolo, descrizione, poi la "costellazione" — il logo grande
 * al centro con i 4 settori collegati da impulsi luminosi — e sotto lo schema dei due rami, ognuno
 * introdotto dalla domanda a cui risponde («Vuoi delegare tutto a noi? → Agency» / «Vuoi imparare…? → Academy»).
 */
export function Ecosystem() {
  const { ecosystem: e } = site;
  const [m, ai, auto, form] = e.sectors;

  return (
    <Section id="ecosistema" labelledBy="eco-title" className="pt-[clamp(1.5rem,3vw,3rem)]">
      <SectionHeading id="eco-title" overline={e.overline} title={e.title} align="center" />
      <Reveal delay={0.15} blur={4} y={14}>
        <p className="mx-auto mt-6 max-w-2xl text-center text-[clamp(1.0625rem,0.98rem+0.45vw,1.3125rem)] leading-relaxed text-fg-2">{e.description}</p>
      </Reveal>

      {/* ---- COSTELLAZIONE: settori attorno al logo ---- */}
      <div className="mt-12 sm:mt-16">
        <p className="mb-6 text-center text-overline font-semibold uppercase tracking-[var(--text-overline--letter-spacing)] text-fg-3">{e.sectorsLabel}</p>
        <Reveal y={20} blur={0}>
          <div className="mx-auto grid max-w-4xl items-center gap-y-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-x-12">
            <ul className="order-2 flex flex-wrap justify-center gap-3 lg:order-1 lg:grid lg:grid-cols-1 lg:gap-6">
              {m && <Sector {...m} align="left" />}
              {ai && <Sector {...ai} align="left" />}
            </ul>

            <div className="relative order-1 mx-auto grid place-items-center lg:order-2">
              <span aria-hidden="true" className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,var(--glow-gold),transparent_62%)] opacity-40" />
              <span aria-hidden="true" className="absolute -inset-5 animate-[spin_36s_linear_infinite] rounded-full border border-dashed border-gold-400/40" />
              <span aria-hidden="true" className="absolute -inset-10 animate-[spin_60s_linear_infinite_reverse] rounded-full border border-azure-400/30 [border-top-color:var(--color-azure-300)]" />
              <LogoMark size={148} sizes="148px" className="relative h-[148px] w-[148px] drop-shadow-[0_14px_30px_rgb(0_0_0/0.55)]" />
            </div>

            <ul className="order-3 flex flex-wrap justify-center gap-3 lg:grid lg:grid-cols-1 lg:gap-6">
              {auto && <Sector {...auto} align="right" />}
              {form && <Sector {...form} align="right" />}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* ---- SCHEMA: due rami ---- */}
      <div className="mt-12 sm:mt-14">
        <Reveal y={16} blur={0} className="text-center">
          <p className="font-display text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] font-bold tracking-tight text-fg">{e.nodeLabel}</p>
          <p className="mt-1.5 inline-flex items-center gap-2 text-[1.0625rem] font-semibold text-gold-300">
            <Icon name="arrow-down" className="h-4 w-4" strokeWidth={2.2} />
            {e.nodeHint}
            <Icon name="arrow-down" className="h-4 w-4" strokeWidth={2.2} />
          </p>
        </Reveal>

        {/* Connettore (desktop): gambo → barra → due discese. Si disegna con transform. */}
        <Reveal y={0} blur={0} className="hidden lg:block">
          <div aria-hidden="true" className="relative mx-auto mt-3 h-20 w-full">
            <span className="grow-y absolute left-1/2 top-0 h-1/2 w-[3px] -translate-x-1/2 bg-gold-300 shadow-[0_0_14px_2px_rgb(247_200_92/0.55)]" style={{ transitionDelay: "0.1s" }} />
            <span className="grow-x absolute left-[calc(25%-0.75rem)] right-[calc(25%-0.75rem)] top-1/2 h-[3px] bg-gradient-to-r from-gold-300 via-gold-200 to-azure-400 shadow-[0_0_14px_2px_rgb(247_200_92/0.4)]" style={{ transitionDelay: "0.45s" }} />
            <span className="grow-y absolute left-[calc(25%-0.75rem)] top-1/2 bottom-0 w-[3px] bg-gold-300 shadow-[0_0_14px_2px_rgb(247_200_92/0.55)]" style={{ transitionDelay: "0.9s" }} />
            <span className="grow-y absolute right-[calc(25%-0.75rem)] top-1/2 bottom-0 w-[3px] bg-azure-400 shadow-[0_0_14px_2px_rgb(42_144_195/0.55)]" style={{ transitionDelay: "0.9s" }} />
          </div>
        </Reveal>
        {/* Gambo (mobile) */}
        <div aria-hidden="true" className="mx-auto mt-3 h-8 w-px bg-gradient-to-b from-gold-300/80 to-gold-300/10 lg:hidden" />

        {/* I due rami */}
        <RevealGroup className="relative grid gap-4 lg:grid-cols-2 lg:gap-12" stagger={0.15} alternate>
          <RevealItem y={30} className="h-full">
            <Tilt className="h-full">
              <Branch tone="gold" icon="target" {...e.agency} />
            </Tilt>
          </RevealItem>

          {/* "oppure": inline su mobile, sovrapposto al centro su desktop */}
          <div className="grid place-items-center lg:hidden">
            <span className="rounded-full border border-line-strong bg-night px-5 py-2 font-display text-small font-semibold uppercase tracking-[0.14em] text-fg-2">{e.or}</span>
          </div>
          <span className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold-400/60 bg-night px-5 py-2 font-display text-small font-semibold uppercase tracking-[0.16em] text-gold-200 shadow-glow-gold lg:block">
            {e.or}
          </span>

          <RevealItem y={30} className="h-full">
            <Tilt className="h-full">
              <Branch tone="azure" icon="graduation" {...e.academy} />
            </Tilt>
          </RevealItem>
        </RevealGroup>
      </div>
    </Section>
  );
}
