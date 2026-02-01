import { defineField, defineType } from "sanity";

export const practiceArea = defineType({
  name: "practiceArea",
  title: "Çalışma Alanları / Practice Areas",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Başlık / Title",
      type: "object",
      fields: [
        { name: "tr", title: "Türkçe", type: "string", validation: (Rule) => Rule.required() },
        { name: "en", title: "English", type: "string", validation: (Rule) => Rule.required() },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      options: {
        source: "title.tr",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Görsel / Image",
      type: "image",
      description: "Bu çalışma alanı için kapak görseli. Liste ve detay sayfalarında kullanılır.",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "shortDescription",
      title: "Kısa Açıklama / Short Description",
      type: "object",
      fields: [
        { name: "tr", title: "Türkçe", type: "text", rows: 2 },
        { name: "en", title: "English", type: "text", rows: 2 },
      ],
      description: "Ana sayfada görünecek kısa açıklama",
    }),
    defineField({
      name: "description",
      title: "Detaylı Açıklama / Description",
      type: "object",
      fields: [
        { name: "tr", title: "Türkçe", type: "text", rows: 5, validation: (Rule) => Rule.required() },
        { name: "en", title: "English", type: "text", rows: 5, validation: (Rule) => Rule.required() },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "services",
      title: "Alt Hizmetler / Services",
      type: "object",
      fields: [
        { 
          name: "tr", 
          title: "Türkçe", 
          type: "array", 
          of: [{ type: "string" }],
          description: "Bu alandaki spesifik hizmetler (Türkçe)"
        },
        { 
          name: "en", 
          title: "English", 
          type: "array", 
          of: [{ type: "string" }],
          description: "Bu alandaki spesifik hizmetler (English)"
        },
      ],
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
      title: "title.tr",
      subtitle: "title.en",
      media: "image",
    },
  },
});
