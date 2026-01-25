import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description: "CT Avukatlık Bürosu web sitesi çerez politikası.",
};

export default function CerezPolitikasiPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] tracking-wider uppercase text-[#10b981] mb-3">Yasal</p>
          <h1 className="text-4xl md:text-5xl font-serif text-white">Çerez Politikası</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-600 mb-8">
              Çerezlerden &quot;ctpartners.com.tr&quot; web sitemizi ziyaretleriniz sırasında deneyiminizi geliştirmek için faydalanmaktayız.
            </p>
            
            <p className="text-gray-600 mb-8">
              Web sitesinde kullandığımız çerezleri kullanmaktan vazgeçebilir, bunların türlerini veya fonksiyonlarını değiştirebilir veya web sitesine yeni çerezler ekleyebiliriz. Dolayısıyla işbu Çerez Politikası&apos;nı dilediğimiz zaman değiştirme hakkını saklı tutmaktayız.
            </p>

            <h2 className="text-2xl font-serif text-[#111] mt-10 mb-4">Çerezleri Nasıl Kullanıyoruz?</h2>
            <p className="text-gray-600 mb-6">
              CT, yaptığınız tercihleri hatırlamak ve web sitemize kullanımınızı kişiselleştirmek için çerezleri kullanır.
            </p>
            <p className="text-gray-600 mb-6">
              Web sitesinde ayrıca Google, Inc. (Google) tarafından sağlanan bir web analizi hizmeti olan Google Analytics kullanılmaktadır. Google Analytics, çerezleri ziyaretçilerin web sitesini nasıl kullandıklarını istatistiki bilgiler/raporlar ile analiz etmek amacıyla kullanır. Google Analytics kullanımı hakkında daha fazla bilgi için (reddetme seçenekleri dâhil), şu adresi ziyaret edebilirsiniz:{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#10b981] hover:underline">
                https://policies.google.com/privacy
              </a>
            </p>

            <h2 className="text-2xl font-serif text-[#111] mt-10 mb-4">Çerez Yönetimi</h2>
            <p className="text-gray-600 mb-6">
              İnternet tarayıcınızın çeşidine göre aşağıdaki adımları izleyerek, çerezler hakkında bilgi edinip, izin verme veya reddetme hakkınızı kullanabilirsiniz:
            </p>

            <ul className="space-y-4 text-gray-600 mb-8">
              <li>
                <strong className="text-[#111]">Google Chrome:</strong> Browser&apos;ınızın &quot;adres bölümünde&quot; yer alan, &quot;kilit işareti&quot; veya &quot;i&quot; harfini tıklayarak, &quot;Cookie&quot; sekmesinden çerezlere izin verebilir veya bloke edebilirsiniz.
              </li>
              <li>
                <strong className="text-[#111]">İnternet Explorer:</strong> Browser&apos;ınızın sağ üst köşesinde yer alan &quot;Tool&quot; veya &quot;Araçlar&quot; Bölümünden &quot;Güvenlik&quot; sekmesini tıklayınız ve &quot;izin ver&quot; veya &quot;izin verme&quot; şeklinde çerez yönetimizi gerçekleştiriniz.
              </li>
              <li>
                <strong className="text-[#111]">Mozilla Firefox:</strong> Browser&apos;ınızın sağ üst köşesinde yer alan &quot;menüyü aç&quot; sekmesini tıklayınız. &quot;Seçenekler&quot; görselini tıklayarak &quot;Gizlilik ve Güvenlik&quot; butonunu kullanarak çerez yönetiminizi yapınız.
              </li>
              <li>
                <strong className="text-[#111]">Safari:</strong> Telefonunuzun &quot;Ayarlar&quot; bölümünden &quot;safari&quot; sekmesini seçip, &quot;Gizlilik ve Güvenlik&quot; Bölümünden tüm çerez yönetiminizi sağlayabilirsiniz.
              </li>
              <li>
                <strong className="text-[#111]">Diğer Tarayıcılar:</strong> Opera, Microsoft Edge gibi diğer tarayıcılar için ilgili tarayıcının yardım veya destek sayfalarını inceleyebilirsiniz.
              </li>
            </ul>

            <p className="text-gray-600 mb-6">
              Çerezler konusunda daha detaylı bilgi için{" "}
              <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-[#10b981] hover:underline">
                www.allaboutcookies.org
              </a>{" "}
              adresini ziyaret edebilirsiniz.
            </p>

            <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-gray-600 text-sm">
                <strong className="text-[#111]">Not:</strong> Kalıcı çerezleri veya oturum çerezlerini reddederseniz, web sitemizi kullanmaya devam edebilirsiniz ancak tüm işlevlerine erişemeyebilirsiniz veya erişiminiz sınırlı olabilir.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
