import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/motion/CountUp";
import { Magnetic } from "@/components/motion/Magnetic";
import { MatrixBackground } from "@/components/motion/MatrixBackground";
import { HeroVisual } from "./HeroVisual";

/** Parola con reveal CSS (nessuna dipendenza da JS: LCP immediato). */
function Word({ children, index, accent }: { children: string; index: number; accent?: boolean }) {
  return (
    <span
      className={`inline-block animate-[line-up_0.9s_var(--ease-out-expo)_backwards] ${accent ? "text-gold" : ""}`}
      style={{ animationDelay: `${0.05 + index * 0.07}s` }}
    >
      {children}
    </span>
  );
}

/**
 * Layout: testo asimmetrico a sinistra (7/12), medaglione con tile in parallax a destra (5/12),
 * numeri chiave in riga con filetti. Non è la hero centrata + 3 card: la gerarchia è tutta in verticale
 * a sinistra e il simbolo "sfora" verso il bordo destro.
 */
export function Hero() {
  const { hero } = site;
  const lines = [
    ...hero.titleLines.map((text) => ({ text, accent: false })),
    { text: hero.titleAccent, accent: true },
  ];
  let offset = 0;
  const titleLines = lines.map((line) => {
    const words = line.text.split(" ");
    const start = offset;
    offset += words.length;
    return { ...line, words, start };
  });

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pb-[clamp(3.5rem,7vw,7rem)] pt-[calc(var(--header-h)+clamp(1.5rem,5vh,4.5rem))]"
    >
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-20 [mask-image:linear-gradient(to_bottom,#000,transparent_88%)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[image:var(--gradient-bg-hero)]" />
      <MatrixBackground className="absolute inset-0 -z-10 h-full w-full opacity-[0.3] [mask-image:radial-gradient(70%_70%_at_30%_35%,transparent_20%,#000_100%)]" />

      <div className="container-x grid items-center gap-x-8 gap-y-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="mb-6 inline-flex animate-[fade-in_0.8s_var(--ease-soft)_both] flex-wrap items-center gap-x-3 gap-y-1 text-overline font-semibold uppercase tracking-[var(--text-overline--letter-spacing)] text-fg-2">
            <span aria-hidden="true" className="h-px w-8 bg-gold-400/70" />
            {hero.overline}
          </p>

          <h1 id="hero-title" className="text-hero text-fg">
            {titleLines.map((line) => (
              <span key={line.text} className="block">
                {line.words.map((word, i) => (
                  <span key={`${line.text}-${word}`}>
                    <Word index={line.start + i} accent={line.accent}>
                      {word}
                    </Word>{" "}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p className="mt-7 max-w-xl animate-[fade-in_0.8s_0.45s_var(--ease-soft)_both] text-lead text-fg-2">{hero.subtitle}</p>

          <div className="mt-9 flex animate-[fade-in_0.8s_0.55s_var(--ease-soft)_both] flex-wrap items-center gap-4">
            <Magnetic>
              <Button href={hero.primaryCta.href} size="lg" icon="arrow-right">
                {hero.primaryCta.label}
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href={hero.secondaryCta.href} variant="secondary" size="lg" icon="graduation" iconPosition="start">
                {hero.secondaryCta.label}
              </Button>
            </Magnetic>
          </div>

          <dl className="mt-12 grid max-w-xl animate-[fade-in_0.8s_0.65s_var(--ease-soft)_both] grid-cols-3 border-t border-line pt-6">
            {hero.keyNumbers.map((n, i) => (
              <div key={n.label} className={`flex flex-col ${i > 0 ? "border-l border-line pl-4 sm:pl-6" : "pr-2"}`}>
                <dt className="order-2 mt-1.5 text-[0.8125rem] leading-snug text-fg-2 sm:text-small">{n.label}</dt>
                <dd className="order-1 font-display text-[clamp(1.625rem,1.1rem+2vw,2.75rem)] font-bold leading-none tracking-[-0.04em]">
                  <CountUp {...n} className="text-gold" />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative lg:col-span-5 lg:-mr-6 xl:-mr-12">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
