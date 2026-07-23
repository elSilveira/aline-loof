import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };
type FaqItem = { question: string; answer: string };

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
        <div className="max-w-3xl mx-auto space-y-4">
          {items.map((item) => (
            <details
              key={item.question}
              className="group border border-[#D4C9A8] bg-[#FDFAF4] open:border-[#B8942A]"
            >
              <summary className="cursor-pointer list-none flex items-center justify-between gap-6 p-6 font-serif text-lg text-[#1C1C1C]">
                {item.question}
                <span aria-hidden="true" className="text-[#B8942A] text-2xl group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="px-6 pb-6 text-[#6B6560] leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
