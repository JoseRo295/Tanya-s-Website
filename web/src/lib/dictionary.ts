import type { Locale } from '@/sanity/locales'
import { DEFAULT_LOCALE } from '@/sanity/locales'
import type { LocaleField, LocaleList, SiteContent } from '@/sanity/queries'

/**
 * Sustituye al viejo `translate()` de LocalizationContext, pero leyendo de
 * Sanity y resolviendo en el servidor: los textos llegan ya dentro del HTML,
 * que es justo lo que Google no veia antes.
 */
export type Dictionary = {
  locale: Locale
  /** Texto suelto por clave. Cae al idioma por defecto y luego a la clave. */
  t: (key: string) => string
  /** Lista de textos por clave. */
  list: (key: string) => string[]
}

export function text(field: LocaleField, locale: Locale): string {
  if (!field) return ''
  return field[locale] || field[DEFAULT_LOCALE] || ''
}

/**
 * Como `text`, pero sin caer al idioma por defecto.
 *
 * Para titulos y descripciones de SEO el fallback cruzado es peor que no tener
 * valor: si solo esta el ingles, las tres paginas acaban con el mismo <title>
 * en ingles y Google las ve como duplicadas. Aqui conviene devolver vacio para
 * que entre el texto de respaldo del idioma correcto.
 */
export function textStrict(field: LocaleField, locale: Locale): string {
  return field?.[locale] || ''
}

export function textList(field: LocaleList, locale: Locale): string[] {
  if (!field) return []
  return field[locale] || field[DEFAULT_LOCALE] || []
}

export function createDictionary(
  content: SiteContent | null,
  locale: Locale,
): Dictionary {
  const byKey = new Map((content?.strings ?? []).map((entry) => [entry.key, entry]))

  return {
    locale,
    t: (key) => {
      const entry = byKey.get(key)
      const value = text(entry?.value ?? null, locale)
      // Devolver la clave cruda seria peor que no mostrar nada en produccion,
      // pero ayuda a detectar textos faltantes durante el desarrollo.
      return value || (process.env.NODE_ENV === 'development' ? key : '')
    },
    list: (key) => textList(byKey.get(key)?.list ?? null, locale),
  }
}
