# Landing Page ANA V SAS — Brief de Animaciones

> Documento para el equipo de diseño y desarrollo (Cipher)
> Propósito: definir exactamente qué se anima, cuándo y cómo
> Sin especificaciones técnicas de librerías — eso se define aparte

---

## Principios rectores

- **Las animaciones no son decoración.** Cada movimiento cuenta una parte de la historia: la carga viaja de origen a destino, y ANA V SAS la acompaña en cada paso.
- **Estilo visual:** movimientos limpios, suaves, corporativos. Sin efectos 3D, brillos, sombras exageradas ni estética "cartoon". Coherente con el sistema de marca (azul principal #1F4E8C, azul marino #0D2B55, iconografía lineal de trazo limpio).
- **Ritmo:** nada brusco. Aceleraciones suaves (ease-in-out). Las animaciones deben sentirse naturales, no forzadas.
- **Rendimiento:** priorizar animaciones que corran suaves en mobile. Si algo es muy pesado para el viewport, replantear.

---

## 1. Hero — Ruta global animada

### Qué se ve
- Fondo: mapa mundi sutil (wireframe o tono muy bajo), ocupa todo el viewport
- Sobre el mapa: una línea punteada que conecta puntos de origen (Shanghái, Mumbai, Milán, Miami) con Colombia
- Un buque de carga (o avión, según la ruta) viajando sobre esa línea
- Texto superpuesto: headline + subheadline + CTA
- Logo horizontal en esquina superior izquierda

### Cuándo se activa
- Al cargar la página: el logo y el texto hacen fade-in + translateY desde abajo (0.8s)
- El mapa aparece de fondo con fade muy lento (1.2s)
- La línea de ruta se **dibuja sola**: aparece desde el origen hasta Colombia como si un lápiz invisible la trazara (stroke-dashoffset)
- El buque/avión avanza sobre la línea **sincronizado con el scroll**: mientras más scroll hacia abajo, más avanza el barco en su ruta. Si el usuario vuelve arriba, retrocede (efecto scrub).

### Cómo se ve
- Línea punteada: azul claro #4A86C5 o blanca si el fondo es oscuro
- Buque/avión: silueta simple, del mismo color del logo
- El buque deja una leve estela (opacidad baja) al pasar

### Estado final
- Cuando el usuario ha scrolleado el equivalente a un viewport, el buque llega a Colombia y la siguiente sección comienza a aparecer.

---

## 2. El problema — Cards de dolor con reveal

### Qué se ve
- Fondo blanco o gris claro #E9EDF2
- Tres cards en fila (desktop) o columna (mobile)
- Cada card tiene: ícono grande arriba, título, descripción corta

### Cuándo se activa
- Al scrollear hasta la sección: las cards entran una por una
- Card 1 entra primero (fade-in + translateY desde abajo, 0.5s)
- Card 2 entra 200ms después
- Card 3 entra 200ms después de la card 2
- El ícono de cada card tiene un micro-movimiento perpetuo muy sutil (flotar 2px arriba/abajo, ciclo de 3s) — solo cuando la card está visible

### Cómo se ve
- Las cards suben suavemente desde 30px abajo de su posición final
- Opacidad de 0 → 1 durante la transición
- El movimiento del ícono es casi imperceptible — debe sentirse vivo, no nervioso

---

## 3. Cómo funciona — Timeline animada

Esta es la sección principal. Es una **línea de tiempo horizontal** controlada por el scroll vertical del usuario.

### Estructura
- 4 pasos, cada uno ocupa un viewport completo cuando está activo
- El scroll vertical controla el avance horizontal entre pasos (efecto pin)
- Cada paso tiene: un número grande, un título, una descripción corta y un elemento visual animado

### Paso 1 — ✈️ Avión desde origen
- Elemento visual: un avión despegando desde un punto en la izquierda de la pantalla
- Animación: el avión cruza la pantalla de izquierda a derecha en trayectoria curva ascendente, dejando una estela punteada detrás
- Aparece un globo terráqueo girando lentamente al fondo
- Al mismo tiempo, una tarjeta dice: "Contactamos a tu proveedor — donde sea que esté tu mercancía"

### Paso 2 — 🚢 Buque con contenedores
- Transición: el avión se desvanece mientras el buque aparece desde el borde izquierdo
- Animación: el buque navega suavemente (movimiento horizontal muy lento, como meciéndose)
- Contenedores se **apilan en cubierta** uno a uno, apareciendo desde arriba y posándose (caída suave con bounce mínimo)
- Líneas de ruta marítima aparecen en el fondo

### Paso 3 — 🏗️ Montacargas moviendo cajas
- Escena cambia a puerto/bodega: montacargas visible desde perfil
- Animación: el montacargas levanta una caja, la desplaza ligeramente a la derecha, y la baja
- Cajas adicionales aparecen apiladas (stack effect)
- Documentos flotan cerca (papeles que se "firman" con un stamp animado)
- Texto: "Nacionalizamos tu carga — clasificación, declaraciones, DIAN"

### Paso 4 — 🚛 Camión en ruta
- Escena final: una carretera que cruza la pantalla
- Animación: un camión avanza por la carretera de izquierda a derecha
- En el destino: un pin de ubicación (map marker) parpadea suavemente
- Cajas aparecen siendo entregadas
- Texto: "Entregamos en tu bodega — de puerto directo a tus instalaciones"

### Comportamiento general de la timeline
- Cuando el usuario scrollea verticalmente, la línea de tiempo avanza horizontalmente (scroll hijacking)
- Cada paso se "clava" (pin) en pantalla mientras su animación se reproduce
- Al terminar la animación del paso, el scroll avanza al siguiente
- Si el usuario scrollea hacia arriba, retrocede en la línea de tiempo (efecto scrub)
- En mobile: la timeline se vuelve vertical, cada paso ocupa un viewport completo con reveal secuencial

---

## 4. Servicios — Cards con reveal escalonado

### Qué se ve
- Cuatro cards en grid 2×2 (desktop) o 1 columna (mobile)
- Cada card: ícono lineal (trazo limpio) + título + descripción breve

### Cuándo se activa
- Al entrar al viewport: todas las cards están ocultas inicialmente
- Card superior izquierda entra primero (fade + translateY)
- Card superior derecha entra 150ms después
- Card inferior izquierda entra 150ms después
- Card inferior derecha entra 150ms después
- Al hacer hover sobre una card (desktop): se eleva ligeramente (4px, translateY negativo) y el ícono cambia de azul claro a azul principal

### Cómo se ve
- Misma mecánica que las cards del problema: fade + translateY de 30px
- Transición suave de 0.4s por card
- La elevación en hover dura 0.2s

---

## 5. Diferenciadores — Contadores animados

### Qué se ve
- Cuatro columnas, cada una con: número grande + label + descripción breve
- Fondo: azul marino #0D2B55, texto blanco

### Cuándo se activa
- Los 4 contadores entran simultáneamente al llegar al viewport
- **30+**: el número cuenta de 0 a 30 (velocidad: ~1.5s)
- **100%**: aparece directo (sin animación de conteo)
- **24/7**: aparece directo (sin animación de conteo)
- **1**: el número cuenta de 0 a 1 (~0.5s)
- Debajo de cada número: una barra horizontal decorativa se expande de 0 a 100% de ancho (~0.8s)
- Las barras se activan con 200ms de delay entre cada una (en cascada)

### Cómo se ve
- Los números deben tener un efecto de "ticker" digital: los dígitos cambian rápidamente hasta llegar al valor final
- La barra se expande de izquierda a derecha, con un leve ease-out al final
- Las descripciones aparecen con fade justo después de que el contador termina

---

## 6. Clientes — Sectores con reveal simple

### Qué se ve
- Lista de sectores con icono + nombre + descripción breve
- Un espacio reservado para testimonial (cuando esté disponible)

### Cuándo se activa
- Cada ítem de sector aparece con fade + translateY en cascada (200ms de separación)
- Si hay testimonial: el texto del testimonio se revela como si se estuviera escribiendo (efecto typewriter), y las comillas decorativas se abren

---

## 7. Footer — CTA final

### Qué se ve
- Sección completa de fondo azul marino #0D2B55
- Logo en versión negativa (blanco)
- Headline grande + botón CTA + datos de contacto

### Cuándo se activa
- Al scrollear hacia ella: el fondo azul marino sube desde abajo como una cortina que revela el contenido (clip-path reveal o translateY)
- El logo y el headline hacen fade-in escalonado
- El botón aparece con un leve scale (1 → 1.05 → 1) al cargar, como un "latido" suave
- En hover (desktop): el botón cambia de color (#1F4E8C → tono más claro) o se ilumina

### Elementos decorativos
- Flotando en el fondo (opacidad muy baja ~10%): siluetas sutiles de contenedor, barco, camión — movimientos lentos y perpetuos (flotación de 10px en ciclo de 8s)
- No deben distraer — son una textura viva, no figuras reconocibles a simple vista

---

## Resumen de animaciones por elemento visual

| Elemento | Sección | Animación |
|----------|---------|-----------|
| Mapa mundi | Hero | Fade de fondo, muy lento |
| Línea de ruta | Hero | Se dibuja sola (dash offset) |
| Buque | Hero + Timeline paso 2 | Sigue la ruta con el scroll / navegación horizontal |
| ✈️ Avión | Timeline paso 1 | Vuelo trayectoria curva + estela |
| 📦 Contenedores | Timeline paso 2 | Apilamiento uno a uno en cubierta |
| 🏗️ Montacargas | Timeline paso 3 | Levanta y desplaza cajas |
| 📦 Cajas | Timeline paso 3 | Aparecen apilándose |
| 🚛 Camión | Timeline paso 4 | Avance horizontal por carretera |
| Pin de destino | Timeline paso 4 | Parpadeo suave |
| Documentos / Stamp | Timeline paso 3 | Sello que cae y marca |
| Cards (dolor) | Sección 2 | Fade + translateY en cascada |
| Cards (servicios) | Sección 4 | Fade + translateY en diagonal + hover lift |
| Contadores | Sección 5 | Ticker digital + barra de progreso |
| Cortina azul marino | Footer | Clip-path reveal desde abajo |
| Elementos flotantes | Footer | Movimiento perpetuo lento (opacidad baja) |

---

## Notas para el desarrollador (Cipher)

- **Scroll hijacking:** la timeline (sección 3) requiere que el scroll vertical controle el avance horizontal. No usar scroll nativo del navegador para esa sección — implementar con pin y scrub.
- **Efecto scrub:** el hero y la timeline deben responder al scroll en ambas direcciones (hacia abajo y hacia arriba). Si el usuario sube, las animaciones deben revertirse.
- **Responsive:** en mobile (< 768px), la timeline horizontal se convierte en vertical. Cada paso ocupa un viewport completo con reveal scroll. El hero mantiene la ruta pero simplificada.
- **Rendimiento:** las animaciones deben usar transform y opacity (composite only) para no forzar repaints del navegador. Evitar animar width, height, top, left.
- **Accesibilidad:** si el usuario prefiere movimiento reducido (prefers-reduced-motion), desactivar todas las animaciones y mostrar todo estático con fade simple de 0.3s.
- **Imágenes:** los elementos visuales (buque, avión, camión, montacargas, contenedores, cajas) deben ser SVG de trazo limpio — igual que los íconos. No usar fotografías para estos elementos animados. Las fotografías reales van en fondos de sección si aplica.

---

*Documento preparado por Atlas — Gerencia General ANA V SAS*
*Para uso del equipo de diseño y desarrollo (Cipher)*
