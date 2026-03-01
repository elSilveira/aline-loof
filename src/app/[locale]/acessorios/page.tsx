import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Gem, ShoppingBag, Footprints, Ribbon } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

const sectionIcons = [Gem, ShoppingBag, Footprints, Ribbon];

export default async function AcessoriosPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("accessories");

  const sections = t.raw("sections") as Array<{
    title: string;
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

      {/* Sections */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section, idx) => {
            const Icon = sectionIcons[idx] ?? Gem;
            return (
              <div
                key={idx}
                className="group flex gap-8 border border-[#D4C9A8] p-10 hover:border-[#B8942A] transition-all"
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 border border-[#D4C9A8] group-hover:border-[#B8942A] flex items-center justify-center transition-colors">
                    <Icon size={20} className="text-[#B8942A]" />
                  </div>
                </div>
                <div>
                  <h2
                    className="font-serif text-2xl text-[#1C1C1C] mb-3"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {section.title}
                  </h2>
                  <div className="w-6 h-px bg-[#B8942A] mb-4 group-hover:w-10 transition-all" />
                  <p
                    className="text-[#6B6560] text-sm leading-relaxed"
                    style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                  >
                    {section.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Decorative Quote */}
      <section className="py-20 bg-[#1C1C1C] text-center px-6">
        <blockquote
          className="text-2xl md:text-4xl font-serif text-[#F0E8D8] max-w-3xl mx-auto leading-relaxed"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          &ldquo;{t("subtitle")}&rdquo;
        </blockquote>
        <div className="w-12 h-px bg-[#B8942A] mx-auto mt-8 mb-10" />
        <Link
          href="/contato"
          className="inline-flex items-center gap-2 border border-[#B8942A] text-[#B8942A] px-8 py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-[#B8942A] hover:text-[#1C1C1C] transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("cta")}
          <ArrowRight size={14} />
        </Link>
      </section>
    </>
  );
}
