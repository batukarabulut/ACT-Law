import Link from "next/link";
import { getSiteConfig } from "@/sanity/lib/fetch";

const footerLinks = {
  hizmetler: [
    { href: "/calisma-alanlari/ticaret-hukuku", label: "Ticaret Hukuku" },
    { href: "/calisma-alanlari/sirketler-hukuku", label: "Şirketler Hukuku" },
    { href: "/calisma-alanlari/aile-hukuku", label: "Aile Hukuku" },
    { href: "/calisma-alanlari/miras-hukuku", label: "Miras Hukuku" },
    { href: "/calisma-alanlari/is-hukuku", label: "İş Hukuku" },
    { href: "/calisma-alanlari", label: "Tüm Hizmetler →" },
  ],
  sayfalar: [
    { href: "/hakkimizda", label: "Hakkımızda" },
    { href: "/calisma-alanlari", label: "Hizmetlerimiz" },
    { href: "/blog", label: "Blog" },
    { href: "/sss", label: "S.S.S" },
    { href: "/iletisim", label: "İletişim" },
  ],
  yasal: [
    { href: "/kullanim-kosullari", label: "Kullanım Koşulları" },
    { href: "/cerez-politikasi", label: "Çerez Politikası" },
    { href: "/aydinlatma-metni", label: "Aydınlatma Metni" },
  ],
};

export default async function Footer() {
  const siteConfig = await getSiteConfig();

  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <div className="flex flex-col">
                <span className="text-xl font-serif font-semibold text-white tracking-tight">{siteConfig.name}</span>
                <span className="text-[10px] text-gray-500 tracking-[0.3em] uppercase">Hukuk Bürosu</span>
              </div>
            </Link>
            <p className="mt-5 text-sm text-gray-400 leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          {/* Hizmetler */}
          <div>
            <h4 className="text-xs font-medium tracking-wider uppercase text-[#10b981] mb-5">
              Hizmetlerimiz
            </h4>
            <ul className="space-y-3">
              {footerLinks.hizmetler.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sayfalar */}
          <div>
            <h4 className="text-xs font-medium tracking-wider uppercase text-[#10b981] mb-5">
              Sayfalar
            </h4>
            <ul className="space-y-3">
              {footerLinks.sayfalar.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Yasal */}
            <h4 className="text-xs font-medium tracking-wider uppercase text-[#10b981] mb-5 mt-8">
              Yasal
            </h4>
            <ul className="space-y-3">
              {footerLinks.yasal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="text-xs font-medium tracking-wider uppercase text-[#10b981] mb-5">
              İletişim
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

      {/* Bottom */}
      <div className="border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} {siteConfig.name}. Tüm hakları saklıdır.
            </p>
            <p className="text-gray-600 text-xs">
              Bu site bilgilendirme amaçlıdır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
