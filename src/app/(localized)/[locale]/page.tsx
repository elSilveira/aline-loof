import type { Metadata } from "next";
import Image from "next/image";
import { alinePersonSchema, pageMetadata, websiteSchema } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import EntityFacts from "@/components/EntityFacts";
import StyleQuiz from "@/components/style-quiz/StyleQuiz";
import siteSettings from "@/content/site-settings.json";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const title = t("hero.tagline");
  const description = t("hero.subtitle");
  return pageMetadata({ locale, title, description });
}


export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tNav = await getTranslations("nav");
  const tEntity = await getTranslations("entity");

  const services = t.raw("services_preview.items") as Array<{
    title: string;
    desc: string;
  }>;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(
          alinePersonSchema(
            locale,
            tEntity("profession"),
            tEntity("area"),
            tEntity("service"),
          ),
        ) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema(locale)) }}
      />
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#1C1C1C] px-4 pb-8 pt-24 sm:px-6 sm:pb-16 sm:pt-32">
        {/* Background texture overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #B8942A 0, #B8942A 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p
            className="mb-4 text-[10px] uppercase tracking-[0.25em] text-[#B8942A] sm:mb-7 sm:tracking-[0.5em]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Aline Loof <span className="mx-2">·</span> {t("hero.profession")}
          </p>
          <h1
            className="mb-4 font-serif text-[1.875rem] font-medium leading-[1.15] text-[#F0E8D8] sm:mb-8 sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {t("hero.tagline")}
          </h1>
          <div className="mx-auto mb-4 h-px w-16 bg-[#B8942A] sm:mb-8" />
          <p
            className="mx-auto mb-6 max-w-2xl text-sm leading-relaxed text-[#C8B99A] sm:mb-12 sm:text-base md:text-lg"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
          >
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col justify-center gap-2.5 sm:flex-row sm:gap-4">
            <Link
              href="/consultoria-de-imagem"
              className="inline-flex items-center justify-center gap-2 bg-[#B8942A] min-h-11 px-4 py-3 text-[10px] font-medium uppercase tracking-[0.08em] text-[#1C1C1C] transition-colors hover:bg-[#D4AF50] sm:px-8 sm:py-4 sm:text-[11px] sm:tracking-[0.2em]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("hero.cta_learn")}
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/contato"
              className="inline-flex items-center justify-center gap-2 border border-[#B8942A] min-h-11 px-4 py-3 text-[10px] font-medium uppercase tracking-[0.08em] text-[#B8942A] transition-colors hover:bg-[#B8942A] hover:text-[#1C1C1C] sm:px-8 sm:py-4 sm:text-[11px] sm:tracking-[0.2em]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("hero.cta_schedule")}
            </Link>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 opacity-50 sm:bottom-10 sm:flex">
          <div className="w-px h-12 bg-[#B8942A] animate-pulse" />
        </div>
      </section>

      {/* Direct answer about image consulting */}
      <section className="section-padding bg-[#F5EED8]/30 px-6">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-serif font-medium text-[#1C1C1C] leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {t("image_consulting.title")}
          </h2>
          <p
            className="text-lg text-[#1C1C1C] leading-relaxed mb-5"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("image_consulting.answer")}
          </p>
          <p
            className="text-[#6B6560] leading-relaxed"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("image_consulting.explanation")}
          </p>
        </div>
      </section>

      {/* About */}
      <section className="section-padding px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden bg-[#E8E0D0]">
              {siteSettings.home.aboutImage.enabled ? (
                <Image
                  src={siteSettings.home.aboutImage.src}
                  alt={siteSettings.home.aboutImage.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="scale-[1.04] object-cover object-center"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center" aria-hidden="true">
                  <div className="absolute inset-5 border border-[#B8942A]/40" />
                  <span className="font-serif text-[6rem] tracking-[-0.08em] text-[#B8942A]/70 md:text-[8rem]">
                    AL
                  </span>
                  <div className="absolute bottom-8 h-px w-16 bg-[#B8942A]" />
                </div>
              )}
            </div>
            <div className="pointer-events-none absolute -bottom-4 -right-4 h-full w-full border border-[#B8942A] opacity-30" />
          </div>

          {/* Text */}
          <div>
            <p
              className="text-[10px] tracking-[0.4em] uppercase text-[#8A6B20] mb-6"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("about.title")}
            </p>
            <h2
              className="text-4xl md:text-5xl font-serif font-medium text-[#1C1C1C] leading-tight mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {t("about.title")}
            </h2>
            <div className="w-10 h-px bg-[#B8942A] mb-8" />
            <p
              className="text-[#6B6560] leading-relaxed text-base mb-10"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
            >
              {t("about.text")}
            </p>
            <div className="mb-10">
              <EntityFacts facts={[
                { label: tEntity("name_label"), value: "Aline Loof" },
                { label: tEntity("profession_label"), value: tEntity("profession") },
                { label: tEntity("area_label"), value: tEntity("area") },
                { label: tEntity("service_label"), value: tEntity("service") },
              ]} />
            </div>
            <Link
              href="/sobre"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#8A6B20] hover:gap-4 transition-all"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("about.cta")}
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-[#F5EED8]/30 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-[10px] tracking-[0.4em] uppercase text-[#8A6B20] mb-4"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {tNav("services")}
            </p>
            <h2
              className="text-3xl md:text-4xl font-serif font-medium text-[#1C1C1C] mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {t("services_preview.title")}
            </h2>
            <div className="w-10 h-px bg-[#B8942A] mx-auto mb-4" />
            <p
              className="text-[#6B6560] max-w-xl mx-auto"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
            >
              {t("services_preview.subtitle")}
            </p>
          </div>

          <div className="mx-auto grid max-w-xl grid-cols-1 gap-8">
            {services.map((service, idx) => (
              <ServiceCard
                key={service.title}
                number={idx + 1}
                title={service.title}
                description={service.desc}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/consultoria-de-imagem"
              className="inline-flex items-center gap-2 bg-[#1C1C1C] text-[#F0E8D8] px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-gold-dark transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("hero.cta_primary")}
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="section-padding px-6">
        <div className="mx-auto max-w-2xl text-center">
            <h2
              className="text-3xl md:text-4xl font-serif font-medium text-[#1C1C1C] mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {t("faq_preview.title")}
            </h2>
            <p className="text-[#6B6560] leading-relaxed mb-6" style={{ fontFamily: "var(--font-inter)" }}>
              {t("faq_preview.text")}
            </p>
            <Link href="/faq" className="inline-flex items-center gap-2 text-[#8A6B20] hover:gap-4 transition-all">
              {t("faq_preview.cta")} <ArrowRight size={14} />
            </Link>
        </div>
      </section>

      {siteSettings.home.styleQuiz.enabled && (
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-6">
            <StyleQuiz />
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="py-24 bg-[#1C1C1C] text-center px-6">
        <p
          className="text-[10px] tracking-[0.5em] uppercase text-[#B8942A] mb-6"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {tNav("contact")}
        </p>
        <h2
          className="text-3xl md:text-5xl font-serif font-medium text-[#F0E8D8] mb-8 max-w-2xl mx-auto leading-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {t("closing.title")}
        </h2>
        <Link
          href="/contato"
          className="inline-flex items-center gap-2 border border-[#B8942A] text-[#B8942A] px-8 py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-[#B8942A] hover:text-[#1C1C1C] transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("hero.cta_secondary")}
          <ArrowRight size={14} />
        </Link>
      </section>
    </>
  );
}
