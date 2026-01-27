import { defineField, defineType } from "sanity";

export const practiceAreasIntro = defineType({
  name: "practiceAreasIntro",
  title: "Hizmetler Giriş Yazısı / Practice Areas Intro",
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
      name: "description",
      title: "Açıklama / Description",
      type: "object",
      fields: [
        { name: "tr", title: "Türkçe", type: "text", rows: 4, validation: (Rule) => Rule.required() },
        { name: "en", title: "English", type: "text", rows: 4, validation: (Rule) => Rule.required() },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title.tr",
      subtitle: "title.en",
    },
  },
});
