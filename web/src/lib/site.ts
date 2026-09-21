import type { Locale } from '@/sanity/locales'

/**
 * Dominio canonico. El sitio viejo era incoherente: el sitemap apuntaba a
 * tg-design.net mientras que og:url decia tg-design-five.vercel.app, asi que
 * las senales de SEO se repartian entre dos dominios.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.tg-design.net'
).replace(/\/$/, '')

export const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  ru: 'ru_RU',
  es: 'es_ES',
}

/** Metadatos por idioma, usados cuando el CMS no trae los suyos. */
export const FALLBACK_META: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'TG Design — Interior Design in Ecuador & Russia',
    description:
      'Interior design by Tatiana Gorshkova. Full projects in Quito, Ecuador and across Russia: layouts, 3D visualisation, shopping lists and on-site supervision.',
  },
  ru: {
    title: 'TG Design — дизайн интерьера в Эквадоре и России',
    description:
      'Дизайн интерьера от Татьяны Горшковой. Проекты в Кито (Эквадор) и по России: планировки, 3D-визуализация, шопинг-лист и авторский надзор.',
  },
  es: {
    title: 'TG Design — Diseño de Interiores en Ecuador y Rusia',
    description:
      'Diseño de interiores por Tatiana Gorshkova. Proyectos completos en Quito, Ecuador y Rusia: distribución, visualización 3D, lista de compras y control de obra.',
  },
}
