# Proposal

## Why

La sección de proyectos apila todos los proyectos en vertical (zigzag de revista en desktop, una columna en móvil). Con 8–9 proyectos, en móvil son más de 10 pantallas de scroll antes de llegar a Precios: el visitante pierde el interés a mitad de camino. La clienta pide que la sección muestre unos pocos proyectos a la vez y que el resto se recorra deslizando hacia la derecha, tanto en web como en móvil.

## What Changes

- La rejilla en zigzag de `Projects` se sustituye por un **carril horizontal único** con tarjetas de tamaño uniforme: ~3 visibles en desktop, ~2 en tablet y 1 en móvil, siempre con la siguiente tarjeta asomando por la derecha.
- El carril se desliza con el dedo/trackpad (scroll-snap nativo) y, desde tablet en adelante, con botones anterior/siguiente que avanzan una "página" de tarjetas.
- Se añade un indicador de posición (contador `03 / 09` y barra de progreso fina).
- Todas las portadas usan la misma proporción (4:5); desaparece la alternancia 7/5 y el escalón vertical. **Cambio visual deliberado**: se pierde la composición de revista.
- La sección pasa a ocupar aproximadamente una pantalla de alto, independientemente del número de proyectos.
- Sin cambios en: el lightbox, la navegación anterior/siguiente dentro del lightbox, el esquema de Sanity y el orden (campo `order`).
- Sin dependencias nuevas: no se reintroduce Swiper.

## Capabilities

### New Capabilities
- `project-showcase`: cómo se presentan las portadas de los proyectos en la página de inicio (carril horizontal, navegación, indicador de posición, accesibilidad y presencia de todos los proyectos en el HTML).

### Modified Capabilities
<!-- Ninguna: no hay specs existentes en openspec/specs/. -->

## Impact

- `web/src/components/Projects.tsx`: se reescribe el bloque de la rejilla y el componente `Card`; `Lightbox` y `Arrow` se mantienen (Arrow puede reutilizarse).
- `web/src/app/globals.css`: posible ajuste de utilidades (`.snap-row` ya existe y se reutiliza).
- `web/src/app/(site)/[locale]/page.tsx`: sin cambios previstos; las etiquetas `galleryPrev` / `galleryNext` ya llegan en `labels`.
- SEO: neutro. Todos los proyectos siguen renderizados en el HTML del servidor.
- Contenido: el orden de los 3 primeros proyectos gana peso; Tanya lo controla con el campo `order` en Sanity.
