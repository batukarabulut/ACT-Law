import { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getBlogPosts, getBlogPostBySlug, getSiteConfig } from "@/sanity/lib/fetch";
import BlogPostContent from "@/components/BlogPostContent";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const blogPosts = await getBlogPosts();
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Sayfa Bulunamadı" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [blogPosts, post, siteConfig, headersList] = await Promise.all([
    getBlogPosts(),
    getBlogPostBySlug(slug),
    getSiteConfig(),
    headers(),
  ]);

  if (!post) notFound();

  const host = headersList.get("x-forwarded-host") || headersList.get("host") || "localhost:3000";
  const proto = headersList.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const shareUrl = `${proto}://${host}/blog/${slug}`;

  const otherPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-[#1a1a1a]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#10b981] mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Blog
          </Link>
          <div className="text-xs text-[#10b981] uppercase tracking-wider mb-4">
            {post.category} • {post.readTime}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-tight">
            {post.title}
          </h1>
          <p className="mt-6 text-lg text-gray-400">{post.excerpt}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogPostContent 
            content={post.content} 
            title={post.title} 
            slug={post.slug}
            shareUrl={shareUrl}
          />

          {/* Author */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-[#111]">{siteConfig.name}</p>
              <p className="text-sm text-gray-400">Avukat</p>
            </div>
          </div>
        </div>
      </section>

      {/* Other Posts */}
      <section className="py-16 lg:py-20 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif text-[#111] mb-8">Diğer Yazılar</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {otherPosts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
                <div className="aspect-[16/10] bg-gray-200 mb-4 group-hover:scale-[1.02] transition-transform" />
                <p className="text-xs text-[#10b981] mb-1">{p.category}</p>
                <h3 className="font-serif text-[#111] group-hover:text-gray-600 line-clamp-2">{p.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-[#1a1a1a] text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif">Danışmanlık İçin <span className="text-[#10b981]">Bize Ulaşın</span></h2>
          <Link href="/iletisim" className="inline-block mt-8 px-8 py-4 bg-[#10b981] text-white text-sm font-medium hover:bg-[#059669] transition-colors">
            İletişime Geç
          </Link>
        </div>
      </section>
    </>
  );
}
