import Image from "next/image";
import {
  urlForOptimized,
  IMAGE_PRESETS,
  type SanityImageSource,
  type ImageOptimizeOptions,
} from "@/sanity/lib/image";

type PresetKey = keyof typeof IMAGE_PRESETS;

type SanityImageProps = {
  /** Sanity'den gelen görsel referansı */
  image: SanityImageSource;
  alt: string;
  /** Preset kullan (about, blogCard, blogHero, practiceCard, practiceHero, contentInline) */
  preset?: PresetKey;
  /** Preset yerine özel boyut/kalite (preset ile birlikte kullanılırsa override eder) */
  options?: ImageOptimizeOptions;
  /** Görsel yoksa gösterilecek fallback (örn. /avukat.jpg) */
  fallbackSrc?: string;
  /** next/image fill modu (responsive container içinde) */
  fill?: boolean;
  /** fill=false iken genişlik */
  width?: number;
  /** fill=false iken yükseklik */
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export default function SanityImage({
  image,
  alt,
  preset,
  options: customOptions,
  fallbackSrc,
  fill = false,
  width,
  height,
  className,
  sizes,
  priority,
}: SanityImageProps) {
  const opts = preset ? { ...IMAGE_PRESETS[preset], ...customOptions } : customOptions || {};
  const src = urlForOptimized(image, opts);

  if (!src) {
    if (fallbackSrc) {
      return (
        <Image
          src={fallbackSrc}
          alt={alt}
          fill={fill}
          width={fill ? undefined : width ?? 800}
          height={fill ? undefined : height ?? 600}
          className={className}
          sizes={sizes}
          priority={priority}
        />
      );
    }
    return (
      <div
        className={className}
        style={
          fill
            ? { position: "absolute", inset: 0, backgroundColor: "var(--fallback-bg, #f2f2f2)" }
            : {
                width: width ?? 800,
                height: height ?? 200,
                backgroundColor: "var(--fallback-bg, #f2f2f2)",
              }
        }
        aria-hidden
      />
    );
  }

  const presetDims = preset ? IMAGE_PRESETS[preset] : null;
  const presetWidth = presetDims && "width" in presetDims ? (presetDims as { width: number }).width : undefined;
  const w: number = width ?? customOptions?.width ?? presetWidth ?? 800;
  const h: number = height ?? customOptions?.height ?? 600;

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={fill ? undefined : w}
      height={fill ? undefined : h}
      className={className}
      sizes={sizes}
      priority={priority}
    />
  );
}
