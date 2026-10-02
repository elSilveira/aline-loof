import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Gem, MessageCircle, UserRound } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

const content = {
  title: "Mentoria",
  metadataTitle: "Mentoria de imagem, comunicação e marca pessoal",
  description: "Um processo personalizado que integra imagem, comunicação e marca pessoal para você viver sua próxima versão.",
  heroTitle: "Uma versão mais completa de você começa aqui.",
  heroText: "Um processo personalizado que integra imagem, comunicação e marca pessoal para que você se sinta mais segura, autêntica e pronta para viver as suas próximas conquistas.",
  heroCta: "Quero conhecer a mentoria",
  statement: "Mais do que estilo, presença para a vida que você deseja.",
  aboutEyebrow: "A mentoria",
  aboutTitle: "Imagem, comunicação e marca pessoal em harmonia.",
  aboutText: "A mentoria é um acompanhamento completo e personalizado para alinhar quem você é, como se comunica e a imagem que projeta, com mais clareza, confiança e autenticidade.",
  pillarsEyebrow: "Os três pilares",
  pillarsTitle: "Uma base sólida para a sua evolução.",
  pillars: [
    ["Imagem", "Construímos uma imagem alinhada ao seu estilo de vida, que valoriza quem você é e te faz se sentir bem em todos os ambientes."],
    ["Comunicação", "Desenvolvemos sua comunicação verbal e não verbal para que você se expresse com clareza, segurança e naturalidade."],
    ["Marca Pessoal", "Estruturamos e potencializamos sua marca pessoal, para que você se posicione de forma estratégica e atraia novas oportunidades."],
  ],
  processEyebrow: "Como funciona",
  processTitle: "Um processo simples e personalizado.",
  steps: [
    ["Diagnóstico", "Entendemos sua história, seus objetivos e o seu momento atual."],
    ["Planejamento", "Criamos um plano personalizado de imagem, comunicação e marca pessoal."],
    ["Acompanhamento", "Encontros práticos e individuais com orientações e ferramentas para a sua evolução."],
    ["Resultados", "Mais confiança, presença e alinhamento para viver a sua melhor versão."],
  ],
  closingTitle: "Vamos construir juntas a sua próxima versão.",
  closingText: "Uma mentoria completa para alinhar imagem, comunicação e marca pessoal com mais clareza, confiança e propósito.",
  closingCta: "Quero falar com a Aline",
} as const;

const pillarIcons = [UserRound, MessageCircle, Gem];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, path: "mentoria", title: content.metadataTitle, description: content.description });
}

