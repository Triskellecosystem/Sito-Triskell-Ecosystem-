import Image from "next/image";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

/**
 * I corsi veri di Triskell Academy (copertine e testi dalla piattaforma), con i numeri della piattaforma,
 * cosa si ottiene registrandosi e il pulsante per entrare. Ogni scheda porta alla piattaforma in una nuova scheda.
 */
export function AcademyCourses() {
  const c = site.academyPage.courses;
  return (
    <Section id="corsi" labelledBy="corsi-title" className="pt-[clamp(1.5rem,3vw,2.5rem)]">
      <TechBackdrop tone="azure" cursor rich />
      <SectionHeading id="corsi-title" overline={c.overline} title={c.title} line={c.line} align="center" />

      <Reveal y={16} blur={0}>
        <dl className="mx-auto mt-8 grid max-w-xl grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-night/50 py-4 backdrop-blur-sm">
          {c.stats.map((st) => (
            <div key={st.label} className="px-2 text-center">
              <dd>
                <CountUp {...st} className="text-gold font-display text-[clamp(1.75rem,1.4rem+1.5vw,2.5rem)] font-bold leading-none tracking-[-0.04em]" />
              </dd>
              <dt className="mt-1.5 text-[0.75rem] leading-tight text-fg-2">{st.label}</dt>
            </div>
          ))}
        </dl>
      </Reveal>

      <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08} alternate="far">
        {c.items.map((it) => (
          <RevealItem key={it.id} y={28} className="h-full">
            <a
              href={it.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/c relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-[linear-gradient(170deg,var(--color-surface-2),var(--color-night-raised))] transition-[border-color,box-shadow] duration-[var(--dur-base)] ease-out-expo hover:border-azure-300/70 hover:shadow-[0_0_44px_-12px_rgb(42_144_195/0.55)]"
            >
              <div className="relative aspect-video overflow-hidden bg-night">
                <Image
                  src={it.cover}
                  alt={`Copertina del corso: ${it.title}`}
                  fill
                  sizes="(min-width: 1024px) 26rem, (min-width: 640px) 45vw, 92vw"
                  className="object-cover transition-transform duration-[900ms] ease-out-expo group-hover/c:scale-[1.05]"
                />
                <span className="absolute left-3 top-3 rounded-full bg-gold-300 px-2.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wider text-night">{c.free}</span>
                <span aria-hidden="true" className="absolute inset-0 grid place-items-center bg-night/30 opacity-0 transition-opacity duration-[var(--dur-base)] group-hover/c:opacity-100">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-gold-300 text-night shadow-glow-gold">
                    <Icon name="play" className="h-6 w-6" />
                  </span>
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-[1.1875rem] font-semibold leading-tight tracking-tight text-fg">{it.title}</h3>
                <p className="mt-2 flex-1 text-[0.9375rem] leading-snug text-fg-2">{it.text}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-small font-semibold text-gold-300 transition-colors group-hover/c:text-gold-100">
                  {c.open}
                  <Icon name="arrow-up-right" className="h-4 w-4" />
                </span>
              </div>
            </a>
          </RevealItem>
        ))}

      </RevealGroup>

      {/* YouTube: le copertine dei nostri video */}
      <div className="mt-16 sm:mt-20">
        <SectionHeading id="yt-title" overline="YouTube" title={c.youtube.title} line={c.youtube.line} align="center" />
        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08} alternate>
          {c.youtube.videos.map((v) => (
            <RevealItem key={v.id} y={26} className="h-full">
              <a
                href={`https://www.youtube.com/watch?v=${v.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group/y block overflow-hidden rounded-card border border-line bg-surface transition-[border-color,box-shadow] duration-[var(--dur-base)] ease-out-expo hover:border-gold-300/70 hover:shadow-[0_0_40px_-12px_rgb(247_200_92/0.5)]"
              >
                <div className="relative aspect-video overflow-hidden bg-night">
                  <Image src={`/youtube/${v.id}.jpg`} alt={`Video: ${v.title}`} fill sizes="(min-width: 1024px) 26rem, (min-width: 640px) 45vw, 92vw" className="object-cover transition-transform duration-[900ms] ease-out-expo group-hover/y:scale-[1.05]" />
                  <span aria-hidden="true" className="absolute inset-0 grid place-items-center bg-night/25 opacity-0 transition-opacity duration-[var(--dur-base)] group-hover/y:opacity-100">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-gold-300 text-night shadow-glow-gold">
                      <Icon name="play" className="h-6 w-6" />
                    </span>
                  </span>
                </div>
                <p className="p-4 font-display text-[1rem] font-semibold leading-snug tracking-tight text-fg">{v.title}</p>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal y={14} blur={0} className="mt-8 flex justify-center">
          <Button href={c.youtube.channel.href} target="_blank" rel="noopener noreferrer" size="md" variant="secondary" icon="arrow-up-right">
            {c.youtube.channel.label}
          </Button>
        </Reveal>
      </div>

      {/* In fondo, da solo: cosa troverai nell'Academy */}
      <Reveal y={26} blur={0} className="mt-16 sm:mt-20">
        <div className="relative overflow-hidden rounded-card border border-gold-400/40 bg-[linear-gradient(160deg,var(--color-cobalt-600),var(--color-night-raised))] p-6 sm:p-8">
          <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:linear-gradient(to_right,#000,transparent_80%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-center">
            <div>
              <h3 className="font-display text-[clamp(1.5rem,1.2rem+1.2vw,2.125rem)] font-bold tracking-[-0.03em] text-fg">{c.includes.title}</h3>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {c.includes.items.map((it) => (
                  <li key={it.title} className="flex items-start gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-gold-400/45 bg-gold-300/10 text-gold-300">
                      <Icon name={it.icon} className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <span className="text-[0.9375rem] leading-snug text-fg-2">
                      <strong className="block font-display text-[1.0625rem] font-semibold text-fg">{it.title}</strong>
                      {it.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-start gap-5 lg:items-center lg:text-center">
              <blockquote className="border-l-2 border-gold-300/60 pl-4 text-[0.9375rem] italic leading-snug text-fg-2 lg:border-l-0 lg:pl-0">
                “{c.quote}”
                <footer className="mt-1.5 text-[0.75rem] not-italic text-fg-3">{c.quoteBy}</footer>
              </blockquote>
              <Button href={c.cta.href} target="_blank" rel="noopener noreferrer" size="lg" icon="arrow-up-right" pulse>
                {c.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
