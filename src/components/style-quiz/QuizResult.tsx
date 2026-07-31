"use client";

import { useTranslations } from "next-intl";

import type { RankedStyle } from "@/lib/style-quiz/rankStyles";

type Props = {
  ranking: readonly RankedStyle[];
  onRestart: () => void;
};

/** Mostra os dois estilos mais bem colocados e permite reiniciar o quiz. */
export default function QuizResult({ ranking, onRestart }: Props) {
  const t = useTranslations("StyleQuiz");

  return (
    <div className="text-center" aria-live="polite" aria-atomic="true">
      <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-[#B8942A]">
        {t("result.eyebrow")}
      </p>
      <h2 className="mb-8 font-serif text-3xl text-[#1C1C1C]">
        {t("result.title")}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {ranking.map((item, index) => (
          <article key={item.styleId} className="border border-[#D4C9A8] p-6">
            <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#B8942A]">
              {index === 0 ? t("result.first") : t("result.second")}
            </p>
            <h3 className="mb-2 font-serif text-2xl text-[#1C1C1C]">
              {t(`styles.${item.styleId}.name`)}
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-[#6B6560]">
              {t(`styles.${item.styleId}.description`)}
            </p>
            <p className="font-medium text-[#B8942A]">
              {t("result.percentage", {
                value: item.percentage.toFixed(1),
              })}
            </p>
          </article>
        ))}
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="mt-8 bg-[#1C1C1C] px-8 py-3 text-[11px] uppercase tracking-[0.2em] text-[#F0E8D8] transition-colors hover:bg-[#B8942A] hover:text-[#1C1C1C]"
      >
        {t("restart")}
      </button>
    </div>
  );
}
