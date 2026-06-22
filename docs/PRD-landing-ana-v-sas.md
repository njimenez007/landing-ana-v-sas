---
title: Landing Page ANA V SAS
created: 2026-06-22
updated: 2026-06-22
status: draft
author: PRD Coach (Cipher)
---

# PRD: Landing Page Corporativa ANA V SAS
*Working title: Landing ANA V SAS — Importaciones*

## 0. Document Purpose

Este PRD es para el equipo de desarrollo (Cipher), el CEO (Nicolás Jiménez) y el COO (Atlas). Define los requisitos funcionales y no funcionales de la landing page corporativa de **ANA V SAS**, agencia de aduanas y carga internacional con +30 años de experiencia.

El producto se construye sobre los siguientes inputs:
- **landing-copy-anav-v2.md**: copy completo con 7 secciones, CTAs, tono y voz
- **landing-animaciones-brief.md**: brief detallado de animaciones con scroll hijacking, timeline, contadores y efectos visuales
- **Briefing verbal**: paleta de colores (#1F4E8C, #0D2B55), tipografía (Dancing Script para eslogan), integración con WhatsApp

**Pendiente UX:** No existe un diseño UX previo. Este PRD define el comportamiento esperado; el diseño visual se implementa directamente desde el copy + brief de animaciones.

## 1. Vision

ANA V SAS necesita una landing page que **convierta leads industriales en conversaciones de WhatsApp**. No es un brochure digital — es una máquina de captación para fabricantes colombianos que importan materia prima, maquinaria e insumos desde cualquier parte del mundo.

La página cuenta una historia: el problema del importador (papeleo, múltiples interlocutores, sorpresas de último minuto) → la solución de ANA V SAS (gestión integral desde el origen hasta la bodega) → la confianza (30+ años, 100% personalizado, 24/7).

Cada sección está diseñada para mover al visitante un paso más cerca del botón de WhatsApp. Las animaciones no son decorativas — refuerzan la narrativa de que la carga viaja desde el origen hasta Colombia, y ANA V SAS la acompaña en cada paso.

**Stakes:** Lanzamiento público. La landing es la cara digital de la empresa. La primera impresión define si un lead industrial contacta o sigue buscando.

## 2. Target User

### 2.1 Jobs To Be Done

- **Funcional:** Encontrar un agente de aduanas y carga que gestione toda la importación desde el origen hasta la bodega
- **Funcional:** Obtener una cotización clara sin letra pequeña
- **Funcional:** Verificar que la empresa tiene experiencia real en su sector (calzado, EPP, tecnología, manufactura)
- **Emocional:** Dejar de preocuparse por trámites aduaneros, coordinaciones y sorpresas de último minuto
- **Social:** Validar que eligió un proveedor serio y confiable frente a sus socios o jefes

### 2.2 Non-Users (v1)

- Empresas que solo exportan (no importan)
- Particulares haciendo compras personales internacionales
- Empresas que ya tienen un agente de aduanas establecido y no buscan cambio `[ASSUMPTION: podrían ser leads por servicio superior]`

### 2.3 Key User Journeys

- **UJ-1. Carlos, jefe de compras industriales, busca un agente de aduanas que le resuelva.**
  - **Persona + context:** Carlos, jefe de compras en una fábrica de calzado en Bogotá. Importa suelas y cuero desde China cada mes. Está harto de coordinar entre el agente de carga, la aduana y el transportista.
  - **Entry state:** Llega por Google buscando "agencia de aduanas Bogotá" o "importar desde China Colombia". `[ASSUMPTION: SEO inicial en esas keywords]`
  - **Path:**
    1. Ve el Hero: "Importar sin estrés. De cualquier parte del mundo hasta tu fábrica." — resuena.
    2. Scrollea al Problema: reconoce el papeleo, los múltiples interlocutores, las sorpresas. "Eso me pasa todos los meses".
    3. Scrollea al Cómo funciona: la timeline animada le muestra visualmente el proceso de principio a fin. El efecto scrub refuerza "esto es serio".
    4. Ve los Servicios: agente de carga, aduana, asesoría, capacitaciones — "todo lo que necesito en un solo lugar".
    5. Ve los Diferenciadores: 30+ años, 100% personalizado, 24/7, 1 solo responsable.
  - **Climax:** Llega al Footer CTA y ve "Iniciar conversación → WhatsApp". El botón está visible y accesible.
  - **Resolution:** Hace clic, se abre WhatsApp con un mensaje pre-escrito. Carlos describe su necesidad y recibe atención personalizada.
  - **Edge case:** Si Carlos llega en horario no laboral, el mensaje queda entregado y se responde al inicio del siguiente día hábil. `[ASSUMPTION: sin chatbot ni auto-respuesta en v1]`

- **UJ-2. María, gerente de operaciones, investiga antes de recomendar.**
  - **Persona + context:** María, gerente de operaciones en una empresa de EPP. Su jefe le pidió "conseguir un agente de aduanas confiable". Ella investiga a fondo antes de recomendar.
  - **Entry state:** Llega por recomendación o buscando "ANA V SAS agencia de aduanas".
  - **Path:**
    1. Va directo a la sección de Clientes para ver si la empresa trabaja con EPP. Encuentra "🧤 EPP (Equipos de Protección Personal)".
    2. Mira los Diferenciadores: 30+ años de experiencia le da confianza.
    3. Examina los Servicios para entender el alcance completo.
    4. No hay testimonial aún — `[ASSUMPTION: esto resta confianza. Prioridad conseguir al menos un testimonial]`.
  - **Climax:** Decide que la empresa es seria y contacta por WhatsApp.
  - **Resolution:** Envía un mensaje pidiendo información para presentar a su jefe.

## 3. Glossary

- **ANA V SAS**: Agencia de Aduanas y Carga Internacional, comercio exterior. El cliente y sujeto de la landing.
- **Lead**: Visitante industrial que potencialmente se convierte en cliente.
- **CTA (Call to Action)**: Botón o enlace diseñado para que el usuario realice una acción específica (en este caso, iniciar conversación por WhatsApp).
- **WhatsApp**: Canal de conversión principal. Todos los CTAs apuntan a una conversación de WhatsApp. `[ASSUMPTION: número único para todos los leads en v1]`
- **Scroll Hijacking**: Técnica donde el scroll vertical del usuario controla un avance horizontal o animación no lineal en la página.
- **Scrub**: Efecto donde la animación responde en ambas direcciones del scroll (hacia abajo y hacia arriba).
- **Pin**: Mecanismo de GSAP ScrollTrigger que "clava" una sección en el viewport mientras su animación se reproduce.
- **Timeline (Sección 3)**: Línea de tiempo horizontal de 4 pasos que narra visualmente el proceso de importación.
- **Nacionalización**: Proceso aduanero mediante el cual una carga importada queda legalmente disponible en el país.
- **FLOW**: Herramienta de generación de video a partir de imágenes para animaciones de fondo.
- **GSAP (GreenSock Animation Platform)**: Librería de animaciones JavaScript usada para scroll hijacking, scrub, pin y animaciones SVG.

## 4. Features

### 4.1 Hero — El Gancho

**Description:** Primera impresión. Ocupa el viewport completo. Fondo con mapa mundi estilizado + ruta animada desde orígenes globales hacia Colombia. Texto superpuesto: headline, subheadline, CTA principal y secundario. Logo ANA V SAS en esquina superior izquierda. Realiza UJ-1.

**Functional Requirements:**

#### FR-1: Mapa mundi de fondo
El visitante ve un mapa mundi wireframe en tono bajo como fondo del Hero. El mapa aparece con fade lento (1.2s) al cargar la página.

**Consequences (testable):**
- El mapa se renderiza en ≤ 2s desde la carga de la página
- El mapa es un SVG inline o imagen generada (no un mapa interactivo tipo Google Maps)
- En mobile, el mapa se simplifica para no sobrecargar el viewport

**Out of Scope:**
- Mapas interactivos con zoom
- Mapas con datos en tiempo real

#### FR-2: Línea de ruta animada (stroke-dashoffset)
Una línea punteada se dibuja sola desde puntos de origen (Shanghái, Mumbai, Milán, Miami) hasta Colombia al cargar la página.

**Consequences (testable):**
- La línea se dibuja completamente en ≤ 3s
- El color de la línea es `#4A86C5` o blanco, según legibilidad

#### FR-3: Buque/avión sincronizado con scroll
Un buque de carga (o avión) viaja sobre la línea de ruta. Su posición avanza o retrocede sincronizada con el scroll del usuario (efecto scrub). Realiza UJ-1.

**Consequences (testable):**
- El buque comienza en el origen y llega a Colombia cuando el usuario ha scrolleado 1 viewport completo
- El scrub funciona en ambas direcciones (scroll up = barco retrocede)
- El buque deja una estela de opacidad baja al pasar

**Out of Scope:**
- Selección interactiva de ruta por parte del usuario
- Rutas en tiempo real

#### FR-4: Texto y CTAs del Hero
Headline, subheadline, CTA principal y secundario aparecen con fade-in + translateY (0.8s) al cargar. Realiza UJ-1.

**Consequences (testable):**
- Texto visible antes de que termine la animación de la ruta
- CTA principal es un botón visible siempre (sticky en mobile)
- CTA principal abre WhatsApp al hacer clic `[ASSUMPTION: con mensaje predefinido: "Hola, quiero cotizar mi importación"]`
- CTA secundario ("Ver cómo funciona ↓") hace scroll suave a la sección 3

#### FR-5: Logo y eslogan
Logo ANA V SAS en esquina superior izquierda con eslogan "¡Justo a tiempo!" en Dancing Script. Realiza UJ-1.

**Consequences (testable):**
- Logo linkea al home (scroll to top si es single page)
- Eslogan visible en desktop y mobile

### 4.2 El Problema — Por qué necesitas esto

**Description:** Tres cards de dolor (Papeleo sin fin, Demasiados interlocutores, Sorpresas de último minuto) que aparecen en cascada al scrollear. Cada card tiene ícono, título, descripción. Realiza UJ-1.

**Functional Requirements:**

#### FR-6: Cards de dolor con reveal escalonado
Tres cards en fila (desktop) o columna (mobile) aparecen con fade-in + translateY desde abajo. Card 1 a los 0s, Card 2 a los 200ms, Card 3 a los 400ms.

**Consequences (testable):**
- Animación solo se dispara cuando la sección entra al viewport
- Íconos tienen micro-movimiento perpetuo (flotar 2px, ciclo 3s) mientras la card está visible
- La animación dura 0.5s por card
- En `prefers-reduced-motion`, todas las cards aparecen inmediatamente sin animación

#### FR-7: CTA de sección
Botón "Sí, quiero delegar esto" al final de la sección. Abre WhatsApp al hacer clic.

**Consequences (testable):**
- Botón con efecto hover: `#1F4E8C` → `#0D2B55`
- Área táctil mínima 44×44px en mobile

### 4.3 Cómo funciona — Timeline Animada

**Description:** La sección principal del producto. Una línea de tiempo horizontal de 4 pasos controlada por scroll vertical (scroll hijacking con pin + scrub). Cada paso ocupa un viewport completo y tiene su propia animación visual. Realiza UJ-1 (pasos 3-4 del journey) y UJ-2.

**Functional Requirements:**

#### FR-8: Scroll hijacking horizontal (desktop)
El scroll vertical del usuario controla el avance horizontal entre los 4 pasos. Mecanismo de pin: la sección se "clava" en pantalla mientras su animación se reproduce. Efecto scrub bidireccional.

**Consequences (testable):**
- Scroll hacia abajo avanza al siguiente paso horizontal
- Scroll hacia arriba retrocede al paso anterior
- El pin se mantiene mientras la sección completa de 4 pasos se reproduce
- Al terminar el último paso, el scroll continúa verticalmente a la siguiente sección
- No hay scroll horizontal nativo visible (sin scrollbar horizontal del navegador) `[ASSUMPTION: si es posible técnicamente con GSAP ScrollTrigger pin + scrub horizontal]`

**Out of Scope:**
- Scroll horizontal con swipe táctil en desktop

#### FR-9: Paso 1 — Contacto al proveedor
Avión despegando desde la izquierda, trayectoria curva ascendente, estela punteada. Globo terráqueo girando al fondo.

**Consequences (testable):**
- Animación se reproduce al entrar al paso (scrollear al viewport correspondiente)
- El avión cruza la pantalla en ~2s con ease-in-out
- La estela es una línea punteada que sigue al avión

#### FR-10: Paso 2 — Transporte
Buque navegando suavemente (movimiento horizontal lento, balanceo). Contenedores se apilan en cubierta uno a uno. Líneas de ruta marítima en el fondo.

**Consequences (testable):**
- Máximo 5 contenedores se apilan, cada uno apareciendo desde arriba con caída suave
- El buque tiene movimiento perpetuo horizontal mientras el paso está visible

#### FR-11: Paso 3 — Nacionalización
Montacargas en perfil levantando y desplazando cajas. Documentos flotando con sello animado (stamp que cae y marca).

**Consequences (testable):**
- El montacargas levanta la caja en ~1s, la desplaza en ~0.5s, la baja en ~1s
- El sello cae con sonido visual (animación de impacto) `[ASSUMPTION: sin sonido real]`

#### FR-12: Paso 4 — Entrega en bodega
Carretera cruzando la pantalla. Camión avanzando de izquierda a derecha. Pin de ubicación parpadeando en el destino. Cajas siendo entregadas.

**Consequences (testable):**
- El camión avance dura mientras el paso está activo
- Pin parpadea con ciclo de 1.5s

#### FR-13: Timeline vertical (mobile)
En viewports ≤ 768px, la timeline se convierte en vertical. Cada paso ocupa un viewport completo con reveal secuencial al scrollear.

**Consequences (testable):**
- No hay scroll hijacking en mobile — cada paso se revela al scrollear verticalmente normalmente
- Las animaciones de cada paso se simplifican (sin buques voladores complejos)
- El rendimiento se mantiene fluido en dispositivos móviles

### 4.4 Servicios — Lo que hacemos

**Description:** Cuatro servicios en grid 2×2 (desktop) o 1 columna (mobile). Cada card: ícono lineal + título + descripción. Aparecen en diagonal con fade + translateY. Realiza UJ-1 (paso 4) y UJ-2.

**Functional Requirements:**

#### FR-14: Cards de servicios con reveal diagonal
Cuatro cards en grid aparecen secuencialmente en orden diagonal al entrar al viewport.

**Consequences (testable):**
- Card 1 (sup-izq) → 0ms, Card 2 (sup-der) → 150ms, Card 3 (inf-izq) → 300ms, Card 4 (inf-der) → 450ms
- Transición suave de 0.4s por card

#### FR-15: Efecto hover en cards (desktop)
Al hacer hover sobre una card, se eleva 4px (translateY negativo) y el ícono cambia de color.

**Consequences (testable):**
- La elevación dura 0.2s con ease
- Ícono cambia de `#4A86C5` a `#1F4E8C`
- En mobile/touch, no hay hover (mantener estática)

#### FR-16: CTA de servicios
Botón "Necesito estos servicios → WhatsApp" abre WhatsApp.

### 4.5 Diferenciadores — Por qué ANA V SAS

**Description:** Cuatro columnas con contadores animados (30+, 100%, 24/7, 1) sobre fondo azul marino `#0D2B55`. Contadores tipo ticker digital + barras de progreso decorativas. Realiza UJ-1 (paso 5) y UJ-2.

**Functional Requirements:**

#### FR-17: Contadores con animación ticker
Números aparecen con efecto ticker digital (dígitos cambian rápidamente hasta llegar al valor final).

**Consequences (testable):**
- "30+": cuenta de 0 a 30 en ~1.5s
- "100%": aparece directo sin animación de conteo
- "24/7": aparece directo sin animación de conteo
- "1": cuenta de 0 a 1 en ~0.5s
- Todos los contadores se disparan simultáneamente al entrar al viewport

#### FR-18: Barras decorativas
Debajo de cada número, una barra horizontal se expande de 0 a 100% de ancho con ease-out. Cascada con 200ms de delay entre barras.

**Consequences (testable):**
- La barra tarda ~0.8s en expandirse completamente
- El delay en cascada es visible y secuencial

#### FR-19: Fondo y contraste
La sección usa fondo `#0D2B55` con texto blanco. Garantiza contraste AA mínimo.

**Consequences (testable):**
- Relación de contraste ≥ 4.5:1 para texto normal `[ASSUMPTION: verificar con herramienta de contraste]`

### 4.6 Clientes y Casos — Para quién trabajamos

**Description:** Lista de sectores atendidos con ícono + nombre + descripción. Espacio reservado para testimonial futuro. Realiza UJ-2.

**Functional Requirements:**

#### FR-20: Sectores con reveal en cascada
Cada ítem de sector aparece con fade + translateY en cascada (200ms de separación).

**Consequences (testable):**
- Los sectores se revelan en orden al scrollear a la sección

#### FR-21: Testimonial placeholder
Espacio reservado para testimonial real cuando esté disponible. Formato: texto entre comillas + nombre, cargo, empresa. Si hay testimonial, se revela con efecto typewriter.

**Consequences (testable):**
- Efecto typewriter solo si hay testimonial cargado
- Sin testimonial, la sección se muestra sin el placeholder visible `[ASSUMPTION: o se muestra "Próximamente"]`

**Out of Scope:**
- Carrusel de testimonios en v1

### 4.7 Footer / CTA Final

**Description:** Sección completa con fondo `#0D2B55`. Headline grande, botón CTA, datos de contacto, logo. Efecto de cortina que sube desde abajo al scrollear. Elementos decorativos flotantes con opacidad baja. Realiza UJ-1 (clímax final).

**Functional Requirements:**

#### FR-22: Cortina de revelado
El fondo azul marino sube desde abajo como una cortina al scrollear a la sección (clip-path reveal o translateY).

**Consequences (testable):**
- La cortina se completa en ~0.8s
- El contenido (logo, headline, botón, contactos) aparece con fade-in escalonado después de la cortina

#### FR-23: Botón CTA con efecto latido
El botón aparece con un leve scale (1 → 1.05 → 1) al cargar la sección, como un latido suave.

**Consequences (testable):**
- La animación de latido dura ~0.6s
- En hover (desktop): botón cambia de color o se ilumina

#### FR-24: Elementos flotantes decorativos
Siluetas sutiles de contenedor, barco, camión flotando en el fondo con opacidad ~10%. Movimiento lento perpetuo (flotación 10px, ciclo 8s).

**Consequences (testable):**
- No deben distraer del contenido principal
- Se mantienen dentro del footer y no se salen de la sección

#### FR-25: CTAs WhatsApp en todas las secciones clave
Tres CTAs principales: Hero ("Quiero cotizar mi importación"), Problema ("Sí, quiero delegar esto"), Footer ("Iniciar conversación → WhatsApp"). Opcional: Servicios ("Necesito estos servicios").
Todos abren WhatsApp con mensaje predefinido.

**Consequences (testable):**
- Todos los CTAs abren `https://wa.me/57XXXXXXXXX?text={mensaje}`
- El mensaje varía según el CTA (cotizar / delegar / servicios / contacto)
- En mobile, el botón flotante del Hero es sticky en la parte inferior

### 4.8 Cross-cutting — Rendimiento y Responsive

#### FR-26: Animaciones GPU-composited
Todas las animaciones usan solo `transform` y `opacity` para evitar repaints.

**Consequences (testable):**
- Sin animaciones de `width`, `height`, `top`, `left`, o `margin`
- Uso de `will-change: transform` en elementos animados

#### FR-27: prefers-reduced-motion
Si el usuario tiene preferencia de movimiento reducido, todas las animaciones se desactivan. La página se muestra completamente estática con fade simple de 0.3s.

**Consequences (testable):**
- `@media (prefers-reduced-motion: reduce)` desactiva todas las animaciones de GSAP
- `GSAP.matchMedia()` o check de `window.matchMedia('(prefers-reduced-motion: reduce)')`

#### FR-28: Responsive design
La página funciona correctamente en:
- Desktop (≥ 1024px)
- Tablet (768px - 1023px)
- Mobile (≤ 767px)

**Consequences (testable):**
- En mobile (< 768px), la timeline horizontal (FR-8) se convierte en vertical (FR-13)
- En mobile, las cards pasan de fila (desktop) a columna
- En mobile, el botón flotante del Hero es sticky
- Área táctil mínima 44×44px en mobile

#### FR-29: Carga inicial optimizada
La página carga el contenido crítico primero. Las animaciones se cargan asíncronamente.

**Consequences (testable):**
- Largest Contentful Paint (LCP) ≤ 2.5s `[ASSUMPTION: depende del hosting y assets]`
- GSAP se carga desde CDN con diferido o module pattern
- Las imágenes generadas / videos FLOW tienen lazy loading

#### FR-30: SEO básico
Meta tags, Open Graph, schema.org para negocio local (agencia de aduanas).

**Consequences (testable):**
- Title tag incluye "Importaciones" y "ANA V SAS"
- Meta description de 155-160 caracteres
- Open Graph tags (title, description, image)
- Schema.org LocalBusiness JSON-LD

## 5. Non-Goals (Explicit)

- No es un e-commerce — no hay carrito de compras, ni checkout, ni pagos
- No es un portal de tracking de carga — no hay login, ni seguimiento en tiempo real
- No es un blog — no hay artículos, categorías, ni CMS en v1
- No tiene chatbot automatizado — la conversación es directa con un humano por WhatsApp
- No tiene multi-idioma en v1 — solo español colombiano
- No tiene animaciones 3D, WebGL, ni efectos con Three.js — todo es SVG/GSAP 2D

## 6. MVP Scope

### 6.1 In Scope

- Las 7 secciones completas con copy definitivo
- Hero con mapa + ruta animada + buque/avión con scrub
- Sección Problema con 3 cards de dolor
- Timeline horizontal de 4 pasos con scroll hijacking + animaciones SVG (avión, buque, montacargas, camión)
- Sección Servicios con 4 cards
- Sección Diferenciadores con contadores animados
- Sección Clientes con sectores listados + placeholder testimonial
- Footer con cortina de revelado + CTA WhatsApp
- Todos los CTAs funcionales apuntando a WhatsApp
- Responsive (desktop + mobile)
- prefers-reduced-motion
- SEO básico (meta tags, OG, schema)
- Logo ANA V SAS en Hero y Footer
- Número de WhatsApp configurable

### 6.2 Out of Scope for MVP

- Animaciones con FLOW video — se integran como mejoras post-MVP si se generan los assets `[ASSUMPTION: decisión del CEO]`
- Testimonial real — cuando Ana consiga uno, se agrega
- Chatbot o auto-respuesta de WhatsApp
- Multi-idioma
- Blog o sección de noticias
- Integración con CRM (ANA V SAS OS)
- Analytics avanzado (solo Google Analytics básico)
- Formulario de contacto (solo WhatsApp)

## 7. Success Metrics

**Primary**

- **SM-1**: Click-through rate a WhatsApp ≥ 3% de visitantes únicos. Valida FR-25, FR-4, FR-7, FR-16, FR-23.

**Secondary**

- **SM-2**: Tasa de rebote ≤ 50%. Valida FR-26, FR-27, FR-28, FR-29. `[ASSUMPTION: benchmark para landing B2B]`
- **SM-3**: Tiempo en página ≥ 45s en desktop (la timeline tarda ~30-45s en recorrerse). Valida FR-8 a FR-13, FR-1 a FR-5.
- **SM-4**: Mobile bounce rate ≤ 65%. Valida FR-13, FR-28.

**Counter-metrics (do not optimize)**

- **SM-C1**: No optimizar para que todos los visitantes hagan clic en WhatsApp — algunos visitantes son competencia o curiosos. El target es leads calificados, no volumen bruto. Counterbalances SM-1.

## 8. Open Questions

1. ¿Número de WhatsApp definitivo? (por ahora: número de Nicolás)
2. ¿URL del sitio? (`anavsas.com` pendiente de compra)
3. ¿Se usarán imágenes generadas por DALL·E/FLOW para los fondos visuales? Decisión post-MVP o antes del deploy.
4. ¿Logo ANA V SAS en SVG? Nicolás lo compartirá.
5. ¿Testimonial real disponible? Pendiente de conseguir.
6. ¿Hosting final? Vercel (plan gratuito o pro).

## 9. Assumptions Index

- `[ASSUMPTION §2.2]`: Empresas con agente de aduanas actual no son target primario, pero podrían ser leads si el servicio es superior.
- `[ASSUMPTION §2.3 UJ-1]`: SEO inicial en keywords "agencia de aduanas Bogotá" e "importar desde China Colombia".
- `[ASSUMPTION §2.3 UJ-1]`: Sin chatbot ni auto-respuesta en v1.
- `[ASSUMPTION §2.3 UJ-2]`: Sin testimonial real resta confianza. Prioridad conseguir al menos uno.
- `[ASSUMPTION §3]`: Número único de WhatsApp para todos los leads en v1.
- `[ASSUMPTION §4.1 FR-4]`: CTA principal usa mensaje predefinido "Hola, quiero cotizar mi importación".
- `[ASSUMPTION §4.3 FR-8]`: Scroll hijacking horizontal es posible técnicamente con GSAP ScrollTrigger pin + scrub horizontal.
- `[ASSUMPTION §4.3 FR-11]`: Sello tiene animación visual pero sin sonido.
- `[ASSUMPTION §4.5 FR-19]`: Contraste de color se verificará con herramienta de contraste.
- `[ASSUMPTION §4.6 FR-21]`: Sin testimonial, el placeholder no se muestra o muestra "Próximamente".
- `[ASSUMPTION §4.8 FR-29]`: LCP ≤ 2.5s depende del hosting y tamaño de assets.
- `[ASSUMPTION §6.2]`: FLOW video se integra post-MVP como mejora.
- `[ASSUMPTION §7 SM-2]`: Tasa de rebote benchmark de landing B2B.

---

## Addendum

### Decisiones

- **2026-06-22**: Tech stack decidido: HTML plano + CSS + GSAP (no Next.js). La landing es un proyecto separado del CRM, deployado en Vercel bajo el mismo dominio (`anavsas.com` para landing, `crm.anavsas.com` para CRM).
- **2026-06-22**: Animaciones híbridas: imágenes generadas/FLOW video para fondos visuales + GSAP para scroll/transiciones interactivas.
- **2026-06-22**: Sin chatbot ni formulario en v1 — toda la conversión es por WhatsApp directo.
- **2026-06-22**: Mobile first para layout, pero la experiencia principal (timeline horizontal con scroll hijacking) es desktop-first. Mobile tendrá timeline vertical simplificada.

### Arquitectura propuesta

```
/
├── index.html          ← Una sola página (SPA estática)
├── css/
│   └── styles.css      ← Paleta, grid, responsive
├── js/
│   ├── main.js         ← Init, scroll management
│   ├── hero.js         ← Hero animations (map, route, ship scrub)
│   ├── timeline.js     ← Section 3 scroll hijacking + 4 step animations
│   └── counters.js     ← Section 5 ticker counters + bars
├── assets/
│   ├── logo-ana-vsas.svg
│   ├── hero-map-bg.svg
│   ├── icons/          ← All section icons (SVG)
│   └── animations/     ← FLOW video loops (post-MVP)
└── README.md
```