# Sistema de Marca Digital — ANA V SAS

> **Versión:** 1.0  
> **Fecha:** Mayo 2026  
> **Uso:** Web, CRM, aplicaciones internas, documentos, firmas, presentaciones y materiales corporativos.  
> **Estado:** Dirección visual aprobada para desarrollo. Los archivos finales de logo en formato vectorial (`.svg`) deben exportarse antes de producción.

---

## 1. Identidad de marca

### Nombre principal

**ANA V SAS**

### Eslogan

**¡Justo a tiempo!**

### Posicionamiento institucional recomendado

**Comercio exterior y coordinación logística para importaciones empresariales.**

ANA V SAS acompaña a empresas importadoras en la coordinación de sus operaciones de comercio exterior, articulando agentes de carga internacional, aliados aduaneros y transporte nacional, con un servicio personalizado, confiable y oportuno.

### Restricción de comunicación importante

ANA V SAS **no debe presentarse como “Agencia de Aduanas” ni como S.I.A.** en páginas, aplicaciones, materiales comerciales o metadatos. Los trámites aduaneros son ejecutados por la agencia aliada autorizada.

#### Términos permitidos

- Comercio exterior
- Coordinación logística internacional
- Gestión integral de importaciones
- Acompañamiento en operaciones de importación
- Soluciones logísticas para empresas
- Coordinación con aliados aduaneros

#### Términos a evitar

- “Somos una agencia de aduanas”
- “Agencia aduanera ANA V SAS”
- “S.I.A. ANA V SAS”
- “Tramitamos directamente ante la DIAN” sin aclarar el aliado autorizado

---

## 2. Esencia visual

La marca debe comunicar:

| Atributo | Traducción visual |
|---|---|
| Confianza | Azul corporativo, diseño sobrio, alto contraste |
| Puntualidad | Eslogan “¡Justo a tiempo!”, composiciones claras y directas |
| Operación global | Globo terráqueo integrado al símbolo |
| Logística/importación | Buque de carga como elemento principal |
| Experiencia | Estética institucional, sin tendencias pasajeras |
| Precisión | Interfaces ordenadas, datos fáciles de leer, jerarquías consistentes |

### Concepto del símbolo

El isotipo está compuesto por:

1. **Globo terráqueo:** alcance internacional y comercio exterior.
2. **Buque de carga:** importaciones y coordinación logística.
3. **Movimiento horizontal:** avance, entrega y oportunidad.

El símbolo debe conservar siempre su composición: **globo + buque**. No debe separarse, rotarse, redibujarse informalmente ni acompañarse de elementos decorativos adicionales.

---

## 3. Arquitectura del logo

### 3.1 Logo principal

**Composición:** `ANA V SAS` + isotipo + `¡Justo a tiempo!`

**Uso recomendado:**

- Portadas institucionales
- Presentaciones
- Documentos corporativos
- Pantalla de bienvenida o login
- Piezas de marca con suficiente espacio

**No usar en:**

- Favicon
- Íconos pequeños
- Menús móviles estrechos
- Tablas densas del CRM

---

### 3.2 Logo horizontal

**Composición:** `Isotipo | ANA V SAS`

**Uso recomendado:**

- Header de página web
- Navbar del CRM
- Firma de correo
- Membrete
- Barra superior de aplicaciones internas

Esta debe ser la versión predeterminada para productos digitales.

---

### 3.3 Logo secundario

**Composición:** `Isotipo + ANA V SAS`, sin eslogan.

**Uso recomendado:**

- Formularios
- Cotizaciones
- Reportes internos
- Cards de información
- Secciones donde el eslogan genere ruido visual

---

### 3.4 Isotipo

**Composición:** globo + buque, sin texto.

**Uso recomendado:**

- App icon
- Favicon
- Avatar de WhatsApp o CRM
- Indicador de carga o splash reducido
- Watermark sutil en documentos

**Regla crítica:** para tamaños muy pequeños debe existir una versión simplificada del isotipo, eliminando detalles finos que pierdan legibilidad.

---

## 4. Versiones cromáticas del logo

