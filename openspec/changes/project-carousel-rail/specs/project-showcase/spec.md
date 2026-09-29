# Spec Delta

## Purpose

Define cómo la página de inicio presenta las portadas de los proyectos: un carril horizontal compacto que permite recorrer todo el portafolio sin alargar el scroll vertical de la página.

## ADDED Requirements

### Requirement: Carril horizontal de proyectos
La sección de proyectos SHALL mostrar todas las portadas publicadas en una única fila horizontal desplazable, ordenadas por el campo `order` ascendente. La altura de la sección MUST NOT crecer con el número de proyectos.

#### Scenario: Muchos proyectos no alargan la página
- **WHEN** hay 9 proyectos publicados
- **THEN** las 9 portadas aparecen en una sola fila y la sección ocupa la misma altura que con 3 proyectos

#### Scenario: Orden respetado
- **WHEN** un proyecto tiene `order` menor que otro
- **THEN** su tarjeta aparece antes (más a la izquierda) en el carril

### Requirement: Tarjetas visibles según el ancho de pantalla
El carril SHALL mostrar 1 tarjeta completa en móvil (<640px), 2 en tablet (640–1023px) y 3 en desktop (≥1024px). Cuando hay más proyectos que tarjetas visibles, la siguiente tarjeta MUST asomar parcialmente por el borde derecho para indicar que hay más contenido. Todas las tarjetas SHALL tener el mismo tamaño y la misma proporción de imagen.

#### Scenario: Desktop
- **WHEN** la ventana mide 1280px de ancho y hay 9 proyectos
- **THEN** se ven 3 tarjetas completas y parte de la cuarta

#### Scenario: Móvil
- **WHEN** la ventana mide 390px de ancho y hay 9 proyectos
- **THEN** se ve 1 tarjeta completa y parte de la segunda

#### Scenario: Pocos proyectos
- **WHEN** hay tantos o menos proyectos que tarjetas visibles
- **THEN** no aparecen controles de navegación ni indicador de progreso

### Requirement: Deslizamiento táctil y con trackpad
El carril SHALL poder desplazarse horizontalmente con gesto táctil, trackpad o rueda horizontal, y MUST detenerse alineado al inicio de una tarjeta.

#### Scenario: Deslizar en móvil
- **WHEN** el usuario desliza el carril hacia la izquierda en un teléfono
- **THEN** el carril avanza y se detiene con una tarjeta alineada al borde izquierdo

#### Scenario: El scroll vertical de la página no se bloquea
- **WHEN** el usuario desliza en vertical sobre el carril
- **THEN** la página hace scroll vertical con normalidad

### Requirement: Botones anterior y siguiente
Cuando el dispositivo tiene un puntero preciso (ratón o trackpad) y la pantalla mide al menos 640px de ancho, el carril SHALL mostrar botones anterior y siguiente que desplazan el carril una página (el número de tarjetas visibles). En dispositivos táctiles (teléfono en cualquier orientación, tablet) y en cualquier pantalla de menos de 640px los botones MUST NOT mostrarse: la navegación es solo con el dedo. Los botones MUST estar en los extremos del carril (anterior a la izquierda, siguiente a la derecha), superpuestos y centrados verticalmente sobre las fotos de las tarjetas. Un botón deshabilitado MUST NOT verse. El botón anterior MUST estar deshabilitado al inicio y el siguiente al final. Los botones MUST tener etiquetas accesibles traducidas al idioma actual.

#### Scenario: Avanzar una página
- **WHEN** en desktop el usuario pulsa "siguiente" estando al inicio
- **THEN** el carril se desplaza hasta que la cuarta tarjeta queda alineada a la izquierda

#### Scenario: Límites
- **WHEN** el carril está al final
- **THEN** el botón siguiente está deshabilitado y no se ve, y el anterior está habilitado

#### Scenario: Al entrar
- **WHEN** el carril está al inicio
- **THEN** solo se ve la flecha "siguiente", en el extremo derecho

#### Scenario: Tamaño de teléfono con ratón
- **WHEN** el sitio se ve a 390px de ancho con ratón (por ejemplo, un simulador de teléfono en el ordenador)
- **THEN** no aparecen flechas

#### Scenario: Teléfono en horizontal
- **WHEN** un teléfono táctil en horizontal muestra el carril con 844px de ancho
- **THEN** no aparecen flechas y el carril se recorre deslizando con el dedo

#### Scenario: Flechas en los extremos
- **WHEN** el usuario ve las tarjetas en desktop
- **THEN** las flechas están sobre los bordes izquierdo y derecho del carril, a media altura de las fotos

### Requirement: Indicador de posición
Cuando hay más proyectos que tarjetas visibles, la sección SHALL mostrar, debajo del carril, un contador con el formato `NN / TT` (último proyecto visible / total) y una barra de progreso que marque la parte del carril ya vista (al entrar ya refleja las tarjetas visibles). Ambos MUST mostrarse también en dispositivos táctiles y actualizarse al desplazar por cualquier medio (dedo, trackpad, botones o teclado).

#### Scenario: Contador tras deslizar
- **WHEN** en desktop, con 9 proyectos, el usuario desliza hasta el final
- **THEN** el contador muestra `09 / 09` y la barra de progreso está completa

### Requirement: Accesibilidad por teclado
Cada tarjeta SHALL ser un elemento enfocable. Al recibir el foco, una tarjeta fuera de la vista MUST desplazarse dentro del carril hasta quedar visible. Activar una tarjeta (Enter o Espacio) SHALL abrir el detalle del proyecto igual que un clic.

#### Scenario: Tabulación
- **WHEN** el usuario tabula hasta la quinta tarjeta, que no estaba visible
- **THEN** el carril se desplaza para mostrarla y el foco es visible

### Requirement: Todos los proyectos presentes en el HTML
Todas las tarjetas, con su título, descripción y texto alternativo de la portada, SHALL estar presentes en el HTML servido por el servidor, estén o no visibles en pantalla.

#### Scenario: HTML sin JavaScript
- **WHEN** se solicita la página sin ejecutar JavaScript
- **THEN** el HTML contiene los títulos de todos los proyectos publicados

### Requirement: Apertura del detalle sin cambios
Al activar una tarjeta del carril SHALL abrirse el detalle del proyecto (galería, descripción, contacto y navegación anterior/siguiente entre proyectos) con el mismo comportamiento que antes del cambio.

#### Scenario: Abrir desde el carril
- **WHEN** el usuario pulsa la sexta tarjeta
- **THEN** se abre el detalle de ese proyecto y "siguiente" lleva al séptimo
