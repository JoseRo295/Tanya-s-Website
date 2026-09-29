'use client'

import { useEffect, useRef, useState } from 'react'
import { SectionHeading } from './SectionHeading'

export type PackageItem = {
  id: string
  slug: string
  title: string
  subtitle: string
  price: string
  time: string
  /** "Todo lo de «100%», más:" ya compuesto, o vacío si la lista es completa. */
  includes: string
  features: string[]
  badge: string
  popular: boolean
  pdfUrl: string | null
}

export type PricingLabels = {
  eyebrow: string
  heading: string
  subheading: string
  popular: string
  duration: string
  cta: string
  pdf: string
  contactMessage: string
}

/**
 * El sitio viejo mostraba un solo paquete a la vez con pestanas. Se conserva
 * ese patron en movil (cuatro tarjetas completas serian un muro de texto) y en
 * escritorio se muestran todas en rejilla para poder compararlas de un vistazo.
 *
 * La seccion llego a medir 1,8 pantallas en escritorio. Dos cosas la acortan:
 * cada paquete lista solo lo que anade al anterior ("Todo lo de «100%», mas:")
 * en vez de repetirlo, y los espacios de la tarjeta son mas apretados. El
 * contraste entre paquetes sigue estando en el precio y en el panel oscuro,
 * no en el aire alrededor.
 */
