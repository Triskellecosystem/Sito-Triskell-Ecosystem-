"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Tilt } from "@/components/ui/Tilt";
import { CaseCard } from "./CaseCard";
import { SiteCard } from "./SiteCard";

type Tab = "sites" | "portfolio";

/** Area "lavori" interattiva: due schede (Siti web / Portfolio) che si alternano senza lasciare la pagina. */
export function Showcase() {
  const { showcase: s } = site.agencyPage;
  const [tab, setTab] = useState<Tab>("sites");
  const tabs: Array<{ id: Tab; label: string; icon: "monitor" | "trending" }> = [
    { id: "sites", label: s.tabs.sites, icon: "monitor" },
    { id: "portfolio", label: s.tabs.portfolio, icon: "trending" },
  ];

  return (
    <Section id="lavori" labelledBy="lavori-title">
      <SectionHeading id="lavori-title" overline={s.overline} title={s.title} line={s.line} align="center" />

      <div role="tablist" aria-label={s.title.replace(/[[\]]/g, "")} className="mx-auto mt-9 flex w-fit gap-2 rounded-full border border-line-strong bg-surface/70 p-1.5">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setTab(t.id)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-6 py-3 font-display text-[1rem] font-semibold transition-[background-color,color,box-shadow] duration-[var(--dur-base)]",
              tab === t.id ? "bg-[image:var(--gradient-gold-btn)] text-night shadow-glow-gold" : "text-fg-2 hover:text-fg",
            )}
          >
            <Icon name={t.icon} className="h-[1.1em] w-[1.1em]" />
            {t.label}
          </button>
        ))}
      </div>

      <div className="relative mt-10">
        {/* SITI WEB */}
        <div id="panel-sites" role="tabpanel" aria-labelledby="tab-sites" hidden={tab !== "sites"} className="animate-[tab-in_0.6s_var(--ease-out-expo)_backwards]">
          <ul className="grid gap-5 md:grid-cols-3 [&>li]:h-full">
            {site.sitiWeb.featured.flatMap((id) => site.sitiWeb.items.filter((i) => i.id === id)).map((item) => (
              <li key={item.id}>
                <Tilt max={5} className="h-full">
                  <SiteCard item={item} />
                </Tilt>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-center">
            <Button href={s.sitesCta.href} size="lg" icon="arrow-right">
              {s.sitesCta.label}
            </Button>
          </div>
        </div>

        {/* PORTFOLIO */}
        <div id="panel-portfolio" role="tabpanel" aria-labelledby="tab-portfolio" hidden={tab !== "portfolio"} className="animate-[tab-in_0.6s_var(--ease-out-expo)_backwards]">
          <ul className="grid gap-5 md:grid-cols-3 [&>li]:h-full">
            {site.results.items.slice(0, 3).map((item) => (
              <li key={item.id}>
                <Tilt max={5} className="h-full">
                  <CaseCard item={item} />
                </Tilt>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-center">
            <Button href={s.portfolioCta.href} size="lg" icon="arrow-right">
              {s.portfolioCta.label}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
