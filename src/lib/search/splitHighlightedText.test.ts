import { describe, expect, it } from "vitest";

import { splitHighlightedText } from "./splitHighlightedText";

describe("splitHighlightedText", () => {
  it("separa o termo encontrado do restante do texto", () => {
    expect(splitHighlightedText("Formas de pagamento disponíveis", "pagamento"))
      .toEqual([
        { text: "Formas de ", highlighted: false },
        { text: "pagamento", highlighted: true },
        { text: " disponíveis", highlighted: false },
      ]);
  });

  it.each(["CARTAO", "cartao"])(
    "encontra Cartão buscando por %s e preserva a escrita original",
    (query) => {
      expect(splitHighlightedText("Pagamento no Cartão", query)).toEqual([
        { text: "Pagamento no ", highlighted: false },
        { text: "Cartão", highlighted: true },
      ]);
    },
  );

  it("destaca todas as ocorrências sem diferenciar maiúsculas", () => {
    expect(splitHighlightedText("PIX, pix ou Pix", "pix")).toEqual([
      { text: "PIX", highlighted: true },
      { text: ", ", highlighted: false },
      { text: "pix", highlighted: true },
      { text: " ou ", highlighted: false },
      { text: "Pix", highlighted: true },
    ]);
  });

  it("devolve o texto sem destaque para uma busca vazia", () => {
    expect(splitHighlightedText("Pagamento", "   ")).toEqual([
      { text: "Pagamento", highlighted: false },
    ]);
  });

  it("devolve o texto sem destaque quando não encontra o termo", () => {
    expect(splitHighlightedText("Pagamento", "helicóptero")).toEqual([
      { text: "Pagamento", highlighted: false },
    ]);
  });

  it("trata um texto vazio", () => {
    expect(splitHighlightedText("", "pagamento")).toEqual([
      { text: "", highlighted: false },
    ]);
  });
});
