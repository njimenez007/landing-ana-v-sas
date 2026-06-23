---
title: Landing Page ANA V SAS (v2)
created: 2026-06-22
updated: 2026-06-23
status: draft
author: Cipher
---

# PRD: Landing ANA V SAS — Importaciones (v2)
*Working title: Landing ANA V SAS — Dinámica Profesional*

## 0. Document Purpose

Este PRD actualiza la v1 (Jun 2026) para reflejar una dirección replanteada: **no se usan animaciones complejas** (FLOW video, scroll hijacking horizontal, timeline SVG animada con buques/aviones/montacargas). En su lugar, la landing apuesta por una experiencia visual **dinámica, fresca y profesional** con micro-interacciones sutiles tipo GSAP reveal, parallax, contadores animados y 3D hover en cards. El objetivo es que la landing comunique solidez y modernidad desde el primer pixel — que el visitante piense *"si esta es la web, el servicio debe ser brutal"*.

Este PRD es para el equipo de desarrollo (Cipher) y el CEO (Nicolás Jiménez). Define requisitos funcionales (FRs), journeys de usuario (UJs) y métricas de éxito (SMs).

Inputs que alimentan este PRD:
- **landing-copy-anav-v2.md**: copy completo con 7 secciones, CTAs, tono y voz
- **PRD v1 (Jun 2026)**: versión anterior con animaciones complejas — reemplazada por este documento
- **Briefing verbal (Nicolás)**: landing debe ser moderna, cautivadora, profesional, que impresione sin ser recargada

## 1. Vision

ANA V SAS necesita una landing page que **convierta leads industriales en conversaciones de WhatsApp**. Pero la conversión no empieza en el CTA — empieza en la primera impresión.

Cada elemento de la página está diseñado para que el visitante sienta que está frente a una empresa seria, moderna, con experiencia. Los efectos visuales (parallax, text reveals, contadores, stagger reveals, 3D hover) no son decorativos — son la prueba silenciosa de que ANA V SAS es una empresa que le mete, que cuida los detalles, que entiende de calidad.

La landing cuenta una historia: el problema del importador (papeleo, múltiples interlocutores, sorpresas) → la solución de ANA V SAS (gestión integral desde el origen hasta la bodega) → la confianza (30+ años, 100% personalizado, 24/7, un solo responsable). Cada sección mueve al visitante un paso más cerca del botón de WhatsApp.

**El efecto buscado:** El lead industrial piensa *"Si esta landing es así de cuidada, no me imagino lo bueno que debe ser su servicio"*.

**Stakes:** Lanzamiento público. La landing es la cara digital de la empresa. No hay segunda oportunidad para una primera impresión.

## 2. Target User

### 2.1 Jobs To Be Done

- **Funcional:** Encontrar un agente de aduanas y carga que gestione toda la importación desde el origen hasta la bodega en Colombia
- **Funcional:** Obtener una cotización clara sin letra pequeña
- **Funcional:** Verificar que la empresa tiene experiencia real en su sector (calzado, EPP, tecnología, manufactura)
- **Emocional:** Sentir que está frente a una empresa confiable, moderna y profesional — no frente a una agencia tradicional y burocrática
- **Emocional:** Dejar de preocuparse por trámites aduaneros, coordinaciones y sorpresas de último minuto
- **Social:** Validar que eligió un proveedor serio frente a sus socios o jefes

### 2.2 Non-Users (v1)

- Empresas que solo exportan (no importan)
- Particulares haciendo compras personales internacionales
- Empresas que ya tienen un agente de aduanas establecido y no buscan cambio `[ASSUMPTION: podrían ser leads por servicio superior]`

### 2.3 Key User Journeys

- **UJ-1. Carlos, jefe de compras industriales, busca un agente de aduanas que le resuelva.**
  - **Persona + context:** Carlos, jefe de compras en una fábrica de calzado en Bogotá. Importa suelas y cuero desde China cada mes. Está harto de coordinar entre el agente de carga, la aduana y el transportista.
  - **Entry state:** Llega por Google buscando "agencia de aduanas Bogotá" o "importar desde China Colombia". `[ASSUMPTION: SEO inicial en esas keywords]`
  - **Path:**
    1. Entra al Hero con parallax suave — la imagen de fondo se mueve con el scroll. Headline aparece con text reveal. La página *se siente* premium desde el primer frame.
    2. Scrollea al Problema: las 3 cards aparecen en cascada suave. Reconocimiento inmediato: "Eso me pasa todos los meses".
    3. Scrollea a Cómo funciona: timeline vertical con 4 pasos que se revelan con scrub suave. No es un hijacking, pero se siente fluido.
    4. Ve los Servicios: 4 cards con hover 3D sutil que invitan a explorar.
    5. Llega a Diferenciadores: los contadores cuentan desde 0. 30+ años, 100%, 24/7, 1 responsable — los números respaldan.
  - **Climax:** Llega al Footer con CTA claro. El botón de WhatsApp ha estado visible todo el tiempo en el sticky flotante.
  - **Resolution:** Hace clic en WhatsApp con mensaje pre-escrito. Carlos describe su necesidad.
  - **Edge case:** Si llega en horario no laboral, el mensaje queda entregado. `[ASSUMPTION: sin chatbot ni auto-respuesta en v1]`

