import { describe, expect, it } from "vitest";

import { calculateStyleScores } from "./calculateStyleScores";
import {
  rankStyles,
  STYLE_TIE_BREAK_ORDER,
  type StyleScores,
} from "./rankStyles";
import type { StyleQuizAnswer, StyleQuizQuestion } from "./types";

const scores: StyleScores = {
  tradicional: 2,
  elegante: 8,
  esportivo: 0,
  romantico: 5,
  criativo: 3,
  dramatico: 2,
};

describe("rankStyles", () => {
  it("ordena os estilos do maior para o menor número de pontos", () => {
    expect(rankStyles(scores).map((item) => item.styleId)).toEqual([
      "elegante",
      "romantico",
      "criativo",
      "tradicional",
      "dramatico",
      "esportivo",
    ]);
  });

  it("usa a ordem fixa para desempatar e compartilha posições", () => {
    const tiedScores: StyleScores = {
      tradicional: 8,
      elegante: 5,
      esportivo: 5,
      romantico: 2,
      criativo: 0,
      dramatico: 0,
    };

    const result = rankStyles(tiedScores);

    expect(result.map((item) => item.styleId)).toEqual([
      "tradicional",
      "elegante",
      "esportivo",
      "romantico",
      "criativo",
      "dramatico",
    ]);
    expect(result.map((item) => item.position)).toEqual([1, 2, 2, 4, 5, 5]);
  });

  it("calcula o percentual de cada estilo", () => {
    const result = rankStyles(scores);
    const elegantStyle = result.find(
      (item) => item.styleId === "elegante",
    );

    expect(elegantStyle?.percentage).toBeCloseTo(40);
    expect(
      result.reduce((total, item) => total + item.percentage, 0),
    ).toBeCloseTo(100);
  });

  it("pula a posição seguinte depois de um empate", () => {
    const tiedScores: StyleScores = {
      tradicional: 6,
      elegante: 6,
      esportivo: 4,
      romantico: 3,
      criativo: 2,
      dramatico: 1,
    };

    const result = rankStyles(tiedScores);

    expect(result[0].position).toBe(1);
    expect(result[1].position).toBe(1);
    expect(result[2].position).toBe(3);
  });

  it("devolve percentual zero quando não existem pontos", () => {
    const zeroScores: StyleScores = {
      tradicional: 0,
      elegante: 0,
      esportivo: 0,
      romantico: 0,
      criativo: 0,
      dramatico: 0,
    };

    const result = rankStyles(zeroScores);

    expect(result.every((item) => item.percentage === 0)).toBe(true);
    expect(result.every((item) => Number.isFinite(item.percentage))).toBe(true);
  });

  it("retorna os seis estilos quando o limite não é informado", () => {
    expect(rankStyles(scores)).toHaveLength(STYLE_TIE_BREAK_ORDER.length);
  });

  it("aplica um limite inteiro, não negativo e seguro", () => {
    expect(rankStyles(scores, 3)).toHaveLength(3);
    expect(rankStyles(scores, 3.8)).toHaveLength(3);
    expect(rankStyles(scores, -2)).toEqual([]);
  });

  it("não modifica as pontuações recebidas", () => {
    const originalScores = { ...scores };

    rankStyles(scores);

    expect(scores).toEqual(originalScores);
  });

  it("calcula as pontuações e retorna os três primeiros estilos", () => {
    const questions: StyleQuizQuestion[] = [
      {
        id: "question-1",
        alternatives: [
          {
            id: "alternative-1a",
            weights: {
              elegante: 5,
              romantico: 5,
              criativo: 3,
            },
          },
        ],
      },
      {
        id: "question-2",
        alternatives: [
          {
            id: "alternative-2a",
            weights: {
              tradicional: 2,
              elegante: 3,
              dramatico: 2,
            },
          },
        ],
      },
    ];
    const answers: StyleQuizAnswer[] = [
      {
        questionId: "question-1",
        alternativeId: "alternative-1a",
      },
      {
        questionId: "question-2",
        alternativeId: "alternative-2a",
      },
    ];

    const calculatedScores = calculateStyleScores(
      STYLE_TIE_BREAK_ORDER,
      questions,
      answers,
    );
    const ranking = rankStyles(calculatedScores, 3);

    expect(calculatedScores).toEqual(scores);
    expect(ranking).toEqual([
      {
        styleId: "elegante",
        points: 8,
        position: 1,
        percentage: 40,
      },
      {
        styleId: "romantico",
        points: 5,
        position: 2,
        percentage: 25,
      },
      {
        styleId: "criativo",
        points: 3,
        position: 3,
        percentage: 15,
      },
    ]);
  });
});
