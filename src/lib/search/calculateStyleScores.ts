import type { StyleId, StyleScores } from "./rankStyles";
import type { StyleQuizAnswer, StyleQuizQuestion } from "./types";

export type {
  StyleQuizAlternative,
  StyleQuizAnswer,
  StyleQuizQuestion,
} from "./types";

/**
 * Soma os pesos de todas as respostas recebidas.
 *
 * A função cria um novo mapa e não modifica perguntas nem respostas. Itens com
 * identificadores inexistentes são ignorados.
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
        [styleId]: (updatedScores[styleId as StyleId] ?? 0) + weight,
      }),
      scores,
    );
  }, initialScores);
}
