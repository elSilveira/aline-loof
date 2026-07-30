"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Instagram, Clock, MapPin } from "lucide-react";
import {
  MIN_MESSAGE_LENGTH,
  validateContactForm,
  type ContactFormErrors,
} from "@/lib/contact/validateContactForm";
import { normalizePhone } from "@/lib/contact/normalizePhone";

export default function ContatoClient() {
  const t = useTranslations("contact");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ContactFormErrors>({});

  const services = [
    "closet",
    "palette",
    "colorday",
    "events",
    "cema",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (
      name === "name" ||
      name === "email" ||
      name === "phone" ||
      name === "message"
    ) {
      setErrors((prev) => {
        const nextErrors = { ...prev };
        delete nextErrors[name];
        return nextErrors;
      });
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const validationErrors = validateContactForm(form);

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // Primeiro validamos o valor original. Somente depois criamos a versão
    // normalizada que seria enviada para a API.
    const payload = {
      ...form,
      phone: normalizePhone(form.phone),
    };

    setLoading(true);
    // Simulate async submission
    await new Promise((r) => setTimeout(r, 1200));
    // Mantém no estado a mesma representação usada no envio simulado.
    setForm(payload);
    setStatus("success");
    setLoading(false);
  };

  const inputClass =
    "w-full bg-transparent border border-[#D4C9A8] px-4 py-3 text-sm text-[#1C1C1C] placeholder-[#AFA99A] focus:outline-none focus:border-[#B8942A] transition-colors";
  const labelClass =
    "block text-[10px] tracking-[0.2em] uppercase text-[#6B6560] mb-2";

  return (
    <>
      {/* Page Header */}
      <section className="pt-40 pb-20 bg-[#1C1C1C] text-center px-6">
        <p
          className="text-[10px] tracking-[0.5em] uppercase text-[#B8942A] mb-4"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Aline Loof
        </p>
        <h1
          className="text-5xl md:text-6xl font-serif font-medium text-[#F0E8D8] mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {t("title")}
        </h1>
        <div className="w-12 h-px bg-[#B8942A] mx-auto mb-6" />
        <p
          className="text-[#C8B99A] max-w-xl mx-auto text-base leading-relaxed"
          style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
        >
          {t("subtitle")}
        </p>
      </section>

      {/* Contact Content */}
      <section className="section-padding px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Info */}
          <div className="lg:col-span-1">
            <p
              className="text-[10px] tracking-[0.3em] uppercase text-[#B8942A] mb-8"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Info
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-[#D4C9A8] flex items-center justify-center flex-shrink-0">
                  <Instagram size={16} className="text-[#B8942A]" />
                </div>
                <div>
                  <p
                    className="text-[10px] tracking-[0.2em] uppercase text-[#6B6560] mb-1"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {t("info.instagram")}
                  </p>
                  <a
                    href="https://www.instagram.com/alineloof.consultoria"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#1C1C1C] hover:text-[#B8942A] transition-colors"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    @alineloof.consultoria
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-[#D4C9A8] flex items-center justify-center flex-shrink-0">
                  <Clock size={16} className="text-[#B8942A]" />
                </div>
                <div>
                  <p
                    className="text-[10px] tracking-[0.2em] uppercase text-[#6B6560] mb-1"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Resposta
                  </p>
                  <p
                    className="text-sm text-[#1C1C1C]"
                    style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                  >
                    {t("info.response_time")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-[#D4C9A8] flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-[#B8942A]" />
                </div>
                <div>
                  <p
                    className="text-[10px] tracking-[0.2em] uppercase text-[#6B6560] mb-1"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Atendimento
                  </p>
                  <p
                    className="text-sm text-[#1C1C1C]"
                    style={{ fontFamily: "var(--font-inter)", fontWeight: 300 }}
                  >
                    {t("info.location")}
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative */}
            <div className="mt-16 hidden lg:block">
              <div className="w-px h-32 bg-[#D4C9A8] ml-5" />
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {status === "success" ? (
              <div className="border border-[#B8942A] p-12 text-center">
                <div className="text-3xl mb-4">✦</div>
                <p
                  className="font-serif text-2xl text-[#1C1C1C] mb-4"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {t("form.success")}
                </p>
                <div className="w-10 h-px bg-[#B8942A] mx-auto" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-name" className={labelClass}>{t("form.name")}</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={
                        errors.name ? "contact-name-error" : undefined
                      }
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t("form.placeholder_name")}
                      className={inputClass}
                      style={{ fontFamily: "var(--font-inter)" }}
                    />
                    {errors.name === "required" && (
                      <p
                        id="contact-name-error"
                        role="alert"
                        className="mt-2 text-sm text-red-700"
                      >
                        {t("form.validation.name.required")}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className={labelClass}>{t("form.email")}</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={
                        errors.email ? "contact-email-error" : undefined
                      }
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t("form.placeholder_email")}
                      className={inputClass}
                      style={{ fontFamily: "var(--font-inter)" }}
                    />
                    {errors.email === "required" && (
                      <p
                        id="contact-email-error"
                        role="alert"
                        className="mt-2 text-sm text-red-700"
                      >
                        {t("form.validation.email.required")}
                      </p>
                    )}
                    {errors.email === "invalid" && (
                      <p
                        id="contact-email-error"
                        role="alert"
                        className="mt-2 text-sm text-red-700"
                      >
                        {t("form.validation.email.invalid")}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-phone" className={labelClass}>{t("form.phone")}</label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={
                        errors.phone ? "contact-phone-error" : undefined
                      }
                      value={form.phone}
                      onChange={handleChange}
                      placeholder={t("form.placeholder_phone")}
                      className={inputClass}
                      style={{ fontFamily: "var(--font-inter)" }}
                    />
                    {errors.phone === "invalid" && (
                      <p
                        id="contact-phone-error"
                        role="alert"
                        className="mt-2 text-sm text-red-700"
                      >
                        {t("form.validation.phone.invalid")}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="contact-service" className={labelClass}>{t("form.service")}</label>
                    <select
                      id="contact-service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className={inputClass}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      <option value="">{t("form.select_service")}</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {t(`form.services.${service}`)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className={labelClass}>{t("form.message")}</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? "contact-message-error" : undefined
                    }
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t("form.placeholder_message")}
                    className={`${inputClass} resize-none`}
                    style={{ fontFamily: "var(--font-inter)" }}
                  />
                  {errors.message === "required" && (
                    <p
                      id="contact-message-error"
                      role="alert"
                      className="mt-2 text-sm text-red-700"
                    >
                      {t("form.validation.message.required")}
                    </p>
                  )}
                  {errors.message === "tooShort" && (
                    <p
                      id="contact-message-error"
                      role="alert"
                      className="mt-2 text-sm text-red-700"
                    >
                      {t("form.validation.message.tooShort", {
                        min: MIN_MESSAGE_LENGTH,
                      })}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto bg-[#1C1C1C] text-[#F0E8D8] px-12 py-4 text-[11px] tracking-[0.25em] uppercase hover:bg-[#B8942A] hover:text-[#1C1C1C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {loading ? "..." : t("form.submit")}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
