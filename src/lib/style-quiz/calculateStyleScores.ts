import type {
  StyleId,
  StyleQuizAnswer,
  StyleQuizQuestion,
  StyleScores,
} from "./types";

export type {
  StyleId,
  StyleQuizAlternative,
  StyleQuizAnswer,
  StyleQuizQuestion,
  StyleScores,
} from "./types";

/**
 * Soma os pesos de todas as alternativas escolhidas.
 *
 * Perguntas e respostas não são modificadas. Referências inexistentes são
 * ignoradas, permitindo que a função lide com dados incompletos com segurança.
 */
export function calculateStyleScores(
  styleIds: readonly StyleId[],
  questions: readonly StyleQuizQuestion[],
  answers: readonly StyleQuizAnswer[],
): StyleScores {
  const initialScores = styleIds.reduce<StyleScores>(
    (scores, styleId) => ({
      ...scores,
      [styleId]: 0,
    }),
    {} as StyleScores,
  );

  return answers.reduce<StyleScores>((scores, answer) => {
    const question = questions.find(
      (item) => item.id === answer.questionId,
    );
    const alternative = question?.alternatives.find(
      (item) => item.id === answer.alternativeId,
    );

    if (!alternative) {
      return scores;
    }

    return Object.entries(alternative.weights).reduce<StyleScores>(
      (updatedScores, [styleId, weight]) => ({
        ...updatedScores,
        [styleId]:
          (updatedScores[styleId as StyleId] ?? 0) + weight,
      }),
      scores,
    );
  }, initialScores);
}
