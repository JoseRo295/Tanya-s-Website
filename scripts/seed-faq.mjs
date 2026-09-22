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
 * Redactadas como las escribiria un cliente en el buscador, no como titulos de
 * folleto. Las respuestas dan cifras y plazos concretos porque una respuesta
 * que empieza por "depende" no la cita ningun buscador.
 *
 * Los precios y duraciones salen de los paquetes reales que ya estan en el CMS
 * (18 $/m2 el basico, 25 $/m2 el completo, 6 semanas), asi que no inventan nada
 * y Tanya puede corregirlos desde el panel cuando cambien.
 */
const FAQS = [
  {
    order: 1,
    question: {
      es: '¿Cuánto cuesta un proyecto de diseño de interiores?',
      en: 'How much does an interior design project cost?',
      ru: 'Сколько стоит дизайн-проект интерьера?',
    },
    answer: {
      es: 'Desde 18 $/m² para el paquete de concepto, que incluye distribución de muebles, mood board y lista de compras. El paquete completo, con visualización 3D y planos para constructores, parte de 25 $/m². El precio final depende de la superficie y del alcance.',
      en: 'From $18/m² for the concept package, which covers furniture layout, mood board and shopping list. The full package, with 3D visualisation and builder drawings, starts at $25/m². The final price depends on the area and the scope.',
      ru: 'От 18 $/м² за пакет «Концепция»: планировка мебели, мудборд и шоппинг-лист. Полный пакет с 3D-визуализацией и чертежами для строителей — от 25 $/м². Итоговая цена зависит от площади и объёма работ.',
    },
  },
  {
    order: 2,
    question: {
      es: '¿Cuánto tiempo tarda un proyecto?',
      en: 'How long does a project take?',
      ru: 'Сколько времени занимает проект?',
    },
    answer: {
      es: 'Entre 2 y 3 semanas para el paquete de concepto y unas 6 semanas para el proyecto completo con planos y visualización 3D. Si además se acompaña la obra, el plazo se extiende hasta el final de la reforma.',
      en: 'Two to three weeks for the concept package and around six weeks for the full project with drawings and 3D visualisation. If on-site supervision is included, the timeline runs until the renovation is finished.',
      ru: 'От 2 до 3 недель для пакета «Концепция» и около 6 недель для полного проекта с чертежами и 3D-визуализацией. С авторским надзором срок продлевается до окончания ремонта.',
    },
  },
  {
    order: 3,
    question: {
      es: '¿Trabajas a distancia o solo en Quito?',
      en: 'Do you work remotely or only in Quito?',
      ru: 'Вы работаете удалённо или только в Кито?',
    },
    answer: {
      es: 'Ambas cosas. Los proyectos en Quito pueden incluir visitas y seguimiento de obra presencial. Fuera de Ecuador trabajo a distancia: el portfolio incluye proyectos realizados así en Moscú, San Petersburgo y Nizhni Nóvgorod.',
      en: 'Both. Projects in Quito can include site visits and on-site supervision. Outside Ecuador I work remotely — the portfolio includes projects delivered that way in Moscow, Saint Petersburg and Nizhny Novgorod.',
      ru: 'И так, и так. В Кито возможны выезды на объект и авторский надзор. За пределами Эквадора работаю удалённо: в портфолио есть проекты, сделанные так в Москве, Санкт-Петербурге и Нижнем Новгороде.',
    },
  },
  {
    order: 4,
    question: {
      es: '¿En qué idiomas atiendes?',
      en: 'What languages do you work in?',
      ru: 'На каких языках вы работаете?',
    },
    answer: {
      es: 'Español, ruso e inglés. Todo el proyecto —reuniones, planos y documentación— se entrega en el idioma que prefieras.',
      en: 'Spanish, Russian and English. The whole project — meetings, drawings and documentation — is delivered in the language you prefer.',
      ru: 'Испанский, русский и английский. Весь проект — встречи, чертежи и документация — оформляется на удобном вам языке.',
    },
  },
  {
    order: 5,
    question: {
      es: '¿Qué incluye exactamente un proyecto de diseño?',
      en: 'What exactly is included in a design project?',
      ru: 'Что именно входит в дизайн-проект?',
    },
    answer: {
      es: 'Según el paquete: plano de distribución de muebles con una o varias opciones, mood board con muebles y materiales, visualización 3D, juego completo de planos para constructores y lista de compras con enlaces. Los paquetes superiores añaden acompañamiento durante la obra.',
      en: 'Depending on the package: furniture layout plan with one or more options, mood board with furniture and materials, 3D visualisation, a full set of builder drawings, and a shopping list with links. Higher packages add support during the renovation.',
      ru: 'В зависимости от пакета: план расстановки мебели в одном или нескольких вариантах, мудборд с мебелью и материалами, 3D-визуализация, полный комплект чертежей для строителей и шоппинг-лист со ссылками. В старших пакетах добавляется сопровождение ремонта.',
    },
  },
  {
    order: 6,
    question: {
      es: '¿Diseñas apartamentos pequeños?',
      en: 'Do you design small apartments?',
      ru: 'Вы работаете с маленькими квартирами?',
    },
    answer: {
      es: 'Sí, y son de los encargos más frecuentes. El portfolio incluye estudios desde 15 m². En superficies pequeñas el trabajo de distribución y almacenaje es justamente donde más se nota el diseño.',
      en: 'Yes, and they are among the most frequent commissions. The portfolio includes studios from 15 m². In small spaces, layout and storage are exactly where good design shows most.',
      ru: 'Да, и это один из самых частых запросов. В портфолио есть студии от 15 м². На маленькой площади именно планировка и хранение показывают качество дизайна лучше всего.',
    },
  },
]

const SOCIALS = [
  { _key: 'ig', platform: 'instagram', url: 'https://www.instagram.com/gorshkoffstudio/' },
  { _key: 'pin', platform: 'pinterest', url: 'https://ru.pinterest.com/tg_interiorart/' },
]

const dry = process.argv.includes('--dry-run')

const docs = FAQS.map((f) => ({
  _id: `faq-${f.order}`,
  _type: 'faq',
  order: f.order,
  question: { _type: 'localeString', ...f.question },
  answer: { _type: 'localeText', ...f.answer },
}))

if (dry) {
  console.log(`[simulación] ${docs.length} preguntas y ${SOCIALS.length} redes`)
  docs.forEach((d) => console.log(`  ${d.order}. ${d.question.es}`))
  process.exit(0)
}

const tx = docs.reduce((t, d) => t.createOrReplace(d), client.transaction())
await tx.commit()
console.log(`✓ ${docs.length} preguntas frecuentes en es/en/ru`)

const current = await client.fetch('*[_id=="siteContent"][0].socialLinks')
if (current?.length) {
  console.log(`· redes ya configuradas (${current.length}), no se tocan`)
} else {
  await client.patch('siteContent').set({ socialLinks: SOCIALS }).commit()
  console.log(`✓ ${SOCIALS.length} redes sociales: ${SOCIALS.map((s) => s.platform).join(', ')}`)
}