- **UJ-2. María, gerente de operaciones, investiga antes de recomendar.**
  - **Persona + context:** María, gerente de operaciones en una empresa de EPP. Su jefe le pidió "conseguir un agente de aduanas confiable". Ella investiga a fondo antes de recomendar.
  - **Entry state:** Llega por recomendación o buscando "ANA V SAS agencia de aduanas".
  - **Path:**
    1. La página carga rápido. La calidad visual le da confianza inmediata.
    2. Va directo a Clientes para ver sectores. Encuentra "🧤 EPP (Equipos de Protección Personal)".
    3. Mira los Diferenciadores: 30+ años contando desde cero le genera confianza.
    4. Examina Servicios con el efecto 3D hover — la interacción se siente sólida.
    5. `[ASSUMPTION: no hay testimonial aún — prioridad conseguir al menos uno]`
  - **Climax:** La experiencia pulida de la landing la convence de que la empresa es seria.
  - **Resolution:** Contacta por WhatsApp para presentar la opción a su jefe.

## 3. Glossary

- **ANA V SAS**: Agencia de Aduanas y Carga Internacional, comercio exterior. Sujeto de la landing.
- **Lead**: Visitante industrial que potencialmente se convierte en cliente.
- **CTA (Call to Action)**: Botón para que el usuario realice una acción específica (abrir WhatsApp).
- **WhatsApp**: Canal de conversión principal. Todos los CTAs apuntan a una conversación pre-escrita. `[ASSUMPTION: número único para todos los leads en v1]`
- **Sticky flotante**: Botón CTA posicionado fuera del header, visible siempre al scrollear (abajo-derecha en desktop, barra completa en mobile).
- **Parallax**: Efecto donde el fondo se mueve más lento que el scroll del usuario, creando profundidad.
- **Text reveal**: Animación donde el texto aparece con clip-path/máscara, simulando que se "destapa" de izquierda a derecha.
- **Stagger**: Secuencia de aparición escalonada de múltiples elementos (cada card aparece con un pequeño delay respecto a la anterior).
- **Scrub (GSAP)**: Animación ligada al scroll del usuario que avanza o retrocede según la dirección del scroll (sin pin ni hijacking).
- **3D tilt**: Efecto hover donde una card rota suavemente siguiendo la posición del cursor.
- **Contador animado**: Número que cuenta desde 0 hasta su valor final al entrar al viewport.
- **Nacionalización**: Proceso aduanero mediante el cual una carga importada queda legalmente disponible en Colombia.
- **GSAP (GreenSock Animation Platform)**: Librería de animaciones JavaScript usada para reveals, parallax, contadores y stagger.
- **Header glass**: Barra de navegación con efecto cristal (fondo semitransparente + backdrop-filltro/desenfoque), que cambia de estilo al scrollear.

## 4. Features

### 4.1 Hero — El impacto inmediato

**Description:** Primera impresión. Ocupa viewport completo. Imagen de fondo profesional (operación portuaria o aduanera de alta calidad) con degradé oscuro en la esquina inferior izquierda para legibilidad del texto. Headline impactante aparece con text reveal. Subheadline, CTA principal. Header glass flotante con logo que intercambia (negativo → normal al scrollear). Realiza UJ-1 (paso 1).

**Copy de la sección:**

> **Headline:** *Importar sin estrés. De cualquier parte del mundo hasta tu fábrica.*
>
> **Subheadline:** *Gestión integral de aduanas y carga internacional. +30 años trayendo tu mercancía justo a tiempo.*
>
> **CTA principal:** `[ Quiero cotizar mi importación ]` → WhatsApp
>
> **CTA secundario:** `Ver cómo funciona ↓` → scroll suave a Sección 4.3

**Functional Requirements:**

