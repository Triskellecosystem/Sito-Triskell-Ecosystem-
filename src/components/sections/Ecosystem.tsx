import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { LogoMark } from "@/components/brand/LogoMark";
import { LogoTilt } from "@/components/brand/LogoTilt";
import { BeamCard } from "@/components/ui/BeamCard";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Spotlight } from "@/components/ui/Spotlight";
import { Tilt } from "@/components/ui/Tilt";
import { DigitalCursor } from "@/components/motion/DigitalCursor";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

interface BranchProps {
  question: string;
  name: string;
  line: string;
  points: string[];
  cta: { label: string; href: string };
  icon: IconName;
  tone: "gold" | "azure";
}

/** Un ramo (compatto e delicato): domanda → nome del ramo → una riga → 3 punti → pulsante. Stessa struttura per entrambi. */
function Branch({ question, name, line, points, cta, icon, tone }: BranchProps) {
  const gold = tone === "gold";
  return (
    <BeamCard tone={tone} className="h-full">
      <Spotlight
        tone={tone}
        className={cn(
          "flex h-full flex-col rounded-[inherit] border border-line p-6 sm:p-8",
          gold
            ? "bg-[linear-gradient(160deg,var(--color-surface-3)_0%,var(--color-surface)_60%,var(--color-night-glow)_100%)]"
            : "bg-[linear-gradient(170deg,var(--color-surface)_0%,var(--color-night-raised)_100%)]",
        )}
      >
        <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,#000,transparent_80%)]" />
        <div className="relative z-[2] flex h-full flex-col">
          {/* una riga sola per Agency, due per Academy: la domanda poggia sempre sulla stessa linea, così il resto resta allineato */}
          <div className="flex lg:min-h-[3.25rem] lg:items-end">
            <p className="whitespace-pre-line font-display text-[clamp(1.0625rem,0.95rem+0.4vw,1.25rem)] font-semibold leading-snug tracking-tight text-fg [text-wrap:balance]">{question}</p>
          </div>

          <div aria-hidden="true" className={cn("my-4 flex items-center gap-3", gold ? "text-gold-300" : "text-azure-300")}>
            <span className="h-px flex-1 bg-gradient-to-r from-current to-transparent opacity-50" />
            <Icon name="arrow-down" className="h-4 w-4" strokeWidth={2} />
          </div>

          <h3 className={cn("flex items-center gap-3.5 font-display text-[clamp(2rem,1.55rem+1.8vw,2.875rem)] font-bold leading-none tracking-[-0.04em]", gold ? "text-gold" : "text-azure-300")}>
            <span className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-2xl border", gold ? "border-gold-400/40 bg-gold-300/10 text-gold-300" : "border-azure-400/40 bg-azure-400/10 text-azure-300")}>
              <Icon name={icon} className="h-6 w-6" strokeWidth={1.6} />
            </span>
            {name}
          </h3>
          <p className="mt-3 max-w-md text-[1.0625rem] leading-snug text-fg-2">{line}</p>

          <ul className="mt-5 space-y-2.5">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-3 text-[0.9375rem] text-fg">
                <span className={cn("grid h-5 w-5 shrink-0 place-items-center rounded-full border", gold ? "border-gold-400/50 bg-gold-300/10 text-gold-300" : "border-azure-400/50 bg-azure-400/10 text-azure-300")}>
                  <Icon name="check" className="h-3 w-3" strokeWidth={2.5} />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-7">
            <Button href={cta.href} size="md" icon="arrow-right">
              {cta.label}
            </Button>
          </div>
        </div>
      </Spotlight>
    </BeamCard>
  );
}

