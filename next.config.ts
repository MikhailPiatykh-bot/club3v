import type { NextConfig } from "next";

const legacyRedirects = [
  ["/wushu-kungfu", "/wushu"],
  ["/kungfu", "/wushu"],
  ["/kung-fu", "/wushu"],
  ["/childrens-educational-games", "/group-3plus"],
  ["/aikido-senior-group", "/adults#aikido"],
  ["/our-coaches", "/coaches"],
  ["/our-champions", "/champions"],
  ["/calendar-plan", "/events"],
  ["/competitions", "/events#competitions"],
  ["/childrens-summer-sports-camps", "/sbory"],
  ["/kidscamp", "/sbory"],
  ["/camps", "/sbory"],
  ["/family-holidays-in-turkey", "/china-camp"],
  ["/rental", "/rent"],
  ["/koptevo", "/"],
  ["/page88819936.html", "/"],
  ["/page88821006.html", "/wushu"],
  ["/page88821026.html", "/acrobatics"],
] as const;

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.trycloudflare.com"],
  experimental: {
    agentUpgrade: "security",
  },
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
