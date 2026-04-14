"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

type Item = {
  key: string;
  type: "education" | "work";
  date: string;
  year: string;
  url?: string;
};

// Ordre DOM gauche -> droite (le plus ancien à droite, le plus récent à gauche)
const items: Item[] = [
  { key: "edu3", type: "education", date: "12 Avril 2026", year: "Avril 2026" },
  {
    key: "job2",
    type: "work",
    date: "20 Février 2026",
    year: "Février 2026",
    url: "https://binharry.com",
  },
  { key: "job1", type: "work", date: "Janvier 2026", year: "Janvier 2026" },
  { key: "edu1", type: "education", date: "2025 - 2028", year: "2025 - 2028" },
  { key: "edu2", type: "education", date: "2025", year: "2025" },
];

export default function Experience() {
  const t = useTranslations("experience");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeYear, setActiveYear] = useState(items[0].year);
  const [indicatorLeft, setIndicatorLeft] = useState<number | null>(null);

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < maxScroll - 4);

    // Détermine la carte la plus centrée dans le viewport
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-card]"));
    if (cards.length === 0) return;
    const viewportCenter = el.scrollLeft + el.clientWidth / 2;
    let closest = cards[0];
    let closestDist = Infinity;
    cards.forEach((card) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(cardCenter - viewportCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = card;
      }
    });
    const idx = Number(closest.dataset.index);
    if (!Number.isNaN(idx) && items[idx]) {
      setActiveYear(items[idx].year);
    }
    // Position indicateur sur la barre horizontale (relatif au scroller)
    setIndicatorLeft(closest.offsetLeft + closest.offsetWidth / 2 - el.scrollLeft);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const getCardWidth = () => {
    const el = scrollerRef.current;
    if (!el) return 0;
    const firstCard = el.querySelector<HTMLElement>("[data-card]");
    if (!firstCard) return el.clientWidth;
    const style = window.getComputedStyle(el);
    const gap = parseFloat(style.columnGap || style.gap || "0");
    return firstCard.offsetWidth + gap;
  };

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * getCardWidth(), behavior: "smooth" });
  };

  // Drag-to-scroll pour desktop (souris)
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    let moved = false;

    const onDown = (e: MouseEvent) => {
      isDown = true;
      moved = false;
      startX = e.pageX;
      startScroll = el.scrollLeft;
      el.classList.add("cursor-grabbing");
    };
    const onMove = (e: MouseEvent) => {
      if (!isDown) return;
      const dx = e.pageX - startX;
      if (Math.abs(dx) > 3) moved = true;
      el.scrollLeft = startScroll - dx;
    };
    const onUp = () => {
      isDown = false;
      el.classList.remove("cursor-grabbing");
    };
    const onClickCapture = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    el.addEventListener("click", onClickCapture, true);
    return () => {
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      el.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  return (
    <section id="experience" className="py-24 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-primary text-center mb-12">{t("title")}</h2>

        <div className="relative">
          {/* Ligne horizontale décorative */}
          <div className="absolute left-0 right-0 top-6 h-0.5 bg-gradient-to-r from-primary to-secondary opacity-30 pointer-events-none" />

          {/* Badge année sur la barre horizontale, suit la carte active */}
          {indicatorLeft !== null && (
            <div
              className="absolute top-6 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-[left] duration-300 ease-out"
              style={{ left: `${indicatorLeft}px` }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold shadow-lg whitespace-nowrap">
                {activeYear}
              </span>
            </div>
          )}

          {/* Boutons navigation */}
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Précédent"
            disabled={!canScrollLeft}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-11 h-11 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-secondary hover:scale-110 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-primary"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Suivant"
            disabled={!canScrollRight}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-11 h-11 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-secondary hover:scale-110 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-primary"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scroller horizontal */}
          <div
            ref={scrollerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 cursor-grab select-none scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {items.map((item, index) => (
              <div
                key={item.key}
                data-card
                data-index={index}
                className="relative shrink-0 snap-center w-[85%] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] pt-16"
              >
                {/* Marqueur dot */}
                <div
                  className={`absolute left-1/2 top-4 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white dark:border-gray-900 ${
                    item.type === "education"
                      ? "bg-secondary shadow-[0_0_0_4px] shadow-secondary/50"
                      : "bg-primary shadow-[0_0_0_4px] shadow-primary/50"
                  }`}
                />

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:-translate-y-1 hover:shadow-lg transition-all h-full border border-gray-100 dark:border-gray-700 flex flex-col">
                  <span className="inline-block self-start px-4 py-1 bg-primary text-white text-sm rounded-full mb-3">
                    {item.date}
                  </span>
                  <h3 className="text-xl font-bold mb-1">{t(`${item.key}.title`)}</h3>
                  <h4 className="text-gray-500 dark:text-gray-400 mb-3">
                    {t(`${item.key}.${item.type === "education" ? "school" : "company"}`)}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t(`${item.key}.description`)}
                  </p>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Site du BDE
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
