import type { MetadataRoute } from "next";
import { oferta, publishedDistricts, siteUrl } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/wushu",
    "/acrobatics",
    "/schedule",
    "/prices",
    "/coaches",
    "/events",
    "/contacts",
    "/privacy",
    "/consent",
    ...publishedDistricts.map((item) => `/rayon/${item.slug}`),
  ];
  if (!oferta.draft) paths.push("/oferta");

  return paths.map((path) => ({
    url: `${siteUrl}${path === "/" ? "/" : path}`,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : path === "/privacy" || path === "/consent" ? 0.3 : 0.7,
  }));
}
