import type { NextConfig } from "next";

const legacyRedirects = [
  ["/wushu-kungfu", "/wushu"],
  ["/kungfu", "/wushu"],
  ["/kung-fu", "/wushu"],
  ["/childrens-educational-games", "/group-3plus"],
  ["/aikido-senior-group", "/adults#aikido"],
  ["/our-coaches", "/coaches"],
  ["/our-champions", "/champions"],
  ["/club-history", "/"],
  ["/calendar-plan", "/events"],
  ["/competitions", "/events#competitions"],
  ["/certification", "/events#certification"],
  ["/childrens-summer-sports-camps", "/camps"],
  ["/kidscamp", "/camps"],
  ["/family-holidays-in-turkey", "/china-camp"],
  ["/rental", "/rent"],
  ["/koptevo", "/"],
  ["/page88819936.html", "/"],
  ["/page88821006.html", "/wushu"],
  ["/page88821026.html", "/acrobatics"],
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
