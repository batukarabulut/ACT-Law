"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface AnimatedHeroProps {
  phone: string;
}

// Pre-defined particle positions to avoid hydration mismatch
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

export default function AnimatedHero({ phone }: AnimatedHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="min-h-screen bg-[#1a1a1a] relative overflow-hidden flex items-center">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#10b981]/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#10b981]/5 rounded-full blur-[100px] animate-pulse-slower" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0">
          {particlePositions.map((particle, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">Profesyonel Hukuk Danışmanlığı</span>
          </div>

          {/* Title */}
          <h1 
            className={`text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1] tracking-tight transition-all duration-1000 delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Hukuki Çözümleriniz İçin
            <br />
            <span className="text-[#10b981] relative">
              Güvenilir Partner
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

          {/* Description */}
          <p 
            className={`mt-8 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Ticaret, şirketler, aile, miras ve iş hukuku alanlarında 10+ yıllık deneyim ile 
            stratejik ve sonuç odaklı hukuki danışmanlık hizmeti sunuyoruz.
          </p>

          {/* CTA Buttons */}
          <div 
            className={`mt-12 flex flex-wrap justify-center gap-4 transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Link
              href="/iletisim"
              className="group px-8 py-4 bg-[#10b981] text-white text-sm font-medium hover:bg-[#059669] transition-all duration-300 flex items-center gap-2"
            >
              <span>Ücretsiz Danışmanlık</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/calisma-alanlari"
              className="px-8 py-4 border border-white/20 text-white text-sm hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              Hizmetlerimizi İncele
            </Link>
          </div>

          {/* Stats */}
          <div 
            className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 delay-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {[
              { value: "10+", label: "Yıllık Deneyim" },
              { value: "500+", label: "Başarılı Dava" },
              { value: "10", label: "Uzmanlık Alanı" },
              { value: "%95", label: "Müvekkil Memnuniyeti" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-serif text-white">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Phone CTA */}
        <div 
          className={`mt-16 flex justify-center transition-all duration-1000 delay-900 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
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
              <div className="text-xs text-gray-500 uppercase tracking-wider">7/24 Bizi Arayın</div>
              <div className="text-lg font-medium text-white">{phone}</div>
            </div>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
