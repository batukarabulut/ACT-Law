import { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getPracticeAreas, getPracticeAreaBySlug, getSiteConfig } from "@/sanity/lib/fetch";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  // Artık tek document var, her dil için aynı slug kullanılacak
  const practiceAreas = await getPracticeAreas("tr"); // Slug'lar Türkçe'den geliyor
  return routing.locales.flatMap((locale) =>
    practiceAreas.map((area) => ({ locale, slug: area.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const area = await getPracticeAreaBySlug(slug, locale);
  const tNotFound = await getTranslations({ locale, namespace: "notFound" });
  if (!area) return { title: tNotFound("title") };
  const metaTitle =
    typeof area.title === "string"
      ? area.title
      : (area as any)?.title?.[locale as keyof typeof area.title] ??
        (area as any)?.title?.tr ??
        (area as any)?.title?.en ??
        "";

  const metaDescription =
    typeof area.shortDescription === "string" ? area.shortDescription : undefined;

  return { title: metaTitle, description: metaDescription };
}


export default async function PracticeAreaDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const [practiceAreas, area, siteConfig] = await Promise.all([
    getPracticeAreas(locale),
    getPracticeAreaBySlug(slug, locale),
    getSiteConfig(locale),
  ]);

  if (!area) notFound();

  const currentIndex = practiceAreas.findIndex((a) => a.slug === slug);
  const otherAreas = practiceAreas.filter((a) => a.slug !== slug).slice(0, 3);
  const t = await getTranslations("practiceAreas");

  // Artık Sanity'den locale'e göre çekildiği için translation'a gerek yok
  const title = area.title;
  const shortDescription = area.shortDescription;
  const description = area.description;
  const services = area.services;

  const steps = [
    { title: t("step1"), desc: t("step1Desc") },
    { title: t("step2"), desc: t("step2Desc") },
    { title: t("step3"), desc: t("step3Desc") },
    { title: t("step4"), desc: t("step4Desc") },
  ];

  return (
    <>
      <section className="py-16 lg:py-24 bg-[#1c1c1c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/calisma-alanlari" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#10b981] mb-8">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t("backTo")}
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[#10b981] text-lg font-medium">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <div className="w-12 h-px bg-[#10b981]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-white">{title}</h1>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl">{shortDescription}</p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <p className="text-gray-600 leading-relaxed text-lg mb-12">{description}</p>

              <h2 className="text-2xl font-serif text-[#111] mb-8">{t("ourServices")}</h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-12">
                {services.map((service: string, i: number) => (
                  <div key={i} className="flex items-center gap-4 p-5 bg-[#fafafa] border-l-2 border-[#10b981]">
                    <span className="text-[#10b981] text-sm font-medium w-6">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[#111]">{service}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-serif text-[#111] mb-8">{t("ourProcess")}</h2>
              <div className="space-y-4">
                {steps.map((step, i) => (
                  <div key={i} className="flex gap-6 p-6 bg-[#fafafa]">
                    <div className="w-10 h-10 bg-[#1a1a1a] text-[#10b981] flex items-center justify-center flex-shrink-0 text-sm font-medium">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className="font-medium text-[#111]">{step.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-28 space-y-8">
                <div className="bg-[#1e1e1e] text-white p-8">
                  <h3 className="font-medium text-lg mb-2">{t("freeConsult")}</h3>
                  <p className="text-sm text-gray-400 mb-6">
                    {locale === "en" ? (
                      <>{t("freeConsultDesc")} {title}.</>
                    ) : (
                    <>{title} {t("freeConsultDesc")}</>
                    )}
                  </p>
                  <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="block text-xl text-[#10b981] mb-6">{siteConfig.phone}</a>
                  <Link href="/iletisim" className="block py-3 bg-[#10b981] text-white text-sm text-center font-medium hover:bg-[#059669] transition-colors">
                    {t("bookAppointment")}
                  </Link>
                </div>

                <div className="bg-[#fafafa] p-8">
                  <h3 className="font-medium text-[#111] mb-6">{t("otherServices")}</h3>
                  <div className="space-y-4">
                    {otherAreas.map((a) => (
                      <Link key={a.slug} href={`/calisma-alanlari/${a.slug}`} className="flex items-center gap-4 text-gray-600 hover:text-[#10b981] transition-colors">
                        <span className="text-xs text-gray-400">{String(practiceAreas.findIndex((p) => p.slug === a.slug) + 1).padStart(2, "0")}</span>
                        <span className="text-sm">{a.title}</span>
                      </Link>
                    ))}
                  </div>
                  <Link href="/calisma-alanlari" className="inline-flex items-center gap-2 mt-6 text-[#10b981] text-sm font-medium">
                    {t("seeAll")}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-[#1e1e1e] text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif">
            {locale === "en" ? (
              <><span className="text-[#10b981]">{t("ctaSupport")} {t("ctaSupportHighlight")}</span>{t("ctaSupportFor")}{title}</>
            ) : (
              <>{title} {t("ctaSupport")} <span className="text-[#10b981]">{t("ctaSupportHighlight")}</span></>
            )}
          </h2>
          <p className="mt-4 text-gray-400">{t("ctaSupportDesc")}</p>
          <Link href="/iletisim" className="inline-block mt-8 px-8 py-4 bg-[#10b981] text-white text-sm font-medium hover:bg-[#059669] transition-colors">
            {t("ctaContact")}
          </Link>
        </div>
      </section>
    </>
  );
}
