'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schemaTypes, SINGLETONS } from './src/sanity/schemas'
import { structure } from './src/sanity/structure'

export default defineConfig({
  name: 'tg-design',
  title: 'TG Design',
  basePath: '/studio',
  projectId,
  dataset,

  schema: {
    types: schemaTypes,
    // Los singletons no se crean ni se borran desde el menu "+".
    templates: (prev) => prev.filter((t) => !SINGLETONS.includes(t.schemaType as never)),
  },

  document: {
    actions: (prev, { schemaType }) =>
      SINGLETONS.includes(schemaType as never)
        ? prev.filter(({ action }) => action !== 'unpublish' && action !== 'delete')
        : prev,
  },

  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
})
