import { createClient } from '@sanity/client'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const env = Object.fromEntries(
  fs
    .readFileSync(path.join(ROOT, 'web/.env.local'), 'utf8')
    .split('\n')
    .map((l) => l.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2].trim()]),
)

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

/*
 * Las cifras de Quito son reales (mercado de alquiler corto, 2026): unos 3.500
 * anuncios activos, 31 % de ocupacion media y 45 USD por noche. Se usan a
 * proposito en vez de adjetivos: "3.500 anuncios compiten" convence, "diseño de
 * calidad" no dice nada. Si el mercado cambia, Tanya edita el texto desde el
 * panel sin tocar codigo.
 */
const VALUE_PROPS = [
  {
    order: 1,
    icon: 'europe',
    title: {
      es: 'Diseño europeo, aquí',
      en: 'European design, here',
      ru: 'Европейский дизайн здесь',
    },
    body: {
      es: 'Me formé y trabajé en Rusia y Europa, con proyectos entregados en Moscú, San Petersburgo y Nizhni Nóvgorod. Traigo un repertorio —del neoclásico al loft— que en Quito todavía no es común.',
      en: 'I trained and worked in Russia and Europe, with projects delivered in Moscow, Saint Petersburg and Nizhny Novgorod. I bring a range — from neoclassical to loft — that is still uncommon in Quito.',
      ru: 'Училась и работала в России и Европе, реализовала проекты в Москве, Санкт-Петербурге и Нижнем Новгороде. Приношу подход — от неоклассики до лофта, — которого в Кито пока мало.',
    },
  },
  {
    order: 2,
    icon: 'growth',
    title: {
      es: 'Tu departamento, rentable',
      en: 'Your apartment, earning',
      ru: 'Квартира, которая приносит доход',
    },
    body: {
      es: 'En Quito compiten unos 3.500 alojamientos de alquiler corto con una ocupación media del 31 %. Las fotos son lo único que separa tu anuncio del de al lado: un interior bien diseñado sube la tarifa por noche y los días ocupados.',
      en: 'Around 3,500 short-stay listings compete in Quito at an average 31% occupancy. Photos are the only thing setting your listing apart from the next one: a well-designed interior raises both your nightly rate and your occupied nights.',
      ru: 'В Кито конкурируют около 3 500 объектов краткосрочной аренды при средней загрузке 31 %. Фотографии — единственное, что отличает ваше объявление от соседнего: продуманный интерьер поднимает и цену за ночь, и загрузку.',
    },
  },
  {
    order: 3,
    icon: 'languages',
    title: {
      es: 'En tu idioma',
      en: 'In your language',
      ru: 'На вашем языке',
    },
    body: {
      es: 'Español, ruso e inglés. Reuniones, planos y documentación en el idioma que prefieras — útil si inviertes en Quito desde fuera del país.',
      en: 'Spanish, Russian and English. Meetings, drawings and documentation in whichever you prefer — useful if you are investing in Quito from abroad.',
      ru: 'Испанский, русский и английский. Встречи, чертежи и документы на удобном вам языке — это важно, если вы инвестируете в Кито из другой страны.',
    },
  },
]

/* Preguntas con intencion de compra: las tres primeras van dirigidas a quien
   esta decidiendo si el diseño se paga solo. */
