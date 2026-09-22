import { Inter, Playfair_Display } from 'next/font/google'

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
 * NO anadir `weight` aqui. Parece una optimizacion —el sitio solo usa 300,
 * 400, 500, 600 y un 700 suelto— pero es la contraria: sin `weight` next/font
 * sirve la fuente VARIABLE, un archivo por subconjunto que cubre todos los
 * pesos (~20 KB el latino de Inter). Declarar pesos la cambia por archivos
 * estaticos, uno por peso, y cuatro pesos del mismo subconjunto pasan de esos
 * 20 KB a unos 48 KB.
 */

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
  preload: false,
})

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-playfair',
  display: 'swap',
  preload: false,
})

export const fontVariables = `${inter.variable} ${playfair.variable}`
