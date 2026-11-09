import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { Reveal } from "@/components/motion/Reveal";

const HANDLE: Record<string, string> = {
  instagram: "@triskell_ecosystem",
  youtube: "@triskellecosystem",
  whatsapp: "+39 348 430 1500",
};

/** Contatti diretti (Instagram, YouTube, WhatsApp): una riga sottile, al posto di una fascia "Prenota" in pagine piccole. */
export function ContactLinks() {
  const { footer } = site;
  return (
    <section aria-label="Contatti" className="relative py-[clamp(2rem,4vw,3.5rem)]">
      <div className="container-x">
        <Reveal y={20} blur={0}>
          <p className="text-center text-overline font-semibold uppercase tracking-[var(--text-overline--letter-spacing)] text-gold-400">{footer.socialTitle}</p>
          <ul className="mx-auto mt-5 flex max-w-3xl flex-wrap justify-center gap-3">
            {footer.social.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/c inline-flex items-center gap-3 rounded-full border border-line-strong bg-surface/70 py-2.5 pl-3 pr-5 transition-[border-color,box-shadow,background-color] duration-[var(--dur-base)] ease-out-expo hover:border-gold-300 hover:bg-gold-300/10 hover:shadow-[0_0_30px_-6px_rgb(247_200_92/0.5)]"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-gold-400/45 bg-gold-300/10 text-gold-300">
                    <SocialIcon id={s.id} className="h-5 w-5" />
                  </span>
                  <span className="text-left leading-tight">
                    <span className="block font-display text-[1rem] font-semibold text-fg">{s.label}</span>
                    <span className="block text-[0.8125rem] text-fg-2">{HANDLE[s.id]}</span>
                  </span>
                  <Icon name="arrow-up-right" className="h-4 w-4 text-gold-300" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
