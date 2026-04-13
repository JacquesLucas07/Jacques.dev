import { useTranslations } from "next-intl";

const projects = [
  {
    key: "project1",
    tags: ["Entreprise", "Développement", "Finance"],
    href: "https://race-up.net",
  },
  {
    key: "project2",
    tags: ["IA", "Offline", "Assistant"],
    href: null,
  },
  {
    key: "project3",
    tags: ["Application", "Fitness", "Nutrition"],
    href: null,
  },
];

export default function Projects() {
  const t = useTranslations("projects");

  return (
    <section id="projects" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-primary text-center mb-4">{t("title")}</h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-12">
          {t("subtitle")}{" "}
          <a
            href="https://github.com/JacquesLucas07"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold hover:text-secondary hover:underline transition-colors"
          >
            GitHub
          </a>
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.key}
              className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:-translate-y-2 hover:shadow-lg transition-all"
            >
              <div className="h-48 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{t(`${project.key}.title`)}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {t(`${project.key}.description`)}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-primary text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-2 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all"
                  >
                    {t("viewProject")}
                  </a>
                ) : (
                  <span className="block text-center py-2 border-2 border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-500 rounded-lg font-semibold cursor-not-allowed">
                    {t("comingSoon")}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
