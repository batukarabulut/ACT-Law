import { defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Yazıları / Blog Posts",
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
      name: "excerpt",
      title: "Özet / Excerpt",
      type: "object",
      fields: [
        { name: "tr", title: "Türkçe", type: "text", rows: 3 },
        { name: "en", title: "English", type: "text", rows: 3 },
      ],
      description: "Listelerde görünecek kısa özet",
    }),
    defineField({
      name: "mainImage",
      title: "Kapak Görseli",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "content",
      title: "İçerik / Content",
      type: "object",
      fields: [
        {
          name: "tr",
          title: "Türkçe",
          type: "array",
          of: [
            {
              type: "block",
              styles: [
                { title: "Normal", value: "normal" },
                { title: "H2", value: "h2" },
                { title: "H3", value: "h3" },
                { title: "H4", value: "h4" },
                { title: "Alıntı", value: "blockquote" },
              ],
              marks: {
                decorators: [
                  { title: "Kalın", value: "strong" },
                  { title: "İtalik", value: "em" },
                  { title: "Altı Çizili", value: "underline" },
                ],
              },
            },
            {
              type: "image",
              options: { hotspot: true },
            },
          ],
          validation: (Rule) => Rule.required(),
        },
        {
          name: "en",
          title: "English",
          type: "array",
          of: [
            {
              type: "block",
              styles: [
                { title: "Normal", value: "normal" },
                { title: "H2", value: "h2" },
                { title: "H3", value: "h3" },
                { title: "H4", value: "h4" },
                { title: "Quote", value: "blockquote" },
              ],
              marks: {
                decorators: [
                  { title: "Bold", value: "strong" },
                  { title: "Italic", value: "em" },
                  { title: "Underline", value: "underline" },
                ],
              },
            },
            {
              type: "image",
              options: { hotspot: true },
            },
          ],
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategori / Category",
      type: "object",
      fields: [
        { name: "tr", title: "Türkçe", type: "string", validation: (Rule) => Rule.required() },
        { name: "en", title: "English", type: "string", validation: (Rule) => Rule.required() },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Okuma Süresi / Read Time",
      type: "object",
      description: "TR: örn. 5 dk — EN: e.g. 5 min",
      fields: [
        { name: "tr", title: "Türkçe", type: "string", placeholder: "5 dk" },
        { name: "en", title: "English", type: "string", placeholder: "5 min" },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Yayın Tarihi",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authorName",
      title: "Yazar adı",
      type: "string",
      description: "Yazıyı yazan kişinin adı. Boş bırakılırsa site sahibi gösterilir.",
    }),
    defineField({
      name: "authorTitle",
      title: "Yazar ünvanı",
      type: "string",
      description: "Örn: Avukat, Av. ...",
    }),
    defineField({
      name: "authorImage",
      title: "Yazar fotoğrafı",
      type: "image",
      description: "İsteğe bağlı.",
      options: { hotspot: true },
    }),
  ],
  orderings: [
    {
      title: "Yayın Tarihi (Yeni)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title.tr",
      titleEn: "title.en",
      media: "mainImage",
      date: "publishedAt",
    },
    prepare({ title, titleEn, media, date }) {
      return {
        title: title || titleEn,
        media,
        subtitle: date ? new Date(date).toLocaleDateString("tr-TR") : "",
      };
    },
  },
});
