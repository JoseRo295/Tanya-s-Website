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
      description:
        'Una línea por cada cosa incluida. Es la lista completa: se muestra tal cual si no rellenas "Incluye todo lo de…".',
      type: 'localeStringList',
    }),
    /*
     * Los paquetes son acumulativos y antes cada tarjeta repetia la lista
     * entera del anterior: 13 de 30 lineas eran repeticiones y la seccion
     * media casi dos pantallas. Con estos dos campos la tarjeta dice
     * "Todo lo de 100%, mas:" y solo lista lo nuevo. `features` se conserva
     * como lista completa (y como respaldo si se vacian estos campos).
     */
    defineField({
      name: 'includes',
      title: 'Incluye todo lo de…',
      description:
        'Opcional. Si este paquete contiene todo lo de otro, elígelo aquí y en "Lo que añade" pon solo lo nuevo. La web mostrará "Todo lo de …, más:" en lugar de repetir la lista.',
      type: 'reference',
      to: [{ type: 'pricingPackage' }],
    }),
    defineField({
      name: 'extras',
      title: 'Lo que añade',
      description: 'Solo lo que este paquete tiene y el elegido arriba no.',
      type: 'localeStringList',
      hidden: ({ parent }) => !parent?.includes,
    }),
    defineField({
      name: 'pdf',
      title: 'PDF de ejemplo (opcional)',
      type: 'file',
      options: { accept: '.pdf' },
    }),
    defineField({
      name: 'badge',
      title: 'Etiqueta destacada (opcional)',
      description:
        'Si escribes algo aquí aparece una etiqueta dorada sobre la tarjeta. Sirve para señalar un paquete sin quitarle el protagonismo al marcado como "más elegido". Ej: "Mejor retorno".',
      type: 'localeString',
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
