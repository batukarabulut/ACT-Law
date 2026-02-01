import { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getFaqItems, getSiteConfig } from "@/sanity/lib/fetch";
import FAQAccordion from "@/components/FAQAccordion";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  return {
    title: t("title"),
    description: "Hukuki süreçler hakkında merak edilen sorular.",
  };
}

export default async function FAQPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [faqItems, siteConfig] = await Promise.all([
    getFaqItems(locale),
    getSiteConfig(locale),
  ]);

  const t = await getTranslations("faq");

  return (
    <>
      <section className="-mt-20 pt-20 pb-20 lg:pt-28 lg:pb-28 bg-gradient-to-b from-[#1e1e1e] to-[#141414]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#10b981] mb-3">{t("label")}</p>
          <div className="w-12 h-px bg-[#10b981]/60 mb-6" aria-hidden="true" />
          <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight">{t("title")}</h1>
          <p className="mt-4 text-gray-400">{t("sub")}</p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-serif text-[#111]">{t("ctaTitle")}</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/iletisim" className="px-8 py-4 bg-[#10b981] text-white text-sm font-medium hover:bg-[#059669] transition-colors">
              {t("ctaContact")}
            </Link>
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="px-8 py-4 border border-[#1a1a1a] text-[#1a1a1a] text-sm font-medium hover:bg-[#1a1a1a] hover:text-white transition-colors">
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
