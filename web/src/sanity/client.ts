import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from './env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,

  /*
   * Sin el CDN de Sanity a proposito.
   *
   * Con `useCdn: true` el build puede recibir una respuesta cacheada y
   * quedarse con contenido viejo: paso exactamente eso, /ru y /es salieron con
   * el titulo nuevo y /en con el anterior.
   *
   * No se pierde nada: Next ya cachea el resultado con ISR (`revalidate` +
   * la etiqueta 'home'), asi que la consulta se hace una vez por build o por
   * revalidacion, no en cada visita.
   */
  useCdn: false,

  perspective: 'published',
})
