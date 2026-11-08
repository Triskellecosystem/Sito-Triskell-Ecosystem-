import { site } from "@/content/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { PathColumn } from "./PathColumn";

/** "Cosa ottieni": due colonne affiancate, Agency e Academy, con lo stesso schema ordinato di step. */
export function Paths() {
  const { paths } = site;
  return (
    <Section id="percorsi" labelledBy="paths-title">
      <SectionHeading id="paths-title" overline={paths.overline} title={paths.title} line={paths.line} />
      <RevealGroup className="mt-10 grid gap-5 sm:mt-14 lg:grid-cols-2 lg:gap-6" stagger={0.14}>
        <RevealItem y={36}>
          <PathColumn path={paths.agency} tone="gold" />
        </RevealItem>
        <RevealItem y={36}>
          <PathColumn path={paths.academy} tone="azure" />
        </RevealItem>
      </RevealGroup>
    </Section>
  );
}
