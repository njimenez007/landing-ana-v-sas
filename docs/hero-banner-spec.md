# Hero / Banner Section — Especificación técnica y visual
**Proyecto:** ANA V SAS Landing Page  
**Versión:** 1.0  
**Propósito:** Documento de referencia para replicar exactamente el diseño del hero/banner en otra implementación.

---

## 1. Estructura general

El hero ocupa **exactamente el 100% del viewport** (`min-height: 100vh`) y tiene tres capas apiladas:

```
[ Capa 1 ] Imagen de fondo con parallax  ← más profunda
[ Capa 2 ] Overlay oscuro degradado      ← encima de la imagen
[ Capa 3 ] Contenido (texto + CTAs)      ← al frente
```

Encima de todo esto (fixed, no parte del hero en sí):
```
[ Header fijo ]  Logo + nav — transparente → glass al scrollear
[ CTA sticky  ]  Botón de WhatsApp siempre visible
```

---

## 2. Imagen de fondo (hero-bg)

- **Archivo:** `Assets/Banner.webp` (~230 KB)
- **Cobertura:** `background-size: cover`, `background-position: center`
- **Desbordamiento vertical:** el div de la imagen tiene `position: absolute; inset: -20% 0` — es decir, sobresale 20% arriba y abajo del contenedor. Esto permite el efecto parallax sin mostrar bordes vacíos al scroll.
- **Parallax:** al hacer scroll, la imagen se mueve a `yPercent: 30` (30% más lento que el scroll), creando profundidad. La animación usa `ease: none` con `scrub: true` (sincronizada con el scroll, sin rebote).

**CSS base:**
```css
.section-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: -20% 0;          /* sobresale para el parallax */
  background-size: cover;
  background-position: center;
  will-change: transform; /* GPU compositing */
}
```

---

## 3. Overlay oscuro

Un `div` absoluto que cubre el 100% del hero, encima de la imagen.

- **Tipo:** `linear-gradient` en dirección `135deg`
- **Puntos de color:**
  - `0%` → `rgba(13, 43, 85, 0.75)` — azul marino al 75% de opacidad
  - `50%` → `rgba(13, 43, 85, 0.55)` — azul marino al 55%
  - `100%` → `rgba(13, 43, 85, 0.40)` — azul marino al 40%
- **Efecto:** la zona izquierda/superior (donde va el texto) es más oscura para garantizar contraste ≥ 4.5:1. La zona derecha/inferior deja ver más la imagen.

```css
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(13, 43, 85, 0.75) 0%,
    rgba(13, 43, 85, 0.55) 50%,
    rgba(13, 43, 85, 0.40) 100%
  );
}
```

---

## 4. Contenido del hero (texto + CTAs)

### 4.1 Posicionamiento

El contenido está en un `div.container` con `position: relative; z-index: 2`. Se alinea al **centro vertical** del hero (via `display: flex; align-items: center` en el padre) y tiene padding superior para compensar el header fijo:

```css
.hero-content {
  position: relative;
  z-index: 2;
  padding-top: 6rem;    /* espacio bajo el header fijo */
  padding-bottom: 4rem;
}
```

El bloque de texto (`hero-text`) tiene `max-width: 720px` — ocupa los 2/3 izquierdos en desktop. En mobile ocupa el ancho completo.

### 4.2 Headline (H1)

- **Copy:** *"Importar sin estrés. / De cualquier parte del mundo / hasta tu fábrica."*
- **Estructura HTML:** el `<h1>` contiene 3 `<span class="hero-title__line">`, cada uno con `display: block`. Esto separa el texto en líneas independientes para la animación de entrada.
- **Tipografía:** `Montserrat Bold 700`
- **Tamaño:** fluido con `clamp(2rem, 5vw, 3.25rem)` — en desktop se ve ~52px, en mobile ~32px
- **Color:** `#FFFFFF`
- **Line height:** `1.15`
- **Margen inferior:** `1.25rem` (≈20px) separando del subheadline

```css
.hero-title {
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 700;
  color: #FFFFFF;
  line-height: 1.15;
  margin-bottom: 1.25rem;
}

.hero-title__line {
  display: block;
  overflow: hidden; /* contiene la animación de clip-path */
}
```

### 4.3 Subheadline

- **Copy:** *"Gestión integral de aduanas y carga internacional. +30 años trayendo tu mercancía justo a tiempo."*
- **Tipografía:** `Montserrat Regular 400`
- **Tamaño:** `clamp(1rem, 2vw, 1.1875rem)` — ≈19px desktop, ≈16px mobile
- **Color:** `rgba(255, 255, 255, 0.88)` — blanco con 88% de opacidad (ligeramente suavizado)
- **Line height:** `1.7`
- **Margen inferior:** `2.5rem` (≈40px) separando de los botones

