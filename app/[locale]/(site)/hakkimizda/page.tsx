import { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { getAboutContent, getSiteConfig } from "@/sanity/lib/fetch";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    description: "Av. Ahmet Can Tonus Hukuk Bürosu hakkında bilgi edinin.",
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const aboutContent = await getAboutContent(locale);
  const siteConfig = await getSiteConfig(locale);
  const t = await getTranslations("about");

  return (
    <>
      <section className="py-16 lg:py-24 bg-[#1c1c1c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] tracking-wider uppercase text-[#10b981] mb-3">
            {t("title")}
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-white">
            {aboutContent.name || ""}
          </h1>
          <p className="mt-2 text-xl text-gray-400 font-serif">
            {aboutContent.title || ""}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="lg:sticky lg:top-28 space-y-8">
                <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
                  <Image
                    src="/avukat.jpg"
                    alt="Av. Ahmet Can Tonus"
                    fill
                    className="object-cover object-top"
                  />
                </div>

                <div className="bg-[#1a1a1a] text-white p-6">
                  <h3 className="font-medium mb-4">{t("contact")}</h3>
                  <div className="space-y-3 text-sm text-gray-300">
                    <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="block hover:text-[#10b981]">
                      {siteConfig.phone}
                    </a>
                    <a href={`mailto:${siteConfig.email}`} className="block hover:text-[#10b981]">
                      {siteConfig.email}
                    </a>
                  </div>
                  <Link href="/iletisim" className="block mt-6 py-3 bg-[#10b981] text-white text-sm text-center font-medium hover:bg-[#059669] transition-colors">
                    {t("bookAppointment")}
                  </Link>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="mb-12">
                {aboutContent.bio ? aboutContent.bio.split("\n\n").map((p, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed mb-4">{p}</p>
                )) : null}
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-serif text-[#111] mb-6">{t("education")}</h2>
                <div className="space-y-4">
                  {aboutContent.education?.map((edu, i) => (
                    <div key={i} className="p-5 bg-[#fafafa] border-l-2 border-[#10b981]">
                      <h3 className="font-medium text-[#111]">{edu.degree || ""}</h3>
                      <p className="text-sm text-gray-500">{edu.school || ""}</p>
                      <p className="text-xs text-gray-400 mt-1">{edu.year || ""}</p>
                    </div>
                  )) || []}
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-serif text-[#111] mb-6">{t("certifications")}</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {aboutContent.certifications?.map((cert, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-[#fafafa]">
                      <svg className="w-5 h-5 text-[#10b981] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600">{cert || ""}</span>
                    </div>
                  )) || []}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-serif text-[#111] mb-6">{t("values")}</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {aboutContent.values?.map((val, i) => (
                    <div key={i}>
                      <h3 className="font-medium text-[#111] mb-1">{val.title || ""}</h3>
                      <p className="text-sm text-gray-500">{val.description || ""}</p>
                    </div>
                  )) || []}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-[#1e1e1e] text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif">{t("ctaTitle")} <span className="text-[#10b981]">{t("ctaTitleHighlight")}</span></h2>
          <p className="mt-4 text-gray-400">{t("ctaDesc")}</p>
          <Link href="/iletisim" className="inline-block mt-8 px-8 py-4 bg-[#10b981] text-white text-sm font-medium hover:bg-[#059669] transition-colors">
            {t("ctaContact")}
          </Link>
        </div>
      </section>
    </>
  );
}
