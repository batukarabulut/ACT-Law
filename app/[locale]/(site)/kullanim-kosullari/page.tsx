import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { getLegalContent } from "@/sanity/lib/fetch";
import LegalContent from "@/components/LegalContent";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return {
    title: t("kullanim"),
    description: "CT Avukatlık Bürosu web sitesi kullanım koşulları.",
  };
}

export default async function KullanimKosullariPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("legal");
  const legalContent = await getLegalContent(locale);

  return (
    <>
      <section className="py-16 lg:py-24 bg-[#1c1c1c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] tracking-wider uppercase text-[#10b981] mb-3">{t("legal")}</p>
          <h1 className="text-4xl md:text-5xl font-serif text-white">{t("kullanim")}</h1>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {legalContent.termsOfUse && legalContent.termsOfUse.length > 0 ? (
            <LegalContent content={legalContent.termsOfUse} />
          ) : (
            <p className="text-gray-600">{t("enOnlyNotice")}</p>
          )}

          {legalContent.termsOfUseWarning && (
            <div className="mt-4 p-6 bg-red-50 border border-red-200 rounded-lg">
              <h2 className="text-xl font-serif text-red-800 mb-4">
                {locale === "en" ? "WARNING" : "UYARI"}
              </h2>
              {legalContent.termsOfUseWarning.split("\n\n").map((p, i) => (
                <p key={i} className="text-red-700 mb-3">
                  {p}
                </p>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
