"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { calculateStyleScores } from "@/lib/style-quiz/calculateStyleScores";
import { STYLE_QUIZ_QUESTIONS } from "@/lib/style-quiz/questions";
import {
  selectQuizAnswer,
  toStyleQuizAnswers,
  type QuizAnswerMap,
} from "@/lib/style-quiz/quizAnswers";
import { rankStyles } from "@/lib/style-quiz/rankStyles";
import { STYLE_TIE_BREAK_ORDER } from "@/lib/style-quiz/types";
import QuizQuestion from "./QuizQuestion";
import QuizResult from "./QuizResult";

/** Controla as respostas, a navegação e o resultado do questionário. */
export default function StyleQuiz() {
  const t = useTranslations("StyleQuiz");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswerMap>({});
  const [isComplete, setIsComplete] = useState(false);
  const question = STYLE_QUIZ_QUESTIONS[questionIndex];
  const selectedAlternativeId = answers[question.id];
  const isLastQuestion = questionIndex === STYLE_QUIZ_QUESTIONS.length - 1;

  const ranking = isComplete
    ? rankStyles(
        calculateStyleScores(
          STYLE_TIE_BREAK_ORDER,
          STYLE_QUIZ_QUESTIONS,
          toStyleQuizAnswers(answers),
        ),
        2,
      )
    : [];

  function selectAlternative(alternativeId: string) {
    setAnswers((current) =>
      selectQuizAnswer(current, question.id, alternativeId),
    );
  }

  function advance() {
    if (!selectedAlternativeId) return;
    if (isLastQuestion) setIsComplete(true);
    else setQuestionIndex((current) => current + 1);
  }

  function restart() {
    setAnswers({});
    setQuestionIndex(0);
    setIsComplete(false);
  }

  return (
    <div className="border border-[#D4C9A8] bg-[#F5EED8]/30 px-6 py-10 md:px-12">
      {isComplete ? (
        <QuizResult ranking={ranking} onRestart={restart} />
      ) : (
        <>
          <header className="mb-8 text-center">
            <p className="mb-3 text-[10px] uppercase tracking-[0.4em] text-[#B8942A]">
              {t("eyebrow")}
            </p>
            <h2 className="mb-3 font-serif text-3xl text-[#1C1C1C] md:text-4xl">
              {t("title")}
            </h2>
            <p className="mx-auto max-w-xl text-[#6B6560]">{t("description")}</p>
          </header>

          <p className="mb-5 text-sm text-[#6B6560]" aria-live="polite">
            {t("progress", {
              current: questionIndex + 1,
              total: STYLE_QUIZ_QUESTIONS.length,
            })}
          </p>
          <QuizQuestion
            question={question}
            selectedAlternativeId={selectedAlternativeId}
            onSelect={selectAlternative}
          />

          <div className="mt-8 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setQuestionIndex((current) => current - 1)}
              disabled={questionIndex === 0}
              className="border border-[#D4C9A8] px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-[#1C1C1C] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t("back")}
            </button>
            <button
              type="button"
              onClick={advance}
              disabled={!selectedAlternativeId}
              className="bg-[#B8942A] px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-[#1C1C1C] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isLastQuestion ? t("viewResult") : t("next")}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
