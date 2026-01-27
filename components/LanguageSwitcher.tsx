"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function LanguageSwitcher() {
  const t = useTranslations("lang");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; right: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const updatePosition = () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setPosition({
        top: rect.bottom + 4,
        right: window.innerWidth - rect.right,
      });
    }
  };

  const openDropdown = () => {
    updatePosition();
    setIsOpen(true);
  };

  const closeDropdown = () => {
    setIsOpen(false);
    setPosition(null);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Element;
      if (ref.current?.contains(target) || target.closest("[data-language-dropdown]")) return;
      closeDropdown();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDropdown();
    };
    const onScroll = () => closeDropdown();
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, true);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [isOpen]);

  const switchLocale = (newLocale: "tr" | "en") => {
    if (newLocale === locale) {
      closeDropdown();
      return;
    }
    router.replace(pathname, { locale: newLocale });
    closeDropdown();
  };

  const dropdown = isOpen && position && typeof document !== "undefined" && createPortal(
    <div
      data-language-dropdown
      className="fixed py-1.5 w-44 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl z-[100]"
      style={{ top: position.top, right: position.right }}
      role="menu"
    >
      <button
        type="button"
        onClick={() => switchLocale("tr")}
        className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${
          locale === "tr" ? "text-[#10b981] font-medium" : "text-gray-400 hover:text-white"
        }`}
        role="menuitem"
      >
        {t("tr")}
      </button>
      <button
        type="button"
        onClick={() => switchLocale("en")}
        className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${
          locale === "en" ? "text-[#10b981] font-medium" : "text-gray-400 hover:text-white"
        }`}
        role="menuitem"
      >
        {t("en")}
      </button>
    </div>,
    document.body
  );

  return (
    <div className="relative" ref={ref}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => (isOpen ? closeDropdown() : openDropdown())}
        className="flex items-center justify-center w-10 h-10 rounded-full text-white/80 hover:text-white hover:bg-white/5 transition-colors"
        aria-label={t("aria")}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <img src="/globe.svg" alt="" width={20} height={20} className="opacity-90" />
      </button>
      {dropdown}
    </div>
  );
}
