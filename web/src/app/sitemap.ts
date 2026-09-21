import type { MetadataRoute } from 'next'
import { LOCALE_IDS } from '@/sanity/locales'
import { SITE_URL } from '@/lib/site'

/**
 * El sitemap viejo listaba anclas (#aboutMe, #contact) como si fueran paginas
 * distintas. Google las ignora: una ancla no es una URL propia. Ademas solo
 * cubria un idioma.
 *
 * Aqui va una entrada por idioma, cada una declarando sus alternativas con
 * hreflang, que es lo que hace que Google muestre la version correcta segun
 * quien busque.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    LOCALE_IDS.map((l) => [l, `${SITE_URL}/${l}`]),
  )

  return LOCALE_IDS.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: locale === 'en' ? 1 : 0.9,
    alternates: { languages },
  }))
}
