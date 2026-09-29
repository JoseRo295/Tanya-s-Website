'use client'

import { useEffect, useState } from 'react'
import { SanityPicture } from './SanityPicture'
import type { HeroSlide } from '@/sanity/queries'

const SLIDE_MS = 6500

/**
 * Carrusel de portada sin Swiper (ahorra ~150 KB de JS): un crossfade entre
 * imagenes apiladas. Solo la primera se marca `priority` porque es el LCP;
 * el resto carga perezoso mientras el visitante lee el titular.
 *
 * Es el unico sitio de la pagina con una entrada orquestada: la foto se abre
 * desde un marco (`animate-unframe`), las palabras del titular suben una tras
 * otra y al final aparece la llamada. Todo lo demas del sitio se mueve poco a
 * proposito, para que este momento se note.
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

  // Un temporizador por foto (no un intervalo fijo): al elegir una a mano, la
  // cuenta vuelve a empezar y la barra del selector sigue cuadrando.
  useEffect(() => {
    if (count <= 1) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const id = setTimeout(() => setIndex((i) => (i + 1) % count), SLIDE_MS)
    return () => clearTimeout(id)
  }, [count, index])

  const words = titleLine1.split(/\s+/).filter(Boolean)
  // Retardo tras el que termina de subir la ultima palabra.
  const afterTitle = 500 + words.length * 70

  return (
    <section
      id="home"
      className="relative flex h-[100svh] min-h-[600px] w-full flex-col justify-end overflow-hidden bg-ink-900"
    >
      <div className="absolute inset-0 animate-unframe">
        {slides.map((slide, i) => (
          <div
            key={slide._id}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-[1600ms] ease-out ${
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

        {/* Oscurece solo donde hay texto: arriba para el menu y abajo para el
            titular. Antes un velo uniforme apagaba la foto entera, y la foto
            es precisamente lo que vende. */}
        <div
          className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-ink-900/55 to-transparent"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[75%] bg-linear-to-t from-ink-900/90 via-ink-900/45 to-transparent"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-8 sm:px-6 sm:pb-10 lg:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-8">
          <h1 className="text-balance text-[clamp(3rem,10.5vw,8.25rem)] font-medium leading-[0.92] tracking-[-0.025em] text-white lg:col-span-8">
            {words.map((word, i) => (
              /* Cada palabra dentro de su mascara: asi el efecto funciona se
                 parta el titular en las lineas que se parta. */
              <span
                key={i}
                className="inline-block overflow-hidden pb-[0.08em] align-bottom"
              >
                <span
                  className="inline-block animate-rise"
                  style={{ animationDelay: `${450 + i * 70}ms` }}
                >
                  {word}
                  {i < words.length - 1 ? ' ' : ''}
                </span>
              </span>
            ))}
          </h1>

          <div
            className="animate-fade-up lg:col-span-4 lg:pb-3"
            style={{ animationDelay: `${afterTitle}ms` }}
          >
            {titleLine2 && (
              <p className="max-w-sm text-pretty text-lg leading-snug text-white/85 sm:text-xl">
                {titleLine2}
              </p>
            )}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 text-[15px] font-medium text-ink-900 transition-colors duration-300 hover:bg-gold"
            >
              {buttonLabel}
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-900 text-white transition-transform duration-500 ease-out-expo group-hover:rotate-[-45deg]">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M2 8h11M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </div>
        </div>

        {/* Pie de la portada: selector de fotos con su temporizador, y el
            aviso para bajar. Los segmentos dicen cuantas fotos hay, cual se
            ve y cuanto falta para la siguiente, que los puntos no decian. */}
        <div
          className="mt-10 flex animate-fade-in items-center gap-6 border-t border-white/20 pt-5 sm:mt-14"
          style={{ animationDelay: `${afterTitle + 200}ms` }}
        >
          {count > 1 && (
            <div className="flex flex-1 gap-2 sm:max-w-xs">
              {slides.map((slide, i) => (
                <button
                  key={slide._id}
                  onClick={() => setIndex(i)}
                  aria-label={`${i + 1} / ${count}`}
                  aria-current={i === index}
                  className="group relative h-6 flex-1"
                >
                  <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 overflow-hidden rounded-full bg-white/25 transition-colors group-hover:bg-white/45">
                    <span
                      key={i === index ? `on-${index}` : 'off'}
                      /* Con "reducir movimiento" no hay avance automatico, y
                         el CSS global reduce esta animacion a 0 ms: la barra
                         activa sale llena, que es lo correcto. */
                      className={`absolute inset-0 origin-left rounded-full bg-white ${
                        i === index
                          ? 'animate-slide-timer'
                          : i < index
                            ? 'opacity-50'
                            : 'scale-x-0'
                      }`}
                      style={
                        i === index
                          ? { animationDuration: `${SLIDE_MS}ms` }
                          : undefined
                      }
                    />
                  </span>
                </button>
              ))}
            </div>
          )}

          <a
            href="#tras-portada"
            className="ml-auto flex items-center gap-2 text-sm text-white/75 transition-colors hover:text-white"
          >
            {scrollHint}
            <svg
              className="h-4 w-4 animate-bounce"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
            >
              <path
                d="M8 2v11M4 9l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Ancla al borde inferior: lleva a lo que venga despues sin depender de
          que la seccion siguiente exista (la de argumentos se omite si el
          panel no tiene ninguno). El margen negativo anula el hueco que se
          reserva al header fijo, que aqui no hace falta. */}
      <span
        id="tras-portada"
        aria-hidden
        className="absolute bottom-0 [scroll-margin-top:-5rem]"
      />
    </section>
  )
}
