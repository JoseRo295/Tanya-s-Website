import { defineField, defineType } from 'sanity'

/**
 * Preguntas frecuentes.
 *
 * Cumple dos funciones a la vez. Para quien visita, resuelve las dudas que
 * hoy llegan por WhatsApp antes de que tenga que preguntarlas. Para la
 * busqueda, es el unico bloque del sitio con lenguaje natural en forma de
 * pregunta y respuesta, que es exactamente el formato que los buscadores
 * citan cuando alguien escribe "cuanto cuesta un disenador de interiores".
 *
 * Por eso conviene que las respuestas sean concretas y se sostengan solas:
 * una respuesta que empieza por "depende" no la cita nadie.
 */
export const faq = defineType({
  name: 'faq',
  title: 'Preguntas frecuentes',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Pregunta',
      description:
        'Escríbela como la escribiría un cliente en Google, no como un título. Mejor "¿Cuánto cuesta un proyecto de interiorismo?" que "Precios".',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Respuesta',
      description:
        'Directa y completa en dos o tres frases. Si incluye una cifra o un plazo concreto, mejor: es lo que se cita.',
      type: 'localeText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      validation: (Rule) => Rule.required().integer(),
    }),
  ],
  orderings: [
    {
      title: 'Orden de aparición',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { es: 'question.es', en: 'question.en', order: 'order' },
    prepare({ es, en, order }) {
      return { title: es || en || 'Sin pregunta', subtitle: `#${order ?? '?'}` }
    },
  },
})
