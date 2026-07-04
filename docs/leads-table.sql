-- ============================================================================
-- Tabla `leads` para la landing de ANA V SAS
-- Proyecto Supabase del CRM ana-v-sas-os (project-id: xjddungyhheprapxyixv)
--
-- Ejecutar en: Supabase Dashboard → SQL Editor → New query → Run
-- ============================================================================

create table if not exists public.leads (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),

  -- Datos de contacto
  nombre         text not null,
  empresa        text not null,
  cargo          text,
  whatsapp       text not null,
  correo         text not null,

  -- Datos de la operación
  producto       text not null,
  origen_pais    text,
  tiene_proveedor text,   -- 'si' | 'no' | 'en_proceso'
  volumen        text,
  recurrencia    text,    -- 'unica' | 'recurrente' | 'no_seguro'
  fecha_estimada text,
  necesidad      text,    -- carga_internacional | aduanas_aliado | transporte_nacional | coordinacion_completa | asesoria_previa
  preocupacion   text,    -- costo | documentos | dian | tiempos | proveedor | seguimiento | otra

  -- Metadatos del funnel
  source         text not null default 'landing',
  estado         text not null default 'nuevo'  -- nuevo | contactado | calificado | descartado | convertido
);

comment on table public.leads is 'Leads capturados por la landing pública. Se convierten en clientes desde el CRM.';

-- ── Row Level Security ──────────────────────────────────────────────────────
alter table public.leads enable row level security;

-- La landing (rol anon, anon key pública) SOLO puede insertar leads.
drop policy if exists "landing_anon_insert" on public.leads;
create policy "landing_anon_insert"
  on public.leads
  for insert
  to anon
  with check (true);

-- Los usuarios autenticados del CRM pueden leer y actualizar los leads.
drop policy if exists "crm_read" on public.leads;
create policy "crm_read"
  on public.leads
  for select
  to authenticated
  using (true);

drop policy if exists "crm_update" on public.leads;
create policy "crm_update"
  on public.leads
  for update
  to authenticated
  using (true)
  with check (true);

-- Índice para ordenar por fecha en el CRM.
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_estado_idx on public.leads (estado);

-- ============================================================================
-- Después de crear la tabla:
--   1. Copia la ANON KEY: Dashboard → Project Settings → API → Project API keys → anon public
--   2. Pégala en js/form.js  →  const SUPABASE_ANON_KEY = "...";
--   3. (Opcional, follow-up) Regenerar tipos del CRM:
--        npx supabase gen types typescript --project-id xjddungyhheprapxyixv > types/database.ts
--      y agregar una vista "Leads" en el repo ana-v-sas-os.
-- ============================================================================
