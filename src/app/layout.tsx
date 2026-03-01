import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aline Loof | Consultora de Imagem",
  description:
    "Consultoria de imagem exclusiva para quem valoriza elegância, autenticidade e presença.",
  openGraph: {
    title: "Aline Loof | Image Consultant",
    description:
      "Exclusive image consulting for those who value elegance, authenticity, and presence.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
