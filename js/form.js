/**
 * Formulario de calificación → sistema (os.anavsas.com)
 * Estado actual: el endpoint /api/leads del sistema aún no está en producción,
 * así que el envío va por WhatsApp con los datos prellenados.
 * Regla de oro: nunca window.open automático tras un await — los navegadores
 * lo bloquean. Siempre un botón visible que el usuario clickea.
 */

const WHATSAPP_NUMBER = "573014163890";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("lead-form");
  if (!form) return;

  const statusEl = document.getElementById("form-status");
  const whatsappBtn = document.getElementById("form-whatsapp");

  const REQUIRED = ["nombre", "empresa", "celular", "correo", "tipo_mercancia", "procedencia", "volumen", "fecha_envio"];

  const setStatus = (msg, type) => {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className = "form-status" + (type ? " form-status--" + type : "");
  };

  const collect = () => {
    const data = {};
    new FormData(form).forEach((value, key) => {
      if (key === "website") return; // honeypot, se descarta
      if (key === "autorizacion") return; // consentimiento: se valida aparte, no viaja con el lead
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

  // Muestra el botón visible de WhatsApp con el mensaje prellenado.
  const offerWhatsApp = (data) => {
    if (!whatsappBtn) return;
    whatsappBtn.href = buildWhatsAppUrl(data);
    whatsappBtn.hidden = false;
  };

  form.addEventListener("submit", (e) => {
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

    setStatus(
      "¡Listo! Tu resumen quedó armado. Envíanoslo por WhatsApp con un clic y un asesor te responde por ahí.",
      "success"
    );
    offerWhatsApp(data);
    whatsappBtn && whatsappBtn.focus();
  });

  // Limpiar estado inválido al escribir
  form.addEventListener("input", (e) => {
    if (e.target.getAttribute("aria-invalid")) {
      e.target.removeAttribute("aria-invalid");
    }
  });
});
