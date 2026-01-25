import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aydınlatma Metni",
  description: "CT Avukatlık Bürosu kişisel verilerin korunması aydınlatma metni.",
};

export default function AydinlatmaMetniPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] tracking-wider uppercase text-[#10b981] mb-3">KVKK</p>
          <h1 className="text-4xl md:text-5xl font-serif text-white">Aydınlatma Metni</h1>
          <p className="mt-4 text-gray-400">İletişim Formumuz Üzerinden Toplanan Kişisel Verilerinize İlişkin</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-600 mb-8">
              Büromuz ile iletişime geçtiğiniz için teşekkür ederiz. CT Avukatlık Bürosu&apos;nda (&quot;CT&quot;) kişisel verilerinizin korunmasını ve kişisel verilerin korunması mevzuatına uygun olarak işlenmesini önemsiyoruz.
            </p>
            
            <p className="text-gray-600 mb-8 font-medium">
              Lütfen iletişim formunu doldurmadan önce aşağıda yer alan aydınlatma metnini okuyunuz.
            </p>

            <p className="text-gray-600 mb-6">
              6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;Kanun&quot;) uyarınca kimliğinizi belirli veya belirlenebilir kılan her türlü bilgi, kişisel veri niteliği taşımaktadır. Veri sorumlusu sıfatıyla CT, kimlik (adınız ve soyadınız), iletişim detayları (e-posta adresiniz ve/veya telefon numaranız) ve mesleki bilgiler (şirket ve pozisyon) gibi kişisel verileriniz ile sorunuzun konusu ile ilgili paylaşmayı tercih edeceğiniz diğer bilgileri tarafımıza iletmiş olduğunuz iletişim formu aracılığıyla elde etmektedir.
            </p>

            <p className="text-gray-600 mb-8">
              Kişisel verilerinizi, CT&apos;ye sorularınıza ilişkin tarafınız ile iletişime geçmek amacıyla açık rızanıza dayanarak otomatik olan yollarla işleyeceğiz. Kişisel verilerinizi Türkiye içinde veya dışında herhangi bir üçüncü kişiye aktarmamaktayız.
            </p>

            <h2 className="text-2xl font-serif text-[#111] mt-10 mb-4">Haklarınız</h2>
            <p className="text-gray-600 mb-4">
              Kanun&apos;un 11. maddesi uyarınca kişisel verilerinizin işlenmesine yönelik olarak aşağıdaki haklara sahip olduğunuzu belirtmek isteriz:
            </p>

            <ol className="list-decimal pl-6 space-y-3 text-gray-600 mb-8">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
              <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme,</li>
              <li>Kişisel verilerinizin hangi amaçla işlendiğini ve bu amaçlara uygun kullanılıp kullanılmadığını öğrenme,</li>
              <li>Kişisel verilerinizin yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,</li>
              <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması halinde bunların düzeltilmesini isteme,</li>
              <li>Kişisel verilerinizin silinmesini veya yok edilmesini talep etme,</li>
              <li>Düzeltme, silme ve yok etme taleplerinizin kişisel verilerinizin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
              <li>İşlenen verilerinizin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle şahsınız aleyhine bir sonucun ortaya çıkmasına itiraz etme,</li>
              <li>Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme.</li>
            </ol>

            <div className="mt-8 p-6 bg-[#10b981]/5 border border-[#10b981]/20 rounded-lg">
              <p className="text-gray-700">
                İşbu aydınlatma metnine ilişkin sorularınız veya yukarıda belirtilen haklarınıza ilişkin talepleriniz için bize ulaşabilirsiniz. Tarafınıza, <strong>30 günü aşmamak kaydıyla</strong> mümkün olan en kısa sürede dönüş yapılacaktır.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
