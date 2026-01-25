import { defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "Hakkımızda",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "İsim",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Ünvan",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Fotoğraf",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "bio",
      title: "Biyografi",
      type: "text",
      rows: 8,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "education",
      title: "Eğitim",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "degree", title: "Derece", type: "string" },
            { name: "school", title: "Okul", type: "string" },
            { name: "year", title: "Yıl", type: "string" },
          ],
          preview: {
            select: {
              title: "degree",
              subtitle: "school",
            },
          },
        },
      ],
    }),
    defineField({
      name: "certifications",
      title: "Sertifikalar",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "values",
      title: "Değerler",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Başlık", type: "string" },
            { name: "description", title: "Açıklama", type: "text", rows: 2 },
          ],
          preview: {
            select: {
              title: "title",
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
});
