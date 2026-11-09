import type { Metadata } from "next";
import { ContactLinks } from "@/components/sections/ContactLinks";
import { PageHero } from "@/components/sections/PageHero";
import { VibeGuide } from "@/components/sections/VibeGuide";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Book3D } from "@/components/ui/Book3D";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Libretto sul Vibe Coding",
  description: "Come si costruiscono siti e app descrivendo all'intelligenza artificiale cosa vuoi ottenere: il percorso passo per passo e l'estratto gratuito.",
  alternates: { canonical: "/vibe-coding" },
};

/** Il libro in 3D: si trascina per ruotarlo nello spazio. */
function Cover() {
  const v = site.vibeCoding;
  return <Book3D cover="/brand/vibe-cover.webp" alt={v.coverAlt} title="Vibe Coding" hint={v.dragHint} />;
}

export default function VibeCodingPage() {
  const v = site.vibeCoding;
  return (
    <>
      <PageHero
        overline={v.overline}
        title={v.title}
        line={v.line}
        crumbs={[{ label: "Risorse gratuite", href: "/risorse" }, { label: "Libretto Vibe Coding" }]}
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

      <section aria-label="Scarica il libretto" className="py-[clamp(1.5rem,3vw,2.5rem)]">
        <div className="container-x text-center">
          {/* su mobile la copertina compare qui, ben oltre la prima schermata */}
          <div className="mb-10 lg:hidden">
            <Cover />
          </div>
          <h2 className="text-[clamp(1.75rem,1.2rem+2.4vw,3rem)] font-bold leading-[1.08] tracking-[-0.035em] text-fg">Pronto a partire?</h2>
          <p className="mx-auto mt-4 max-w-xl text-lead text-fg-2">Scarica l&apos;estratto gratuito: sono le prime 10 pagine del libro.</p>
          <div className="mt-8 flex justify-center">
            <Button href={v.freeCta.href} target="_blank" rel="noopener noreferrer" size="xl" icon="download" iconPosition="start" pulse>
              {v.freeCta.label}
            </Button>
          </div>
        </div>
      </section>

      <ContactLinks />
    </>
  );
}
