import { defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "Hakkımızda / About",
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
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "bio",
      title: "Biyografi / Biography",
      type: "object",
      fields: [
        { name: "tr", title: "Türkçe", type: "text", rows: 8, validation: (Rule) => Rule.required() },
        { name: "en", title: "English", type: "text", rows: 8, validation: (Rule) => Rule.required() },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "education",
      title: "Eğitim / Education",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { 
              name: "degree", 
              title: "Derece / Degree", 
              type: "object",
              fields: [
                { name: "tr", title: "Türkçe", type: "string" },
                { name: "en", title: "English", type: "string" },
              ],
            },
            { 
              name: "school", 
              title: "Okul / School", 
              type: "object",
              fields: [
                { name: "tr", title: "Türkçe", type: "string" },
                { name: "en", title: "English", type: "string" },
              ],
            },
            { name: "year", title: "Yıl / Year", type: "string" },
          ],
          preview: {
            select: {
              title: "degree.tr",
              subtitle: "school.tr",
            },
          },
        },
      ],
    }),
    defineField({
      name: "certifications",
      title: "Sertifikalar / Certifications",
      type: "object",
      fields: [
        { 
          name: "tr", 
          title: "Türkçe", 
          type: "array", 
          of: [{ type: "string" }] 
        },
        { 
          name: "en", 
          title: "English", 
          type: "array", 
          of: [{ type: "string" }] 
        },
      ],
    }),
    defineField({
      name: "values",
      title: "Değerler / Values",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { 
              name: "title", 
              title: "Başlık / Title", 
              type: "object",
              fields: [
                { name: "tr", title: "Türkçe", type: "string" },
                { name: "en", title: "English", type: "string" },
              ],
            },
            { 
              name: "description", 
              title: "Açıklama / Description", 
              type: "object",
              fields: [
                { name: "tr", title: "Türkçe", type: "text", rows: 2 },
                { name: "en", title: "English", type: "text", rows: 2 },
              ],
            },
          ],
          preview: {
            select: {
              title: "title.tr",
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
