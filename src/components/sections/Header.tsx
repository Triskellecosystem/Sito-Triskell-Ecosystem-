"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { getLenis } from "@/lib/lenis";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const SPY_IDS = ["agency", "academy", "chi-siamo"] as const;

/** Header sticky con blur. Si compatta allo scroll (solo transform). Logo a destra. */
export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [moreOpen, setMoreOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const moreRef = useRef<HTMLLIElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const href = useCallback((hash: string) => (hash.startsWith("#") && !isHome ? `/${hash}` : hash), [isHome]);

  /* Compattamento allo scroll */
  useEffect(() => {
    let ticking = false;
    const update = () => {
      setCompact(window.scrollY > 24);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Scrollspy (solo home) */
  useEffect(() => {
    if (!isHome) return;
    const els = SPY_IDS.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
          else setActive((cur) => (cur === e.target.id ? null : cur));
        });
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isHome]);

  /* Dropdown "Altro": click fuori + Esc */
  useEffect(() => {
    if (!moreOpen) return;
    const onDown = (e: PointerEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [moreOpen]);

  /* Menu mobile: blocco scroll, focus, Esc, trap del Tab */
  const closeMenu = useCallback((restoreFocus = true) => {
    document.documentElement.classList.remove("menu-open");
    getLenis()?.start();
    setMenuOpen(false);
    if (restoreFocus) menuButtonRef.current?.focus();
  }, []);

  const openMenu = () => {
    document.documentElement.classList.add("menu-open");
    getLenis()?.stop();
    setMenuOpen(true);
  };

  useEffect(() => {
    if (!menuOpen) return;
    closeButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  /* Chiude il menu al cambio rotta o se si passa a desktop */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 64rem)");
    const onChange = () => mq.matches && menuOpen && closeMenu(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [menuOpen, closeMenu]);

  const mobileItems = [...site.nav.items, ...site.nav.more.items];

  return (
    <>
      <header data-compact={compact || undefined} className="group/header fixed inset-x-0 top-0 z-50">
        {/* Pannello blur: appare e si accorcia con transform/opacity */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 origin-top border-b border-line bg-night/70 transition-[transform,opacity] duration-[var(--dur-slow)] ease-out-expo",
            compact ? "scale-y-[0.78] opacity-100 backdrop-blur-xl" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "container-x relative flex h-[var(--header-h)] items-center justify-between transition-transform duration-[var(--dur-slow)] ease-out-expo",
            compact && "-translate-y-2",
          )}
        >
          <div className="flex items-center gap-8">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={openMenu}
              aria-label={site.nav.menuOpen}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="-ml-2 inline-flex h-11 w-11 items-center justify-center rounded-xl text-fg transition-colors hover:text-gold-300 lg:hidden"
            >
              <Icon name="menu" className="h-6 w-6" />
            </button>

            <nav aria-label="Principale" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {site.nav.items.map((item) => {
                  const id = item.href.replace("#", "");
                  const isActive = active === id;
                  return (
                    <li key={item.href}>
                      <Link
                        href={href(item.href)}
                        aria-current={isActive ? "true" : undefined}
                        className="group/link relative inline-flex h-11 items-center px-4 text-[0.9375rem] font-medium text-fg-2 transition-colors hover:text-fg aria-[current=true]:text-fg"
                      >
                        {item.label}
                        <span
                          aria-hidden="true"
                          className={cn(
                            "absolute inset-x-4 bottom-2 h-px origin-left scale-x-0 bg-gold-300 transition-transform duration-[var(--dur-base)] ease-out-expo group-hover/link:scale-x-100",
                            isActive && "scale-x-100",
                          )}
                        />
                      </Link>
                    </li>
                  );
                })}
                <li
                  ref={moreRef}
                  className="relative"
                  onPointerEnter={(e) => e.pointerType === "mouse" && setMoreOpen(true)}
                  onPointerLeave={(e) => e.pointerType === "mouse" && setMoreOpen(false)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) setMoreOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape" && moreOpen) {
                      setMoreOpen(false);
                      moreButtonRef.current?.focus();
                    }
                  }}
                >
                  <button
                    ref={moreButtonRef}
                    type="button"
                    aria-expanded={moreOpen}
                    aria-controls="nav-more"
                    onClick={() => setMoreOpen((v) => !v)}
                    className="inline-flex h-11 items-center gap-1.5 px-4 text-[0.9375rem] font-medium text-fg-2 transition-colors hover:text-fg"
                  >
                    {site.nav.more.label}
                    <Icon
                      name="chevron-down"
                      className={cn("h-4 w-4 transition-transform duration-[var(--dur-base)] ease-out-expo", moreOpen && "rotate-180")}
                    />
                  </button>
                  <AnimatePresence>
                    {moreOpen && (
                      <m.ul
                        id="nav-more"
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-0 top-full z-10 mt-1 w-64 origin-top-left rounded-2xl border border-line-strong bg-surface-2/95 p-2 shadow-card backdrop-blur-xl"
                      >
                        {site.nav.more.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              onClick={() => setMoreOpen(false)}
                              className="group/item flex items-center justify-between gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-surface-3"
                            >
                              <span>
                                <span className="block text-[0.9375rem] font-semibold text-fg">{item.label}</span>
                                <span className="block text-small text-fg-3">{item.hint}</span>
                              </span>
                              <Icon
                                name="arrow-up-right"
                                className="h-4 w-4 text-gold-300 transition-transform duration-[var(--dur-base)] ease-out-expo group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5"
                              />
                            </Link>
                          </li>
                        ))}
                      </m.ul>
                    )}
                  </AnimatePresence>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-5 xl:gap-7">
            <div className="hidden lg:block">
              <Button href={href(site.nav.cta.href)} size="sm" icon="calendar" iconPosition="start">
                {site.nav.cta.label}
              </Button>
            </div>
            <Logo
              compactOnXs
              className={cn("origin-right transition-transform duration-[var(--dur-slow)] ease-out-expo", compact && "scale-[0.9]")}
            />
          </div>
        </div>
      </header>

      {/* Menu mobile a pannello fullscreen */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[65] flex flex-col bg-night lg:hidden"
          >
            <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-70" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-bg-hero)] opacity-80" />
            <div className="container-x relative flex h-[var(--header-h)] shrink-0 items-center justify-between">
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => closeMenu()}
                aria-label={site.nav.menuClose}
                className="-ml-2 inline-flex h-11 w-11 items-center justify-center rounded-xl text-fg transition-colors hover:text-gold-300"
              >
                <Icon name="close" className="h-6 w-6" />
              </button>
              <Logo compactOnXs />
            </div>

            <nav aria-label="Menu mobile" className="container-x relative flex flex-1 flex-col justify-center">
              <ul className="space-y-1">
                {mobileItems.map((item, i) => (
                  <m.li
                    key={item.href}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12, transition: { duration: 0.18, delay: 0 } }}
                    transition={{ duration: 0.6, delay: 0.08 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={href(item.href)}
                      onClick={() => closeMenu(false)}
                      className="group/m flex items-baseline gap-4 border-b border-line py-4 font-display text-[clamp(2rem,1.4rem+3vw,3rem)] font-bold tracking-tight text-fg transition-colors hover:text-gold-300"
                    >
                      <span className="w-7 text-small font-medium text-gold-400">{String(i + 1).padStart(2, "0")}</span>
                      {item.label}
                      {"hint" in item && <span className="ml-auto text-small font-normal text-fg-3">{site.nav.more.label}</span>}
                    </Link>
                  </m.li>
                ))}
              </ul>
            </nav>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.15, delay: 0 } }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="container-x relative pb-[max(2rem,env(safe-area-inset-bottom))]"
            >
              <Button href={href(site.nav.cta.href)} size="lg" icon="arrow-right" className="w-full" onClick={() => closeMenu(false)}>
                {site.nav.cta.label}
              </Button>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
