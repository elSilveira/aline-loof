import type { MetadataRoute } from "next";

import { canonicalUrl, languageAlternates, locales } from "@/lib/seo";

export const dynamic = "force-static";

const paths = [
  "",
  "consultoria-de-imagem",
  "sobre",
  "contato",
  "servicos",
  "mentoria",
  "faq",
  "cema",
  "categorias",
  "eventos",
  "links",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: canonicalUrl(locale, path),
      changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
      priority: path === "" ? 1 : path === "consultoria-de-imagem" ? 0.9 : 0.7,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
