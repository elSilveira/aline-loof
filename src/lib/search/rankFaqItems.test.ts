import { describe, expect, it } from "vitest";

import { filterFaqItems } from "./filterFaqItems";
import { rankFaqItems } from "./rankFaqItems";

const items = [
  {
    question: "Como funciona a consultoria?",
    answer: "A consultoria começa com uma conversa.",
  },
  {
    question: "Consultoria online",
    answer: "O atendimento acontece por videochamada.",
  },
  {
    question: "Quais serviços estão disponíveis?",
    answer: "A consultoria de imagem é um dos serviços.",
  },
  {
    question: "Quanto tempo dura o atendimento?",
    answer: "A duração depende do serviço escolhido.",
  },
];

const paymentItems = [
  {
    question: "Quais cartões são aceitos?",
    answer: "O pagamento pode ser feito com as principais bandeiras.",
  },
  {
    question: "Como funciona o pagamento?",
    answer: "Você recebe as instruções antes da consultoria.",
  },
  {
    question: "Pagamento parcelado",
    answer: "O número de parcelas depende do serviço.",
  },
  {
    question: "Pagamento",
    answer: "Aceitamos PIX e cartão.",
  },
];

function searchFaqItems<T extends { question: string; answer: string }>(
  faqItems: readonly T[],
  query: string,
): T[] {
  return rankFaqItems(filterFaqItems(faqItems, query), query);
}

describe("rankFaqItems", () => {
  it("prioriza pergunta exata, início da pergunta, pergunta e resposta", () => {
    const shuffledItems = [items[2], items[0], items[1]];

    expect(rankFaqItems(shuffledItems, "consultoria")).toEqual([
      items[1],
      items[0],
      items[2],
    ]);
  });

  it("ignora maiúsculas e acentos ao calcular a relevância", () => {
    const accentedItems = [
      {
        question: "Como funciona o atendimento?",
        answer: "A duração varia.",
      },
      {
        question: "Duração",
        answer: "Depende do serviço.",
      },
    ];

    expect(rankFaqItems(accentedItems, "DURACAO")).toEqual([
      accentedItems[1],
      accentedItems[0],
    ]);
  });

  it("preserva a ordem original quando os itens têm a mesma relevância", () => {
    const tiedItems = [
      {
        question: "Como funciona?",
        answer: "A consultoria começa com uma conversa.",
      },
      {
        question: "Quanto tempo dura?",
        answer: "Cada consultoria tem uma duração diferente.",
      },
    ];

    expect(rankFaqItems(tiedItems, "consultoria")).toEqual(tiedItems);
  });

  it("devolve todos os itens na ordem original para um termo vazio", () => {
    expect(rankFaqItems(items, "   ")).toEqual(items);
  });

  it("não modifica o array original", () => {
    const original = items.map((item) => ({ ...item }));

    rankFaqItems(items, "consultoria");

    expect(items).toEqual(original);
  });

  it("ordena pergunta exata, início, conteúdo e ocorrência na resposta", () => {
    expect(
      searchFaqItems(paymentItems, "pagamento").map((item) => item.question),
    ).toEqual([
      "Pagamento",
      "Pagamento parcelado",
      "Como funciona o pagamento?",
      "Quais cartões são aceitos?",
    ]);
  });

  it("mantém a mesma ordem para pagamento em maiúsculas", () => {
    expect(searchFaqItems(paymentItems, "PAGAMENTO")).toEqual(
      searchFaqItems(paymentItems, "pagamento"),
    );
  });

  it.each(["CARTAO", "cartao"])(
    "encontra Cartão buscando por %s",
    (query) => {
      expect(
        searchFaqItems(
          [
            {
              question: "Cartão",
              answer: "Consulte as bandeiras aceitas.",
            },
          ],
          query,
        ).map((item) => item.question),
      ).toEqual(["Cartão"]);
    },
  );

  it("restaura todos os itens na ordem original ao apagar a busca", () => {
    expect(searchFaqItems(paymentItems, "")).toEqual(paymentItems);
  });

  it("não encontra resultados para helicóptero", () => {
    expect(searchFaqItems(paymentItems, "helicóptero")).toEqual([]);
  });
});
