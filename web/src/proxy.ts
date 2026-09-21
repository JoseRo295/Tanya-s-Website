import { NextResponse, type NextRequest } from 'next/server'
import { DEFAULT_LOCALE, LOCALE_IDS } from '@/sanity/locales'

/**
 * Manda "/" al idioma correcto.
 *
 * Se respeta el Accept-Language del navegador, asi que quien entre desde Rusia
 * ve el sitio en ruso sin tener que buscar el selector. Google recibe un 307
 * (redireccion temporal), que es lo correcto aqui: la home no se ha mudado de
 * forma permanente a un idioma concreto.
 */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const hasLocale = LOCALE_IDS.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  )
  if (hasLocale) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = `/${detectLocale(request)}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

function detectLocale(request: NextRequest): string {
  const header = request.headers.get('accept-language')
  if (!header) return DEFAULT_LOCALE

  // "es-ES,es;q=0.9,en;q=0.8" -> [{tag:'es', q:1}, ...] ordenado por prioridad
  const preferred = header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';')
      const q = params.find((p) => p.startsWith('q='))
      return { tag: tag.split('-')[0].toLowerCase(), q: q ? Number(q.slice(2)) : 1 }
    })
    .filter((p) => !Number.isNaN(p.q))
    .sort((a, b) => b.q - a.q)

  const match = preferred.find((p) => (LOCALE_IDS as readonly string[]).includes(p.tag))
  return match?.tag ?? DEFAULT_LOCALE
}

export const config = {
  // Se excluyen el panel, las rutas internas de Next, la API y los archivos
  // con extension (favicon, robots.txt, sitemap.xml, imagenes...).
  matcher: ['/((?!studio|_next|api|.*\\.).*)'],
}
