import { defineField, defineType } from 'sanity'

/**
 * Los tres motivos para elegir a Tanya y no a otro estudio.
 *
 * Antes la pagina pasaba de la portada directamente a "Sobre mi", asi que
 * nunca llegaba a decir por que contratarla: mostraba trabajo bonito, como
 * cualquier competidor de Quito. Esta seccion es el argumento comercial.
 *
 * Va en el CMS y no en el codigo porque es justo el texto que mas se va a
 * reescribir conforme ella vea que le funciona al hablar con clientes.
 */
export const valueProp = defineType({
  name: 'valueProp',
  title: 'Por qué elegirme',
  type: 'document',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icono',
      type: 'string',
      options: {
        list: [
          { title: 'Europa / trayectoria', value: 'europe' },
          { title: 'Rentabilidad / inversión', value: 'growth' },
          { title: 'Idiomas', value: 'languages' },
          { title: 'Precio / transparencia', value: 'price' },
          { title: 'Planos / técnico', value: 'blueprint' },
        ],
        layout: 'radio',
      },
      initialValue: 'europe',
    }),
    defineField({
      name: 'title',
      title: 'Título',
      description: 'Corto y concreto. Cuatro o cinco palabras.',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Texto',
      description:
        'Dos o tres frases. Si puedes dar un dato o una cifra en vez de un adjetivo, mejor: convence más "3.500 anuncios compiten en Quito" que "diseño de calidad".',
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
    select: { es: 'title.es', en: 'title.en', order: 'order', icon: 'icon' },
    prepare({ es, en, order, icon }) {
      return { title: es || en || 'Sin título', subtitle: `#${order ?? '?'} · ${icon ?? ''}` }
    },
  },
})
