import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { VibeGuide } from "@/components/sections/VibeGuide";
import { VibeStepPath } from "@/components/sections/VibeStepPath";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Tilt } from "@/components/ui/Tilt";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Libretto sul Vibe Coding",
  description: "Come si costruiscono siti e app descrivendo all'intelligenza artificiale cosa vuoi ottenere: il libro in 6 idee, il percorso passo per passo e l'estratto gratuito.",
  alternates: { canonical: "/vibe-coding" },
};

/** Elenco a "tendina" nativo (<details>): accessibile da tastiera, una voce aperta alla volta. */
function Disclosure({ name, items }: { name: string; items: Array<{ title: string; text: string }> }) {
  return (
    <div className="mx-auto max-w-3xl">
      {items.map((item, i) => (
        <details key={item.title} name={name} open={i === 0 && name === "idea"} className="group/d border-t border-line last:border-b">
          <summary className="flex cursor-pointer list-none items-center gap-5 py-6 [&::-webkit-details-marker]:hidden">
            <span className="w-8 shrink-0 font-display text-small font-semibold text-gold-400">{String(i + 1).padStart(2, "0")}</span>
            <span className="flex-1 font-display text-[clamp(1.0625rem,0.95rem+0.5vw,1.375rem)] font-semibold tracking-tight text-fg transition-colors group-hover/d:text-gold-200 group-open/d:text-gold-200">{item.title}</span>
            <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line-strong text-fg-2 transition-[transform,background-color,color,border-color] duration-[var(--dur-base)] ease-out-expo group-open/d:rotate-45 group-open/d:border-gold-300 group-open/d:bg-gold-300 group-open/d:text-night">
              <Icon name="plus" className="h-4 w-4" strokeWidth={2.2} />
            </span>
          </summary>
          <p className="pb-7 pl-[3.25rem] pr-4 text-body leading-relaxed text-fg-2">{item.text}</p>
        </details>
      ))}
    </div>
  );
}

/** Copertina del libro, con inclinazione 3D al mouse e bordi sfumati. */
function Cover({ lazy = false }: { lazy?: boolean }) {
  const v = site.vibeCoding;
  return (
    <Tilt max={9}>
      <div className="float-slow relative mx-auto w-[min(78vw,22rem)]">
        <div aria-hidden="true" className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgb(42_144_195/0.4),transparent_65%)]" />
        <Image
          src="/brand/vibe-coding-libro.webp"
          alt={v.coverAlt}
          width={1120}
          height={1400}
          sizes="(min-width: 1024px) 22rem, 78vw"
          loading={lazy ? "lazy" : "eager"}
          className="relative h-auto w-full rounded-3xl [mask-image:radial-gradient(ellipse_72%_72%_at_50%_50%,#000_58%,transparent_100%)]"
        />
      </div>
    </Tilt>
  );
}

export default function VibeCodingPage() {
  const v = site.vibeCoding;
  return (
    <>
      <PageHero
        overline={v.overline}
        title={v.title}
        line={v.line}
        crumbs={[{ label: "Libretto Vibe Coding" }]}
        asideClassName="max-lg:hidden"
        aside={<Cover />}
      >
        <Button href={v.freeCta.href} target="_blank" rel="noopener noreferrer" size="lg" icon="download" iconPosition="start" pulse>
          {v.freeCta.label}
        </Button>
        <Button href={v.buyCta.href} target="_blank" rel="noopener noreferrer" variant="secondary" size="lg" icon="arrow-up-right">
          {v.buyCta.label}
        </Button>
      </PageHero>

      <section aria-label="In breve" className="pb-4">
        <ul className="container-x flex flex-wrap justify-center gap-3">
          {v.badges.map((b) => (
            <li key={b} className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-300/10 px-4 py-2 text-small font-semibold text-gold-200">
              <Icon name="check" className="h-4 w-4" strokeWidth={2.5} />
              {b}
            </li>
          ))}
        </ul>
      </section>

      <VibeGuide />

      <Section id="idee" labelledBy="idee-title">
        <SectionHeading id="idee-title" overline="01" title={v.ideasTitle} line={v.ideasLine} align="center" />
        <Reveal className="mt-10" blur={0}>
          <Disclosure name="idea" items={v.ideas} />
        </Reveal>
      </Section>

      <Section id="percorso" labelledBy="percorso-title">
        <SectionHeading id="percorso-title" overline="02" title={v.stepsTitle} line={v.stepsLine} align="center" />
        <Reveal className="mt-10" blur={0}>
          <VibeStepPath />
        </Reveal>
      </Section>

      <Section id="domande" labelledBy="domande-title">
        <SectionHeading id="domande-title" overline="03" title={v.faqTitle} align="center" />
        <Reveal className="mt-10" blur={0}>
          <Disclosure name="faq" items={v.faq.map((f) => ({ title: f.q, text: f.a }))} />
        </Reveal>
      </Section>

      <section aria-label="Scarica il libretto" className="py-[clamp(1.5rem,3vw,2.5rem)]">
        <div className="container-x text-center">
          {/* su mobile la copertina compare qui, ben oltre la prima schermata */}
          <div className="mb-10 lg:hidden">
            <Cover lazy />
          </div>
          <h2 className="text-[clamp(1.75rem,1.2rem+2.4vw,3rem)] font-bold leading-[1.08] tracking-[-0.035em] text-fg">Pronto a partire?</h2>
          <p className="mx-auto mt-4 max-w-xl text-lead text-fg-2">Scarica l&apos;estratto gratuito: sono le prime 10 pagine del libro.</p>
          <div className="mt-8 flex justify-center">
            <Button href={v.freeCta.href} target="_blank" rel="noopener noreferrer" size="xl" icon="download" iconPosition="start" pulse>
              {v.freeCta.label}
            </Button>
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-small leading-relaxed text-fg-3">{v.disclaimer}</p>
        </div>
      </section>

      <CtaBand content={site.cta.generic} />
    </>
  );
}
