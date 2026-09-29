'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { SanityPicture } from './SanityPicture'
import { SectionHeading } from './SectionHeading'
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
  /** El alt se compone en el servidor: necesita el idioma y los datos del CMS. */
  coverAlt: string
  gallery: { image: SanityImg; alt: string }[]
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
 * Los proyectos van en un carril horizontal con scroll nativo (scroll-snap).
 * Con 8-9 proyectos apilados, en el movil la seccion pasaba de diez pantallas
 * y la gente se cansaba antes de llegar a Precios; ahora mide una pantalla
 * haya los proyectos que haya.
 *
 * No es el carrusel de Swiper de antes: aquel montaba las diapositivas con
 * JavaScript y Google no veia el texto de las que no estaban a la vista. Este
 * es CSS, asi que todas las tarjetas estan en el HTML del servidor y el carril
 * se desliza aunque el JavaScript no haya cargado. El orden lo decide el
 * campo `order` en Sanity: los tres primeros son los que ve todo el mundo.
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
  const { rail, bar, state, page } = useRail(items.length)
  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <section id="projectCarousel" className="bg-white py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={eyebrow}
          heading={heading}
          intro={subheading}
        />

        {/* Una sola fila: 1 tarjeta en movil, 2 en tablet y 3 en escritorio.
            El ancho sale de dividir entre 1.15 / 2.15 / 3.15 (descontando los
            huecos), y ese .15 sobrante es el trozo de la siguiente tarjeta que
            asoma por la derecha: dice "hay mas" sin escribirlo. La ultima se
            alinea al final para que el snap no impida llegar a ella.
            El `p-2 -m-2` deja sitio al contorno de foco (que va 3px por fuera
            de la tarjeta): sin el, el overflow del carril lo recortaba. */}
        <div className="@container relative mt-12 sm:mt-18">
          <div
            ref={rail}
            role="region"
            aria-label={heading}
            className="snap-row relative -m-2 flex scroll-px-2 snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain p-2 lg:gap-8"
          >
            {items.map((item, i) => (
              <div
                key={item.id}
                className="shrink-0 basis-[85%] snap-start last:snap-end sm:basis-[calc((100%-3rem)/2.15)] lg:basis-[calc((100%-6rem)/3.15)]"
              >
                <Card
                  item={item}
                  detailsLabel={labels.details}
                  onOpen={() => setOpenIndex(i)}
                />
              </div>
            ))}
          </div>

          {/* Flechas en los extremos del carril, centradas sobre las fotos
              (no sobre foto + texto). La capa mide lo mismo que una foto:
              el ancho de tarjeta de cada breakpoint x 5/4, en unidades del
              contenedor. Hacen falta las dos condiciones: raton o trackpad
              (en pantallas tactiles, tambien un telefono en horizontal o una
              tablet, se desliza con el dedo) y al menos 640px (a tamano de
              telefono nunca, aunque sea un simulador en el ordenador). Una
              flecha deshabilitada se desvanece, asi al entrar solo se ve la
              de "siguiente". */}
          {state.overflow && (
            <div className="pointer-events-none absolute inset-x-0 top-0 hidden sm:h-[calc((100cqw-3rem)/2.15*1.25)] sm:pointer-fine:block lg:h-[calc((100cqw-6rem)/3.15*1.25)] [&>button]:pointer-events-auto">
              <Arrow
                side="left"
                disabled={state.atStart}
                onClick={() => page(-1)}
                prevLabel={labels.prev}
                nextLabel={labels.next}
              />
              <Arrow
                side="right"
                disabled={state.atEnd}
                onClick={() => page(1)}
                prevLabel={labels.prev}
                nextLabel={labels.next}
              />
            </div>
          )}
        </div>

        {/* Solo aparecen si hay mas proyectos de los que caben; sin
            JavaScript, o con pocos proyectos, el carril se basta solo. */}
        {state.overflow && (
          <div className="mt-6 flex items-center gap-5">
            {/* La parte dorada es lo ya visto: al entrar ya marca los tres
                primeros, asi se lee "llevas 3 de 10" y no una barra vacia. */}
            <div aria-hidden className="h-px flex-1 bg-ink-100">
              <div
                ref={bar}
                className="h-full origin-left bg-gold transition-transform duration-300 ease-out"
              />
            </div>
            <p className="shrink-0 text-sm tabular-nums text-ink-400">
              <span className="text-ink-900">{pad(state.lastVisible)}</span>
              {' / '}
              {pad(items.length)}
            </p>
          </div>
        )}
      </div>

      {openIndex !== null && (
        <Lightbox
          item={items[openIndex]}
          labels={labels}
          whatsappNumber={whatsappNumber}
          onClose={() => setOpenIndex(null)}
          onPrev={openIndex > 0 ? () => setOpenIndex(openIndex - 1) : undefined}
          onNext={
            openIndex < items.length - 1
              ? () => setOpenIndex(openIndex + 1)
              : undefined
          }
        />
      )}
    </section>
  )
}

