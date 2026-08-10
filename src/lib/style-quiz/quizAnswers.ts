import type { StyleQuizAnswer } from "./types";

export type QuizAnswerMap = Readonly<Record<string, string>>;

/** Substitui somente a alternativa da pergunta informada. */
export function selectQuizAnswer(
  answers: QuizAnswerMap,
  questionId: string,
  alternativeId: string,
): QuizAnswerMap {
  return {
    ...answers,
    [questionId]: alternativeId,
  };
}

/** Converte o mapa usado pela interface na coleção usada pelo cálculo. */
export function toStyleQuizAnswers(
  answers: QuizAnswerMap,
): StyleQuizAnswer[] {
  return Object.entries(answers).map(([questionId, alternativeId]) => ({
    questionId,
    alternativeId,
  }));
}
