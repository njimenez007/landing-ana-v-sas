/**
 * Globo terráqueo de puntos — scrollytelling China → Colombia
 * Canvas 2D con proyección ortográfica (sin dependencias 3D).
 * Un solo timeline GSAP con scrub => avanzar/retroceder es 100% simétrico.
 */

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("globo-canvas");
  const stage = document.getElementById("globo-stage");
  const wrap = document.getElementById("globo-wrap");
  if (!canvas || !stage || !wrap || !window.gsap || !window.ScrollTrigger) return;

  const ctx = canvas.getContext("2d");
  const D2R = Math.PI / 180;
  const MAP_W = 2560, MAP_H = 1280;

  const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isStatic = isReduced || window.innerWidth < 900;

  // ── Coordenadas (espacio del mapa → lon/lat) ──────────────────────────────
  const toLL = (x, y) => ({ lon: (x / MAP_W) * 360 - 180, lat: 90 - (y / MAP_H) * 180 });
  const CHINA = toLL(840, 445);   // Ningbo (puntos del mapa)
  const COL = toLL(2030, 628);    // Colombia occidente
  const MID_LON = (CHINA.lon + COL.lon) / 2;

  const TILT = 10; // inclinación de cámara (grados)

  // Ruta transpacífica: cruza el océano con comba hacia el sur (agua abierta)
  const ARC_N = 160;
  const DIP = 20; // grados de comba hacia el ecuador/sur
  const arcLL = (() => {
    const pts = [];
    for (let i = 0; i <= ARC_N; i++) {
      const t = i / ARC_N;
      pts.push({
        lon: CHINA.lon + (COL.lon - CHINA.lon) * t,
        lat: CHINA.lat + (COL.lat - CHINA.lat) * t - DIP * Math.sin(Math.PI * t)
      });
    }
    return pts;
  })();

  // ── Buque (imagen) ────────────────────────────────────────────────────────
  const shipImg = new Image();
  shipImg.src = "Assets/buque.png";
  const SHIP_AR = 198 / 466; // alto/ancho del PNG

  // ── Estado animado por el timeline ────────────────────────────────────────
  const S = {
    assemble: 0,   // ensamblado de puntos 0→1
    scale: 0.86,   // escala del globo
    viewLon: CHINA.lon, // longitud al centro de la vista
    chinaPt: 0,    // marcador China
    colPt: 0,      // marcador Colombia
    ship: 0,       // pop del barco 0→1
    travel: 0,     // avance del viaje 0→1
    dim: 0,        // atenuación del globo cuando una tarjeta pide foco
    glow: 0        // brillo final de la ruta
  };

  // ── Puntos del mapa (fetch del SVG) ───────────────────────────────────────
  let dots = null;
  fetch("Assets/mapa-puntos.svg")
    .then((r) => r.text())
    .then((txt) => {
      const doc = new DOMParser().parseFromString(txt, "image/svg+xml");
      let seed = 42;
      const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
      dots = Array.from(doc.querySelectorAll("circle")).map((c) => {
        const ll = toLL(+c.getAttribute("cx"), +c.getAttribute("cy"));
        return { lon: ll.lon, lat: ll.lat, ord: rnd() };
      });
      init();
    })
    .catch(() => { /* sin mapa no hay globo; la sección degrada a solo texto */ });

  // ── Tamaño / DPR ──────────────────────────────────────────────────────────
  let W = 0, H = 0, R = 0, CX = 0, CY = 0;
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = wrap.clientWidth;
    // En modo estático el globo vive en el padding-top del wrap y las
    // tarjetas fluyen debajo: el canvas solo mide esa franja superior.
    const strip = isStatic ? parseFloat(getComputedStyle(wrap).paddingTop) || 0 : 0;
    H = strip > 40 ? strip : wrap.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + "px"; canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    R = Math.min(H * 0.44, W * 0.30);
    CX = W / 2; CY = H / 2;
  }

  // ── Proyección ortográfica ────────────────────────────────────────────────
  let wob = 0, wobTilt = 0;
  function project(lon, lat) {
    const p = lat * D2R, l = (lon - S.viewLon - wob) * D2R;
    const x3 = Math.cos(p) * Math.sin(l);
    const y3 = Math.sin(p);
    const z3 = Math.cos(p) * Math.cos(l);
    const t = (TILT + wobTilt) * D2R;
    const y2 = y3 * Math.cos(t) - z3 * Math.sin(t);
    const z2 = y3 * Math.sin(t) + z3 * Math.cos(t);
    const r = R * S.scale;
    return { x: CX + x3 * r, y: CY - y2 * r, z: z2 };
  }

  // ── Render ────────────────────────────────────────────────────────────────
  const NAVY = "13, 43, 85";
  function render() {
    if (!dots) return;
    ctx.clearRect(0, 0, W, H);
    if (S.assemble <= 0.005) return;

    // foco en tarjeta => el globo baja de protagonismo
    ctx.globalAlpha = 1 - 0.55 * S.dim;

    // aro sutil que insinúa la esfera
    ctx.beginPath();
    ctx.arc(CX, CY, R * S.scale + 6, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${NAVY}, ${0.10 * S.assemble})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // puntos del mundo
    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];
      const a = Math.max(0, Math.min(1, (S.assemble * 1.15 - d.ord) * 6));
      if (a <= 0) continue;
      const pr = project(d.lon, d.lat);
      if (pr.z <= 0.02) continue;
      const depth = 0.35 + 0.65 * pr.z;
      ctx.beginPath();
      ctx.arc(pr.x, pr.y, 1.9 * depth * S.scale + 0.4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${NAVY}, ${(0.28 + 0.62 * pr.z) * a})`;
      ctx.fill();
    }

    // ruta trazada
    if (S.travel > 0.002) {
      ctx.save();
      ctx.strokeStyle = "#1F4E8C";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      if (S.glow > 0.01) { ctx.shadowColor = "rgba(74,134,197,0.9)"; ctx.shadowBlur = 14 * S.glow; }
      ctx.beginPath();
      let pen = false;
      const upto = Math.floor(S.travel * ARC_N);
      for (let i = 0; i <= upto; i++) {
        const pr = project(arcLL[i].lon, arcLL[i].lat);
        if (pr.z > 0.02) { pen ? ctx.lineTo(pr.x, pr.y) : ctx.moveTo(pr.x, pr.y); pen = true; }
        else pen = false;
      }
      ctx.stroke();
      ctx.restore();

      // waypoint medio del Pacífico
      const wpA = Math.max(0, Math.min(1, (S.travel - 0.5) * 8));
      if (wpA > 0) {
        const mid = project(arcLL[ARC_N / 2].lon, arcLL[ARC_N / 2].lat);
        if (mid.z > 0.02) {
          ctx.beginPath(); ctx.arc(mid.x, mid.y, 5.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(31,78,140,${wpA})`; ctx.fill();
          ctx.beginPath(); ctx.arc(mid.x, mid.y, 9, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(31,78,140,${0.45 * wpA})`; ctx.lineWidth = 2; ctx.stroke();
        }
      }
    }

    // marcadores origen/destino
    const mk = (ll, amt) => {
      if (amt <= 0.01) return;
      const pr = project(ll.lon, ll.lat);
      if (pr.z <= 0.02) return;
      ctx.beginPath(); ctx.arc(pr.x, pr.y, 6.5 * amt, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(31,78,140,${amt})`; ctx.fill();
      ctx.beginPath(); ctx.arc(pr.x, pr.y, 6.5 * amt, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,255,255,${0.9 * amt})`; ctx.lineWidth = 2; ctx.stroke();
    };
    mk(CHINA, S.chinaPt);
    mk(COL, S.colPt);

    // buque navegando el arco
    if (S.ship > 0.01 && shipImg.complete && shipImg.naturalWidth) {
      const t = S.travel;
      const i = Math.min(ARC_N - 1, Math.floor(t * ARC_N));
      const p1 = project(arcLL[i].lon, arcLL[i].lat);
      const p2 = project(arcLL[i + 1].lon, arcLL[i + 1].lat);
      if (p1.z > 0.02) {
        const ang = Math.atan2(p2.y - p1.y, p2.x - p1.x);
        const SHIP_W = isStatic ? 68 : 96; // mobile: buque más pequeño (globo más chico)
        // sombra de agua
        ctx.beginPath();
        ctx.ellipse(p1.x, p1.y + 4, SHIP_W * 0.354 * S.ship, 5.5 * S.ship, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(13,43,85,${0.16 * S.ship})`;
        ctx.fill();
        // imagen del buque (proa a la derecha, como el sentido del viaje)
        const w = SHIP_W * S.ship;
        const h = w * SHIP_AR;
        ctx.save();
        ctx.translate(p1.x, p1.y);
        ctx.rotate(ang * 0.18);
        ctx.drawImage(shipImg, -w / 2, -h * 0.86, w, h);
        ctx.restore();
      }
    }

    ctx.globalAlpha = 1;

    // overlays HTML (etiquetas + pings) siguen la proyección
    placeOverlay(labelChina, CHINA, -30);
    placeOverlay(labelCol, COL, -30);
    placeOverlay(pingChina, CHINA, 0);
    placeOverlay(pingCol, COL, 0);
  }

  const labelChina = document.getElementById("globo-label-china");
  const labelCol = document.getElementById("globo-label-col");
  const pingChina = document.getElementById("globo-ping-china");
  const pingCol = document.getElementById("globo-ping-col");

  function placeOverlay(el, ll, dy) {
    if (!el) return;
    const pr = project(ll.lon, ll.lat);
    if (pr.z <= 0.05) { el.style.visibility = "hidden"; return; }
    el.style.visibility = "visible";
    el.style.transform = `translate(${pr.x}px, ${pr.y + dy}px) translate(-50%, -100%)`;
  }

  // ── Init: timeline scrub o fallback estático ─────────────────────────────
  function init() {
    resize();
    window.addEventListener("resize", () => { resize(); ScrollTrigger.refresh(); });

    const cards = ["#gcard-0", "#gcard-1", "#gcard-2", "#gcard-3"];

    if (isStatic) {
      // Reduced motion: estado final quieto y visible, sin animaciones.
      if (isReduced) {
        stage.classList.add("globo--static");
        Object.assign(S, { assemble: 1, scale: 1, travel: 1, chinaPt: 1, colPt: 1, ship: 0, glow: 0.4, viewLon: MID_LON });
        gsap.set(["#globo-title", "#globo-sub", ...cards], { clearProps: "all", opacity: 1 });
        gsap.set([pingChina, pingCol], { opacity: 0 });
        resize();
        render();
        window.addEventListener("resize", render);
        return;
      }

      // Mobile (<900px): entrada UNA sola vez, sin scrub ni pin — el globo se
      // arma, sale el buque, viaja a Colombia y se queda allá con el vaivén idle.
      resize();
      gsap.set("#globo-title", { opacity: 0, y: 30 });
      gsap.set("#globo-sub", { opacity: 0, y: 22 });
      gsap.set(cards, { opacity: 0, y: 26 });
      gsap.set([labelChina, labelCol, pingChina, pingCol], { opacity: 0 });

      gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: { trigger: stage, start: "top 75%", once: true }
      })
        .to("#globo-title", { opacity: 1, y: 0, duration: 0.6 }, 0)
        .to("#globo-sub", { opacity: 1, y: 0, duration: 0.55 }, 0.18)
        .to(S, { assemble: 1, scale: 1, duration: 1.1, ease: "power1.inOut" }, 0.3)
        .to(S, { chinaPt: 1, duration: 0.3, ease: "back.out(3)" }, 1.35)
        .to(pingChina, { opacity: 1, duration: 0.2 }, 1.4)
        .to(labelChina, { opacity: 1, duration: 0.25 }, 1.45)
        .to(S, { ship: 1, duration: 0.35, ease: "back.out(2.2)" }, 1.7)
        .to(S, { travel: 1, viewLon: MID_LON, duration: 2.4, ease: "power1.inOut" }, 2.0)
        .to(S, { colPt: 1, duration: 0.3, ease: "back.out(3)" }, 4.15)
        .to(pingCol, { opacity: 1, duration: 0.2 }, 4.2)
        .to(labelCol, { opacity: 1, duration: 0.25 }, 4.25)
        .to(S, { glow: 0.6, duration: 0.5 }, 4.3);

      // Tarjetas 2×2: cada una entra cuando el usuario llega a ella (una vez)
      cards.forEach((sel, i) => {
        gsap.to(sel, {
          opacity: 1, y: 0, duration: 0.55, ease: "power2.out", delay: (i % 2) * 0.12,
          scrollTrigger: { trigger: sel, start: "top 88%", once: true }
        });
      });

      // Render continuo: mantiene el giro idle sutil también al final del viaje
      gsap.ticker.add(() => {
        const now = performance.now();
        wob = Math.sin(now * 0.00033) * 2.2;
        wobTilt = Math.sin(now * 0.00021) * 1.1;
        render();
      });
      return;
    }

    // 1) Título y subtítulo aparecen ANTES del pin, mientras la sección asoma
    gsap.set("#globo-title", { opacity: 0, y: 36 });
    gsap.set("#globo-sub", { opacity: 0, y: 28 });
    gsap.timeline({
      scrollTrigger: { trigger: stage, start: "top 88%", end: "top 6%", scrub: 0.4 }
    })
      .to("#globo-title", { opacity: 1, y: 0, duration: 1.1, ease: "power1.out" }, 0)
      .to("#globo-sub", { opacity: 1, y: 0, duration: 0.9, ease: "power1.out" }, 0.55);

    // Estados iniciales de las tarjetas (protagonistas: entran al centro lateral)
    gsap.set(["#gcard-0", "#gcard-2"], { opacity: 0, x: -64, scale: 0.94 });
    gsap.set(["#gcard-1", "#gcard-3"], { opacity: 0, x: 64, scale: 0.94 });
    gsap.set(".globo-card__link", { scaleX: 0 });
    gsap.set([labelChina, labelCol, pingChina, pingCol], { opacity: 0 });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: stage,
        start: "top top",
        end: "+=7600",
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    tl
      // 2) materializa el globo (el texto ya se leyó antes del pin)
      .to(S, { assemble: 1, scale: 1, duration: 0.095 }, 0.02)
      // 3) punto + etiqueta China
      .to(S, { chinaPt: 1, duration: 0.03, ease: "back.out(3)" }, 0.16)
      .to(pingChina, { opacity: 1, duration: 0.02 }, 0.17)
      .to(labelChina, { opacity: 1, duration: 0.03 }, 0.185)
      // 4) TARJETA 1 — el globo se atenúa; hold largo para leer con calma
      .to(S, { dim: 1, duration: 0.03 }, 0.215)
      .to("#gcard-0", { opacity: 1, x: 0, scale: 1, duration: 0.04, ease: "power2.out" }, 0.225)
      .to("#gcard-0 .globo-card__link", { scaleX: 1, duration: 0.03 }, 0.26)
      .to("#gcard-0", { opacity: 0, x: -28, duration: 0.03 }, 0.38)
      .to(S, { dim: 0, duration: 0.03 }, 0.38)
      // 5) pop del buque
      .to(S, { ship: 1, duration: 0.04, ease: "back.out(2.2)" }, 0.415)
      // 6) TARJETA 2 (derecha) — hold largo
      .to(S, { dim: 1, duration: 0.03 }, 0.445)
      .to("#gcard-1", { opacity: 1, x: 0, scale: 1, duration: 0.04, ease: "power2.out" }, 0.455)
      .to("#gcard-1 .globo-card__link", { scaleX: 1, duration: 0.03 }, 0.49)
      .to("#gcard-1", { opacity: 0, x: 28, duration: 0.03 }, 0.60)
      .to(S, { dim: 0, duration: 0.03 }, 0.60)
      .to(pingChina, { opacity: 0, duration: 0.025 }, 0.61)
      // 7) viaje, primera mitad (hasta mitad del Pacífico)
      .to(S, { travel: 0.5, viewLon: MID_LON, duration: 0.07, ease: "power1.inOut" }, 0.625)
      // 8) TARJETA 3 — el buque "espera" en medio del océano; hold largo
      .to(S, { dim: 1, duration: 0.03 }, 0.705)
      .to("#gcard-2", { opacity: 1, x: 0, scale: 1, duration: 0.04, ease: "power2.out" }, 0.715)
      .to("#gcard-2 .globo-card__link", { scaleX: 1, duration: 0.03 }, 0.75)
      .to("#gcard-2", { opacity: 0, x: -28, duration: 0.03 }, 0.835)
      .to(S, { dim: 0, duration: 0.03 }, 0.835)
      // 9) viaje, segunda mitad (llegada)
      .to(S, { travel: 1, viewLon: COL.lon, duration: 0.05, ease: "power1.inOut" }, 0.85)
      // 10) Colombia + TARJETA 4 — hold largo hasta que suelta el pin
      .to(S, { colPt: 1, duration: 0.022, ease: "back.out(3)" }, 0.903)
      .to(pingCol, { opacity: 1, duration: 0.016 }, 0.908)
      .to(labelCol, { opacity: 1, duration: 0.022 }, 0.913)
      .to(S, { glow: 1, duration: 0.028 }, 0.918)
      .to("#gcard-3", { opacity: 1, x: 0, scale: 1, duration: 0.035, ease: "power2.out" }, 0.91)
      .to("#gcard-3 .globo-card__link", { scaleX: 1, duration: 0.025 }, 0.948)
      // hold final ~0.945 → 1.0 (~420px) con todo en pantalla
      .to(S, { glow: 1, duration: 0.001 }, 0.999);

    // Render continuo: giro idle sutil + estado del timeline
    gsap.ticker.add(() => {
      const now = performance.now();
      wob = Math.sin(now * 0.00033) * 2.2;      // vaivén de longitud
      wobTilt = Math.sin(now * 0.00021) * 1.1;  // respiración de inclinación
      render();
    });
  }
});
