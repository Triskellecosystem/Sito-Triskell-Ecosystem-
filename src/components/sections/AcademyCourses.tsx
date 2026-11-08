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
    <Section id="corsi" labelledBy="corsi-title">
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

      <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08} alternate>
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

        {/* cosa ottieni + pulsante */}
        <RevealItem y={28} className="h-full">
          <div className="flex h-full flex-col justify-between rounded-card border border-gold-400/40 bg-[linear-gradient(160deg,var(--color-cobalt-600),var(--color-night-raised))] p-6">
            <div>
              <ul className="space-y-3">
                {c.perks.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[0.9375rem] leading-snug text-fg">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-gold-400/50 bg-gold-300/10 text-gold-300">
                      <Icon name="check" className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <blockquote className="mt-6 border-l-2 border-gold-300/60 pl-4 text-[0.9375rem] italic leading-snug text-fg-2">
                “{c.quote}”
                <footer className="mt-1.5 text-[0.75rem] not-italic text-fg-3">{c.quoteBy}</footer>
              </blockquote>
            </div>
            <div className="mt-6">
              <Button href={c.cta.href} target="_blank" rel="noopener noreferrer" size="md" icon="arrow-up-right" pulse>
                {c.cta.label}
              </Button>
            </div>
          </div>
        </RevealItem>
      </RevealGroup>
    </Section>
  );
}
