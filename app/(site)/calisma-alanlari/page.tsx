import { Metadata } from "next";
import Link from "next/link";
import { getPracticeAreas, getPracticeAreasIntro } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Hizmetlerimiz",
  description: "Ticaret hukuku, şirketler hukuku, aile hukuku, miras hukuku, iş hukuku ve daha fazlası.",
};

export default async function PracticeAreasPage() {
  const [practiceAreas, practiceAreasIntro] = await Promise.all([
    getPracticeAreas(),
    getPracticeAreasIntro(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] tracking-wider uppercase text-[#10b981] mb-3">
            Çalışma Alanları
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-white">
            {practiceAreasIntro.title}
          </h1>
          <p className="mt-6 text-gray-400 max-w-3xl leading-relaxed">
            {practiceAreasIntro.description}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-px bg-gray-200">
            {practiceAreas.map((area, index) => (
              <Link
                key={area.slug}
                href={`/calisma-alanlari/${area.slug}`}
                className="group p-8 lg:p-10 bg-white hover:bg-[#1a1a1a] transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[#10b981] text-sm font-medium">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <svg className="w-5 h-5 text-gray-300 group-hover:text-[#10b981] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <h2 className="mt-6 text-2xl font-serif text-[#111] group-hover:text-white transition-colors">
                  {area.title}
                </h2>
                <p className="mt-3 text-gray-500 group-hover:text-gray-400 transition-colors leading-relaxed">
                  {area.shortDescription}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {area.services.slice(0, 3).map((s, i) => (
                    <span key={i} className="px-3 py-1 text-xs border border-gray-200 text-gray-500 group-hover:border-white/20 group-hover:text-gray-400 transition-colors">
                      {s}
                    </span>
                  ))}
                  {area.services.length > 3 && (
                    <span className="px-3 py-1 text-xs border border-gray-200 text-gray-500 group-hover:border-white/20 group-hover:text-gray-400 transition-colors">
                      +{area.services.length - 3}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-[#1a1a1a] text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif">Hangi Alanda <span className="text-[#10b981]">Yardım İstiyorsunuz?</span></h2>
          <p className="mt-4 text-gray-400">Size en uygun çözümü birlikte bulalım.</p>
          <Link href="/iletisim" className="inline-block mt-8 px-8 py-4 bg-[#10b981] text-white text-sm font-medium hover:bg-[#059669] transition-colors">
            Ücretsiz Danışmanlık
          </Link>
        </div>
      </section>
    </>
  );
}
