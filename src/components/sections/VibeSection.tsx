import { site } from "@/content/site";
import { VibeGuide } from "@/components/sections/VibeGuide";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Il libretto sul Vibe Coding, dentro la pagina delle risorse (ancora #vibe-coding): presentazione, punti chiave,
 * guida con il libro in 3D e invito a scaricare l'estratto gratuito.
 */
export function VibeSection() {
  const v = site.vibeCoding;
  return (
    <div id="vibe-coding" className="scroll-mt-[calc(var(--header-h)+0.5rem)]">
      <SectionDivider />
      <Section id="vibe-intro" labelledBy="vibe-title" className="pb-2">
        <SectionHeading id="vibe-title" overline={v.overline} title={v.title} line={v.line} align="center" />
        <Reveal y={16} blur={0} className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href={v.freeCta.href} target="_blank" rel="noopener noreferrer" size="lg" icon="download" iconPosition="start" pulse>
            {v.freeCta.label}
          </Button>
          <Button href={v.buyCta.href} target="_blank" rel="noopener noreferrer" variant="secondary" size="lg" icon="arrow-up-right">
            {v.buyCta.label}
          </Button>
        </Reveal>
        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {v.badges.map((b) => (
            <li key={b} className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-300/10 px-4 py-2 text-small font-semibold text-gold-200">
              <Icon name="check" className="h-4 w-4" strokeWidth={2.5} />
              {b}
            </li>
          ))}
        </ul>
      </Section>

      <VibeGuide />

      <section aria-label="Scarica il libretto" className="py-[clamp(1.5rem,3vw,2.5rem)]">
        <div className="container-x text-center">
          <h2 className="text-[clamp(1.75rem,1.2rem+2.4vw,3rem)] font-bold leading-[1.08] tracking-[-0.035em] text-fg">Pronto a partire?</h2>
          <p className="mx-auto mt-4 max-w-xl text-lead text-fg-2">Scarica l&apos;estratto gratuito: sono le prime 10 pagine del libro.</p>
          <div className="mt-8 flex justify-center">
            <Button href={v.freeCta.href} target="_blank" rel="noopener noreferrer" size="xl" icon="download" iconPosition="start" pulse>
              {v.freeCta.label}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
