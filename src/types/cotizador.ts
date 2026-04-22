export type Periodicidad = 'pago_unico' | 'mensual' | 'presupuestar'

export interface Servicio {
  id: string
  nombre: string
  categoria: string
  descripcion: string
  precio: number | null
  periodicidad: Periodicidad
  hour_rate: boolean
  extra_costs: boolean
}

export interface Vendedor {
  nombre: string
  telefono: string
}

export interface CotizacionItem {
  id: string
  nombre: string
  serviciosIds: string[]
}

export interface CotizadorFormData {
  vendedorIdx: number | null
  clienteNombre: string
  tipoNegocio: string
  tipoNegocioOtro: string
  descripcionLocal: string
  fechaInicio: Date | null
  cotizaciones: CotizacionItem[]
}