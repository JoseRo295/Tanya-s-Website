/**
 * Encabezado de seccion numerado: `01 —— SOBRE MI`.
 *
 * Es el recurso mas reconocible del diseno editorial caro y no cuesta ni un
 * byte de JavaScript. Antes cada seccion abria con un eyebrow suelto, que es
 * lo que hace cualquier plantilla.
 *
 * El numero y la regla van en dorado brillante, que sobre papel da 2.33:1 y no
 * pasaria AA si fuese texto necesario. Van con `aria-hidden` justamente porque
 * no lo son: el nombre de la seccion, al lado, lleva el dorado oscuro legible y
 * es el que se anuncia.
 */
export function SectionLabel({
  number,
  children,
  align = 'left',
  tone = 'light',
}: {
  /** Ordinal de la seccion, 1-indexado. */
  number: number
  children: React.ReactNode
  align?: 'left' | 'center'
  /** `dark` para secciones sobre fondo tinta, donde el dorado sí es legible. */
  tone?: 'light' | 'dark'
}) {
  return (
    <div
      className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}
    >
      <span aria-hidden className="font-display text-sm tabular-nums text-gold">
        {String(number).padStart(2, '0')}
      </span>
      <span aria-hidden className="h-px w-8 bg-gold/50" />
      <span
        className={`text-xs font-semibold uppercase tracking-[0.25em] ${
          tone === 'dark' ? 'text-gold' : 'text-accent'
        }`}
      >
        {children}
      </span>
    </div>
  )
}