```css
.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.1875rem);
  color: rgba(255, 255, 255, 0.88);
  margin-bottom: 2.5rem;
  line-height: 1.7;
}
```

### 4.4 Botones (CTAs)

Los dos botones están en un `div.hero-actions` con `display: flex; flex-wrap: wrap; gap: 1rem; align-items: center`.

**Botón primario — "Quiero cotizar mi importación"**
- Fondo: `#1F4E8C` (azul principal de marca)
- Hover: `#0D2B55` (azul marino) + `box-shadow: 0 8px 24px rgba(13, 43, 85, 0.35)`
- Texto: blanco, `Montserrat SemiBold 600`, `~17px`
- Forma: `border-radius: 50px` (pill completo)
- Padding: `1rem 2.25rem`
- Altura mínima: `44px` (accesibilidad táctil)
- Transición hover: `translateY(-2px)` + cambio de color en `0.3s`
- Abre WhatsApp: `https://wa.me/[número]?text=Hola%2C%20quiero%20cotizar%20mi%20importaci%C3%B3n`

**Botón secundario (ghost) — "Ver cómo funciona ↓"**
- Fondo: `transparent`
- Borde: `2px solid rgba(255, 255, 255, 0.6)`
- Hover: `background: rgba(255,255,255,0.12)`, borde sólido blanco
- Texto: blanco, mismo tamaño
- Misma forma pill y padding
- Acción: scroll suave a la sección `#como-funciona`

```css
/* En mobile: los botones se apilan en columna y ocupan 100% de ancho */
@media (max-width: 767px) {
  .hero-actions {
    flex-direction: column;
    align-items: flex-start;
  }
  .hero-actions .btn {
    width: 100%;
    justify-content: center;
  }
}
```

---

## 5. Header fijo con logo intercambiable

### 5.1 Estado inicial (sin scroll)

- **Fondo:** completamente transparente — se ve la imagen del hero detrás
- **Logo:** versión negativa/blanca (`Logo Ana V SAS_Horizontal negativo.svg`)
- **Links de nav:** texto `rgba(255,255,255,0.9)`
- **Botón "Cotizar ahora":** azul primario `#1F4E8C`

### 5.2 Estado scrolled (>80px de scroll)

- Se agrega la clase `.header--scrolled`
- **Fondo:** `rgba(255, 255, 255, 0.9)` + `backdrop-filter: blur(12px)` — efecto vidrio esmerilado
- **Sombra:** `box-shadow: 0 2px 20px rgba(13, 43, 85, 0.12)`
- **Logo:** cambia a versión positiva/azul (`Logo Ana V SAS_Horizontal.svg`)
- **Links de nav:** cambian a `color: #374151` (gris oscuro)
- **Transición:** todos los cambios en `0.3s ease`

### 5.3 Técnica del logo intercambiable

Los dos logos existen en el DOM simultáneamente. Se intercambian con `opacity` (no `display: none`) para que la transición sea suave:

```css
/* Ambos logos superpuestos con position absolute */
.logo { position: absolute; top: 0; left: 0; transition: opacity 0.3s ease; }

/* Estado inicial: blanco visible, oscuro oculto */
.logo--light { opacity: 1; }
.logo--dark  { opacity: 0; }

/* Estado scrolled: se invierten */
.header--scrolled .logo--light { opacity: 0; }
.header--scrolled .logo--dark  { opacity: 1; }
```

El contenedor del logo es `position: relative; width: 160px; height: 48px`.

### 5.4 Lógica JS del header

```js
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    header.classList.add('header--scrolled');
  } else {
    header.classList.remove('header--scrolled');
  }
}, { passive: true });
```

---

## 6. CTA Sticky de WhatsApp

Siempre visible, independiente del scroll. Aparece con `opacity: 0` → `opacity: 1` 0.5 segundos después de que carga la página.

### 6.1 Desktop (≥768px) — Pill flotante

- **Posición:** `position: fixed; bottom: 2rem; right: 2rem`
- **Forma:** pill (`border-radius: 50px`)
- **Fondo:** `#25D366` (verde WhatsApp)
- **Contenido:** ícono SVG de WhatsApp + texto "Cotizar mi importación"
- **Sombra:** `0 4px 20px rgba(37, 211, 102, 0.4)`
- **Hover:** `translateY(-3px)` + sombra más intensa
- **Tamaño mínimo:** `44px` de altura

