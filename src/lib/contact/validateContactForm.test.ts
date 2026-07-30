import { describe, expect, it } from "vitest";

import {
  MIN_MESSAGE_LENGTH,
  validateContactForm,
} from "./validateContactForm";

const validForm = {
  name: "Aline Loof",
  email: "aline@example.com",
  message: "Esta mensagem possui caracteres suficientes.",
};

describe("validateContactForm", () => {
  it("devolve vazio quando todos os campos são válidos", () => {
    expect(validateContactForm(validForm)).toEqual({});
  });

  it("marca os três campos vazios como obrigatórios", () => {
    expect(
      validateContactForm({ name: " ", email: "", message: "   " }),
    ).toEqual({
      name: "required",
      email: "required",
      message: "required",
    });
  });

  it("marca um e-mail inválido", () => {
    expect(
      validateContactForm({ ...validForm, email: "email-invalido" }),
    ).toEqual({ email: "invalid" });
  });

  it("aceita espaços externos em um e-mail válido", () => {
    expect(
      validateContactForm({
        ...validForm,
        email: "  aline@example.com  ",
      }),
    ).toEqual({});
  });

  it("marca uma mensagem curta", () => {
    expect(
      validateContactForm({ ...validForm, message: "Muito curta" }),
    ).toEqual({ message: "tooShort" });
  });

  it("aceita uma mensagem com o tamanho mínimo", () => {
    expect(
      validateContactForm({
        ...validForm,
        message: "a".repeat(MIN_MESSAGE_LENGTH),
      }),
    ).toEqual({});
  });
});
