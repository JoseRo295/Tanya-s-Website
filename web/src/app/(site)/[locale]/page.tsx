import { notFound } from 'next/navigation'
import type { PortableTextBlock } from 'next-sanity'

import { isLocale, LOCALE_IDS, type Locale } from '@/sanity/locales'
import { getHomeData, type SanityImg } from '@/sanity/queries'
import { createDictionary, text, textList } from '@/lib/dictionary'
import { countriesFor } from '@/lib/countries'
import { FALLBACK_META, SITE_URL } from '@/lib/site'

import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { AboutMe } from '@/components/AboutMe'
import { Projects } from '@/components/Projects'
import { Pricing } from '@/components/Pricing'
import { Faq } from '@/components/Faq'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { CookieConsent } from '@/components/CookieConsent'

/** Pagina estatica, regenerada cada hora o al guardar en el panel. */
export const revalidate = 3600

export function generateStaticParams() {
  return LOCALE_IDS.map((locale) => ({ locale }))
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale

  const { hero, projects, packages, faqs, content } = await getHomeData()
  const d = createDictionary(content, locale)
  const whatsapp = content?.whatsappNumber ?? ''

  const nav = [
    { id: 'home', label: d.t('home') },
    { id: 'aboutMe', label: d.t('aboutMe') },
    { id: 'projectCarousel', label: d.t('proyectos') },
    { id: 'newpricingplans', label: d.t('pricing') },
    ...(faqs.length > 0 ? [{ id: 'faq', label: d.t('faqEyebrow') }] : []),
    { id: 'contact', label: d.t('contacts') },
  ]

  return (
    <>
      <JsonLd
        locale={locale}
        projectCount={projects.length}
        whatsapp={whatsapp}
        email={content?.email ?? null}
        socialLinks={content?.socialLinks ?? []}
        packages={packages.map((p) => ({
          name: text(p.title, locale),
          description: text(p.subtitle, locale),
          price: text(p.price, locale),
        }))}
        faqs={faqs.map((f) => ({
          question: text(f.question, locale),
          answer: text(f.answer, locale),
        }))}
      />

      <Header locale={locale} nav={nav} logoUrl="/logo.png" />

      <main>
        <Hero
          slides={hero}
          titleLine1={text(content?.heroTitleLine1 ?? null, locale)}
          titleLine2={text(content?.heroTitleLine2 ?? null, locale)}
          buttonLabel={text(content?.heroButton ?? null, locale)}
          whatsappUrl={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
          scrollHint={d.t('scrollHint')}
          imageAlt={d.t('heroImageAlt')}
        />

        <AboutMe
          photo={content?.aboutPhoto ?? null}
          body={(content?.aboutBody?.[locale] ?? []) as PortableTextBlock[]}
          eyebrow={d.t('aboutMe')}
          heading={d.t('tatianaName')}
          name={d.t('projectLead')}
          photoAlt={d.t('aboutPhotoAlt')}
        />

        <Projects
          items={projects.map((p) => ({
            id: p._id,
            title: text(p.title, locale),
            description: text(p.description, locale),
            cover: p.cover,
            gallery: (p.gallery ?? []).filter(
              (g): g is NonNullable<SanityImg> => Boolean(g?.url),
            ),
          }))}
          labels={{
            eyebrow: d.t('proyectos'),
            heading: d.t('nuestrosProyectos'),
            subheading: '',
            details: d.t('detailsButton'),
            close: d.t('closeButton'),
            cta: d.t('contactUs'),
            prev: d.t('galleryPrev'),
            next: d.t('galleryNext'),
            contactMessage: d.t('projectInquiry'),
          }}
          whatsappNumber={whatsapp}
        />

        <Pricing
          packages={packages.map((p) => ({
            id: p._id,
            slug: p.slug,
            title: text(p.title, locale),
            subtitle: text(p.subtitle, locale),
            price: text(p.price, locale),
            time: text(p.time, locale),
            features: textList(p.features, locale),
            popular: Boolean(p.popular),
            pdfUrl: p.pdfUrl,
          }))}
          labels={{
            eyebrow: d.t('services'),
            heading: d.t('pricing'),
            subheading: '',
            popular: d.t('popularBadge'),
            duration: d.t('durationLabel'),
            cta: d.t('choosePackage'),
            pdf: d.t('downloadBrochure'),
            contactMessage: d.t('packageInquiry'),
          }}
          whatsappNumber={whatsapp}
        />

        <Faq
          items={faqs.map((f) => ({
            id: f._id,
            question: text(f.question, locale),
            answer: text(f.answer, locale),
          }))}
          eyebrow={d.t('faqEyebrow')}
          heading={d.t('faqHeading')}
          subheading={d.t('faqSubheading')}
        />

        <Contact
          labels={{
            eyebrow: d.t('contacts'),
            heading: d.t('contactUs'),
            help: d.t('helpText'),
            firstName: d.t('firstName'),
            lastName: d.t('lastName'),
            email: d.t('email'),
            country: d.t('country'),
            selectCountry: d.t('selectCountry'),
            phone: d.t('phoneNumber'),
            phonePlaceholder: d.t('yourPhoneNumber'),
            agree: d.t('agreeToPolicies'),
            acceptTerms: d.t('acceptTerms'),
            privacyPolicy: d.t('privacyPolicy'),
            send: d.t('send').trim(),
            errors: {
              firstName: d.t('firstNameRequired'),
              lastName: d.t('lastNameRequired'),
              email: d.t('emailRequired'),
              country: d.t('countryRequired'),
              phone: d.t('phoneNumberRequired'),
              agree: d.t('agreeRequired'),
            },
          }}
          countries={countriesFor(locale)}
          image={content?.contactImage ?? null}
          whatsappNumber={whatsapp}
          privacy={buildPrivacy(d)}
        />
      </main>

      <Footer
        locale={locale}
        tagline={text(content?.tagline ?? null, locale)}
        links={nav.slice(1)}
        social={content?.socialLinks ?? []}
        whatsappNumber={whatsapp}
        email={content?.email ?? null}
        privacyLabel={d.t('privacyPolicyTitle')}
        rights={d.t('rightsReserved')}
      />

      <WhatsAppButton number={whatsapp} label={d.t('whatsappButton')} />

      <CookieConsent
        locale={locale}
        title={d.t('cookieTitle')}
        text={d.t('cookieText')}
        accept={d.t('cookieAccept')}
        decline={d.t('cookieDecline')}
        policyLink={d.t('cookiePolicyLink')}
      />
    </>
  )
}

/** Politica de privacidad, montada desde las claves que ya existian. */
function buildPrivacy(d: ReturnType<typeof createDictionary>) {
  return {
    title: d.t('privacyPolicyTitle'),
    intro: d.t('privacyPolicyText'),
    close: d.t('closeButton'),
    sections: [
      { heading: d.t('infoWeCollect'), body: d.t('infoWeCollectText'), items: [] },
      { heading: d.t('useOfInfo'), body: '', items: d.list('useOfInfoList') },
      { heading: d.t('shareInfo'), body: d.t('shareInfoText'), items: [] },
      { heading: d.t('protectInfo'), body: d.t('protectInfoText'), items: [] },
      { heading: d.t('yourRights'), body: d.t('yourRightsText'), items: [] },
      { heading: d.t('privacyChanges'), body: d.t('privacyChangesText'), items: [] },
      { heading: d.t('contact'), body: d.t('contactText'), items: [] },
    ],
  }
}

/**
 * Datos estructurados. Esto es lo que permite que Google entienda que hay un
 * negocio local de diseno de interiores detras de la pagina, y lo que habilita
 * los resultados enriquecidos. El sitio viejo no tenia nada de esto.
 */
/**
 * Primera cifra de un precio escrito a mano en el panel.
 *
 * Cubre "desde 18 $/m2", "from $18/m²" y "от 18 $/м²", que son las tres formas
 * en que esta hoy en el CMS. Si algun dia no hay numero, devuelve undefined y
 * la oferta se emite sin precio, que es preferible a emitir uno invalido.
 */
function priceNumber(raw: string): number | undefined {
  const match = raw.match(/\d+(?:[.,]\d+)?/)
  if (!match) return undefined
  const n = Number(match[0].replace(',', '.'))
  return Number.isFinite(n) ? n : undefined
}

function JsonLd({
  locale,
  projectCount,
  whatsapp,
  email,
  socialLinks,
  packages,
  faqs,
}: {
  locale: Locale
  projectCount: number
  whatsapp: string
  email: string | null
  socialLinks: { platform: string; url: string }[]
  packages: { name: string; description: string; price: string }[]
  faqs: { question: string; answer: string }[]
}) {
  const meta = FALLBACK_META[locale]

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#business`,
        name: 'TG Design',
        description: meta.description,
        url: `${SITE_URL}/${locale}`,
        image: `${SITE_URL}/logo.png`,
        telephone: whatsapp || undefined,
        email: email || undefined,
        priceRange: '$$',
        currenciesAccepted: 'USD',
        areaServed: [
          { '@type': 'Country', name: 'Ecuador' },
          { '@type': 'Country', name: 'Russia' },
        ],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Quito',
          addressCountry: 'EC',
        },
        /* Coordenadas del centro de Quito. Es un estudio sin local a la calle,
           asi que no hay una direccion exacta que publicar; el municipio basta
           para que la busqueda local lo situe en la ciudad correcta. */
        geo: {
          '@type': 'GeoCoordinates',
          latitude: -0.1807,
          longitude: -78.4678,
        },
        /* `sameAs` es lo que ata el sitio a los perfiles reales: sin esto,
           buscadores y asistentes no saben que esta web y esa cuenta de
           Instagram son el mismo negocio. */
        sameAs: socialLinks.map((s) => s.url),
        founder: {
          '@type': 'Person',
          name: 'Tatiana Gorshkova',
          jobTitle: 'Interior Designer',
        },
        knowsLanguage: ['en', 'ru', 'es'],
        /* Los cuatro paquetes ya estaban en el CMS pero no se declaraban, asi
           que para un buscador el sitio no vendia nada concreto. */
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: meta.title,
          itemListElement: packages.map((p) => ({
            '@type': 'Offer',
            name: p.name,
            description: p.description || undefined,
            /* `price` tiene que ser un numero: el CMS guarda cadenas como
               "desde 18 $/m2", que schema.org rechaza. De ahi que se extraiga
               la cifra y se declare la unidad aparte —MTK es metro cuadrado—
               en vez de mandar el texto tal cual. */
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: priceNumber(p.price),
              priceCurrency: 'USD',
              referenceQuantity: {
                '@type': 'QuantitativeValue',
                value: 1,
                unitCode: 'MTK',
              },
            },
            itemOffered: {
              '@type': 'Service',
              name: p.name,
              serviceType: 'Interior design',
              provider: { '@id': `${SITE_URL}/#business` },
            },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/${locale}`,
        name: 'TG Design',
        inLanguage: locale,
        publisher: { '@id': `${SITE_URL}/#business` },
      },
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/${locale}#portfolio`,
        name: meta.title,
        inLanguage: locale,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#business` },
        numberOfItems: projectCount,
      },
      /* Es el formato que los buscadores citan literalmente cuando alguien
         pregunta por precios o plazos, asi que sale solo si hay preguntas
         cargadas: un FAQPage vacio es un error de validacion. */
      ...(faqs.length > 0
        ? [
            {
              '@type': 'FAQPage',
              '@id': `${SITE_URL}/${locale}#faq`,
              inLanguage: locale,
              isPartOf: { '@id': `${SITE_URL}/#website` },
              mainEntity: faqs.map((f) => ({
                '@type': 'Question',
                name: f.question,
                acceptedAnswer: { '@type': 'Answer', text: f.answer },
              })),
            },
          ]
        : []),
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
