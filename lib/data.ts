export const siteConfig = {
  logo: undefined as { _type: string; asset?: { _ref: string } } | undefined,
  name: "Av. Ahmet Can Tonus",
  title: "ACT | Law & Consulting",
  description: "CT & Partners Hukuk Bürosu resmi web sitesidir.",
  heroDescription: undefined as string | undefined,
  phone: "0541 332 35 95",
  email: "info@ctpartners.av.tr",
  address: "Gökmeydan Mh. Nilgün Sk. Uzun Ap. 122/10 Odunpazarı/Eskişehir",
  workingHours: "Pazartesi - Cuma: 09:00 - 18:00",
};

export const practiceAreasIntro = {
  title: "Hizmetlerimiz",
  description: "Büromuz, hukuki uyuşmazlıklara stratejik, titiz ve sonuç odaklı bir yaklaşımla çözüm üretmektedir. Her dosya, somut olayın özellikleri ve güncel yargı uygulamaları dikkate alınarak ele alınmakta; müvekkillerimize etkin ve güvenilir hukuki destek sunulmaktadır."
};

export const practiceAreas = [
  {
    slug: "ticaret-hukuku",
    title: "Ticaret Hukuku",
    shortDescription: "Şirket kuruluşları, ticari sözleşmeler, haksız rekabet ve ticari alacak davalarında hukuki danışmanlık.",
    description: "Şirket kuruluşları, ana sözleşmelerin hazırlanması ve tadili, ortaklık uyuşmazlıkları, hisse devirleri, ticari sözleşmeler, haksız rekabet, ticari alacak ve tazminat davaları ile ticari nitelikteki tüm ihtilaflarda hukuki danışmanlık ve dava takibi hizmeti sunulmaktadır.",
    services: [
      "Şirket Kuruluşları",
      "Ana Sözleşme Hazırlama ve Tadili",
      "Ortaklık Uyuşmazlıkları",
      "Hisse Devirleri",
      "Ticari Sözleşmeler",
      "Haksız Rekabet Davaları",
      "Ticari Alacak Davaları",
      "Tazminat Davaları"
    ]
  },
  {
    slug: "sirketler-hukuku",
    title: "Şirketler Hukuku",
    shortDescription: "Sermaye işlemleri, pay devri, genel kurul süreçleri ve kurumsal yapılanma desteği.",
    description: "Sermaye artırımı ve azaltımı, pay devri işlemleri, genel kurul ve yönetim kurulu süreçleri, şirket içi uyuşmazlıklar ve kurumsal yapılanmaya ilişkin hukuki destek sağlanmaktadır.",
    services: [
      "Sermaye Artırımı ve Azaltımı",
      "Pay Devri İşlemleri",
      "Genel Kurul Süreçleri",
      "Yönetim Kurulu Süreçleri",
      "Şirket İçi Uyuşmazlıklar",
      "Kurumsal Yapılanma"
    ]
  },
  {
    slug: "sozlesmeler-hukuku",
    title: "Sözleşmeler Hukuku",
    shortDescription: "Ticari ve adi sözleşmelerin hazırlanması, incelenmesi ve uyuşmazlık çözümü.",
    description: "Her türlü ticari ve adi sözleşmenin hazırlanması, incelenmesi ve revize edilmesi; sözleşmeden doğan uyuşmazlıkların çözümüne yönelik hukuki destek verilmektedir.",
    services: [
      "Sözleşme Hazırlama",
      "Sözleşme İnceleme",
      "Sözleşme Revizyonu",
      "Sözleşme Uyuşmazlıkları",
      "Ticari Sözleşmeler",
      "Adi Sözleşmeler"
    ]
  },
  {
    slug: "aile-hukuku",
    title: "Aile Hukuku",
    shortDescription: "Boşanma, nafaka, velayet ve mal rejimi tasfiyesinde titiz ve müvekkil odaklı temsil.",
    description: "Boşanma davaları, nafaka, velayet, kişisel ilişki kurulması, mal rejiminin tasfiyesi ve aile hukukundan kaynaklanan tüm uyuşmazlıklarda titiz ve müvekkil odaklı bir temsil anlayışı benimsenmektedir.",
    services: [
      "Boşanma Davaları",
      "Nafaka Davaları",
      "Velayet Davaları",
      "Kişisel İlişki Kurulması",
      "Mal Rejimi Tasfiyesi",
      "Anlaşmalı Boşanma",
      "Çekişmeli Boşanma"
    ]
  },
  {
    slug: "miras-hukuku",
    title: "Miras Hukuku",
    shortDescription: "Mirasın paylaşımı, veraset ilamı, tenkis ve muris muvazaası davalarında etkin hizmet.",
    description: "Mirasın paylaşımı, veraset ilamı, miras sözleşmeleri, tenkis davaları, muris muvazaasına dayalı davalar ve miras hukukundan doğan uyuşmazlıklarda etkin hukuki hizmet sunulmaktadır.",
    services: [
      "Mirasın Paylaşımı",
      "Veraset İlamı",
      "Miras Sözleşmeleri",
      "Tenkis Davaları",
      "Muris Muvazaası Davaları",
      "Miras Reddi"
    ]
  },
  {
    slug: "borclar-hukuku",
    title: "Borçlar Hukuku",
    shortDescription: "Haksız fiil, sebepsiz zenginleşme ve sözleşmeye aykırılık uyuşmazlıklarında destek.",
    description: "Haksız fiil, sebepsiz zenginleşme, sözleşmeye aykırılık ve borç ilişkilerinden kaynaklanan uyuşmazlıklarda hukuki destek sağlanmaktadır.",
    services: [
      "Haksız Fiil Davaları",
      "Sebepsiz Zenginleşme",
      "Sözleşmeye Aykırılık",
      "Tazminat Davaları",
      "Alacak Davaları"
    ]
  },
  {
    slug: "icra-iflas-hukuku",
    title: "İcra ve İflas Hukuku",
    shortDescription: "İcra takipleri, haciz işlemleri, menfi tespit ve istirdat davalarının yürütülmesi.",
    description: "İlamsız ve ilamlı icra takipleri, haciz işlemleri, itiraz ve şikâyetler, menfi tespit ve istirdat davaları ile icra hukukundan kaynaklanan uyuşmazlıklar yürütülmektedir.",
    services: [
      "İlamsız İcra Takibi",
      "İlamlı İcra Takibi",
      "Haciz İşlemleri",
      "İtiraz ve Şikâyetler",
      "Menfi Tespit Davaları",
      "İstirdat Davaları"
    ]
  },
  {
    slug: "gayrimenkul-kira-hukuku",
    title: "Gayrimenkul ve Kira Hukuku",
    shortDescription: "Taşınmaz işlemleri, kira uyuşmazlıkları, tahliye ve tapu davaları.",
    description: "Taşınmaz alım-satım işlemleri, kira uyuşmazlıkları, tahliye davaları, tapu iptal ve tescil davaları ile ayni haklara ilişkin ihtilaflarda hukuki destek sunulmaktadır.",
    services: [
      "Taşınmaz Alım-Satım",
      "Kira Uyuşmazlıkları",
      "Tahliye Davaları",
      "Tapu İptal Davaları",
      "Tescil Davaları",
      "Ayni Haklar"
    ]
  },
  {
    slug: "is-hukuku",
    title: "İş Hukuku",
    shortDescription: "İşçi-işveren uyuşmazlıkları, işe iade, tazminat ve iş sözleşmeleri danışmanlığı.",
    description: "İşçi ve işveren ilişkilerinden doğan uyuşmazlıklar, işe iade davaları, kıdem ve ihbar tazminatı, iş sözleşmelerinin hazırlanması ve fesih süreçlerine ilişkin hukuki danışmanlık sağlanmaktadır.",
    services: [
      "İşe İade Davaları",
      "Kıdem Tazminatı",
      "İhbar Tazminatı",
      "İş Sözleşmeleri",
      "Fesih Süreçleri",
      "İşçi-İşveren Uyuşmazlıkları"
    ]
  },
  {
    slug: "hukuki-danismanlik",
    title: "Hukuki Danışmanlık",
    shortDescription: "Bireysel ve kurumsal müvekkillere risk analizi ve süreç yönetimi hizmeti.",
    description: "Bireysel ve kurumsal müvekkillere; uyuşmazlık doğmadan önce risk analizi yapılması, hukuki görüş oluşturulması ve süreç yönetimi kapsamında düzenli hukuki danışmanlık hizmeti verilmektedir.",
    services: [
      "Risk Analizi",
      "Hukuki Görüş Oluşturma",
      "Süreç Yönetimi",
      "Kurumsal Danışmanlık",
      "Bireysel Danışmanlık",
      "Düzenli Hukuki Destek"
    ]
  }
];

