import { describe, expect, it } from "vitest";

import { isValidPhone, normalizePhone } from "./normalizePhone";

describe("normalizePhone", () => {
  it("remove parênteses, espaços e hífen", () => {
    expect(normalizePhone("(11) 99999-9999")).toBe("11999999999");
  });

  it("mantém o código do país quando ele foi informado", () => {
    expect(normalizePhone("+55 (11) 99999-9999")).toBe("+5511999999999");
  });

  it("mantém um telefone que já possui somente números", () => {
    expect(normalizePhone("11999999999")).toBe("11999999999");
  });

  it("preserva caracteres inválidos para que sejam detectados", () => {
    expect(normalizePhone("Tel: +55 (11) 99999-9999")).toBe(
      "Tel:+5511999999999",
    );
  });

  it("devolve vazio quando a entrada está vazia", () => {
    expect(normalizePhone("")).toBe("");
  });
});

describe("isValidPhone", () => {
  it("aceita um telefone vazio porque o campo é opcional", () => {
    expect(isValidPhone("")).toBe(true);
    expect(isValidPhone("   ")).toBe(true);
  });

  it("aceita um telefone formatado válido", () => {
    expect(isValidPhone("+55 (45) 99999-9999")).toBe(true);
  });

  it("aceita um telefone válido sem formatação", () => {
    expect(isValidPhone("45999999999")).toBe(true);
  });

  it("recusa letras e poucos dígitos", () => {
    expect(isValidPhone("ABC-123")).toBe(false);
    expect(isValidPhone("ABC-45999999999")).toBe(false);
    expect(isValidPhone("1234567")).toBe(false);
  });

  it("aceita telefones com até quinze dígitos", () => {
    expect(isValidPhone("123456789012345")).toBe(true);
  });

  it("recusa um telefone com mais de quinze dígitos", () => {
    expect(isValidPhone("1234567890123456")).toBe(false);
  });
});
