import { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getBlogPosts, getBlogPostBySlug, getSiteConfig } from "@/sanity/lib/fetch";
import BlogPostContent from "@/components/BlogPostContent";
import SanityImage from "@/components/SanityImage";
import type { SanityImageSource } from "@/sanity/lib/image";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  // Artık tek document var, her dil için aynı slug kullanılacak
  const blogPosts = await getBlogPosts("tr"); // Slug'lar Türkçe'den geliyor
  return routing.locales.flatMap((locale) =>
    blogPosts.map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPostBySlug(slug, locale);
  const t = await getTranslations({ locale, namespace: "notFound" });
  if (!post) return { title: t("title") };
  const metaTitle =
    typeof post.title === "string"
      ? post.title
      : (post as any)?.title?.[locale as keyof typeof post.title] ??
        (post as any)?.title?.tr ??
        (post as any)?.title?.en ??
        "";

  const metaDescription =
    typeof post.excerpt === "string" ? post.excerpt : undefined;

  return { title: metaTitle, description: metaDescription };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const [blogPosts, post, siteConfig, headersList] = await Promise.all([
    getBlogPosts(locale),
    getBlogPostBySlug(slug, locale),
    getSiteConfig(locale),
    headers(),
  ]);

  if (!post) notFound();

  const host = headersList.get("x-forwarded-host") || headersList.get("host") || "localhost:3000";
  const proto = headersList.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const shareUrl = `${proto}://${host}/${locale === "tr" ? "" : "en/"}blog/${slug}`;

  const otherPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);
  const t = await getTranslations("blogPost");

  return (
    <>
      <section className="-mt-20 pt-20 pb-20 lg:pt-28 lg:pb-28 bg-gradient-to-b from-[#1e1e1e] to-[#141414]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#10b981] mb-8 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t("backTo")}
          </Link>
          <div className="text-xs text-[#10b981] uppercase tracking-[0.15em] mb-4">
            {post.category} • {post.readTime}
          </div>
          <div className="w-12 h-px bg-[#10b981]/60 mb-6" aria-hidden="true" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-tight tracking-tight">
            {post.title}
          </h1>
          <p className="mt-8 text-lg text-gray-400">{post.excerpt}</p>
        </div>
      </section>

      {(post as { mainImage?: SanityImageSource }).mainImage && (
        <section className="bg-[#1a1a1a]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="aspect-[21/9] relative overflow-hidden -mb-px">
              <SanityImage
                image={(post as { mainImage?: SanityImageSource }).mainImage}
                alt={post.title}
                preset="blogHero"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogPostContent
            content={post.content}
            title={post.title}
            slug={post.slug}
            shareUrl={shareUrl}
          />

          <div className="mt-12 pt-8 border-t border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-[#111]">{siteConfig.name}</p>
              <p className="text-sm text-gray-400">{t("attorney")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif text-[#111] mb-8">{t("otherPosts")}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {otherPosts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
                <div className="aspect-[16/10] bg-gray-200 mb-4 relative overflow-hidden group-hover:scale-[1.02] transition-transform">
                  <SanityImage
                    image={(p as { mainImage?: SanityImageSource }).mainImage}
                    alt={p.title}
                    preset="blogCard"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <p className="text-xs text-[#10b981] mb-1">{p.category}</p>
                <h3 className="font-serif text-[#111] group-hover:text-gray-600 line-clamp-2">{p.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-[#1e1e1e] text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif">{t("ctaTitle")} <span className="text-[#10b981]">{t("ctaTitleHighlight")}</span></h2>
          <Link href="/iletisim" className="inline-block mt-8 px-8 py-4 bg-[#10b981] text-white text-sm font-medium hover:bg-[#059669] transition-colors">
            {t("ctaContact")}
          </Link>
        </div>
      </section>
    </>
  );
}
