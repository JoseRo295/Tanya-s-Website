import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'
import { dataset, projectId } from './env'

const builder = createImageUrlBuilder({ projectId, dataset })

/**
 * Aqui esta el arreglo del problema de rendimiento: `auto('format')` hace que
 * el CDN devuelva WebP/AVIF, y el `.width()` que pide next/image recorta el
 * tamano. Aunque Tanya suba un PNG de 7 MB, el visitante recibe ~100 KB.
 */
export function urlFor(source: Image) {
  return builder.image(source).auto('format').fit('max')
}

/** Placeholder borroso que Sanity calcula al subir la imagen. */
export type SanityImage = Image & {
  asset?: { metadata?: { lqip?: string; dimensions?: { width: number; height: number } } }
}

export function blurFor(source: SanityImage | undefined) {
  const lqip = source?.asset?.metadata?.lqip
  return lqip ? { placeholder: 'blur' as const, blurDataURL: lqip } : {}
}
