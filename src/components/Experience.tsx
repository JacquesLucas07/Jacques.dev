"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

const items = [
  { key: "edu1", type: "education" as const, date: "2025 - 2028" },
  { key: "job1", type: "work" as const, date: "Janvier 2026" },
  { key: "edu3", type: "education" as const, date: "12 Avril 2026" },
  { key: "job2", type: "work" as const, date: "20 Février 2026" },
  { key: "edu2", type: "education" as const, date: "2025" },
];

export default function Experience() {
  const t = useTranslations("experience");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < maxScroll - 4);
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

  // Drag-to-scroll for desktop (mouse)
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
            {items.map((item) => (
              <div
                key={item.key}
                data-card
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

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:-translate-y-1 hover:shadow-lg transition-all h-full border border-gray-100 dark:border-gray-700">
                  <span className="inline-block px-4 py-1 bg-primary text-white text-sm rounded-full mb-3">
                    {item.date}
                  </span>
                  <h3 className="text-xl font-bold mb-1">{t(`${item.key}.title`)}</h3>
                  <h4 className="text-gray-500 dark:text-gray-400 mb-3">
                    {t(`${item.key}.${item.type === "education" ? "school" : "company"}`)}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t(`${item.key}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
