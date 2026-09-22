import type { StructureResolver } from 'sanity/structure'

/**
 * Menu del panel. El objetivo es que Tanya vea 4 cosas claras y nada de jerga:
 * Contenido del sitio (singleton, abre directo), Proyectos, Portada y Precios.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('TG Design')
    .items([
      S.listItem()
        .title('Contenido del sitio')
        .id('siteContent')
        .child(S.document().schemaType('siteContent').documentId('siteContent')),

      S.divider(),

      S.documentTypeListItem('project').title('Proyectos'),
      S.documentTypeListItem('heroSlide').title('Portada'),
      S.documentTypeListItem('pricingPackage').title('Precios'),
      S.documentTypeListItem('faq').title('Preguntas frecuentes'),
    ])
