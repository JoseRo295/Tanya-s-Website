import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { LOCALE_IDS, isLocale, type Locale } from '@/sanity/locales'
import { getHomeData } from '@/sanity/queries'
import { textStrict } from '@/lib/dictionary'
import { FALLBACK_META, OG_LOCALE, SITE_URL } from '@/lib/site'
import { fontVariables } from '@/lib/fonts'
import '../../globals.css'

export function generateStaticParams() {
  return LOCALE_IDS.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  const locale = raw as Locale

  const { content } = await getHomeData()
  const fallback = FALLBACK_META[locale]

  const title = textStrict(content?.seoTitle ?? null, locale) || fallback.title
  const description =
    textStrict(content?.seoDescription ?? null, locale) || fallback.description
  const image = content?.ogImage?.url ?? `${SITE_URL}/logo.png`

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,

    // hreflang de verdad. El sitio viejo declaraba ?lang=es, que no es una
    // pagina distinta: Google solo veia la version en ingles.
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        ...Object.fromEntries(LOCALE_IDS.map((l) => [l, `${SITE_URL}/${l}`])),
        'x-default': `${SITE_URL}/en`,
      },
    },

    openGraph: {
      type: 'website',
      siteName: 'TG Design',
      url: `${SITE_URL}/${locale}`,
      title,
      description,
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALE_IDS.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
  }
}

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <html lang={locale} className={fontVariables}>
      <body>{children}</body>
    </html>
  )
}
