import { describe, expect, it } from "vitest";

import { splitHighlightedText } from "./splitHighlightedText";

describe("splitHighlightedText", () => {
  it("adiciona e percorre valores de um array", () => {
    const meuArray: string[] = [];
    meuArray.push("Teste Linha 1");
    meuArray.push("Teste Linha 2");

    const valoresComForOf: string[] = [];
    for (const valor of meuArray) {
      valoresComForOf.push(valor);
    }

    const valoresComIndice: string[] = [];
    for (let index = 0; index < meuArray.length; index++) {
      const valor = meuArray[index];
      valoresComIndice.push(valor);
    }

    expect(meuArray).toEqual(["Teste Linha 1", "Teste Linha 2"]);
    expect(meuArray).toHaveLength(2);
    expect(valoresComForOf).toEqual(meuArray);
    expect(valoresComIndice).toEqual(meuArray);
  });
  it("destaca termos no início e no fim", () => {
    const result = splitHighlightedText("Pagamento parcelado", "Pagamento");

    expect(result).toEqual([
      { text: "Pagamento", highlighted: true },
      { text: " parcelado", highlighted: false },
    ]);

    expect(splitHighlightedText("Pagamento parcelado", "parcelado")).toEqual([
      { text: "Pagamento ", highlighted: false },
      { text: "parcelado", highlighted: true },
    ]);
  });

  it("destaca um termo no início", () => {
    expect(splitHighlightedText("Pagamento parcelado", "pagamento")).toEqual([
      { text: "Pagamento", highlighted: true },
      { text: " parcelado", highlighted: false },
    ]);
  });

  it("destaca um termo no meio", () => {
    expect(
      splitHighlightedText("Como funciona a consultoria?", "consultoria"),
    ).toEqual([
      { text: "Como funciona a ", highlighted: false },
      { text: "consultoria", highlighted: true },
      { text: "?", highlighted: false },
    ]);
  });

  it("destaca todas as ocorrências", () => {
    expect(
      splitHighlightedText(
        "O pagamento pode ser feito após o pagamento da entrada.",
        "pagamento",
      ).filter((part) => part.highlighted),
    ).toEqual([
      { text: "pagamento", highlighted: true },
      { text: "pagamento", highlighted: true },
    ]);
  });

  it.each(["CARTAO", "cartao"])(
    "preserva Cartão buscando por %s",
    (query) => {
      expect(
        splitHighlightedText("Pagamento no Cartão", query).find(
          (part) => part.highlighted,
        ),
      ).toEqual({ text: "Cartão", highlighted: true });
    },
  );

  it("preserva o acento original", () => {
    expect(
      splitHighlightedText("Sessão", "sessao").find(
        (part) => part.highlighted,
      ),
    ).toEqual({ text: "Sessão", highlighted: true });
  });

  it("não destaca nada para uma busca vazia", () => {
    expect(splitHighlightedText("Pagamento", "")).toEqual([
      { text: "Pagamento", highlighted: false },
    ]);
  });

  it("devolve o texto sem destaque quando não encontra o termo", () => {
    expect(splitHighlightedText("Pagamento", "helicóptero")).toEqual([
      { text: "Pagamento", highlighted: false },
    ]);
  });
});
