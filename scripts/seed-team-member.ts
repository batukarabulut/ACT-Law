/**
 * Mevcut avukat (Ahmet Can Tonus) bilgisini Sanity'de oluşturur.
 * Böylece Ekibimiz sayfasındaki veriler Studio'dan düzenlenebilir.
 *
 * Çalıştırmak için:
 *   SANITY_WRITE_TOKEN=xxx npx tsx scripts/seed-team-member.ts
 *
 * Token: https://www.sanity.io/manage → Project → API → Tokens → Add API token (Editor)
 */
import { createClient } from "next-sanity";

const client = createClient({
  projectId: "a81gtm88",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const TEAM_MEMBER_ID = "team-ahmet-can-tonus";

const defaultTeamMember = {
  _id: TEAM_MEMBER_ID,
  _type: "teamMember" as const,
  name: {
    tr: "Av. Ahmet Can Tonus",
    en: "Ahmet Can Tonus, Attorney",
  },
  title: {
    tr: "Avukat",
    en: "Attorney",
  },
  shortDescription: {
    tr: "10+ yıllık deneyimiyle ticaret hukuku, şirketler hukuku ve sözleşmeler hukuku alanlarında uzman. Müvekkillerine güvenilir ve sonuç odaklı hukuki danışmanlık sunmaktadır.",
    en: "Expert in commercial law, corporate law and contract law with over 10 years of experience. Provides reliable and result-oriented legal consultancy to clients.",
  },
  order: 0,
  linkToAbout: true,
};

async function seedTeamMember() {
  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error("❌ SANITY_WRITE_TOKEN ortam değişkeni gerekli.");
    console.log("   https://www.sanity.io/manage → Project → API → Tokens");
    process.exit(1);
  }

  console.log("🚀 Mevcut avukat bilgisi Sanity'ye ekleniyor...\n");

  try {
    await client.createOrReplace(defaultTeamMember);
    console.log("✅ Ahmet Can Tonus kaydı oluşturuldu/güncellendi.");
    console.log("   Sanity Studio'da 'Ekibimiz / Team' bölümünden görüntüleyip düzenleyebilirsiniz.\n");
  } catch (err) {
    console.error("❌ Hata:", err);
    process.exit(1);
  }
}

seedTeamMember();
