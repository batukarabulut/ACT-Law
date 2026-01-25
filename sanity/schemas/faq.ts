import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "Sık Sorulan Sorular",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Soru",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Cevap",
      type: "text",
      rows: 4,
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
      title: "question",
    },
  },
});
