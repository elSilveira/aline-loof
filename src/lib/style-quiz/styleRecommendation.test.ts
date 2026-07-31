import { describe, expect, it } from "vitest";

import { getStyleRecommendation } from "./getStyleRecommendation";
import { rankStyles, type StyleScores } from "./rankStyles";

const scores: StyleScores = {
  tradicional: 2,
  elegante: 8,
  esportivo: 0,
  romantico: 5,
  criativo: 3,
  dramatico: 2,
};

describe("getStyleRecommendation", () => {
  it("retorna o estilo mais bem colocado no ranking", () => {
    const ranking = rankStyles(scores);

    expect(getStyleRecommendation(ranking)).toEqual({
      styleId: "elegante",
      points: 8,
      position: 1,
      percentage: 40,
    });
  });

  it("retorna null quando o ranking está vazio", () => {
    expect(getStyleRecommendation([])).toBeNull();
  });

  it("não modifica o ranking recebido", () => {
    const ranking = rankStyles(scores);
    const originalRanking = structuredClone(ranking);

    const recommendation = getStyleRecommendation(ranking);

    expect(ranking).toEqual(originalRanking);
    expect(recommendation).not.toBe(ranking[0]);
  });
});
