import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
  // L'anteprima in cloud accede al dev server da un host diverso da localhost.
  allowedDevOrigins: ["*.claude.ai", "*.claude.com", "*.anthropic.com", "*.claudeusercontent.com"],
  async redirects() {
    // il libretto sul Vibe Coding vive dentro la pagina Risorse gratuite
    return [{ source: "/vibe-coding", destination: "/risorse#vibe-coding", permanent: true }];
  },
  experimental: { optimizePackageImports: ["lucide-react", "motion"] },
};

export default nextConfig;
