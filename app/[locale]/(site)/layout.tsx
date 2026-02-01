import { getLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import PageTopBand from "@/components/PageTopBand";
import { getSiteConfig } from "@/sanity/lib/fetch";
import { urlForOptimized } from "@/sanity/lib/image";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const siteConfig = await getSiteConfig(locale);
  const sanityLogoUrl =
    siteConfig.logo && siteConfig.logo.asset?._ref
      ? urlForOptimized(siteConfig.logo, { width: 280, quality: 90, format: "webp" })
      : null;
  const logoUrl = sanityLogoUrl ?? "/logo.png";

  return (
    <>
      <Navbar logoUrl={logoUrl} siteName={siteConfig.name} />
      <main className="pt-20">
        <PageTopBand />
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
