import type { Locale } from '@/sanity/locales'

/**
 * Compone el texto alternativo de cada foto de proyecto.
 *
 * El sitio venia sirviendo las 99 fotos de galeria con `alt="Proyecto X — 1"`,
 * "— 2", "— 3": correcto para un lector de pantalla a duras penas, e inutil
 * para que alguien las encuentre buscando "dormitorio neoclasico". Aqui se
 * junta lo que Tanya marca en el panel (habitacion y estilo) con el titulo del
 * proyecto, que ya trae superficie y ciudad:
 *
 *   "Dormitorio neoclásico — Apartamento de 54 m², Nizhni Nóvgorod · TG Design"
 *
 * Si no ha marcado nada todavia, cae al titulo del proyecto, que sigue siendo
 * mejor que un numero.
 */

const ROOMS: Record<string, Record<Locale, string>> = {
  bedroom: { es: 'Dormitorio', en: 'Bedroom', ru: 'Спальня' },
  living: { es: 'Salón', en: 'Living room', ru: 'Гостиная' },
  kitchen: { es: 'Cocina', en: 'Kitchen', ru: 'Кухня' },
  dining: { es: 'Comedor', en: 'Dining room', ru: 'Столовая' },
  bathroom: { es: 'Baño', en: 'Bathroom', ru: 'Ванная' },
  kids: { es: 'Habitación infantil', en: "Children's room", ru: 'Детская' },
  office: { es: 'Despacho', en: 'Home office', ru: 'Кабинет' },
  hallway: { es: 'Recibidor', en: 'Hallway', ru: 'Прихожая' },
  closet: { es: 'Vestidor', en: 'Walk-in closet', ru: 'Гардеробная' },
  terrace: { es: 'Terraza', en: 'Terrace', ru: 'Терраса' },
}

const STYLES: Record<string, Record<Locale, string>> = {
  neoclassic: { es: 'neoclásico', en: 'neoclassical', ru: 'в неоклассике' },
  modern: { es: 'moderno', en: 'modern', ru: 'в современном стиле' },
  loft: { es: 'estilo loft', en: 'loft-style', ru: 'в стиле лофт' },
  scandinavian: { es: 'escandinavo', en: 'Scandinavian', ru: 'в скандинавском стиле' },
  minimal: { es: 'minimalista', en: 'minimalist', ru: 'в минимализме' },
  classic: { es: 'clásico', en: 'classical', ru: 'в классическом стиле' },
}

export type PhotoMeta = { room?: string | null; style?: string | null }

export function imageAlt(
  photo: PhotoMeta | null | undefined,
  projectTitle: string,
  locale: Locale,
): string {
  const room = photo?.room ? ROOMS[photo.room]?.[locale] : null
  if (!room) return `${projectTitle} · TG Design`

  const style = photo?.style ? STYLES[photo.style]?.[locale] : null
  if (!style) return `${room} — ${projectTitle} · TG Design`

  /*
   * El adjetivo no va en el mismo sitio en los tres idiomas: en espanol y ruso
   * sigue al sustantivo ("Dormitorio neoclásico", "Спальня в неоклассике"),
   * pero en ingles lo precede. Concatenar siempre igual daba "Bedroom modern".
   */
  const subject =
    locale === 'en' ? `${style} ${room.toLowerCase()}` : `${room} ${style}`

  return `${capitalise(subject)} — ${projectTitle} · TG Design`
}

function capitalise(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
