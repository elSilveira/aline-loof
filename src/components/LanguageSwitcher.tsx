"use client";

import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const localeLabels: Record<string, string> = {
  pt: "PT",
  en: "EN",
  es: "ES",
  fr: "FR",
};

const localeNames: Record<string, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
  fr: "Français",
};

export default function LanguageSwitcher({ scrolled = true }: { scrolled?: boolean }) {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const switchLocale = (newLocale: (typeof routing.locales)[number]) => {
    const url = new URL(window.location.href);
    const segments = url.pathname.split("/");
    const localeIndex = segments.findIndex((segment) =>
      routing.locales.includes(segment as (typeof routing.locales)[number])
    );

    if (localeIndex >= 0) {
      segments[localeIndex] = newLocale;
    } else {
      segments.push(newLocale);
    }

    url.pathname = segments.join("/");
    window.location.assign(url.toString());
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex cursor-pointer items-center gap-1 border px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 hover:border-[#B8942A] hover:bg-[#F5EED8]/10 hover:text-[#B8942A] hover:shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8942A] focus-visible:ring-offset-2 ${
          scrolled
            ? "text-[#1C1C1C] border-[#D4C9A8]"
            : "text-[#F0E8D8] border-[#F0E8D8]/40"
        }`}
        style={{ fontFamily: "var(--font-inter)" }}
        aria-label="Switch language"
        aria-expanded={open}
        aria-controls="language-options"
        aria-haspopup="menu"
      >
        {localeLabels[locale]}
        <ChevronDown size={11} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          id="language-options"
          role="menu"
          className="absolute right-0 top-full mt-1 bg-[#FDFAF4] border border-[#D4C9A8] shadow-lg min-w-[120px] z-50"
        >
          {routing.locales.map((l) => (
            <button
              key={l}
              type="button"
              role="menuitem"
              aria-current={l === locale ? "page" : undefined}
              onClick={() => switchLocale(l)}
              disabled={l === locale}
              className={`block w-full cursor-pointer px-4 py-2.5 text-left text-[10px] uppercase tracking-[0.15em] transition-all duration-300 hover:scale-105 hover:bg-[#F0E8D8] hover:text-[#B8942A] hover:shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8942A] focus-visible:ring-inset disabled:cursor-default disabled:hover:scale-100 disabled:hover:shadow-none disabled:active:scale-100 ${
                l === locale ? "text-[#B8942A] bg-[#F8F3E8]" : "text-[#1C1C1C]"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {localeNames[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
