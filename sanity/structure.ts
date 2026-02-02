import { StructureBuilder } from "sanity/structure";

/** İlk ekip üyesi (ana avukat) şablonu – "Yeni oluştur"da bu seçenek çıkar, form önceden dolu gelir. */
const ANA_AVUKAT_TEMPLATE_ID = "teamMember-ana-avukat";

/**
 * Özel menü: Ekibimiz listesi. Liste boşsa "+" veya menüden "Ana avukat (ilk kayıt)" ile yeni belge oluşturun; form önceden dolu gelir.
 */
export const structure = (S: StructureBuilder) =>
  S.list()
    .id("content")
    .title("İçerik")
    .items([
      S.listItem()
        .title("Ekibimiz / Team")
        .child(
          S.documentTypeList("teamMember")
            .title("Ekibimiz")
            .initialValueTemplates([
              S.initialValueTemplateItem(ANA_AVUKAT_TEMPLATE_ID),
              S.initialValueTemplateItem("teamMember"),
            ])
        )
        .id("team-root"),
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