#### FR-1: Imagen de fondo con parallax suave
El visitante ve una imagen de fondo profesional (operación portuaria/aeropuertaria/aérea con carga) que se mueve más lento que el scroll (parallax ratio ~0.3). La imagen tiene un degradé oscuro en la zona de texto para garantizar legibilidad.

**Consequences (testable):**
- La imagen carga en ≤ 2s (formato WebP optimizado, ≤ 300KB)
- El parallax funciona suavemente en desktop y mobile (sin jank)
- El degradé mantiene contraste ≥ 4.5:1 sobre el texto blanco
- En `prefers-reduced-motion`, el parallax se desactiva (fondo estático)
- En mobile, el efecto parallax se suaviza o reduce para evitar problemas de rendimiento

**Out of Scope:**
- Video de fondo (solo imagen estática en v1)
- Mapa mundi animado

#### FR-2: Text reveal del headline
El headline principal ("Importar sin estrés. De cualquier parte del mundo hasta tu fábrica.") aparece con animación clip-path de izquierda a derecha al cargar la página. Cada línea del headline revela secuencialmente (stagger 0.15s).

**Consequences (testable):**
- El text reveal dura ~0.8s por línea
- El subheadline aparece 0.3s después del headline con fade + translateY
- En `prefers-reduced-motion`, todo el texto aparece inmediatamente sin animación

#### FR-3: Header glass con logo intercambiable
Header fijo en la parte superior con efecto glass (background semitransparente + backdrop-filter: blur). Al cargar la página (sin scroll), el fondo del header es completamente transparente con logo en versión negativa (blanco). Al scrollear más de 80px, el header activa la clase `header--scrolled`: fondo glass visible, logo cambia a versión oscura.

**Consequences (testable):**
- La transición del header ocurre suavemente en ~0.3s
- El logo intercambia entre versión negativa (>80px del top) y oscura con opacidad cruzada
- En mobile, el header glass tiene un padding reducido
- Nav incluye: Cómo funciona, Servicios, Clientes, Contacto (este último como botón azul sólido)

#### FR-4: CTA principal sticky flotante
Un botón "Quiero cotizar" siempre visible mientras el usuario scrollea. En desktop: posicionado abajo-derecha, fuera del header. En mobile: barra completa en la parte inferior (sticky bottom). Realiza UJ-1.

**Consequences (testable):**
- El sticky CTA aparece 0.5s después de cargar la página (fade-in)
- En desktop: botón redondo o pill, con sombra sutil, posición fixed bottom-right
- En mobile: barra completa con texto, posición fixed bottom
- El CTA abre WhatsApp con mensaje predefinido: "Hola, quiero cotizar mi importación"
- Área táctil mínima 44×44px en mobile

#### FR-5: CTA secundario "Ver cómo funciona ↓"
Enlace que hace scroll suave a la sección Cómo funciona (Sección 4.3). Aparece debajo del subheadline.

#### FR-6: Smooth scroll en navegación
Todos los links de navegación (Cómo funciona, Servicios, Clientes, Contacto) hacen scroll suave a su sección correspondiente con `scroll-behavior: smooth` o GSAP ScrollTo.

**Consequences (testable):**
- El scroll dura ~0.8-1.2s con ease
- La sección destino se alinea correctamente considerando la altura del header

### 4.2 El Problema — Por qué necesitas esto

**Description:** Tres cards de dolor (Papeleo sin fin, Demasiados interlocutores, Sorpresas de último minuto) que aparecen en cascada (stagger) con fade + translateY al scrollear. Cada card: ícono + título + descripción breve. Realiza UJ-1 (paso 2).

**Copy de la sección:**

> **Headline:** *Tus proveedores están listos. Tu mercancía, también.*
>
> **Subtítulo:** *Pero entre el origen y tu bodega hay un mundo de trámites, coordinaciones y riesgos que no ves venir.*
>
> **Cards:**
> - 📋 **Papeleo sin fin** — Facturas, BL, declaraciones, vistos buenos — un error documental puede detener tu carga semanas
> - 🤝 **Demasiados interlocutores** — Agente de carga, naviera, aduana, depósito — cada uno habla por aparte y tú terminas de mensajero
> - ⚠️ **Sorpresas de último minuto** — Llegó al puerto y resulta que falta un sello, un registro o un visto bueno que nadie te advirtió
>
> **Frase de cierre:** *¿Suena familiar? Nosotros nos encargamos de todo eso.*
>
> **CTA:** `[ Sí, quiero delegar esto ]` → WhatsApp

**Functional Requirements:**

#### FR-7: Cards de dolor con stagger reveal
Tres cards en fila (desktop) o columna (mobile) aparecen con fade-in + translateY(30px) desde abajo. Card 1 a los 0s, Card 2 a los 200ms, Card 3 a los 400ms. Animación suave de 0.5s por card con ease-out.

