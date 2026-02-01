import { Metadata } from "next";
import { getSiteConfig, getPracticeAreas } from "@/sanity/lib/fetch";
import ContactForm from "@/components/ContactForm";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("title"),
    description: "Hukuki danışmanlık için bizimle iletişime geçin.",
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [siteConfig, practiceAreas] = await Promise.all([
    getSiteConfig(locale),
    getPracticeAreas(locale),
  ]);

  const t = await getTranslations("contact");

  return (
    <>
      <section className="-mt-20 pt-20 pb-20 lg:pt-28 lg:pb-28 bg-gradient-to-b from-[#1e1e1e] to-[#141414]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#10b981] mb-3">{t("title")}</p>
          <div className="w-12 h-px bg-[#10b981]/60 mb-6" aria-hidden="true" />
          <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight">{t("reachUs")}</h1>
          <p className="mt-4 text-gray-400">{t("firstFree")}</p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h3 className="text-xs font-medium tracking-wider uppercase text-[#10b981] mb-3">{t("phone")}</h3>
                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="text-lg text-[#111] hover:text-[#10b981]">
                  {siteConfig.phone}
                </a>
              </div>
              <div>
                <h3 className="text-xs font-medium tracking-wider uppercase text-[#10b981] mb-3">{t("email")}</h3>
                <a href={`mailto:${siteConfig.email}`} className="text-lg text-[#111] hover:text-[#10b981]">
                  {siteConfig.email}
                </a>
              </div>
              <div>
                <h3 className="text-xs font-medium tracking-wider uppercase text-[#10b981] mb-3">{t("address")}</h3>
                <p className="text-gray-600">{siteConfig.address}</p>
              </div>
              <div>
                <h3 className="text-xs font-medium tracking-wider uppercase text-[#10b981] mb-3">{t("hours")}</h3>
                <p className="text-gray-600">{siteConfig.workingHours}</p>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <div className="bg-[#1a1a1a] text-white p-6">
                  <h3 className="font-medium mb-2">{t("emergency")}</h3>
                  <p className="text-sm text-gray-400 mb-4">{t("emergencyDesc")}</p>
                  <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="block py-3 bg-[#10b981] text-white text-sm text-center font-medium hover:bg-[#059669] transition-colors">
                    {t("callNow")}
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-[#fafafa] p-8 lg:p-10">
                <h2 className="text-2xl font-serif text-[#111] mb-2">{t("formTitle")}</h2>
                <p className="text-gray-500 text-sm mb-8">{t("formDesc")}</p>
                <ContactForm practiceAreas={practiceAreas} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-[11px] tracking-wider uppercase text-[#10b981] mb-2">{t("location")}</p>
            <h2 className="text-2xl font-serif text-[#111]">{t("locationTitle")}</h2>
            <p className="mt-1 text-sm text-gray-500">{t("locationSub")}</p>
          </div>

          <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
            <div className="aspect-[21/9] min-h-[280px] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3066.748274662519!2d30.531643411473592!3d39.76775987143266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cc3dfbf78eafa1%3A0x63cb1267ad7ef98b!2sEski%C5%9Fehir%20Adalet%20Saray%C4%B1!5e0!3m2!1str!2str!4v1769326021629!5m2!1str!2str"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Eskişehir Adalet Sarayı"
                className="absolute inset-0 block h-full w-full"
              />
            </div>
            <a
              href="https://www.google.com/maps/place/Eski%C5%9Fehir+Adalet+Saray%C4%B1/@39.7677599,30.5316434,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-[#111] text-sm font-medium rounded-lg shadow-sm hover:border-[#10b981]/40 hover:text-[#10b981] hover:bg-[#10b981]/5 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {t("openInMaps")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