| Versión | Fondo | Logo | Uso |
|---|---|---|---|
| Positiva | Blanco o gris muy claro | Azul principal | Uso general |
| Negativa | Azul principal o azul marino | Blanco | Login, banners oscuros, footer |
| Monocromática azul | Blanco | Azul principal | Impresión corporativa simple |
| Monocromática negra | Blanco | Negro | Documentos sin color o requerimientos legales |
| Watermark | Blanco | Azul con opacidad baja | Fondos de documentos; nunca como logo principal |

### Fondos permitidos

- Blanco `#FFFFFF`
- Gris claro `#E9EDF2`
- Azul principal `#1F4E8C`, usando versión negativa
- Azul marino `#0D2B55`, usando versión negativa
- Fotografías oscuras o con overlay azul, usando versión negativa y garantizando contraste

### Fondos no permitidos

- Fondos con poco contraste
- Fotografías saturadas sin overlay
- Colores ajenos a la paleta
- Texturas que dificulten la lectura del símbolo o el nombre

---

## 5. Área de seguridad y tamaño mínimo

### Área de seguridad

El logo debe mantener un espacio libre mínimo equivalente a la altura de la letra **“A”** de `ANA` alrededor de todos sus lados.

```text
X = altura de la letra “A” en el wordmark ANA V SAS

┌───────────────────────────┐
│            X              │
│   X   [ LOGO ANA V ]   X  │
│            X              │
└───────────────────────────┘
```

No se deben ubicar textos, bordes, imágenes, botones ni íconos dentro de esta zona.

### Tamaños mínimos recomendados

| Versión | Digital | Impreso |
|---|---:|---:|
| Logo principal completo | 120 px de ancho | 25 mm de ancho |
| Logo horizontal | 140 px de ancho | 30 mm de ancho |
| Isotipo estándar | 32 px | 10 mm |
| Favicon simplificado | 16 px | No aplica |
| App icon | 512 × 512 px máster | No aplica |

> En tamaños menores a 120 px no utilizar el logo principal con eslogan. Usar el isotipo o el logo horizontal sin eslogan.

---

## 6. Paleta de color

### 6.1 Paleta principal

| Token | Nombre | HEX | RGB | Uso principal |
|---|---|---|---|---|
| `brand-primary` | Azul principal | `#1F4E8C` | `31, 78, 140` | Logo, botones principales, títulos, links |
| `brand-navy` | Azul marino | `#0D2B55` | `13, 43, 85` | Fondos premium, login, footer, sidebar |
| `brand-light` | Azul claro | `#4A86C5` | `74, 134, 197` | Estados secundarios, gráficos, acentos |

### 6.2 Paleta de apoyo

| Token | Nombre | HEX | RGB | Uso principal |
|---|---|---|---|---|
| `brand-soft` | Azul suave | `#7FABD6` | `127, 171, 214` | Gráficos y superficies suaves |
| `brand-ice` | Azul hielo | `#D7E6F7` | `215, 230, 247` | Background de tarjetas y estados informativos |
| `neutral-400` | Gris neutro | `#B7BDC5` | `183, 189, 197` | Bordes, divisores, placeholders |
| `neutral-100` | Gris claro | `#E9EDF2` | `233, 237, 242` | Fondos, inputs, tablas |
| `white` | Blanco | `#FFFFFF` | `255, 255, 255` | Fondos principales y logo negativo |

### 6.3 Colores funcionales para interfaces

Estos colores son para el CRM/app; **no reemplazan colores de marca ni deben aplicarse al logo**.

| Token | Estado | HEX sugerido | Uso |
|---|---|---|---|
| `success` | Completado / liberado | `#16A34A` | Procesos exitosos |
| `info` | En proceso | `#2563EB` | Carga en tránsito o gestión activa |
| `warning` | Pendiente | `#F59E0B` | Documentos o acciones pendientes |
| `danger` | Requiere atención | `#DC2626` | Alertas, inconsistencias, vencimientos |

---

## 7. Tipografía

### Familia principal

**Montserrat**

Debe utilizarse en interfaces, documentos, páginas web, CRM, dashboards y comunicaciones digitales.

| Jerarquía | Fuente | Peso sugerido | Uso |
|---|---|---:|---|
| Display / Hero | Montserrat | 700 | Encabezados de landing o login |
| H1 | Montserrat | 700 | Títulos de módulos |
| H2 | Montserrat | 600 | Secciones y encabezados de cards |
| H3 | Montserrat | 600 | Subsecciones |
| Body | Montserrat | 400 | Textos generales |
| Label / Caption | Montserrat | 500 | Estados, formularios y metadatos |
| Button | Montserrat | 600 | Botones y CTAs |

