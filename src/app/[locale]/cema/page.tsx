import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export default async function CEMAPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("cema");

  const pillars = t.raw("pillars") as Array<{
    letter: string;
    name: string;
    desc: string;
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

      {/* CEMA Pillars */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Large Letters Row */}
          <div className="flex justify-center gap-4 md:gap-12 mb-20 overflow-hidden">
            {pillars.map((pillar) => (
              <div key={pillar.letter} className="text-center">
                <span
                  className="text-[80px] md:text-[140px] font-serif font-semibold text-[#B8942A] opacity-10 leading-none"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {pillar.letter}
                </span>
              </div>
            ))}
          </div>

          {/* Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="group border border-[#D4C9A8] p-10 hover:border-[#B8942A] transition-all relative overflow-hidden"
              >
                <div
                  className="absolute top-0 right-0 text-[100px] font-serif font-bold text-[#B8942A] opacity-5 leading-none -mt-4 -mr-2 select-none"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {pillar.letter}
                </div>
                <div className="relative z-10">
                  <div className="flex items-baseline gap-4 mb-6">
                    <span
                      className="text-4xl font-serif font-semibold text-[#B8942A]"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {pillar.letter}
                    </span>
                    <h2
                      className="text-2xl font-serif text-[#1C1C1C]"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {pillar.name}
                    </h2>
                  </div>
                  <div className="w-8 h-px bg-[#B8942A] mb-6 group-hover:w-16 transition-all" />
                  <p
                    className="text-[#6B6560] text-sm leading-relaxed"
                    style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                  >
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
