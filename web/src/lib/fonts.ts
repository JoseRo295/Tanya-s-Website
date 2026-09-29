import { Cormorant, Onest } from 'next/font/google'

/**
 * next/font genera un @font-face por subconjunto con su `unicode-range`, asi
 * que el navegador descarga el archivo cirilico solo si hay letras cirilicas
 * en la pagina. Lo que rompia eso era el <link rel="preload"> que Next anade
 * por defecto: forzaba las cuatro variantes en los tres idiomas, unos 65 KB
 * de mas para quien lee en ingles o espanol.
 *
 * Con `preload: false` manda el unicode-range: /en y /es bajan solo latino,
 * /ru baja latino y cirilico. Como el LCP de la home es la foto del hero y no
 * el texto, y `display: swap` pinta de inmediato con la fuente del sistema,
 * quitar la precarga no retrasa nada visible.
 *
 * NO anadir `weight` aqui. Parece una optimizacion pero es la contraria: sin
 * `weight` next/font sirve la fuente VARIABLE, un archivo por subconjunto que
 * cubre todos los pesos. Declarar pesos la cambia por archivos estaticos, uno
 * por peso, y pesa mas del doble.
 *
 * Por que estas dos y no Inter + Playfair: eran las que usa cualquier plantilla
 * "elegante", y el sitio se leia igual que mil otros. Cormorant tiene el trazo
 * fino y alto de los rotulos de arquitectura y aguanta tamanos enormes, que es
 * donde se luce el titular. Onest es una grotesca diseñada con el cirilico
 * como ciudadano de primera (se nota en /ru, donde Inter quedaba apretada) y
 * tiene un tono mas calido que Inter para el texto corrido. Las dos traen
 * cirilico y son variables.
 */

const onest = Onest({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-body',
  display: 'swap',
  preload: false,
})

const cormorant = Cormorant({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-serif',
  display: 'swap',
  preload: false,
})

export const fontVariables = `${onest.variable} ${cormorant.variable}`
