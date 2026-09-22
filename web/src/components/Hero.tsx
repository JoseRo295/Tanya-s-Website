'use client'

import { useEffect, useState } from 'react'
import { SanityPicture } from './SanityPicture'
import type { HeroSlide } from '@/sanity/queries'

/**
 * Carrusel de portada sin Swiper (ahorra ~150 KB de JS): un crossfade entre
 * imagenes apiladas. Solo la primera se marca `priority` porque es el LCP;
 * el resto carga perezoso mientras el visitante lee el titular.
 */
export function Hero({
  slides,
  titleLine1,
  titleLine2,
  buttonLabel,
  whatsappUrl,
  scrollHint,
  imageAlt,
}: {
  slides: HeroSlide[]
  titleLine1: string
  titleLine2: string
  buttonLabel: string
  whatsappUrl: string
  scrollHint: string
  /** Ya traducido en el servidor: el alt del CMS solo existe en ingles. */
  imageAlt: string
}) {
  const [index, setIndex] = useState(0)
  const count = slides.length

  useEffect(() => {
    if (count <= 1) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const id = setInterval(() => setIndex((i) => (i + 1) % count), 6000)
    return () => clearInterval(id)
  }, [count])

  return (
    <section
      id="home"
      className="relative flex h-[100svh] min-h-[560px] w-full items-center justify-center overflow-hidden bg-ink-900"
    >
      {slides.map((slide, i) => (
        <div
          key={slide._id}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* En movil se usa la foto vertical si existe; si no, se recorta la horizontal.
              Mientras las dos ramas sirven la misma foto, marcar `priority` en ambas
              precarga una sola URL y no cuesta nada. En cuanto exista una vertical
              propia serian dos descargas para un unico LCP, asi que entonces solo se
              precarga la de movil, que es donde la red duele. */}
          <div className="absolute inset-0 sm:hidden">
            <SanityPicture
              image={slide.mobile?.url ? slide.mobile : slide.desktop}
              alt={imageAlt}
              sizes="100vw"
              priority={i === 0}
              className={`object-cover ${i === index ? 'animate-ken-burns' : ''}`}
            />
          </div>
          <div className="absolute inset-0 hidden sm:block">
            <SanityPicture
              image={slide.desktop}
              alt={imageAlt}
              sizes="100vw"
              priority={i === 0 && !slide.mobile?.url}
              className={`object-cover ${i === index ? 'animate-ken-burns' : ''}`}
            />
          </div>
        </div>
      ))}

      {/* Degradado doble: oscurece arriba y abajo para que el texto siempre
          tenga contraste suficiente, sea cual sea la foto que toque. */}
      <div
        className="absolute inset-0 bg-linear-to-b from-ink-900/70 via-ink-900/35 to-ink-900/80"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h1 className="animate-fade-up text-balance font-display text-[clamp(2rem,7vw,4.5rem)] font-semibold leading-[1.08] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]">
          {titleLine1}
          <span className="mt-3 block text-[clamp(1.15rem,4vw,2.5rem)] font-light italic text-sand-200">
            {titleLine2}
          </span>
        </h1>

        <div
          className="animate-fade-up"
          style={{ animationDelay: '220ms' }}
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-base font-medium text-white shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white hover:text-ink-900"
          >
            {buttonLabel}
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
            >
              <path
                d="M1 8h13M9 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Puntos de navegacion */}
      {count > 1 && (
        <div className="absolute bottom-28 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-32">
          {slides.map((slide, i) => (
            <button
              key={slide._id}
              onClick={() => setIndex(i)}
              aria-label={`Ver imagen ${i + 1} de ${count}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? 'w-8 bg-white' : 'w-1.5 bg-white/45 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}

      <a
        href="#aboutMe"
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white sm:bottom-8 sm:text-[11px]"
      >
        {scrollHint}
        <span className="flex h-9 w-5 justify-center rounded-full border border-white/40 pt-1.5">
          <span className="h-1.5 w-0.5 animate-bounce rounded-full bg-white/80" />
        </span>
      </a>
    </section>
  )
}
