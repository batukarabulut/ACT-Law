import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = imageUrlBuilder(client);

export type SanityImageSource = { _type: string; asset?: { _ref: string } } | null | undefined;

export function urlFor(source: SanityImageSource) {
  if (!source?.asset?._ref) return null;
  return builder.image(source);
}

export type ImageOptimizeOptions = {
  width?: number;
  height?: number;
  quality?: number;
  format?: "webp" | "avif" | "jpg";
  fit?: "max" | "min" | "fill" | "crop";
};

/** Sanity'den gelen görsel için optimize URL döndürür (boyut, kalite, format). */
export function urlForOptimized(
  source: SanityImageSource,
  options: ImageOptimizeOptions = {}
): string | null {
  if (!source?.asset?._ref) return null;
  let img = builder.image(source);
  if (options.width != null) img = img.width(options.width);
  if (options.height != null) img = img.height(options.height);
  if (options.quality != null) img = img.quality(options.quality);
  // @sanity/image-url ImageFormat tipi "avif" içermiyor; runtime'da desteklenir
  if (options.format) img = img.format(options.format as Parameters<typeof img.format>[0]);
  if (options.fit) img = img.fit(options.fit);
  return img.url();
}

export const IMAGE_PRESETS = {
  /** Hakkımızda / profil fotoğrafı (kare, büyük) */
  about: { width: 800, quality: 85, format: "webp" as const, fit: "max" as const },
  /** Blog kartı (liste) */
  blogCard: { width: 600, quality: 75, format: "webp" as const, fit: "max" as const },
  /** Blog detay kapak */
  blogHero: { width: 1200, quality: 85, format: "webp" as const, fit: "max" as const },
  /** Çalışma alanı kartı */
  practiceCard: { width: 500, quality: 75, format: "webp" as const, fit: "max" as const },
  /** Çalışma alanı detay */
  practiceHero: { width: 800, quality: 80, format: "webp" as const, fit: "max" as const },
  /** Portable Text içi görsel */
  contentInline: { width: 900, quality: 80, format: "webp" as const, fit: "max" as const },
} as const;
