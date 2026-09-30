import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BriefcaseBusiness, CalendarDays, Shirt, Wine } from "lucide-react";

import { canonicalUrl } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

const eventIcons = [Wine, BriefcaseBusiness, CalendarDays, Shirt];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "events" });

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: { canonical: canonicalUrl(locale, "eventos") },
  };
}

export default async function EventosPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("events");
  const sections = t.raw("sections") as Array<{ title: string; desc: string }>;

  return (
    <main className="min-h-screen bg-[#FDFAF4]">
      <header className="bg-[#1C1C1C] px-6 pb-20 pt-36 text-center md:pt-40">
            <p className="mb-5 text-[10px] uppercase tracking-[0.5em] text-[#9B7A22]">
              Aline Loof
            </p>
            <h1 className="font-serif text-5xl font-normal leading-none text-[#F0E8D8] md:text-7xl">
              {t("title")}
            </h1>
            <div className="mx-auto my-6 h-px w-10 bg-[#B8942A]" />
            <p className="mx-auto max-w-xl leading-relaxed text-[#C8B99A]">
              {t("subtitle")}
            </p>
      </header>

      <section className="px-6 pb-20 pt-16 md:pb-28 md:pt-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="font-serif text-3xl font-normal text-[#1C1C1C] md:text-4xl">
              {t("intro_title")}
            </h2>
            <div className="mx-auto my-5 h-px w-10 bg-[#B8942A]" />
            <p className="mx-auto max-w-3xl text-sm leading-relaxed text-[#6B6560] md:text-base">
              {t("intro")}
            </p>
          </div>

          <div className="grid gap-x-16 gap-y-12 md:grid-cols-2 md:gap-y-14">
            {sections.map((section, index) => {
              const Icon = eventIcons[index] ?? CalendarDays;
              return (
                <article key={section.title} className="grid grid-cols-[4rem_1fr] gap-5">
                  <div className="flex items-start justify-center border-r border-[#D4C9A8] pt-6">
                    <Icon aria-hidden="true" className="text-[#B8942A]" size={30} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="mb-2 text-[10px] tracking-[0.18em] text-[#B8942A]">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mb-2 font-serif text-2xl font-normal text-[#1C1C1C]">
                      {section.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-[#77716B]">
                      {section.desc}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
