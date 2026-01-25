import { Metadata } from "next";
import { getSiteConfig, getPracticeAreas } from "@/sanity/lib/fetch";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Hukuki danışmanlık için bizimle iletişime geçin.",
};

export default async function ContactPage() {
  const [siteConfig, practiceAreas] = await Promise.all([
    getSiteConfig(),
    getPracticeAreas(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] tracking-wider uppercase text-[#10b981] mb-3">İletişim</p>
          <h1 className="text-4xl md:text-5xl font-serif text-white">Bize Ulaşın</h1>
          <p className="mt-4 text-gray-400">İlk görüşmemiz ücretsizdir.</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Info */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h3 className="text-xs font-medium tracking-wider uppercase text-[#10b981] mb-3">Telefon</h3>
                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="text-lg text-[#111] hover:text-[#10b981]">
                  {siteConfig.phone}
                </a>
              </div>
              <div>
                <h3 className="text-xs font-medium tracking-wider uppercase text-[#10b981] mb-3">E-posta</h3>
                <a href={`mailto:${siteConfig.email}`} className="text-lg text-[#111] hover:text-[#10b981]">
                  {siteConfig.email}
                </a>
              </div>
              <div>
                <h3 className="text-xs font-medium tracking-wider uppercase text-[#10b981] mb-3">Adres</h3>
                <p className="text-gray-600">{siteConfig.address}</p>
              </div>
              <div>
                <h3 className="text-xs font-medium tracking-wider uppercase text-[#10b981] mb-3">Çalışma Saatleri</h3>
                <p className="text-gray-600">{siteConfig.workingHours}</p>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <div className="bg-[#1a1a1a] text-white p-6">
                  <h3 className="font-medium mb-2">Acil Durum?</h3>
                  <p className="text-sm text-gray-400 mb-4">Gözaltı veya tutuklama için 7/24 ulaşılabilir.</p>
                  <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="block py-3 bg-[#10b981] text-white text-sm text-center font-medium hover:bg-[#059669] transition-colors">
                    Hemen Ara
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-[#fafafa] p-8 lg:p-10">
                <h2 className="text-2xl font-serif text-[#111] mb-2">İletişim Formu</h2>
                <p className="text-gray-500 text-sm mb-8">En kısa sürede dönüş yapacağız.</p>
                <ContactForm practiceAreas={practiceAreas} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map - Eskişehir Adliyesi */}
      <section className="bg-gray-100">
        <div className="aspect-[21/9] w-full overflow-hidden">
          <iframe
            src="https://www.google.com/maps?q=Eski%C5%9Fehir+Adliye+Saray%C4%B1+Eski%C5%9Fehir&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Eskişehir Adliyesi konumu"
            className="block min-h-[280px]"
          />
        </div>
      </section>
    </>
  );
}
