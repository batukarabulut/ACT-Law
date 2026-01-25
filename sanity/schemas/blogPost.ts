import { defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Yazıları",
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
      name: "excerpt",
      title: "Özet",
      type: "text",
      rows: 3,
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
      title: "İçerik",
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
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "string",
      options: {
        list: [
          { title: "Ticaret Hukuku", value: "Ticaret Hukuku" },
          { title: "Şirketler Hukuku", value: "Şirketler Hukuku" },
          { title: "Sözleşmeler Hukuku", value: "Sözleşmeler Hukuku" },
          { title: "Aile Hukuku", value: "Aile Hukuku" },
          { title: "Miras Hukuku", value: "Miras Hukuku" },
          { title: "Borçlar Hukuku", value: "Borçlar Hukuku" },
          { title: "İcra ve İflas Hukuku", value: "İcra ve İflas Hukuku" },
          { title: "Gayrimenkul Hukuku", value: "Gayrimenkul Hukuku" },
          { title: "İş Hukuku", value: "İş Hukuku" },
          { title: "Genel", value: "Genel" },
        ],
      },
    }),
    defineField({
      name: "readTime",
      title: "Okuma Süresi",
      type: "string",
      description: "Örn: 5 dk",
    }),
    defineField({
      name: "publishedAt",
      title: "Yayın Tarihi",
      type: "datetime",
      validation: (Rule) => Rule.required(),
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
      title: "title",
      media: "mainImage",
      date: "publishedAt",
    },
    prepare({ title, media, date }) {
      return {
        title,
        media,
        subtitle: date ? new Date(date).toLocaleDateString("tr-TR") : "",
      };
    },
  },
});
