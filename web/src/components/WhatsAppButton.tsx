'use client'

import { useEffect, useState } from 'react'

/**
 * Aparece al bajar un poco para no tapar el boton del hero.
 * Es un enlace, no un <button> con window.open: asi se puede abrir en pestana
 * nueva, copiar el enlace, y funciona aunque el bloqueador de popups actue.
 */
export function WhatsAppButton({
  number,
  label,
}: {
  number: string
  label: string
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href={`https://wa.me/${number.replace(/\D/g, '')}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_24px_rgba(37,211,102,0.4)] transition-all duration-500 hover:scale-110 hover:bg-[#1FBA57] ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      {/* Pulso: llama la atencion sin animar la posicion del boton. */}
      <span
        className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20 [animation-duration:2.5s]"
        aria-hidden
      />
      <svg viewBox="0 0 24 24" className="relative h-7 w-7 fill-white" aria-hidden>
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.79 14.17c-.25.69-1.24 1.31-1.86 1.38-.5.06-1.11.08-1.79-.11-.41-.13-.94-.31-1.62-.6-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94s.73-2.09.99-2.37c.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.65.49.24.58.82 2 .89 2.14.07.14.12.31.02.5-.09.19-.14.31-.28.47-.14.17-.3.37-.42.5-.14.14-.29.29-.12.57.16.29.73 1.2 1.56 1.95 1.07.95 1.98 1.25 2.26 1.39.28.14.44.12.61-.07.17-.19.7-.82.89-1.1.19-.29.37-.24.62-.14.25.09 1.67.79 1.95.93.29.14.48.21.55.33.07.12.07.69-.18 1.38Z" />
      </svg>

      {/* Etiqueta que se despliega en escritorio */}
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-ink-900 px-3.5 py-2 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 max-sm:hidden">
        {label}
      </span>
    </a>
  )
}
