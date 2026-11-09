"use client";

import Image from "next/image";
import { useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

/**
 * Lettore video accanto al titolo dell'Academy: una lezione in cui Tomaso parla e spiega (dal canale YouTube, in attesa
 * dei video della piattaforma, che sono dietro login). Facade leggera: la copertina vera con il pulsante play; l'iframe
 * (youtube-nocookie) si carica solo al click. Sotto, altre due lezioni tra cui scegliere.
 */
export function LessonPlayer() {
  const c = site.academyPage.courses;
  const list = c.youtube.videos.slice(0, 3);
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const cur = list[i]!;

  return (
    <figure className="relative mx-auto w-full max-w-[34rem]" aria-label="Lezione video di Tomaso">
      <div aria-hidden="true" className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgb(42_144_195/0.35),transparent_66%)]" />
      <div className="relative overflow-hidden rounded-card border border-azure-400/40 bg-[linear-gradient(160deg,var(--color-surface-2),var(--color-night))] shadow-[0_40px_90px_-30px_rgb(0_0_0/0.9)]">
        <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-gold-300" />
          <span className="h-2 w-2 rounded-full bg-line-strong" />
          <span className="h-2 w-2 rounded-full bg-line-strong" />
          <span className="ml-2 truncate text-[0.75rem] font-semibold text-fg-2">{c.player.label}</span>
        </div>

        <div className="relative aspect-video bg-night">
          {playing ? (
            <iframe
              key={cur.id}
              src={`https://www.youtube-nocookie.com/embed/${cur.id}?autoplay=1&rel=0&modestbranding=1`}
              title={cur.title}
              allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button type="button" onClick={() => setPlaying(true)} className="group/p absolute inset-0 block w-full" aria-label={`Guarda il video: ${cur.title}`}>
              <Image key={cur.id} src={`/youtube/${cur.id}.jpg`} alt="" fill priority sizes="(min-width: 1024px) 34rem, 92vw" className="object-cover transition-transform duration-[900ms] ease-out-expo group-hover/p:scale-[1.04]" />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-night/10" />
              <span aria-hidden="true" className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[image:var(--gradient-gold-btn)] text-night shadow-glow-gold transition-transform duration-[var(--dur-base)] group-hover/p:scale-110">
                <span className="btn-ping absolute inset-0 rounded-full border-2 border-gold-200" />
                <Icon name="play" className="ml-1 h-7 w-7" fill="currentColor" />
              </span>
            </button>
          )}
        </div>

        <div className="p-4 sm:p-5">
          <p className="font-display text-[1.0625rem] font-semibold leading-snug tracking-tight text-fg">{cur.title}</p>
          <ul className="mt-4 grid grid-cols-3 gap-2.5">
            {list.map((v, k) => (
              <li key={v.id}>
                <button
                  type="button"
                  onClick={() => {
                    setI(k);
                    setPlaying(false);
                  }}
                  aria-pressed={k === i}
                  aria-label={v.title}
                  className={cn("relative block aspect-video w-full overflow-hidden rounded-lg border-2 transition-[border-color,opacity] duration-[var(--dur-base)]", k === i ? "border-gold-300" : "border-transparent opacity-70 hover:opacity-100")}
                >
                  <Image src={`/youtube/${v.id}.jpg`} alt="" fill sizes="10rem" className="object-cover" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption className="mt-5 text-center text-small text-fg-3">{c.player.caption}</figcaption>
    </figure>
  );
}
