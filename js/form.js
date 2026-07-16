/**
 * Formulario de calificación → Supabase (CRM ana-v-sas-os)
 * Inserta el lead en la tabla `leads` vía la REST API de Supabase.
 * Fallback: si no hay anon key configurada o el envío falla, abre WhatsApp.
 */

// ── Configuración ───────────────────────────────────────────────────────────
// La URL ya se conoce por el project-id del CRM. La ANON KEY es pública por
// diseño (RLS protege la tabla: anon solo puede INSERT). Pega la anon key aquí.
const SUPABASE_URL = "https://xjddungyhheprapxyixv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqZGR1bmd5aGhlcHJhcHh5aXh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMTQwMjcsImV4cCI6MjA5NDg5MDAyN30.1xRM42W-Pfx7vZSv3cjxR9tpDKjPWfYbfbA2O_QmwVg"; // ← reemplazar por la anon key del proyecto

const WHATSAPP_NUMBER = "573014163890";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("lead-form");
  if (!form) return;

  const statusEl = document.getElementById("form-status");
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
      if (key === "website") return; // honeypot, se descarta
      if (key === "autorizacion") return; // consentimiento: se valida aparte, no va a la tabla leads
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
      data.tipo_mercancia ? `Tipo de mercancía: ${data.tipo_mercancia}` : null,
      data.procedencia ? `Procedencia: ${data.procedencia}` : null,
      data.volumen ? `Volumen: ${data.volumen}` : null,
      data.fecha_envio ? `Fecha tentativa de envío: ${data.fecha_envio}` : null,
      data.mensaje ? `Mensaje: ${data.mensaje}` : null
    ].filter(Boolean);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  const isConfigured = () =>
    SUPABASE_ANON_KEY && SUPABASE_ANON_KEY !== "PEGAR_ANON_KEY_AQUI";

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
      return;
    }

    data.source = "landing";
    data.estado = "nuevo";

    // Si aún no hay backend configurado, usar el fallback de WhatsApp.
    if (!isConfigured()) {
      setStatus("Abriendo WhatsApp para enviar tu operación…", "success");
      window.open(buildWhatsAppUrl(data), "_blank", "noopener");
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando…";
    }
    setStatus("Enviando tu operación…", "");

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          Prefer: "return=minimal"
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status} ${detail}`);
      }

      form.reset();
      setStatus(
        "Recibimos tu operación. Un asesor revisará los datos y te contactará pronto.",
        "success"
      );
    } catch (err) {
      console.error("Error enviando lead a Supabase:", err);
      setStatus(
        "No pudimos enviar el formulario. Escríbenos por WhatsApp e intentamos por ahí.",
        "error"
      );
      window.open(buildWhatsAppUrl(data), "_blank", "noopener");
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
