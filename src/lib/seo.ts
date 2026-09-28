export const siteBaseUrl = "https://elsilveira.github.io/aline-loof";

export function canonicalUrl(locale: string, path = "") {
  return `${siteBaseUrl}/${locale}/${path ? `${path}/` : ""}`;
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
