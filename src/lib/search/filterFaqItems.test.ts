import { describe, expect, it } from "vitest";

import { filterFaqItems } from "./filterFaqItems";

const items = [
  {
    question: "Como funciona a primeira consulta?",
    answer: "Começamos com uma conversa sobre seus objetivos.",
  },
  {
    question: "Os atendimentos podem ser online?",
    answer: "Sim. Há opções presenciais e online.",
  },
  {
    question: "Quanto tempo dura uma consultoria?",
    answer: "A duração varia conforme o serviço escolhido.",
  },
];

describe("filterFaqItems", () => {
  it("busca na pergunta", () => {
    expect(filterFaqItems(items, "online")).toEqual([items[1]]);
  });

  it("busca na resposta", () => {
    expect(filterFaqItems(items, "objetivos")).toEqual([items[0]]);
  });

  it("busca sem distinguir maiúsculas e acentos", () => {
    expect(filterFaqItems(items, "DURACAO")).toEqual([items[2]]);
  });

  it("devolve todos os itens na ordem original para um termo vazio", () => {
    expect(filterFaqItems(items, "   ")).toEqual(items);
  });

  it("devolve um array vazio quando não há resultado", () => {
    expect(filterFaqItems(items, "guarda-roupa")).toEqual([]);
  });

  it("não modifica o array original", () => {
    const original = items.map((item) => ({ ...item }));

    filterFaqItems(items, "online");

    expect(items).toEqual(original);
  });
});
