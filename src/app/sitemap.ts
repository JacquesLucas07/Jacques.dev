import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `https://jacques.dev/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === "fr" ? 1 : 0.8,
  }));
}
