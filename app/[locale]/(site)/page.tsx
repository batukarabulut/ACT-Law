import { Link } from "@/i18n/navigation";
import { getSiteConfig, getPracticeAreas, getPracticeAreasIntro, getBlogPosts, getAboutContent } from "@/sanity/lib/fetch";
import AnimatedHero from "@/components/AnimatedHero";
import SanityImage from "@/components/SanityImage";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [siteConfig, practiceAreas, practiceAreasIntro, blogPosts, aboutContent] = await Promise.all([
    getSiteConfig(locale),
    getPracticeAreas(locale),
    getPracticeAreasIntro(locale),
    getBlogPosts(locale),
    getAboutContent(locale),
  ]);

  const t = await getTranslations("home");
  const tPracticeAreas = await getTranslations("practiceAreas");

  return (
    <>
      <AnimatedHero phone={siteConfig.phone} heroDesc={siteConfig.heroDescription} />

      <section className="py-20 lg:py-28 bg-[#f7f7f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <p className="text-[11px] tracking-wider uppercase text-[#10b981] mb-3">
              {t("practiceAreaLabel")}
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#111]">
              {practiceAreasIntro?.title || tPracticeAreas("intro.title")}
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              {practiceAreasIntro?.description || tPracticeAreas("intro.description")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {practiceAreas.slice(0, 8).map((area, index) => {
              // Artık Sanity'den locale'e göre çekildiği için translation'a gerek yok
              const title = area.title;
              const shortDescription = area.shortDescription;

              return (
                <Link
                  key={area.slug}
                  href={`/calisma-alanlari/${area.slug}`}
                  className="group p-6 bg-[#fafafa] border border-gray-200/90 rounded-lg hover:border-[#10b981]/30 hover:shadow-sm hover:bg-[#fcfcfc] transition-all duration-300"
                >
                  <span className="text-[#10b981] text-sm font-medium">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-lg font-serif text-[#111] group-hover:text-[#10b981] transition-colors">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {shortDescription}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-[#10b981] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1">
                    <span>{t("detail")}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/calisma-alanlari"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#10b981]/30 text-[#10b981] font-medium hover:bg-[#10b981]/5 hover:gap-3 transition-all"
            >
              <span>{t("seeAll")}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-square bg-[#fafafa] max-w-md relative overflow-hidden">
                <SanityImage
                  image={aboutContent.image}
                  alt={aboutContent.name || ""}
                  preset="about"
                  fill
                  fallbackSrc="/avukat.jpg"
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 448px"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#10b981] text-white p-6">
                <div className="text-3xl font-serif font-semibold">10+</div>
                <div className="text-sm text-white/70 mt-1">{t("yearsExp")}</div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-[11px] tracking-wider uppercase text-[#10b981] mb-3">
                {t("aboutLabel")}
              </p>
              <h2 className="text-3xl md:text-4xl font-serif text-[#111]">
                {aboutContent.name || ""}
              </h2>
              <p className="mt-6 text-gray-600 leading-relaxed">
                {aboutContent.bio ? aboutContent.bio.split("\n\n")[0] : ""}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {aboutContent.values?.map((value, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-[#fcfcfc] border border-gray-200/90 rounded-lg">
                    <div className="w-2 h-2 bg-[#10b981] rounded-full mt-1.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-[#111] text-sm">{value.title || ""}</h4>
                    </div>
                  </div>
                )) || []}
              </div>

              <Link
                href="/hakkimizda"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-[#f5f5f5] border border-gray-200/90 text-[#111] text-sm font-medium hover:bg-[#f0f0f0] hover:border-gray-200 hover:gap-3 transition-all"
              >
                <span>{t("moreInfo")}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-[11px] tracking-wider uppercase text-[#10b981] mb-3">
                {t("blogLabel")}
              </p>
              <h2 className="text-3xl md:text-4xl font-serif text-white">
                {t("latestPosts")}
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-2 text-[#10b981] text-sm font-medium hover:gap-3 transition-all"
            >
              <span>{t("seeAllPosts")}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post) => (
              <article key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`}>
                  <div className="aspect-[16/10] bg-[#2a2a2a] mb-5 overflow-hidden border border-white/10 group-hover:border-[#10b981]/30 transition-colors relative">
                    <SanityImage
                      image={(post as { mainImage?: unknown }).mainImage}
                      alt={post.title}
                      preset="blogCard"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="text-xs text-[#10b981] uppercase tracking-wider mb-2">
                    {post.category} • {post.readTime}
                  </div>
                  <h3 className="text-lg font-serif text-white group-hover:text-[#10b981] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                    {post.excerpt}
                  </p>
                </Link>
              </article>
            ))}
          </div>

          <Link
            href="/blog"
            className="sm:hidden inline-flex items-center gap-2 mt-8 text-[#10b981] text-sm font-medium"
          >
            <span>{t("allPosts")}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-gradient-to-b from-[#242424] to-[#2a2a2a] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#10b981]/5 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white max-w-2xl mx-auto">
            {t("ctaTitle")}
            <span className="text-[#10b981]"> {t("ctaTitleHighlight")}</span>
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/iletisim"
              className="group px-8 py-4 bg-[#10b981] text-white text-sm font-medium hover:bg-[#059669] transition-all flex items-center gap-2"
            >
              <span>{t("ctaContact")}</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="px-8 py-4 border border-white/20 text-white text-sm hover:bg-white/10 hover:border-white/40 transition-all"
            >
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
