# Design

## Context

`Projects.tsx` es un client component que recibe los proyectos ya resueltos al idioma desde `page.tsx` y los pinta en una rejilla de 12 columnas con alternancia 7/5. El `Lightbox` (galería por proyecto) ya usa scroll-snap nativo con la utilidad `.snap-row` de `globals.css`, que oculta la barra de scroll. Las portadas llevan la clase `.reveal-photo`, una animación ligada a `animation-timeline: view()`.

Un comentario del propio componente explica que antes había un carrusel de Swiper y se retiró porque dejaba proyectos fuera del HTML. Esta propuesta recupera la forma de carrusel, pero sin ese problema.

Motivación: ver proposal.md. Comportamiento exigido: ver specs/project-showcase/spec.md.

## Goals / Non-Goals

**Goals:**
- Carril con scroll nativo, que funcione sin JavaScript (el JS solo añade botones e indicador).
- Mismo componente y mismo marcado para todos los anchos; solo cambia el ancho de la tarjeta por CSS.

**Non-Goals:**
- Autoplay, bucle infinito o arrastrar con el ratón en desktop.
- Cambios en el `Lightbox`, en el esquema de Sanity o en las etiquetas del CMS.
- Un campo "destacado": el orden se sigue controlando con `order`.

## Decisions

### 1. Scroll-snap nativo en lugar de una librería
Contenedor `flex overflow-x-auto snap-x snap-mandatory` con `.snap-row`; cada tarjeta `snap-start shrink-0`.
- *Alternativas*: Swiper (ya se descartó por SEO y peso) y Embla (unos 7 KB y otra dependencia más). El scroll nativo da inercia táctil real, respeta el scroll vertical de la página y deja todo el HTML en el servidor. Es el mismo patrón que ya usa el lightbox.

### 2. Anchos de tarjeta calculados con CSS para que la siguiente asome
`basis-[85%]` en móvil, `sm:basis-[calc((100%-gap)/2.15)]` en tablet y `lg:basis-[calc((100%-2*gap)/3.15)]` en desktop. El `.15` sobrante es la parte que asoma de la siguiente tarjeta.
- *Alternativa*: dejar que el carril se salga hasta el borde de la ventana (full-bleed a la derecha). Queda más editorial, pero complica alinear la primera tarjeta con el `max-w-7xl` del encabezado y el `scroll-padding`. Se prefiere mantener el carril dentro del contenedor y que la siguiente tarjeta asome por el cálculo del ancho. Si en la revisión visual se quiere full-bleed, se consigue con `scroll-padding-inline-start` y un margen negativo, sin cambiar la spec.

### 3. Paginación: avanzar tantas tarjetas como caben enteras
Los botones llaman a `rail.scrollBy({ left: ±(porPágina × paso) })`, donde `paso` es la distancia entre dos tarjetas (ancho + gap) y `porPágina` las tarjetas que caben enteras. Se calcula así, y no con `clientWidth` a secas, para no depender de hacia qué lado redondea el snap el trozo de tarjeta que asoma.
- `prefers-reduced-motion`: se usa `behavior: 'auto'`.

### 4. Estado derivado del scroll
Un único listener `scroll` (pasivo, con `requestAnimationFrame`) calcula:
- `atStart` y `atEnd` (con tolerancia de 2 px) para deshabilitar las flechas.
- La barra marca lo ya visto: `(scrollLeft + clientWidth) / scrollWidth`, aplicado como `transform: scaleX()` por ref, sin re-render por frame. Se eligió esto frente a `scrollLeft / (scrollWidth - clientWidth)` porque así la barra no empieza vacía: al entrar ya marca las tarjetas visibles y se lee igual que el contador ("llevas 3 de 10").
- El contador, calculado contando las tarjetas cuyo borde derecho queda dentro de lo visible (descontando el padding que reserva sitio al foco).

Un `ResizeObserver` recalcula al cambiar el ancho y hace además la primera medida, porque se dispara al empezar a observar; así no hay `setState` síncrono en el efecto. También decide si hacen falta controles (`scrollWidth > clientWidth`), de modo que "pocos proyectos → sin controles" no depende de breakpoints.

