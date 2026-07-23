import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tNav = await getTranslations("nav");

  const services = t.raw("services_preview.items") as Array<{
    title: string;
    desc: string;
  }>;

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1C1C1C]">
        {/* Background texture overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #B8942A 0, #B8942A 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p
            className="text-[10px] tracking-[0.5em] uppercase text-[#B8942A] mb-8"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Aline Loof
          </p>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-[#F0E8D8] leading-tight mb-8"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {t("hero.tagline")}
          </h1>
          <div className="w-16 h-px bg-[#B8942A] mx-auto mb-8" />
          <p
            className="text-[#C8B99A] text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
          >
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/servicos"
              className="inline-flex items-center gap-2 bg-[#B8942A] text-[#1C1C1C] px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#D4AF50] transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("hero.cta_primary")}
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 border border-[#B8942A] text-[#B8942A] px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#B8942A] hover:text-[#1C1C1C] transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("hero.cta_secondary")}
            </Link>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <div className="w-px h-12 bg-[#B8942A] animate-pulse" />
        </div>
      </section>

      {/* About */}
      <section className="section-padding px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image example */}
          <div className="relative">
            <div className="aspect-[3/4] bg-[#E8E0D0] relative overflow-hidden">
              <Image
                src="/aline-loof/globe.svg"
                alt="Example illustration"
                fill
                className="object-contain p-16"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            {/* Decorative gold border offset */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#B8942A] opacity-30 pointer-events-none" />
          </div>

          {/* Text */}
          <div>
            <p
              className="text-[10px] tracking-[0.4em] uppercase text-[#B8942A] mb-6"
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
            <Link
              href="/cema"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#B8942A] hover:gap-4 transition-all"
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
              className="text-[10px] tracking-[0.4em] uppercase text-[#B8942A] mb-4"
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
              href="/servicos"
              className="inline-flex items-center gap-2 bg-[#1C1C1C] text-[#F0E8D8] px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-gold-dark transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {t("hero.cta_primary")}
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

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
          {t("hero.tagline")}
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
