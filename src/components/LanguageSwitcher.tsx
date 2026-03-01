"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
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
  const router = useRouter();
  const pathname = usePathname();
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

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as typeof routing.locales[number] });
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 border px-3 py-1.5 hover:text-[#B8942A] hover:border-[#B8942A] ${
          scrolled
            ? "text-[#1C1C1C] border-[#D4C9A8]"
            : "text-[#F0E8D8] border-[#F0E8D8]/40"
        }`}
        style={{ fontFamily: "var(--font-inter)" }}
        aria-label="Switch language"
      >
        {localeLabels[locale]}
        <ChevronDown size={11} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-[#FDFAF4] border border-[#D4C9A8] shadow-lg min-w-[120px] z-50">
          {routing.locales.map((l) => (
            <button
              key={l}
              onClick={() => switchLocale(l)}
              className={`w-full text-left px-4 py-2.5 text-[10px] tracking-[0.15em] uppercase transition-colors hover:bg-[#F0E8D8] hover:text-[#B8942A] ${
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
