import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Instagram } from "lucide-react";

export default async function Footer() {
  const t = await getTranslations();
  const nav = await getTranslations("nav");
  const year = new Date().getFullYear();

  const links = [
    { href: "/", label: nav("home") },
    { href: "/sobre", label: nav("about") },
    { href: "/categorias", label: nav("categories") },
    { href: "/eventos", label: nav("events") },
    { href: "/cema", label: nav("cema") },
    { href: "/servicos", label: nav("services") },
    { href: "/faq", label: nav("faq") },
    { href: "/links", label: nav("links") },
    { href: "/contato", label: nav("contact") },
  ];

  return (
    <footer className="bg-[#1C1C1C] text-[#F0E8D8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <p
              className="font-serif text-2xl font-semibold tracking-wide mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Aline Loof
            </p>
            <p
              className="text-[10px] tracking-[0.3em] uppercase text-[#B8942A] mb-6"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("footer.tagline")}
            </p>
            <div className="w-10 h-px bg-[#B8942A]" />
          </div>

          {/* Navigation */}
          <div>
            <p
              className="text-[10px] tracking-[0.25em] uppercase text-[#B8942A] mb-6"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("footer.links_title")}
            </p>
            <nav className="flex flex-col gap-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="cursor-pointer text-[11px] uppercase tracking-[0.1em] text-[#C8B99A] transition-colors duration-300 hover:text-[#F0E8D8] focus-visible:outline-none focus-visible:text-[#B8942A]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <p
              className="text-[10px] tracking-[0.25em] uppercase text-[#B8942A] mb-6"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("footer.follow")}
            </p>
            <a
              href="https://www.instagram.com/alineloof.consultoria"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex cursor-pointer items-center gap-3 text-[#C8B99A] transition-colors duration-300 hover:text-[#F0E8D8] focus-visible:outline-none focus-visible:text-[#B8942A]"
            >
              <Instagram size={18} className="group-hover:text-[#B8942A] transition-colors" />
              <span
                className="text-[11px] tracking-[0.1em]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                @alineloof.consultoria
              </span>
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#2E2E2E] flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-[10px] tracking-[0.15em] uppercase text-[#A69E94]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            © {year} Aline Loof. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
