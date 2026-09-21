import { PortableText, type PortableTextBlock } from 'next-sanity'
import { SanityPicture } from './SanityPicture'
import { Reveal } from './Reveal'
import type { SanityImg } from '@/sanity/queries'

/**
 * Server component: el texto viaja en el HTML, que es lo que indexa Google.
 * Los parrafos vienen de Portable Text, asi que Tanya los controla desde el
 * panel (antes el codigo los partia buscando ". ", y un punto de mas rompia
 * el formato).
 */
export function AboutMe({
  photo,
  body,
  eyebrow,
  heading,
  name,
}: {
  photo: SanityImg
  body: PortableTextBlock[]
  eyebrow: string
  heading: string
  name: string
}) {
  return (
    <section id="aboutMe" className="bg-sand-50 py-20 sm:py-28 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <Reveal className="order-2 lg:order-1">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {eyebrow}
          </p>
          <h2 className="mb-8 text-balance text-[clamp(1.9rem,4.5vw,3rem)] font-semibold leading-tight text-ink-900">
            {heading}
          </h2>

          <div className="space-y-5 text-[17px] leading-relaxed text-ink-500 [&_strong]:text-ink-800">
            <PortableText value={body} />
          </div>

          <div className="mt-10 flex items-center gap-4 border-t border-ink-100 pt-8">
            <span className="h-px w-10 bg-accent" aria-hidden />
            <p className="font-display text-lg text-ink-800">{name}</p>
          </div>
        </Reveal>

        <Reveal delay={120} className="order-1 lg:order-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none">
            {/* Marco desplazado: da profundidad sin cargar otra imagen. */}
            <div
              className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl border border-sand-300 sm:-bottom-6 sm:-right-6"
              aria-hidden
            />
            <div className="relative h-full w-full overflow-hidden rounded-2xl bg-sand-200 shadow-[0_24px_60px_-20px_rgba(11,15,23,0.35)]">
              <SanityPicture
                image={photo}
                alt={name}
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover transition-transform duration-[1.2s] ease-out hover:scale-[1.04]"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
