import { defineRouting } from "next-intl/routing";

export const locales = [
  "fr", "en", "de", "ru", "es", "pt", "it", "nl", "pl", "sv",
  "no", "da", "fi", "cs", "hu", "tr", "ar", "hi", "th", "vi",
  "zh-CN", "zh-TW", "ja", "ko",
] as const;

export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "fr",
});
