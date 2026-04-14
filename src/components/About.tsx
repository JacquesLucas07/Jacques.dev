import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="min-h-screen flex items-center py-24 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold text-primary mb-6">{t("title")}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            {t("description")}
          </p>
          <div className="flex gap-4">
            <a
              href="https://github.com/JacquesLucas07"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-primary text-white hover:bg-secondary hover:-translate-y-1 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a
              href="https://www.linkedin.com/in/lucas-jacques-76226434a"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-primary text-white hover:bg-secondary hover:-translate-y-1 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a
              href="https://x.com/waxypine?s=11"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-primary text-white hover:bg-secondary hover:-translate-y-1 transition-all"
            >
              <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a
              href="https://gravatar.com/jacqueslucas07"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Gravatar"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-primary text-white hover:bg-secondary hover:-translate-y-1 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12V9.6h-9.6v4.8h4.741A4.8 4.8 0 1 1 7.2 12V5.933A7.203 7.203 0 0 0 4.8 12a7.2 7.2 0 1 0 14.4 0h4.787A11.991 11.991 0 0 1 12 24C5.373 24 0 18.627 0 12S5.373 0 12 0z"/></svg>
            </a>
            <a
              href="https://hub.docker.com/u/waxypine"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Docker Hub"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-primary text-white hover:bg-secondary hover:-translate-y-1 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/></svg>
            </a>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl">
            <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
          </div>
        </div>
      </div>
    </section>
  );
}
