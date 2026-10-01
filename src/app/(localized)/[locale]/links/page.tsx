import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { canonicalUrl } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "links_page" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: canonicalUrl(locale, "links") },
  };
}

export default async function LinksPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("links_page");
  const internalLinks = [
    { href: "/servicos" as const, label: t("services") },
    { href: "/eventos" as const, label: t("events") },
    { href: "/sobre" as const, label: t("about") },
    { href: "/cema" as const, label: t("cema") },
  ];

  return (
    <main className="min-h-screen bg-[#181818] px-5 pb-14 pt-32 text-[#F5F0E8]">
      <div className="mx-auto max-w-3xl text-center">
        <header className="mb-10">
          <h1 className="font-serif text-5xl">Aline Loof</h1>
          <p className="mt-2 text-xs tracking-[0.4em] text-[#C49A2C]">{t("profession")}</p>
        </header>
        <p className="mx-auto mb-10 max-w-xl leading-7 text-[#CFC9BF]">{t("description")}</p>

        <div className="flex flex-col gap-4">
          <a href="https://wa.me/554591525773" target="_blank" rel="noopener noreferrer" className="bg-[#C49A2C] px-6 py-5 text-xs font-semibold tracking-[0.25em] text-black transition hover:bg-[#D6AF45]">
            {t("schedule")}
          </a>
          {internalLinks.map((item) => (
            <Link key={item.href} href={item.href} className="border border-[#AAA49B] px-6 py-5 text-xs tracking-[0.25em] transition hover:border-[#C49A2C] hover:bg-[#C49A2C] hover:text-black">
              {item.label}
            </Link>
          ))}
          <a href="https://www.instagram.com/alineloof.consultoria" target="_blank" rel="noopener noreferrer" className="border border-[#AAA49B] px-6 py-5 text-xs tracking-[0.25em] transition hover:border-[#C49A2C] hover:bg-[#C49A2C] hover:text-black">
            {t("instagram")}
          </a>
          <a href="https://wa.me/554591525773" target="_blank" rel="noopener noreferrer" className="border border-[#AAA49B] px-6 py-5 text-xs tracking-[0.25em] transition hover:border-[#C49A2C] hover:bg-[#C49A2C] hover:text-black">
            {t("whatsapp")}
          </a>
        </div>
        <p className="mt-10 text-[10px] tracking-[0.2em] text-[#777]">ALINE LOOF · {t("profession")}</p>
      </div>
    </main>
  );
}
