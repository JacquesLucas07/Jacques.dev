import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="py-6 text-center text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <p>&copy; {new Date().getFullYear()} Jacques.dev. {t("rights")}</p>
    </footer>
  );
}
