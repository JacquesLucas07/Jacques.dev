"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { locales } from "@/i18n/routing";

const localeNames: Record<string, string> = {
  fr: "Français", en: "English", de: "Deutsch", ru: "Русский",
  es: "Español", pt: "Português", it: "Italiano", nl: "Nederlands",
  pl: "Polski", sv: "Svenska", no: "Norsk", da: "Dansk",
  fi: "Suomi", cs: "Čeština", hu: "Magyar", tr: "Türkçe",
  ar: "العربية", hi: "हिन्दी", th: "ไทย", vi: "Tiếng Việt",
  "zh-CN": "简体中文", "zh-TW": "繁體中文", ja: "日本語", ko: "한국어",
};

const localeFlags: Record<string, string> = {
  fr: "\u{1F1EB}\u{1F1F7}", en: "\u{1F1EC}\u{1F1E7}", de: "\u{1F1E9}\u{1F1EA}", ru: "\u{1F1F7}\u{1F1FA}",
  es: "\u{1F1EA}\u{1F1F8}", pt: "\u{1F1F5}\u{1F1F9}", it: "\u{1F1EE}\u{1F1F9}", nl: "\u{1F1F3}\u{1F1F1}",
  pl: "\u{1F1F5}\u{1F1F1}", sv: "\u{1F1F8}\u{1F1EA}", no: "\u{1F1F3}\u{1F1F4}", da: "\u{1F1E9}\u{1F1F0}",
  fi: "\u{1F1EB}\u{1F1EE}", cs: "\u{1F1E8}\u{1F1FF}", hu: "\u{1F1ED}\u{1F1FA}", tr: "\u{1F1F9}\u{1F1F7}",
  ar: "\u{1F1F8}\u{1F1E6}", hi: "\u{1F1EE}\u{1F1F3}", th: "\u{1F1F9}\u{1F1ED}", vi: "\u{1F1FB}\u{1F1F3}",
  "zh-CN": "\u{1F1E8}\u{1F1F3}", "zh-TW": "\u{1F1F9}\u{1F1FC}", ja: "\u{1F1EF}\u{1F1F5}", ko: "\u{1F1F0}\u{1F1F7}",
};

export default function LangSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  function switchLocale(next: string) {
    const path = pathname.replace(`/${locale}`, `/${next}`);
    router.push(path);
    setOpen(false);
    setSearch("");
  }

  const filtered = locales.filter(
    (l) =>
      localeNames[l]?.toLowerCase().includes(search.toLowerCase()) ||
      l.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 min-w-[90px] justify-between"
      >
        <span className="text-sm font-medium">{locale.toUpperCase()}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg shadow-lg min-w-[180px] z-50 overflow-hidden">
          <div className="p-2 border-b border-gray-200 dark:border-gray-700">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full px-3 py-1.5 text-sm rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 outline-none focus:border-primary"
              autoFocus
            />
          </div>
          <div className="max-h-[250px] overflow-y-auto">
            {filtered.map((l) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 ${
                  l === locale ? "text-primary font-semibold" : ""
                }`}
              >
                <span>{localeFlags[l]}</span>
                <span>{localeNames[l]}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="px-3 py-2 text-sm text-gray-400">No results</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
