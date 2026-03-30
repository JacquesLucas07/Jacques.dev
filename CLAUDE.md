# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projet

Portfolio personnel de Lucas Jacques (Jacques.dev). Next.js 16 + Tailwind CSS v4 + TypeScript, avec i18n 24 langues via next-intl, deploye sur Cloudflare Workers via OpenNext.

SEO optimise pour les mots-cles "Jacques Lucas" et "Lucas Jacques".

## Commandes

```bash
npm run dev      # Serveur de dev (localhost:3000)
npm run build    # Build production (genere 24 pages statiques)
npm run deploy   # Build OpenNext + deploy Cloudflare Workers
```

## Architecture

```
src/
├── app/
│   ├── layout.tsx              # Root layout (importe globals.css)
│   ├── globals.css             # Tailwind directives + custom variant dark
│   ├── robots.ts               # robots.txt
│   ├── sitemap.ts              # sitemap.xml (24 locales)
│   └── [locale]/
│       ├── layout.tsx          # Metadata SEO par locale, JSON-LD, NextIntlClientProvider
│       └── page.tsx            # Assemblage des sections
├── components/
│   ├── Header.tsx              # Nav + ThemeToggle + LangSwitcher (client)
│   ├── ThemeProvider.tsx       # Dark mode provider (client)
│   ├── ThemeToggle.tsx         # Bouton dark/light (client)
│   ├── LangSwitcher.tsx        # Dropdown 24 langues avec recherche (client)
│   ├── About.tsx               # Section a propos (server)
│   ├── Skills.tsx              # Section competences (server)
│   ├── Experience.tsx          # Section timeline (server)
│   ├── Projects.tsx            # Section projets (server)
│   ├── Contact.tsx             # Section contact mailto (server)
│   └── Footer.tsx              # Footer (server)
├── i18n/
│   ├── routing.ts              # 24 locales, defaultLocale: "fr"
│   └── request.ts              # getRequestConfig pour next-intl
└── messages/                   # 24 fichiers JSON de traduction
```

## i18n

- next-intl avec routing par prefixe (`/fr/`, `/en/`, `/de/`, etc.)
- Middleware dans `middleware.ts` (racine) pour la redirection locale
- Traductions chargees via `useTranslations("section")` dans les composants
- `generateStaticParams` pre-rend les 24 locales au build

## Dark mode

- Strategie Tailwind `class` sur `<html>`
- Persiste dans `localStorage("theme")`
- `ThemeProvider` applique la classe au montage

## Deploiement

- `open-next.config.ts` + `wrangler.jsonc` pour Cloudflare Workers
- Build: `opennextjs-cloudflare build` puis `wrangler deploy`

## Conventions

- Langue de communication : **francais**
- Server Components par defaut, `"use client"` uniquement pour l'interactivite navigateur
- Couleurs custom Tailwind : `primary` (#3b82f6), `secondary` (#8b5cf6), `accent` (#f59e0b)
