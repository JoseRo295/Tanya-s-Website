import { PortableText, type PortableTextBlock } from 'next-sanity'
import { SanityPicture } from './SanityPicture'
import type { SanityImg } from '@/sanity/queries'

/**
 * Server component: el texto viaja en el HTML, que es lo que indexa Google.
 * Los parrafos vienen de Portable Text, asi que Tanya los controla desde el
 * panel (antes el codigo los partia buscando ". ", y un punto de mas rompia
 * el formato).
 *
 * El nombre es el titular y va enorme: en un estudio de una sola persona la
 * persona es la marca. El rol pasa a ser el pie de la foto, que es donde un
 * lector lo busca.
 */
export function AboutMe({
  photo,
  body,
  eyebrow,
  heading,
  name,
  photoAlt,
}: {
  photo: SanityImg
  body: PortableTextBlock[]
  eyebrow: string
  heading: string
  name: string
  /** Descriptivo y ya traducido: antes aqui iba el rotulo "Project Lead". */
  photoAlt: string
}) {
  return (
    <section id="aboutMe" className="bg-sand-50 py-20 sm:py-28 lg:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <figure className="lg:col-span-5">
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-sm bg-sand-200">
            <div className="reveal-photo absolute inset-0">
              <SanityPicture
                image={photo}
                alt={photoAlt}
                sizes="(max-width: 1024px) 92vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
          <figcaption className="mt-4 flex items-center gap-3 text-sm text-ink-500">
            <span aria-hidden className="h-px w-6 bg-gold" />
            {name}
          </figcaption>
        </figure>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-10">
          <p className="mb-6 flex items-center gap-3 text-sm text-accent">
            <span aria-hidden className="h-px w-6 bg-gold" />
            {eyebrow}
          </p>
          <h2 className="text-balance text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] text-ink-900">
            {heading}
          </h2>

          {/* El primer parrafo hace de entradilla: mas grande y en tinta
              plena, para que quien solo lee eso ya sepa lo esencial. */}
          <div className="mt-10 max-w-[60ch] space-y-5 text-[17px] leading-[1.7] text-ink-500 [&_strong]:font-medium [&_strong]:text-ink-800 [&>p:first-child]:text-xl [&>p:first-child]:leading-snug [&>p:first-child]:text-ink-800">
            <PortableText value={body} />
          </div>
        </div>
      </div>
    </section>
  )
}
