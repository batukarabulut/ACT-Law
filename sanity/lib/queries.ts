import { groq } from "next-sanity";

// Site Ayarları
export const siteConfigQuery = groq`
  *[_type == "siteConfig"][0] {
    name,
    title,
    description,
    phone,
    email,
    address,
    workingHours
  }
`;

// Tüm Çalışma Alanları
export const practiceAreasQuery = groq`
  *[_type == "practiceArea"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    description,
    services
  }
`;

// Tek Çalışma Alanı
export const practiceAreaBySlugQuery = groq`
  *[_type == "practiceArea" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    description,
    services
  }
`;

// Tüm Blog Yazıları
export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    content,
    publishedAt,
    category,
    readTime,
    mainImage
  }
`;

// Tek Blog Yazısı
export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    content,
    publishedAt,
    category,
    readTime,
    mainImage
  }
`;

// SSS
export const faqItemsQuery = groq`
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer
  }
`;

// Hakkımızda
export const aboutContentQuery = groq`
  *[_type == "about"][0] {
    name,
    title,
    bio,
    image,
    education[] {
      degree,
      school,
      year
    },
    certifications,
    values[] {
      title,
      description
    }
  }
`;

// Hizmetler Intro
export const practiceAreasIntroQuery = groq`
  *[_type == "practiceAreasIntro"][0] {
    title,
    description
  }
`;
