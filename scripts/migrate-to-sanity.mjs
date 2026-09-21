/**
 * Migra el contenido hardcodeado de tg-design/ al CMS de Sanity.
 *
 *   node scripts/migrate-to-sanity.mjs --dry-run   # solo reporta, no sube nada
 *   node scripts/migrate-to-sanity.mjs             # comprime, sube y crea documentos
 *
 * Es idempotente: cada documento tiene un _id fijo (project-7, hero-1, ...) y se
 * escribe con createOrReplace. Las imagenes ya subidas quedan registradas en
 * scripts/.migration-cache.json, asi que volver a correrlo no re-sube nada.
 *
 * IMPORTANTE: createOrReplace pisa los cambios que se hayan hecho en el panel.
 * Esto se corre una sola vez, antes de entregarle el CMS a Tanya.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'
import sharp from 'sharp'

import { parseTranslations } from './parse-translations.mjs'
import { PROJECTS, HERO_SLIDES, PACKAGES, PROMOTED_KEYS } from './project-map.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const IMAGES = path.join(ROOT, 'tg-design/src/Images')
const PDFS = path.join(ROOT, 'tg-design/public/pdfs')
const LOCALIZATION = path.join(ROOT, 'tg-design/src/context/LocalizationContext.js')
const CACHE_FILE = path.join(ROOT, 'scripts/.migration-cache.json')

const DRY_RUN = process.argv.includes('--dry-run')

// Lado largo maximo. Sanity reoptimiza al servir, asi que guardar mas es
// desperdiciar cuota: 2400px cubre pantallas 2K a pantalla completa.
const MAX_EDGE = 2400
const JPEG_QUALITY = 82

// ---------------------------------------------------------------- entorno

function loadEnv() {
  const file = path.join(ROOT, 'web/.env.local')
  if (!fs.existsSync(file)) throw new Error(`Falta ${file}`)

  const env = {}
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/)
    if (m) env[m[1]] = m[2].trim()
  }
  return env
}

const env = loadEnv()
const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

// ---------------------------------------------------------------- cache

const cache = fs.existsSync(CACHE_FILE)
  ? JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'))
  : { images: {}, files: {} }

function saveCache() {
  if (!DRY_RUN) fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2))
}

// ---------------------------------------------------------------- subida

const stats = { uploaded: 0, cached: 0, originalBytes: 0, finalBytes: 0 }

/** Comprime y sube una imagen; devuelve la referencia al asset de Sanity. */
async function uploadImage(absPath, label) {
  const key = path.relative(ROOT, absPath).replace(/\\/g, '/')

  if (cache.images[key]) {
    stats.cached++
    return imageRef(cache.images[key])
  }

  const original = fs.statSync(absPath).size
  stats.originalBytes += original

  const compressed = await sharp(absPath)
    .rotate() // respeta la orientacion EXIF
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toBuffer()

  // Varias fotos ya vienen optimizadas y re-codificarlas las engorda.
  // En ese caso se sube el original y se evita una perdida de calidad gratis.
  const keepOriginal = compressed.length >= original
  const buffer = keepOriginal ? fs.readFileSync(absPath) : compressed
  const ext = keepOriginal ? path.extname(absPath).toLowerCase() || '.jpg' : '.jpg'
  const filename = `${label}${ext}`

  stats.finalBytes += buffer.length

  console.log(
    keepOriginal
      ? `  ${filename.padEnd(28)} ${mb(original)}  (ya optimizada, sin tocar)`
      : `  ${filename.padEnd(28)} ${mb(original)} -> ${mb(buffer.length)}  (-${(100 - (buffer.length / original) * 100).toFixed(0)}%)`,
  )

  if (DRY_RUN) return imageRef('image-DRYRUN')

  const asset = await client.assets.upload('image', buffer, { filename })
  cache.images[key] = asset._id
  stats.uploaded++
  saveCache()

  return imageRef(asset._id)
}

async function uploadFile(absPath, label) {
  const key = path.relative(ROOT, absPath).replace(/\\/g, '/')
  if (cache.files[key]) return fileRef(cache.files[key])

  const size = fs.statSync(absPath).size
  console.log(`  ${label.padEnd(28)} ${mb(size)}`)
  if (DRY_RUN) return fileRef('file-DRYRUN')

  const asset = await client.assets.upload('file', fs.createReadStream(absPath), {
    filename: path.basename(absPath),
  })
  cache.files[key] = asset._id
  saveCache()
  return fileRef(asset._id)
}

const imageRef = (id) => ({ _type: 'image', asset: { _type: 'reference', _ref: id } })
const fileRef = (id) => ({ _type: 'file', asset: { _type: 'reference', _ref: id } })
const mb = (b) => `${(b / 1048576).toFixed(2)} MB`.padStart(9)

// ---------------------------------------------------------------- helpers

const t = parseTranslations(LOCALIZATION)

/** Construye un objeto localizado {en, ru, es} a partir de una clave. */
function locale(key, transform = (v) => v) {
  const out = { _type: 'localeString' }
  for (const lang of ['en', 'ru', 'es']) {
    const v = t[lang]?.[key]
    if (v !== undefined) out[lang] = transform(v)
  }
  return out
}

function localeOf(type, key, transform) {
  return { ...locale(key, transform), _type: type }
}

/** Convierte un texto plano en bloques de Portable Text, uno por parrafo. */
function toBlocks(text) {
  if (!text) return []
  return String(text)
    .split(/\n{2,}|\.\s+(?=[A-ZА-ЯÁÉÍÓÚÑ])/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s, i) => ({
      _type: 'block',
      _key: `b${i}`,
      style: 'normal',
      markDefs: [],
      children: [{ _type: 'span', _key: `s${i}`, text: s.endsWith('.') ? s : `${s}.`, marks: [] }],
    }))
}

