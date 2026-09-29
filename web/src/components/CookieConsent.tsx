'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { Analytics } from '@vercel/analytics/react'

const STORAGE_KEY = 'cookieConsent'

function readStored(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    // Modo privado o cookies bloqueadas: se trata como "sin decidir".
    return null
  }
}

/** Solo se lee al cargar: los cambios de esta visita van por `choice`. */
const noSubscribe = () => () => {}

/**
 * Dos arreglos respecto al banner viejo:
 *
 * 1. Antes el enlace apuntaba a /privacy-policy, una ruta que no existia (404).
 *    Ahora va a la pagina real /<idioma>/privacidad.
 * 2. Antes aceptar o rechazar solo guardaba un valor en localStorage: la
 *    analitica se cargaba igual en ambos casos. Ahora el script solo se monta
 *    si la persona acepta, que es lo que el banner promete.
 */
export function CookieConsent({
  locale,
  title,
  text,
  accept,
  decline,
  policyLink,
}: {
  locale: string
  title: string
  text: string
  accept: string
  decline: string
  policyLink: string
}) {
  // La decision guardada se lee como un dato externo: en el servidor no hay
  // localStorage (null) y en el navegador se lee al hidratar, sin tener que
  // copiarla a un estado desde un efecto.
  const stored = useSyncExternalStore(noSubscribe, readStored, () => null)
  const saved = stored === 'true' ? 'granted' : stored === 'false' ? 'denied' : null
  // Lo elegido en esta visita manda sobre lo guardado (y cubre el caso en que
  // no se pudo guardar).
  const [choice, setChoice] = useState<'granted' | 'denied' | null>(null)
  const consent = choice ?? saved

  const [delayPassed, setDelayPassed] = useState(false)
  useEffect(() => {
    if (saved) return
    const timer = setTimeout(() => setDelayPassed(true), 1500)
    return () => clearTimeout(timer)
  }, [saved])
  const visible = consent === null && delayPassed

  const choose = (granted: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, String(granted))
    } catch {
      // Si no se puede guardar, al menos se respeta durante esta visita.
    }
    setChoice(granted ? 'granted' : 'denied')
  }

  return (
    <>
      {consent === 'granted' && <Analytics />}

      {visible && (
        <div
          /* `region`, no `dialog`: el banner no atrapa el foco ni bloquea la
             pagina, y anunciarlo como dialogo confunde a los lectores de
             pantalla (ademas de chocar con el modal de proyecto, que si lo es). */
          role="region"
          aria-live="polite"
          aria-label={title}
          className="fixed bottom-4 left-4 right-4 z-50 animate-fade-up rounded-2xl border border-ink-100 bg-white/95 p-5 shadow-overlay backdrop-blur-xl sm:left-6 sm:right-auto sm:max-w-sm"
        >
          <h2 className="mb-2 text-base font-semibold text-ink-900">{title} 🍪</h2>
          <p className="text-sm leading-relaxed text-ink-500">
            {text}{' '}
            <Link
              href={`/${locale}/privacidad`}
              className="font-medium text-accent underline underline-offset-2 hover:text-accent-dark"
            >
              {policyLink}
            </Link>
          </p>

          <div className="mt-4 flex gap-2.5">
            <button
              onClick={() => choose(true)}
              className="flex-1 rounded-full bg-ink-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent"
            >
              {accept}
            </button>
            <button
              onClick={() => choose(false)}
              className="rounded-full px-4 py-2.5 text-sm font-medium text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900"
            >
              {decline}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
