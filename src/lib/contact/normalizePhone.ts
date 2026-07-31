const ALLOWED_SEPARATORS_PATTERN = /[\s()-]/g;
const VALID_PHONE_PATTERN = /^\+?\d{8,15}$/;

/**
 * Remove somente os separadores permitidos de um telefone.
 *
 * Letras e outros caracteres inválidos são preservados para que a validação
 * consiga identificá-los, em vez de transformá-los silenciosamente em um
 * número aparentemente válido.
 */
export function normalizePhone(phone: string): string {
  return phone.trim().replace(ALLOWED_SEPARATORS_PATTERN, "");
}

/**
 * Aceita o telefone vazio, pois o campo é opcional. Quando preenchido, permite
 * um "+" no início e exige de 8 a 15 dígitos após retirar a formatação.
 */
export function isValidPhone(phone: string): boolean {
  const normalizedPhone = normalizePhone(phone);

  if (normalizedPhone === "") {
    return true;
  }

  return VALID_PHONE_PATTERN.test(normalizedPhone);
}
