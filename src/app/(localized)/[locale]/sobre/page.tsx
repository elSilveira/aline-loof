import type { Metadata } from "next";
import Image from "next/image";
import { alinePersonSchema, canonicalUrl } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import EntityFacts from "@/components/EntityFacts";
import siteSettings from "@/content/site-settings.json";

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
      <section className="bg-[#1C1C1C] pt-20">
        <div className="grid min-h-[calc(100svh-5rem)] bg-[#F7F3EC] lg:grid-cols-[52%_48%]">
          <div className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-[8vw] lg:py-12">
            <p className="mb-5 text-[10px] uppercase tracking-[0.5em] text-[#9B7A22]">
              Aline Loof
            </p>
            <h1 className="font-serif text-[clamp(3rem,5vw,5.25rem)] font-normal leading-[1.05] text-[#1C1C1C]">
              {t("title")}
            </h1>
            <div className="my-7 h-px w-14 bg-[#B8942A]" />
            <p className="max-w-2xl text-base leading-[1.7] text-[#5F5A55] lg:text-lg">
              {t("intro")}
            </p>

            <div className="my-8">
            <EntityFacts facts={[
              { label: tEntity("name_label"), value: "Aline Loof" },
              { label: tEntity("profession_label"), value: tEntity("profession") },
              { label: tEntity("area_label"), value: tEntity("area") },
              { label: tEntity("service_label"), value: tEntity("service") },
            ]} />
            </div>

            <div>
              <h2 className="mb-2 font-serif text-3xl font-normal text-[#1C1C1C] lg:text-4xl">
                {t("how.title")}
              </h2>
              <p className="mb-7 max-w-2xl leading-relaxed text-[#6B6560]">
                {t("how.answer")}
              </p>
              <Link
                href="/consultoria-de-imagem"
                className="inline-flex min-h-12 items-center gap-3 bg-[#B8942A] px-7 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[#1C1C1C] transition-colors hover:bg-[#D4AF50]"
              >
                {t("cta")}
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {siteSettings.aboutPage.heroImage.enabled && (
            <div className="relative aspect-[522/587] overflow-hidden bg-[#F7F3EC] lg:aspect-auto lg:min-h-[calc(100svh-5rem)]">
              <Image
                src={siteSettings.aboutPage.heroImage.src}
                alt={siteSettings.aboutPage.heroImage.alt}
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 48vw"
                className="object-contain object-top"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[12%] bg-gradient-to-r from-[#F7F3EC] to-transparent"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[12%] bg-gradient-to-l from-[#F7F3EC] to-transparent"
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
