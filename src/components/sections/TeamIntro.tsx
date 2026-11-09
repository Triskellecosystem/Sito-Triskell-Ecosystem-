import Image from "next/image";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { Reveal } from "@/components/motion/Reveal";
import { Tilt } from "@/components/ui/Tilt";

/** Apertura della pagina: i due fondatori insieme, con il logo alle spalle, e i loro ruoli. Poi si scende a conoscerli uno a uno. */
export function TeamIntro() {
  const t = site.about.intro;
  return (
    <Section id="team" labelledBy="team-title" className="pt-[clamp(1rem,2vw,2rem)]">
      <TechBackdrop tone="mixed" rich cursor />
      <Reveal y={20} blur={0} className="mx-auto max-w-2xl text-center">
        <h2 id="team-title" className="font-display text-[clamp(1.75rem,1.3rem+2vw,2.75rem)] font-bold tracking-[-0.035em] text-fg">
          {t.title}
        </h2>
        <p className="mt-3 text-lead text-fg-2 [text-wrap:balance]">{t.text}</p>
      </Reveal>

      <div className="mx-auto mt-10 max-w-5xl">
        <Tilt max={3}>
          <div className="relative overflow-hidden rounded-card border border-line-strong shadow-[0_40px_90px_-30px_rgb(0_0_0/0.9)]">
            <Image src="/team/duo.webp" alt="Tomaso Forno e William Argintieri alla scrivania, con il logo Triskell Ecosystem alle spalle" width={1600} height={900} priority sizes="(min-width: 1024px) 64rem, 94vw" className="team-kenburns h-auto w-full" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent" />
            {t.labels.map((l) => (
              <div key={l.name} className={cn("absolute bottom-3 sm:bottom-6", l.side === "left" ? "left-3 sm:left-6" : "right-3 text-right sm:right-6")}>
                <span className={cn("inline-block rounded-2xl border bg-night/75 px-3.5 py-2 backdrop-blur-md sm:px-5 sm:py-3", l.tone === "azure" ? "border-azure-300/60 shadow-[0_0_30px_-8px_rgb(42_144_195/0.7)]" : "border-ember-300/60 shadow-[0_0_30px_-8px_rgb(255_77_46/0.7)]")}>
                  <span className="block font-display text-[0.9375rem] font-bold leading-tight text-fg sm:text-[1.25rem]">{l.name}</span>
                  <span className={cn("block text-[0.6875rem] font-semibold uppercase tracking-[0.12em] sm:text-[0.75rem]", l.tone === "azure" ? "text-azure-300" : "text-ember-300")}>{l.role}</span>
                </span>
              </div>
            ))}
          </div>
        </Tilt>
      </div>

      <Reveal y={14} blur={0} className="mt-8 flex justify-center">
        <p className="inline-flex items-center gap-2.5 text-small font-medium text-fg-3">
          <Icon name="arrow-down" className="h-4 w-4 animate-bounce text-gold-300" />
          {t.hint}
        </p>
      </Reveal>
    </Section>
  );
}
