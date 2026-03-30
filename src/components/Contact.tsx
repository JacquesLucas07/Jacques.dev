import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("contact");

  const contactItems = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
      ),
      label: t("email"),
      value: "jacqueslucas.m2101@gmail.com",
      href: "mailto:jacqueslucas.m2101@gmail.com",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
      ),
      label: t("phone"),
      value: "+33 6 12 46 18 43",
      href: "tel:+33612461843",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
      ),
      label: t("location"),
      value: "Reims, France",
      href: null,
    },
  ];

  return (
    <section id="contact" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-primary text-center mb-4">{t("title")}</h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-12">{t("subtitle")}</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactItems.map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:translate-x-2 hover:shadow-lg transition-all"
            >
              <span className="text-primary mt-1 shrink-0">{item.icon}</span>
              <div>
                <h4 className="font-semibold mb-1">{item.label}</h4>
                {item.href ? (
                  <a href={item.href} className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors text-sm">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="mailto:jacqueslucas.m2101@gmail.com"
            className="inline-block px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:-translate-y-1 hover:shadow-lg transition-all"
          >
            {t("title")}
          </a>
        </div>
      </div>
    </section>
  );
}
