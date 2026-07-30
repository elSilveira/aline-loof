/** Identificador de um estilo usado pelo quiz. */
export type StyleId = string;

/** Pontos que uma alternativa adiciona a cada estilo. */
export type StyleWeights = Readonly<Record<StyleId, number>>;

/** Uma alternativa disponível em uma pergunta. */
export type StyleQuizAlternative = {
  readonly id: string;
  readonly weights: StyleWeights;
};

/** Uma pergunta e suas alternativas. */
export type StyleQuizQuestion = {
  readonly id: string;
  readonly alternatives: readonly StyleQuizAlternative[];
};

/** A alternativa escolhida para uma pergunta. */
export type StyleQuizAnswer = {
  readonly questionId: string;
  readonly alternativeId: string;
};

/** Pontuação total de cada estilo. */
export type StyleScores = Record<StyleId, number>;

// Mantém os nomes curtos disponíveis para código que já os utiliza.
export type Alternative = StyleQuizAlternative;
export type Question = StyleQuizQuestion;
export type Answer = StyleQuizAnswer;

/**
 * Soma os pesos das alternativas escolhidas sem alterar os dados recebidos.
 * Respostas com identificadores inexistentes são ignoradas.
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
    {},
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
        [styleId]: (updatedScores[styleId] ?? 0) + weight,
      }),
      scores,
    );
  }, initialScores);
}