export const blogPosts = [
  {
    slug: "ticari-sozlesmelerde-dikkat-edilmesi-gerekenler",
    title: "Ticari Sözleşmelerde Dikkat Edilmesi Gereken Hususlar",
    excerpt: "Ticari sözleşmelerin hazırlanması ve müzakere sürecinde dikkat edilmesi gereken kritik noktalar ve yaygın hatalar.",
    content: `Ticari sözleşmeler, iş ilişkilerinin temelini oluşturan ve tarafların hak ve yükümlülüklerini belirleyen önemli hukuki belgelerdir.

## Sözleşme Hazırlama Süreci

### 1. Tarafların Belirlenmesi
Sözleşmenin taraflarının tam ve doğru şekilde belirlenmesi, ileride doğabilecek uyuşmazlıkların önlenmesi açısından kritik öneme sahiptir.

### 2. Konunun Açık Tanımlanması
Sözleşme konusunun net ve anlaşılır biçimde tanımlanması gerekmektedir.

### 3. Bedel ve Ödeme Koşulları
Ödeme planı, taksitler ve gecikme faizi gibi konular detaylı şekilde düzenlenmelidir.

## Dikkat Edilmesi Gereken Noktalar

- Cezai şart hükümlerinin dengeli belirlenmesi
- Mücbir sebep maddelerinin dahil edilmesi
- Uyuşmazlık çözüm yöntemlerinin belirlenmesi
- Gizlilik hükümlerinin eklenmesi`,
    date: "2026-01-15",
    category: "Ticaret Hukuku",
    readTime: "5 dk"
  },
  {
    slug: "bosanma-davasinda-mal-paylasimi",
    title: "Boşanma Davasında Mal Paylaşımı Nasıl Yapılır?",
    excerpt: "Edinilmiş mallara katılma rejimi kapsamında mal paylaşımının esasları ve dikkat edilmesi gerekenler.",
    content: `Boşanma davalarında mal paylaşımı, eşler arasında en çok tartışılan konulardan biridir. Türk hukukunda yasal mal rejimi olan edinilmiş mallara katılma rejimi uygulanmaktadır.

## Edinilmiş Mallar Nelerdir?

Evlilik birliği içinde elde edilen:
- Çalışma karşılığı elde edilen gelirler
- Sosyal güvenlik ödemeleri
- Çalışma gücünün kaybı nedeniyle ödenen tazminatlar
- Kişisel malların gelirleri

## Kişisel Mallar

- Evlilik öncesi sahip olunan mallar
- Miras yoluyla edinilen mallar
- Karşılıksız kazandırmalar
- Manevi tazminat alacakları

## Paylaşım Nasıl Yapılır?

Edinilmiş malların toplam değerinden borçlar çıkarılır ve kalan değerin yarısı diğer eşe katılma alacağı olarak verilir.`,
    date: "2026-01-10",
    category: "Aile Hukuku",
    readTime: "6 dk"
  },
  {
    slug: "kiracinin-tahliyesi",
    title: "Kiracının Tahliyesi: Yasal Süreç ve Koşullar",
    excerpt: "Ev sahiplerinin kiracıyı tahliye ettirebileceği durumlar ve izlenmesi gereken hukuki süreç.",
    content: `Kira ilişkilerinde tahliye, belirli yasal koşulların varlığında mümkündür. Ev sahiplerinin keyfi olarak kiracıyı çıkarması söz konusu değildir.

## Tahliye Sebepleri

### 1. Kira Bedelinin Ödenmemesi
İki haklı ihtar veya bir kira dönemi içinde iki aylık kira bedelinin ödenmemesi halinde tahliye talep edilebilir.

### 2. İhtiyaç Sebebiyle Tahliye
Ev sahibinin kendisi, eşi veya yakınları için konut ihtiyacı bulunması halinde dava yoluyla tahliye istenebilir.

### 3. Tadilat ve Yeniden İnşa
Binanın esaslı onarımı veya yeniden inşası gerektiğinde tahliye talep edilebilir.

## Süreç

1. İhtarname gönderilmesi
2. Dava açılması
3. Yargılama süreci
4. Tahliye kararının icrası`,
    date: "2026-01-05",
    category: "Gayrimenkul Hukuku",
    readTime: "5 dk"
  },
  {
    slug: "ise-iade-davasi-sartlari",
    title: "İşe İade Davası Şartları ve Süreci",
    excerpt: "İşe iade davası açabilmek için gerekli şartlar ve dava sürecinin aşamaları.",
    content: `İşe iade davası, iş güvencesi kapsamında olan işçilerin haksız feshe karşı başvurabilecekleri önemli bir hukuki yoldur.

## Dava Açma Şartları

- İşyerinde 30 veya daha fazla işçi çalışıyor olmalı
- İşçinin en az 6 aylık kıdemi bulunmalı
- Belirsiz süreli iş sözleşmesi olmalı
- Feshin geçerli bir sebebe dayanmaması

## Arabuluculuk Zorunluluğu

İşe iade davası açmadan önce arabulucuya başvurmak zorunludur. Anlaşma sağlanamazsa dava yoluna gidilebilir.

## Dava Süreci

1. Fesih bildiriminden itibaren 1 ay içinde arabulucuya başvuru
2. Arabuluculuk sürecinin tamamlanması
3. Anlaşma sağlanamazsa 2 hafta içinde dava açılması
4. Mahkeme kararı`,
    date: "2025-12-28",
    category: "İş Hukuku",
    readTime: "5 dk"
  }
];

