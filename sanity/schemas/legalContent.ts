import { defineField, defineType } from "sanity";

// Custom block type for warning boxes
export const warningBox = defineType({
  name: "warningBox",
  title: "Uyarı Kutusu / Warning Box",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Başlık / Title",
      type: "string",
    },
    {
      name: "content",
      title: "İçerik / Content",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});

export const legalContent = defineType({
  name: "legalContent",
  title: "Yasal İçerikler / Legal Content",
  type: "document",
  fields: [
    defineField({
      name: "termsOfUse",
      title: "Kullanım Koşulları / Terms of Use",
      type: "object",
      fields: [
        {
          name: "tr",
          title: "Türkçe",
          type: "array",
          of: [{ type: "block" }],
        },
        {
          name: "en",
          title: "English",
          type: "array",
          of: [{ type: "block" }],
        },
      ],
    }),
    defineField({
      name: "termsOfUseWarning",
      title: "Kullanım Koşulları Uyarısı / Terms Warning",
      type: "object",
      fields: [
        {
          name: "tr",
          title: "Türkçe Uyarı Metni",
          type: "text",
          rows: 5,
        },
        {
          name: "en",
          title: "English Warning Text",
          type: "text",
          rows: 5,
        },
      ],
    }),
    defineField({
      name: "privacyNotice",
      title: "Aydınlatma Metni / Privacy Notice",
      type: "object",
      fields: [
        {
          name: "tr",
          title: "Türkçe",
          type: "array",
          of: [{ type: "block" }],
        },
        {
          name: "en",
          title: "English",
          type: "array",
          of: [{ type: "block" }],
        },
      ],
    }),
    defineField({
      name: "privacyNoticeWarning",
      title: "Aydınlatma Metni Uyarısı / Privacy Warning",
      type: "object",
      fields: [
        {
          name: "tr",
          title: "Türkçe Uyarı Metni",
          type: "text",
          rows: 5,
        },
        {
          name: "en",
          title: "English Warning Text",
          type: "text",
          rows: 5,
        },
      ],
    }),
    defineField({
      name: "cookiePolicy",
      title: "Çerez Politikası / Cookie Policy",
      type: "object",
      fields: [
        {
          name: "tr",
          title: "Türkçe",
          type: "array",
          of: [
            { type: "block" },
            { type: "warningBox" },
          ],
        },
        {
          name: "en",
          title: "English",
          type: "array",
          of: [
            { type: "block" },
            { type: "warningBox" },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare() {
      return {
        title: "Yasal İçerikler",
      };
    },
  },
});
