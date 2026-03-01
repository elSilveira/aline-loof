import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export default async function CategoriasPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("categories");

  const items = t.raw("items") as Array<{
    name: string;
    desc: string;
    words: string[];
  }>;

  return (
    <>
      {/* Page Header */}
      <section className="pt-40 pb-20 bg-[#1C1C1C] text-center px-6">
        <p
          className="text-[10px] tracking-[0.5em] uppercase text-[#B8942A] mb-4"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Aline Loof
        </p>
        <h1
          className="text-5xl md:text-6xl font-serif font-medium text-[#F0E8D8] mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {t("title")}
        </h1>
        <div className="w-12 h-px bg-[#B8942A] mx-auto mb-6" />
        <p
          className="text-[#C8B99A] max-w-xl mx-auto text-base leading-relaxed"
          style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
        >
          {t("subtitle")}
        </p>
      </section>

      {/* Intro */}
      <section className="section-padding px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-[#6B6560] text-base md:text-lg leading-relaxed"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
          >
            {t("intro")}
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="group border border-[#D4C9A8] p-10 hover:border-[#B8942A] transition-all hover:shadow-lg"
            >
              <div
                className="text-[#B8942A] text-5xl font-serif opacity-20 mb-6 group-hover:opacity-40 transition-opacity"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {String.fromCharCode(65 + idx)}
              </div>
              <h2
                className="font-serif text-2xl text-[#1C1C1C] mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {item.name}
              </h2>
              <div className="w-8 h-px bg-[#B8942A] mb-6 group-hover:w-14 transition-all" />
              <p
                className="text-[#6B6560] text-sm leading-relaxed mb-6"
                style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
              >
                {item.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.words.map((word, i) => (
                  <span
                    key={i}
                    className="text-[9px] tracking-[0.2em] uppercase border border-[#D4C9A8] text-[#B8942A] px-3 py-1"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#F5EED8]/30 text-center px-6">
        <h2
          className="text-2xl md:text-3xl font-serif text-[#1C1C1C] mb-8"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {t("cta")}
        </h2>
        <Link
          href="/contato"
          className="inline-flex items-center gap-2 bg-[#B8942A] text-[#1C1C1C] px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#D4AF50] transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("cta")}
          <ArrowRight size={14} />
        </Link>
      </section>
    </>
  );
}
