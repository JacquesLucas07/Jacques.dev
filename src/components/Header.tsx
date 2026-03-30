"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import LangSwitcher from "./LangSwitcher";

const navKeys = ["about", "skills", "experience", "projects", "contact"] as const;

export default function Header() {
  const t = useTranslations("nav");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    function onScroll() {
      const current = window.scrollY;
      setHidden(current > 100 && current > lastScroll);
      setLastScroll(current);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScroll]);

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md z-50 transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 lg:px-8">
        <h1 className="text-2xl font-bold text-primary">
          Jacques<span className="text-accent">.dev</span>
        </h1>

        <ul className={`
          lg:flex lg:items-center lg:gap-8
          ${menuOpen
            ? "flex flex-col absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg p-6 gap-4"
            : "hidden"
          }
        `}>
          {navKeys.map((key) => (
            <li key={key}>
              <a
                href={`#${key}`}
                onClick={() => setMenuOpen(false)}
                className="relative text-gray-800 dark:text-gray-100 font-medium hover:text-primary transition-colors after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
              >
                {t(key)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LangSwitcher />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="lg:hidden flex flex-col gap-1 p-2"
          >
            <span className={`w-6 h-0.5 bg-current transition-transform ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`w-6 h-0.5 bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`w-6 h-0.5 bg-current transition-transform ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </div>
      </nav>
    </header>
  );
}
