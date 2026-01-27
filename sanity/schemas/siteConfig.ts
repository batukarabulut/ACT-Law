import { defineField, defineType } from "sanity";

export const siteConfig = defineType({
  name: "siteConfig",
  title: "Site Ayarları",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Avukat Adı",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Site Başlığı",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Site Açıklaması",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "phone",
      title: "Telefon",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "E-posta",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "address",
      title: "Adres",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "workingHours",
      title: "Çalışma Saatleri / Working Hours",
      type: "object",
      fields: [
        { name: "tr", title: "Türkçe", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
