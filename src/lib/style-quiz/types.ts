/**
 * Lista todos os estilos e também define a ordem usada em empates.
 */
export const STYLE_TIE_BREAK_ORDER = [
  "tradicional",
  "elegante",
  "esportivo",
  "romantico",
  "criativo",
  "dramatico",
] as const;

/** Nome alternativo para a coleção dos seis estilos disponíveis. */
export const STYLE_IDS = STYLE_TIE_BREAK_ORDER;

/** Um dos estilos reconhecidos pelo questionário. */
export type StyleId = (typeof STYLE_TIE_BREAK_ORDER)[number];

/** Pontuação obrigatória para cada estilo. */
export type StyleScores = Record<StyleId, number>;

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

/** A alternativa escolhida para uma pergunta. */
export type StyleQuizAnswer = {
  readonly questionId: string;
  readonly alternativeId: string;
};
