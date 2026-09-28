import type { Metadata } from "next";
import { alinePersonSchema, canonicalUrl } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import EntityFacts from "@/components/EntityFacts";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about_page" });

  return {
    title: t("title"),
    description: t("intro"),
    alternates: { canonical: canonicalUrl(locale, "sobre") },
  };
}


export default async function SobrePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about_page");
  const tEntity = await getTranslations("entity");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            alinePersonSchema(
              locale,
              tEntity("profession"),
              tEntity("area"),
              tEntity("service"),
            ),
          ),
        }}
      />
      <section className="bg-[#1C1C1C] px-6 pb-20 pt-40 text-center">
        <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-[#B8942A]">
          Aline Loof
        </p>
        <h1 className="mx-auto mb-6 max-w-4xl font-serif text-5xl font-medium text-[#F0E8D8] md:text-6xl">
          {t("title")}
        </h1>
        <div className="mx-auto mb-6 h-px w-12 bg-[#B8942A]" />
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#C8B99A]">
          {t("intro")}
        </p>
      </section>

      <section className="section-padding px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12">
            <EntityFacts facts={[
              { label: tEntity("name_label"), value: "Aline Loof" },
              { label: tEntity("profession_label"), value: tEntity("profession") },
              { label: tEntity("area_label"), value: tEntity("area") },
              { label: tEntity("service_label"), value: tEntity("service") },
            ]} />
          </div>
          <h2 className="mb-4 font-serif text-3xl text-[#1C1C1C] md:text-4xl">
            {t("how.title")}
          </h2>
          <p className="mb-10 leading-relaxed text-[#6B6560]">
            {t("how.answer")}
          </p>
          <Link
            href="/consultoria-de-imagem"
            className="inline-flex items-center gap-2 bg-[#B8942A] px-8 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[#1C1C1C] transition-colors hover:bg-[#D4AF50]"
          >
            {t("cta")}
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </>
  );
}
