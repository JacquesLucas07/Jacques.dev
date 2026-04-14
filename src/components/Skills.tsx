import { useTranslations } from "next-intl";
import Image from "next/image";

const currentSkills = [
  { name: "JavaScript", logo: "/asset/logos/javascript.svg", level: 90 },
  { name: "Python", logo: "/asset/logos/python.svg", level: 85 },
  { name: "Rust", logo: "/asset/logos/rust.svg", level: 80 },
  { name: "React", logo: "/asset/logos/react.svg", level: 75 },
  { name: "CSS3", logo: "/asset/logos/css3.svg", level: 70 },
  { name: "Git", logo: "/asset/logos/git.svg", level: 85 },
];

const learningStack = [
  { name: "Vue.js", logo: "/asset/logos/vuejs.svg" },
  { name: "C++", logo: "/asset/logos/cpp.png" },
  { name: "Java", logo: "/asset/logos/java.svg" },
  { name: "Docker", logo: "/asset/logos/docker.svg" },
  { name: "TypeScript", logo: "/asset/logos/typescript.svg" },
];

export default function Skills() {
  const t = useTranslations("skills");

  return (
    <section id="skills" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-primary text-center mb-12">{t("title")}</h2>

        <h3 className="text-2xl font-semibold text-secondary text-center mb-8">{t("current")}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {currentSkills.map((skill) => (
            <div
              key={skill.name}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md hover:-translate-y-2 hover:shadow-lg transition-all text-center group"
            >
              <Image
                src={skill.logo}
                alt={skill.name}
                width={48}
                height={48}
                className="mx-auto mb-4 group-hover:scale-110 transition-transform"
              />
              <h4 className="text-lg font-semibold mb-3">{skill.name}</h4>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-semibold text-secondary text-center mb-8">{t("learning")}</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {learningStack.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-3 bg-white dark:bg-gray-900 px-6 py-4 rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition-all"
            >
              <Image src={tech.logo} alt={tech.name} width={32} height={32} />
              <span className="font-semibold">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
