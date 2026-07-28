import { getTranslations, setRequestLocale } from "next-intl/server";
import FaqList, { type FaqItem } from "@/components/faq/FaqList";

type Props = { params: Promise<{ locale: string }> };

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("faq");
  const items = t.raw("items") as FaqItem[];

  return (
    <>
      <section className="pt-40 pb-20 bg-[#1C1C1C] text-center px-6">
        <p className="text-[10px] tracking-[0.5em] uppercase text-[#B8942A] mb-4">
          Aline Loof
        </p>
        <h1 className="text-5xl md:text-6xl font-serif font-medium text-[#F0E8D8] mb-6">
          {t("title")}
        </h1>
        <div className="w-12 h-px bg-[#B8942A] mx-auto mb-6" />
        <p className="text-[#C8B99A] max-w-xl mx-auto leading-relaxed">
          {t("subtitle")}
        </p>
      </section>

      <section className="section-padding px-6">
        <FaqList
          items={items}
          searchLabel={t("searchLabel")}
          searchPlaceholder={t("searchPlaceholder")}
          rankLabel={t("rankLabel")}
          noResultsMessage={t("noResults")}
        />
      </section>
    </>
  );
}
