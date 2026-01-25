import { Metadata } from "next";
import Link from "next/link";
import { getFaqItems, getSiteConfig } from "@/sanity/lib/fetch";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular",
  description: "Hukuki süreçler hakkında merak edilen sorular.",
};

export default async function FAQPage() {
  const [faqItems, siteConfig] = await Promise.all([
    getFaqItems(),
    getSiteConfig(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] tracking-wider uppercase text-[#10b981] mb-3">S.S.S</p>
          <h1 className="text-4xl md:text-5xl font-serif text-white">Sıkça Sorulan Sorular</h1>
          <p className="mt-4 text-gray-400">Merak ettiğiniz soruların cevapları.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-serif text-[#111]">Sorunuzun Cevabını Bulamadınız mı?</h2>
          <p className="mt-3 text-gray-500">Bizimle iletişime geçebilirsiniz.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/iletisim" className="px-8 py-4 bg-[#10b981] text-white text-sm font-medium hover:bg-[#059669] transition-colors">
              İletişime Geç
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
