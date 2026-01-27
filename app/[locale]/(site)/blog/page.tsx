import { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getBlogPosts } from "@/sanity/lib/fetch";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

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
      <section className="py-24 lg:py-32 bg-[#1c1c1c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] tracking-wider uppercase text-[#10b981] mb-3">{t("title")}</p>
          <h1 className="text-4xl md:text-5xl font-serif text-white">{t("legalPosts")}</h1>
          <p className="mt-4 text-gray-400">{t("sub")}</p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`}>
                  <div className="aspect-[16/10] bg-gray-100 mb-5 overflow-hidden">
                    <div className="w-full h-full bg-gray-200 group-hover:scale-105 transition-transform duration-500" />
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
