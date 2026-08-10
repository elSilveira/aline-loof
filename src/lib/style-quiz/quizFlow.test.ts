import { describe, expect, it } from "vitest";

import { calculateStyleScores } from "./calculateStyleScores";
import { STYLE_QUIZ_QUESTIONS } from "./questions";
import { selectQuizAnswer, toStyleQuizAnswers } from "./quizAnswers";
import { rankStyles } from "./rankStyles";
import { STYLE_IDS, STYLE_TIE_BREAK_ORDER } from "./types";

describe("fluxo do quiz de estilo", () => {
  it("mantém os seis estilos disponíveis", () => {
    expect(STYLE_IDS).toHaveLength(6);
  });

  it("mantém somente a última alternativa escolhida em cada pergunta", () => {
    const firstChoice = selectQuizAnswer({}, "occasion", "refined");
    const secondChoice = selectQuizAnswer(firstChoice, "occasion", "bold");

    expect(secondChoice).toEqual({ occasion: "bold" });
    expect(firstChoice).toEqual({ occasion: "refined" });
  });

  it("preserva as respostas das outras perguntas ao voltar e trocar uma escolha", () => {
    const answers = selectQuizAnswer(
      selectQuizAnswer({}, "occasion", "refined"),
      "palette",
      "neutral",
    );
    const changedAnswers = selectQuizAnswer(answers, "occasion", "bold");

    expect(changedAnswers).toEqual({
      occasion: "bold",
      palette: "neutral",
    });
  });

  it("gera sempre o mesmo ranking para a mesma combinação", () => {
    const answers = toStyleQuizAnswers({
      occasion: "refined",
      palette: "neutral",
      silhouette: "minimal",
      finish: "polished",
    });
    const calculateRanking = () =>
      rankStyles(
        calculateStyleScores(
          STYLE_TIE_BREAK_ORDER,
          STYLE_QUIZ_QUESTIONS,
          answers,
        ),
        2,
      );

    const firstResult = calculateRanking();
    const secondResult = calculateRanking();

    expect(firstResult).toEqual(secondResult);
    expect(firstResult.map((item) => item.styleId)).toEqual([
      "elegante",
      "tradicional",
    ]);
  });

  it("mantém IDs e pesos fora dos textos traduzidos", () => {
    expect(STYLE_QUIZ_QUESTIONS.map((question) => question.id)).toEqual([
      "occasion",
      "palette",
      "silhouette",
      "finish",
    ]);
    expect(
      STYLE_QUIZ_QUESTIONS.every((question) =>
        question.alternatives.every(
          (alternative) =>
            Object.keys(alternative).length === 2 &&
            "id" in alternative &&
            "weights" in alternative,
        ),
      ),
    ).toBe(true);
  });
});
