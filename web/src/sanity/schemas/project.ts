import { defineArrayMember, defineField, defineType } from 'sanity'

/*
 * Estas dos listas son lo que hace encontrables las fotos.
 *
 * Antes cada foto de galeria salia con el texto alternativo "Proyecto X — 1",
 * "— 2", "— 3": ni una palabra sobre lo que se ve, asi que ninguna podia
 * aparecer cuando alguien busca "dormitorio neoclasico". Con estos dos
 * desplegables el texto se compone solo, y Tanya elige de una lista en vez de
 * redactar 99 descripciones en tres idiomas.
 *
 * Los valores van en ingles porque son claves internas; lo que se traduce son
 * las etiquetas, en `lib/imageAlt.ts`.
 */
export const ROOM_OPTIONS = [
  { title: 'Dormitorio', value: 'bedroom' },
  { title: 'Salón', value: 'living' },
  { title: 'Cocina', value: 'kitchen' },
  { title: 'Comedor', value: 'dining' },
  { title: 'Baño', value: 'bathroom' },
  { title: 'Habitación infantil', value: 'kids' },
  { title: 'Despacho', value: 'office' },
  { title: 'Recibidor', value: 'hallway' },
  { title: 'Vestidor', value: 'closet' },
  { title: 'Terraza / balcón', value: 'terrace' },
] as const

export const STYLE_OPTIONS = [
  { title: 'Neoclásico', value: 'neoclassic' },
  { title: 'Moderno', value: 'modern' },
  { title: 'Loft', value: 'loft' },
  { title: 'Escandinavo', value: 'scandinavian' },
  { title: 'Minimalista', value: 'minimal' },
  { title: 'Clásico', value: 'classic' },
] as const

/** Campos que se anaden dentro de cada imagen, sin cambiar su estructura. */
const photoFields = [
  defineField({
    name: 'room',
    title: '¿Qué habitación es?',
    description: 'Lo que más ayuda a que la foto aparezca en búsquedas.',
    type: 'string',
    options: { list: [...ROOM_OPTIONS] },
  }),
  defineField({
    name: 'style',
    title: 'Estilo (opcional)',
    type: 'string',
    options: { list: [...STYLE_OPTIONS] },
  }),
]

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
      fields: photoFields,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Galería',
      description:
        'Fotos que se ven al abrir el proyecto. Arrastra para reordenar. Marca qué habitación es cada una: es lo que hace que aparezcan en Google Imágenes.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: photoFields,
        }),
      ],
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
