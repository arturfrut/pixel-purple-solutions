import { useState } from 'react'
import { format, addDays } from 'date-fns'
import { es } from 'date-fns/locale'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { CalendarIcon, Plus, Trash2, LogOut, Eye } from 'lucide-react'
import {
  VENDEDORES,
  TIPOS_NEGOCIO,
  SERVICIOS,
  CATEGORIA_ORDER,
  formatPrecio,
} from '@/data/cotizador-data'
import { CotizadorFormData, CotizacionItem, Servicio } from '@/types/cotizador'

// ── Helpers ────────────────────────────────────────────────────────
function uid() {
  return Math.random().toString(36).slice(2, 9)
}

function emptyForm(): CotizadorFormData {
  return {
    vendedorIdx: null,
    clienteNombre: '',
    tipoNegocio: '',
    tipoNegocioOtro: '',
    descripcionLocal: '',
    fechaInicio: null,
    cotizaciones: [{ id: uid(), nombre: 'Propuesta A', serviciosIds: [] }],
  }
}

// ── Service selector ───────────────────────────────────────────────
function ServiceSelector({
  selected,
  onChange,
}: {
  selected: string[]
  onChange: (ids: string[]) => void
}) {
  const categorias = CATEGORIA_ORDER.filter(cat =>
    SERVICIOS.some(s => s.categoria === cat)
  )

  const toggle = (id: string) => {
    onChange(
      selected.includes(id) ? selected.filter(x => x !== id) : [...selected, id]
    )
  }

  return (
    <div
      className="border border-border rounded-xl overflow-y-auto"
      style={{ maxHeight: 320 }}
    >
      {categorias.map((cat, ci) => {
        const servicios = SERVICIOS.filter(s => s.categoria === cat)
        const selectedInCat = servicios.filter(s => selected.includes(s.id)).length
        return (
          <div key={cat}>
            {ci > 0 && <Separator />}
            <div className="px-3 py-2 bg-muted/50 flex items-center justify-between sticky top-0">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {cat}
              </span>
              {selectedInCat > 0 && (
                <span className="text-xs bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 font-medium">
                  {selectedInCat}
                </span>
              )}
            </div>
            {servicios.map(servicio => (
              <ServiceRow
                key={servicio.id}
                servicio={servicio}
                checked={selected.includes(servicio.id)}
                onToggle={() => toggle(servicio.id)}
              />
            ))}
          </div>
        )
      })}
    </div>
  )
}