**Consequences (testable):**
- La animación solo se dispara cuando la sección entra al viewport (usando Intersection Observer o GSAP ScrollTrigger)
- Cada card tiene un icono representativo en la parte superior
- En `prefers-reduced-motion`, todas las cards aparecen inmediatamente sin transición
- En mobile, las cards se apilan en columna con stagger vertical

#### FR-8: CTA de sección
Botón "Sí, quiero delegar esto" al final de la sección. Abre WhatsApp con mensaje: "Hola, quiero delegar la gestión de mi importación".

**Consequences (testable):**
- Botón con hover: color de fondo cambia de `#1F4E8C` a `#0D2B55` con transición de 0.2s
- Área táctil mínima 44×44px en mobile

### 4.3 Cómo funciona — Timeline Vertical

**Description:** 4 pasos del proceso de importación presentados en una timeline vertical. Cada paso tiene un ícono, título, descripción y una línea conectora vertical. Los pasos se revelan secuencialmente al scrollear, con un scrub suave que vincula el progreso del scroll con la opacidad y translateY de cada paso. Realiza UJ-1 (paso 3).

**Copy de la sección:**

> **Headline:** *Te compramos el problema desde el origen. Así funciona:*
>
> **Pasos (timeline):**
> 1. 🏭 **Contactamos a tu proveedor** — Donde sea que esté tu mercancía — Shanghái, Mumbai, Miami o Milán — coordinamos directo con quien la tiene
> 2. 🚢 **Gestionamos el transporte** — Elegimos la mejor ruta y naviera. Marítimo o aéreo, consolidado o contenedor completo. Te cotizamos y ejecutamos
> 3. 📄 **Nacionalizamos tu carga** — Clasificación arancelaria, declaraciones, vistos buenos, DIAN. Todo lo aduanero lo corremos por ti
> 4. 🚛 **Entregamos en tu bodega** — De puerto o aeropuerto directo a tus instalaciones. Tú no pisas una aduana ni una bodega
>
> **Frase de cierre:** *Un solo responsable. De principio a fin.*

**Functional Requirements:**

#### FR-9: Timeline vertical con reveal progresivo
Cuatro pasos en orden vertical: (1) Contacto al proveedor, (2) Transporte internacional, (3) Nacionalización, (4) Entrega en bodega. Cada paso aparece con opacidad 0 → 1 y translateY moderate al scrollear, utilizando ScrollTrigger con scrub suave (no pin, no hijacking). La línea conectora vertical se dibuja progresivamente (stroke-dashoffset) a medida que el usuario avanza.

**Consequences (testable):**
- El scrub responde en ambas direcciones (scroll up = retrocede el reveal)
- La línea conectora se completa visualmente paso a paso
- No hay scroll horizontal en ninguna resolución
- En mobile, cada paso ocupa su espacio natural (viewport completo no forzado)
- En desktop, la timeline vertical está centrada o alineada (diseño definido por CSS)
- En `prefers-reduced-motion`, todos los pasos se muestran completos sin animación

**Out of Scope:**
- Scroll hijacking horizontal
- SVG animados de aviones, buques, montacargas o camiones

#### FR-10: Iconos de paso con micro-interacción
Cada paso tiene un ícono simple representativo (globo terráqueo, barco, documento, ubicación). Al scrollear al paso, el ícono tiene un micro-movimiento sutil (float/pulse leve) mientras está visible.

**Consequences (testable):**
- Micro-movimiento: translateY de 3px con ciclo de 3s
- En `prefers-reduced-motion`, los íconos se mantienen estáticos

### 4.4 Servicios — Lo que hacemos

**Description:** Cuatro servicios en grid 2×2 (desktop) o columna (mobile): Agente de Carga Internacional, Gestión Aduanera, Asesoría Especializada, Capacitaciones. Cada card tiene ícono + título + descripción. Efecto 3D tilt al hacer hover (desktop). Realiza UJ-1 (paso 4) y UJ-2.

**Copy de la sección:**

