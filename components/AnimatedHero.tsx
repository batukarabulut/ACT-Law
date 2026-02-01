"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface AnimatedHeroProps {
  phone: string;
  /** Hero paragrafı (Sanity'den). Verilmezse çeviri dosyasındaki varsayılan metin kullanılır. */
  heroDesc?: string | null;
}

const particlePositions = [
  { left: 5, top: 10, delay: 0.5, duration: 8 },
  { left: 15, top: 25, delay: 1.2, duration: 12 },
  { left: 25, top: 60, delay: 2.1, duration: 9 },
  { left: 35, top: 15, delay: 0.8, duration: 11 },
  { left: 45, top: 80, delay: 3.2, duration: 7 },
  { left: 55, top: 35, delay: 1.5, duration: 13 },
  { left: 65, top: 70, delay: 2.8, duration: 10 },
  { left: 75, top: 20, delay: 0.3, duration: 14 },
  { left: 85, top: 55, delay: 4.1, duration: 8 },
  { left: 95, top: 90, delay: 1.9, duration: 11 },
  { left: 10, top: 45, delay: 3.5, duration: 9 },
  { left: 20, top: 85, delay: 0.7, duration: 12 },
  { left: 30, top: 30, delay: 2.4, duration: 10 },
  { left: 40, top: 65, delay: 1.1, duration: 8 },
  { left: 50, top: 5, delay: 3.8, duration: 13 },
  { left: 60, top: 50, delay: 0.9, duration: 11 },
  { left: 70, top: 95, delay: 2.6, duration: 9 },
  { left: 80, top: 40, delay: 4.3, duration: 7 },
  { left: 90, top: 75, delay: 1.7, duration: 12 },
  { left: 8, top: 88, delay: 3.1, duration: 10 },
];

export default function AnimatedHero({ phone, heroDesc }: AnimatedHeroProps) {
  const t = useTranslations("hero");
  const [isLoaded, setIsLoaded] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMouse({ x, y });
      setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      rafRef.current = undefined;
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouse({ x: 0.5, y: 0.5 });
    setCursorPos(null);
  }, []);

  const tx = (mouse.x - 0.5) * 48;
  const ty = (mouse.y - 0.5) * 48;
  const rx = (mouse.y - 0.5) * -5;
  const ry = (mouse.x - 0.5) * 5;

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen -mt-20 pt-20 pb-12 bg-[#1e1e1e] relative overflow-hidden flex items-start justify-center"
    >
      <div className="absolute inset-0">
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#10b981]/10 rounded-full blur-[120px] transition-transform duration-300 ease-out"
          style={{ transform: `translate(${tx}px, ${ty}px)` }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#10b981]/5 rounded-full blur-[100px] transition-transform duration-300 ease-out"
          style={{ transform: `translate(${-tx * 0.7}px, ${-ty * 0.7}px)` }}
        />

        {cursorPos && (
          <div
            className="absolute w-[320px] h-[320px] rounded-full bg-[#10b981]/8 blur-[90px] pointer-events-none"
            style={{
              left: cursorPos.x,
              top: cursorPos.y,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}

        <div
          className="absolute inset-0 opacity-[0.03] transition-transform duration-300 ease-out"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            transform: `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`,
          }}
        />

        <div className="absolute inset-0">
          {particlePositions.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 pb-16 -translate-y-6">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-5 transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">{t("badge")}</span>
          </div>

          <h1
            className={`text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1] tracking-tight transition-all duration-1000 delay-200 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t("title1")}
            <br />
            <span className="text-[#10b981] relative">
              {t("title2")}
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path
                  d="M2 10C50 4 150 4 298 10"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="animate-draw"
                />
              </svg>
            </span>
          </h1>

          <p
            className={`mt-5 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {heroDesc ?? t("desc")}
          </p>

          <div
            className={`mt-8 flex flex-wrap justify-center gap-4 transition-all duration-1000 delay-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Link
              href="/iletisim"
              className="group px-8 py-4 bg-[#10b981] text-white text-sm font-medium hover:bg-[#059669] transition-all duration-300 flex items-center gap-2"
            >
              <span>{t("ctaContact")}</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/calisma-alanlari"
              className="px-8 py-4 border border-white/20 text-white text-sm hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              {t("ctaServices")}
            </Link>
          </div>

          <div
            className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 delay-700 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {[
              { value: "10+", key: "stat1" },
              { value: "500+", key: "stat2" },
              { value: "10+", key: "stat3" },
              { value: "%100", key: "stat4" },
            ].map((stat) => (
              <div key={stat.key} className="text-center">
                <div className="text-3xl md:text-4xl font-serif text-white">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{t(stat.key)}</div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`mt-28 flex justify-center transition-all duration-1000 delay-900 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-4 px-6 py-4 bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-[#10b981]/20 flex items-center justify-center group-hover:bg-[#10b981]/30 transition-colors">
              <svg className="w-5 h-5 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-xs text-gray-500 uppercase tracking-wider">{t("phoneLabel")}</div>
              <div className="text-lg font-medium text-white">{phone}</div>
            </div>
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
