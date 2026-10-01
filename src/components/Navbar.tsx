"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const links = [
    { href: "/", label: t("home") },
    { href: "/sobre", label: t("about") },
    { href: "/categorias", label: t("categories") },
    { href: "/eventos", label: t("events") },
    { href: "/cema", label: t("cema") },
    { href: "/servicos", label: t("services") },
    { href: "/faq", label: t("faq") },
    { href: "/links", label: t("links") },
    { href: "/contato", label: t("contact") },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FDFAF4]/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            locale={locale}
            className="group flex cursor-pointer flex-col leading-tight transition-all duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8942A] focus-visible:ring-offset-2"
          >
            <span
              className={`font-serif text-lg sm:text-xl font-semibold tracking-wide transition-colors duration-300 group-hover:text-[#B8942A] ${
                scrolled ? "text-[#1C1C1C]" : "text-[#F0E8D8]"
              }`}
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Aline Loof
            </span>
            <span
              className="text-[10px] tracking-[0.25em] uppercase text-[#B8942A]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Consultora de Imagem
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                locale={locale}
                className={`cursor-pointer text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 focus-visible:outline-none focus-visible:text-[#B8942A] ${
                  isActive(link.href)
                    ? "text-[#B8942A]"
                    : scrolled
                    ? "text-[#1C1C1C] hover:text-[#B8942A]"
                    : "text-[#F0E8D8] hover:text-[#B8942A]"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side: Language Switcher + mobile menu */}
          <div className="flex items-center gap-2 sm:gap-4">
            <LanguageSwitcher scrolled={scrolled} />
            <button
              className={`inline-flex h-11 w-11 cursor-pointer items-center justify-center lg:hidden transition-all duration-300 hover:scale-105 hover:text-[#B8942A] hover:shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8942A] focus-visible:ring-offset-2 ${
                scrolled ? "text-[#1C1C1C]" : "text-[#F0E8D8]"
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={t("menu")}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#FDFAF4] border-t border-[#E8E0D0]">
          <nav id="mobile-navigation" className="flex flex-col gap-1 px-4 py-4 sm:px-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                locale={locale}
                onClick={() => setMenuOpen(false)}
                className={`flex min-h-11 cursor-pointer items-center text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 focus-visible:outline-none focus-visible:text-[#B8942A] ${
                  isActive(link.href)
                    ? "text-[#B8942A]"
                    : "text-[#1C1C1C] hover:text-[#B8942A]"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
