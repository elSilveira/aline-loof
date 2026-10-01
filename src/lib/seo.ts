import type { Metadata } from "next";

export const siteBaseUrl = "https://alineloof.com";
export const locales = ["pt", "en", "es", "fr"] as const;

export function canonicalUrl(locale: string, path = "") {
  return `${siteBaseUrl}/${locale}/${path ? `${path}/` : ""}`;
}

export function languageAlternates(path = "") {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, canonicalUrl(locale, path)]),
  );
  return { ...languages, "x-default": canonicalUrl("pt", path) };
}

export function pageMetadata({
  locale,
  path = "",
  title,
  description,
}: {
  locale: string;
  path?: string;
  title: string;
  description: string;
}): Metadata {
  const url = canonicalUrl(locale, path);
  const image = `${siteBaseUrl}/images/aline-loof-sobre-cema.png`;
  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      locale,
      url,
      siteName: "Aline Loof",
      title,
      description,
      images: [{ url: image, alt: "Aline Loof, consultora de imagem" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export function alinePersonSchema(
  locale: string,
  profession: string,
  area: string,
  service: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${canonicalUrl("pt")}#aline-loof`,
    name: "Aline Loof",
    jobTitle: profession,
    knowsAbout: [area],
    url: canonicalUrl(locale),
    sameAs: ["https://www.instagram.com/alineloof.consultoria"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+55-45-99919-8058",
      contactType: "customer service",
      availableLanguage: [...locales],
    },
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service,
        url: canonicalUrl(locale, "consultoria-de-imagem"),
      },
    },
  };
}

export function websiteSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteBaseUrl}/#website`,
    url: siteBaseUrl,
    name: "Aline Loof",
    inLanguage: locale,
    publisher: {
      "@type": "Person",
      "@id": `${canonicalUrl("pt")}#aline-loof`,
      name: "Aline Loof",
    },
  };
}

export function serviceSchema(locale: string, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonicalUrl(locale, "consultoria-de-imagem")}#service`,
    name,
    description,
    url: canonicalUrl(locale, "consultoria-de-imagem"),
    provider: {
      "@type": "Person",
      "@id": `${canonicalUrl("pt")}#aline-loof`,
      name: "Aline Loof",
    },
    areaServed: "BR",
  };
}

export function faqPageSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
