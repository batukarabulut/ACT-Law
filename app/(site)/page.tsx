import Link from "next/link";
import Image from "next/image";
import { getSiteConfig, getPracticeAreas, getPracticeAreasIntro, getBlogPosts, getAboutContent } from "@/sanity/lib/fetch";
import AnimatedHero from "@/components/AnimatedHero";

export default async function Home() {
  const [siteConfig, practiceAreas, practiceAreasIntro, blogPosts, aboutContent] = await Promise.all([
    getSiteConfig(),
    getPracticeAreas(),
    getPracticeAreasIntro(),
    getBlogPosts(),
    getAboutContent(),
  ]);

  return (
    <>
      {/* Animated Hero Section */}
      <AnimatedHero phone={siteConfig.phone} />

      {/* Practice Areas */}
      <section className="py-20 lg:py-28 bg-[#1e1e1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <p className="text-[11px] tracking-wider uppercase text-[#10b981] mb-3">
              Çalışma Alanları
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-white">
              {practiceAreasIntro.title}
            </h2>
            <p className="mt-4 text-gray-400 leading-relaxed">
              {practiceAreasIntro.description}
            </p>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-white/5">
            {practiceAreas.slice(0, 8).map((area, index) => (
              <Link
                key={area.slug}
                href={`/calisma-alanlari/${area.slug}`}
                className="group p-6 bg-[#1e1e1e] hover:bg-[#262626] transition-all duration-300 border border-white/5 hover:border-[#10b981]/30"
              >
                <span className="text-[#10b981] text-sm font-medium">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-lg font-serif text-white transition-colors">
                  {area.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 group-hover:text-gray-400 transition-colors line-clamp-2">
                  {area.shortDescription}
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm text-[#10b981] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1">
                  <span>Detay</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/calisma-alanlari"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#10b981]/30 text-[#10b981] font-medium hover:bg-[#10b981]/10 hover:gap-3 transition-all"
            >
              <span>Tüm Hizmetleri Gör</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 lg:py-28 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative order-2 lg:order-1">
              <div className="aspect-square bg-[#262626] max-w-md relative overflow-hidden border border-white/5">
                <Image
                  src="/avukat.jpg"
                  alt={aboutContent.name}
                  fill
                  className="object-cover object-top"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/50 to-transparent" />
              </div>
              <div className="absolute top-6 left-6 w-full h-full border border-[#10b981]/30 -z-10 max-w-md" />
              {/* Experience badge */}
              <div className="absolute -bottom-4 -right-4 bg-[#10b981] text-white p-6">
                <div className="text-3xl font-serif font-semibold">10+</div>
                <div className="text-sm text-white/70 mt-1">Yıllık Deneyim</div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <p className="text-[11px] tracking-wider uppercase text-[#10b981] mb-3">
                Hakkımızda
              </p>
              <h2 className="text-3xl md:text-4xl font-serif text-white">
                {aboutContent.name}
              </h2>
              <p className="mt-6 text-gray-400 leading-relaxed">
                {aboutContent.bio.split("\n\n")[0]}
              </p>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                {aboutContent.values.map((value, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white/5 border border-white/5">
                    <div className="w-2 h-2 bg-[#10b981] rounded-full mt-1.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-white text-sm">{value.title}</h4>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/hakkimizda"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 hover:gap-3 transition-all"
              >
                <span>Daha Fazla Bilgi</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 lg:py-28 bg-[#1e1e1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-[11px] tracking-wider uppercase text-[#10b981] mb-3">
                Blog
              </p>
              <h2 className="text-3xl md:text-4xl font-serif text-white">
                Son Yazılar
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-2 text-[#10b981] text-sm font-medium hover:gap-3 transition-all"
            >
              <span>Tümünü Gör</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post) => (
              <article key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`}>
                  <div className="aspect-[16/10] bg-[#262626] mb-5 overflow-hidden border border-white/5 group-hover:border-[#10b981]/30 transition-colors">
                    <div className="w-full h-full bg-gradient-to-br from-[#262626] to-[#333] group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                      <svg className="w-12 h-12 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
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
            <span>Tüm Yazılar</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-[#1a1a1a] to-[#1e1e1e] relative overflow-hidden">
        {/* Background effect */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#10b981]/5 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white max-w-2xl mx-auto">
            Hukuki Danışmanlık İçin
            <span className="text-[#10b981]"> Bize Ulaşın</span>
          </h2>
          <p className="mt-6 text-gray-400 max-w-lg mx-auto">
            İlk görüşmemiz ücretsizdir. Hukuki sorunlarınızı dinler, 
            size en uygun çözüm yolunu belirleriz.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/iletisim"
              className="group px-8 py-4 bg-[#10b981] text-white text-sm font-medium hover:bg-[#059669] transition-all flex items-center gap-2"
            >
              <span>İletişime Geç</span>
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
