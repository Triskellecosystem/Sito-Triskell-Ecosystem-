import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: Array<[string, number]> = [
    ["", 1],
    ["/agency", 0.9],
    ["/academy", 0.9],
    ["/agency/siti-web", 0.7],
    ["/agency/portfolio", 0.7],
    ["/chi-siamo", 0.7],
    ["/contatti", 0.8],
    ["/risorse", 0.5],
    ["/ai-lab", 0.5],
  ];
  return pages.map(([path, priority]) => ({
    url: `${site.brand.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
