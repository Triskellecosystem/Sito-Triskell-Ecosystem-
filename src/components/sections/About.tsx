"use client";

import { useId, useState } from "react";
import { site, type TeamMember } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { Spotlight } from "@/components/ui/Spotlight";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

/** Ritratto stilizzato (silhouette) al posto della foto: si sostituisce con l'immagine vera. */
function Portrait({ initials }: { initials: string }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-[linear-gradient(160deg,var(--color-cobalt-600),var(--color-night-glow)_58%,var(--color-surface))]">
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
      <div aria-hidden="true" className="absolute left-1/2 top-[30%] h-[70%] w-[90%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(42_144_195/0.5),transparent_66%)]" />
      <svg viewBox="0 0 400 430" aria-hidden="true" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id={`body-${initials}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--color-cobalt-400)" />
            <stop offset="0.55" stopColor="var(--color-cobalt-700)" />
            <stop offset="1" stopColor="var(--color-night-glow)" />
          </linearGradient>
          <linearGradient id={`rim-${initials}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--color-gold-200)" stopOpacity="0.9" />
            <stop offset="0.5" stopColor="var(--color-gold-200)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* spalle e busto */}
        <path d="M30 430c0-92 58-138 120-154 18-5 30-14 36-30h28c6 16 18 25 36 30 62 16 120 62 120 154z" fill={`url(#body-${initials})`} />
        <path d="M30 430c0-92 58-138 120-154" fill="none" stroke={`url(#rim-${initials})`} strokeWidth="3" />
        {/* collo e testa */}
        <rect x="180" y="214" width="40" height="52" rx="16" fill="var(--color-cobalt-700)" />
        <ellipse cx="200" cy="158" rx="54" ry="68" fill="var(--color-cobalt-500)" />
        <ellipse cx="200" cy="158" rx="54" ry="68" fill="none" stroke={`url(#rim-${initials})`} strokeWidth="3" />
      </svg>
      <span aria-hidden="true" className="absolute bottom-3 right-4 font-display text-[4.5rem] font-bold leading-none text-gold opacity-20">
        {initials}
      </span>
    </div>
  );
}

function MemberCard({ m }: { m: TeamMember }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const { about } = site;
  return (
    <Spotlight className={cn("group/card h-full rounded-card border border-line bg-surface transition-[border-color,box-shadow] duration-[var(--dur-base)] ease-out-expo hover:border-gold-400/50 hover:shadow-[0_0_44px_-14px_rgb(247_200_92/0.4)]")}>
      <article className="relative z-[2] flex h-full flex-col">
        <Portrait initials={m.initials} />
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <h3 className="text-[clamp(1.5rem,1.3rem+0.8vw,2rem)] font-bold leading-none tracking-[-0.03em] text-fg">{m.name}</h3>
          <p className="mt-2 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-gold-400">{m.role}</p>
          <p className="mt-4 font-display text-[1.0625rem] font-semibold leading-snug tracking-tight text-fg sm:min-h-[3.1rem]">{m.headline}</p>
          <p className="mt-2 text-[0.9375rem] leading-snug text-fg-2 sm:min-h-[4.2rem]">{m.bio}</p>

          <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-line pt-4">
            {m.facts.map((f) => (
              <div key={f.label}>
                <dd className="font-display text-[clamp(1.125rem,1rem+0.5vw,1.4375rem)] font-bold leading-none tracking-[-0.03em] text-gold">{f.value}</dd>
                <dt className="mt-1.5 text-[0.6875rem] leading-tight text-fg-2">{f.label}</dt>
              </div>
            ))}
          </dl>

          <button
            type="button"
            aria-expanded={open}
            aria-controls={id}
            onClick={() => setOpen((v) => !v)}
            className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-gold-400/50 px-4 py-2 text-[0.8125rem] font-semibold text-gold-200 transition-[background-color,border-color,box-shadow] duration-[var(--dur-base)] hover:border-gold-300 hover:bg-gold-300/10 hover:shadow-[0_0_30px_-6px_rgb(247_200_92/0.5)] active:bg-gold-300/20"
          >
            {open ? about.less : about.more}
            <Icon name="chevron-down" className={cn("h-4 w-4 transition-transform duration-[var(--dur-base)] ease-out-expo", open && "rotate-180")} />
          </button>

          {/* percorso "ad espansione" */}
          <div id={id} role="region" aria-label={`Percorso di ${m.name}`} data-open={open} className="acc-panel">
            <div>
              <ol className="relative mt-6 space-y-4 border-l-2 border-gold-400/40 pl-6">
                {m.curriculum.map((step, i) => (
                  <li key={step} className="relative text-body text-fg" style={{ transitionDelay: open ? `${i * 70}ms` : "0ms" }}>
                    <span aria-hidden="true" className="absolute -left-[1.9375rem] top-1.5 h-3 w-3 rounded-full border-2 border-gold-300 bg-night" />
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </article>
    </Spotlight>
  );
}

/**
 * Chi siamo: due card ritratto allineate (stessa altezza, stessi punti di riferimento). Ognuna ha titolo, numeri chiave
 * e un percorso professionale che si espande al click. Foto e curriculum sono segnaposto da sostituire.
 */
export function About() {
  const { about } = site;
  return (
    <Section id="team" labelledBy="team-title" className="pt-[clamp(1rem,2vw,2rem)]">
      <h2 id="team-title" className="sr-only">
        {about.title.replace(/[[\]]/g, "")}
      </h2>
      <RevealGroup className="grid gap-6 md:grid-cols-2 lg:mx-auto lg:max-w-5xl lg:gap-10" stagger={0.18} alternate>
        {about.team.map((m) => (
          <RevealItem key={m.name} y={40} className="h-full">
            <MemberCard m={m} />
          </RevealItem>
        ))}
      </RevealGroup>
      <Reveal className="sr-only">
        <p>{about.line}</p>
      </Reveal>
    </Section>
  );
}
