import { SectionHeading } from './SectionHeading'

export type ValuePropItem = {
  id: string
  /** Se sigue guardando en el panel, pero el diseño ya no pinta iconos. */
  icon: string
  title: string
  body: string
}

/**
 * El argumento de venta, justo despues de la portada.
 *
 * Antes la pagina saltaba del titular a "Sobre mi", asi que en los primeros
 * segundos no decia nada que la distinguiese de cualquier otro estudio de
 * Quito. Aqui van los tres motivos concretos para elegirla.
 *
 * Sobre fondo grafito y no sobre yeso: corta el bloque claro que va desde la
 * portada hasta los proyectos y obliga a leerlo. Los iconos en circulo se
 * quitaron: eran decoracion de plantilla y no decian nada que el titulo no
 * dijera. Cada argumento va en su columna, separado por un filete, como las
 * notas al margen de un plano.
 */
export function ValueProps({
  items,
  eyebrow,
  heading,
}: {
  items: ValuePropItem[]
  eyebrow: string
  heading: string
}) {
  if (items.length === 0) return null

  return (
    <section
      id="porQue"
      className="bg-ink-900 py-20 text-white sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={eyebrow} heading={heading} tone="dark" />

        {/* Misma rejilla de 12 que el encabezado, para que las columnas
            arranquen exactamente bajo el titular. */}
        <div className="mt-14 grid sm:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="grid gap-10 md:grid-cols-3 md:gap-8 lg:col-span-9 lg:col-start-4">
            {items.map((item) => (
              <div key={item.id} className="border-t border-gold/40 pt-6">
                <h3 className="text-pretty text-[1.75rem] leading-[1.1] text-white">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-[42ch] text-pretty leading-relaxed text-white/65">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
