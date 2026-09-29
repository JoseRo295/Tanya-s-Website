export type FaqItem = { id: string; question: string; answer: string }

/**
 * Server component a proposito: es `<details>` nativo, no necesita estado ni
 * JavaScript. El navegador ya sabe abrir y cerrar, y —lo que importa aqui— la
 * respuesta viaja dentro del HTML aunque este plegada, asi que los buscadores
 * la leen igual.
 *
 * La apertura se anima en CSS (`::details-content` + `interpolate-size`, ver
 * globals.css). Donde el navegador no lo soporta abre de golpe, como antes.
 *
 * En escritorio el titular se queda fijo a la izquierda mientras la lista
 * corre a la derecha: con ocho o diez preguntas, el lector no pierde de vista
 * de que va la seccion.
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

  const showEyebrow =
    eyebrow.trim().toLowerCase() !== heading.trim().toLowerCase()

  return (
    <section id="faq" className="bg-white py-20 sm:py-28 lg:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            {showEyebrow && (
              <p className="mb-6 flex items-center gap-3 text-sm text-accent">
                <span aria-hidden className="h-px w-6 bg-gold" />
                {eyebrow}
              </p>
            )}
            <h2 className="max-w-[12ch] text-balance text-[clamp(2.4rem,5.5vw,4.25rem)] leading-[0.98] text-ink-900">
              {heading}
            </h2>
            {subheading && (
              <p className="mt-6 max-w-sm text-pretty text-lg leading-relaxed text-ink-500">
                {subheading}
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-ink-200 lg:col-span-7">
          {items.map((item) => (
            <details key={item.id} className="group border-b border-ink-200">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
                {/* `font-sans` explicito: el CSS global pone serif en todo
                    h1/h2/h3, y en una lista de preguntas eso se lee como
                    texto de libro. La serif se reserva para el titular. */}
                <h3 className="text-pretty font-sans text-lg font-normal leading-snug tracking-normal text-ink-900 transition-colors duration-300 group-hover:text-accent">
                  {item.question}
                </h3>
                <span
                  aria-hidden
                  className="relative mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink-200 text-ink-800 transition-[background-color,border-color,color,rotate] duration-500 ease-out-expo group-open:rotate-45 group-open:border-ink-900 group-open:bg-ink-900 group-open:text-white"
                >
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
                    <path
                      d="M8 3v10M3 8h10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </summary>
              <p className="max-w-[62ch] pb-7 pr-12 text-pretty leading-[1.7] text-ink-500">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