export const faqItems = [
  {
    question: "İlk görüşme nasıl yapılır?",
    answer: "İlk görüşmede hukuki sorununuzu dinler ve size yol haritası çıkarırız. Ücretlendirme hakkında şeffaf bilgilendirme yapılır."
  },
  {
    question: "Hangi alanlarda hizmet veriyorsunuz?",
    answer: "Ticaret hukuku, şirketler hukuku, sözleşmeler hukuku, aile hukuku, miras hukuku, borçlar hukuku, icra ve iflas hukuku, gayrimenkul ve kira hukuku, iş hukuku alanlarında danışmanlık ve dava takibi hizmeti sunmaktayız."
  },
  {
    question: "Dava masraflarını kim öder?",
    answer: "Dava masrafları (harç, tebligat, bilirkişi ücreti vb.) davayı açan tarafça peşin ödenir. Dava sonucunda masraflar genellikle haksız çıkan tarafa yükletilir. Vekalet ücreti de aynı şekilde karşı tarafa hükmedilebilir."
  },
  {
    question: "Online danışmanlık hizmeti veriyor musunuz?",
    answer: "Evet, video konferans aracılığıyla online hukuki danışmanlık hizmeti veriyoruz. Bu sayede şehir dışından veya yoğun iş temposu olan müvekkillerimize de kolayca ulaşabiliyoruz."
  },
  {
    question: "Şirketlere düzenli hukuki danışmanlık veriyor musunuz?",
    answer: "Evet, kurumsal müvekkillerimize aylık veya yıllık bazda düzenli hukuki danışmanlık hizmeti sunmaktayız. Risk analizi, sözleşme incelemesi ve hukuki görüş oluşturma gibi hizmetler bu kapsamda değerlendirilmektedir."
  },
  {
    question: "Acil durumlarda ulaşabilir miyim?",
    answer: "Acil hukuki durumlar için (gözaltı, tutuklama vb.) 7/24 ulaşılabilir durumdayız. Normal mesai saatleri dışında acil durumlar için özel iletişim hattımızı kullanabilirsiniz."
  },
  {
    question: "Arabuluculuk nedir ve hangi davalarda zorunludur?",
    answer: "Arabuluculuk, tarafların bir arabulucu eşliğinde uyuşmazlıklarını mahkemeye gitmeden çözmelerini sağlayan bir yöntemdir. İş hukuku ve ticari uyuşmazlıklarda dava açmadan önce arabuluculuğa başvurmak zorunludur."
  },
  {
    question: "Vekalet ücreti nasıl belirlenir?",
    answer: "Vekalet ücreti, davanın türü, karmaşıklığı ve tahmini süresi göz önünde bulundurularak belirlenir. Türkiye Barolar Birliği Asgari Ücret Tarifesi'nin altında ücret alınması mümkün değildir. Ücretlendirme konusunda şeffaf bilgilendirme yapılmaktadır."
  }
];

