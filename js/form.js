/**
 * Formulario de calificación → sistema (os.anavsas.com)
 * POST a /api/leads: el endpoint valida, verifica Turnstile y guarda el lead.
 * En TODOS los caminos de error el lead puede irse por WhatsApp con los datos
 * prellenados (botón visible que el usuario clickea — nunca window.open
 * automático tras un await: los navegadores lo bloquean).
 */

const LEADS_ENDPOINT = "https://os.anavsas.com/api/leads";
const WHATSAPP_NUMBER = "573014163890";
// Tiempo de gracia para que cargue el script de Turnstile antes de declarar
// que no está disponible (bloqueadores, red, etc.).
const TURNSTILE_LOAD_TIMEOUT = 6000;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("lead-form");
  if (!form) return;

  const statusEl = document.getElementById("form-status");
  const whatsappBtn = document.getElementById("form-whatsapp");
  const submitBtn = document.getElementById("lead-submit");
  const submitLabel = submitBtn ? submitBtn.textContent : "Enviar";

  const REQUIRED = ["nombre", "empresa", "celular", "correo", "tipo_mercancia", "procedencia", "volumen", "fecha_envio"];

  const setStatus = (msg, type) => {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className = "form-status" + (type ? " form-status--" + type : "");
  };

  const collect = () => {
    const data = {};
    new FormData(form).forEach((value, key) => {
      if (key === "website") return; // honeypot: viaja aparte, siempre vacío
      if (key === "autorizacion") return; // consentimiento: se valida aparte, no viaja con el lead
      if (key === "cf-turnstile-response") return; // token: se lee vía turnstile.getResponse()
      const v = typeof value === "string" ? value.trim() : value;
      data[key] = v === "" ? null : v;
    });
    return data;
  };

  const validate = (data) => {
    for (const field of REQUIRED) {
      const el = form.elements[field];
      if (!data[field]) {
        if (el) {
          el.setAttribute("aria-invalid", "true");
          el.focus();
        }
        return `Por favor completa el campo "${field}".`;
      }
      if (el) el.removeAttribute("aria-invalid");
    }
    const correo = data.correo || "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      const el = form.elements.correo;
      if (el) { el.setAttribute("aria-invalid", "true"); el.focus(); }
      return "Ingresa un correo válido.";
    }
    const consent = form.elements.autorizacion;
    if (consent && !consent.checked) {
      consent.setAttribute("aria-invalid", "true");
      consent.focus();
      return "Debes autorizar el tratamiento de tus datos personales para enviar el formulario.";
    }
    if (consent) consent.removeAttribute("aria-invalid");
    return null;
  };

  // Mapea los names del HTML al contrato del endpoint /api/leads.
  const buildPayload = (data, turnstileToken) => {
    const payload = {
      nombre: data.nombre,
      empresa: data.empresa,
      telefono: data.celular,
      email: data.correo,
      tipo_mercancia: data.tipo_mercancia,
      origen: data.procedencia,
      volumen: data.volumen,
      fecha_embarque: data.fecha_envio,
      turnstile_token: turnstileToken,
      website: "" // honeypot: el servidor descarta envíos donde llegue lleno
    };
    if (data.cargo) payload.cargo = data.cargo; // columna propia en el sistema (2026-07-18)
    if (data.mensaje) payload.mensaje = data.mensaje;
    return payload;
  };

  const buildWhatsAppUrl = (data) => {
    const lines = [
      "Hola, quiero revisar una importación empresarial con ANA V SAS.",
      data.empresa ? `Empresa: ${data.empresa}` : null,
      data.nombre ? `Nombre: ${data.nombre}` : null,
      data.cargo ? `Cargo: ${data.cargo}` : null,
      data.celular ? `Celular: ${data.celular}` : null,
      data.correo ? `Correo: ${data.correo}` : null,
      data.tipo_mercancia ? `Tipo de mercancía: ${data.tipo_mercancia}` : null,
      data.procedencia ? `Procedencia: ${data.procedencia}` : null,
      data.volumen ? `Volumen: ${data.volumen}` : null,
      data.fecha_envio ? `Fecha tentativa de envío: ${data.fecha_envio}` : null,
      data.mensaje ? `Mensaje: ${data.mensaje}` : null
    ].filter(Boolean);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  const offerWhatsApp = (data) => {
    if (!whatsappBtn) return;
    whatsappBtn.href = buildWhatsAppUrl(data);
    whatsappBtn.hidden = false;
  };

  // El href se refresca al clickear, por si el usuario editó campos después
  // del último submit (o si el botón quedó visible en modo sin-Turnstile).
  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", () => {
      whatsappBtn.href = buildWhatsAppUrl(collect());
    });
  }

  // ── Turnstile: si el script no carga (bloqueadores, red), se deshabilita el
  // envío directo y queda solo el camino de WhatsApp. ─────────────────────────
  let turnstileAvailable = false;
  const turnstileWidget = form.querySelector(".cf-turnstile");

  const disableDirectSubmit = () => {
    if (submitBtn) submitBtn.disabled = true;
    if (turnstileWidget) turnstileWidget.hidden = true;
    setStatus(
      "No pudimos cargar la verificación de seguridad. Envíanos tu operación por WhatsApp — llena el formulario y usa el botón verde.",
      "error"
    );
    offerWhatsApp(collect());
  };

  const turnstileTimer = setTimeout(() => {
    if (!window.turnstile) disableDirectSubmit();
  }, TURNSTILE_LOAD_TIMEOUT);

  const checkTurnstile = setInterval(() => {
    if (window.turnstile) {
      turnstileAvailable = true;
      clearTimeout(turnstileTimer);
      clearInterval(checkTurnstile);
    }
  }, 250);

  const getTurnstileToken = () => {
    try {
      return (window.turnstile && window.turnstile.getResponse()) || "";
    } catch (_) {
      return "";
    }
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Honeypot: si está lleno, es un bot → simulamos éxito silencioso.
    if (form.elements.website && form.elements.website.value) {
      setStatus("¡Gracias! Recibimos tu operación.", "success");
      form.reset();
      return;
    }

    const data = collect();
    const error = validate(data);
    if (error) {
      setStatus(error, "error");
      if (whatsappBtn) whatsappBtn.hidden = true;
      return;
    }

    // Sin Turnstile no hay envío directo: solo camino WhatsApp.
    if (!turnstileAvailable || !window.turnstile) {
      disableDirectSubmit();
      return;
    }

    const token = getTurnstileToken();
    if (!token) {
      setStatus("Completa la verificación de seguridad antes de enviar, o escríbenos por WhatsApp.", "error");
      offerWhatsApp(data);
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando…";
    }
    setStatus("Enviando tu operación…", "");

    try {
      const res = await fetch(LEADS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload(data, token))
      });

      if (res.status === 201) {
        form.reset();
        try { window.turnstile.reset(); } catch (_) {}
        if (whatsappBtn) whatsappBtn.hidden = true;
        setStatus("Recibimos tu solicitud, te contactamos en breve.", "success");
        return;
      }

      // 400 validación · 403 Turnstile/honeypot · 429 demasiados envíos ·
      // cualquier otro código → camino WhatsApp, nunca callejón sin salida.
      const msg =
        res.status === 429
          ? "Recibimos demasiados envíos seguidos. Mejor escríbenos directo por WhatsApp:"
          : "No pudimos registrar tu solicitud en línea. Envíanosla por WhatsApp con un clic:";
      setStatus(msg, "error");
      try { window.turnstile.reset(); } catch (_) {}
      offerWhatsApp(data);
    } catch (err) {
      console.error("Error enviando lead:", err);
      setStatus("No pudimos conectar con el servidor. Envíanos tu operación por WhatsApp:", "error");
      offerWhatsApp(data);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitLabel;
      }
    }
  });

  // Limpiar estado inválido al escribir
  form.addEventListener("input", (e) => {
    if (e.target.getAttribute("aria-invalid")) {
      e.target.removeAttribute("aria-invalid");
    }
  });
});
