import { describe, expect, it } from "vitest";

import { normalizeText } from "./normalizeText";

describe("normalizeText", () => {
  it("o texto nao pode estar vazio", () => {
    expect(normalizeText("")).toBe("false");
  });
  it("o texto nao pode estar vazio", () => {
    expect(normalizeText(" ")).toBe("false");
  });

  it("transforma letras maiúsculas em minúsculas", () => {
    expect(normalizeText("CONSULTORIA")).toBe("consultoria");
  });

  it("remove marcas de acentuação", () => {
    expect(normalizeText("Sessão, CANCIÓN, Élégance")).toBe(
      "sessao, cancion, elegance",
    );
  });

  it("reduz espaços duplicados e remove espaços das pontas", () => {
    expect(normalizeText("  Sessão   de COR  ")).toBe("sessao de cor");
  });

  it("normaliza textos equivalentes nos quatro idiomas do projeto", () => {
    const terms = [
      ["  SESSÃO   de COR ", "sessao de cor"],
      ["  COLOR   SESSION ", "color session"],
      ["  SESIÓN   de COLOR ", "sesion de color"],
      ["  SÉANCE   de COULEUR ", "seance de couleur"],
    ];

    for (const [input, expected] of terms) {
      let normalizado = input;
      console.log(normalizado);
      normalizado = normalizeText(normalizado);
      console.log(normalizado);
      expect(normalizado).toBe(expected);
    }
  });

  it("não altera a entrada original", () => {
    const original = "  Sessão   de COR  ";
    const snapshot = original;

    normalizeText(original);

    expect(original).toBe(snapshot);
  });
});
