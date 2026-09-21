# TG Design

Sitio de Tatiana Gorshkova (diseño de interiores). Next.js 16 + Sanity CMS.

```
web/        la web (Next.js App Router) y el panel de administración
scripts/    utilidades que se corren a mano, no en cada build
tg-design/  el sitio anterior en Create React App — se borra cuando el nuevo esté en producción
```

## Levantarlo

```bash
cd web
npm install
npm run dev          # http://localhost:3000
```

Hace falta `web/.env.local` (no se commitea):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=m65na1hg
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_WRITE_TOKEN=...      # solo para los scripts de scripts/
SANITY_REVALIDATE_SECRET=...    # el mismo valor que el webhook de Sanity
```

## Cómo está armado

| | |
|---|---|
| **Contenido** | Todo en Sanity. Nada de textos ni fotos en el código. |
| **Idiomas** | `/en`, `/ru`, `/es`. Cada campo del CMS guarda los tres. |
| **Renderizado** | Estático (SSG) con revalidación cada hora. |
| **Actualizaciones** | Un webhook de Sanity llama a `/api/revalidate` y el cambio sale en segundos. |
| **Imágenes** | `cdn.sanity.io` sirve WebP/AVIF al tamaño pedido. Una foto de 7 MB llega al visitante como ~30 KB. |

### Por qué el contenido se resuelve en el servidor

Los componentes de cliente (`Projects`, `Pricing`, `Contact`) reciben los textos **ya traducidos**
al idioma de la página, no el objeto con los tres idiomas. Así el navegador no descarga
traducciones que no va a usar, y el texto viaja dentro del HTML, que es lo que indexa Google.

Consecuencia práctica: los props que cruzan de un server component a uno de cliente tienen que
ser serializables. Por eso las plantillas de mensaje son strings con `{title}` y no funciones.

## Scripts

Se corren desde la raíz del repo, no desde `web/`.

```bash
npm run migrate:dry    # simula la migración de tg-design/ a Sanity, sin subir nada
npm run migrate        # comprime y sube las fotos, y crea los documentos
npm run countries      # regenera web/src/lib/countries.ts
npm run ui-strings     # añade etiquetas de interfaz que falten en el CMS
```

`migrate` es idempotente: los documentos tienen `_id` fijo y las imágenes ya subidas quedan
registradas en `scripts/.migration-cache.json`. Pero usa `createOrReplace`, así que **pisa lo
que se haya editado en el panel**. Es para correrlo una vez, antes de entregarle el CMS a Tanya.

## Desplegar en Vercel

1. Proyecto nuevo apuntando a `web/` como *Root Directory*.
2. Variables de entorno: las cuatro de arriba, más `NEXT_PUBLIC_SITE_URL` con el dominio final.
3. Webhook en `sanity.io/manage` → API → Webhooks:
   - URL `https://<dominio>/api/revalidate`
   - Dataset `production`, triggers Create/Update/Delete
   - Secret: el mismo valor que `SANITY_REVALIDATE_SECRET`
4. Conservar `web/public/googleeb787e365b3183f4.html` (verificación de Search Console).

## Dar acceso a Tanya

En `sanity.io/manage` → Members → invitar su email con rol **Editor**. Entra por
`https://<dominio>/studio` con Google o email. No necesita GitHub ni terminal.

El panel tiene cuatro entradas: **Contenido del sitio**, **Proyectos**, **Portada** y **Precios**.
Las traducciones vienen colapsadas bajo cada campo para que el formulario no abrume.

## Decisiones que conviene no deshacer sin leer esto

- **`useCdn: false`** en `web/src/sanity/client.ts`. Con el CDN activado, un build puede recibir
  contenido cacheado y quedarse viejo; pasó durante el desarrollo. Next ya cachea con ISR.
- **`preload: false`** en las tipografías (`web/src/lib/fonts.ts`). El `unicode-range` que genera
  next/font ya evita descargar el cirílico en `/en` y `/es`; la precarga lo forzaba igual.
- **Lista de países estática** (`web/src/lib/countries.ts`). La API `restcountries.com` que usaba
  el sitio viejo está descontinuada y devuelve un error, lo que dejaba el desplegable vacío y el
  formulario imposible de enviar.
- **Sin Swiper.** El hero y la galería son CSS (`scroll-snap`) más unas líneas de React. Ahorra
  unos 150 KB de JavaScript.

## Pendiente

- Los tres PDFs de ejemplo se subieron **sin comprimir** (82 MB en total) porque no había
  Ghostscript en la máquina. Con `gs -sDEVICE=pdfwrite -dPDFSETTINGS=/ebook` deberían bajar a
  unos 3 MB cada uno; después hay que volver a subirlos desde el panel.
- `siteContent.email` está vacío a propósito: lo tiene que poner Tanya.
- No hay imágenes verticales de portada para móvil. El sitio recorta las horizontales, que
  funciona, pero subir verticales desde el panel se vería mejor.
