import { defineField, defineType } from 'sanity'
import { LOCALES, DEFAULT_LOCALE } from '../locales'

/**
 * Tipos localizados: un objeto con un campo por idioma.
 * El idioma por defecto queda siempre visible; el resto se agrupa
 * en "Traducciones" y arranca colapsado para no abrumar el formulario.
 */

const stringFields = () =>
  LOCALES.map(({ id, title }) =>
    defineField({
      name: id,
      title,
      type: 'string' as const,
      fieldset: id === DEFAULT_LOCALE ? undefined : 'translations',
    }),
  )

const textFields = () =>
  LOCALES.map(({ id, title }) =>
    defineField({
      name: id,
      title,
      type: 'text' as const,
      rows: 4,
      fieldset: id === DEFAULT_LOCALE ? undefined : 'translations',
    }),
  )

const translationsFieldset = [
  { name: 'translations', title: 'Traducciones', options: { collapsible: true, collapsed: true } },
]

export const localeString = defineType({
  name: 'localeString',
  title: 'Texto corto',
  type: 'object',
  fieldsets: translationsFieldset,
  fields: stringFields(),
})

export const localeText = defineType({
  name: 'localeText',
  title: 'Texto largo',
  type: 'object',
  fieldsets: translationsFieldset,
  fields: textFields(),
})

export const localeBlock = defineType({
  name: 'localeBlock',
  title: 'Texto con formato',
  type: 'object',
  fieldsets: translationsFieldset,
  fields: LOCALES.map(({ id, title }) =>
    defineField({
      name: id,
      title,
      type: 'array',
      of: [{ type: 'block' }],
      fieldset: id === DEFAULT_LOCALE ? undefined : 'translations',
    }),
  ),
})

export const localeStringList = defineType({
  name: 'localeStringList',
  title: 'Lista de textos',
  type: 'object',
  fieldsets: translationsFieldset,
  fields: LOCALES.map(({ id, title }) =>
    defineField({
      name: id,
      title,
      type: 'array',
      of: [{ type: 'string' }],
      fieldset: id === DEFAULT_LOCALE ? undefined : 'translations',
    }),
  ),
})
