import { groq } from 'next-sanity'
import { client } from './client'
import type { Locale } from './locales'

/**
 * Una sola consulta para toda la home.
 *
 * Detalle importante de rendimiento: de `gallery` solo se piden las referencias
 * y el LQIP, no la galeria renderizada. Las fotos de galeria no se descargan
 * hasta que el visitante abre el proyecto.
 */

const IMAGE = groq`{
  "url": asset->url,
  "lqip": asset->metadata.lqip,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "alt": coalesce(alt, ""),
  hotspot,
  crop
}`

export const HOME_QUERY = groq`{
  "hero": *[_type == "heroSlide"] | order(order asc) {
    _id,
    order,
    alt,
    "desktop": imageDesktop ${IMAGE},
    "mobile": imageMobile ${IMAGE}
  },

  "projects": *[_type == "project" && published != false] | order(order asc) {
    _id,
    order,
    title,
    description,
    "cover": coverImage ${IMAGE},
    "gallery": gallery[] ${IMAGE}
  },

  "packages": *[_type == "pricingPackage"] | order(order asc) {
    _id,
    "slug": slug.current,
    title,
    subtitle,
    price,
    time,
    features,
    popular,
    "pdfUrl": pdf.asset->url
  },

  "content": *[_id == "siteContent"][0] {
    heroTitleLine1,
    heroTitleLine2,
    heroButton,
    "aboutPhoto": aboutPhoto ${IMAGE},
    aboutBody,
    "contactImage": contactImage ${IMAGE},
    tagline,
    whatsappNumber,
    email,
    socialLinks,
    seoTitle,
    seoDescription,
    "ogImage": ogImage ${IMAGE},
    strings
  }
}`

// ------------------------------------------------------------------ tipos

export type SanityImg = {
  url: string | null
  lqip: string | null
  width: number | null
  height: number | null
  alt?: string
} | null

export type LocaleField = Partial<Record<Locale, string>> | null
export type LocaleList = Partial<Record<Locale, string[]>> | null
export type LocaleBlocks = Partial<Record<Locale, unknown[]>> | null

export type HeroSlide = {
  _id: string
  order: number
  alt: LocaleField
  desktop: SanityImg
  mobile: SanityImg
}

export type Project = {
  _id: string
  order: number
  title: LocaleField
  description: LocaleField
  cover: SanityImg
  gallery: SanityImg[] | null
}

export type PricingPackage = {
  _id: string
  slug: string
  title: LocaleField
  subtitle: LocaleField
  price: LocaleField
  time: LocaleField
  features: LocaleList
  popular: boolean | null
  pdfUrl: string | null
}

export type StringEntry = {
  _key: string
  key: string
  value?: LocaleField
  list?: LocaleList
}

export type SiteContent = {
  heroTitleLine1: LocaleField
  heroTitleLine2: LocaleField
  heroButton: LocaleField
  aboutPhoto: SanityImg
  aboutBody: LocaleBlocks
  contactImage: SanityImg
  tagline: LocaleField
  whatsappNumber: string | null
  email: string | null
  socialLinks: { platform: string; url: string }[] | null
  seoTitle: LocaleField
  seoDescription: LocaleField
  ogImage: SanityImg
  strings: StringEntry[] | null
}

export type HomeData = {
  hero: HeroSlide[]
  projects: Project[]
  packages: PricingPackage[]
  content: SiteContent | null
}

/**
 * Los datos se cachean en el build y se revalidan cada hora, o al instante
 * cuando Sanity dispara el webhook de /api/revalidate.
 */
export async function getHomeData(): Promise<HomeData> {
  return client.fetch<HomeData>(
    HOME_QUERY,
    {},
    { next: { revalidate: 3600, tags: ['home'] } },
  )
}
