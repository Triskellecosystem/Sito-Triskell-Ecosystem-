"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

type CSSVars = React.CSSProperties & { [key: `--${string}`]: string | number };

/**
 * Le tre spirali del logo reale come settori conici (gradi in senso orario da "ore 12"),
 * misurati sul medaglione. Il nucleo (triangolo centrale) è un livello a parte, così non si spezza.
 */
const SECTORS = [
  { from: 320, span: 106, z: 70 },
  { from: 66, span: 135, z: 140 },
  { from: 201, span: 119, z: 210 },
] as const;
const CORE = { cx: "50.5%", cy: "48.5%", r: "14%" } as const;

const sizes = "(min-width: 1024px) 30rem, 90vw";

/**
 * Il simbolo, in 3D: il logo reale si scompone in livelli (fondo blu, anello, tre spirali, nucleo) che si
 * staccano in profondità mentre la sezione attraversa lo schermo, e si ricompongono quando esce. Il mouse
 * inclina la scena; la spirale del pilastro attivo si solleva e si illumina. Con reduced motion: vista
 * scomposta statica.
 */
export function SymbolSection() {
  const { symbol } = site;
  const [active, setActive] = useState<number | null>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--e", "0.72");
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
      el.style.setProperty("--e", (k * k * (3 - 2 * k)).toFixed(3));
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
      <div aria-hidden="true" className="pointer-events-none absolute left-[-10%] top-1/2 h-[40rem] w-[40rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(5_76_137/0.35),transparent_65%)]" />

      <div className="sym relative grid items-center gap-10 lg:grid-cols-12 lg:gap-12" data-active={active ?? undefined}>
        <Reveal className="mx-auto w-full max-w-[26rem] lg:col-span-5 lg:max-w-none" y={30} blur={0}>
          <div
            ref={sceneRef}
            className="sym3d relative mx-auto aspect-square w-full max-w-[30rem]"
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            role="img"
            aria-label={site.hero.symbolAlt}
          >
            <div className="sym3d-persp" aria-hidden="true">
              <div className="sym3d-tilt">
                <div className="sym3d-scene">
                  <div className="sym3d-sway">
                    {/* piano d'ombra e bagliore, in fondo alla scena */}
                    <div className="sym3d-layer" style={{ "--z": -190 } as CSSVars}>
                      <div className="absolute inset-[-10%] rounded-full bg-[radial-gradient(circle,rgb(0_0_0/0.6),transparent_62%)]" />
                    </div>
                    <div className="sym3d-layer" style={{ "--z": -170 } as CSSVars}>
                      <div className="absolute inset-[4%] rounded-full bg-[radial-gradient(circle,rgb(247_200_92/0.22),transparent_66%)]" />
                    </div>

                    <Image src="/brand/triskell-layer-disc.png" alt="" width={640} height={640} sizes={sizes} className="sym3d-layer" style={{ "--z": -90 } as CSSVars} />
                    <Image src="/brand/triskell-layer-ring.png" alt="" width={640} height={640} sizes={sizes} className="sym3d-layer" style={{ "--z": -25 } as CSSVars} />

                    {SECTORS.map((sec, i) => {
                      const mask = [
                        `conic-gradient(from ${sec.from}deg at 50% 50%, #000 0deg ${sec.span}deg, transparent ${sec.span}deg)`,
                        `radial-gradient(circle at ${CORE.cx} ${CORE.cy}, transparent 0 ${CORE.r}, #000 calc(${CORE.r} + 0.6%))`,
                      ].join(", ");
                      return (
                        <Image
                          key={sec.from}
                          src="/brand/triskell-layer-coils.png"
                          alt=""
                          width={640}
                          height={640}
                          sizes={sizes}
                          data-i={i}
                          className="sym3d-layer sym3d-coil"
                          style={{ "--z": sec.z, "--i": i, maskImage: mask, WebkitMaskImage: mask, maskComposite: "intersect", WebkitMaskComposite: "source-in" } as CSSVars}
                        />
                      );
                    })}
                    <Image
                      src="/brand/triskell-layer-coils.png"
                      alt=""
                      width={640}
                      height={640}
                      sizes={sizes}
                      className="sym3d-layer"
                      style={{
                        "--z": 285,
                        maskImage: `radial-gradient(circle at ${CORE.cx} ${CORE.cy}, #000 0 ${CORE.r}, transparent calc(${CORE.r} + 0.6%))`,
                        WebkitMaskImage: `radial-gradient(circle at ${CORE.cx} ${CORE.cy}, #000 0 ${CORE.r}, transparent calc(${CORE.r} + 0.6%))`,
                      } as CSSVars}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <SectionHeading id="symbol-title" overline={symbol.overline} title={symbol.title} line={symbol.line} />

          <ul className="mt-9 sm:mt-11" onPointerLeave={() => setActive(null)}>
            {symbol.pillars.map((p, i) => (
              <li key={p.from} onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)} className="relative border-t border-line last:border-b">
                <span aria-hidden="true" data-i={i} style={{ "--i": i } as CSSVars} className="sym-pillar-bar absolute inset-x-0 -top-px h-px bg-gold-300" />
                <div data-i={i} style={{ "--i": i } as CSSVars} className="sym-pillar flex items-start gap-5 py-6 sm:py-7">
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
