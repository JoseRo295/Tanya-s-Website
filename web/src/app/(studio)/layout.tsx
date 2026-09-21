/**
 * Layout raiz del panel de administracion.
 *
 * El panel vive en su propio grupo de rutas porque necesita un <html> distinto
 * al del sitio publico: sin las tipografias, sin los estilos globales y con un
 * `lang` fijo. Sanity Studio trae su propio CSS y monta toda la pantalla.
 */
export const metadata = {
  title: 'TG Design — Panel',
  robots: { index: false, follow: false },
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
