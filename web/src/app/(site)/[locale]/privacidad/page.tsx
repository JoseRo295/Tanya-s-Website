import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { isLocale, LOCALE_IDS, type Locale } from '@/sanity/locales'
import { getHomeData } from '@/sanity/queries'
import { createDictionary } from '@/lib/dictionary'
import { SITE_URL } from '@/lib/site'

export const revalidate = 3600

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
  const d = createDictionary(content, locale)

  return {
    title: `${d.t('privacyPolicyTitle')} — TG Design`,
    alternates: {
      canonical: `${SITE_URL}/${locale}/privacidad`,
      languages: Object.fromEntries(
        LOCALE_IDS.map((l) => [l, `${SITE_URL}/${l}/privacidad`]),
      ),
    },
    // Una politica de privacidad no aporta nada en los resultados de busqueda
    // y compite con la home por el presupuesto de rastreo.
    robots: { index: false, follow: true },
  }
}

/**
 * Pagina real para la politica de privacidad.
 * El banner de cookies del sitio viejo enlazaba a /privacy-policy, una ruta que
 * nunca existio: el enlace daba 404.
 */
export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale

  const { content } = await getHomeData()
  const d = createDictionary(content, locale)

  const sections = [
    { heading: d.t('infoWeCollect'), body: d.t('infoWeCollectText'), items: [] as string[] },
    { heading: d.t('useOfInfo'), body: '', items: d.list('useOfInfoList') },
    { heading: d.t('shareInfo'), body: d.t('shareInfoText'), items: [] },
    { heading: d.t('protectInfo'), body: d.t('protectInfoText'), items: [] },
    { heading: d.t('yourRights'), body: d.t('yourRightsText'), items: [] },
    { heading: d.t('privacyChanges'), body: d.t('privacyChangesText'), items: [] },
    { heading: d.t('contact'), body: d.t('contactText'), items: [] },
  ]

  return (
    <main className="min-h-screen bg-sand-50 py-16 sm:py-24">
      <article className="mx-auto max-w-2xl px-5 sm:px-6">
        <Link
          href={`/${locale}`}
          className="mb-10 inline-flex items-center gap-1.5 text-sm text-ink-400 transition-colors hover:text-ink-900"
        >
          ← {d.t('home')}
        </Link>

        <h1 className="text-balance text-3xl font-semibold leading-tight text-ink-900 sm:text-4xl">
          {d.t('privacyPolicyTitle')}
        </h1>

        <p className="mt-6 leading-relaxed text-ink-500">{d.t('privacyPolicyText')}</p>

        {sections.map((s, i) => (
          <section key={i} className="mt-10">
            <h2 className="mb-3 text-lg font-semibold text-ink-900">{s.heading}</h2>
            {s.body && <p className="leading-relaxed text-ink-500">{s.body}</p>}
            {s.items.length > 0 && (
              <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-500">
                {s.items.map((item, j) => (
                  <li key={j} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>
    </main>
  )
}
