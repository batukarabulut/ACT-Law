import { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getPracticeAreas, getPracticeAreasIntro } from "@/sanity/lib/fetch";
import SanityImage from "@/components/SanityImage";
import type { SanityImageSource } from "@/sanity/lib/image";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  return {
    title: tNav("practiceAreas"),
    description: "Ticaret hukuku, şirketler hukuku, aile hukuku, miras hukuku, iş hukuku ve daha fazlası.",
  };
}


export default async function PracticeAreasPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [practiceAreas, practiceAreasIntro] = await Promise.all([
    getPracticeAreas(locale),
    getPracticeAreasIntro(locale),
  ]);

  const t = await getTranslations("practiceAreas");
  const tNav = await getTranslations("nav");

  return (
    <>
      <section className="-mt-20 pt-20 pb-20 lg:pt-28 lg:pb-28 bg-gradient-to-b from-[#1e1e1e] to-[#141414]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#10b981] mb-3">
            {tNav("practiceAreas")}
          </p>
          <div className="w-12 h-px bg-[#10b981]/60 mb-6" aria-hidden="true" />
          <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight">
            {practiceAreasIntro?.title || t("intro.title")}
          </h1>
          <p className="mt-6 text-gray-400 max-w-3xl leading-relaxed">
            {practiceAreasIntro?.description || t("intro.description")}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-px bg-gray-200">
            {practiceAreas.map((area, index) => {
              // Artık Sanity'den locale'e göre çekildiği için translation'a gerek yok
              const title = area.title;
              const shortDescription = area.shortDescription;
              const services = area.services;

              return (
                <Link
                  key={area.slug}
                  href={`/calisma-alanlari/${area.slug}`}
                  className="group p-8 lg:p-10 bg-white hover:bg-[#1a1a1a] transition-all duration-300 flex gap-6"
                >
                  {(area as { image?: SanityImageSource }).image ? (
                    <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 relative">
                      <SanityImage
                        image={(area as { image?: SanityImageSource }).image}
                        alt={title}
                        preset="practiceCard"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="96px"
                      />
                    </div>
                  ) : null}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between">
                      <span className="text-[#10b981] text-sm font-medium">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <svg className="w-5 h-5 text-gray-300 group-hover:text-[#10b981] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                    <h2 className="mt-6 text-2xl font-serif text-[#111] group-hover:text-white transition-colors">
                      {title}
                    </h2>
                    <p className="mt-3 text-gray-500 group-hover:text-gray-400 transition-colors leading-relaxed">
                      {shortDescription}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                    {services.slice(0, 3).map((s: string, i: number) => (
                      <span key={i} className="px-3 py-1 text-xs border border-gray-200 text-gray-500 group-hover:border-white/20 group-hover:text-gray-400 transition-colors">
                        {s}
                      </span>
                    ))}
                    {services.length > 3 && (
                      <span className="px-3 py-1 text-xs border border-gray-200 text-gray-500 group-hover:border-white/20 group-hover:text-gray-400 transition-colors">
                        +{services.length - 3}
                      </span>
                    )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-[#1e1e1e] text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif">{t("ctaTitle")} <span className="text-[#10b981]">{t("ctaTitleHighlight")}</span></h2>
          <Link href="/iletisim" className="inline-block mt-6 px-8 py-4 bg-[#10b981] text-white text-sm font-medium hover:bg-[#059669] transition-colors">
            {t("ctaContact")}
          </Link>
        </div>
      </section>
    </>
  );
}
