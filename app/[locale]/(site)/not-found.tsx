import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-gray-50">
      <div className="max-w-xl mx-auto px-4 text-center">
        <p className="text-8xl font-serif font-bold text-gray-200">404</p>
        <h1 className="mt-4 text-3xl font-serif font-semibold text-gray-900">
          {t("title")}
        </h1>
        <p className="mt-4 text-gray-600">
          {t("desc")}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-4 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
          >
            {t("home")}
          </Link>
          <Link
            href="/iletisim"
            className="px-8 py-4 border-2 border-gray-900 text-gray-900 font-medium hover:bg-gray-900 hover:text-white transition-all"
          >
            {t("contact")}
          </Link>
        </div>
      </div>
    </section>
  );
}
