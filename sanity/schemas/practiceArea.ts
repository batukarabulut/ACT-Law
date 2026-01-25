import { defineField, defineType } from "sanity";

export const practiceArea = defineType({
  name: "practiceArea",
  title: "Çalışma Alanları",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Başlık",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Kısa Açıklama",
      type: "text",
      rows: 2,
      description: "Ana sayfada görünecek kısa açıklama",
    }),
    defineField({
      name: "description",
      title: "Detaylı Açıklama",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "services",
      title: "Alt Hizmetler",
      type: "array",
      of: [{ type: "string" }],
      description: "Bu alandaki spesifik hizmetler",
    }),
    defineField({
      name: "order",
      title: "Sıralama",
      type: "number",
      description: "Listelemede görünme sırası (küçük sayı önce)",
    }),
  ],
  orderings: [
    {
      title: "Sıralama",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "shortDescription",
    },
  },
});
