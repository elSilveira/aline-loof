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
    { href: "/categorias", label: t("categories") },
    { href: "/acessorios", label: t("accessories") },
    { href: "/cema", label: t("cema") },
    { href: "/servicos", label: t("services") },
    { href: "/faq", label: t("faq") },
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
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" locale={locale} className="flex flex-col leading-tight">
            <span
              className={`font-serif text-xl font-semibold tracking-wide transition-colors duration-300 ${
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
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                locale={locale}
                className={`text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 ${
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
          <div className="flex items-center gap-4">
            <LanguageSwitcher scrolled={scrolled} />
            <button
              className={`lg:hidden hover:text-[#B8942A] transition-colors duration-300 ${
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
          <nav id="mobile-navigation" className="flex flex-col px-6 py-6 gap-5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                locale={locale}
                onClick={() => setMenuOpen(false)}
                className={`text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 ${
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
