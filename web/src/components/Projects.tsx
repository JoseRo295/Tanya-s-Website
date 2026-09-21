'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { SanityPicture } from './SanityPicture'
import { Reveal } from './Reveal'
import type { SanityImg } from '@/sanity/queries'

/**
 * Los textos llegan ya resueltos al idioma actual desde el server component.
 * Asi el navegador no descarga las tres traducciones de cada proyecto.
 */
export type ProjectItem = {
  id: string
  title: string
  description: string
  cover: SanityImg
  gallery: SanityImg[]
}

export type ProjectLabels = {
  eyebrow: string
  heading: string
  subheading: string
  details: string
  close: string
  cta: string
  prev: string
  next: string
  /** Plantilla con {title}. No puede ser una funcion: los props que cruzan
   *  del server component al cliente tienen que ser serializables. */
  contactMessage: string
}

/**
 * Antes los proyectos vivian dentro de un carrusel de Swiper, asi que solo se
 * veian 2 o 3 a la vez y el resto quedaba fuera del alcance visual (y del
 * texto que lee Google). Ahora es una rejilla: todos los proyectos estan en el
 * HTML desde el primer render, y el primero ocupa el doble de ancho para que
 * la seccion tenga jerarquia.
 */
export function Projects({
  items,
  labels,
  whatsappNumber,
}: {
  items: ProjectItem[]
  labels: ProjectLabels
  whatsappNumber: string
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { eyebrow, heading, subheading } = labels

  return (
    <section id="projectCarousel" className="bg-white py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center sm:mb-20">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {eyebrow}
          </p>
          <h2 className="text-balance text-[clamp(1.9rem,5vw,3.25rem)] font-semibold leading-tight text-ink-900">
            {heading}
          </h2>
          {subheading && (
            <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-400">
              {subheading}
            </p>
          )}
        </Reveal>

        {/* El primer proyecto ocupa 2 columnas y 2 filas en escritorio, asi que
            queda a la altura exacta de las dos tarjetas normales que tiene al
            lado y la rejilla no deja huecos. */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {items.map((item, i) => (
            <Reveal
              key={item.id}
              delay={Math.min(i, 5) * 60}
              className={i === 0 ? 'sm:col-span-2 lg:row-span-2 lg:h-full' : undefined}
            >
              <Card
                item={item}
                wide={i === 0}
                detailsLabel={labels.details}
                onOpen={() => setOpenIndex(i)}
              />
            </Reveal>
          ))}
        </div>
      </div>

      {openIndex !== null && (
        <Lightbox
          item={items[openIndex]}
          labels={labels}
          whatsappNumber={whatsappNumber}
          onClose={() => setOpenIndex(null)}
          onPrev={openIndex > 0 ? () => setOpenIndex(openIndex - 1) : undefined}
          onNext={
            openIndex < items.length - 1 ? () => setOpenIndex(openIndex + 1) : undefined
          }
        />
      )}
    </section>
  )
}

function Card({
  item,
  wide,
  detailsLabel,
  onOpen,
}: {
  item: ProjectItem
  wide: boolean
  detailsLabel: string
  onOpen: () => void
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group relative block w-full overflow-hidden rounded-2xl bg-ink-900 text-left shadow-[0_2px_16px_rgba(11,15,23,0.06)] transition-shadow duration-500 hover:shadow-[0_28px_60px_-20px_rgba(11,15,23,0.4)] ${
        wide ? 'lg:h-full' : ''
      }`}
    >
      <div
        className={`relative w-full ${
          wide ? 'aspect-16/10 lg:aspect-auto lg:h-full' : 'aspect-4/3'
        }`}
      >
        <SanityPicture
          image={item.cover}
          alt={item.title}
          sizes={
            wide
              ? '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw'
              : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
          }
          className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/25 to-transparent transition-opacity duration-500 group-hover:from-ink-900/95"
        aria-hidden
      />

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <h3
          className={`text-balance font-semibold leading-snug text-white ${
            wide ? 'text-xl sm:text-2xl' : 'text-lg'
          }`}
        >
          {item.title}
        </h3>

        {/* La descripcion aparece al pasar el cursor en pantallas grandes;
            en tactil no hay hover, asi que ahi se muestra siempre. */}
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/75 transition-all duration-500 md:max-h-0 md:translate-y-2 md:overflow-hidden md:opacity-0 md:group-hover:max-h-24 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          {item.description}
        </p>

        <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/90">
          {detailsLabel}
          <span className="text-[10px] transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
          <span className="ml-1 rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-medium normal-case tracking-normal backdrop-blur-sm">
            {item.gallery.length}
          </span>
        </span>
      </div>
    </button>
  )
}

function Lightbox({
  item,
  labels,
  whatsappNumber,
  onClose,
  onPrev,
  onNext,
}: {
  item: ProjectItem
  labels: ProjectLabels
  whatsappNumber: string
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
}) {
  const [slide, setSlide] = useState(0)
  const strip = useRef<HTMLDivElement>(null)
  const total = item.gallery.length

  const go = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(total - 1, next))
      setSlide(clamped)
      const el = strip.current?.children[clamped] as HTMLElement | undefined
      el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    },
    [total],
  )

  // Al cambiar de proyecto se vuelve a la primera foto.
  useEffect(() => {
    setSlide(0)
    strip.current?.scrollTo({ left: 0 })
  }, [item.id])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(slide + 1)
      if (e.key === 'ArrowLeft') go(slide - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [slide, go, onClose])

  // Mantiene los puntos sincronizados cuando se desliza con el dedo.
  const onScroll = () => {
    const el = strip.current
    if (!el) return
    const i = Math.round(el.scrollLeft / el.clientWidth)
    if (i !== slide) setSlide(i)
  }

  const waUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
    labels.contactMessage.replace('{title}', item.title),
  )}`

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[100] flex animate-fade-in items-center justify-center p-0 sm:p-6"
    >
      <button
        className="absolute inset-0 cursor-default bg-ink-900/92 backdrop-blur-sm"
        onClick={onClose}
        aria-label={labels.close}
        tabIndex={-1}
      />

      <div className="relative flex h-full w-full max-w-6xl flex-col overflow-hidden bg-white shadow-2xl sm:h-[88vh] sm:rounded-3xl lg:flex-row">
        {/* Galeria */}
        <div className="relative h-[42%] shrink-0 bg-ink-100 lg:h-full lg:w-[62%]">
          <div
            ref={strip}
            onScroll={onScroll}
            className="snap-row flex h-full w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden"
          >
            {item.gallery.map((img, i) => (
              <div
                key={img?.url ?? i}
                className="relative h-full w-full shrink-0 snap-start"
              >
                <SanityPicture
                  image={img}
                  alt={`${item.title} — ${i + 1}`}
                  sizes="(max-width: 1024px) 100vw, 62vw"
                  priority={i === 0}
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {total > 1 && (
            <>
              <Arrow
                side="left"
                disabled={slide === 0}
                onClick={() => go(slide - 1)}
                prevLabel={labels.prev}
                nextLabel={labels.next}
              />
              <Arrow
                side="right"
                disabled={slide === total - 1}
                onClick={() => go(slide + 1)}
                prevLabel={labels.prev}
                nextLabel={labels.next}
              />
              <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-ink-900/65 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {slide + 1} / {total}
              </div>
            </>
          )}
        </div>

        {/* Texto */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6 sm:p-8 lg:p-10">
          <h3 className="text-balance pr-10 text-2xl font-semibold leading-tight text-ink-900 sm:text-3xl">
            {item.title}
          </h3>
          <p className="mt-5 text-pretty leading-relaxed text-ink-500">
            {item.description}
          </p>

          <div className="mt-auto pt-8">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent sm:w-auto"
            >
              {labels.cta}
            </a>
          </div>

          {/* Saltar al proyecto anterior / siguiente sin cerrar el modal. */}
          {(onPrev || onNext) && (
            <div className="mt-6 flex justify-between border-t border-ink-100 pt-5 text-sm">
              <button
                onClick={onPrev}
                disabled={!onPrev}
                className="text-ink-400 transition-colors hover:text-ink-900 disabled:invisible"
              >
                &larr; {labels.prev}
              </button>
              <button
                onClick={onNext}
                disabled={!onNext}
                className="text-ink-400 transition-colors hover:text-ink-900 disabled:invisible"
              >
                {labels.next} &rarr;
              </button>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          aria-label={labels.close}
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ink-900/60 text-white backdrop-blur-md transition-all duration-300 hover:rotate-90 hover:bg-ink-900 lg:bg-white/85 lg:text-ink-900 lg:hover:bg-white"
        >
          <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden>
            <path
              d="M5 5l10 10M15 5L5 15"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

function Arrow({
  side,
  disabled,
  onClick,
  prevLabel,
  nextLabel,
}: {
  side: 'left' | 'right'
  disabled: boolean
  onClick: () => void
  prevLabel: string
  nextLabel: string
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={side === 'left' ? prevLabel : nextLabel}
      className={`absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-ink-900 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white disabled:pointer-events-none disabled:opacity-0 ${
        side === 'left' ? 'left-3' : 'right-3'
      }`}
    >
      <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d={side === 'left' ? 'M12 4l-6 6 6 6' : 'M8 4l6 6-6 6'}
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