export default async function MentoriaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="overflow-hidden bg-[#fbf8f2] text-[#171716]">
      <section className="relative min-h-[660px] pt-20 lg:min-h-[700px]">
        <div className="mx-auto grid min-h-[580px] max-w-[1440px] lg:min-h-[620px] lg:grid-cols-[1.03fr_.97fr]">
          <div className="relative z-10 flex items-center px-6 py-16 sm:px-10 lg:px-20 xl:px-28">
            <div className="max-w-[640px]">
              <p className="mb-5 text-[11px] uppercase tracking-[.38em] text-[#a2762c]">{content.title}</p>
              <h1 className="font-serif text-[clamp(3.25rem,6.1vw,6.25rem)] font-normal leading-[.92] tracking-[-.045em]">{content.heroTitle}</h1>
              <p className="mt-7 max-w-[560px] text-base font-light leading-[1.55] text-[#57534e] sm:text-lg">{content.heroText}</p>
              <Link href="/contato" className="mt-8 inline-flex min-h-14 items-center gap-5 bg-[#c89b31] px-8 text-[10px] font-medium uppercase tracking-[.28em] text-[#17140d] transition-colors hover:bg-[#d9b650]">{content.heroCta}<ArrowRight size={15} /></Link>
            </div>
          </div>
          <div className="relative min-h-[480px] lg:min-h-full">
            <Image src="/images/aline-loof-sobre.png" alt="Aline Loof, consultora de imagem" fill priority sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover object-[52%_43%]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#fbf8f2] via-[#fbf8f2]/25 to-transparent" />
          </div>
        </div>
      </section>

      <section className="grid border-y border-[#e4dbcd] lg:grid-cols-[.9fr_1.1fr]">
        <div className="relative flex min-h-[400px] items-end overflow-hidden bg-[#151412] p-10 sm:p-16 lg:min-h-[430px] lg:px-20">
          <Image src="/images/cema-etiquetas.png" alt="" fill sizes="(max-width: 1023px) 100vw, 45vw" className="object-cover grayscale brightness-[.30]" />
          <div className="absolute inset-0 bg-[#15120e]/35" />
          <div className="relative max-w-[390px]">
            <p className="font-serif text-4xl leading-[1.03] text-[#f8f2e8] sm:text-5xl">{content.statement}</p>
            <div className="mt-8 h-14 w-px bg-[#c89b31]" />
          </div>
        </div>
        <div className="flex items-center px-6 py-16 sm:px-12 lg:px-20 xl:px-24">
          <div className="max-w-[700px]">
            <p className="mb-4 text-[10px] uppercase tracking-[.42em] text-[#a2762c]">{content.aboutEyebrow}</p>
            <h2 className="font-serif text-[clamp(2.7rem,4.2vw,4.7rem)] leading-[.98] tracking-[-.035em]">{content.aboutTitle}</h2>
            <p className="mt-7 max-w-[670px] text-base font-light leading-7 text-[#5b5752]">{content.aboutText}</p>
          </div>
        </div>
      </section>

      <section className="border-b border-[#e4dbcd] bg-[#fffdf8] px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[.42em] text-[#a2762c]">{content.pillarsEyebrow}</p>
          <h2 className="font-serif text-4xl tracking-[-.03em] sm:text-5xl">{content.pillarsTitle}</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-0">
            {content.pillars.map(([title, description], index) => {
              const Icon = pillarIcons[index];
              return <article key={title} className="flex flex-col items-center px-6 md:border-r md:border-[#ded3c3] md:last:border-r-0 lg:px-12">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f5efe5]"><Icon size={31} strokeWidth={1.25} /></span>
                <h3 className="mt-4 font-serif text-2xl">{title}</h3>
                <p className="mt-3 max-w-[340px] text-sm font-light leading-6 text-[#5f5a54]">{description}</p>
              </article>;
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-4 text-[10px] uppercase tracking-[.42em] text-[#a2762c]">{content.processEyebrow}</p>
          <h2 className="font-serif text-4xl tracking-[-.03em] sm:text-5xl">{content.processTitle}</h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {content.steps.map(([title, description], index) => <article key={title} className="px-5 lg:px-7">
              <div className="flex items-center">
                <span className={`h-px flex-1 bg-[#dbcba9] ${index === 0 ? "lg:invisible" : ""}`} />
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d8c49a] font-serif text-xl">{index + 1}</span>
                <span className={`h-px flex-1 bg-[#dbcba9] ${index === content.steps.length - 1 ? "lg:invisible" : ""}`} />
              </div>
              <h3 className="mt-4 font-serif text-xl">{title}</h3>
              <p className="mx-auto mt-3 max-w-[270px] text-sm font-light leading-6 text-[#5f5a54]">{description}</p>
            </article>)}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-16 text-center text-[#f8f2e8] lg:py-20">
        <Image src="/images/cema-etiquetas.png" alt="" fill sizes="100vw" className="object-cover grayscale brightness-[.23]" />
        <div className="absolute inset-0 bg-[#1a1510]/55" />
        <div className="relative mx-auto max-w-4xl">
          <h2 className="font-serif text-4xl leading-tight tracking-[-.03em] sm:text-5xl">{content.closingTitle}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm font-light leading-6 text-[#eee6da]">{content.closingText}</p>
          <Link href="/contato" className="mt-6 inline-flex min-h-14 items-center gap-5 bg-[#c89b31] px-10 text-[10px] font-medium uppercase tracking-[.28em] text-[#17140d] transition-colors hover:bg-[#d9b650]">{content.closingCta}<ArrowRight size={15} /></Link>
        </div>
      </section>
    </main>
  );
}