const FAQS = [
  {
    order: 7,
    question: {
      es: '¿El diseño se recupera con el alquiler?',
      en: 'Does the design pay for itself through rental income?',
      ru: 'Окупается ли дизайн за счёт аренды?',
    },
    answer: {
      es: 'Depende de la tarifa y la ocupación que consigas, pero la cuenta es sencilla de hacer: en un estudio de 40 m² el paquete Airbnb ronda los 1.080 $. Si el diseño te permite subir la tarifa de 45 a 60 $ la noche con una ocupación del 40 %, esa diferencia son unos 180 $ al mes. Te paso el cálculo con tus números antes de que decidas.',
      en: 'It depends on the rate and occupancy you achieve, but the maths is easy to do: for a 40 m² studio the Airbnb package is around $1,080. If the design lets you move your rate from $45 to $60 a night at 40% occupancy, that difference is roughly $180 a month. I will run the numbers with your figures before you decide.',
      ru: 'Зависит от вашей цены и загрузки, но посчитать просто: для студии 40 м² пакет Airbnb стоит около 1 080 $. Если дизайн позволит поднять цену с 45 до 60 $ за ночь при загрузке 40 %, разница составит примерно 180 $ в месяц. Перед решением посчитаю по вашим цифрам.',
    },
  },
  {
    order: 8,
    question: {
      es: '¿Es distinto diseñar para vivir que para alquilar?',
      en: 'Is designing to live in different from designing to rent out?',
      ru: 'Отличается ли дизайн для жизни от дизайна под аренду?',
    },
    answer: {
      es: 'Mucho. Para alquilar se diseña pensando en cómo se ve en una foto de 4:3 dentro de un listado, en materiales que aguanten rotación alta y en que cada rincón fotografiable cuente. Para vivir se diseña alrededor de tus costumbres. Son dos encargos distintos y los planteo distinto.',
      en: 'Considerably. Designing to rent means thinking about how a room reads in a 4:3 photo inside a listing, about materials that survive high turnover, and about making every photographable corner count. Designing to live in is built around your habits. They are two different briefs and I approach them differently.',
      ru: 'Существенно. Под аренду проектируют с оглядкой на то, как комната выглядит на фото 4:3 в объявлении, на материалы, выдерживающие высокую проходимость, и на то, чтобы каждый кадр работал. Для жизни — вокруг ваших привычек. Это два разных запроса, и подход к ним разный.',
    },
  },
  {
    order: 9,
    question: {
      es: '¿Trabajas con propietarios que viven fuera de Ecuador?',
      en: 'Do you work with owners who live outside Ecuador?',
      ru: 'Работаете ли вы с владельцами, живущими за пределами Эквадора?',
    },
    answer: {
      es: 'Sí, es una parte habitual del trabajo. Se hace por videollamada en español, ruso o inglés, y recibes los planos, la visualización 3D y la lista de compras con enlaces para que cualquier persona de confianza pueda ejecutar la obra en Quito. Si lo prefieres, también superviso yo.',
      en: 'Yes, it is a regular part of the work. Everything runs over video calls in Spanish, Russian or English, and you receive the drawings, 3D visualisation and a shopping list with links so anyone you trust can carry out the work in Quito. I can also supervise it myself if you prefer.',
      ru: 'Да, это обычная часть работы. Всё ведётся по видеосвязи на испанском, русском или английском, а вы получаете чертежи, 3D-визуализацию и шоппинг-лист со ссылками, чтобы работы в Кито мог выполнить любой человек, которому вы доверяете. При желании веду надзор сама.',
    },
  },
]

const UI_STRINGS = {
  valuePropsEyebrow: {
    es: 'Por qué elegirme',
    en: 'Why work with me',
    ru: 'Почему я',
  },
  valuePropsHeading: {
    es: 'No es decoración. Es una decisión de inversión.',
    en: "It isn't decoration. It's an investment decision.",
    ru: 'Это не декор. Это инвестиционное решение.',
  },
}

const dry = process.argv.includes('--dry-run')

if (dry) {
  console.log('[simulación]')
  VALUE_PROPS.forEach((v) => console.log(`  bloque ${v.order}: ${v.title.es}`))
  FAQS.forEach((f) => console.log(`  pregunta ${f.order}: ${f.question.es}`))
  Object.keys(UI_STRINGS).forEach((k) => console.log(`  etiqueta: ${k}`))
  process.exit(0)
}

// --- bloques de "por qué elegirme" ---
const propDocs = VALUE_PROPS.map((v) => ({
  _id: `valueProp-${v.order}`,
  _type: 'valueProp',
  order: v.order,
  icon: v.icon,
  title: { _type: 'localeString', ...v.title },
  body: { _type: 'localeText', ...v.body },
}))
await propDocs.reduce((t, d) => t.createOrReplace(d), client.transaction()).commit()
console.log(`✓ ${propDocs.length} bloques de "Por qué elegirme"`)

// --- preguntas nuevas ---
const faqDocs = FAQS.map((f) => ({
  _id: `faq-${f.order}`,
  _type: 'faq',
  order: f.order,
  question: { _type: 'localeString', ...f.question },
  answer: { _type: 'localeText', ...f.answer },
}))
await faqDocs.reduce((t, d) => t.createOrReplace(d), client.transaction()).commit()
console.log(`✓ ${faqDocs.length} preguntas frecuentes con intención comercial`)

// --- etiquetas de interfaz ---
const doc = await client.fetch('*[_id=="siteContent"][0]{strings}')
const have = new Set((doc?.strings ?? []).map((s) => s.key))
const add = Object.entries(UI_STRINGS)
  .filter(([k]) => !have.has(k))
  .map(([key, v], i) => ({
    _type: 'stringEntry',
    _key: 'vp' + i,
    key,
    value: { _type: 'localeString', ...v },
  }))

if (add.length) {
  await client.patch('siteContent').append('strings', add).commit()
  console.log(`✓ ${add.length} etiquetas de interfaz`)
} else {
  console.log('· las etiquetas ya estaban')
}
