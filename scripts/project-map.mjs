/**
 * Mapa fiel del contenido actual de tg-design/src/components/ProjectCarousel.js.
 *
 * El orden del array y el orden de cada galeria estan copiados tal cual del
 * codigo viejo (los imports usan alias tipo img7_1 que NO coinciden con el
 * numero del archivo: img7_1 es 6.png). Por eso los nombres van explicitos.
 */

export const PROJECTS = [
  {
    dir: 'project6',
    key: 6,
    cover: '11.png',
    gallery: [
      '11.png', '2.png', '3.png', '4.png', '5.png',
      '6.png', '7.png', '8.png', '9.png', '10.png', '1.png',
    ],
  },
  {
    dir: 'project11',
    key: 11,
    cover: '1.png',
    gallery: ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png'],
  },
  {
    dir: 'project7',
    key: 7,
    cover: '6.png',
    gallery: [
      '6.png', '2.png', '3.jpg', '4.jpg', '5.jpg', '1.jpg', '7.jpg', '8.jpg',
      '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.png', '15.jpg',
      '16.png', '17.png', '18.jpg', '19.jpg', '20.jpg', '21.jpg', '22.png',
      '23.png', '24.png',
    ],
  },
  {
    dir: 'project8',
    key: 8,
    cover: '1.png',
    gallery: ['1.png', '2.png', '3.png', '5.png'],
  },
  {
    dir: 'project9',
    key: 9,
    cover: 'ПЕРВАЯ картинка.jpg',
    gallery: [
      'ПЕРВАЯ картинка.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg',
      '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg',
    ],
  },
  {
    dir: 'project10',
    key: 10,
    cover: '1.jpg',
    gallery: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg'],
  },
  {
    dir: 'project1',
    key: 1,
    cover: 'основнойвид.png',
    gallery: [
      'основнойвид.png', 'Гостиная_сравнение.jpg', 'коридор.png',
      'кухня.png', 'СпальняРеализация.jpg', 'ВаннаяРеализация.jpg',
    ],
  },
  {
    dir: 'project2',
    key: 2,
    cover: 'Спальня1.png',
    gallery: [
      'Спальня3.png', 'Кухня.png', 'Прихожая.png',
      'Спальня1.png', 'Спальня2.png', 'Ванная.png',
    ],
  },
  {
    dir: 'project3',
    key: 3,
    cover: 'Кухня2.png',
    gallery: [
      'Кухня2.png', 'Ванная2.jpg', 'Кухня1.jpg', 'Ванная1.jpg',
      'Кухня3.png', 'Спальня_детали.jpg', 'Спальня1.jpg', 'Спальня2.jpg',
    ],
  },
  {
    dir: 'project4',
    key: 4,
    cover: 'Кухня1.png',
    gallery: [
      'Кухня1.png', 'Кухня2.jpeg', 'Спальня1.png',
      'Спальня2.png', 'Ванная.jpeg', 'детская.png',
    ],
  },
  {
    dir: 'project5',
    key: 5,
    cover: '1.png',
    gallery: ['1.png', '2.png'],
  },
]

/** Carrusel de portada: tg-design/src/components/Corrusel.js */
export const HERO_SLIDES = ['7.png', '8.png', '9.png', '10.png']

/** Paquetes: tg-design/src/components/NewPricingPlans.js */
export const PACKAGES = [
  { slug: 'concept', prefix: 'conceptPackage', pdf: 'Example_Concept.pdf', popular: false },
  { slug: '100', prefix: 'hundredPackage', pdf: 'Example_100.pdf', popular: true },
  { slug: 'airbnb', prefix: 'airbnbPackage', pdf: null, popular: false },
  { slug: 'wow', prefix: 'wowPackage', pdf: 'Example_WOW Effect.pdf', popular: false },
]

/**
 * Claves de LocalizationContext.js que ya tienen campo propio en el schema
 * `siteContent` y por tanto NO deben duplicarse en la lista de textos sueltos.
 */
export const PROMOTED_KEYS = new Set([
  'designerSpaceTitleLine1',
  'designerSpaceTitleLine2',
  'orderDesignProject',
  'teamDescription',
  ...PROJECTS.flatMap(({ key }) => [`proyecto${key}`, `descripcionProyecto${key}`]),
  ...PACKAGES.flatMap(({ prefix }) => [
    `${prefix}Title`,
    `${prefix}Subtitle`,
    `${prefix}Price`,
    `${prefix}Time`,
    `${prefix}Items`,
  ]),
])
