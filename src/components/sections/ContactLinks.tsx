import Image from "next/image";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

/**
 * "Seguici": prima un riquadro che dice quante persone ci seguono già, poi Instagram (video del feed dentro un telefono),
 * TikTok (profilo), YouTube (anteprima del canale) e i contatti diretti WhatsApp ed email.
 */
export function ContactLinks() {
  const { footer, brand } = site;
  const f = footer.follow;
  const yt = footer.social.find((s) => s.id === "youtube")!;
  const ig = footer.social.find((s) => s.id === "instagram")!;
  const tt = footer.social.find((s) => s.id === "tiktok")!;
  const wa = footer.social.find((s) => s.id === "whatsapp")!;
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

  return (
    <Section id="seguici" labelledBy="seguici-title" className="pt-[clamp(2rem,4vw,3.5rem)]">
      <TechBackdrop tone="mixed" rich />
      <SectionHeading id="seguici-title" overline={f.overline} title={f.title} line={f.line} align="center" />

      {/* In evidenza: quante persone ci seguono già */}
      <Reveal y={22} blur={0} className="mx-auto mt-10 max-w-5xl">
        <div className="proof-card relative overflow-hidden rounded-card border border-gold-300/60 bg-[linear-gradient(135deg,#2b2410,#0a1626_55%,#0b2a46)] p-6 text-center sm:p-8">
          <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(70%_100%_at_50%_0%,#000,transparent)]" />
          <p className="relative inline-flex items-center gap-2 text-overline font-semibold uppercase text-gold-300 tracking-[var(--text-overline--letter-spacing)]">
            <Icon name="users" className="h-4 w-4" strokeWidth={2} />
            La nostra community
          </p>
          <p className="relative mt-2 flex flex-wrap items-baseline justify-center gap-x-4 gap-y-1 font-display font-bold leading-none tracking-[-0.04em]">
            <span className="text-[clamp(1.25rem,1rem+1.2vw,1.75rem)] text-fg-2">{f.proof.lead}</span>
            <CountUp value={f.proof.value} suffix={f.proof.suffix} className="text-gold gold-breathe text-[clamp(3rem,2rem+5.5vw,5.75rem)]" />
            <span className="text-[clamp(1.25rem,1rem+1.2vw,1.75rem)] text-fg">{f.proof.text}</span>
          </p>
          <ul className="relative mt-6 flex flex-wrap items-center justify-center gap-2.5">
            {f.proof.chips.map((c) => (
              <li key={c.label} className="rounded-full border border-gold-400/35 bg-night/60 px-4 py-2 text-[0.9375rem] text-fg-2">
                <strong className="font-display font-bold text-gold-200">{c.value}</strong> {c.label}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <RevealGroup className="mx-auto mt-6 grid max-w-5xl gap-4 lg:grid-cols-6" stagger={0.1} alternate>
        {/* Instagram: testo + telefono con il feed che scorre */}
        <RevealItem y={26} className="lg:col-span-3">
          <a href={ig.href} {...ext} className="group/ig relative flex h-full flex-col overflow-hidden rounded-card border border-white/15 bg-[linear-gradient(150deg,#3b1a5f,#6a1b5e_45%,#a2305a)] p-5 transition-[box-shadow] duration-[var(--dur-base)] ease-out-expo hover:shadow-[0_0_50px_-12px_rgb(214_62_130/0.7)] sm:p-6">
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgb(247_200_92/0.35),transparent_70%)]" />
            <div className="relative flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/30 bg-white/10 text-white">
                <SocialIcon id="instagram" className="h-6 w-6" />
              </span>
              <div>
                <p className="font-display text-[1.25rem] font-bold leading-tight text-white">{f.instagram.title}</p>
                <p className="text-[0.9375rem] font-semibold text-white/90">{f.instagram.handle}</p>
              </div>
            </div>
            {/* il nostro profilo + il feed che scorre dentro un telefono */}
            <div className="relative mt-4 flex flex-1 items-center justify-center py-2" aria-hidden="true">
              <div className="relative w-[56%] -rotate-3 overflow-hidden rounded-2xl border border-white/20 bg-white shadow-[0_18px_40px_-14px_rgb(0_0_0/0.7)]">
                <Image src="/social/instagram-profile.webp" alt="" width={520} height={500} sizes="(min-width: 1024px) 14rem, 50vw" className="h-auto w-full" />
              </div>
              <div className="relative -ml-10 w-[40%] rotate-3 overflow-hidden rounded-[1.6rem] border-[5px] border-[#14101c] bg-black shadow-[0_24px_50px_-14px_rgb(0_0_0/0.8)]">
                <LoopVideo className="block aspect-[400/766] w-full object-cover" src="/social/instagram-feed.mp4" poster="/social/instagram-profile.webp" />
                <span className="absolute left-1/2 top-1.5 h-1.5 w-10 -translate-x-1/2 rounded-full bg-black/80" />
              </div>
            </div>
            <p className="relative text-[0.875rem] text-white/80">{f.instagram.text}</p>
            <dl className="relative mt-3 flex gap-5 text-white">
              {f.instagram.stats.map((st) => (
                <div key={st.l}>
                  <dt className="sr-only">{st.l}</dt>
                  <dd className="font-display text-[1.25rem] font-bold leading-none">{st.v}</dd>
                  <dd className="mt-1 text-[0.75rem] text-white/70">{st.l}</dd>
                </div>
              ))}
            </dl>
            <span className="relative mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-[0.9375rem] font-bold text-[#4a1553]">
              {f.instagram.cta}
              <Icon name="arrow-up-right" className="h-4 w-4" />
            </span>
          </a>
        </RevealItem>

        {/* TikTok */}
        <RevealItem y={26} className="lg:col-span-3">
          <a href={tt.href} {...ext} className="group/tt relative flex h-full flex-col overflow-hidden rounded-card border border-white/15 bg-[linear-gradient(150deg,#06121f,#0a1626_55%,#12202f)] p-5 transition-[border-color,box-shadow] duration-[var(--dur-base)] ease-out-expo hover:border-[#25f4ee]/60 hover:shadow-[0_0_50px_-14px_rgb(37_244_238/0.5)] sm:p-6">
            <div aria-hidden="true" className="pointer-events-none absolute -left-12 -top-12 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgb(37_244_238/0.22),transparent_70%)]" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-12 -right-12 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgb(254_44_85/0.25),transparent_70%)]" />
            <div className="relative flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/25 bg-black text-white shadow-[-2px_-2px_0_#25f4ee,2px_2px_0_#fe2c55]">
                <SocialIcon id="tiktok" className="h-6 w-6" />
              </span>
              <div>
                <p className="font-display text-[1.25rem] font-bold leading-tight text-fg">{f.tiktok.title}</p>
                <p className="text-[0.9375rem] font-semibold text-fg-2">{f.tiktok.handle}</p>
              </div>
            </div>
            <div className="relative mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white">
              <Image src="/social/tiktok-profile.webp" alt="Profilo TikTok di Triskell Ecosystem: 2460 follower e 9916 mi piace" width={520} height={500} sizes="(min-width: 1024px) 24rem, 90vw" className="h-auto w-full" />
            </div>
            <p className="relative mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-fg">
              {f.tiktok.stats.map((st) => (
                <span key={st.l}>
                  <strong className="font-display text-[1.25rem] font-bold">{st.v}</strong> <span className="text-[0.875rem] text-fg-2">{st.l}</span>
                </span>
              ))}
            </p>
            <p className="relative mt-1 inline-flex items-center gap-2 text-[0.875rem] text-fg-2">
              <Icon name="play" className="h-3.5 w-3.5 text-[#fe2c55]" fill="currentColor" />
              {f.tiktok.top}
            </p>
            <span className="relative mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-[#fe2c55] px-4 py-2 text-[0.9375rem] font-bold text-white">
              {f.tiktok.cta}
              <Icon name="arrow-up-right" className="h-4 w-4" />
            </span>
          </a>
        </RevealItem>

        {/* YouTube: anteprima del canale */}
        <RevealItem y={26} className="lg:col-span-6">
          <a href={`${yt.href}?sub_confirmation=1`} {...ext} className="group/yt relative grid h-full gap-5 overflow-hidden rounded-card border border-[#e5252a]/40 bg-[linear-gradient(150deg,#2a0c12,#0a1626_65%)] p-5 transition-[border-color,box-shadow] duration-[var(--dur-base)] ease-out-expo hover:border-[#ff6b63] hover:shadow-[0_0_50px_-14px_rgb(229_37_42/0.7)] sm:p-6 md:grid-cols-[1fr_1.35fr] md:items-center">
            <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgb(229_37_42/0.35),transparent_70%)]" />
            <div className="relative">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e5252a] text-white shadow-[0_0_24px_rgb(229_37_42/0.55)]">
                <SocialIcon id="youtube" className="h-6 w-6" />
              </span>
              <p className="mt-4 font-display text-[1.25rem] font-bold leading-tight text-fg">{f.youtube.title}</p>
              <p className="mt-1 text-[0.875rem] text-fg-2">{f.youtube.text}</p>
              <p className="mt-2 text-[0.875rem] font-semibold text-fg">{f.youtube.subs}</p>
              <span className="yt-sub mt-6 inline-flex items-center gap-2.5 rounded-full border-2 bg-night/60 px-5 py-2.5 font-display text-[1rem] font-bold text-fg">
                {f.youtube.cta}
                <Icon name="arrow-up-right" className="h-4 w-4 text-gold-300" />
              </span>
            </div>
            <div className="relative overflow-hidden rounded-xl border border-white/15 bg-white shadow-[0_24px_60px_-20px_rgb(0,0,0,0.8)]">
              <div className="flex items-center gap-1.5 border-b border-black/10 bg-[#f1f1f1] px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-[#e5252a]" />
                <span className="h-2 w-2 rounded-full bg-[#f5b400]" />
                <span className="h-2 w-2 rounded-full bg-[#2ba640]" />
                <span className="ml-2 truncate rounded-full bg-white px-3 py-0.5 text-[0.6875rem] text-[#606060]">youtube.com/@triskellecosystem</span>
              </div>
              <Image src="/social/youtube-channel.webp" alt="Anteprima del canale YouTube Triskell Ecosystem: 1K iscritti e 212 video" width={1400} height={788} sizes="(min-width: 768px) 34rem, 90vw" className="h-auto w-full transition-transform duration-[900ms] ease-out-expo group-hover/yt:scale-[1.02]" />
            </div>
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
