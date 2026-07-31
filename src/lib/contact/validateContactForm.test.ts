import { describe, expect, it } from "vitest";

import {
  MIN_MESSAGE_LENGTH,
  validateContactForm,
} from "./validateContactForm";

const validForm = {
  name: "Lucas",
  email: "lucas@email.com",
  phone: "",
  message: "Gostaria de saber mais sobre a consultoria.",
};

describe("validateContactForm", () => {
  it("devolve vazio quando todos os campos são válidos", () => {
    expect(validateContactForm(validForm)).toEqual({});
  });

  it("marca os campos obrigatórios vazios", () => {
    expect(
      validateContactForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      }),
    ).toEqual({
      name: "required",
      email: "required",
      message: "required",
    });
  });

  it("retorna erro para um e-mail inválido", () => {
    expect(
      validateContactForm({
        ...validForm,
        email: "email-invalido",
      }),
    ).toEqual({ email: "invalid" });
  });

  it("retorna erro para uma mensagem curta", () => {
    expect(
      validateContactForm({
        ...validForm,
        message: "Muito curta",
      }),
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

  it("aceita um telefone vazio", () => {
    expect(validateContactForm({ ...validForm, phone: "" })).toEqual({});
  });

  it("aceita um telefone formatado válido", () => {
    expect(
      validateContactForm({
        ...validForm,
        phone: "+55 (45) 99999-9999",
      }),
    ).toEqual({});
  });

  it("retorna erro para um telefone inválido", () => {
    expect(
      validateContactForm({
        ...validForm,
        phone: "ABC-45999999999",
      }),
    ).toEqual({ phone: "invalid" });
  });

  it("retorna erro para telefone com poucos dígitos", () => {
    expect(
      validateContactForm({
        ...validForm,
        phone: "1234567",
      }),
    ).toEqual({ phone: "invalid" });
  });
});
