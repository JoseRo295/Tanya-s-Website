import { Reveal } from './Reveal'
import { SectionLabel } from './SectionLabel'

export type FaqItem = { id: string; question: string; answer: string }

/**
 * Server component a proposito: es `<details>` nativo, no necesita estado ni
 * JavaScript. El navegador ya sabe abrir y cerrar, y —lo que importa aqui— la
 * respuesta viaja dentro del HTML aunque este plegada, asi que los buscadores
 * la leen igual.
 *
 * Esto es lo contrario de un acordeon hecho con `useState`, donde el texto
 * oculto suele no existir en el HTML hasta que alguien hace clic.
 */
export function Faq({
  items,
  eyebrow,
  heading,
  subheading,
}: {
  items: FaqItem[]
  eyebrow: string
  heading: string
  subheading: string
}) {
  if (items.length === 0) return null

  return (
    <section id="faq" className="bg-white py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-10 text-center sm:mb-14">
          <div className="mb-5">
            <SectionLabel number={4} align="center">
              {eyebrow}
            </SectionLabel>
          </div>
          <h2 className="text-balance text-[clamp(1.9rem,5vw,3.25rem)] font-semibold leading-tight text-ink-900">
            {heading}
          </h2>
          {subheading && (
            <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-400">
              {subheading}
            </p>
          )}
        </Reveal>

        <div className="divide-y divide-ink-100 border-y border-ink-100">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={Math.min(i, 6) * 50}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
                  {/* `font-sans` explicito: el CSS global pone serif en todo
                      h1/h2/h3, y en una lista de preguntas eso se lee como
                      texto de libro. La serif se reserva para el titular. */}
                  <h3 className="text-pretty font-sans text-[17px] font-medium leading-snug text-ink-900 group-hover:text-accent">
                    {item.question}
                  </h3>
                  <span
                    aria-hidden
                    className="mt-1 shrink-0 text-gold transition-transform duration-300 group-open:rotate-45"
                  >
                    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
                      <path
                        d="M8 3v10M3 8h10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="pb-6 pr-10 text-pretty leading-relaxed text-ink-500">
                  {item.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
