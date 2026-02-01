import { StructureBuilder } from "sanity/structure";

/**
 * Özel menü yapısı: Ekibimiz ve diğer içerik türleri görünür şekilde listelenir.
 * Mevcut avukat bilgilerini görmek için "Ekibimiz / Team"e tıklayın;
 * liste boşsa "Create new" ile ekleyin veya seed script çalıştırın.
 */
export const structure = (S: StructureBuilder) =>
  S.list()
    .id("content")
    .title("İçerik")
    .items([
      // Ekibimiz en üstte – avukat ve ekip üyeleri
      S.documentTypeListItem("teamMember").title("Ekibimiz / Team"),
      S.divider(),
      // Diğer türler
      S.documentTypeListItem("siteConfig").title("Site Ayarları"),
      S.documentTypeListItem("about").title("Hakkımızda"),
      S.documentTypeListItem("practiceArea").title("Çalışma Alanları"),
      S.documentTypeListItem("practiceAreasIntro").title("Çalışma Alanları Giriş"),
      S.documentTypeListItem("blogPost").title("Blog / Yayınlar"),
      S.documentTypeListItem("faq").title("S.S.S"),
      S.documentTypeListItem("legalContent").title("Yasal Metinler"),
    ]);
