import { Link } from "@/i18n/navigation";
import { getSiteConfig } from "@/sanity/lib/fetch";
import { getTranslations, getLocale } from "next-intl/server";

export default async function Footer() {
  const locale = await getLocale();
  const siteConfig = await getSiteConfig(locale);
  const t = await getTranslations("footer");

  const hizmetler = [
    { href: "/calisma-alanlari/ticaret-hukuku", key: "ticaretHukuku" },
    { href: "/calisma-alanlari/sirketler-hukuku", key: "sirketlerHukuku" },
    { href: "/calisma-alanlari/aile-hukuku", key: "aileHukuku" },
    { href: "/calisma-alanlari/miras-hukuku", key: "mirasHukuku" },
    { href: "/calisma-alanlari/is-hukuku", key: "isHukuku" },
    { href: "/calisma-alanlari", key: "allServices" },
  ];

  const sayfalar = [
    { href: "/hakkimizda", key: "about" },
    { href: "/calisma-alanlari", key: "servicesLink" },
    { href: "/blog", key: "blog" },
    { href: "/sss", key: "faq" },
    { href: "/iletisim", key: "contact" },
  ];

  const yasal = [
    { href: "/kullanim-kosullari", key: "terms" },
    { href: "/cerez-politikasi", key: "cookie" },
    { href: "/aydinlatma-metni", key: "aydinlatma" },
    { href: "/yasal-uyari", key: "disclaimerPage" },
  ];

  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div>
            <Link href="/" className="inline-block">
              <div className="flex flex-col">
                <span className="text-xl font-serif font-semibold text-white tracking-tight">{siteConfig.name}</span>
                <span className="text-[10px] text-gray-500 tracking-[0.3em] uppercase">{t("lawFirm")}</span>
              </div>
            </Link>
            <p className="mt-5 text-sm text-gray-400 leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-medium tracking-wider uppercase text-[#10b981] mb-5">
              {t("services")}
            </h4>
            <ul className="space-y-3">
              {hizmetler.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium tracking-wider uppercase text-[#10b981] mb-5">
              {t("pages")}
            </h4>
            <ul className="space-y-3">
              {sayfalar.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-xs font-medium tracking-wider uppercase text-[#10b981] mb-5 mt-8">
              {t("legal")}
            </h4>
            <ul className="space-y-3">
              {yasal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium tracking-wider uppercase text-[#10b981] mb-5">
              {t("contact")}
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-[#10b981] transition-colors">
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-[#10b981] transition-colors">
                  {siteConfig.email}
                </a>
              </li>
              <li>{siteConfig.address}</li>
              <li className="text-gray-500">{siteConfig.workingHours}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-row flex-wrap justify-between items-center gap-3">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} {siteConfig.name}. {t("allRights")}
          </p>
          <p className="text-gray-500 text-[11px]">
            <Link
              href="/yasal-uyari"
              className="text-gray-400 hover:text-[#10b981] transition-colors underline underline-offset-2"
            >
              {t("disclaimer")}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
