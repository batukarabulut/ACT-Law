"use client";

import Image from "next/image";
import { Link as I18nLink } from "@/i18n/navigation";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

const navItems = [
  { href: "/", key: "home" },
  { href: "/hakkimizda", key: "about" },
  { href: "/ekibimiz", key: "team" },
  { href: "/calisma-alanlari", key: "practiceAreas" },
  { href: "/blog", key: "publications" },
  { href: "/sss", key: "faq" },
  { href: "/iletisim", key: "contact" },
];

const SCROLL_THRESHOLD = 50;

function getScrollY() {
  if (typeof window === "undefined") return 0;
  return window.scrollY ?? document.documentElement.scrollTop;
}

type NavbarProps = {
  logoUrl?: string | null;
  siteName?: string;
};

export default function Navbar({ logoUrl, siteName }: NavbarProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const check = () => setIsScrolled(getScrollY() > SCROLL_THRESHOLD);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  // Sayfa değişince scroll restore sonrası tekrar kontrol et (Next.js scroll restore scroll event tetiklemiyor)
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setIsScrolled(getScrollY() > SCROLL_THRESHOLD);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 overflow-hidden ${
        isScrolled ? "bg-black" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <I18nLink href="/" className="flex-shrink-0 flex items-center gap-2 ml-6 sm:ml-10">
            {logoUrl && !logoError ? (
              <Image
                src={logoUrl}
                alt={siteName || "ACT Hukuk Bürosu"}
                width={320}
                height={80}
                className="h-20 w-auto max-h-20 object-contain object-left"
                priority
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="flex flex-col">
                <span className="text-2xl font-serif font-semibold text-white tracking-tight">
                  {siteName || "Av. Ahmet Can Tonus"}
                </span>
                <span className="text-xs text-gray-500 tracking-[0.3em] uppercase">{t("lawFirm")}</span>
              </div>
            )}
          </I18nLink>

          <div className="hidden lg:flex flex-1 justify-center items-center gap-8 ml-8">
            {navItems.map((item) => (
              <I18nLink
                key={item.href}
                href={item.href}
                className="text-[15px] text-gray-400 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#10b981] hover:after:w-full after:transition-all"
              >
                {t(item.key)}
              </I18nLink>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            <LanguageSwitcher />
            <I18nLink
              href="/iletisim"
              className="px-6 py-2.5 bg-[#10b981] text-white text-[15px] hover:bg-[#059669] transition-colors"
            >
              {t("bookAppointment")}
            </I18nLink>
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
              <I18nLink
                key={item.href}
                href={item.href}
                className="block py-3 text-[15px] text-gray-400 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t(item.key)}
              </I18nLink>
            ))}
            <I18nLink
              href="/iletisim"
              className="block mt-4 py-3 bg-[#10b981] text-white text-center text-[15px]"
              onClick={() => setIsOpen(false)}
            >
              {t("bookAppointment")}
            </I18nLink>
          </div>
        )}
      </nav>
    </header>
  );
}
