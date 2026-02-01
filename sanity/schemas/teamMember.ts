import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Ekibimiz / Team",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "İsim / Name",
      type: "object",
      fields: [
        { name: "tr", title: "Türkçe", type: "string", validation: (Rule) => Rule.required() },
        { name: "en", title: "English", type: "string", validation: (Rule) => Rule.required() },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Ünvan / Title",
      type: "object",
      fields: [
        { name: "tr", title: "Türkçe", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
    }),
    defineField({
      name: "image",
      title: "Fotoğraf",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "shortDescription",
      title: "Kısa Açıklama",
      type: "object",
      description: "Kartta görünecek kısa metin. Ayrı sayfa açmadan bu kişiyi tanıtır.",
      fields: [
        { name: "tr", title: "Türkçe", type: "text", rows: 4 },
        { name: "en", title: "English", type: "text", rows: 4 },
      ],
    }),
    defineField({
      name: "order",
      title: "Sıralama",
      type: "number",
      description: "Listede görünme sırası (küçük sayı önce)",
    }),
    defineField({
      name: "linkToAbout",
      title: "Hakkımızda sayfasına bağla",
      type: "boolean",
      description: "Açıksa kart tıklanınca Hakkımızda sayfasına gider (örn. ana avukat için)",
      initialValue: false,
    }),
  ],
  orderings: [
    { title: "Sıralama", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: {
      title: "name.tr",
      subtitle: "title.tr",
      media: "image",
    },
  },
});