> **Headline:** *No solo movemos carga. Movemos todo tu proceso de importación.*
>
> **Cards:**
> - 🚢 **Agente de Carga Internacional** — Transporte marítimo y aéreo desde cualquier origen del mundo. Contenedor completo o consolidado (LCL). Negociamos tarifas, reservamos y rastreamos tu carga en tiempo real
> - 📋 **Agencia de Aduanas** — Clasificación arancelaria, declaraciones de importación y valor, registros y vistos buenos. Gestionamos la nacionalización ante la DIAN para que tu carga quede legal y disponible
> - 🎓 **Asesoría en Comercio Exterior** — Clasificación de tu producto, requisitos previos a la compra, viabilidad, normatividad aplicable. Te guiamos antes de que compres, no después
> - 👥 **Capacitaciones** — Entrenamos a tu equipo de compras o importaciones en documentación, procesos aduaneros y mejores prácticas. Menos errores, menos retrasos
>
> **CTA:** `[ Necesito estos servicios → WhatsApp ]`

**Functional Requirements:**

#### FR-11: Cards de servicios con stagger diagonal
Cuatro cards aparecen en grid con reveal secuencial en orden diagonal al entrar al viewport. Card 1 (sup-izq) → 0ms, Card 2 (sup-der) → 150ms, Card 3 (inf-izq) → 300ms, Card 4 (inf-der) → 450ms.

**Consequences (testable):**
- Transición: fade-in + translateY(20px) con duración 0.4s por card
- Animación solo se dispara cuando la sección entra al viewport

#### FR-12: Efecto 3D tilt en hover (desktop)
Al hacer hover sobre una card, esta rota suavemente siguiendo la posición del cursor dentro de la card (efecto "perspective + rotateX/Y"). Realza la sensación de calidad y respuesta táctil.

**Consequences (testable):**
- Rotación máxima: ~5° en cada eje
- Transición suave de 0.15s
- Sombra de la card se intensifica al hover
- En mobile/touch: sin tilt (las cards se mantienen estáticas)

#### FR-13: CTA de servicios
Botón "Necesito estos servicios" abre WhatsApp con mensaje: "Hola, quiero conocer sus servicios de importación".

### 4.5 Diferenciadores — Por qué ANA V SAS

**Description:** Cuatro columnas con indicadores clave en fondo azul marino `#0D2B55`. Cada indicador tiene un número grande (30+, 100%, 24/7, 1), una barra decorativa inferior y texto descriptivo. Los números aparecen con contador animado (GSAP) que cuenta desde 0 hasta su valor final al scrollear a la sección. Realiza UJ-1 (paso 5) y UJ-2.

**Copy de la sección:**

> **Headline:** *No somos una agencia más.*
>
> **Subtítulo:** *Operamos distinto. Y eso se nota cuando tu carga está en juego.*
>
> **Diferenciadores (4 columnas):**
> - **30+** Años de experiencia — Conocemos el negocio, los puertos, los trámites y cómo evitar problemas antes de que aparezcan
> - **100%** Personalizado — No eres un número. Tienes un único contacto que conoce tu carga, tu proveedor y tu negocio de principio a fin
> - **24/7** Siempre disponibles — Cuando tu carga está en tránsito, nosotros también. Sin horarios de oficina, sin "el lunes te respondo"
> - **1** Solo responsable — Un solo interlocutor para todo: agente de carga, aduana, transporte nacional. Tú no coordinas a nadie más
>
> **Frase de cierre:** *Un cliente satisfecho es más negocio. Trabajamos para que vuelvas, no para cobrarte una vez.*

**Functional Requirements:**

#### FR-14: Contadores animados con stagger
Los 4 contadores se disparan simultáneamente al entrar al viewport. "30+" cuenta de 0 a 30 en ~1.5s con GSAP. "100%" y "24/7" y "1" aparecen sin animación de conteo (son símbolos, no números contables).

**Consequences (testable):**
- El contador "30+" usa GSAP para animar el número en ~1.5s con ease-out
- "100%", "24/7" y "1" aparecen con fade-in al mismo tiempo
- Todos los contadores se disparan cuando el 30% superior de la sección entra al viewport
- En `prefers-reduced-motion`, los valores aparecen instantáneamente

#### FR-15: Barras decorativas con stagger
Debajo de cada indicador numérico, una barra horizontal se expande de 0% a 100% de ancho con ease-out. Las barras aparecen en cascada con 200ms de delay entre sí.

**Consequences (testable):**
- La expansión de cada barra dura ~0.8s con ease-out
- El stagger es visible y secuencial (barra 1 → barra 2 → barra 3 → barra 4)

#### FR-16: Fondo y contraste
La sección usa fondo `#0D2B55` con texto blanco. Garantiza contraste AA mínimo.

**Consequences (testable):**
- Relación de contraste ≥ 4.5:1 para texto normal

### 4.6 Clientes y Casos — Para quién trabajamos

**Description:** Lista de sectores atendidos con ícono + nombre + descripción breve. Espacio reservado para testimonial futuro. Los sectores aparecen con stagger reveal. Realiza UJ-2.

