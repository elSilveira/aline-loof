import type { StyleId } from "./rankStyles";

/** Uma alternativa e os pontos que ela adiciona aos estilos. */
export type StyleQuizAlternative = {
  readonly id: string;
  readonly weights: Readonly<Partial<Record<StyleId, number>>>;
};

/** Uma pergunta e suas alternativas disponíveis. */
export type StyleQuizQuestion = {
  readonly id: string;
  readonly alternatives: readonly StyleQuizAlternative[];
};

/** A alternativa escolhida pelo usuário para uma pergunta. */
export type StyleQuizAnswer = {
  readonly questionId: string;
  readonly alternativeId: string;
};
