"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TechBackdrop } from "@/components/ui/TechBackdrop";
import { Reveal } from "@/components/motion/Reveal";

type CSSVars = React.CSSProperties & { [key: `--${string}`]: string | number };

const sizes = "(min-width: 1024px) 30rem, 90vw";
/** Quanto si staccano i livelli lungo Z quando la scena è scomposta (px). */
const LAYERS = [
  { src: "/brand/triskell-layer-coils.png", z: 150, ly: "17%", base: "none" }, // le tre spirali: un unico pezzo, in alto
  { src: "/brand/triskell-layer-disc.png", z: 0, ly: "50%", base: "brightness(1.9) saturate(1.5)" }, // il disco blu al centro
  { src: "/brand/triskell-layer-ring.png", z: -150, ly: "83%", base: "none" }, // il cerchio oro in basso
] as const;

/**
 * Il simbolo, in 3D: mentre la sezione attraversa lo schermo il medaglione si inclina e i suoi tre livelli
 * (spirali in un unico pezzo, disco blu, cerchio oro) si staccano in verticale, con le etichette accanto;
 * uscendo dallo schermo si ricompongono. Il mouse inclina la scena. Con reduced motion: vista scomposta statica.
 */
export function SymbolSection() {
  const { symbol } = site;
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--e", "0.9");
      return;
    }
    let raf = 0;
    let near = false;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const d = Math.abs(r.top + r.height / 2 - vh * 0.5) / (vh * 0.62);
      const k = Math.min(1, Math.max(0, 1 - d));
      // plateau: resta scomposto per un tratto di scroll, poi si ricompone
      const e = Math.min(1, k * 1.6);
      el.style.setProperty("--e", (e * e * (3 - 2 * e)).toFixed(3));
    };
    const onScroll = () => {
      if (near && !raf) raf = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        near = !!entry?.isIntersecting;
        if (near) onScroll();
      },
      { rootMargin: "30% 0px" },
    );
    io.observe(el);
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = sceneRef.current;
    if (!el) return;
    const r = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
    el.style.setProperty("--tx", `${(nx * 9).toFixed(2)}deg`);
    el.style.setProperty("--ty", `${(-ny * 7).toFixed(2)}deg`);
  };
  const onPointerLeave = () => {
    sceneRef.current?.style.setProperty("--tx", "0deg");
    sceneRef.current?.style.setProperty("--ty", "0deg");
  };

  return (
    <Section id={symbol.id} labelledBy="symbol-title" className="overflow-x-clip">
      <TechBackdrop tone="mixed" />
      <div className="relative grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="mx-auto w-full max-w-[34rem] lg:col-span-6 lg:max-w-none" from="left" blur={0}>
          <div ref={sceneRef} className="sym3d" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
            <div className="relative mx-auto w-full max-w-[34rem]" role="img" aria-label={site.hero.symbolAlt}>
              <div className="relative aspect-square w-full sm:w-[calc(100%-9.5rem)]">
                <div className="sym3d-persp" aria-hidden="true">
                  <div className="sym3d-tilt">
                    <div className="sym3d-scene">
                      <div className="sym3d-sway">
                        {/* ombra e bagliore sul piano */}
                        <div className="sym3d-layer" style={{ "--z": -230 } as CSSVars}>
                          <div className="absolute inset-[-6%] rounded-full bg-[radial-gradient(circle,rgb(0_0_0/0.55),transparent_62%)]" />
                        </div>
                        {LAYERS.map((l, i) => (
                          <Image
                            key={l.src}
                            src={l.src}
                            alt=""
                            width={640}
                            height={640}
                            sizes={sizes}
                            className="sym3d-layer sym3d-lit"
                            style={{ "--z": l.z, "--i": i, "--base-f": l.base } as CSSVars}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* etichette dei tre livelli (su mobile: sotto la scena) */}
              <ul className="mt-6 grid grid-cols-3 gap-3 sm:mt-0 sm:block">
                {symbol.layers.map((l, i) => (
                  <li key={l.title} className="sym3d-label flex items-start gap-2 sm:w-[9rem]" style={{ "--ly": LAYERS[i]!.ly, "--i": i } as CSSVars}>
                    <span aria-hidden="true" className="mt-[0.45rem] hidden h-px w-5 shrink-0 bg-gold-300/70 sm:block" />
                    <span>
                      <span className="sym3d-label-title block font-display text-[0.9375rem] font-semibold leading-tight text-fg-2">{l.title}</span>
                      <span className="mt-0.5 block text-[0.75rem] leading-snug text-fg-3">{l.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-6">
          <SectionHeading id="symbol-title" overline={symbol.overline} title={symbol.title} line={symbol.line} />

          <ul className="mt-9 sm:mt-11">
            {symbol.pillars.map((p) => (
              <li key={p.from} className="relative border-t border-line last:border-b">
                <div className="flex items-start gap-5 py-5 sm:py-6">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-gold-400/35 bg-gold-300/10 text-gold-300">
                    <Icon name={p.icon} className="h-6 w-6" strokeWidth={1.6} />
                  </span>
                  <div>
                    <h3 className="flex flex-wrap items-baseline gap-x-3 text-h3 text-fg">
                      <span className="text-fg-2">{p.from}</span>
                      <Icon name="arrow-right" className="h-5 w-5 translate-y-0.5 text-gold-300" />
                      <span className="text-gold">{p.to}</span>
                    </h3>
                    <p className="mt-2 text-body text-fg-2">{p.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