**Copy de la sección:**

> **Headline:** *Trabajamos con fábricas colombianas que importan para producir.*
>
> **Subtítulo:** *Si fabricas en Colombia, sabes que importar no es opcional — es parte del negocio. Nosotros hacemos que esa parte funcione.*
>
> **Sectores:**
> - 🏭 **Calzado y botas de seguridad** — Materia prima desde Asia · +7 contenedores / mes solo en este sector
> - 🧤 **EPP (Equipos de Protección Personal)** — Guantes, dotación, implements de seguridad
> - 💻 **Tecnología** — Equipos, componentes, maquinaria especializada
> - 🏭 **Manufactura en general** — Maquinaria, insumos, repuestos desde cualquier origen
>
> **Frase de cierre:** *¿Tu sector no está en la lista? No importa. Si importas para producir, te servimos.*
>
> ℹ️ *Espacio reservado para testimonial real (cuando esté disponible)*

**Functional Requirements:**

#### FR-17: Sectores con stagger reveal
Cada ítem de sector aparece con fade-in + translateY en cascada (200ms de separación entre cada uno) al scrollear a la sección.

**Consequences (testable):**
- Los sectores se revelan en orden visible
- Animación suave de 0.4s por ítem
- En `prefers-reduced-motion`, aparecen todos inmediatamente

#### FR-18: Testimonial placeholder
Espacio reservado para testimonial real cuando esté disponible. Formato: texto entre comillas + nombre, cargo y empresa. Cuando haya testimonial cargado, se revela con fade-in. Sin testimonial, la sección se muestra sin placeholder visible. `[ASSUMPTION: prioridad conseguir al menos un testimonial antes del lanzamiento]`

### 4.7 Footer / CTA Final

**Description:** Sección con fondo `#0D2B55`. Headline grande, botón CTA, datos de contacto (teléfono, email, dirección), logo ANA V SAS. Transición suave desde la sección anterior (background shift de color). Realiza UJ-1 (clímax final).

**Copy de la sección:**

> **Headline:** *¿Tienes una importación en camino o estás planeando la próxima?*
>
> **Subtexto:** *No importa desde dónde traigas ni qué sea. Hablemos y te damos una cotización clara, sin letra pequeña.*
>
> **CTA:** `[ Iniciar conversación → WhatsApp ]`
>
> **Contacto:**
> - 📧 gerencia.anavsas.ce@gmail.com
> - 📱 +57 [número por definir]
>
> **Logo ANA V SAS + eslogan:** *¡Justo a tiempo!*
>
> *Agencia de Aduanas y Carga · Comercio Exterior · Bogotá, Colombia*

**Functional Requirements:**

#### FR-19: Background shift entre secciones
La transición de Clientes (fondo claro) a Footer (fondo oscuro) tiene un crossfade suave gestionado por GSAP o CSS.

**Consequences (testable):**
- La transición dura ~0.5s
- No hay corte abrupto de color

#### FR-20: Elementos de contacto
El footer muestra: teléfono, correo electrónico y dirección de la empresa. Cada elemento tiene un ícono simple.

**Consequences (testable):**
- El teléfono es clickeable (tel:) en mobile
- El correo es clickeable (mailto:)
- La dirección no es clickeable

#### FR-21: CTA Footer
Botón grande "Iniciar conversación → WhatsApp" con animación de pulso suave (escala 1 → 1.03 → 1 en ciclo de 2s) para llamar la atención.

**Consequences (testable):**
- El pulso tiene transición suave sin ser agresivo
- En hover (desktop), el botón se ilumina o cambia ligeramente de tono
- Abre WhatsApp con mensaje: "Hola, quiero cotizar mi importación"

#### FR-22: Logo en footer
Logo ANA V SAS en versión negativa (blanco) en el footer, con el eslogan "¡Justo a tiempo!" en tipografía decorativa (Dancing Script).

### 4.8 Cross-cutting — Rendimiento y Responsive

#### FR-23: Animaciones GPU-composited
Todas las animaciones usan solo `transform` y `opacity` para evitar repaints y garantizar 60fps.

**Consequences (testable):**
- Sin animaciones de `width`, `height`, `top`, `left`, o `margin`
- Uso de `will-change: transform` en elementos animados

#### FR-24: prefers-reduced-motion
Si el usuario tiene preferencia de movimiento reducido, todas las animaciones se desactivan. La página se muestra completamente estática sin transiciones.

**Consequences (testable):**
- `@media (prefers-reduced-motion: reduce)` desactiva todas las animaciones de GSAP
- La página sigue siendo completamente funcional sin animaciones
- Check de `window.matchMedia('(prefers-reduced-motion: reduce)')` en JS

