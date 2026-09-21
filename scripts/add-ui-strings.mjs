/**
 * Anade a siteContent.strings las etiquetas de interfaz que el diseno nuevo
 * necesita y que no existian en el LocalizationContext viejo.
 *
 * Son etiquetas estructurales (botones, badges, plantillas de mensaje), no
 * textos de marketing: esos los escribe Tanya desde el panel.
 *
 *   node scripts/add-ui-strings.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const env = Object.fromEntries(
  fs
    .readFileSync(path.join(ROOT, 'web/.env.local'), 'utf8')
    .split('\n')
    .map((l) => l.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2].trim()]),
)

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const NEW_STRINGS = {
  scrollHint: { en: 'Scroll', ru: 'Вниз', es: 'Desliza' },
  popularBadge: { en: 'Most popular', ru: 'Популярный', es: 'Más elegido' },
  durationLabel: { en: 'Duration', ru: 'Срок', es: 'Duración' },
  galleryPrev: { en: 'Previous', ru: 'Назад', es: 'Anterior' },
  galleryNext: { en: 'Next', ru: 'Вперёд', es: 'Siguiente' },
  rightsReserved: {
    en: 'All rights reserved.',
    ru: 'Все права защищены.',
    es: 'Todos los derechos reservados.',
  },
  // {title} se sustituye por el nombre del proyecto o del paquete.
  projectInquiry: {
    en: 'Hello! I saw the project "{title}" on your website and I would like to know more.',
    ru: 'Здравствуйте! Я увидел(а) проект «{title}» на вашем сайте и хотел(а) бы узнать больше.',
    es: 'Hola! Vi el proyecto "{title}" en su sitio web y me gustaría saber más.',
  },
  packageInquiry: {
    en: 'Hello! I am interested in the {title}. Could you tell me more?',
    ru: 'Здравствуйте! Меня интересует {title}. Расскажите, пожалуйста, подробнее.',
    es: 'Hola! Me interesa el {title}. ¿Me puede contar más?',
  },
}

const doc = await client.fetch(`*[_id == "siteContent"][0]{strings}`)
const existing = doc?.strings ?? []
const have = new Set(existing.map((s) => s.key))

const additions = Object.entries(NEW_STRINGS)
  .filter(([key]) => !have.has(key))
  .map(([key, value], i) => ({
    _type: 'stringEntry',
    _key: `ui${i}`,
    key,
    value: { _type: 'localeString', ...value },
  }))

if (additions.length === 0) {
  console.log('Nada que anadir: las etiquetas ya existen.')
} else {
  await client
    .patch('siteContent')
    .setIfMissing({ strings: [] })
    .append('strings', additions)
    .commit()
  console.log(`✓ ${additions.length} etiquetas anadidas:`)
  additions.forEach((a) => console.log(`    ${a.key}`))
}