### Fuente del eslogan

**Dancing Script Bold** — uso exclusivo para `¡Justo a tiempo!`

> En el archivo final del logo, el eslogan debe tratarse como parte gráfica bloqueada. No debe escribirse libremente en toda la interfaz ni usarse como fuente decorativa general.

### Importación web sugerida

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## 8. Tokens para desarrollo

### 8.1 Variables CSS

```css
:root {
  /* Brand */
  --ana-brand-primary: #1F4E8C;
  --ana-brand-navy: #0D2B55;
  --ana-brand-light: #4A86C5;
  --ana-brand-soft: #7FABD6;
  --ana-brand-ice: #D7E6F7;

  /* Neutrals */
  --ana-white: #FFFFFF;
  --ana-neutral-100: #E9EDF2;
  --ana-neutral-400: #B7BDC5;
  --ana-text-primary: #0D2B55;
  --ana-text-secondary: #475569;

  /* Functional UI only */
  --ana-success: #16A34A;
  --ana-success-bg: #DCFCE7;
  --ana-info: #2563EB;
  --ana-info-bg: #DBEAFE;
  --ana-warning: #F59E0B;
  --ana-warning-bg: #FEF3C7;
  --ana-danger: #DC2626;
  --ana-danger-bg: #FEE2E2;

  /* UI */
  --ana-border: #E9EDF2;
  --ana-surface: #FFFFFF;
  --ana-surface-soft: #F8FAFC;
  --ana-radius-sm: 8px;
  --ana-radius-md: 12px;
  --ana-radius-lg: 16px;
  --ana-shadow-card: 0 2px 12px rgba(13, 43, 85, 0.08);

  /* Typography */
  --ana-font-primary: "Montserrat", Arial, sans-serif;
  --ana-font-slogan: "Dancing Script", cursive;
}
```

### 8.2 Tailwind config sugerido

```ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        ana: {
          primary: "#1F4E8C",
          navy: "#0D2B55",
          light: "#4A86C5",
          soft: "#7FABD6",
          ice: "#D7E6F7",
          neutral: "#B7BDC5",
          background: "#F8FAFC",
        },
      },
      fontFamily: {
        sans: ["Montserrat", "Arial", "sans-serif"],
        slogan: ["Dancing Script", "cursive"],
      },
      boxShadow: {
        card: "0 2px 12px rgba(13, 43, 85, 0.08)",
      },
      borderRadius: {
        brand: "12px",
      },
    },
  },
};
```

### 8.3 Objeto de tokens para TypeScript

```ts
export const anaVTheme = {
  brand: {
    primary: "#1F4E8C",
    navy: "#0D2B55",
    light: "#4A86C5",
    soft: "#7FABD6",
    ice: "#D7E6F7",
  },
  neutral: {
    white: "#FFFFFF",
    border: "#E9EDF2",
    muted: "#B7BDC5",
    background: "#F8FAFC",
  },
  status: {
    success: "#16A34A",
    info: "#2563EB",
    warning: "#F59E0B",
    danger: "#DC2626",
  },
} as const;
```

---

## 9. Componentes UI recomendados

### 9.1 Botón primario

| Propiedad | Valor |
|---|---|
| Fondo | `brand-primary` / `#1F4E8C` |
| Texto | Blanco |
| Hover | `brand-navy` / `#0D2B55` |
| Radio | `12px` |
| Fuente | Montserrat SemiBold |
| Uso | Crear operación, guardar, iniciar sesión, solicitar contacto |

### 9.2 Botón secundario

| Propiedad | Valor |
|---|---|
| Fondo | Blanco |
| Borde | `brand-primary` |
| Texto | `brand-primary` |
| Hover | `brand-ice` |
| Uso | Cancelar, ver detalle, descargar documento |

### 9.3 Cards

| Propiedad | Valor |
|---|---|
| Fondo | Blanco |
| Borde | `neutral-100` |
| Sombra | `--ana-shadow-card` |
| Radio | `12px` o `16px` |
| Encabezado | Azul marino |
| Uso | Operaciones, documentos, clientes, alertas |

### 9.4 Chips / estados CRM