type RailState = {
  overflow: boolean
  atStart: boolean
  atEnd: boolean
  /** Cuantas tarjetas se han visto enteras, contando desde la primera. */
  lastVisible: number
}

/**
 * Todo lo que el carril necesita de JavaScript: saber donde esta para el
 * contador, la barra y las flechas, y avanzar una pagina con las flechas.
 * El desplazamiento en si es el scroll nativo del navegador.
 */
function useRail(total: number) {
  const rail = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<RailState>({
    overflow: false,
    atStart: true,
    atEnd: false,
    lastVisible: 1,
  })

  useEffect(() => {
    const el = rail.current
    if (!el) return
    let frame = 0

    const measure = () => {
      const { scrollLeft, clientWidth, scrollWidth } = el
      const right = scrollLeft + clientWidth
      // Para contar tarjetas vistas no vale el padding que reserva sitio al
      // contorno de foco: una tarjeta tapada por el no se ve entera.
      const cardsEdge = right - parseFloat(getComputedStyle(el).paddingRight)
      const cards = Array.from(el.children) as HTMLElement[]
      // Margen de 2px: con anchos en calc() los bordes caen en medio pixel.
      const seen = cards.filter((c) => c.offsetLeft + c.offsetWidth <= cardsEdge + 2).length
      const next: RailState = {
        overflow: scrollWidth > clientWidth + 2,
        atStart: scrollLeft <= 2,
        atEnd: right >= scrollWidth - 2,
        lastVisible: Math.min(total, Math.max(1, seen)),
      }
      setState((prev) =>
        prev.overflow === next.overflow &&
        prev.atStart === next.atStart &&
        prev.atEnd === next.atEnd &&
        prev.lastVisible === next.lastVisible
          ? prev
          : next,
      )
      // La barra se mueve por ref: re-renderizar en cada frame de scroll
      // repintaria todas las tarjetas para cambiar un ancho.
      if (bar.current) {
        bar.current.style.transform = `scaleX(${Math.min(1, right / scrollWidth)})`
      }
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }

    // El observer mide nada mas empezar a observar, asi que tambien hace la
    // primera medida al montar.
    const observer = new ResizeObserver(onScroll)
    observer.observe(el)
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      el.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [total, state.overflow])

  /** Avanza (1) o retrocede (-1) tantas tarjetas como caben enteras. */
  const page = (dir: 1 | -1) => {
    const el = rail.current
    const [a, b] = Array.from(el?.children ?? []) as HTMLElement[]
    if (!el || !a) return
    const step = b ? b.offsetLeft - a.offsetLeft : a.offsetWidth
    const perPage = Math.max(1, Math.floor((el.clientWidth + step - a.offsetWidth) / step))
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: dir * perPage * step, behavior: reduce ? 'auto' : 'smooth' })
  }

  return { rail, bar, state, page }
}

