import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, BarChart3, Gem, Target, UserRound } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

const copy = {
  pt: {
    title: "Mentoria de imagem e estilo",
    description: "Um acompanhamento individual para alinhar sua imagem, seu estilo e seus objetivos de vida.",
    heroTitle: "Uma versão mais confiante de você começa aqui.",
    heroText: "A mentoria é um acompanhamento personalizado para mulheres que desejam alinhar imagem, estilo e comportamento com seus objetivos de vida.",
    heroCta: "Quero conhecer a mentoria",
    statement: "Mais do que imagem, um posicionamento de vida.",
    aboutEyebrow: "O que é a mentoria",
    aboutTitle: "Um acompanhamento completo e individual",
    aboutText1: "A mentoria de imagem é um processo contínuo e personalizado, onde trabalhamos juntas para desenvolver uma imagem autêntica, estratégica e coerente com quem você é e com o que deseja conquistar.",
    aboutText2: "Através de encontros, orientações práticas e suporte, você aprende a usar sua imagem como uma ferramenta de expressão, confiança e oportunidades.",
    audienceEyebrow: "Para quem é",
    audienceTitle: "Essa mentoria é para você que:",
    audience: ["Deseja se sentir mais segura e confiante no seu dia a dia", "Quer uma imagem alinhada aos seus objetivos pessoais e profissionais", "Busca mais clareza no seu estilo e nas suas escolhas", "Entende que imagem também é estratégia e abre portas"],
    processEyebrow: "Como funciona",
    processTitle: "O seu processo de transformação",
    steps: [["Diagnóstico", "Entendemos sua história, seus objetivos e sua realidade atual."], ["Planejamento", "Criamos um plano personalizado de acordo com suas necessidades."], ["Acompanhamento", "Encontros, orientações práticas e suporte contínuo."], ["Resultados", "Uma imagem autêntica, segura e alinhada com a sua melhor versão."]],
    closingEyebrow: "Pronta para essa jornada?",
    closingTitle: "Vamos juntas construir a sua melhor versão.",
    closingText: "Fale com a minha equipe para saber mais sobre a mentoria e encontrar o formato ideal para o seu momento.",
    closingCta: "Fale com a minha equipe",
  },
  en: {
    title: "Image and style mentorship", description: "Individual guidance to align your image, style and life goals.", heroTitle: "A more confident version of you starts here.", heroText: "A personalized journey for women who want to align image, style and behavior with their life goals.", heroCta: "Discover the mentorship", statement: "More than image, a position for life.", aboutEyebrow: "What the mentorship is", aboutTitle: "Complete, individual guidance", aboutText1: "Image mentorship is an ongoing, personalized process in which we work together to build an authentic, strategic image aligned with who you are and what you want to achieve.", aboutText2: "Through meetings, practical guidance and support, you learn to use your image as a tool for expression, confidence and opportunity.", audienceEyebrow: "Who it is for", audienceTitle: "This mentorship is for you if you:", audience: ["Want to feel safer and more confident every day", "Want an image aligned with personal and professional goals", "Seek greater clarity in your style and choices", "Understand that image is also strategy and opens doors"], processEyebrow: "How it works", processTitle: "Your transformation process", steps: [["Diagnosis", "We understand your story, goals and current reality."], ["Planning", "We create a personalized plan for your needs."], ["Guidance", "Meetings, practical direction and ongoing support."], ["Results", "An authentic, confident image aligned with your best self."]], closingEyebrow: "Ready for this journey?", closingTitle: "Let’s build your best version together.", closingText: "Talk to my team to learn more and find the right mentorship format for you.", closingCta: "Talk to my team",
  },
  es: {
    title: "Mentoría de imagen y estilo", description: "Un acompañamiento individual para alinear tu imagen, estilo y objetivos de vida.", heroTitle: "Una versión más segura de ti comienza aquí.", heroText: "Un acompañamiento personalizado para mujeres que desean alinear imagen, estilo y comportamiento con sus objetivos de vida.", heroCta: "Quiero conocer la mentoría", statement: "Más que imagen, un posicionamiento de vida.", aboutEyebrow: "Qué es la mentoría", aboutTitle: "Un acompañamiento completo e individual", aboutText1: "La mentoría de imagen es un proceso continuo y personalizado en el que trabajamos juntas para desarrollar una imagen auténtica, estratégica y coherente con quien eres y lo que deseas conquistar.", aboutText2: "A través de encuentros, orientación práctica y apoyo, aprendes a usar tu imagen como herramienta de expresión, confianza y oportunidades.", audienceEyebrow: "Para quién es", audienceTitle: "Esta mentoría es para ti si:", audience: ["Deseas sentirte más segura y confiada cada día", "Quieres una imagen alineada con tus objetivos", "Buscas más claridad en tu estilo y decisiones", "Entiendes que la imagen también es estrategia"], processEyebrow: "Cómo funciona", processTitle: "Tu proceso de transformación", steps: [["Diagnóstico", "Entendemos tu historia, objetivos y realidad actual."], ["Planificación", "Creamos un plan personalizado para tus necesidades."], ["Acompañamiento", "Encuentros, orientación práctica y apoyo continuo."], ["Resultados", "Una imagen auténtica, segura y alineada con tu mejor versión."]], closingEyebrow: "¿Lista para este viaje?", closingTitle: "Construyamos juntas tu mejor versión.", closingText: "Habla con mi equipo para conocer la mentoría y encontrar el formato ideal para ti.", closingCta: "Habla con mi equipo",
  },
  fr: {
    title: "Mentorat en image et style", description: "Un accompagnement individuel pour aligner votre image, votre style et vos objectifs de vie.", heroTitle: "Une version plus confiante de vous commence ici.", heroText: "Un accompagnement personnalisé pour les femmes qui souhaitent aligner image, style et comportement avec leurs objectifs de vie.", heroCta: "Découvrir le mentorat", statement: "Plus qu’une image, un positionnement de vie.", aboutEyebrow: "Le mentorat", aboutTitle: "Un accompagnement complet et individuel", aboutText1: "Le mentorat en image est un processus continu et personnalisé où nous travaillons ensemble à construire une image authentique, stratégique et cohérente avec qui vous êtes.", aboutText2: "Grâce aux rencontres, aux conseils pratiques et au soutien, vous apprenez à utiliser votre image comme outil d’expression, de confiance et d’opportunités.", audienceEyebrow: "Pour qui", audienceTitle: "Ce mentorat est fait pour vous si vous :", audience: ["Souhaitez vous sentir plus sûre au quotidien", "Voulez une image alignée avec vos objectifs", "Recherchez plus de clarté dans votre style", "Comprenez que l’image est aussi une stratégie"], processEyebrow: "Comment ça marche", processTitle: "Votre processus de transformation", steps: [["Diagnostic", "Nous découvrons votre histoire, vos objectifs et votre réalité."], ["Planification", "Nous créons un plan personnalisé selon vos besoins."], ["Accompagnement", "Rencontres, conseils pratiques et soutien continu."], ["Résultats", "Une image authentique, sûre et alignée avec votre meilleure version."]], closingEyebrow: "Prête pour ce voyage ?", closingTitle: "Construisons ensemble votre meilleure version.", closingText: "Parlez à mon équipe pour découvrir le mentorat et trouver la formule idéale.", closingCta: "Parler à mon équipe",
  },
} as const;

