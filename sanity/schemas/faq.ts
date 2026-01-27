import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "Sık Sorulan Sorular / FAQ",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Soru / Question",
      type: "object",
      fields: [
        { name: "tr", title: "Türkçe", type: "string", validation: (Rule) => Rule.required() },
        { name: "en", title: "English", type: "string", validation: (Rule) => Rule.required() },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Cevap / Answer",
      type: "object",
      fields: [
        { name: "tr", title: "Türkçe", type: "text", rows: 4, validation: (Rule) => Rule.required() },
        { name: "en", title: "English", type: "text", rows: 4, validation: (Rule) => Rule.required() },
      ],
      validation: (Rule) => Rule.required(),
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
      title: "question.tr",
      subtitle: "question.en",
    },
  },
});
