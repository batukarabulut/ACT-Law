"use client";

import { useState, FormEvent } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type PracticeArea = { slug: string; title: string };

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || "YOUR_FORM_ID";

export default function ContactForm({ practiceAreas }: { practiceAreas: PracticeArea[] }) {
  const t = useTranslations("contactForm");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [kvkkRead, setKvkkRead] = useState(false);
  const [kvkkConsent, setKvkkConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        setKvkkRead(false);
        setKvkkConsent(false);
      } else {
        setError(t("errorGeneric"));
      }
    } catch {
      setError(t("errorConnection"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-14 h-14 bg-[#10b981]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-serif text-[#111] mb-2">{t("successTitle")}</h3>
        <p className="text-gray-500 mb-6">{t("successDesc")}</p>
        <button onClick={() => setIsSubmitted(false)} className="text-[#10b981] underline text-sm hover:no-underline">
          {t("newMessage")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm text-gray-600 mb-2">{t("name")} *</label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 focus:border-[#10b981] focus:outline-none transition-colors bg-white"
            placeholder={t("namePlaceholder")}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm text-gray-600 mb-2">{t("email")} *</label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 focus:border-[#10b981] focus:outline-none transition-colors bg-white"
            placeholder={t("emailPlaceholder")}
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm text-gray-600 mb-2">{t("phone")}</label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 focus:border-[#10b981] focus:outline-none transition-colors bg-white"
            placeholder={t("phonePlaceholder")}
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm text-gray-600 mb-2">{t("subject")} *</label>
          <select
            id="subject"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 focus:border-[#10b981] focus:outline-none transition-colors bg-white"
          >
            <option value="">{t("select")}</option>
            {practiceAreas.map((a) => (
              <option key={a.slug} value={a.title}>{a.title}</option>
            ))}
            <option value="Diğer">{t("other")}</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm text-gray-600 mb-2">{t("message")} *</label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 focus:border-[#10b981] focus:outline-none transition-colors bg-white resize-none"
          placeholder={t("messagePlaceholder")}
        />
      </div>
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>
      )}

      <div className="space-y-4 pt-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={kvkkRead}
            onChange={(e) => setKvkkRead(e.target.checked)}
            className="mt-1 w-4 h-4 text-[#10b981] border-gray-300 rounded focus:ring-[#10b981]"
            required
          />
          <span className="text-sm text-gray-600">
            {t("kvkk1")}{" "}
            <Link href="/aydinlatma-metni" target="_blank" className="text-[#10b981] hover:underline font-medium">
              {t("aydinlatmaLink")}
            </Link>{" "}
            {t("kvkk1End")}
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={kvkkConsent}
            onChange={(e) => setKvkkConsent(e.target.checked)}
            className="mt-1 w-4 h-4 text-[#10b981] border-gray-300 rounded focus:ring-[#10b981]"
            required
          />
          <span className="text-sm text-gray-600">{t("kvkk2")}</span>
        </label>
      </div>

      <p className="text-xs text-gray-400">* {t("required")}</p>
      <button
        type="submit"
        disabled={isSubmitting || !kvkkRead || !kvkkConsent}
        className="px-8 py-4 bg-[#10b981] text-white text-sm font-medium hover:bg-[#059669] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? t("sending") : t("send")}
      </button>
    </form>
  );
}
