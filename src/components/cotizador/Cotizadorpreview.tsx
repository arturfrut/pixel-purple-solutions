import { format, addDays } from 'date-fns'
import { es } from 'date-fns/locale'
import { Printer, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  VENDEDORES,
  SERVICIOS,
  getAclaraciones,
  formatPrecio,
} from '@/data/cotizador-data'
import { CotizadorFormData, Servicio } from '@/types/cotizador'

// ── Helpers ────────────────────────────────────────────────────────
function getServiciosForIds(ids: string[]): Servicio[] {
  return ids
    .map(id => SERVICIOS.find(s => s.id === id))
    .filter(Boolean) as Servicio[]
}

function sumPrecios(servicios: Servicio[]): number {
  return servicios.reduce((acc, s) => acc + (s.precio ?? 0), 0)
}

// ── Sección de periodicidad dentro de una columna ─────────────────
function PeriodicidadSection({
  label,
  servicios,
  tipo,
}: {
  label: string
  servicios: Servicio[]
  tipo: 'pago_unico' | 'mensual' | 'presupuestar'
}) {
  if (servicios.length === 0) return null

  const total = sumPrecios(servicios)

  return (
    <div>
      {/* Section label */}
      <p
        className="text-xs font-bold uppercase tracking-widest mb-2"
        style={{ color: tipo === 'presupuestar' ? '#7c3aed' : '#6b7280' }}
      >
        {label}
      </p>

      {/* Total price — only for pago_unico and mensual */}
      {tipo !== 'presupuestar' && (
        <div className="mb-3">
          <p className="text-2xl font-bold text-foreground leading-none">
            {formatPrecio(total)}
          </p>
          {tipo === 'mensual' && (
            <p className="text-xs text-muted-foreground mt-0.5">/mes</p>
          )}
        </div>
      )}

      {/* Presupuestar header */}
      {tipo === 'presupuestar' && (
        <div className="flex items-center gap-2 mb-3 p-2 rounded-lg bg-primary/8 border border-primary/20">
          <span className="text-base">🗓️</span>
          <p className="text-xs font-semibold text-primary">
            A cotizar en entrevista
          </p>
        </div>
      )}

      {/* Items */}
      <ul className="space-y-2">
        {servicios.map(s => (
          <li key={s.id} className="flex items-start gap-2">
            <span className="text-primary mt-0.5 flex-shrink-0 text-sm">✓</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-1 flex-wrap">
                <span className="text-xs text-foreground leading-snug">
                  {s.nombre}
                </span>
                {s.extra_costs && (
                  <span className="text-xs text-primary font-bold leading-snug">*</span>
                )}
                {s.hour_rate && (
                  <span className="text-xs bg-amber-100 text-amber-700 border border-amber-200 px-1 py-0 rounded-full font-medium leading-4">
                    /hora
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground leading-snug mt-0.5">
                {s.descripcion}
              </p>
            </div>
            {s.precio !== null && tipo !== 'presupuestar' && (
              <span className="text-xs text-muted-foreground flex-shrink-0 mt-0.5">
                {formatPrecio(s.precio)}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ── Single cotizacion column ───────────────────────────────────────
function CotizacionColumn({
  nombre,
  servicios,
}: {
  nombre: string
  servicios: Servicio[]
}) {
  const pagoUnico = servicios.filter(s => s.periodicidad === 'pago_unico')
  const mensual = servicios.filter(s => s.periodicidad === 'mensual')
  const presupuestar = servicios.filter(s => s.periodicidad === 'presupuestar')

  const hasDivider1 = pagoUnico.length > 0 && (mensual.length > 0 || presupuestar.length > 0)
  const hasDivider2 = mensual.length > 0 && presupuestar.length > 0

  return (
    <div
      className="rounded-2xl border border-border p-5 flex flex-col gap-4"
      style={{ breakInside: 'avoid' }}
    >
      {/* Column title */}
      <div className="pb-2 border-b border-border">
        <p className="font-semibold text-sm text-foreground">{nombre}</p>
      </div>

      <PeriodicidadSection
        label="Pago único"
        servicios={pagoUnico}
        tipo="pago_unico"
      />
      {hasDivider1 && <Separator />}
      <PeriodicidadSection
        label="Mensual"
        servicios={mensual}
        tipo="mensual"
      />
      {hasDivider2 && <Separator />}
      <PeriodicidadSection
        label="A presupuestar"
        servicios={presupuestar}
        tipo="presupuestar"
      />
    </div>
  )
}

// ── Main Preview ───────────────────────────────────────────────────
interface Props {
  data: CotizadorFormData
  onBack: () => void
}

export default function CotizadorPreview({ data, onBack }: Props) {
  const vendedor =
    data.vendedorIdx !== null ? VENDEDORES[data.vendedorIdx] : null
  const fechaFin = data.fechaInicio ? addDays(data.fechaInicio, 15) : null
  const tipoNegocioDisplay =
    data.tipoNegocio === 'Otros' ? data.tipoNegocioOtro : data.tipoNegocio

  // All selected services across all cotizaciones (deduped for aclaraciones)
  const allServiciosIds = [
    ...new Set(data.cotizaciones.flatMap(c => c.serviciosIds)),
  ]
  const allServicios = getServiciosForIds(allServiciosIds)
  const aclaraciones = getAclaraciones(allServicios)

  const handlePrint = () => window.print()

  return (
    <>
      {/* Print styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .print-container {
            box-shadow: none !important;
            max-width: 100% !important;
            padding: 0 !important;
          }
          @page { margin: 1.5cm; }
        }
      `}</style>

      {/* Action bar */}
      <div className="no-print sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-3 flex items-center justify-between gap-3">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-1.5">
          <ArrowLeft className="w-4 h-4" />
          Volver al editor
        </Button>
        <Button size="sm" onClick={handlePrint} className="gap-1.5">
          <Printer className="w-4 h-4" />
          Imprimir / Guardar PDF
        </Button>
      </div>

      {/* Document */}
      <div className="bg-background min-h-screen py-8 px-4 print:py-0 print:px-0">
        <div
          className="print-container max-w-4xl mx-auto bg-white rounded-2xl shadow-card border border-border overflow-hidden"
        >
          {/* ── Header ── */}
          <div className="px-8 py-6 border-b border-border flex items-start justify-between gap-6">
            {/* Logo + brand */}
            <div className="flex items-center gap-3">
              <img
                src="/violetLogo.png"
                className="h-10 w-auto"
                alt="Marketing KAI"
                style={{ mixBlendMode: 'multiply' }}
              />
              <div>
                <p className="font-bold text-foreground text-lg leading-none">
                  Marketing KAI
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Agencia de Marketing Digital
                </p>
              </div>
            </div>

            {/* Vendor info */}
            {vendedor && (
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">
                  {vendedor.nombre}
                </p>
                <p className="text-sm text-muted-foreground">
                  Tel: {vendedor.telefono}
                </p>
              </div>
            )}
          </div>

          {/* ── Client info grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-border">
            {/* Col 1: Client */}
            <div className="px-6 py-5 border-b sm:border-b-0 sm:border-r border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Propuesta para
              </p>
              <p className="font-bold text-foreground text-base leading-snug">
                {data.clienteNombre || '—'}
              </p>
              {tipoNegocioDisplay && (
                <p className="text-sm text-muted-foreground mt-1">
                  {tipoNegocioDisplay}
                </p>
              )}
            </div>

            {/* Col 2: Description */}
            <div className="px-6 py-5 border-b sm:border-b-0 sm:border-r border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Descripción del local
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                {data.descripcionLocal || '—'}
              </p>
            </div>

            {/* Col 3: Dates */}
            <div className="px-6 py-5">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Vigencia
              </p>
              <p className="font-semibold text-foreground">15 días</p>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Inicio</span>
                  <span className="text-foreground font-medium">
                    {data.fechaInicio
                      ? format(data.fechaInicio, 'dd/MM/yyyy', { locale: es })
                      : '—'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Fin</span>
                  <span className="text-foreground font-medium">
                    {fechaFin
                      ? format(fechaFin, 'dd/MM/yyyy', { locale: es })
                      : '—'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Cotizaciones ── */}
          <div className="px-8 py-6">
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: `repeat(${data.cotizaciones.length}, minmax(0, 1fr))`,
              }}
            >
              {data.cotizaciones.map(cot => (
                <CotizacionColumn
                  key={cot.id}
                  nombre={cot.nombre}
                  servicios={getServiciosForIds(cot.serviciosIds)}
                />
              ))}
            </div>
          </div>

          {/* ── Free consultation card ── */}
          <div className="px-8 pb-6">
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-5 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center text-xl flex-shrink-0">
                🎁
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground mb-1">
                  Primera asesoría gratuita, sin obligación de compra
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Siempre tenés disponible una consultoría inicial gratuita con el objetivo de evaluar tu estado digital actual, identificar oportunidades y responder dudas sobre la implementación de distintos servicios. Sin compromiso.
                </p>
              </div>
            </div>
          </div>

          {/* ── Aclaraciones ── */}
          <div className="px-8 pb-8 border-t border-border pt-6">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Aclaraciones importantes
            </p>
            <div className="space-y-2">
              {aclaraciones.map((ac, i) => (
                <p key={i} className="text-xs text-muted-foreground leading-relaxed flex gap-2">
                  <span className="text-primary font-bold flex-shrink-0">*</span>
                  {ac}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}