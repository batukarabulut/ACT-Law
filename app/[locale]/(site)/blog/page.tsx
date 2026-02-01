import { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getBlogPosts } from "@/sanity/lib/fetch";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import SanityImage from "@/components/SanityImage";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: t("title"),
    description: "Hukuki konularda güncel yazılar ve makaleler.",
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const blogPosts = await getBlogPosts(locale);
  const t = await getTranslations("blog");

  return (
    <>
      <section className="-mt-20 pt-20 pb-20 lg:pt-28 lg:pb-28 bg-gradient-to-b from-[#1e1e1e] to-[#141414]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#10b981] mb-3">{t("title")}</p>
          <div className="w-12 h-px bg-[#10b981]/60 mb-6" aria-hidden="true" />
          <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight">{t("legalPosts")}</h1>
          <p className="mt-4 text-gray-400">{t("sub")}</p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`}>
                  <div className="aspect-[16/10] bg-gray-100 mb-5 overflow-hidden relative">
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
                  <h2 className="text-lg font-serif text-[#111] group-hover:text-gray-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
