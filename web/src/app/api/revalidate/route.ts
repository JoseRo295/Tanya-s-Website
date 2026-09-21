import { revalidateTag } from 'next/cache'
import { NextResponse, type NextRequest } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

/**
 * Webhook de Sanity: cuando Tanya guarda algo en el panel, la home se
 * regenera en segundos en vez de esperar a que expire la revalidacion horaria.
 *
 * Configurar en sanity.io/manage -> API -> Webhooks:
 *   URL     https://<dominio>/api/revalidate
 *   Dataset production
 *   Trigger on: Create, Update, Delete
 *   Secret  el mismo valor que SANITY_REVALIDATE_SECRET
 */
export async function POST(request: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type: string }>(
      request,
      process.env.SANITY_REVALIDATE_SECRET,
    )

    if (!isValidSignature) {
      return NextResponse.json({ message: 'Firma no válida' }, { status: 401 })
    }

    if (!body?._type) {
      return NextResponse.json({ message: 'Falta _type' }, { status: 400 })
    }

    // Toda la home sale de una sola consulta, asi que basta una etiqueta.
    // `expire: 0` la marca como caducada ya, para que la siguiente visita
    // reciba el contenido nuevo sin esperar a la revalidacion horaria.
    revalidateTag('home', { expire: 0 })

    return NextResponse.json({ revalidated: true, type: body._type, now: Date.now() })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error desconocido'
    return NextResponse.json({ message }, { status: 500 })
  }
}