/** Un settore: pillola numerata che arriva da fuori schermo verso il logo, nell'ordine indicato da `k`. */
function Sector({ label, icon, align, k }: { label: string; icon: IconName; align: "left" | "right"; k: number }) {
  return (
    <Reveal as="li" from={align === "left" ? "far-left" : "far-right"} blur={0} delay={k * 0.3} className={cn("flex items-center", align === "right" && "lg:flex-row-reverse")}>
      <span
        style={{ "--k": k } as React.CSSProperties}
        className="eco-bob inline-flex items-center gap-3 rounded-full border border-line-strong bg-surface/85 py-2 pl-2 pr-5 font-display text-[1.0625rem] font-semibold tracking-tight text-fg shadow-card backdrop-blur-sm"
      >
        <span className="grid h-10 w-10 place-items-center rounded-full border border-gold-400/45 bg-gold-300/10 text-gold-300">
          <Icon name={icon} className="h-5 w-5" strokeWidth={1.7} />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-[0.625rem] font-semibold tracking-[0.18em] text-gold-400">{String(k + 1).padStart(2, "0")}</span>
          {label}
        </span>
      </span>
      <span aria-hidden="true" className="relative mx-1 hidden h-px w-14 flex-1 overflow-hidden bg-gold-300/25 lg:block xl:w-24">
        <span className={cn("dot-flow absolute inset-0 block", align === "left" ? "" : "dot-flow--rev")} />
      </span>
    </Reveal>
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
    <Section id="ecosistema" labelledBy="eco-title" className="pt-[clamp(1.5rem,3vw,3rem)] pb-[clamp(1.5rem,3vw,2.5rem)]">
      {/* qui niente quadrati: solo l'effetto al mouse, per non appesantire la sezione */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <DigitalCursor />
      </div>
      <SectionHeading id="eco-title" overline={e.overline} title={e.title} align="center" />
      <Reveal delay={0.15} blur={4} y={14}>
        <p className="mx-auto mt-6 max-w-3xl text-balance text-center text-[clamp(1.0625rem,0.98rem+0.45vw,1.25rem)] leading-relaxed text-fg-2">{e.description}</p>
      </Reveal>

      {/* ---- COSTELLAZIONE: i settori arrivano da sinistra e da destra, in ordine, verso il logo ---- */}
      <div className="mt-1 sm:mt-2">
        <p className="mb-14 text-center text-overline font-semibold uppercase tracking-[var(--text-overline--letter-spacing)] text-fg-3">{e.sectorsLabel}</p>
        <div className="mx-auto grid max-w-4xl items-center gap-y-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-x-10">
          <ul className="order-2 flex flex-wrap justify-center gap-3 lg:order-1 lg:grid lg:grid-cols-1 lg:justify-items-end lg:gap-9">
            {m && <Sector {...m} align="left" k={0} />}
            {auto && <Sector {...auto} align="left" k={2} />}
          </ul>

          <Reveal from="scale" y={0} blur={0} delay={0.1} className="relative order-1 mx-auto grid place-items-center lg:order-2">
            <span aria-hidden="true" className="absolute -inset-12 rounded-full bg-[radial-gradient(circle,var(--glow-gold),transparent_62%)] opacity-40" />
            <span aria-hidden="true" className="eco-swing absolute -inset-5 animate-[spin_36s_linear_infinite] rounded-full border border-dashed border-gold-400/40" />
            <span aria-hidden="true" className="absolute -inset-10 animate-[spin_60s_linear_infinite_reverse] rounded-full border border-azure-400/30 [border-top-color:var(--color-azure-300)]" />
            {[0, 1, 2, 3].map((i) => (
              <span key={i} aria-hidden="true" style={{ "--k": i } as React.CSSProperties} className="eco-ping absolute -inset-2 rounded-full border-2 border-gold-300/80" />
            ))}
            <LogoTilt max={20}>
              <LogoMark size={172} sizes="172px" className="relative h-[172px] w-[172px] drop-shadow-[0_14px_30px_rgb(0_0_0/0.55)]" />
            </LogoTilt>
          </Reveal>

          <ul className="order-3 flex flex-wrap justify-center gap-3 lg:grid lg:grid-cols-1 lg:justify-items-start lg:gap-9">
            {ai && <Sector {...ai} align="right" k={1} />}
            {form && <Sector {...form} align="right" k={3} />}
          </ul>
        </div>
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

        {/* I due rami (compatti) */}
        <RevealGroup className="relative mx-auto grid max-w-4xl gap-4 lg:grid-cols-2 lg:gap-10" stagger={0.15} alternate>
          <RevealItem y={30} className="h-full">
            <Tilt className="h-full" max={4}>
              <Branch tone="gold" icon="rocket" {...e.agency} />
            </Tilt>
          </RevealItem>

          {/* "e anche": inline su mobile, sovrapposto al centro su desktop */}
          <div className="grid place-items-center lg:hidden">
            <span className="rounded-full border border-line-strong bg-night px-4 py-1.5 font-display text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-fg-2">{e.or}</span>
          </div>
          <span className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-400/50 bg-night px-4 py-1.5 font-display text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-gold-200 shadow-glow-gold lg:block">
            {e.or}
          </span>

          <RevealItem y={30} className="h-full">
            <Tilt className="h-full" max={4}>
              <Branch tone="azure" icon="graduation" {...e.academy} />
            </Tilt>
          </RevealItem>
        </RevealGroup>

        {/* Oppure: combinale */}
        <Reveal y={20} blur={0} className="mx-auto mt-8 max-w-2xl">
          <div className="relative flex items-center gap-4 rounded-full border border-line-strong bg-surface/70 py-3 pl-3 pr-6 backdrop-blur-sm sm:gap-5">
            <span className="relative flex shrink-0 items-center">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-gold-400/50 bg-night text-gold-300">
                <Icon name="rocket" className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <span className="-ml-2 grid h-11 w-11 place-items-center rounded-full border border-azure-400/60 bg-night text-azure-300">
                <Icon name="graduation" className="h-5 w-5" strokeWidth={1.6} />
              </span>
            </span>
            <p className="min-w-0 text-[0.9375rem] leading-snug text-fg-2">
              <span className="block font-display text-[1.0625rem] font-semibold text-fg">{e.combine.title}</span>
              {e.combine.text}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
