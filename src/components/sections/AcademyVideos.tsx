import { site } from "@/content/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { YouTubeFacade } from "./YouTubeFacade";

/** Tutorial video (facade YouTube leggera: nessun iframe all'avvio). Vive nella pagina Academy. */
export function AcademyVideos() {
  const { academy, academyPage } = site;
  return (
    <Section id="tutorial" labelledBy="videos-title">
      <SectionHeading id="videos-title" overline="Video" title={academyPage.videosTitle} line={academyPage.videosLine} />
      <RevealGroup className="mt-10 grid gap-4 sm:mt-12 md:grid-cols-3" stagger={0.12}>
        {academy.tutorials.map((t) => (
          <RevealItem key={t.title} y={30}>
            <YouTubeFacade tutorial={t} size="sm" />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
