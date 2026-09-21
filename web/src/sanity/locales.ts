export const LOCALES = [
  { id: 'en', title: 'English' },
  { id: 'ru', title: 'Русский' },
  { id: 'es', title: 'Español' },
] as const

export type Locale = (typeof LOCALES)[number]['id']

export const DEFAULT_LOCALE: Locale = 'en'

export const LOCALE_IDS = LOCALES.map((l) => l.id) as readonly Locale[]

export function isLocale(value: string): value is Locale {
  return (LOCALE_IDS as readonly string[]).includes(value)
}

/**
 * Lee un campo localizado cayendo al idioma por defecto cuando falta la traduccion,
 * para que un texto sin traducir nunca se muestre vacio en la pagina.
 */
export function pick<T>(
  field: Partial<Record<Locale, T>> | null | undefined,
  locale: Locale,
): T | undefined {
  if (!field) return undefined
  return field[locale] ?? field[DEFAULT_LOCALE] ?? undefined
}
