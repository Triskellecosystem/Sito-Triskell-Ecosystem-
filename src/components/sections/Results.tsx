import { site } from "@/content/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ResultsCarousel } from "./ResultsCarousel";

/**
 * Risultati: titolo fisso a sinistra (4/12) e carousel che "sfora" fino al bordo destro dello schermo (8/12),
 * come nella grafica di riferimento. KPI grandi in oro, settore e durata come chip.
 */
export function Results() {
  const { results } = site;
  return (
    <Section id={results.id} labelledBy="results-title" className="overflow-x-clip">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4 lg:pt-4">
          <SectionHeading id="results-title" overline={results.overline} title={results.title} line={results.line} />
        </div>
        <Reveal className="min-w-0 lg:col-span-8" from="right" blur={0}>
          <ResultsCarousel />
        </Reveal>
      </div>
    </Section>
  );
}
