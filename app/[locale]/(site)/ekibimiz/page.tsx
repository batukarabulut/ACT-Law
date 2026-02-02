import { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getTeamMembers, getSiteConfig } from "@/sanity/lib/fetch";
import SanityImage from "@/components/SanityImage";
import PageHero from "@/components/PageHero";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tTeam = await getTranslations({ locale, namespace: "team" });
  return {
    title: tNav("team"),
    description: tTeam("sub"),
  };
}

export default async function TeamPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [teamMembers, siteConfig] = await Promise.all([
    getTeamMembers(locale),
    getSiteConfig(locale),
  ]);
  const t = await getTranslations("team");
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageHero
        navLabel={tNav("team")}
        title={tNav("team")}
        subtitle={t("sub")}
        heroImage={siteConfig.heroTeam ?? undefined}
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {teamMembers.map((member) => {
              const name = member.name || "";
              const title = member.title || "";
              const shortDescription = member.shortDescription || "";
              const CardContent = (
                <>
                  <div className="aspect-[3/4] bg-[#fafafa] relative overflow-hidden">
                    <SanityImage
                      image={member.image}
                      alt={name}
                      preset="about"
                      fill
                      fallbackSrc="/avukat.jpg"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h2 className="text-xl font-serif font-semibold text-[#111] group-hover:text-[#10b981] transition-colors">
                      {name}
                    </h2>
                    {title && (
                      <p className="mt-1 text-sm text-gray-500">{title}</p>
                    )}
                    {shortDescription && (
                      <p className="mt-3 text-sm text-gray-600 line-clamp-4">
                        {shortDescription}
                      </p>
                    )}
                    {member.linkToAbout && (
                      <span className="inline-flex items-center gap-2 mt-3 text-sm text-[#10b981] font-medium">
                        {t("viewProfile")}
                        <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    )}
                  </div>
                </>
              );

              if (member.linkToAbout) {
                return (
                  <Link
                    key={member._id}
                    href="/hakkimizda"
                    className="group block w-full bg-white border border-gray-200/90 rounded-lg overflow-hidden shadow-sm hover:shadow-md hover:border-[#10b981]/30 transition-all duration-300"
                  >
                    {CardContent}
                  </Link>
                );
              }

              return (
                <div
                  key={member._id}
                  className="group block w-full bg-white border border-gray-200/90 rounded-lg overflow-hidden shadow-sm"
                >
                  {CardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-[#1e1e1e] text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif">{t("ctaTitle")}</h2>
          <Link href="/iletisim" className="inline-block mt-6 px-8 py-4 bg-[#10b981] text-white text-sm font-medium hover:bg-[#059669] transition-colors">
            {t("ctaContact")}
          </Link>
        </div>
      </section>
    </>
  );
}
