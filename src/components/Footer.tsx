import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Instagram } from "lucide-react";

export default async function Footer() {
  const t = await getTranslations();
  const nav = await getTranslations("nav");
  const year = new Date().getFullYear();

  const links = [
    { href: "/", label: nav("home") },
    { href: "/categorias", label: nav("categories") },
    { href: "/acessorios", label: nav("accessories") },
    { href: "/cema", label: nav("cema") },
    { href: "/servicos", label: nav("services") },
    { href: "/faq", label: nav("faq") },
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
                  className="text-[11px] tracking-[0.1em] uppercase text-[#C8B99A] hover:text-[#F0E8D8] transition-colors"
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
              className="inline-flex items-center gap-3 text-[#C8B99A] hover:text-[#F0E8D8] transition-colors group"
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
            className="text-[10px] tracking-[0.15em] uppercase text-[#6B6560]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            © {year} Aline Loof. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