### 6.2 Mobile (≤767px) — Barra completa inferior

- **Posición:** `position: fixed; bottom: 0; left: 0; right: 0`
- **Altura:** `56px` mínimo
- **Fondo:** `#25D366`
- **Contenido:** centrado, ícono + texto
- **Efecto en el body:** `padding-bottom: 56px` para que el contenido no quede tapado

### 6.3 Aparición

```js
// Sin animación reducida: fade-in 0.5s con delay de 0.5s
setTimeout(() => ctaSticky.classList.add('is-visible'), 500);

// Con prefers-reduced-motion: aparece instantáneamente
```

---

## 7. Animaciones del hero

Todas usan solo `transform` y `opacity` para ser GPU-composited. Se desactivan completamente con `prefers-reduced-motion: reduce`.

### 7.1 Parallax de la imagen de fondo
- **Librería:** GSAP 3 + ScrollTrigger
- **Efecto:** la imagen se mueve `yPercent: 30` mientras el hero sale del viewport
- **Configuración:**
  ```js
  gsap.to('.hero-bg', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
      trigger: '.section-hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });
  ```

### 7.2 Text reveal del H1 (clip-path)
- Cada línea del headline entra de izquierda a derecha
- **Técnica:** `clipPath: 'inset(0 100% 0 0)'` → `inset(0 0% 0 0)` (valor final implícito al usar `gsap.from`)
- **Duración por línea:** `0.85s`
- **Stagger entre líneas:** `0.18s`
- **Ease:** `power3.out`
- **Delay inicial:** `0.3s` (espera que el resto de la página cargue)

  ```js
  gsap.from('.hero-title__line', {
    clipPath: 'inset(0 100% 0 0)',
    opacity: 0,
    duration: 0.85,
    stagger: 0.18,
    ease: 'power3.out',
    delay: 0.3,
  });
  ```

### 7.3 Fade-in del subheadline y botones
- Entran después del headline con `opacity: 0` + `translateY(24px)` → posición natural
- **Duración:** `0.7s`
- **Stagger entre subheadline y botones:** `0.2s`
- **Ease:** `power2.out`
- **Delay:** `0.9s` (empieza cuando el headline ya terminó)

  ```js
  gsap.from(['.hero-subtitle', '.hero-actions'], {
    opacity: 0,
    y: 24,
    duration: 0.7,
    stagger: 0.2,
    ease: 'power2.out',
    delay: 0.9,
  });
  ```

---

## 8. Tipografía y colores exactos del hero

| Elemento | Fuente | Peso | Tamaño | Color |
|---|---|---|---|---|
| Headline H1 | Montserrat | 700 Bold | clamp(2rem, 5vw, 3.25rem) | `#FFFFFF` |
| Subheadline | Montserrat | 400 Regular | clamp(1rem, 2vw, 1.1875rem) | `rgba(255,255,255,0.88)` |
| Botón primario | Montserrat | 600 SemiBold | 1.0625rem (17px) | `#FFFFFF` sobre `#1F4E8C` |
| Botón ghost | Montserrat | 600 SemiBold | 1.0625rem (17px) | `#FFFFFF` |
| Links nav | Montserrat | 500 Medium | 0.9rem (14.4px) | `rgba(255,255,255,0.9)` |

**Google Fonts import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**Colores de marca usados en el hero:**

| Token | Hex | Uso |
|---|---|---|
| Azul principal | `#1F4E8C` | Botón primario, hover |
| Azul marino | `#0D2B55` | Overlay, hover botón |
| Verde WhatsApp | `#25D366` | CTA sticky |
| Blanco | `#FFFFFF` | Todo el texto |

---

## 9. Responsive — cambios clave

| Breakpoint | Cambio |
|---|---|
| **Desktop ≥1024px** | Texto alineado izquierda, max-width 720px, botones en fila |
| **Tablet 768–1023px** | Igual que desktop pero nav links ocultos, solo botón "Cotizar" |
| **Mobile ≤767px** | Botones en columna, 100% ancho; CTA sticky = barra inferior; body con padding-bottom: 56px |

---

## 10. Dependencias necesarias

```html
<!-- GSAP Core -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
<!-- ScrollTrigger (parallax) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
<!-- ScrollToPlugin (smooth scroll del botón "Ver cómo funciona") -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js" defer></script>
```

Todos los scripts con `defer` para no bloquear el render. El orden importa: GSAP core → plugins → JS personalizados.
