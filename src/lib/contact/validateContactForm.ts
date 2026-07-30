import { isValidPhone } from "./normalizePhone";

export const MIN_MESSAGE_LENGTH = 20;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type ContactFormErrors = {
  name?: "required";
  email?: "required" | "invalid";
  phone?: "invalid";
  message?: "required" | "tooShort";
};

export function validateContactForm(
  data: ContactFormData,
): ContactFormErrors {
  const errors: ContactFormErrors = {};
  const name = data.name.trim();
  const email = data.email.trim();
  const message = data.message.trim();

  if (name === "") {
    errors.name = "required";
  }

  if (email === "") {
    errors.email = "required";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "invalid";
  }

  if (!isValidPhone(data.phone)) {
    errors.phone = "invalid";
  }

  if (message === "") {
    errors.message = "required";
  } else if (message.length < MIN_MESSAGE_LENGTH) {
    errors.message = "tooShort";
  }

  return errors;
}
