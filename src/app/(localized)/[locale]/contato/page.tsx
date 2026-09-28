import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { canonicalUrl } from "@/lib/seo";
import ContatoClient from "./ContatoClient";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: { canonical: canonicalUrl(locale, "contato") },
  };
}

export default async function ContatoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContatoClient />;
}
