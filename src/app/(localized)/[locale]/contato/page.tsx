import { setRequestLocale } from "next-intl/server";
import ContatoClient from "./ContatoClient";

type Props = { params: Promise<{ locale: string }> };

export default async function ContatoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContatoClient />;
}
