"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Instagram, Clock, MapPin } from "lucide-react";

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

  const services = [
    { pt: "Limpeza de Closet", key: "closet" },
    { pt: "Paleta de Cores", key: "palette" },
    { pt: "Color Day Session", key: "colorday" },
    { pt: "Eventos", key: "events" },
    { pt: "CEMA Completo", key: "cema" },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate async submission
    await new Promise((r) => setTimeout(r, 1200));
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
                    <label className={labelClass}>{t("form.name")}</label>
                    <input
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t("form.placeholder_name")}
                      className={inputClass}
                      style={{ fontFamily: "var(--font-inter)" }}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>{t("form.email")}</label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t("form.placeholder_email")}
                      className={inputClass}
                      style={{ fontFamily: "var(--font-inter)" }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>{t("form.phone")}</label>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder={t("form.placeholder_phone")}
                      className={inputClass}
                      style={{ fontFamily: "var(--font-inter)" }}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>{t("form.service")}</label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className={inputClass}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      <option value="">{t("form.select_service")}</option>
                      {services.map((s) => (
                        <option key={s.key} value={s.key}>
                          {s.pt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>{t("form.message")}</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t("form.placeholder_message")}
                    className={`${inputClass} resize-none`}
                    style={{ fontFamily: "var(--font-inter)" }}
                  />
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
