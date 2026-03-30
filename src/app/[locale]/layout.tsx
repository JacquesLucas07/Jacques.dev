import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import ThemeProvider from "@/components/ThemeProvider";
import LangSetter from "@/components/LangSetter";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: "Jacques Lucas | Développeur Web & Logiciel - Portfolio",
    en: "Jacques Lucas | Web & Software Developer - Portfolio",
    de: "Jacques Lucas | Web- & Softwareentwickler - Portfolio",
  };

  const descriptions: Record<string, string> = {
    fr: "Portfolio de Jacques Lucas (Lucas Jacques), développeur web et logiciel passionné. Découvrez mes projets, compétences et parcours.",
    en: "Portfolio of Jacques Lucas (Lucas Jacques), passionate web and software developer. Discover my projects, skills and background.",
    de: "Portfolio von Jacques Lucas (Lucas Jacques), leidenschaftlicher Web- und Softwareentwickler. Entdecken Sie meine Projekte und Fähigkeiten.",
  };

  const title = titles[locale] || titles.fr;
  const description = descriptions[locale] || descriptions.fr;

  return {
    title,
    description,
    keywords: [
      "Jacques Lucas",
      "Lucas Jacques",
      "développeur",
      "developer",
      "portfolio",
      "web",
      "React",
      "Next.js",
      "Python",
      "Rust",
    ],
    authors: [{ name: "Jacques Lucas" }],
    creator: "Jacques Lucas",
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "fr" ? "fr_FR" : locale === "en" ? "en_US" : locale,
      siteName: "Jacques.dev",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://jacques.dev/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `https://jacques.dev/${l}`])
      ),
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <>
      <LangSetter locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Jacques Lucas",
            alternateName: "Lucas Jacques",
            url: "https://jacques.dev",
            jobTitle: "Développeur Web & Logiciel",
            sameAs: [
              "https://github.com/JacquesLucas07",
              "https://www.linkedin.com/in/lucas-jacques-76226434a",
            ],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Reims",
              addressCountry: "FR",
            },
          }),
        }}
      />
      <NextIntlClientProvider messages={messages}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </NextIntlClientProvider>
    </>
  );
}
