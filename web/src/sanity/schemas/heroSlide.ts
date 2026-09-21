import { defineField, defineType } from 'sanity'

export const heroSlide = defineType({
  name: 'heroSlide',
  title: 'Portada (carrusel principal)',
  type: 'document',
  fields: [
    defineField({
      name: 'imageDesktop',
      title: 'Imagen para computadora',
      description: 'Horizontal. Se recomienda 2400×1400 px o más.',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imageMobile',
      title: 'Imagen para celular (opcional)',
      description: 'Vertical. Si la dejas vacía se usa la de computadora recortada.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'alt',
      title: 'Texto alternativo',
      description: 'Describe la foto. Lo leen Google y los lectores de pantalla.',
      type: 'localeString',
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
    select: { media: 'imageDesktop', order: 'order', alt: 'alt.en' },
    prepare({ media, order, alt }) {
      return { title: alt || `Portada #${order ?? '?'}`, subtitle: `#${order ?? '?'}`, media }
    },
  },
})
