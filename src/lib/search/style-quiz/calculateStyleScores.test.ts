import { describe, expect, it } from "vitest";

import {
  calculateStyleScores,
  type StyleId,
  type StyleQuizAnswer,
  type StyleQuizQuestion,
} from "./calculateStyleScores";

const styleIds: readonly StyleId[] = [
  "elegante",
  "romantico",
  "criativo",
  "tradicional",
];

const questions: readonly StyleQuizQuestion[] = [
  {
    id: "question-1",
    alternatives: [
      {
        id: "alternative-1a",
        weights: {
          elegante: 2,
        },
      },
      {
        id: "alternative-1b",
        weights: {
          romantico: 2,
          criativo: 1,
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
          elegante: 1,
          tradicional: 2,
        },
      },
    ],
  },
];

describe("calculateStyleScores", () => {
  it("calcula uma combinação completa", () => {
    const answers: StyleQuizAnswer[] = [
      {
        questionId: "question-1",
        alternativeId: "alternative-1b",
      },
      {
        questionId: "question-2",
        alternativeId: "alternative-2a",
      },
    ];

    expect(calculateStyleScores(styleIds, questions, answers)).toEqual({
      elegante: 1,
      romantico: 2,
      criativo: 1,
      tradicional: 2,
    });
  });

  it("inicia todos os estilos com zero quando não existem respostas", () => {
    expect(calculateStyleScores(styleIds, questions, [])).toEqual({
      elegante: 0,
      romantico: 0,
      criativo: 0,
      tradicional: 0,
    });
  });

  it("ignora referências a perguntas e alternativas inexistentes", () => {
    const answers: StyleQuizAnswer[] = [
      {
        questionId: "question-inexistente",
        alternativeId: "alternative-1a",
      },
      {
        questionId: "question-1",
        alternativeId: "alternative-inexistente",
      },
    ];

    expect(calculateStyleScores(styleIds, questions, answers)).toEqual({
      elegante: 0,
      romantico: 0,
      criativo: 0,
      tradicional: 0,
    });
  });

  it("soma cada resposta repetida recebida", () => {
    const answers: StyleQuizAnswer[] = [
      {
        questionId: "question-1",
        alternativeId: "alternative-1a",
      },
      {
        questionId: "question-1",
        alternativeId: "alternative-1a",
      },
    ];

    expect(calculateStyleScores(styleIds, questions, answers)).toEqual({
      elegante: 4,
      romantico: 0,
      criativo: 0,
      tradicional: 0,
    });
  });

  it("não altera as perguntas nem as respostas recebidas", () => {
    const answers: StyleQuizAnswer[] = [
      {
        questionId: "question-1",
        alternativeId: "alternative-1a",
      },
    ];
    const originalQuestions = structuredClone(questions);
    const originalAnswers = structuredClone(answers);

    calculateStyleScores(styleIds, questions, answers);

    expect(questions).toEqual(originalQuestions);
    expect(answers).toEqual(originalAnswers);
  });
});
