import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "image_consulting_page" });

  return {
    title: t("title"),
    description: t("intro"),
    alternates: { canonical: canonicalUrl(locale, "consultoria-de-imagem") },
  };
}


export default async function ConsultoriaDeImagemPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("image_consulting_page");

  return (
    <>
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
        <div className="mx-auto max-w-3xl space-y-12">
          <div>
            <h2 className="mb-4 font-serif text-3xl text-[#1C1C1C] md:text-4xl">
              {t("what.title")}
            </h2>
            <p className="leading-relaxed text-[#6B6560]">{t("what.answer")}</p>
          </div>
          <div className="h-px bg-[#D4C9A8]" />
          <div>
            <h2 className="mb-4 font-serif text-3xl text-[#1C1C1C] md:text-4xl">
              {t("how.title")}
            </h2>
            <p className="leading-relaxed text-[#6B6560]">{t("how.answer")}</p>
          </div>
          <div className="h-px bg-[#D4C9A8]" />
          <div>
            <h2 className="mb-4 font-serif text-3xl text-[#1C1C1C] md:text-4xl">
              {t("for_whom.title")}
            </h2>
            <p className="leading-relaxed text-[#6B6560]">{t("for_whom.answer")}</p>
          </div>
          <Link
            href="/contato"
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
