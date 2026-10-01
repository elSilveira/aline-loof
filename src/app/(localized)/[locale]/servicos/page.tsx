import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight, CheckCircle } from "lucide-react";
import siteSettings from "@/content/site-settings.json";
import { pageMetadata, serviceSchema } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return pageMetadata({ locale, path: "servicos", title: t("title"), description: t("subtitle") });
}

export default async function ServicosPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("services");

  const items = t.raw("items") as Array<{
    slug: string;
    title: string;
    desc: string;
    highlights: string[];
  }>;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema(locale, items[0]?.title ?? t("title"), items[0]?.desc ?? t("subtitle"))),
        }}
      />
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

      {/* Services */}
      <section className="section-padding px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {items.map((item, idx) => (
            <div
              key={item.slug}
              className={`group grid grid-cols-1 gap-0 overflow-hidden border border-[#D4C9A8] transition-all duration-300 hover:-translate-y-1 hover:border-[#B8942A] hover:shadow-lg lg:grid-cols-2 ${
                idx % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              {/* Service image */}
              <div
                className={`relative min-h-[32rem] overflow-hidden bg-[#F7F3EC] ${
                  idx % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                {siteSettings.servicesPage.cardImage.enabled && (
                  <Image
                    src={siteSettings.servicesPage.cardImage.src}
                    alt={siteSettings.servicesPage.cardImage.alt}
                    fill
                    sizes="(max-width: 1023px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                )}
              </div>

              {/* Content */}
              <div
                className={`p-10 md:p-14 ${idx % 2 === 1 ? "lg:order-1" : ""}`}
              >
                <h2
                  className="font-serif text-3xl md:text-4xl text-[#1C1C1C] mb-4"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {item.title}
                </h2>
                <div className="w-10 h-px bg-[#B8942A] mb-6 group-hover:w-16 transition-all" />
                <p
                  className="text-[#6B6560] leading-relaxed mb-8"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                >
                  {item.desc}
                </p>

                <ul className="space-y-3 mb-10">
                  {item.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle
                        size={15}
                        className="text-[#B8942A] flex-shrink-0 mt-0.5"
                      />
                      <span
                        className="text-sm text-[#6B6560]"
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontWeight: 300,
                        }}
                      >
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/consultoria-de-imagem"
                  className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#B8942A] hover:gap-4 transition-all"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {t("learn_more")}
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1C1C1C] text-center px-6">
        <p
          className="text-[10px] tracking-[0.5em] uppercase text-[#B8942A] mb-6"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Aline Loof
        </p>
        <h2
          className="text-2xl md:text-4xl font-serif text-[#F0E8D8] mb-8 max-w-xl mx-auto"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {t("subtitle")}
        </h2>
        <Link
          href="/contato"
          className="inline-flex items-center gap-2 bg-[#B8942A] text-[#1C1C1C] px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#D4AF50] transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {t("schedule")}
          <ArrowRight size={14} />
        </Link>
      </section>
    </>
  );
}
