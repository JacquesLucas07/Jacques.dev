import { useTranslations } from "next-intl";

const items = [
  { key: "edu1", type: "education" as const, date: "2025 - 2028" },
  { key: "job1", type: "work" as const, date: "Janvier 2026 - Présent" },
  { key: "edu2", type: "education" as const, date: "2025" },
];

export default function Experience() {
  const t = useTranslations("experience");

  return (
    <section id="experience" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-primary text-center mb-12">{t("title")}</h2>

        <div className="relative pl-8 before:absolute before:left-3 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-primary before:to-secondary">
          {items.map((item) => (
            <div key={item.key} className="relative mb-12 pl-8">
              <div
                className={`absolute -left-5 top-1 w-4 h-4 rounded-full border-4 border-white dark:border-gray-900 ${
                  item.type === "education"
                    ? "bg-secondary shadow-[0_0_0_4px] shadow-secondary/50"
                    : "bg-primary shadow-[0_0_0_4px] shadow-primary/50"
                }`}
              />
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:translate-x-2 hover:shadow-lg transition-all">
                <span className="inline-block px-4 py-1 bg-primary text-white text-sm rounded-full mb-3">
                  {item.date}
                </span>
                <h3 className="text-xl font-bold mb-1">{t(`${item.key}.title`)}</h3>
                <h4 className="text-gray-500 dark:text-gray-400 mb-3">
                  {t(`${item.key}.${item.type === "education" ? "school" : "company"}`)}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t(`${item.key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
