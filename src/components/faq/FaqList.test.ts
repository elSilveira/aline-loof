import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  HighlightedText,
  searchAndRankFaqItems,
  type FaqItem,
} from "./FaqList";

const items: FaqItem[] = [
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

function renderHighlight(text: string, query: string): string {
  return renderToStaticMarkup(
    createElement(HighlightedText, { text, query }),
  );
}

function getMarkedValues(html: string): string[] {
  return [...html.matchAll(/<mark[^>]*>(.*?)<\/mark>/g)].map(
    ([, value]) => value,
  );
}

describe("searchAndRankFaqItems", () => {
  it("ordena os resultados por relevância", () => {
    expect(
      searchAndRankFaqItems(items, "pagamento").map((item) => item.question),
    ).toEqual([
      "Pagamento",
      "Pagamento parcelado",
      "Como funciona o pagamento?",
      "Quais cartões são aceitos?",
    ]);
  });

  it("ignora maiúsculas e acentos", () => {
    expect(
      searchAndRankFaqItems(items, "CARTAO").map((item) => item.question),
    ).toEqual(["Pagamento"]);
    expect(searchAndRankFaqItems(items, "cartao")).toEqual(
      searchAndRankFaqItems(items, "CARTAO"),
    );
  });

  it("restaura a ordem original para uma busca vazia", () => {
    expect(searchAndRankFaqItems(items, "")).toEqual(items);
  });

  it("retorna vazio quando não encontra resultados", () => {
    expect(searchAndRankFaqItems(items, "helicóptero")).toEqual([]);
  });
});

describe("HighlightedText", () => {
  it("28: destaca um termo no começo", () => {
    const html = renderHighlight("Pagamento parcelado", "pagamento");

    expect(getMarkedValues(html)).toEqual(["Pagamento"]);
  });

  it("29: destaca somente o termo no meio", () => {
    const html = renderHighlight(
      "Como funciona a consultoria?",
      "consultoria",
    );

    expect(getMarkedValues(html)).toEqual(["consultoria"]);
  });

  it("30: destaca todas as ocorrências repetidas", () => {
    const html = renderHighlight(
      "O pagamento pode ser feito após o pagamento da entrada.",
      "pagamento",
    );

    expect(getMarkedValues(html)).toEqual(["pagamento", "pagamento"]);
  });

  it("31: preserva as letras originais ao buscar em maiúsculas", () => {
    const html = renderHighlight("Pagamento", "PAGAMENTO");

    expect(getMarkedValues(html)).toEqual(["Pagamento"]);
    expect(html).not.toContain(">PAGAMENTO</mark>");
  });

  it("32: preserva o acento original", () => {
    const html = renderHighlight("Sessão", "sessao");

    expect(getMarkedValues(html)).toEqual(["Sessão"]);
    expect(html).not.toContain(">sessao</mark>");
    expect(html).not.toContain(">Sessao</mark>");
  });

  it("33: não cria mark para uma busca vazia", () => {
    const html = renderHighlight("Pagamento", "");

    expect(html).not.toContain("<mark");
    expect(html).toContain("Pagamento");
    expect(searchAndRankFaqItems(items, "")).toEqual(items);
  });
});