export function Pricing({
  packages,
  labels,
  whatsappNumber,
}: {
  packages: PackageItem[]
  labels: PricingLabels
  whatsappNumber: string
}) {
  const [active, setActive] = useState(0)
  const rowRef = useRef<HTMLDivElement>(null)
  // Que lado de la fila de pestanas tiene mas contenido fuera de pantalla.
  const [overflow, setOverflow] = useState({ left: false, right: false })

  const measure = () => {
    const row = rowRef.current
    if (!row) return
    setOverflow({
      left: row.scrollLeft > 4,
      right: row.scrollLeft + row.clientWidth < row.scrollWidth - 4,
    })
  }

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // La pestana elegida se centra en la fila: asi nunca queda cortada y se
  // asoman las vecinas, que es lo que le dice a quien llega por primera vez
  // que hay mas paquetes a los lados.
  useEffect(() => {
    const row = rowRef.current
    const tab = row?.children[active] as HTMLElement | undefined
    if (!row || !tab) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    row.scrollTo({
      left: tab.offsetLeft - (row.clientWidth - tab.offsetWidth) / 2,
      behavior: reduce ? 'auto' : 'smooth',
    })
  }, [active])

  return (
    <section
      id="newpricingplans"
      className="bg-sand-100 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={labels.eyebrow}
          heading={labels.heading}
          intro={labels.subheading}
        />

        {/* Pestanas: solo en movil y tablet. Subrayado que se desplaza en vez
            de pildoras: la pestana activa se lee igual y no parece un boton
            de compra. */}
        <div className="relative mt-8 lg:hidden">
          <div
            ref={rowRef}
            onScroll={measure}
            className="snap-row relative -mx-5 flex gap-6 overflow-x-auto border-b border-ink-200 px-5 sm:-mx-6 sm:px-6"
            role="tablist"
          >
            {packages.map((p, i) => (
              <button
                key={p.id}
                id={`paquete-tab-${p.id}`}
                role="tab"
                aria-selected={i === active}
                aria-controls={`paquete-${p.id}`}
                onClick={() => setActive(i)}
                className={`relative shrink-0 whitespace-nowrap py-3 text-[15px] transition-colors duration-300 ${
                  i === active
                    ? 'text-ink-900'
                    : 'text-ink-400 hover:text-ink-900'
                }`}
              >
                {/* En la pestana solo el nombre: el detalle entre parentesis
                    ("(apartamentos hasta 40 m2)") ya sale en la tarjeta. */}
                {p.title.replace(/\s*\([^)]*\)\s*$/, '')}
                <span
                  aria-hidden
                  className={`absolute inset-x-0 -bottom-px h-0.5 origin-left bg-ink-900 transition-transform duration-500 ease-out-expo ${
                    i === active ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Desvanecido en el borde que tiene mas pestanas fuera de pantalla. */}
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-y-0 -left-5 w-10 bg-linear-to-r from-sand-100 to-transparent transition-opacity duration-300 sm:-left-6 ${
              overflow.left ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-y-0 -right-5 w-10 bg-linear-to-l from-sand-100 to-transparent transition-opacity duration-300 sm:-right-6 ${
              overflow.right ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        {/* Tabla comparativa y no cuatro tarjetas: columnas separadas por un
            filete, con el paquete mas elegido en un panel de grafito que
            sobresale. `items-stretch` iguala las alturas, asi los botones
            quedan alineados aunque un titulo ocupe dos lineas. */}
        <div className="mt-2 grid lg:mt-14 lg:grid-cols-4 lg:items-stretch">
          {packages.map((p, i) => (
            <div
              key={p.id}
              id={`paquete-${p.id}`}
              className={`${i === active ? 'block animate-fade-in lg:animate-none' : 'hidden lg:block'} lg:h-full`}
              role="tabpanel"
              aria-labelledby={`paquete-tab-${p.id}`}
            >
              <Card
                pkg={p}
                labels={labels}
                whatsappNumber={whatsappNumber}
                first={i === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Card({
  pkg,
  labels,
  whatsappNumber,
  first,
}: {
  pkg: PackageItem
  labels: PricingLabels
  whatsappNumber: string
  first: boolean
}) {
  const waUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
    labels.contactMessage.replace('{title}', pkg.title),
  )}`
  const dark = pkg.popular

  return (
    <article
      className={`relative flex h-full flex-col px-1 py-6 sm:px-2 lg:px-6 lg:py-8 ${
        dark
          ? '-mx-5 bg-ink-900 px-6! text-white sm:mx-0 sm:rounded-sm lg:-my-4 lg:h-[calc(100%+2rem)] lg:py-12! lg:shadow-raised'
          : `text-ink-800 ${first ? '' : 'lg:border-l lg:border-ink-200'}`
      }`}
    >
      {/* Tres tratamientos que no compiten entre si: `popular` invierte la
          columna entera a grafito; `badge` (el paquete de alquiler corto)
          lleva un icono de casa junto al rotulo, para que se lea como "esto
          es para Airbnb" de un vistazo y no solo por el texto. Los rotulos
          van en minusculas y sin interletrado: en versalitas espaciadas eran
          el tic de plantilla mas repetido del sitio. */}
      <div className="mb-3 h-5">
        {pkg.popular && (
          <span className="inline-flex items-center gap-2 text-sm text-gold">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
            {labels.popular}
          </span>
        )}
        {!pkg.popular && pkg.badge && (
          <span className="inline-flex items-center gap-1.5 text-sm text-accent">
            <HouseIcon />
            {pkg.badge}
          </span>
        )}
      </div>

      <h3
        className={`text-balance text-[1.6rem] leading-[1.05] ${
          dark ? 'text-white' : 'text-ink-900'
        }`}
      >
        {pkg.title}
      </h3>

      {pkg.subtitle && (
        <p
          className={`mt-2 text-sm leading-relaxed ${dark ? 'text-white/65' : 'text-ink-500'}`}
        >
          {pkg.subtitle}
        </p>
      )}

      <p
        className={`mt-5 font-display text-[2.25rem] font-medium leading-none tracking-[-0.02em] ${
          dark ? 'text-white' : 'text-ink-900'
        }`}
      >
        {pkg.price}
      </p>

      {pkg.time && (
        <p
          className={`mt-2 text-sm ${dark ? 'text-white/65' : 'text-ink-400'}`}
        >
          {labels.duration}: {pkg.time}
        </p>
      )}

      <div
        className={`mt-5 flex-1 border-t pt-5 text-sm leading-snug ${
          dark ? 'border-white/15' : 'border-ink-200'
        }`}
      >
        {/* La base va como frase, no como una linea mas con su check: es
            un resumen de lo de arriba, no una cosa incluida. */}
        {pkg.includes && (
          <p className={`mb-3 font-medium ${dark ? 'text-white' : 'text-ink-900'}`}>
            {pkg.includes}
          </p>
        )}
        <ul className="space-y-2.5">
          {pkg.features.map((f, i) => (
            <li key={i} className="flex gap-2.5">
              <Check popular={dark} />
              <span className={dark ? 'text-white/85' : 'text-ink-600'}>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 space-y-1">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-colors duration-300 ${
            dark
              ? 'bg-gold text-ink-900 hover:bg-white'
              : 'bg-ink-900 text-white hover:bg-accent'
          }`}
        >
          {labels.cta}
        </a>

        {pkg.pdfUrl && (
          <a
            href={pkg.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex min-h-11 w-full items-center justify-center gap-1.5 px-2 text-sm transition-colors ${
              dark
                ? 'text-white/65 hover:text-white'
                : 'text-ink-500 hover:text-ink-900'
            }`}
          >
            <svg
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5 shrink-0"
              fill="none"
              aria-hidden
            >
              <path
                d="M8 1v9m0 0L5 7m3 3l3-3M2 12v2h12v-2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {labels.pdf}
          </a>
        )}
        {/* En escritorio las columnas van lado a lado: sin este hueco, el
            boton de un paquete sin PDF quedaba mas abajo que los demas. */}
        {!pkg.pdfUrl && <div aria-hidden className="hidden min-h-11 lg:block" />}
      </div>
    </article>
  )
}

function HouseIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden>
      <path
        d="M2 7.5 8 2l6 5.5M3.5 6.5V13h9V6.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Check({ popular }: { popular: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`mt-px h-4 w-4 shrink-0 ${popular ? 'text-accent-light' : 'text-accent'}`}
      fill="none"
      aria-hidden
    >
      <path
        d="M3 8.5l3.5 3.5L13 5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
