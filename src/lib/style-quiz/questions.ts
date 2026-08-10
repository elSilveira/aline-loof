import type { StyleQuizQuestion } from "./types";

/**
 * IDs e pesos compartilhados por todos os idiomas.
 * Os textos correspondentes ficam nos arquivos de tradução.
 */
export const STYLE_QUIZ_QUESTIONS = [
  {
    id: "occasion",
    alternatives: [
      { id: "refined", weights: { elegante: 2, tradicional: 1 } },
      { id: "relaxed", weights: { esportivo: 2, criativo: 1 } },
      { id: "romantic", weights: { romantico: 2, elegante: 1 } },
      { id: "bold", weights: { dramatico: 2, criativo: 1 } },
    ],
  },
  {
    id: "palette",
    alternatives: [
      { id: "neutral", weights: { tradicional: 2, elegante: 1 } },
      { id: "soft", weights: { romantico: 2, elegante: 1 } },
      { id: "vibrant", weights: { criativo: 2, dramatico: 1 } },
      { id: "contrast", weights: { dramatico: 2, tradicional: 1 } },
    ],
  },
  {
    id: "silhouette",
    alternatives: [
      { id: "minimal", weights: { elegante: 2, tradicional: 1 } },
      { id: "classic", weights: { tradicional: 2, elegante: 1 } },
      { id: "comfortable", weights: { esportivo: 2, romantico: 1 } },
      { id: "fluid", weights: { romantico: 2, criativo: 1 } },
    ],
  },
  {
    id: "finish",
    alternatives: [
      { id: "polished", weights: { elegante: 2, tradicional: 1 } },
      { id: "timeless", weights: { tradicional: 2, elegante: 1 } },
      { id: "practical", weights: { esportivo: 2, tradicional: 1 } },
      { id: "creative", weights: { criativo: 2, dramatico: 1 } },
    ],
  },
] as const satisfies readonly StyleQuizQuestion[];
