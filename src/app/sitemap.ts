import type { MetadataRoute } from "next";
import { posts as blogPosts } from "@/lib/blog";
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
    ["/vibe-coding", 0.6],
    ["/blog", 0.7],
    ["/risorse", 0.6],
    ["/privacy", 0.2],
    ["/cookie", 0.2],
  ];
  const posts: Array<[string, number]> = blogPosts.map((p) => [`/blog/${p.slug}`, 0.5]);
  return [...pages, ...posts].map(([path, priority]) => ({
    url: `${site.brand.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