### 5. Flechas en los extremos del carril; barra y contador debajo
Las flechas van superpuestas en los bordes izquierdo y derecho del carril, centradas en vertical sobre las fotos. Es el patrón de carrusel más reconocible: la flecha está justo donde está lo que mueve. La barra y el contador van en una fila bajo las tarjetas.
- Se reutiliza el componente `Arrow` del Lightbox (círculo blanco con sombra), así las flechas de la sección y las de la galería son las mismas. Una flecha deshabilitada se desvanece (`opacity-0`), así que al entrar solo se ve "siguiente".
- Centrado sobre la foto, no sobre la tarjeta entera (que incluye el texto de debajo): las flechas van en una capa absoluta con la altura exacta de una foto, `ancho de tarjeta × 5/4`, calculada con unidades de contenedor (`cqw`) por breakpoint. Así no hace falta medir con JavaScript. La capa es `pointer-events-none` salvo los botones, para que no bloquee los clics a las tarjetas.
- *Descartado (primera versión)*: contador y flechas en la línea del `SectionHeading`. Quedaban lejos de las tarjetas y había que subir hasta el titular para usarlos.
- *Descartado (segunda versión)*: flechas en una fila debajo del carril, junto al contador. Estaban más cerca, pero la clienta prefirió los extremos, que se entienden sin explicación.
- Contrapartida: la flecha derecha tapa parte de la tarjeta que asoma. Esa tarjeta ya está cortada a propósito, así que no se pierde contenido útil.

### 5b. Teléfono y tablet: solo con el dedo
Las flechas se muestran solo con puntero preciso (la capa de flechas lleva `hidden pointer-fine:block`, es decir `@media (pointer: fine)`), no por ancho de pantalla.
- La primera versión las ocultaba por debajo de 640 px (`sm:`). Así, un teléfono en horizontal (844 px) o una tablet sí las mostraba, y en una pantalla táctil unas flechas son un objetivo pequeño que compite con el gesto natural de deslizar. La clienta pidió que en el teléfono se navegue solo con el dedo.
- Con `pointer: fine` la regla depende de cómo se usa el dispositivo, no de su tamaño. Un portátil táctil con trackpad sigue mostrando flechas, porque su puntero principal es preciso.
- Además se exige un ancho mínimo de 640 px (`hidden sm:pointer-fine:block`). En la revisión, la clienta vio el sitio en un simulador de iPhone dentro del navegador del ordenador: allí el puntero es un ratón, `pointer: fine` era verdadero y salían flechas en una pantalla con aspecto de teléfono. La regla combinada cubre los dos casos: a tamaño de teléfono nunca hay flechas, y en pantallas táctiles grandes tampoco.
- En táctil se mantienen el contador y la barra: dicen cuánto queda sin pedir ningún toque. La tarjeta siguiente que asoma por la derecha es la invitación a deslizar.

### 6. `.reveal-photo` no se usa dentro del carril
`animation-timeline: view()` sigue al contenedor de scroll más cercano. Dentro del carril ese contenedor es el propio carril, que no se desplaza en vertical, así que las tarjetas fuera de vista se quedarían recortadas o sin animar. Se quita la clase de las tarjetas. Si se quiere una entrada animada, se aplica una sola vez a la sección entera.

### 7. Accesibilidad
- El carril lleva `role="region"`, `aria-roledescription="carrusel"` (sin traducir para no añadir claves al CMS; es opcional) y `aria-label` igual al titular de la sección.
- Las tarjetas siguen siendo `<button>`. El navegador ya desplaza un contenedor de scroll hasta el elemento que recibe el foco, así que no hace falta JS.
- El contorno de `:focus-visible` va 3 px por fuera de la tarjeta, y el `overflow` del carril lo recortaba. El carril lleva `p-2 -m-2` más `scroll-px-2`: el padding deja sitio al contorno, el margen negativo lo compensa y las tarjetas no se mueven de sitio.
- Las flechas usan `labels.prev` y `labels.next`, que ya existen.

### 8. `sizes` de las imágenes
Con el ancho de tarjeta fijo: `(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 30vw`. Así se descargan imágenes más pequeñas que con la tarjeta ancha actual (58vw).

## Risks / Trade-offs

- [Se pierde la composición de revista] → La clienta lo pidió así. El cambio visual queda anotado en la propuesta y la tipografía y los pies de foto actuales se mantienen para conservar el tono.
- [En desktop con ratón y sin trackpad no hay scroll horizontal natural] → Flechas visibles y siempre a la vista, en la cabecera.
- [Snap mandatory con tarjetas de ancho fraccionario puede impedir llegar a la última tarjeta] → La última tarjeta se alinea al final (`snap-end` en la última, o `scroll-padding-inline-end`). Se comprueba en los tres anchos.
- [Safari iOS: `scrollBy` smooth con snap puede quedarse a medias en versiones antiguas] → Degradación aceptable, porque el snap corrige la posición al soltar. Se prueba en un iPhone real o en el simulador.
- [Contador impreciso con tarjetas de ancho fraccionario] → Se redondea a la tarjeta completamente visible más a la derecha y se limita a `total` al final.

## Migration Plan

Es un cambio solo de front-end, sin datos que migrar. Se despliega en Vercel como siempre. Para deshacerlo basta con revertir el commit que modifica `Projects.tsx`.
