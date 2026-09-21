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

  const blur = image.lqip
    ? { placeholder: 'blur' as const, blurDataURL: image.lqip }
    : {}

  if (fill) {
    return (
      <Image
        src={image.url}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        priority={priority}
        {...blur}
      />
    )
  }

  return (
    <Image
      src={image.url}
      alt={alt}
      width={width ?? image.width ?? 1200}
      height={height ?? image.height ?? 800}
      sizes={sizes}
      className={className}
      priority={priority}
      {...blur}
    />
  )
}
