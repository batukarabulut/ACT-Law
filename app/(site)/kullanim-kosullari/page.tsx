import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullanım Koşulları",
  description: "CT Avukatlık Bürosu web sitesi kullanım koşulları.",
};

export default function KullanimKosullariPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] tracking-wider uppercase text-[#10b981] mb-3">Yasal</p>
          <h1 className="text-4xl md:text-5xl font-serif text-white">Kullanım Koşulları</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-600 mb-8">
              Büromuza göstermiş olduğunuz ilgi için teşekkür ederiz.
            </p>
            
            <p className="text-gray-600 mb-6">
              Bu web sitesi CT Avukatlık Bürosu (&quot;CT&quot;) tarafından işletilmektedir. Bu web sitesinde sunulan CT hakkında ve üçüncü kişiler ile ilgili bilgiler dikkatle ve özenle bir araya getirilmiştir. Ancak, bu bilgilerin tam ve doğru olduğunu garanti edememekteyiz. Bu web sitesinin içeriklerinde görünebilecek hatalar dolayısıyla CT herhangi bir yükümlülük üstlenmemektedir.
            </p>
            
            <p className="text-gray-600 mb-8">
              Bu web sitesini ziyaret ederek, işbu Kullanım Koşulları&apos;nı hiçbir kısıtlama veya itiraz kaydı olmaksızın kabul etmektesiniz. Devam eden teknik yenilikler ve ilgili yasal çerçeve değişiklikleri nedeniyle işbu Kullanım Koşulları&apos;na zaman zaman değişiklik ve/veya düzeltmeler yapmamız gerekebilir. Bu nedenle, bu web sitesine her ziyaret öncesinde işbu Kullanım Koşulları&apos;nı gözden geçirmenizi ve her türlü değişiklik ve/veya düzeltmeleri dikkate almanızı rica ederiz.
            </p>

            <h2 className="text-2xl font-serif text-[#111] mt-10 mb-4">1. Web Sitesinin Kullanılması</h2>
            <p className="text-gray-600 mb-6">
              Web sitesinin herhangi bir bölümüne robot veya örümcek gibi otomatik bir mekanizma veya proses kullanarak erişmeniz ya da onu kopyalamanız ve izlemeniz yasaktır. Web sitesinin ve/veya sizi bu siteye yönlendiren uygulamanın herhangi bir bölümüne bilgisayar korsanlığı veya benzeri başka yol ve araçlarla yetkisiz erişmeye teşebbüs etmemelisiniz. Ayrıca, web sitesini yasadışı amaçla kullanmanız yasaktır.
            </p>

            <h2 className="text-2xl font-serif text-[#111] mt-10 mb-4">2. Telif Hakları</h2>
            <p className="text-gray-600 mb-6">
              Web sitemizde yer alan tüm tasarım, düzenleme, veritabanı, bilgi ve diğer her türlü içeriğe ilişkin tüm fikri ve sınai mülkiyet hakları CT&apos;ye ait olup, bunların herhangi bir şekilde ve amaçla kullanılması, kopyalanması, çoğaltılması, yayılması, temsil edilmesi, iletilmesi veya üzerinde tasarruf edilmesi yasaktır.
            </p>

            <h2 className="text-2xl font-serif text-[#111] mt-10 mb-4">3. Bazı Bilgilerin Toplanması ve Kullanımı</h2>
            <p className="text-gray-600 mb-6">
              Web sitemizi ziyaret ettiğinizde, sistem yönetimi, istatistik ve &quot;back up&quot; uygulamalarının gerektirdiği bazı bilgiler sunucularımızda otomatik olarak depolanacaktır. Bu verilerin arasında İnternet servis sağlayıcınızın ismi, IP adresiniz, web gezgini yazılımınızın versiyonu, erişim sağlanan bilgisayarın işletim sistemi, tarafınızca bize yönlendirilen web sitesi, sitemizdeyken ziyaret ettiğiniz diğer siteler ve sitemizi bulmak için kullandığınız arama sözcükleri bulunabilir. Bu tür veriler, site ziyaretçisi hakkında bazı sonuçlar çıkarılmasını sağlar, ancak bu çerçevede hiçbir kişisel bilgi kullanılmayacaktır. Toplanan her türlü kişisel veriler yalnızca anonimleştirme sonrasında kullanılabilir. CT&apos;nin bu verileri dışarıdan bir hizmet sağlayıcısına yönlendirmesi durumunda veri korunması ve güvenliği ile ilgili mevzuat ile uyumlu olarak hareket edilecektir.
            </p>

            <h2 className="text-2xl font-serif text-[#111] mt-10 mb-4">4. Çocuklara Ait Bilgiler</h2>
            <p className="text-gray-600 mb-6">
              Web sitemiz yetişkinler tarafından kullanılmak üzere hazırlanmış olup çocuklara yönelik değildir. CT, 18 yaşından küçük çocuklardan bilerek bilgi toplamamaktadır. Ebeveynlerin ya da yasal velinin, gözetimleri altındaki çocuklara ait bilgilerin CT&apos;ye ulaştırıldığına dair şüphelenmeleri halinde, söz konusu bilgilerin silinmesini talep etmek üzere derhal bizimle irtibata geçmeleri gerekmektedir. Bu durumlarda söz konusu bilgiler derhal silinecektir.
            </p>

            <h2 className="text-2xl font-serif text-[#111] mt-10 mb-4">5. Üçüncü Tarafların Web Siteleri İçin Sorumluluk Almama</h2>
            <p className="text-gray-600 mb-6">
              Bu web sitesinde üçüncü şahıslar tarafından işletilen ve içerikleri CT tarafından bilinmeyen diğer web sitelerine köprü bağlantılar (hyperlink) bulunmaktadır. CT bu sitelere size kolaylık sağlamak amacıyla erişimi sağlamaktadır ancak içerikleri her ne ise bunlar ile ilgili sorumluluk kabul etmemektedir. Üçüncü taraflara ait web sitelerine olan bağlantıların bulundurulması yalnızca gezinme kolaylığı içindir. Bağlantı yapılan sitelerdeki beyanlar bizim tarafımızdan yapılmamıştır ve web sitemizden bağlanılan hiçbir üçüncü taraflara ait sayfalardaki içerik ile açıkça bir ilgimiz yoktur. Özellikle, üçüncü taraflarca bu sayfalarda kanuni hükümlerin ihlalleri veya bunlara aykırı davranılması konusunda hiçbir sorumluluk kabul etmemekteyiz. Söz konusu web sitelerindeki sayfaların içeriğinden tamamen bu web sitelerinin sahipleri sorumludur.
            </p>
            <p className="text-gray-600 mb-6">
              CT bu web sitesinden köprü bağlantılar (hyperlink) ile bağlanılan sitelerde ticari markalar, telif hakları, diğer fikri mülkiyet hakları veya şahsi hakların herhangi bir şekilde ihlali veya bunlara aykırı davranılması ile ilgili hiçbir sorumluluk kabul etmez. Bu sorumluluk, web sitesinde görüntülenen tüm bağlantılar ve kullanıcının söz konusu bağlantılar aracılığıyla yönlendirildiği her türlü web sitesi için geçerlidir.
            </p>

            <h2 className="text-2xl font-serif text-[#111] mt-10 mb-4">6. Yasal Uyarı</h2>
            <p className="text-gray-600 mb-6">
              CT kendi web sitesini virüslerden temizlenmiş olarak tutmak konusunda önemli bir çaba sarf etmektedir ancak virüslerin bulunmadığı garantisini verememekteyiz. Bu nedenle doküman veya veri indirirken gerekli virüs koruma önlemlerini aldığınızdan emin olmanızı öneririz (örneğin virüs tarayıcılar kullanarak). CT web sitesinde sunulan hizmetlerde herhangi bir kusur veya hata olmayacağını ya da kesintisiz hizmet verilebileceğini garanti edemez.
            </p>

            <h2 className="text-2xl font-serif text-[#111] mt-10 mb-4">7. Sosyal Medya Eklentilerinin Kullanımı</h2>
            <p className="text-gray-600 mb-6">
              Web sayfalarımız sırasıyla Google, Meta, Spotify ve X (Twitter) tarafından sağlanan Youtube, Instagram, Facebook, Spotify ve X (Twitter) gibi hizmetlerden gömülü sosyal ağ eklentileri içerebilir.
            </p>

            <h2 className="text-2xl font-serif text-[#111] mt-10 mb-4">8. Diğer Hükümler</h2>
            <p className="text-gray-600 mb-6">
              İşbu Kullanım Koşulları, Türkiye Cumhuriyeti kanunlarına uygun olarak hazırlanmıştır ve bu kanunlara tabidir. İşbu Kullanım Koşulları veya web sitesinden kaynaklanan ve bunlarla bağlantılı her türlü uyuşmazlığın çözümünde İstanbul (Çağlayan) Mahkemeleri ve İcra Daireleri yetkilidir. İşbu Kullanım Koşulları şartlarının herhangi birinin geçersizliği veya icra edilememesi diğer şartların geçerliliğini etkilemeyecektir.
            </p>

            {/* Uyarı Bölümü */}
            <div className="mt-12 p-6 bg-red-50 border border-red-200 rounded-lg">
              <h2 className="text-xl font-serif text-red-800 mb-4">⚠️ Önemli Uyarı</h2>
              <p className="text-red-700 mb-4">
                Son dönemde, büromuzun adını ve avukatlarımızın kimlik bilgilerini izinsiz ve yanıltıcı şekilde kullanan kişi veya oluşumların arttığı gözlemlenmektedir. Bu kapsamda, büromuzun avukatı veya temsilcisi olduğunu iddia eden; büromuzun ve avukatlarımızın isimlerini, unvanlarını ve görsellerini kullanarak sosyal medya platformları, internet siteleri veya benzeri mecralar üzerinden sizinle iletişime geçen kişilere itibar etmeyiniz.
              </p>
              <p className="text-red-700 mb-4">
                Ayrıca, güvenilirliğinden emin olmadığınız kaynaklardan kısa mesaj, e-posta veya benzeri yollarla iletilen içeriklere karşı dikkatli olunuz ve bu kişilerle herhangi bir kişisel veya hassas bilgi paylaşımında bulunmayınız.
              </p>
              <p className="text-red-700 font-medium">
                Şüpheli bir durumla karşılaşmanız hâlinde, lütfen bizimle doğrudan iletişime geçiniz!
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
