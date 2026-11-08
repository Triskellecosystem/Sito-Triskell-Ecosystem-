import Image from "next/image";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { Tilt } from "@/components/ui/Tilt";
import { Reveal } from "@/components/motion/Reveal";

/**
 * "Da dove partire? Da qui.": la guida Vibe Coding con il libro inclinabile e il prezzo in un bollo oro,
 * tre punti, due pulsanti e la scheda sulla guida alle Claude Skills (come sul sito originale).
 */
export function VibeGuide() {
  const g = site.vibeCoding.guide;
  return (
    <Section id="guida" labelledBy="guida-title">
      <TechBackdrop tone="azure" cursor />
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
        <Reveal from="far-left" blur={0} className="lg:col-span-5">
          <Tilt max={9}>
            <div className="float-slow relative mx-auto w-[min(72vw,19rem)]">
              <div aria-hidden="true" className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgb(42_144_195/0.45),transparent_65%)]" />
              <Image
                src="/brand/vibe-coding-libro.webp"
                alt={site.vibeCoding.coverAlt}
                width={1120}
                height={1400}
                sizes="(min-width: 1024px) 19rem, 72vw"
                loading="lazy"
                className="relative h-auto w-full rounded-3xl [mask-image:radial-gradient(ellipse_72%_72%_at_50%_50%,#000_58%,transparent_100%)]"
              />
              <span className="absolute -right-3 top-4 z-10 grid h-[4.5rem] w-[4.5rem] rotate-6 place-items-center rounded-full bg-[image:var(--gradient-gold-btn)] font-display text-[1.375rem] font-bold text-night shadow-glow-gold">
                <span aria-hidden="true" className="btn-ping absolute inset-0 rounded-full border-2 border-gold-200" />
                {g.price}
              </span>
            </div>
          </Tilt>
        </Reveal>

        <div className="lg:col-span-7">
          <SectionHeading id="guida-title" overline={g.overline} title={g.title} line={g.text} />
          <Reveal delay={0.2} y={20} blur={0}>
            <ul className="mt-7 space-y-3.5">
              {g.bullets.map((b) => (
                <li key={b.text} className="flex items-start gap-3.5 text-[1.0625rem] leading-snug text-fg">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-azure-400/50 bg-azure-400/10 text-azure-300">
                    <Icon name={b.icon} className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  {b.text}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button href={g.primary.href} target="_blank" rel="noopener noreferrer" size="lg" icon="arrow-right">
                {g.primary.label}
              </Button>
              <a href={g.secondary.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-display text-[1rem] font-semibold text-fg transition-colors hover:text-gold-200">
                {g.secondary.label}
                <Icon name="arrow-up-right" className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <Reveal from="far-right" blur={0} delay={0.1} className="mt-10">
            <a
              href={g.skills.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/sk block rounded-card border border-azure-400/50 bg-[linear-gradient(165deg,var(--color-cobalt-700),var(--color-night-raised))] p-5 transition-[border-color,box-shadow] duration-[var(--dur-base)] ease-out-expo hover:border-gold-300/70 hover:shadow-[0_0_40px_-12px_rgb(247_200_92/0.5)] sm:p-6"
            >
              <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-azure-300">{g.skills.overline}</p>
              <p className="mt-2 font-display text-[clamp(1.125rem,1rem+0.6vw,1.5rem)] font-bold leading-snug tracking-tight text-fg">{g.skills.title}</p>
              <span className="mt-3 inline-flex items-center gap-2 text-small font-semibold text-gold-300 group-hover/sk:text-gold-100">
                {g.skills.link.label}
                <Icon name="arrow-right" className="h-4 w-4 transition-transform duration-[var(--dur-base)] group-hover/sk:translate-x-1" />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