function Chevron({ side }: { side: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden>
      <path
        d={side === 'left' ? 'M12 4l-6 6 6 6' : 'M8 4l6 6-6 6'}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Card({
  item,
  detailsLabel,
  onOpen,
}: {
  item: ProjectItem
  detailsLabel: string
  onOpen: () => void
}) {
  /* La foto limpia, sin degradado encima: el velo oscuro para que se leyera
     el titulo tapaba justo la parte baja del interior, y el titulo se lee
     mejor debajo, como el pie de una lamina.
     Sin `.reveal-photo`: esa animacion sigue al contenedor con scroll mas
     cercano, que aqui es el carril (horizontal), y las tarjetas fuera de
     vista se quedaban recortadas. */
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group block w-full text-left"
    >
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-sm bg-sand-100">
        <SanityPicture
          image={item.cover}
          alt={item.coverAlt}
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 30vw"
          className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.035]"
        />

        {/* Cuantas fotos hay dentro: dice que la tarjeta se abre y cuanto
            material espera al otro lado. */}
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs text-ink-800 backdrop-blur-sm">
          <svg
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5"
            fill="none"
            aria-hidden
          >
            <rect
              x="2"
              y="3.5"
              width="12"
              height="9"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <path
              d="M2.5 11l3.5-3.5 3 3 2-2 2.5 2.5"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
          </svg>
          {item.gallery.length}
        </span>
      </div>

      <div className="mt-5 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <h3 className="text-balance text-[clamp(1.4rem,2vw,1.75rem)] leading-[1.1] text-ink-900 transition-colors duration-300 group-hover:text-accent">
            {item.title}
          </h3>
          {item.description && (
            <p className="mt-2 line-clamp-2 max-w-[52ch] text-pretty text-[15px] leading-relaxed text-ink-500">
              {item.description}
            </p>
          )}
        </div>

        <span className="mt-1.5 hidden shrink-0 items-center gap-2 text-sm text-ink-800 sm:inline-flex">
          <span className="relative">
            {detailsLabel}
            <span
              aria-hidden
              className="absolute inset-x-0 -bottom-0.5 h-px origin-right scale-x-0 bg-gold transition-transform duration-500 ease-out-expo group-hover:origin-left group-hover:scale-x-100"
            />
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
      el?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      })
    },
    [total],
  )

  // Al cambiar de proyecto se vuelve a la primera foto. El contador se
  // reinicia durante el render (no en un efecto, que pintaba un frame con el
  // numero viejo); el efecto solo mueve el scroll, que es DOM.
  const [shownId, setShownId] = useState(item.id)
  if (shownId !== item.id) {
    setShownId(item.id)
    setSlide(0)
  }
  useEffect(() => {
    strip.current?.scrollTo({ left: 0 })
  }, [item.id])

  // Bloquea el fondo, lleva el foco al boton de cerrar y, al salir, lo
  // devuelve a la tarjeta desde la que se abrio (sin esto, quien navega con
  // teclado volvia al principio de la pagina).
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = ''
      opener?.focus?.({ preventScroll: true })
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
      className="fixed inset-0 z-100 flex items-center justify-center p-0 sm:p-6"
    >
      <button
        className="absolute inset-0 animate-fade-in cursor-default bg-ink-900/90 backdrop-blur-sm"
        onClick={onClose}
        aria-label={labels.close}
        tabIndex={-1}
      />

      <div className="relative flex h-full w-full max-w-6xl animate-dialog-in flex-col overflow-hidden bg-sand-50 shadow-overlay sm:h-[88vh] sm:rounded-md lg:flex-row">
        {/* Galeria */}
        <div className="relative h-[52%] shrink-0 bg-ink-100 lg:h-full lg:w-[64%]">
          <div
            ref={strip}
            onScroll={onScroll}
            className="snap-row flex h-full w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden"
          >
            {item.gallery.map((photo, i) => (
              <div
                key={photo.image?.url ?? i}
                className="relative h-full w-full shrink-0 snap-start"
              >
                <SanityPicture
                  image={photo.image}
                  alt={photo.alt}
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
          <h3 className="text-balance pr-10 text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.05] text-ink-900">
            {item.title}
          </h3>
          <p className="mt-5 text-pretty leading-relaxed text-ink-500">
            {item.description}
          </p>

          {/* Miniaturas en escritorio: con 10-18 fotos por proyecto, ir de
              una en una con las flechas era la unica forma de llegar a la
              ultima. En movil sobra: ahi se desliza con el dedo. */}
          {total > 1 && (
            <div className="mt-8 hidden grid-cols-5 gap-1.5 lg:grid">
              {item.gallery.map((photo, i) => (
                <button
                  key={photo.image?.url ?? i}
                  onClick={() => go(i)}
                  aria-label={`${i + 1} / ${total}`}
                  aria-current={i === slide}
                  className={`relative aspect-square overflow-hidden rounded-xs transition-opacity duration-300 ${
                    i === slide
                      ? 'opacity-100 ring-1 ring-ink-900 ring-offset-2 ring-offset-sand-50'
                      : 'opacity-55 hover:opacity-100'
                  }`}
                >
                  <SanityPicture
                    image={photo.image}
                    alt=""
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          <div className="mt-auto pt-8">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-accent sm:w-auto"
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
          ref={closeRef}
          onClick={onClose}
          aria-label={labels.close}
          className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-ink-900/60 text-white backdrop-blur-md transition-[rotate,background-color] duration-300 hover:rotate-90 hover:bg-ink-900 lg:bg-white/85 lg:text-ink-900 lg:hover:bg-white"
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
      <Chevron side={side} />
    </button>
  )
}
