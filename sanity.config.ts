import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";
import { structure } from "./sanity/structure";

// Sanity Project ID ve Dataset
const projectId = "a81gtm88";
const dataset = "production";

export default defineConfig({
  name: "ahmet-can-tonus-hukuk",
  title: "Ahmet Can Tonus Hukuk Bürosu",
  
  projectId,
  dataset,
  
  // basePath kaldırıldı - Studio artık Sanity'nin hosted Studio'sunda çalışacak
  // Studio'ya erişim: https://ahmet-can-tonus-hukuk.sanity.studio
  
  plugins: [
    structureTool({ structure }),
  ],
  
  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev,
      {
        id: "teamMember-ana-avukat",
        title: "Ana avukat (ilk kayıt)",
        schemaType: "teamMember",
        value: {
          name: {
            tr: "Av. Ahmet Can Tonus",
            en: "Ahmet Can Tonus, Attorney",
          },
          title: { tr: "Avukat", en: "Attorney" },
          shortDescription: {
            tr: "10+ yıllık deneyimiyle ticaret hukuku, şirketler hukuku ve sözleşmeler hukuku alanlarında uzman. Müvekkillerine güvenilir ve sonuç odaklı hukuki danışmanlık sunmaktadır.",
            en: "Expert in commercial law, corporate law and contract law with over 10 years of experience. Provides reliable and result-oriented legal consultancy to clients.",
          },
          order: 0,
          linkToAbout: true,
        },
      },
    ],
  },
});
