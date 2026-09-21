import { defineArrayMember, defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Proyecto',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      description: 'Ej: "Studio, 25 m², Saint Petersburg"',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'localeText',
    }),
    defineField({
      name: 'coverImage',
      title: 'Foto de portada',
      description: 'La que se ve en la página principal. Elige la más llamativa.',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Galería',
      description: 'Fotos que se ven al abrir el proyecto. Arrastra para reordenar.',
      type: 'array',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      description: 'Número más bajo = aparece primero.',
      type: 'number',
      validation: (Rule) => Rule.required().integer(),
    }),
    defineField({
      name: 'published',
      title: 'Visible en la web',
      type: 'boolean',
      initialValue: true,
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
    select: { title: 'title.en', media: 'coverImage', order: 'order', published: 'published' },
    prepare({ title, media, order, published }) {
      return {
        title: title || 'Sin título',
        subtitle: `#${order ?? '?'}${published === false ? ' — oculto' : ''}`,
        media,
      }
    },
  },
})
