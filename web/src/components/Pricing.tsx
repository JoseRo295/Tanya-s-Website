'use client'

import { useState } from 'react'
import { Reveal } from './Reveal'

export type PackageItem = {
  id: string
  slug: string
  title: string
  subtitle: string
  price: string
  time: string
  features: string[]
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

  return (
    <section id="newpricingplans" className="bg-sand-100 py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {labels.eyebrow}
          </p>
          <h2 className="text-balance text-[clamp(1.9rem,5vw,3.25rem)] font-semibold leading-tight text-ink-900">
            {labels.heading}
          </h2>
          {labels.subheading && (
            <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-400">
              {labels.subheading}
            </p>
          )}
        </Reveal>

        {/* Pestanas: solo en movil y tablet */}
        <div className="mb-8 lg:hidden">
          <div
            className="snap-row -mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1"
            role="tablist"
          >
            {packages.map((p, i) => (
              <button
                key={p.id}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`shrink-0 snap-start whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  i === active
                    ? 'bg-ink-900 text-white shadow-md'
                    : 'bg-white text-ink-500 hover:text-ink-900'
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>

        {/* `items-stretch` iguala la altura de las cuatro tarjetas, asi los
            botones quedan alineados aunque un titulo ocupe dos lineas. */}
        <div className="grid gap-6 lg:grid-cols-4 lg:items-stretch">
          {packages.map((p, i) => (
            <div
              key={p.id}
              className={`${i === active ? 'block' : 'hidden lg:block'} lg:h-full`}
              role="tabpanel"
            >
              <Reveal delay={Math.min(i, 3) * 80} className="lg:h-full">
                <Card pkg={p} labels={labels} whatsappNumber={whatsappNumber} />
              </Reveal>
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
}: {
  pkg: PackageItem
  labels: PricingLabels
  whatsappNumber: string
}) {
  const waUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
    labels.contactMessage.replace('{title}', pkg.title),
  )}`

  return (
    <article
      className={`relative flex h-full flex-col rounded-3xl p-6 transition-all duration-500 sm:p-7 ${
        pkg.popular
          ? 'bg-ink-900 text-white shadow-[0_24px_60px_-20px_rgba(11,15,23,0.5)] lg:-translate-y-3'
          : 'border border-ink-100 bg-white text-ink-800 hover:-translate-y-1 hover:shadow-xl'
      }`}
    >
      {pkg.popular && (
        <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
          {labels.popular}
        </span>
      )}

      <h3
        className={`text-balance text-xl font-semibold leading-tight ${
          pkg.popular ? 'text-white' : 'text-ink-900'
        }`}
      >
        {pkg.title}
      </h3>

      {pkg.subtitle && (
        <p
          className={`mt-2 text-sm leading-relaxed ${
            pkg.popular ? 'text-white/60' : 'text-ink-400'
          }`}
        >
          {pkg.subtitle}
        </p>
      )}

      <p
        className={`mt-6 font-display text-3xl font-semibold ${
          pkg.popular ? 'text-white' : 'text-ink-900'
        }`}
      >
        {pkg.price}
      </p>

      {pkg.time && (
        <p
          className={`mt-1.5 text-xs uppercase tracking-wider ${
            pkg.popular ? 'text-white/50' : 'text-ink-400'
          }`}
        >
          {labels.duration}: {pkg.time}
        </p>
      )}

      <ul
        className={`mt-7 flex-1 space-y-3 border-t pt-7 text-sm ${
          pkg.popular ? 'border-white/15' : 'border-ink-100'
        }`}
      >
        {pkg.features.map((f, i) => (
          <li key={i} className="flex gap-2.5">
            <Check popular={pkg.popular} />
            <span className={pkg.popular ? 'text-white/80' : 'text-ink-500'}>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 space-y-2.5">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
            pkg.popular
              ? 'bg-white text-ink-900 hover:bg-accent hover:text-white'
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
            className={`flex w-full items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-xs font-medium transition-colors ${
              pkg.popular
                ? 'text-white/60 hover:text-white'
                : 'text-ink-400 hover:text-ink-900'
            }`}
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
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
      </div>
    </article>
  )
}

function Check({ popular }: { popular: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`mt-0.5 h-4 w-4 shrink-0 ${popular ? 'text-accent-light' : 'text-accent'}`}
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
