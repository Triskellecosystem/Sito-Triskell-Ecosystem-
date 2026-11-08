import Link from "next/link";
import { GoldText } from "@/components/ui/GoldText";
import { Icon } from "@/components/ui/Icon";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  overline: string;
  title: string;
  line: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
  /** Visual a lato (es. mockup animato). Con `aside` il titolo occupa 7/12 e il visual 5/12. */
  aside?: React.ReactNode;
  /** Classi del contenitore del visual (es. "max-lg:hidden" per nasconderlo su mobile). */
  asideClassName?: string;
}

/**
 * Intestazione delle pagine interne: breadcrumb, overline, titolo (parti in [oro]) e una riga.
 * Il titolo usa solo un'animazione a fuoco (blur + traslazione, mai opacità) per restare candidato LCP.
 */
export function PageHero({ overline, title, line, crumbs = [], children, aside, asideClassName }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden pb-[clamp(2.5rem,5vw,4.5rem)] pt-[calc(var(--header-h)+clamp(2rem,5vh,4rem))]">
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-20 [mask-image:linear-gradient(to_bottom,#000,transparent_90%)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[image:var(--gradient-bg-hero)]" />
      <div className={aside ? "container-x grid items-center gap-x-10 gap-y-14 lg:grid-cols-12" : "container-x"}>
        <div className={aside ? "lg:col-span-7" : undefined}>
        {crumbs.length > 0 && (
          <nav aria-label="Percorso" className="mb-6 animate-[fade-in_0.8s_var(--ease-soft)_both]">
            <ol className="flex flex-wrap items-center gap-2 text-small text-fg-3">
              <li>
                <Link href="/" className="transition-colors hover:text-gold-300">
                  Home
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-2">
                  <Icon name="chevron-right" className="h-3.5 w-3.5" />
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-gold-300">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-fg-2">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <p className="mb-5 inline-flex items-center gap-3 text-overline font-semibold uppercase tracking-[var(--text-overline--letter-spacing)] text-gold-400">
          <span aria-hidden="true" className="h-px w-8 bg-gold-400/70" />
          {overline}
        </p>
        <h1 className="max-w-3xl animate-[line-up_1s_var(--ease-out-expo)_backwards] text-[clamp(2.25rem,1.3rem+3.6vw,4.25rem)] leading-[1.04] tracking-[-0.035em] text-fg">
          <GoldText text={title} />
        </h1>
        <p className="mt-6 max-w-xl animate-[fade-in_0.9s_0.3s_var(--ease-soft)_both] text-lead text-fg-2">{line}</p>
        {children && <div className="mt-8 flex animate-[fade-in_0.9s_0.4s_var(--ease-soft)_both] flex-wrap items-center gap-4">{children}</div>}
        </div>
        {aside && <div className={`relative lg:col-span-5 ${asideClassName ?? ""}`}>{aside}</div>}
      </div>
    </section>
  );
}
