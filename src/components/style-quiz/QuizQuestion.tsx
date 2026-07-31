"use client";

import { useTranslations } from "next-intl";

import type { StyleQuizQuestion } from "@/lib/style-quiz/types";

type Props = {
  question: StyleQuizQuestion;
  selectedAlternativeId?: string;
  onSelect: (alternativeId: string) => void;
};

/** Exibe uma pergunta por vez e permite somente uma alternativa selecionada. */
export default function QuizQuestion({
  question,
  selectedAlternativeId,
  onSelect,
}: Props) {
  const t = useTranslations("StyleQuiz");

  return (
    <fieldset className="space-y-3">
      <legend className="mb-6 font-serif text-2xl text-[#1C1C1C]">
        {t(`questions.${question.id}.title`)}
      </legend>

      {question.alternatives.map((alternative) => {
        const inputId = `style-quiz-${question.id}-${alternative.id}`;

        return (
          <label
            key={alternative.id}
            htmlFor={inputId}
            className="flex cursor-pointer items-center gap-3 border border-[#D4C9A8] px-4 py-3 text-left text-[#1C1C1C] transition-colors has-checked:border-[#B8942A] has-checked:bg-[#F5EED8]"
          >
            <input
              id={inputId}
              type="radio"
              name="style-quiz-answer"
              value={alternative.id}
              checked={selectedAlternativeId === alternative.id}
              onChange={() => onSelect(alternative.id)}
              className="accent-[#B8942A]"
            />
            <span>{t(`questions.${question.id}.alternatives.${alternative.id}`)}</span>
          </label>
        );
      })}
    </fieldset>
  );
}
