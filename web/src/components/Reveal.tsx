'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Reemplaza a la libreria `aos` (~15 KB + CSS) con un IntersectionObserver.
 * De paso arregla algo del sitio viejo: alli AOS estaba configurado con
 * `disable: 'phone'`, o sea que en movil solo pesaba y no animaba nada.
 */
/** Punto de partida de la animacion segun de donde entra el bloque. */
const FROM = {
  up: 'translate-y-6',
  left: '-translate-x-8',
  right: 'translate-x-8',
  /* Sin desplazamiento: para imagenes grandes, donde mover el encuadre
     distrae mas de lo que aporta. */
  none: 'scale-[0.985]',
} as const

export function Reveal({
  children,
  delay = 0,
  className = '',
  from = 'up',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  from?: keyof typeof FROM
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Sin soporte o con movimiento reducido: mostrar de una, sin animar.
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setShown(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out-expo ${
        shown ? 'translate-x-0 translate-y-0 scale-100 opacity-100' : `${FROM[from]} opacity-0`
      } ${className}`}
      style={{ transitionDelay: shown ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}
