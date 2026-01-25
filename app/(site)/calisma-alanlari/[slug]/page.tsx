import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPracticeAreas, getPracticeAreaBySlug, getSiteConfig } from "@/sanity/lib/fetch";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const practiceAreas = await getPracticeAreas();
  return practiceAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = await getPracticeAreaBySlug(slug);
  if (!area) return { title: "Sayfa Bulunamadı" };
  return { title: area.title, description: area.shortDescription };
}

export default async function PracticeAreaDetailPage({ params }: Props) {
  const { slug } = await params;
  const [practiceAreas, area, siteConfig] = await Promise.all([
    getPracticeAreas(),
    getPracticeAreaBySlug(slug),
    getSiteConfig(),
  ]);

  if (!area) notFound();

  const currentIndex = practiceAreas.findIndex((a) => a.slug === slug);
  const otherAreas = practiceAreas.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/calisma-alanlari" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#10b981] mb-8">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Hizmetlerimiz
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[#10b981] text-lg font-medium">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <div className="w-12 h-px bg-[#10b981]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-white">{area.title}</h1>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl">{area.shortDescription}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Main */}
            <div className="lg:col-span-2">
              <p className="text-gray-600 leading-relaxed text-lg mb-12">{area.description}</p>

              <h2 className="text-2xl font-serif text-[#111] mb-8">Sunduğumuz Hizmetler</h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-12">
                {area.services.map((service, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 bg-[#fafafa] border-l-2 border-[#10b981]">
                    <span className="text-[#10b981] text-sm font-medium w-6">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[#111]">{service}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-serif text-[#111] mb-8">Çalışma Sürecimiz</h2>
              <div className="space-y-4">
                {[
                  { title: "Ön Değerlendirme", desc: "Hukuki durumunuzu dinliyor, somut olayın özelliklerini değerlendiriyoruz." },
                  { title: "Strateji Belirleme", desc: "Güncel yargı uygulamaları ışığında en uygun hukuki stratejiyi belirliyoruz." },
                  { title: "Süreç Yönetimi", desc: "Dosyanızı titizlikle takip ediyor, her aşamada sizi bilgilendiriyoruz." },
                  { title: "Sonuç Odaklı Takip", desc: "Hedefe ulaşana kadar kararlılıkla yanınızda oluyoruz." },
                ].map((step, i) => (
                  <div key={i} className="flex gap-6 p-6 bg-[#fafafa]">
                    <div className="w-10 h-10 bg-[#1a1a1a] text-[#10b981] flex items-center justify-center flex-shrink-0 text-sm font-medium">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h3 className="font-medium text-[#111]">{step.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-28 space-y-8">
                <div className="bg-[#1a1a1a] text-white p-8">
                  <h3 className="font-medium text-lg mb-2">Ücretsiz Ön Görüşme</h3>
                  <p className="text-sm text-gray-400 mb-6">{area.title} alanında hukuki destek almak için bizimle iletişime geçin.</p>
                  <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="block text-xl text-[#10b981] mb-6">{siteConfig.phone}</a>
                  <Link href="/iletisim" className="block py-3 bg-[#10b981] text-white text-sm text-center font-medium hover:bg-[#059669] transition-colors">
                    Randevu Al
                  </Link>
                </div>

                <div className="bg-[#fafafa] p-8">
                  <h3 className="font-medium text-[#111] mb-6">Diğer Hizmetlerimiz</h3>
                  <div className="space-y-4">
                    {otherAreas.map((a) => (
                      <Link key={a.slug} href={`/calisma-alanlari/${a.slug}`} className="flex items-center gap-4 text-gray-600 hover:text-[#10b981] transition-colors">
                        <span className="text-xs text-gray-400">{String(practiceAreas.findIndex(p => p.slug === a.slug) + 1).padStart(2, '0')}</span>
                        <span className="text-sm">{a.title}</span>
                      </Link>
                    ))}
                  </div>
                  <Link href="/calisma-alanlari" className="inline-flex items-center gap-2 mt-6 text-[#10b981] text-sm font-medium">
                    Tümünü Gör
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-[#1a1a1a] text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif">{area.title} Konusunda <span className="text-[#10b981]">Destek Alın</span></h2>
          <p className="mt-4 text-gray-400">Hukuki sorunlarınız için profesyonel çözümler sunuyoruz.</p>
          <Link href="/iletisim" className="inline-block mt-8 px-8 py-4 bg-[#10b981] text-white text-sm font-medium hover:bg-[#059669] transition-colors">
            İletişime Geç
          </Link>
        </div>
      </section>
    </>
  );
}
