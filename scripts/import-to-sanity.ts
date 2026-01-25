import { createClient } from "@sanity/client";
import {
  siteConfig,
  practiceAreasIntro,
  practiceAreas,
  blogPosts,
  faqItems,
  aboutContent,
} from "../lib/data";

// Sanity client
const client = createClient({
  projectId: "a81gtm88",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN, // Write token gerekli
  useCdn: false,
});

async function importData() {
  console.log("🚀 Sanity'ye veri aktarımı başlıyor...\n");

  try {
    // 1. Site Ayarları
    console.log("📝 Site Ayarları ekleniyor...");
    await client.createOrReplace({
      _id: "siteConfig",
      _type: "siteConfig",
      name: siteConfig.name,
      title: siteConfig.title,
      description: siteConfig.description,
      phone: siteConfig.phone,
      email: siteConfig.email,
      address: siteConfig.address,
      workingHours: siteConfig.workingHours,
    });
    console.log("✅ Site Ayarları eklendi\n");

    // 2. Hizmetler Giriş Yazısı
    console.log("📝 Hizmetler Giriş Yazısı ekleniyor...");
    await client.createOrReplace({
      _id: "practiceAreasIntro",
      _type: "practiceAreasIntro",
      title: practiceAreasIntro.title,
      description: practiceAreasIntro.description,
    });
    console.log("✅ Hizmetler Giriş Yazısı eklendi\n");

    // 3. Çalışma Alanları
    console.log("📝 Çalışma Alanları ekleniyor...");
    for (let i = 0; i < practiceAreas.length; i++) {
      const area = practiceAreas[i];
      await client.createOrReplace({
        _id: `practiceArea-${area.slug}`,
        _type: "practiceArea",
        title: area.title,
        slug: { _type: "slug", current: area.slug },
        shortDescription: area.shortDescription,
        description: area.description,
        services: area.services,
        order: i + 1,
      });
      console.log(`  ✓ ${area.title}`);
    }
    console.log("✅ Çalışma Alanları eklendi\n");

    // 4. Blog Yazıları
    console.log("📝 Blog Yazıları ekleniyor...");
    for (const post of blogPosts) {
      await client.createOrReplace({
        _id: `blogPost-${post.slug}`,
        _type: "blogPost",
        title: post.title,
        slug: { _type: "slug", current: post.slug },
        excerpt: post.excerpt,
        content: [
          {
            _type: "block",
            _key: `block-${Date.now()}`,
            style: "normal",
            markDefs: [],
            children: [
              {
                _type: "span",
                _key: `span-${Date.now()}`,
                text: post.content,
                marks: [],
              },
            ],
          },
        ],
        category: post.category,
        readTime: post.readTime,
        publishedAt: new Date(post.date).toISOString(),
      });
      console.log(`  ✓ ${post.title}`);
    }
    console.log("✅ Blog Yazıları eklendi\n");

    // 5. SSS
    console.log("📝 Sık Sorulan Sorular ekleniyor...");
    for (let i = 0; i < faqItems.length; i++) {
      const faq = faqItems[i];
      await client.createOrReplace({
        _id: `faq-${i + 1}`,
        _type: "faq",
        question: faq.question,
        answer: faq.answer,
        order: i + 1,
      });
      console.log(`  ✓ ${faq.question.substring(0, 40)}...`);
    }
    console.log("✅ SSS eklendi\n");

    // 6. Hakkımızda
    console.log("📝 Hakkımızda ekleniyor...");
    await client.createOrReplace({
      _id: "about",
      _type: "about",
      name: aboutContent.name,
      title: aboutContent.title,
      bio: aboutContent.bio,
      education: aboutContent.education.map((edu, i) => ({
        _key: `edu-${i}`,
        degree: edu.degree,
        school: edu.school,
        year: edu.year,
      })),
      certifications: aboutContent.certifications,
      values: aboutContent.values.map((val, i) => ({
        _key: `val-${i}`,
        title: val.title,
        description: val.description,
      })),
    });
    console.log("✅ Hakkımızda eklendi\n");

    console.log("🎉 Tüm veriler başarıyla aktarıldı!");
  } catch (error) {
    console.error("❌ Hata:", error);
  }
}

importData();