function ServiceRow({
  servicio,
  checked,
  onToggle,
}: {
  servicio: Servicio
  checked: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-full flex items-start gap-3 px-3 py-2.5 text-left transition-colors hover:bg-muted/40 ${
        checked ? 'bg-primary/5' : ''
      }`}
    >
      {/* Checkbox visual */}
      <div
        className={`flex-shrink-0 w-4 h-4 rounded border mt-0.5 flex items-center justify-center transition-colors ${
          checked
            ? 'bg-primary border-primary'
            : 'border-border bg-background'
        }`}
      >
        {checked && (
          <svg viewBox="0 0 10 8" className="w-2.5 h-2 fill-primary-foreground">
            <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-sm font-medium text-foreground">
            {servicio.nombre}
          </span>
          {servicio.extra_costs && (
            <span className="text-xs text-primary font-bold">*</span>
          )}
          {servicio.hour_rate && (
            <span className="text-xs bg-amber-100 text-amber-700 border border-amber-200 px-1.5 py-0 rounded-full font-medium">
              / hora
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
          {servicio.descripcion}
        </p>
      </div>

      {/* Price */}
      <div className="flex-shrink-0 text-right">
        {servicio.precio !== null ? (
          <span className="text-xs font-semibold text-foreground">
            {formatPrecio(servicio.precio)}
          </span>
        ) : (
          <span className="text-xs text-muted-foreground italic">Presupuestar</span>
        )}
        {servicio.periodicidad === 'mensual' && servicio.precio !== null && (
          <span className="text-xs text-muted-foreground block">/mes</span>
        )}
      </div>
    </button>
  )
}

// ── Cotizacion card ────────────────────────────────────────────────
function CotizacionCard({
  cotizacion,
  index,
  canDelete,
  onUpdate,
  onDelete,
}: {
  cotizacion: CotizacionItem
  index: number
  canDelete: boolean
  onUpdate: (c: CotizacionItem) => void
  onDelete: () => void
}) {
  return (
    <div className="border border-border rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-muted/30 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full flex-shrink-0">
            #{index + 1}
          </span>
          <Input
            value={cotizacion.nombre}
            onChange={e => onUpdate({ ...cotizacion, nombre: e.target.value })}
            className="h-8 text-sm font-medium border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Nombre de la propuesta..."
          />
        </div>
        {canDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Service selector */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Label className="text-xs text-muted-foreground">
            Servicios incluidos
          </Label>
          {cotizacion.serviciosIds.length > 0 && (
            <span className="text-xs text-muted-foreground">
              {cotizacion.serviciosIds.length} seleccionado
              {cotizacion.serviciosIds.length > 1 ? 's' : ''}
            </span>
          )}
        </div>
        <ServiceSelector
          selected={cotizacion.serviciosIds}
          onChange={ids => onUpdate({ ...cotizacion, serviciosIds: ids })}
        />
      </div>
    </div>
  )
}

// ── Main Editor ────────────────────────────────────────────────────
interface Props {
  initialData: CotizadorFormData
  onPreview: (data: CotizadorFormData) => void
  onLogout: () => void
}

export default function CotizadorEditor({ initialData, onPreview, onLogout }: Props) {
  const [data, setData] = useState<CotizadorFormData>(initialData)
  const [errors, setErrors] = useState<string[]>([])

  const fechaFin = data.fechaInicio ? addDays(data.fechaInicio, 15) : null

  // ── Form update helpers ──
  const set = (patch: Partial<CotizadorFormData>) =>
    setData(prev => ({ ...prev, ...patch }))

  const addCotizacion = () => {
    if (data.cotizaciones.length >= 3) return
    const labels = ['A', 'B', 'C']
    set({
      cotizaciones: [
        ...data.cotizaciones,
        {
          id: uid(),
          nombre: `Propuesta ${labels[data.cotizaciones.length]}`,
          serviciosIds: [],
        },
      ],
    })
  }

  const updateCotizacion = (id: string, updated: CotizacionItem) =>
    set({
      cotizaciones: data.cotizaciones.map(c => (c.id === id ? updated : c)),
    })

  const deleteCotizacion = (id: string) =>
    set({ cotizaciones: data.cotizaciones.filter(c => c.id !== id) })

  // ── Validation ──
  const validate = (): boolean => {
    const errs: string[] = []
    if (data.vendedorIdx === null) errs.push('Seleccioná un vendedor.')
    if (!data.clienteNombre.trim()) errs.push('Ingresá el nombre del cliente.')
    if (!data.tipoNegocio) errs.push('Seleccioná el tipo de negocio.')
    if (data.tipoNegocio === 'Otros' && !data.tipoNegocioOtro.trim())
      errs.push('Especificá el tipo de negocio.')
    if (!data.descripcionLocal.trim()) errs.push('Ingresá la descripción del local.')
    if (!data.fechaInicio) errs.push('Seleccioná la fecha de inicio.')
    if (data.cotizaciones.every(c => c.serviciosIds.length === 0))
      errs.push('Agregá al menos un servicio en alguna propuesta.')
    setErrors(errs)
    return errs.length === 0
  }

  const handlePreview = () => {
    if (validate()) onPreview(data)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/violetLogo.png" className="h-8 w-auto" alt="Logo" />
          <span className="font-bold text-sm bg-gradient-primary bg-clip-text text-transparent">
            Marketing KAI
          </span>
          <span className="text-muted-foreground text-sm hidden sm:inline">
            · Cotizador
          </span>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Salir</span>
        </button>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">

        {/* ── Vendedor ── */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Vendedor</h2>
          <div>
            <Label className="text-xs text-muted-foreground mb-1.5 block">
              ¿Quién realiza esta propuesta?
            </Label>
            <Select
              value={data.vendedorIdx !== null ? String(data.vendedorIdx) : ''}
              onValueChange={v => set({ vendedorIdx: Number(v) })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccioná un vendedor..." />
              </SelectTrigger>
              <SelectContent>
                {VENDEDORES.map((v, i) => (
                  <SelectItem key={i} value={String(i)}>
                    {v.nombre} — {v.telefono}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </section>

        <Separator />

        {/* ── Cliente ── */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-foreground">Datos del cliente</h2>

          <div className="space-y-1.5">
            <Label>Nombre / Razón social</Label>
            <Input
              value={data.clienteNombre}
              onChange={e => set({ clienteNombre: e.target.value })}
              placeholder="Ej: Inmobiliaria García"
            />
          </div>

          <div className="space-y-1.5">
            <Label>Tipo de negocio</Label>
            <Select
              value={data.tipoNegocio}
              onValueChange={v => set({ tipoNegocio: v, tipoNegocioOtro: '' })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccioná el rubro..." />
              </SelectTrigger>
              <SelectContent>
                {TIPOS_NEGOCIO.map(tipo => (
                  <SelectItem key={tipo} value={tipo}>
                    {tipo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {data.tipoNegocio === 'Otros' && (
              <Input
                value={data.tipoNegocioOtro}
                onChange={e => set({ tipoNegocioOtro: e.target.value })}
                placeholder="Especificá el tipo de negocio..."
                className="mt-2"
              />
            )}
          </div>

          <div className="space-y-1.5">
            <Label>Descripción del local / negocio</Label>
            <Textarea
              value={data.descripcionLocal}
              onChange={e => set({ descripcionLocal: e.target.value })}
              placeholder="Breve descripción del negocio, sus actividades principales, contexto relevante para la propuesta..."
              rows={4}
              className="resize-none"
            />
          </div>
        </section>

        <Separator />

        {/* ── Vigencia ── */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-foreground">Vigencia</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Fecha de inicio</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    {data.fechaInicio
                      ? format(data.fechaInicio, 'dd/MM/yyyy', { locale: es })
                      : <span className="text-muted-foreground">Seleccionar fecha...</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={data.fechaInicio ?? undefined}
                    onSelect={d => set({ fechaInicio: d ?? null })}
                    initialFocus
                    locale={es}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-1.5">
              <Label>Fecha de vencimiento</Label>
              <div className="h-10 px-3 flex items-center rounded-md border border-border bg-muted/40 text-sm text-muted-foreground">
                {fechaFin
                  ? format(fechaFin, 'dd/MM/yyyy', { locale: es })
                  : '—'}
                <span className="ml-auto text-xs">Auto (15 días)</span>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* ── Cotizaciones ── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">
              Propuestas{' '}
              <span className="text-muted-foreground font-normal">
                ({data.cotizaciones.length}/3)
              </span>
            </h2>
            {data.cotizaciones.length < 3 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addCotizacion}
                className="gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Agregar propuesta
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {data.cotizaciones.map((cot, i) => (
              <CotizacionCard
                key={cot.id}
                cotizacion={cot}
                index={i}
                canDelete={data.cotizaciones.length > 1}
                onUpdate={updated => updateCotizacion(cot.id, updated)}
                onDelete={() => deleteCotizacion(cot.id)}
              />
            ))}
          </div>

          <p className="text-xs text-muted-foreground">
            <span className="text-primary font-semibold">*</span> Los servicios marcados con asterisco tienen costos adicionales. Se detallan en las aclaraciones de la propuesta.
          </p>
        </section>

        {/* ── Errors ── */}
        {errors.length > 0 && (
          <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-4 space-y-1">
            {errors.map((e, i) => (
              <p key={i} className="text-sm text-destructive">
                · {e}
              </p>
            ))}
          </div>
        )}

        {/* ── Actions ── */}
        <div className="pb-8">
          <Button onClick={handlePreview} size="lg" className="w-full gap-2">
            <Eye className="w-4 h-4" />
            Ver propuesta
          </Button>
        </div>
      </div>
    </div>
  )
}