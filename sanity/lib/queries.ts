import { groq } from "next-sanity";

// Ekibimiz (team members)
export const teamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    "name": coalesce(name[$locale], name.tr, name.en, name),
    "title": coalesce(title[$locale], title.tr, title.en, title),
    image,
    "shortDescription": coalesce(shortDescription[$locale], shortDescription.tr, shortDescription.en, shortDescription),
    linkToAbout
  }
`;

// Site Ayarları (workingHours locale'e göre değişir)
export const siteConfigQuery = groq`
  *[_type == "siteConfig"][0] {
    logo,
    name,
    title,
    description,
    "heroDescription": coalesce(heroDescription[$locale], heroDescription.tr, heroDescription.en),
    phone,
    email,
    address,
    "workingHours": coalesce(workingHours[$locale], workingHours.tr, workingHours.en, workingHours)
  }
`;

// Tüm Çalışma Alanları (field-level localization with fallback)
export const practiceAreasQuery = groq`
  *[_type == "practiceArea"] | order(order asc) {
    _id,
    "title": coalesce(title[$locale], title.tr, title.en, title),
    "slug": slug.current,
    image,
    "shortDescription": coalesce(shortDescription[$locale], shortDescription.tr, shortDescription.en, shortDescription),
    "description": coalesce(description[$locale], description.tr, description.en, description),
    "services": coalesce(services[$locale], services.tr, services.en, services)
  }
`;

// Tek Çalışma Alanı (field-level localization with fallback)
export const practiceAreaBySlugQuery = groq`
  *[_type == "practiceArea" && slug.current == $slug][0] {
    _id,
    "title": coalesce(title[$locale], title.tr, title.en, title),
    "slug": slug.current,
    image,
    "shortDescription": coalesce(shortDescription[$locale], shortDescription.tr, shortDescription.en, shortDescription),
    "description": coalesce(description[$locale], description.tr, description.en, description),
    "services": coalesce(services[$locale], services.tr, services.en, services)
  }
`;

// Tüm Blog Yazıları (field-level localization with fallback)
export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    "title": coalesce(title[$locale], title.tr, title.en, title),
    "slug": slug.current,
    "excerpt": coalesce(excerpt[$locale], excerpt.tr, excerpt.en, excerpt),
    "content": coalesce(content[$locale], content.tr, content.en, content),
    publishedAt,
    "category": coalesce(category[$locale], category.tr, category.en, category),
    readTime,
    mainImage
  }
`;

// Tek Blog Yazısı (field-level localization with fallback)
export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    "title": coalesce(title[$locale], title.tr, title.en, title),
    "slug": slug.current,
    "excerpt": coalesce(excerpt[$locale], excerpt.tr, excerpt.en, excerpt),
    "content": coalesce(content[$locale], content.tr, content.en, content),
    publishedAt,
    "category": coalesce(category[$locale], category.tr, category.en, category),
    readTime,
    mainImage
  }
`;

// SSS (field-level localization with fallback)
export const faqItemsQuery = groq`
  *[_type == "faq"] | order(order asc) {
    _id,
    "question": coalesce(question[$locale], question.tr, question.en, question),
    "answer": coalesce(answer[$locale], answer.tr, answer.en, answer)
  }
`;

// Hakkımızda (field-level localization)
export const aboutContentQuery = groq`
  *[_type == "about"][0] {
    "name": coalesce(name[$locale], name.tr, name.en, name),
    "title": coalesce(title[$locale], title.tr, title.en, title),
    "bio": coalesce(bio[$locale], bio.tr, bio.en, bio),
    image,
    "education": education[] {
      "degree": coalesce(degree[$locale], degree.tr, degree.en, degree),
      "school": coalesce(school[$locale], school.tr, school.en, school),
      year
    },
    "certifications": coalesce(certifications[$locale], certifications.tr, certifications.en, certifications),
    "values": values[] {
      "title": coalesce(title[$locale], title.tr, title.en, title),
      "description": coalesce(description[$locale], description.tr, description.en, description)
    }
  }
`;

// Hizmetler Intro (field-level localization with fallback)
export const practiceAreasIntroQuery = groq`
  *[_type == "practiceAreasIntro"][0] {
    "title": coalesce(title[$locale], title.tr, title.en, title),
    "description": coalesce(description[$locale], description.tr, description.en, description)
  }
`;

// Yasal İçerikler (field-level localization with fallback)
export const legalContentQuery = groq`
  *[_type == "legalContent"][0] {
    "termsOfUse": coalesce(termsOfUse[$locale], termsOfUse.tr, termsOfUse.en, termsOfUse),
    // Uyarı metinlerinde dil fallback'i istemiyoruz; her dil kendi uyarısını gösterir
    "termsOfUseWarning": termsOfUseWarning[$locale],
    "privacyNotice": coalesce(privacyNotice[$locale], privacyNotice.tr, privacyNotice.en, privacyNotice),
    "privacyNoticeWarning": privacyNoticeWarning[$locale],
    "cookiePolicy": coalesce(cookiePolicy[$locale], cookiePolicy.tr, cookiePolicy.en, cookiePolicy)
  }
`;