export const teamMembers = [
  {
    _id: "fallback-1",
    name: "Av. Ahmet Can Tonus",
    title: "Avukat",
    image: undefined as { _type: string; asset?: { _ref: string } } | undefined,
    shortDescription: "10+ yıllık deneyimiyle ticaret hukuku, şirketler hukuku ve sözleşmeler hukuku alanlarında uzman. Müvekkillerine güvenilir ve sonuç odaklı hukuki danışmanlık sunmaktadır.",
    linkToAbout: true,
  },
];

export const aboutContent = {
  name: "Ahmet Can Tonus",
  title: "Avukat",
  image: undefined as { _type: string; asset: { _ref: string } } | undefined,
  bio: `Ahmet Can Tonus, İstanbul Üniversitesi Hukuk Fakültesi'nden 2015 yılında mezun olmuştur. Mezuniyetinin ardından Eskişehir Barosu'na kayıt yaptırarak avukatlık mesleğine başlamıştır.

10 yılı aşkın mesleki deneyimiyle özellikle ticaret hukuku, şirketler hukuku ve sözleşmeler hukuku alanlarında uzmanlaşmıştır. Müvekkillerine güvenilir, şeffaf ve sonuç odaklı hukuki danışmanlık sunmayı ilke edinmiştir.

Sürekli gelişen hukuk dünyasını yakından takip ederek, müvekkillerine en güncel ve etkili çözümleri sunmaktadır.`,
  education: [
    {
      degree: "Hukuk Lisans",
      school: "İstanbul Üniversitesi Hukuk Fakültesi",
      year: "2011 - 2015"
    },
    {
      degree: "Hukuk Yüksek Lisans",
      school: "Anadolu Üniversitesi",
      year: "2016 - 2018"
    }
  ],
  certifications: [
    "Türkiye Barolar Birliği Arabuluculuk Sertifikası",
    "Ticari Uyuşmazlıklarda Arabuluculuk Sertifikası"
  ],
  values: [
    {
      title: "Güvenilirlik",
      description: "Müvekkil bilgilerinin gizliliği ve güvenliği önceliğimizdir."
    },
    {
      title: "Şeffaflık",
      description: "Süreç ve ücretlendirme hakkında açık iletişim sağlarız."
    },
    {
      title: "Profesyonellik",
      description: "Her davaya özveri ve uzmanlıkla yaklaşırız."
    },
    {
      title: "Sonuç Odaklılık",
      description: "Stratejik ve titiz bir yaklaşımla çözüm üretiriz."
    }
  ]
};
