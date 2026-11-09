import Image from "next/image";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";


/**
 * "Seguici": quattro schede che fanno venire voglia di cliccare. YouTube ha un'anteprima con le copertine dei video e il
 * pulsante "Iscriviti"; Instagram, WhatsApp ed email sono schede con il loro colore e il contatto ben visibile.
 */
export function ContactLinks() {
  const { footer, brand } = site;
  const f = footer.follow;
  const yt = footer.social.find((s) => s.id === "youtube")!;
  const ig = footer.social.find((s) => s.id === "instagram")!;
  const wa = footer.social.find((s) => s.id === "whatsapp")!;
  const vids = site.academyPage.courses.youtube.videos.slice(0, 3);
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

  return (
    <Section id="seguici" labelledBy="seguici-title" className="pt-[clamp(2rem,4vw,3.5rem)]">
      <TechBackdrop tone="mixed" rich />
      <SectionHeading id="seguici-title" overline={f.overline} title={f.title} line={f.line} align="center" />

      <RevealGroup className="mx-auto mt-10 grid max-w-5xl gap-4 lg:grid-cols-6" stagger={0.1} alternate>
        {/* YouTube con anteprima */}
        <RevealItem y={26} className="lg:col-span-4">
          <a href={`${yt.href}?sub_confirmation=1`} {...ext} className="group/yt relative block h-full overflow-hidden rounded-card border border-[#e5252a]/40 bg-[linear-gradient(150deg,#2a0c12,#0a1626_65%)] p-5 transition-[border-color,box-shadow] duration-[var(--dur-base)] ease-out-expo hover:border-[#ff6b63] hover:shadow-[0_0_50px_-14px_rgb(229_37_42/0.7)] sm:p-6">
            <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgb(229_37_42/0.35),transparent_70%)]" />
            <div className="relative flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e5252a] text-white shadow-[0_0_24px_rgb(229_37_42/0.55)]">
                <SocialIcon id="youtube" className="h-6 w-6" />
              </span>
              <div>
                <p className="font-display text-[1.25rem] font-bold leading-tight text-fg">{f.youtube.title}</p>
                <p className="text-[0.875rem] text-fg-2">{f.youtube.text}</p>
              </div>
            </div>
            <ul className="relative mt-5 grid grid-cols-3 gap-2.5">
              {vids.map((v, k) => (
                <li key={v.id} className="overflow-hidden rounded-xl border border-white/10" style={{ transform: `translateY(${k === 1 ? 6 : 0}px)` }}>
                  <div className="relative aspect-video">
                    <Image src={`/youtube/${v.id}.jpg`} alt="" fill sizes="(min-width: 1024px) 14rem, 30vw" className="object-cover transition-transform duration-[900ms] ease-out-expo group-hover/yt:scale-[1.06]" />
                    <span aria-hidden="true" className="absolute inset-0 grid place-items-center bg-night/20">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-[#e5252a]/90 text-white">
                        <Icon name="play" className="h-3.5 w-3.5" fill="currentColor" />
                      </span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <span className="yt-sub relative mt-6 inline-flex items-center gap-2.5 rounded-full border-2 bg-night/60 px-5 py-2.5 font-display text-[1rem] font-bold text-fg">
              {f.youtube.cta}
              <Icon name="arrow-up-right" className="h-4 w-4 text-gold-300" />
            </span>
          </a>
        </RevealItem>

        {/* Instagram */}
        <RevealItem y={26} className="lg:col-span-2">
          <a href={ig.href} {...ext} className="group/ig relative flex h-full flex-col justify-between overflow-hidden rounded-card border border-white/15 bg-[linear-gradient(150deg,#3b1a5f,#6a1b5e_45%,#a2305a)] p-5 transition-[box-shadow,transform] duration-[var(--dur-base)] ease-out-expo hover:shadow-[0_0_50px_-12px_rgb(214_62_130/0.7)] sm:p-6">
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgb(247_200_92/0.35),transparent_70%)]" />
            <div className="relative">
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/30 bg-white/10 text-white">
                <SocialIcon id="instagram" className="h-6 w-6" />
              </span>
              <p className="mt-4 font-display text-[1.25rem] font-bold text-white">{f.instagram.title}</p>
              <p className="mt-1 text-[0.9375rem] font-semibold text-white/90">@triskell_ecosystem</p>
              <p className="mt-1 text-[0.875rem] text-white/75">{f.instagram.text}</p>
            </div>
            <span className="relative mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-[0.9375rem] font-bold text-[#4a1553]">
              {f.instagram.cta}
              <Icon name="arrow-up-right" className="h-4 w-4" />
            </span>
          </a>
        </RevealItem>

        {/* WhatsApp */}
        <RevealItem y={26} className="lg:col-span-3">
          <a href={wa.href} {...ext} className="group/wa relative flex h-full items-center gap-5 overflow-hidden rounded-card border border-[#25d366]/40 bg-[linear-gradient(150deg,#06301f,#0a1626_70%)] p-5 transition-[border-color,box-shadow] duration-[var(--dur-base)] ease-out-expo hover:border-[#25d366] hover:shadow-[0_0_46px_-14px_rgb(37_211_102/0.6)] sm:p-6">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#25d366] text-[#06301f]">
              <SocialIcon id="whatsapp" className="h-7 w-7" />
            </span>
            <div className="min-w-0">
              <p className="font-display text-[1.25rem] font-bold text-fg">{f.whatsapp.title}</p>
              <p className="text-[1rem] font-semibold text-fg">{brand.phone}</p>
              <p className="text-[0.875rem] text-fg-2">{f.whatsapp.text}</p>
            </div>
            <span className="ml-auto hidden shrink-0 rounded-full border border-[#25d366]/60 px-4 py-2 text-[0.875rem] font-bold text-[#7dffb0] sm:inline-flex">{f.whatsapp.cta}</span>
          </a>
        </RevealItem>

        {/* Email */}
        <RevealItem y={26} className="lg:col-span-3">
          <a href={`mailto:${brand.email}`} className="group/em relative flex h-full items-center gap-5 overflow-hidden rounded-card border border-gold-400/40 bg-[linear-gradient(150deg,#2b2410,#0a1626_70%)] p-5 transition-[border-color,box-shadow] duration-[var(--dur-base)] ease-out-expo hover:border-gold-300 hover:shadow-glow-gold sm:p-6">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-gold-400/50 bg-gold-300/10 text-gold-300">
              <Icon name="send" className="h-6 w-6" strokeWidth={1.7} />
            </span>
            <div className="min-w-0">
              <p className="font-display text-[1.25rem] font-bold text-fg">{f.email.title}</p>
              <p className="break-all text-[1rem] font-semibold text-gold-200">{brand.email}</p>
              <p className="text-[0.875rem] text-fg-2">{f.email.cta}</p>
            </div>
          </a>
        </RevealItem>
      </RevealGroup>
    </Section>
  );
}
