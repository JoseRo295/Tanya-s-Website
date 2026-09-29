# Tasks

## 1. Carril base (sin JavaScript)

- [x] 1.1 En `web/src/components/Projects.tsx`, sustituir la rejilla 12 columnas por un contenedor `flex` con `overflow-x-auto snap-x snap-mandatory snap-row` y gap uniforme. Verificar en `npm run dev` que todas las tarjetas salen en una fila y se desliza con el trackpad.
- [x] 1.2 Aplicar anchos de tarjeta por breakpoint (85% / ~2.15 por vista / ~3.15 por vista) con `snap-start shrink-0` y asegurar que la última tarjeta puede alinearse (snap-end o scroll-padding). Verificar en DevTools a 390, 768 y 1280 px: 1, 2 y 3 tarjetas completas y la siguiente asomando; se llega a la última.
- [x] 1.3 Simplificar `Card`: eliminar la prop `wide`, fijar la proporción 4:5, quitar `.reveal-photo` y ajustar `sizes` a `(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 30vw`. Verificar que las tarjetas tienen la misma altura y que los títulos quedan alineados.
- [x] 1.4 Actualizar el comentario de cabecera del componente (el que explica por qué se quitó Swiper) para contar la decisión nueva: carril con scroll nativo, todo el HTML en el servidor. Verificar con "Ver código fuente" que aparecen los títulos de todos los proyectos.

## 2. Navegación e indicador

- [x] 2.1 Añadir una ref al carril y un listener `scroll` pasivo con `requestAnimationFrame` que calcule `atStart`, `atEnd`, el progreso y el último índice visible, más un `ResizeObserver` que decida si hay desbordamiento. Verificar con `console` temporal o React DevTools que los valores cambian al deslizar y al redimensionar.
- [x] 2.2 Añadir botones anterior y siguiente (reutilizando el SVG de `Arrow`) en la línea de la cabecera, ocultos por debajo de `sm`, que llamen a `scrollBy(±clientWidth)` respetando `prefers-reduced-motion` y se deshabiliten en los extremos. Verificar en desktop que 3 clics recorren 9 proyectos y que los extremos se deshabilitan.
- [x] 2.3 Añadir el contador `NN / TT` (con cero a la izquierda) y la barra de progreso bajo el carril (`scaleX` por ref). Ocultar controles, contador y barra cuando no hay desbordamiento. Verificar que se actualizan con dedo, trackpad y botones, y que desaparecen dejando solo 2 proyectos publicados (o limitando `items` temporalmente).

## 3. Accesibilidad

- [x] 3.1 Añadir `role="region"` y `aria-label` (titular de la sección) al carril, y `aria-label` traducido a las flechas con `labels.prev` / `labels.next`. Verificar con el inspector de accesibilidad del navegador.
- [x] 3.2 Comprobar la navegación con teclado: tabular hasta una tarjeta oculta la hace visible con el anillo de foco, y Enter abre el lightbox; al cerrarlo el foco vuelve a la tarjeta. Si el foco queda tapado, ajustar `scroll-padding`.

## 4. Verificación de integración

- [x] 4.1 Ejecutar `npm run lint` y `npm run build` en `web/` sin errores. (Para que el lint pasara hubo que corregir dos errores `set-state-in-effect` que ya existían: el reinicio de foto del Lightbox y la lectura de `localStorage` en `CookieConsent.tsx`. Verificado que el banner sale solo sin decisión guardada, que al rechazar no vuelve y que la analítica solo carga al aceptar.)
- [x] 4.2 Prueba manual en móvil real (o emulación iOS/Android): el deslizamiento vertical sobre el carril hace scroll de la página, el horizontal mueve el carril, y la sección mide aproximadamente una pantalla. Probar la navegación anterior/siguiente del lightbox desde una tarjeta intermedia.
- [x] 4.3 Revisar los tres idiomas (`/es`, `/en`, `/ru`) y confirmar que las etiquetas de las flechas y los textos se traducen; en ruso, comprobar que los títulos más largos no desalinean las tarjetas.

## 5. Ajustes tras la revisión de la clienta

- [x] 5.1 Sacar los controles de la línea del titular: barra y contador en una fila bajo el carril, y flechas (el `Arrow` del Lightbox) en los extremos izquierdo y derecho del carril, centradas sobre las fotos. Verificado a 1280, 768 y 500 px con ratón: el centro de la flecha coincide con el de la foto (0 px de desvío) a 20 px de cada borde; al inicio solo se ve "siguiente" y al final solo "anterior".
- [x] 5.2 Mostrar las flechas solo con puntero preciso y desde 640 px (`hidden sm:pointer-fine:block`). Verificado sin flechas: táctil a 390 px, a 844 px en horizontal y en tablet de 1024 px (el dedo avanza el carril y el contador), y con ratón a 390 y 500 px (caso del simulador de teléfono). Con ratón a 640, 768 y 1280 px, las flechas se ven.
- [x] 5.3 Actualizar la spec (requisitos de botones e indicador) y el diseño (decisiones 3, 4, 5 y 5b, y la de accesibilidad) con estos cambios.
