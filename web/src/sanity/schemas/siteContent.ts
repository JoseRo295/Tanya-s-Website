import { defineArrayMember, defineField, defineType } from 'sanity'

/**
 * Singleton con el contenido editable de la pagina.
 * Los textos que Tanya cambia a menudo son campos con nombre propio.
 * El resto (labels de formulario, cookies, politica de privacidad...) vive en
 * `strings`, una lista clave/valor que el script de migracion rellena desde
 * el viejo LocalizationContext.js sin tener que declarar 200 campos a mano.
 */
export const siteContent = defineType({
  name: 'siteContent',
  title: 'Contenido del sitio',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Portada', default: true },
    { name: 'about', title: 'Sobre mí' },
    { name: 'contact', title: 'Contacto' },
    { name: 'seo', title: 'SEO' },
    { name: 'strings', title: 'Otros textos' },
  ],

  fields: [
    // --- Portada ---
    defineField({
      name: 'heroTitleLine1',
      title: 'Título de portada — línea 1',
      type: 'localeString',
      group: 'hero',
    }),
    defineField({
      name: 'heroTitleLine2',
      title: 'Título de portada — línea 2',
      type: 'localeString',
      group: 'hero',
    }),
    defineField({
      name: 'heroButton',
      title: 'Texto del botón de portada',
      type: 'localeString',
      group: 'hero',
    }),

    // --- Sobre mí ---
    defineField({
      name: 'aboutPhoto',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
      group: 'about',
    }),
    defineField({
      name: 'aboutBody',
      title: 'Texto',
      description: 'Cada párrafo es un bloque. Enter crea un párrafo nuevo.',
      type: 'localeBlock',
      group: 'about',
    }),

    // --- Contacto ---
    defineField({
      name: 'contactImage',
      title: 'Foto junto al formulario',
      type: 'image',
      options: { hotspot: true },
      group: 'contact',
    }),
    defineField({
      name: 'tagline',
      title: 'Lema del pie de página',
      description: 'Una o dos frases bajo el logo.',
      type: 'localeText',
      group: 'contact',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'Número de WhatsApp',
      description: 'Formato internacional sin espacios. Ej: +593983548611',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'email',
      title: 'Email de contacto',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Redes sociales',
      type: 'array',
      group: 'contact',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Red',
              type: 'string',
              options: {
                list: ['instagram', 'facebook', 'pinterest', 'tiktok', 'youtube', 'linkedin'],
              },
            }),
            defineField({ name: 'url', title: 'Enlace', type: 'url' }),
          ],
          preview: { select: { title: 'platform', subtitle: 'url' } },
        }),
      ],
    }),

    // --- SEO ---
    defineField({
      name: 'seoTitle',
      title: 'Título en Google',
      type: 'localeString',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Descripción en Google',
      description: 'Máximo ~155 caracteres.',
      type: 'localeText',
      group: 'seo',
    }),
    defineField({
      name: 'ogImage',
      title: 'Imagen al compartir (WhatsApp, Facebook)',
      type: 'image',
      group: 'seo',
    }),

    // --- Textos sueltos ---
    defineField({
      name: 'strings',
      title: 'Textos sueltos',
      description:
        'Etiquetas de botones, formulario, cookies y política de privacidad. No borres las claves, solo edita los textos.',
      type: 'array',
      group: 'strings',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stringEntry',
          fields: [
            defineField({
              name: 'key',
              title: 'Clave',
              type: 'string',
              readOnly: true,
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: 'value', title: 'Texto', type: 'localeString' }),
            defineField({
              name: 'list',
              title: 'Lista (si el texto son varias líneas)',
              type: 'localeStringList',
            }),
          ],
          preview: {
            select: { title: 'key', subtitle: 'value.en' },
          },
        }),
      ],
      options: { sortable: false },
    }),
  ],

  preview: {
    prepare: () => ({ title: 'Contenido del sitio' }),
  },
})
