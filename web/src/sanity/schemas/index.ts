import type { SchemaTypeDefinition } from 'sanity'

import { localeBlock, localeString, localeStringList, localeText } from './locale'
import { project } from './project'
import { heroSlide } from './heroSlide'
import { pricingPackage } from './pricingPackage'
import { siteContent } from './siteContent'

export const schemaTypes: SchemaTypeDefinition[] = [
  // tipos localizados reutilizables
  localeString,
  localeText,
  localeBlock,
  localeStringList,
  // documentos
  project,
  heroSlide,
  pricingPackage,
  siteContent,
]

/** Documentos que existen una sola vez: no se listan, se abren directo. */
export const SINGLETONS = ['siteContent'] as const