const audienceIcons = [UserRound, Target, Gem, BarChart3];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const content = copy[locale as keyof typeof copy] ?? copy.pt;
  return pageMetadata({ locale, path: "mentoria", title: content.title, description: content.description });
}

export default async function MentoriaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = copy[locale as keyof typeof copy] ?? copy.pt;

  return (
    <div className="bg-[#fbf8f2] text-[#24211e]">
      <section className="relative min-h-[760px] overflow-hidden border-b border-[#d9cfbf] pt-20 lg:min-h-[720px]">
        <div className="mx-auto grid min-h-[680px] max-w-[1440px] lg:grid-cols-[1.02fr_.98fr]">
          <div className="relative z-10 flex items-center px-6 py-20 sm:px-10 lg:px-20 xl:px-28">
            <div className="max-w-[620px]">
              <p className="mb-6 text-[11px] uppercase tracking-[0.42em] text-[#846627]">{content.title}</p>
              <h1 className="font-serif text-[clamp(3.15rem,6vw,6.6rem)] font-normal leading-[.93] tracking-[-.045em] text-[#201f1d]">{content.heroTitle}</h1>
              <p className="mt-8 max-w-[560px] text-base font-light leading-7 text-[#5d5852] sm:text-lg">{content.heroText}</p>
              <Link href="/contato" className="mt-10 inline-flex min-h-14 items-center gap-4 bg-[#c69c32] px-8 text-[10px] font-medium uppercase tracking-[.28em] text-[#211f1b] transition-colors hover:bg-[#d7b652]">{content.heroCta}<ArrowRight size={15} /></Link>
              <div className="mt-9 h-12 w-px bg-[#b8942a]" />
            </div>
          </div>
          <div className="relative min-h-[560px] lg:min-h-full">
            <Image src="/images/aline-loof-sobre.png" alt="Aline Loof, consultora de imagem" fill priority sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover object-[50%_36%]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#fbf8f2] via-transparent to-transparent opacity-40 lg:opacity-20" />
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-[.9fr_1.1fr]">
        <div className="relative flex min-h-[470px] items-end overflow-hidden bg-[#171715] p-10 sm:p-16 lg:p-20">
          <Image src="/images/aline-loof-sobre.png" alt="" fill sizes="(max-width: 1023px) 100vw, 45vw" className="object-cover object-[50%_40%] grayscale brightness-[.34] contrast-125" />
          <div className="absolute inset-0 bg-[#181613]/35" />
          <div className="relative max-w-md"><p className="font-serif text-4xl leading-tight text-[#f6efe2] sm:text-5xl">{content.statement}</p><div className="mt-8 h-12 w-px bg-[#b8942a]" /></div>
        </div>
        <div className="flex items-center px-6 py-20 sm:px-12 lg:px-20 xl:px-24">
          <div className="max-w-2xl"><p className="mb-5 text-[10px] uppercase tracking-[.42em] text-[#9b792d]">{content.aboutEyebrow}</p><h2 className="font-serif text-4xl leading-[1.05] tracking-[-.025em] sm:text-6xl">{content.aboutTitle}</h2><div className="mt-8 space-y-5 text-[15px] font-light leading-7 text-[#5d5852]"><p>{content.aboutText1}</p><p>{content.aboutText2}</p></div></div>
        </div>
      </section>

      <section className="border-y border-[#e0d6c7] bg-[#fffdf8] px-6 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl text-center"><p className="mb-4 text-[10px] uppercase tracking-[.42em] text-[#9b792d]">{content.audienceEyebrow}</p><h2 className="font-serif text-4xl tracking-[-.025em] sm:text-5xl">{content.audienceTitle}</h2>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4">{content.audience.map((item, index) => { const Icon = audienceIcons[index]; return <div key={item} className="flex min-h-48 flex-col items-center justify-start border-[#ddd2c2] px-7 py-5 lg:border-r lg:last:border-r-0"><Icon size={34} strokeWidth={1.15} className="mb-7 text-[#34312d]" /><p className="max-w-[230px] text-sm font-light leading-6 text-[#514c47]">{item}</p></div>; })}</div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-12 lg:py-24"><div className="mx-auto max-w-7xl"><div className="text-center"><p className="mb-4 text-[10px] uppercase tracking-[.42em] text-[#6f675e]">{content.processEyebrow}</p><h2 className="font-serif text-4xl tracking-[-.025em] sm:text-5xl">{content.processTitle}</h2></div>
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">{content.steps.map(([title, description], index) => <div key={title}><div className="flex items-center gap-5"><span className="font-serif text-2xl">{String(index + 1).padStart(2, "0")}</span><span className="h-px flex-1 bg-[#bfb5a6]" /></div><h3 className="mt-5 text-sm font-medium">{title}</h3><p className="mt-3 text-sm font-light leading-6 text-[#5d5852]">{description}</p></div>)}</div>
      </div></section>

      <section className="relative overflow-hidden px-6 py-24 text-center text-[#f7f0e6] lg:py-28"><Image src="/images/cema-etiquetas.png" alt="" fill sizes="100vw" className="object-cover grayscale brightness-[.28]" /><div className="absolute inset-0 bg-[#1a1611]/55" /><div className="relative mx-auto max-w-3xl"><p className="mb-5 text-[10px] uppercase tracking-[.42em] text-[#d0a942]">{content.closingEyebrow}</p><h2 className="font-serif text-4xl leading-tight tracking-[-.025em] sm:text-6xl">{content.closingTitle}</h2><p className="mx-auto mt-5 max-w-2xl text-sm font-light leading-6 text-[#e6ded1]">{content.closingText}</p><Link href="/contato" className="mt-9 inline-flex min-h-14 items-center gap-4 bg-[#c69c32] px-9 text-[10px] font-medium uppercase tracking-[.28em] text-[#211f1b] transition-colors hover:bg-[#d7b652]">{content.closingCta}<ArrowRight size={15} /></Link></div></section>
    </div>
  );
}
