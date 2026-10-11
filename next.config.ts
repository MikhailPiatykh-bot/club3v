import type { NextConfig } from "next";

const legacyRedirects = [
  ["/wushu-kungfu", "/wushu"],
  ["/kungfu", "/wushu"],
  ["/kung-fu", "/wushu"],
  ["/our-coaches", "/coaches"],
  ["/club-history", "/"],
  ["/koptevo", "/"],
] as const;

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return legacyRedirects.map(([source, destination]) => ({
      source,
      destination,
      statusCode: 301,
    }));
  },
};

export default nextConfig;
