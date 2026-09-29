import Image from 'next/image'
import type { SanityImg } from '@/sanity/queries'

type Props = {
  image: SanityImg
  alt: string
  /** Pista de tamanos para que el navegador baje la resolucion justa. */
  sizes: string
  className?: string
  /** Solo para la imagen que se ve al abrir la pagina (LCP). */
  priority?: boolean
  fill?: boolean
  width?: number
  height?: number
}

const clamp = (n: number) => Math.min(1, Math.max(0, n))

/**
 * Aplica lo que la editora marca en el Studio. El asset guarda la foto original;
 * el recorte y el punto de enfoque son solo datos del campo, asi que hay que
 * traducirlos: el recorte a `rect` del CDN (en pixeles) y el punto de enfoque a
 * `object-position`, relativo ya a la zona recortada. Sin esto, `object-cover`
 * centra la foto original y lo que ella eligio no se ve.
 */
function recortar(image: NonNullable<SanityImg> & { url: string }) {
  const { crop, hotspot } = image
  const w = image.width ?? 0
  const h = image.height ?? 0

  let src = image.url
  let width = w
  let height = h
  let left = 0
  let top = 0
  let fracW = 1
  let fracH = 1

  if (crop && w && h) {
    left = clamp(crop.left)
    top = clamp(crop.top)
    fracW = clamp(1 - crop.left - crop.right)
    fracH = clamp(1 - crop.top - crop.bottom)
    width = Math.round(w * fracW)
    height = Math.round(h * fracH)
    if (fracW > 0 && fracH > 0 && (fracW < 1 || fracH < 1)) {
      src = `${image.url}?rect=${Math.round(w * left)},${Math.round(h * top)},${width},${height}`
    }
  }

  const objectPosition = hotspot
    ? `${clamp((hotspot.x - left) / (fracW || 1)) * 100}% ${clamp((hotspot.y - top) / (fracH || 1)) * 100}%`
    : undefined

  return { src, width, height, objectPosition }
}

/**
 * next/image + el CDN de Sanity. Aqui se cierra el problema de rendimiento:
 * Sanity entrega WebP/AVIF al tamano pedido, y el LQIP guardado en el asset
 * sirve de placeholder borroso para que no haya salto de layout.
 */
export function SanityPicture({
  image,
  alt,
  sizes,
  className,
  priority = false,
  fill = true,
  width,
  height,
}: Props) {
  if (!image?.url) return null

  const recorte = recortar({ ...image, url: image.url })
  const style = recorte.objectPosition ? { objectPosition: recorte.objectPosition } : undefined

  const blur = image.lqip
    ? { placeholder: 'blur' as const, blurDataURL: image.lqip }
    : {}

  if (fill) {
    return (
      <Image
        src={recorte.src}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        style={style}
        priority={priority}
        {...blur}
      />
    )
  }

  return (
    <Image
      src={recorte.src}
      alt={alt}
      width={width ?? (recorte.width || 1200)}
      height={height ?? (recorte.height || 800)}
      sizes={sizes}
      className={className}
      style={style}
      priority={priority}
      {...blur}
    />
  )
}
