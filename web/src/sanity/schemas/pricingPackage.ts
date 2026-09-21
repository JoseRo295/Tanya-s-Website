import { defineField, defineType } from 'sanity'

export const pricingPackage = defineType({
  name: 'pricingPackage',
  title: 'Paquete / Precio',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Identificador',
      description: 'Sin espacios ni acentos. Ej: concept, 100, airbnb, wow',
      type: 'slug',
      options: { source: 'title.en', maxLength: 30 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Nombre del paquete',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'subtitle', title: 'Subtítulo', type: 'localeString' }),
    defineField({
      name: 'price',
      title: 'Precio',
      description: 'Texto libre. Ej: "desde 18 $/m2"',
      type: 'localeString',
    }),
    defineField({
      name: 'time',
      title: 'Duración',
      description: 'Ej: "2-3 semanas"',
      type: 'localeString',
    }),
    defineField({
      name: 'features',
      title: 'Qué incluye',
      description: 'Una línea por cada cosa incluida.',
      type: 'localeStringList',
    }),
    defineField({
      name: 'pdf',
      title: 'PDF de ejemplo (opcional)',
      type: 'file',
      options: { accept: '.pdf' },
    }),
    defineField({
      name: 'popular',
      title: 'Marcar como "más popular"',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      validation: (Rule) => Rule.required().integer(),
    }),
  ],
  orderings: [
    { title: 'Orden de aparición', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title.en', price: 'price.en', order: 'order' },
    prepare({ title, price, order }) {
      return { title: title || 'Sin nombre', subtitle: `#${order ?? '?'} — ${price || 'sin precio'}` }
    },
  },
})