#### FR-25: Responsive design
La página funciona correctamente en:
- Desktop (≥ 1024px)
- Tablet (768px - 1023px)
- Mobile (≤ 767px)

**Consequences (testable):**
- En mobile, las cards pasan de grid a columna única
- En mobile, el header glass tiene padding reducido
- En mobile, el CTA sticky es barra completa inferior
- Área táctil mínima 44×44px en todos los elementos interactivos
- En mobile, el parallax se atenúa o desactiva para rendimiento

#### FR-26: Carga optimizada
La página carga contenido crítico primero. GSAP y fuentes se cargan asíncronamente.

**Consequences (testable):**
- Largest Contentful Paint (LCP) ≤ 2.5s `[ASSUMPTION: depende del hosting]`
- GSAP se carga desde CDN con defer
- Imágenes en formato WebP con lazy loading
- Fuentes (Montserrat, Dancing Script) se cargan con `font-display: swap`

#### FR-27: SEO básico
Meta tags, Open Graph, schema.org para negocio local (agencia de aduanas).

**Consequences (testable):**
- Title tag: "ANA V SAS — Importaciones sin estrés | Agencia de Aduanas"
- Meta description de 155-160 caracteres
- Open Graph tags (title, description, image de la landing)
- Schema.org LocalBusiness JSON-LD con datos de contacto

## 5. Non-Goals (Explicit)

- No es un e-commerce — no hay carrito, checkout, ni pagos
- No es un portal de tracking — no hay login ni seguimiento en tiempo real
- No es un blog — no hay artículos ni CMS en v1
- No tiene chatbot automatizado — la conversación es directa con humano por WhatsApp
- No tiene multi-idioma en v1 — solo español colombiano
- No tiene animaciones FLOW video, scroll hijacking, ni timeline horizontal
- No tiene Three.js, WebGL, ni animaciones 3D complejas
- No tiene mapa mundi interactivo ni rutas animadas en SVG
- No tiene efecto cortina, ni elementos decorativos flotantes con opacidad
- No tiene efecto typewriter ni ticker digital rebuscado

## 6. MVP Scope

### 6.1 In Scope

- Las 7 secciones completas con copy definitivo
- Hero con imagen de fondo profesional + parallax suave
- Text reveal del headline con GSAP
- Header glass fijo con logo intercambiable (negativo → oscuro)
- Navegación con smooth scroll a secciones
- CTA sticky flotante siempre visible
- Sección Problema con 3 cards de dolor con stagger reveal
- Timeline vertical de 4 pasos con scrub suave (sin hijacking)
- Sección Servicios con 4 cards + efecto 3D tilt en desktop
- Sección Diferenciadores con contadores animados + barras decorativas
- Sección Clientes con sectores listados + placeholder testimonial
- Footer con datos de contacto, CTA con pulso suave, logo
- Background shift entre secciones claras y oscuras
- Todos los CTAs funcionales apuntando a WhatsApp con mensajes diferenciados
- Responsive (desktop + tablet + mobile)
- prefers-reduced-motion
- SEO básico (meta tags, OG, schema)
- Logo ANA V SAS en Header y Footer
- Smooth scroll en navegación interna
- Animaciones GPU-composited (solo transform + opacity)

### 6.2 Out of Scope for MVP

- Testimonial real — prioridad conseguir al menos uno antes del lanzamiento `[ASSUMPTION: sin testimonial se resta confianza]`
- Chatbot o auto-respuesta de WhatsApp
- Multi-idioma
- Blog o sección de noticias
- Integración con CRM (ANA V SAS OS)
- Analytics avanzado (solo Google Analytics básico)
- Formulario de contacto (solo WhatsApp)
- Animaciones con FLOW video — se descartan completamente para esta versión
- Mapa mundi interactivo
- Efecto cortina en footer
- Typewriter en testimonial

## 7. Success Metrics

**Primary**

- **SM-1**: Click-through rate a WhatsApp ≥ 3% de visitantes únicos. Valida FR-4, FR-8, FR-13, FR-21.

**Secondary**

- **SM-2**: Tasa de rebote ≤ 55%. Valida FR-23, FR-24, FR-25, FR-26. `[ASSUMPTION: benchmark para landing B2B]`
- **SM-3**: Tiempo en página ≥ 40s en desktop. La experiencia visual + timeline vertical invita a recorrer todas las secciones. Valida FR-1, FR-2, FR-7, FR-9, FR-11, FR-14.
- **SM-4**: Mobile bounce rate ≤ 65%. Valida FR-25, FR-26.

