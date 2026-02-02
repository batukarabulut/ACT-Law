import SanityImage from "@/components/SanityImage";
import type { SanityImageSource } from "@/sanity/lib/image";

type PageHeroProps = {
  navLabel: string;
  title: string;
  subtitle?: string;
  heroImage?: SanityImageSource | null;
};

export default function PageHero({ navLabel, title, subtitle, heroImage }: PageHeroProps) {
  const hasHeroImage = !!(heroImage?.asset?._ref);

  return (
    <section className="relative -mt-20 min-h-[60vh] flex flex-col justify-end pt-20 pb-16 lg:pt-28 lg:pb-24 overflow-hidden">
      {hasHeroImage ? (
        <>
          <div className="absolute inset-0 z-0">
            <SanityImage
              image={heroImage}
              alt=""
              preset="blogHero"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
          <div
            className="absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-black/60 to-black/30"
            aria-hidden="true"
          />
        </>
      ) : (
        <div
          className="absolute inset-0 z-0 bg-gradient-to-b from-[#1e1e1e] to-[#141414]"
          aria-hidden="true"
        />
      )}

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <p className="text-[11px] tracking-[0.2em] uppercase text-[#10b981] mb-3">{navLabel}</p>
        <div className="w-12 h-px bg-[#10b981]/60 mb-6" aria-hidden="true" />
        <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight">{title}</h1>
        {subtitle ? (
          <p className="mt-4 text-xl text-gray-400 max-w-3xl">{subtitle}</p>
        ) : null}
      </div>
    </section>
  );
}
