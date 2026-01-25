import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  // Development'ta CDN kapalı, production'da açık
  useCdn: false, // Güncellemeleri hemen görmek için CDN kapalı
  // Alternatif: useCdn: process.env.NODE_ENV === "production",
});

// Sanity fetch için varsayılan ayarlar
export const fetchOptions = {
  // Development'ta cache kapalı
  cache: "no-store" as const,
  // Alternatif: Her 60 saniyede bir revalidate
  // next: { revalidate: 60 },
};
