"use client";

import { Link } from "@/i18n/navigation";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

const navItems = [
  { href: "/", key: "home" },
  { href: "/hakkimizda", key: "about" },
  { href: "/calisma-alanlari", key: "practiceAreas" },
  { href: "/blog", key: "blog" },
  { href: "/sss", key: "faq" },
  { href: "/iletisim", key: "contact" },
];

const SCROLL_THRESHOLD = 50;

export default function Navbar() {
  const t = useTranslations("nav");
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const check = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 overflow-x-hidden ${
        isScrolled ? "bg-[#0a0a0a] border-white/10" : "bg-[#1e1e1e] border-white/5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex-shrink-0">
            <div className="flex flex-col">
              <span className="text-xl font-serif font-semibold text-white tracking-tight">Av. Ahmet Can Tonus</span>
              <span className="text-[10px] text-gray-500 tracking-[0.3em] uppercase">{t("lawFirm")}</span>
            </div>
          </Link>

          <div className="hidden lg:flex flex-1 justify-center items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[13px] text-gray-400 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#10b981] hover:after:w-full after:transition-all"
              >
                {t(item.key)}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            <LanguageSwitcher />
            <Link
              href="/iletisim"
              className="px-6 py-2.5 bg-[#10b981] text-white text-[13px] hover:bg-[#059669] transition-colors"
            >
              {t("bookAppointment")}
            </Link>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
              aria-label={t("menuAria")}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden py-4 border-t border-white/10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-3 text-gray-400 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t(item.key)}
              </Link>
            ))}
            <Link
              href="/iletisim"
              className="block mt-4 py-3 bg-[#10b981] text-white text-center text-sm"
              onClick={() => setIsOpen(false)}
            >
              {t("bookAppointment")}
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