| Estado operativo | Color UI | Ejemplo de uso |
|---|---|---|
| Completado | Verde | Carga entregada, documento aprobado |
| En proceso | Azul | En tránsito, nacionalización activa |
| Pendiente | Amarillo | Documento por recibir, pago pendiente |
| Requiere atención | Rojo | Error documental, alerta DIAN, vencimiento |

### 9.5 Tablas y dashboards

- Encabezados: fondo `#D7E6F7`, texto `#0D2B55`.
- Filas: fondo blanco con hover `#F8FAFC`.
- Divisores: `#E9EDF2`.
- Datos críticos: utilizar chips de estado; no depender únicamente del color.
- Números financieros: alineación a la derecha y formato COP consistente.
- Fechas logísticas: formato recomendado `DD MMM YYYY` o `DD/MM/YYYY`, sin mezclar formatos dentro del producto.

---

## 10. Aplicaciones digitales

### 10.1 Página web institucional

#### Header

- Usar logo horizontal.
- Fondo blanco.
- CTA principal en azul corporativo.
- Menú breve y sobrio.

#### Hero sugerido

**Título:**  
`Soluciones logísticas justo a tiempo`

**Texto:**  
`Coordinamos operaciones de importación empresarial con experiencia, seguimiento y aliados estratégicos.`

**CTA primario:**  
`Solicitar asesoría`

**CTA secundario:**  
`Conocer servicios`

> Evitar afirmar que ANA V SAS ejecuta directamente trámites aduaneros ante la DIAN.

---

### 10.2 CRM interno

#### Login

- Fondo lateral azul marino o azul principal.
- Logo negativo completo.
- Panel de formulario blanco.
- Botón primario azul.
- Eslogan permitido únicamente en pantalla de acceso o bienvenida.

#### Navegación interna

- Usar isotipo o logo horizontal reducido.
- Sidebar en azul marino o blanco.
- Estados de operación claramente visibles.
- Priorizar lectura de fechas de zarpe, llegada, documentos y alertas.

---

### 10.3 App icon y favicon

#### App icon

- Fondo azul principal o azul marino.
- Isotipo en blanco.
- Sin texto.
- Sin eslogan.
- Exportar en tamaños estándar desde un máster de `1024 × 1024 px`.

#### Favicon

- Usar únicamente versión simplificada del isotipo.
- No usar wordmark.
- Preparar exports: `16x16`, `32x32`, `48x48`, `180x180` y `512x512`.

---

### 10.4 Avatar / perfil

Para WhatsApp Business, CRM, Google Workspace o perfiles corporativos:

- Fondo blanco: isotipo azul.
- Fondo azul: isotipo blanco.
- Mantener círculo de protección alrededor del símbolo.
- No incluir el nombre por baja legibilidad.

---

### 10.5 Firma de correo

#### Estructura recomendada

```text
[Isotipo / Logo secundario] | Nombre Apellido
                            | Cargo
                            | +57 XXX XXX XXXX
                            | correo@dominio.com
                            | www.dominio.com
                            | Bogotá, Colombia
```

- Utilizar logo secundario o isotipo, nunca un logo demasiado grande.
- No incluir más de tres colores.
- No usar fondos pesados o imágenes fotográficas.
- El eslogan es opcional; solo si no aumenta la altura excesivamente.

---

### 10.6 Documentos y membretes

- Logo horizontal en el encabezado.
- Línea divisoria azul principal.
- Datos de contacto alineados al extremo derecho.
- Marca de agua opcional del isotipo con opacidad máxima del `5%`.
- Para documentos legales o facturación, asegurar que el nombre legal aparezca exactamente como: **ANA V SAS**.

---

## 11. Archivos de marca requeridos

### Estructura recomendada del repositorio

```text
/public
  /brand
    /logos
      ana-v-logo-primary-positive.svg
      ana-v-logo-primary-negative.svg
      ana-v-logo-horizontal-positive.svg
      ana-v-logo-horizontal-negative.svg
      ana-v-logo-secondary-positive.svg
      ana-v-logo-secondary-negative.svg
      ana-v-logo-monochrome-black.svg
    /isotype
      ana-v-isotype-blue.svg
      ana-v-isotype-white.svg
      ana-v-isotype-simplified-blue.svg
      ana-v-isotype-simplified-white.svg
    /icons
      favicon.ico
      favicon-16x16.png
      favicon-32x32.png
      apple-touch-icon.png
      app-icon-512.png
      app-icon-1024.png
    /documents
      ana-v-letterhead-header.svg
      ana-v-email-signature-logo.png
```

