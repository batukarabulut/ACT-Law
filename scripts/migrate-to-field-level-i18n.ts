/**
 * Migration Script: Document-level to Field-level Localization
 * 
 * Bu script, eski document-level localization yapısından
 * yeni field-level localization yapısına geçiş yapar.
 * 
 * Kullanım:
 * 1. .env dosyasına SANITY_WRITE_TOKEN ekleyin
 * 2. npm run migrate-i18n (veya tsx scripts/migrate-to-field-level-i18n.ts)
 */

import { createClient } from "@sanity/client";

// Sanity client
const client = createClient({
  projectId: "a81gtm88",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN, // Write token gerekli
  useCdn: false,
});

async function migrateDocument(doc: any, type: string) {
  const updates: any = {};

  // Eğer document zaten yeni formatta ise (title.tr varsa), atla
  if (doc.title?.tr || doc.title?.en) {
    console.log(`  ⏭️  ${type} ${doc._id} zaten yeni formatta, atlanıyor...`);
    return;
  }

  // Eğer document eski formatta ise (title string), dönüştür
  if (typeof doc.title === "string") {
    updates.title = {
      tr: doc.title,
      en: doc.title, // İngilizce için şimdilik aynı değeri kullan
    };
  }

  // FAQ için
  if (type === "faq") {
    if (typeof doc.question === "string") {
      updates.question = {
        tr: doc.question,
        en: doc.question,
      };
    }
    if (typeof doc.answer === "string") {
      updates.answer = {
        tr: doc.answer,
        en: doc.answer,
      };
    }
  }

  // Practice Area için
  if (type === "practiceArea") {
    if (typeof doc.shortDescription === "string") {
      updates.shortDescription = {
        tr: doc.shortDescription,
        en: doc.shortDescription,
      };
    }
    if (typeof doc.description === "string") {
      updates.description = {
        tr: doc.description,
        en: doc.description,
      };
    }
    if (Array.isArray(doc.services) && doc.services.length > 0 && typeof doc.services[0] === "string") {
      updates.services = {
        tr: doc.services,
        en: doc.services,
      };
    }
  }

  // Blog Post için
  if (type === "blogPost") {
    if (typeof doc.excerpt === "string") {
      updates.excerpt = {
        tr: doc.excerpt,
        en: doc.excerpt,
      };
    }
    if (Array.isArray(doc.content)) {
      updates.content = {
        tr: doc.content,
        en: doc.content,
      };
    }
  }

  // About için
  if (type === "about") {
    if (typeof doc.name === "string") {
      updates.name = {
        tr: doc.name,
        en: doc.name,
      };
    }
    if (typeof doc.title === "string") {
      updates.title = {
        tr: doc.title,
        en: doc.title,
      };
    }
    if (typeof doc.bio === "string") {
      updates.bio = {
        tr: doc.bio,
        en: doc.bio,
      };
    }
    if (Array.isArray(doc.education)) {
      updates.education = doc.education.map((edu: any) => ({
        ...edu,
        degree: typeof edu.degree === "string" ? { tr: edu.degree, en: edu.degree } : edu.degree,
        school: typeof edu.school === "string" ? { tr: edu.school, en: edu.school } : edu.school,
      }));
    }
    if (Array.isArray(doc.certifications) && doc.certifications.length > 0 && typeof doc.certifications[0] === "string") {
      updates.certifications = {
        tr: doc.certifications,
        en: doc.certifications,
      };
    }
    if (Array.isArray(doc.values)) {
      updates.values = doc.values.map((val: any) => ({
        ...val,
        title: typeof val.title === "string" ? { tr: val.title, en: val.title } : val.title,
        description: typeof val.description === "string" ? { tr: val.description, en: val.description } : val.description,
      }));
    }
  }

  // Practice Areas Intro için
  if (type === "practiceAreasIntro") {
    if (typeof doc.description === "string") {
      updates.description = {
        tr: doc.description,
        en: doc.description,
      };
    }
  }

  if (Object.keys(updates).length > 0) {
    try {
      await client.patch(doc._id).set(updates).commit();
      console.log(`  ✅ ${type} ${doc._id} güncellendi`);
    } catch (error) {
      console.error(`  ❌ ${type} ${doc._id} güncellenirken hata:`, error);
    }
  }
}

async function migrate() {
  console.log("🚀 Field-level localization migration başlıyor...\n");

  try {
    // FAQ
    console.log("📝 FAQ document'leri kontrol ediliyor...");
    const faqs = await client.fetch(`*[_type == "faq"]`);
    for (const faq of faqs) {
      await migrateDocument(faq, "faq");
    }
    console.log(`✅ ${faqs.length} FAQ document kontrol edildi\n`);

    // Practice Areas
    console.log("📝 Practice Area document'leri kontrol ediliyor...");
    const practiceAreas = await client.fetch(`*[_type == "practiceArea"]`);
    for (const area of practiceAreas) {
      await migrateDocument(area, "practiceArea");
    }
    console.log(`✅ ${practiceAreas.length} Practice Area document kontrol edildi\n`);

    // Blog Posts
    console.log("📝 Blog Post document'leri kontrol ediliyor...");
    const blogPosts = await client.fetch(`*[_type == "blogPost"]`);
    for (const post of blogPosts) {
      await migrateDocument(post, "blogPost");
    }
    console.log(`✅ ${blogPosts.length} Blog Post document kontrol edildi\n`);

    // About
    console.log("📝 About document'leri kontrol ediliyor...");
    const aboutDocs = await client.fetch(`*[_type == "about"]`);
    for (const about of aboutDocs) {
      await migrateDocument(about, "about");
    }
    console.log(`✅ ${aboutDocs.length} About document kontrol edildi\n`);

    // Practice Areas Intro
    console.log("📝 Practice Areas Intro document'leri kontrol ediliyor...");
    const introDocs = await client.fetch(`*[_type == "practiceAreasIntro"]`);
    for (const intro of introDocs) {
      await migrateDocument(intro, "practiceAreasIntro");
    }
    console.log(`✅ ${introDocs.length} Practice Areas Intro document kontrol edildi\n`);

    console.log("✅ Migration tamamlandı!");
  } catch (error) {
    console.error("❌ Migration sırasında hata:", error);
    process.exit(1);
  }
}

migrate();
