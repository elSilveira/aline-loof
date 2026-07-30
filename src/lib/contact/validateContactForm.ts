export const MIN_MESSAGE_LENGTH = 20;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export type ContactFormErrors = {
  name?: "required";
  email?: "required" | "invalid";
  message?: "required" | "tooShort";
};

/**
 * Valida somente os campos obrigatórios do formulário de contato.
 *
 * A função devolve códigos, e não frases traduzidas. Assim, o componente pode
 * mostrar cada código no idioma que estiver ativo.
 */
export function validateContactForm(
  formData: ContactFormData,
): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!formData.name.trim()) {
    errors.name = "required";
  }

  if (!formData.email.trim()) {
    errors.email = "required";
  } else if (!EMAIL_PATTERN.test(formData.email.trim())) {
    errors.email = "invalid";
  }

  if (!formData.message.trim()) {
    errors.message = "required";
  } else if (formData.message.trim().length < MIN_MESSAGE_LENGTH) {
    errors.message = "tooShort";
  }

  return errors;
}