### Formatos necesarios

| Formato | Uso |
|---|---|
| `.svg` | Web, CRM, interfaces y documentos digitales |
| `.png` transparente | Correos, documentos rápidos, imágenes de perfil |
| `.ico` | Favicon |
| `.pdf` vectorial | Impresión y proveedores externos |

> Los boards de presentación visual no reemplazan la exportación real del logo. Para producción se necesitan archivos limpios por versión, preferiblemente vectoriales.

---

## 12. Usos incorrectos

Nunca se debe:

- Cambiar el azul corporativo del logo por colores arbitrarios.
- Estirar, comprimir o deformar el símbolo o el wordmark.
- Rotar el logo.
- Aplicar sombras, brillos, biseles, degradados o contornos.
- Reordenar `ANA V`, `SAS`, isotipo o eslogan sin una versión aprobada.
- Usar el logo completo en tamaños donde el slogan ya no sea legible.
- Colocar el logo sobre fondos sin contraste.
- Sustituir el isotipo por íconos genéricos de barcos, aviones o aduanas.
- Comunicar la marca como “Agencia de Aduanas” si no corresponde a su condición legal y operativa.

---

## 13. Accesibilidad y consistencia digital

### Contraste

- Texto azul marino `#0D2B55` sobre blanco: recomendado para textos principales.
- Texto blanco sobre azul principal o marino: recomendado para botones, header oscuro y login.
- Azul claro `#4A86C5` no debe usarse para textos pequeños sobre blanco sin validar contraste.

### Reglas de interfaz

- Los estados nunca deben comunicarse únicamente por color: incluir texto e ícono.
- Todos los botones deben tener estados `hover`, `focus`, `disabled` y `loading`.
- Los formularios deben usar labels visibles; no depender solo de placeholders.
- Mantener una única convención de mayúsculas: títulos en sentence case dentro del CRM y marca en uppercase cuando aparezca como logo.

---

## 14. Checklist para implementación

### Marca

- [ ] Exportar logo principal en SVG positivo y negativo.
- [ ] Exportar logo horizontal en SVG positivo y negativo.
- [ ] Crear isotipo simplificado para tamaños pequeños.
- [ ] Exportar favicon y app icon.
- [ ] Validar visualmente el eslogan en impresión y digital.

### Web / CRM

- [ ] Instalar tipografía Montserrat.
- [ ] Crear variables/tokens de color.
- [ ] Implementar logo horizontal en navbar.
- [ ] Implementar logo negativo en login.
- [ ] Crear componentes de botón, card y chip con tokens oficiales.
- [ ] Verificar contraste y responsive.
- [ ] Evitar textos que presenten a ANA V SAS como agencia de aduanas.

### Documentos

- [ ] Diseñar membrete.
- [ ] Diseñar firma de correo.
- [ ] Crear portada institucional.
- [ ] Definir plantilla para cotizaciones y reportes.

---

## 15. Fuente de verdad

Este documento es la guía visual y de implementación digital de la marca **ANA V SAS**. Debe utilizarse como referencia para:

- Landing page institucional
- CRM interno
- App o PWA
- Dashboard operativo
- Plantillas documentales
- Presentaciones
- Firmas y perfiles corporativos

Cualquier nueva pieza, pantalla o archivo de marca debe respetar este sistema o documentar explícitamente la razón de su excepción.

---

## 16. Decisiones aprobadas

| Decisión | Estado |
|---|---|
| Nombre visual principal: **ANA V SAS** | Aprobado |
| Conservación del símbolo globo + buque | Aprobado |
| Conservación del eslogan **¡Justo a tiempo!** | Aprobado |
| Paleta institucional basada en azul | Aprobado |
| Uso de Montserrat como tipografía digital principal | Dirección seleccionada |
| Uso de Dancing Script Bold para el eslogan | Dirección seleccionada |
| Aplicación a web, CRM, app, documentos y firma | Definido |
| Exportación final vectorial de cada logo | Pendiente |

---

*Documento de identidad visual y desarrollo digital — ANA V SAS · Mayo 2026.*
