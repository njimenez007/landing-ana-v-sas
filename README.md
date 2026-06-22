# Landing Page ANA V SAS

Landing page corporativa de **ANA V SAS** — Agencia de Aduanas y Carga Internacional.

## Stack

- HTML5 + CSS3 (Grid, Flexbox, Custom Properties)
- GSAP + ScrollTrigger (animaciones)
- Google Analytics 4
- Deploy: Vercel → anavsas.com

## Estructura

```
/
├── index.html          ← Una sola página
├── css/
│   └── styles.css      ← Estilos completos
├── js/
│   ├── main.js         ← Init, scroll management
│   ├── hero.js         ← Hero: mapa, ruta, buque scrub
│   ├── timeline.js     ← Sección 3: scroll hijacking + 4 pasos
│   └── counters.js     ← Sección 5: ticker animado
├── assets/
│   ├── icons/          ← Íconos SVG de todas las secciones
│   └── (imágenes generadas aquí)
└── README.md
```

## Clonar y correr local

```bash
git clone <repo-url>
cd landing-ana-v-sas
# Abrir index.html en el navegador o usar live-server
```

## Build

No necesita build — es HTML/CSS/JS plano. Servir con cualquier servidor estático.

```bash
npx serve .
```
