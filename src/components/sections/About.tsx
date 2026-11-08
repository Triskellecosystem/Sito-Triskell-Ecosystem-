import { site } from "@/content/site";
import { LogoMark } from "@/components/brand/LogoMark";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Spotlight } from "@/components/ui/Spotlight";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { cn } from "@/lib/cn";

/**
 * Chi siamo: due card ritratto con "foto" segnaposto elegante (monogramma oro in filigrana + simbolo),
 * la seconda sfalsata in verticale su desktop per rompere la simmetria. Sotto, la fascia dei collaboratori.
 */
export function About({ withHeading = true }: { withHeading?: boolean }) {
  const { about } = site;
  return (
    <Section id={about.id} labelledBy="about-title">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px hairline" />
      {withHeading && <SectionHeading id="about-title" overline={about.overline} title={about.title} line={about.line} />}

      <RevealGroup className={cn(withHeading && "mt-12 sm:mt-16", "grid gap-5 sm:grid-cols-2 lg:mx-auto lg:max-w-4xl lg:gap-8")} stagger={0.15}>
        {about.team.map((m, i) => (
          <RevealItem key={m.name} y={40} className={cn(i === 1 && "lg:mt-16")}>
            <Parallax distance={i === 1 ? 14 : 6}>
              <Spotlight className="group/card h-full rounded-card border border-line bg-surface transition-[border-color] duration-[var(--dur-base)] ease-out-expo hover:border-gold-400/50">
                <article className="relative z-[2]">
                  {/* Foto segnaposto */}
                  <div className="relative aspect-[4/4.4] overflow-hidden bg-[linear-gradient(160deg,var(--color-cobalt-700),var(--color-night-glow)_60%,var(--color-surface))]">
                    <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-70" />
                    <LogoMark sizes="320px" className="absolute -right-12 -top-8 h-[85%] w-auto opacity-[0.16]" />
                    <span
                      aria-hidden="true"
                      className="text-gold absolute inset-0 grid place-items-center font-display text-[clamp(7rem,5rem+9vw,11rem)] font-bold leading-none opacity-30 transition-transform duration-[var(--dur-slow)] ease-out-expo group-hover/card:scale-105"
                    >
                      {m.initials}
                    </span>
                    <span className="absolute bottom-3 left-3 rounded-full border border-line-strong bg-night/70 px-3 py-1 text-[0.6875rem] font-medium uppercase tracking-wider text-fg-2 backdrop-blur">
                      {about.photoNote}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-h3 text-fg">{m.name}</h3>
                    <p className="mt-1.5 text-small font-semibold uppercase tracking-[0.12em] text-gold-400">{m.role}</p>
                    <p className="mt-3 text-body text-fg-2">{m.bio}</p>
                  </div>
                </article>
              </Spotlight>
            </Parallax>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-10 lg:mx-auto lg:max-w-4xl" delay={0.1}>
        <div className="flex flex-col items-start gap-5 rounded-card border border-dashed border-line-strong p-6 sm:flex-row sm:items-center">
          <div aria-hidden="true" className="flex -space-x-3">
            {[0, 1, 2].map((i) => (
              <span key={i} className="grid h-11 w-11 place-items-center rounded-full border-2 border-night bg-surface-2 text-fg-3" style={{ opacity: 1 - i * 0.2 }}>
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <circle cx="12" cy="9" r="3.5" />
                  <path d="M5 20c.8-3.5 3.6-5 7-5s6.2 1.5 7 5" />
                </svg>
              </span>
            ))}
          </div>
          <div>
            <h3 className="font-display text-[1.125rem] font-semibold tracking-tight text-fg">{about.extra.title}</h3>
            <p className="mt-1 text-body text-fg-2">{about.extra.text}</p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