async function commit(docs) {
  if (DRY_RUN) {
    console.log(`\n[dry-run] se crearian ${docs.length} documentos`)
    return
  }
  let tx = client.transaction()
  for (const doc of docs) tx = tx.createOrReplace(doc)
  await tx.commit()
  console.log(`\n✓ ${docs.length} documentos escritos en Sanity`)
}

// ---------------------------------------------------------------- main

async function main() {
  console.log(
    DRY_RUN
      ? '=== DRY RUN: no se sube ni escribe nada ===\n'
      : `=== Migrando a ${env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${env.NEXT_PUBLIC_SANITY_DATASET} ===\n`,
  )

  const docs = []

  // --- Proyectos ---
  for (const [index, p] of PROJECTS.entries()) {
    console.log(`Proyecto ${p.key} — ${t.en[`proyecto${p.key}`] ?? '?'}`)
    const dir = path.join(IMAGES, 'projects', p.dir)

    const cover = await uploadImage(path.join(dir, p.cover), `p${p.key}-portada`)

    const gallery = []
    for (const [i, file] of p.gallery.entries()) {
      const img = await uploadImage(path.join(dir, file), `p${p.key}-${i + 1}`)
      gallery.push({ ...img, _key: `g${i}` })
    }

    docs.push({
      _id: `project-${p.key}`,
      _type: 'project',
      title: localeOf('localeString', `proyecto${p.key}`),
      description: localeOf('localeText', `descripcionProyecto${p.key}`),
      coverImage: cover,
      gallery,
      order: index + 1,
      published: true,
    })
    console.log('')
  }

  // --- Portada ---
  console.log('Carrusel de portada')
  for (const [i, file] of HERO_SLIDES.entries()) {
    const img = await uploadImage(path.join(IMAGES, 'corrusel', file), `portada-${i + 1}`)
    docs.push({
      _id: `hero-${i + 1}`,
      _type: 'heroSlide',
      imageDesktop: img,
      alt: { _type: 'localeString', en: 'Luxury interior design' },
      order: i + 1,
    })
  }
  console.log('')

  // --- Paquetes ---
  console.log('Paquetes de precios')
  for (const [i, pack] of PACKAGES.entries()) {
    const doc = {
      _id: `package-${pack.slug}`,
      _type: 'pricingPackage',
      slug: { _type: 'slug', current: pack.slug },
      title: localeOf('localeString', `${pack.prefix}Title`),
      subtitle: localeOf('localeString', `${pack.prefix}Subtitle`),
      price: localeOf('localeString', `${pack.prefix}Price`),
      time: localeOf('localeString', `${pack.prefix}Time`),
      features: localeOf('localeStringList', `${pack.prefix}Items`),
      popular: pack.popular,
      order: i + 1,
    }

    if (pack.pdf) {
      const abs = path.join(PDFS, pack.pdf)
      if (fs.existsSync(abs)) doc.pdf = await uploadFile(abs, pack.pdf)
      else console.log(`  ⚠ falta el PDF ${pack.pdf}`)
    }

    docs.push(doc)
  }
  console.log('')

  // --- Contenido del sitio ---
  console.log('Contenido del sitio')
  const aboutPhoto = await uploadImage(path.join(IMAGES, 'Tanya/6.jpg'), 'sobre-mi')

  const aboutBody = { _type: 'localeBlock' }
  for (const lang of ['en', 'ru', 'es']) {
    aboutBody[lang] = toBlocks(t[lang]?.teamDescription)
  }

  // Union de las claves de los tres idiomas, no solo las inglesas: `ru` y `es`
  // tienen 5 claves (las del banner de cookies) que `en` no define, y tomando
  // solo `en` se perdian.
  const allKeys = [...new Set(['en', 'ru', 'es'].flatMap((l) => Object.keys(t[l] ?? {})))]

  const strings = allKeys
    .filter((k) => !PROMOTED_KEYS.has(k))
    .map((key, i) => {
      const sample = t.en[key] ?? t.es[key] ?? t.ru[key]
      const entry = { _type: 'stringEntry', _key: `k${i}`, key }
      if (Array.isArray(sample)) entry.list = localeOf('localeStringList', key)
      else entry.value = locale(key)
      return entry
    })

  docs.push({
    _id: 'siteContent',
    _type: 'siteContent',
    heroTitleLine1: localeOf('localeString', 'designerSpaceTitleLine1'),
    heroTitleLine2: localeOf('localeString', 'designerSpaceTitleLine2'),
    heroButton: localeOf('localeString', 'orderDesignProject'),
    aboutPhoto,
    aboutBody,
    whatsappNumber: '+593983548611',
    seoTitle: { _type: 'localeString', en: 'TG Design — Interior Design' },
    strings,
  })
  console.log(`  ${String(strings.length).padStart(3)} textos sueltos importados`)

  await commit(docs)

  // --- Resumen ---
  console.log('\n--- Resumen ---')
  console.log(`Imagenes subidas:   ${stats.uploaded}`)
  console.log(`Ya estaban (cache): ${stats.cached}`)
  if (stats.originalBytes > 0) {
    console.log(`Peso original:    ${mb(stats.originalBytes)}`)
    console.log(`Peso comprimido:  ${mb(stats.finalBytes)}`)
    console.log(
      `Reduccion:        ${(100 - (stats.finalBytes / stats.originalBytes) * 100).toFixed(1)}%`,
    )
  }
}

main().catch((err) => {
  console.error('\n✗ Fallo la migracion:', err.message)
  saveCache()
  process.exit(1)
})
