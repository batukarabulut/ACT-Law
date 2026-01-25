import { client, fetchOptions } from "./client";
import {
  siteConfigQuery,
  practiceAreasQuery,
  practiceAreaBySlugQuery,
  blogPostsQuery,
  blogPostBySlugQuery,
  faqItemsQuery,
  aboutContentQuery,
  practiceAreasIntroQuery,
} from "./queries";
import {
  siteConfig as staticSiteConfig,
  practiceAreas as staticPracticeAreas,
  practiceAreasIntro as staticPracticeAreasIntro,
  blogPosts as staticBlogPosts,
  faqItems as staticFaqItems,
  aboutContent as staticAboutContent,
} from "@/lib/data";

// Sanity yapılandırılmış mı kontrol et
const isSanityConfigured = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

// Types
export type SiteConfig = typeof staticSiteConfig;
export type PracticeArea = (typeof staticPracticeAreas)[number];
export type PracticeAreasIntro = typeof staticPracticeAreasIntro;
export type BlogPost = (typeof staticBlogPosts)[number];
export type FaqItem = (typeof staticFaqItems)[number];
export type AboutContent = typeof staticAboutContent;

// Site Ayarları
export async function getSiteConfig(): Promise<SiteConfig> {
  if (!isSanityConfigured) return staticSiteConfig;
  
  try {
    const data = await client.fetch(siteConfigQuery, {}, fetchOptions);
    return data || staticSiteConfig;
  } catch {
    return staticSiteConfig;
  }
}

// Tüm Çalışma Alanları
export async function getPracticeAreas(): Promise<PracticeArea[]> {
  if (!isSanityConfigured) return staticPracticeAreas;
  
  try {
    const data = await client.fetch(practiceAreasQuery, {}, fetchOptions);
    return data?.length ? data : staticPracticeAreas;
  } catch {
    return staticPracticeAreas;
  }
}

// Tek Çalışma Alanı
export async function getPracticeAreaBySlug(slug: string): Promise<PracticeArea | null> {
  if (!isSanityConfigured) {
    return staticPracticeAreas.find((area) => area.slug === slug) || null;
  }
  
  try {
    const data = await client.fetch(practiceAreaBySlugQuery, { slug }, fetchOptions);
    if (data) return data;
    return staticPracticeAreas.find((area) => area.slug === slug) || null;
  } catch {
    return staticPracticeAreas.find((area) => area.slug === slug) || null;
  }
}

// Hizmetler Giriş Yazısı
export async function getPracticeAreasIntro(): Promise<PracticeAreasIntro> {
  if (!isSanityConfigured) return staticPracticeAreasIntro;
  
  try {
    const data = await client.fetch(practiceAreasIntroQuery, {}, fetchOptions);
    return data || staticPracticeAreasIntro;
  } catch {
    return staticPracticeAreasIntro;
  }
}

// Tüm Blog Yazıları
export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!isSanityConfigured) return staticBlogPosts;
  
  try {
    const data = await client.fetch(blogPostsQuery, {}, fetchOptions);
    return data?.length ? data : staticBlogPosts;
  } catch {
    return staticBlogPosts;
  }
}

// Tek Blog Yazısı
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSanityConfigured) {
    return staticBlogPosts.find((post) => post.slug === slug) || null;
  }
  
  try {
    const data = await client.fetch(blogPostBySlugQuery, { slug }, fetchOptions);
    if (data) return data;
    return staticBlogPosts.find((post) => post.slug === slug) || null;
  } catch {
    return staticBlogPosts.find((post) => post.slug === slug) || null;
  }
}

// SSS
export async function getFaqItems(): Promise<FaqItem[]> {
  if (!isSanityConfigured) return staticFaqItems;
  
  try {
    const data = await client.fetch(faqItemsQuery, {}, fetchOptions);
    return data?.length ? data : staticFaqItems;
  } catch {
    return staticFaqItems;
  }
}

// Hakkımızda
export async function getAboutContent(): Promise<AboutContent> {
  if (!isSanityConfigured) return staticAboutContent;
  
  try {
    const data = await client.fetch(aboutContentQuery, {}, fetchOptions);
    return data || staticAboutContent;
  } catch {
    return staticAboutContent;
  }
}
