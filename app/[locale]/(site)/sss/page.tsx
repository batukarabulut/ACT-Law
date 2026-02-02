import { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getFaqItems, getSiteConfig } from "@/sanity/lib/fetch";
import FAQAccordion from "@/components/FAQAccordion";
import PageHero from "@/components/PageHero";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  return {
    title: tNav("faq"),
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
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageHero
        navLabel={tNav("faq")}
        title={t("title")}
        subtitle={t("sub")}
        heroImage={siteConfig.heroFaq ?? undefined}
      />

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
