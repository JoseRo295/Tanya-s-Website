/**
 * Encabezado de seccion, a la manera del cajetin de un plano: una columna
 * estrecha con el nombre de la seccion y, al lado, el titular grande.
 *
 * Sustituye al viejo `01 —— SOBRE MI`. Los numeros sugerian una secuencia que
 * no existe (las secciones no son pasos) y las versalitas espaciadas sobre
 * cada titular son el sello mas reconocible de una plantilla. Ademas el rotulo
 * repetia a menudo el propio titular ("Proyectos / Proyectos"): ahora, si
 * dicen lo mismo, el rotulo no se pinta.
 */
export function SectionHeading({
  eyebrow,
  heading,
  intro,
  tone = 'light',
  as: Tag = 'h2',
  className = '',
}: {
  eyebrow?: string
  heading: string
  intro?: string
  tone?: 'light' | 'dark'
  as?: 'h2' | 'h3'
  className?: string
}) {
  const showEyebrow =
    eyebrow && eyebrow.trim().toLowerCase() !== heading.trim().toLowerCase()
  const dark = tone === 'dark'

  return (
    <div className={`grid gap-4 lg:grid-cols-12 lg:gap-8 ${className}`}>
      <div className="lg:col-span-3 lg:pt-4">
        {showEyebrow && (
          <p
            className={`flex items-center gap-3 text-sm ${dark ? 'text-gold' : 'text-accent'}`}
          >
            <span aria-hidden className="h-px w-6 bg-gold" />
            {eyebrow}
          </p>
        )}
      </div>

      <div className="lg:col-span-9">
        <Tag
          className={`max-w-[18ch] text-balance text-[clamp(2.4rem,6vw,4.75rem)] leading-[0.98] ${
            dark ? 'text-white' : 'text-ink-900'
          }`}
        >
          {heading}
        </Tag>
        {intro && (
          <p
            className={`mt-6 max-w-xl text-pretty text-lg leading-relaxed ${
              dark ? 'text-white/65' : 'text-ink-500'
            }`}
          >
            {intro}
          </p>
        )}
      </div>
    </div>
  )
}
