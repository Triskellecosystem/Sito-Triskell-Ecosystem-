"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

/**
 * Lettore video accanto al titolo dell'Academy: una lezione in cui Tomaso parla e spiega. Il video parte dentro la
 * pagina, ritagliato in modo che titolo e barre del lettore restano fuori vista, con comandi nostri (play/pausa, audio).
 * Sotto, una fila di copertine scorrevole (frecce, trascinamento, tastiera) per scegliere un altro video del canale.
 * L'iframe (youtube-nocookie) si carica solo al click. Le lezioni della piattaforma sono dietro login.
 */
export function LessonPlayer() {
  const c = site.academyPage.courses;
  const list = c.youtube.videos;
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  const strip = useRef<HTMLUListElement>(null);
  const cur = list[i]!;

  const cmd = (func: string) => frame.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args: [] }), "*");
  const pick = (k: number) => {
    setI(k);
    setPlaying(true);
    setPaused(false);
    setMuted(false);
  };

  // Trascinamento col mouse (con inerzia): la fila si sposta fluida, senza scatti; il touch usa lo scorrimento nativo.
  const drag = useRef({ down: false, moved: false, startX: 0, startLeft: 0, lastX: 0, lastT: 0, v: 0, raf: 0 });
  useEffect(() => {
    const d = drag.current;
    return () => cancelAnimationFrame(d.raf);
  }, []);
  const onDown = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || !strip.current) return;
    const d = drag.current;
    cancelAnimationFrame(d.raf);
    Object.assign(d, { down: true, moved: false, startX: e.clientX, startLeft: strip.current.scrollLeft, lastX: e.clientX, lastT: performance.now(), v: 0 });
  };
  const onMove = (e: React.PointerEvent<HTMLUListElement>) => {
    const d = drag.current;
    const el = strip.current;
    if (!d.down || !el) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      el.setPointerCapture(e.pointerId);
      el.dataset.dragging = "";
    }
    if (!d.moved) return;
    el.scrollLeft = d.startLeft - dx;
    const now = performance.now();
    const dt = Math.max(1, now - d.lastT);
    d.v = 0.8 * d.v + 0.2 * ((d.lastX - e.clientX) / dt);
    d.lastX = e.clientX;
    d.lastT = now;
  };
  const onUp = () => {
    const d = drag.current;
    const el = strip.current;
    if (!d.down || !el) return;
    d.down = false;
    delete el.dataset.dragging;
    if (!d.moved) return;
    let v = d.v * 16; // px per frame
    if (performance.now() - d.lastT > 80) v = 0;
    const step = () => {
      if (Math.abs(v) < 0.3) return;
      el.scrollLeft += v;
      v *= 0.94;
      d.raf = requestAnimationFrame(step);
    };
    d.raf = requestAnimationFrame(step);
  };
  const scroll = (dir: 1 | -1) => strip.current?.scrollBy({ left: dir * strip.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <figure className="relative mx-auto w-full max-w-[34rem]" aria-label="Lezioni video di Tomaso">
      <div aria-hidden="true" className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgb(42_144_195/0.35),transparent_66%)]" />
      <div className="relative overflow-hidden rounded-card border border-azure-400/40 bg-[linear-gradient(160deg,var(--color-surface-2),var(--color-night))] shadow-[0_40px_90px_-30px_rgb(0_0_0/0.9)]">
        <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-gold-300" />
          <span className="h-2 w-2 rounded-full bg-line-strong" />
          <span className="h-2 w-2 rounded-full bg-line-strong" />
          <span className="ml-2 truncate text-[0.75rem] font-semibold text-fg-2">{c.player.label}</span>
        </div>

        <div className="relative aspect-video overflow-hidden bg-night">
          {playing ? (
            <>
              <iframe
                ref={frame}
                key={cur.id}
                src={`https://www.youtube-nocookie.com/embed/${cur.id}?autoplay=1&controls=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&playsinline=1&enablejsapi=1&fs=0`}
                title={cur.title}
                allow="autoplay; encrypted-media; picture-in-picture"
                className="vp-crop"
              />
              {/* comandi nostri */}
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-night/85 to-transparent px-3 pb-3 pt-8">
                <button
                  type="button"
                  aria-label={paused ? "Riprendi" : "Pausa"}
                  onClick={() => {
                    cmd(paused ? "playVideo" : "pauseVideo");
                    setPaused((v) => !v);
                  }}
                  className="grid h-9 w-9 place-items-center rounded-full bg-gold-300 text-night shadow-glow-gold"
                >
                  <Icon name={paused ? "play" : "pause"} className="h-4 w-4" fill="currentColor" />
                </button>
                <button
                  type="button"
                  aria-label={muted ? "Attiva l'audio" : "Disattiva l'audio"}
                  aria-pressed={muted}
                  onClick={() => {
                    cmd(muted ? "unMute" : "mute");
                    setMuted((v) => !v);
                  }}
                  className="grid h-9 w-9 place-items-center rounded-full border border-line-strong bg-night/60 text-fg"
                >
                  <Icon name={muted ? "volume-off" : "volume"} className="h-4 w-4" />
                </button>
                <p className="ml-1 min-w-0 flex-1 truncate text-[0.75rem] font-medium text-fg-2">{cur.title}</p>
                <button type="button" aria-label="Chiudi il video" onClick={() => setPlaying(false)} className="grid h-9 w-9 place-items-center rounded-full border border-line-strong bg-night/60 text-fg">
                  <Icon name="close" className="h-4 w-4" />
                </button>
              </div>
            </>
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
          <div className="relative mt-4">
            <ul
              ref={strip}
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
              onClickCapture={(e) => {
                if (drag.current.moved) {
                  e.preventDefault();
                  e.stopPropagation();
                  drag.current.moved = false;
                }
              }}
              className="no-scrollbar flex cursor-grab touch-pan-x select-none gap-2.5 overflow-x-auto pb-1 data-[dragging]:cursor-grabbing"
              aria-label="Altri video del canale (trascina per scorrere)"
            >
              {list.map((v, k) => (
                <li key={v.id} className="w-[31%] shrink-0">
                  <button
                    type="button"
                    onClick={() => pick(k)}
                    aria-pressed={k === i}
                    aria-label={v.title}
                    className={cn("relative block aspect-video w-full overflow-hidden rounded-lg border-2 transition-[border-color,opacity] duration-[var(--dur-base)]", k === i ? "border-gold-300" : "border-transparent opacity-75 hover:opacity-100")}
                  >
                    <Image src={`/youtube/${v.id}.jpg`} alt="" fill sizes="10rem" draggable={false} className="pointer-events-none object-cover" />
                  </button>
                </li>
              ))}
            </ul>
            <button type="button" aria-label="Video precedenti" onClick={() => scroll(-1)} className="absolute -left-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-night/90 text-fg shadow-card hover:border-gold-300 hover:text-gold-300">
              <Icon name="chevron-left" className="h-4 w-4" />
            </button>
            <button type="button" aria-label="Video successivi" onClick={() => scroll(1)} className="absolute -right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-night/90 text-fg shadow-card hover:border-gold-300 hover:text-gold-300">
              <Icon name="chevron-right" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      <figcaption className="mt-5 text-center text-small text-fg-3">{c.player.caption}</figcaption>
    </figure>
  );
}