**Counter-metrics (do not optimize)**

- **SM-C1**: No optimizar para que todos los visitantes hagan clic en WhatsApp — algunos son competencia o curiosos. El target son leads calificados, no volumen bruto. Counterbalances SM-1.

## 8. Open Questions

1. ¿Número de WhatsApp definitivo para producción?
2. ¿URL del sitio? (`anavsas.com` pendiente de compra/redirección)
3. ¿Imagen de fondo del Hero? (foto real de operación portuaria, stock, o generada por IA)
4. ¿Logo ANA V SAS en SVG? Nicolás lo compartirá.
5. ¿Testimonial real disponible? Pendiente de conseguir antes del lanzamiento.
6. ¿Hosting? Vercel (plan gratuito o pro).
7. ¿Google Analytics u otra herramienta de medición?

## 9. Assumptions Index

- `[ASSUMPTION §2.2]`: Empresas con agente de aduanas actual no son target primario, pero podrían ser leads si el servicio es superior.
- `[ASSUMPTION §2.3 UJ-1]`: SEO inicial en keywords "agencia de aduanas Bogotá" e "importar desde China Colombia".
- `[ASSUMPTION §2.3 UJ-1]`: Sin chatbot ni auto-respuesta en v1.
- `[ASSUMPTION §2.3 UJ-2]`: Sin testimonial real resta confianza. Prioridad conseguir al menos uno antes del lanzamiento.
- `[ASSUMPTION §3]`: Número único de WhatsApp para todos los leads en v1.
- `[ASSUMPTION §4.1 FR-4]`: CTA sticky principal usa mensaje predefinido "Hola, quiero cotizar mi importación".
- `[ASSUMPTION §4.8 FR-26]`: LCP ≤ 2.5s depende del hosting y tamaño de assets.
- `[ASSUMPTION §7 SM-2]`: Tasa de rebote benchmark de landing B2B.
- `[ASSUMPTION §6.2]`: Sin testimonial se resta confianza. Prioridad conseguir al menos uno.

---

## Addendum

### Decisiones

- **2026-06-23**: Se descartan animaciones complejas de la v1 del PRD (FLOW video, scroll hijacking horizontal, timeline SVG animada con buques/aviones/montacargas, cortina de revelado, elementos flotantes, ticker digital). Se reemplazan por micro-interacciones sutiles: parallax, text reveals, 3D tilt en cards, contadores animados, stagger reveals, background shifts.
- **2026-06-23**: Tech stack: HTML plano + CSS + GSAP (CDN). No Next.js. Sin frameworks JS pesados.
- **2026-06-23**: Sin chatbot ni formulario en v1 — toda la conversión es por WhatsApp directo.
- **2026-06-23**: La landing es un proyecto separado del CRM, deployado en Vercel.

### Arquitectura propuesta

```
/
├── index.html              ← Una sola página (SPA estática)
├── css/
│   └── styles.css          ← Paleta, grid, header, footer, responsive
├── js/
│   ├── main.js             ← Init GSAP, scroll management, smooth nav
│   ├── hero.js             ← Parallax, text reveal
│   ├── sections.js         ← Stagger reveals, timeline scrub, counters
│   └── effects.js          ← 3D tilt, background shifts, pulse
├── assets/
│   ├── logo-ana-vsas-horizontal.svg
│   ├── logo-ana-vsas-negativo.svg
│   ├── hero-bg.webp        ← Imagen profesional de fondo (~250KB)
│   └── icons/              ← Todos los iconos de secciones (SVG)
└── README.md
```

### Perfiles de animación (resumen ejecutivo)

| Efecto | Técnica | Sección | Complejidad |
|--------|---------|---------|-------------|
| Parallax fondo | CSS translate + scroll listener o GSAP | Hero | Baja |
| Text reveal | GSAP clip-path | Hero | Media |
| Stagger cards | GSAP ScrollTrigger stagger | Problema, Servicios, Clientes | Baja |
| Timeline scrub | GSAP ScrollTrigger scrub (sin pin) | Cómo funciona | Media |
| Contadores animados | GSAP animate desde 0 | Diferenciadores | Baja |
| 3D tilt hover | CSS perspective + JS mousemove | Servicios | Media |
| Background shift | CSS transition en background-color | Todas las secciones | Baja |
| CTA pulse | CSS animation | Footer | Baja |
| Header glass swap | JS scroll event + CSS class toggle | Header | Baja |
| Smooth scroll | CSS scroll-behavior o GSAP ScrollTo | Navegación | Baja |
