import { Servicio, Vendedor } from '@/types/cotizador'

export const VENDEDORES: Vendedor[] = [
  { nombre: 'Patricio Lazarte',  telefono: '2236869958' },
  { nombre: 'Safiro Manso',      telefono: '2236517499' },
  { nombre: 'Valeria Martinez',  telefono: '1168035323' },
  { nombre: 'Tobias',            telefono: '2262361860' },
  { nombre: 'Melanie Salinas',   telefono: '2236634786' },
  { nombre: 'Artur Fruttero',    telefono: '2236028317' },
  { nombre: 'Christian',         telefono: '1138528058' },
  { nombre: 'Diego Sanchez',     telefono: '2284522717' },
]

export const TIPOS_NEGOCIO = [
  'Inmobiliaria',
  'Concesionaria / Venta de autos',
  'Librería',
  'Taller / GNC',
  'Restaurante / Gastronomía',
  'Bar / Café',
  'Comercio minorista',
  'Salud / Clínica / Consultorio',
  'Turismo / Hotelería / Alojamiento',
  'Educación / Academia / Instituto',
  'Servicios profesionales',
  'E-commerce / Tienda online',
  'Emprendimiento personal',
  'Construcción / Arquitectura',
  'Moda / Indumentaria',
  'Tecnología / Software',
  'Belleza / Estética / Peluquería',
  'Fitness / Gym / Bienestar',
  'Eventos / Fotografía / Producción',
  'ONG / Institución sin fines de lucro',
  'Otros',
]

// ── Orden de categorías en el selector ──────────────────────────
export const CATEGORIA_ORDER = [
  'Consultoría',
  'Desarrollo web',
  'Ecommerce',
  'Automatizaciones',
  'Redes y contenido',
  'Diseño',
]

// ── Servicios seleccionables (Consultoría Free es la card fija) ──
export const SERVICIOS: Servicio[] = [
  {
    id: 'consultoria-paga',
    nombre: 'Consultoría Paga',
    categoria: 'Consultoría',
    descripcion: 'Sesión de 1 hora para ordenar y optimizar la presencia digital.',
    precio: 80000,
    periodicidad: 'pago_unico',
    hour_rate: false,
    extra_costs: false,
  },
  {
    id: 'web-institucional',
    nombre: 'Página web institucional',
    categoria: 'Desarrollo web',
    descripcion: 'Sitio web básico con secciones principales y hasta 3 revisiones.',
    precio: 350000,
    periodicidad: 'pago_unico',
    hour_rate: false,
    extra_costs: true, // no incluye hosting ni dominio
  },
  {
    id: 'digital-medida',
    nombre: 'Soluciones digitales a medida',
    categoria: 'Desarrollo web',
    descripcion: 'Desarrollo de herramientas o aplicaciones personalizadas.',
    precio: 500000,
    periodicidad: 'pago_unico',
    hour_rate: false,
    extra_costs: true, // costos de servidor adicionales
  },
  {
    id: 'crm-sistemas',
    nombre: 'Proyectos digitales (CRM / sistemas)',
    categoria: 'Desarrollo web',
    descripcion: 'Desarrollo de sistemas complejos según necesidad.',
    precio: null,
    periodicidad: 'presupuestar',
    hour_rate: false,
    extra_costs: false,
  },
  {
    id: 'ecommerce-config',
    nombre: 'Ecommerce — Configuración inicial',
    categoria: 'Ecommerce',
    descripcion: 'Creación y configuración de tienda online lista para vender.',
    precio: 500000,
    periodicidad: 'pago_unico',
    hour_rate: false,
    extra_costs: true, // no incluye plataforma
  },
  {
    id: 'ecommerce-fotos',
    nombre: 'Ecommerce — Fotografía de productos',
    categoria: 'Ecommerce',
    descripcion: 'Sesión de fotos para productos.',
    precio: 70000,
    periodicidad: 'pago_unico',
    hour_rate: true,
    extra_costs: false,
  },
  {
    id: 'ecommerce-carga',
    nombre: 'Ecommerce — Carga de productos',
    categoria: 'Ecommerce',
    descripcion: 'Carga y configuración de productos en tienda online.',
    precio: 50000,
    periodicidad: 'pago_unico',
    hour_rate: true,
    extra_costs: false,
  },
  {
    id: 'ecommerce-mantenimiento',
    nombre: 'Ecommerce — Mantenimiento mensual',
    categoria: 'Ecommerce',
    descripcion: 'Soporte y mantenimiento técnico de la tienda.',
    precio: 100000,
    periodicidad: 'mensual',
    hour_rate: false,
    extra_costs: false,
  },
  {
    id: 'auto-primera',
    nombre: 'Primera automatización',
    categoria: 'Automatizaciones',
    descripcion: 'Implementación inicial de automatización de procesos.',
    precio: 500000,
    periodicidad: 'pago_unico',
    hour_rate: false,
    extra_costs: true, // costo mensual de servidor adicional
  },
  {
    id: 'auto-modulos',
    nombre: 'Módulos de automatización adicionales',
    categoria: 'Automatizaciones',
    descripcion: 'Ampliación de automatizaciones existentes.',
    precio: 200000,
    periodicidad: 'pago_unico',
    hour_rate: false,
    extra_costs: true, // costo mensual de servidor adicional
  },
  {
    id: 'contenido-pack1',
    nombre: 'Contenido — Paquete 1',
    categoria: 'Redes y contenido',
    descripcion: '8 reels o carruseles + 10 historias.',
    precio: 600000,
    periodicidad: 'mensual',
    hour_rate: false,
    extra_costs: true, // +$100k si aparece en cámara
  },
  {
    id: 'contenido-pack2',
    nombre: 'Contenido — Paquete 2',
    categoria: 'Redes y contenido',
    descripcion: '10 reels o carruseles + 12 historias.',
    precio: 700000,
    periodicidad: 'mensual',
    hour_rate: false,
    extra_costs: true,
  },
  {
    id: 'contenido-pack3',
    nombre: 'Contenido — Paquete 3',
    categoria: 'Redes y contenido',
    descripcion: '12 reels o carruseles + 14 historias.',
    precio: 800000,
    periodicidad: 'mensual',
    hour_rate: false,
    extra_costs: true,
  },
  {
    id: 'reel-estrategico',
    nombre: 'Reel completo estratégico',
    categoria: 'Redes y contenido',
    descripcion: 'Producción completa de reel con enfoque estratégico.',
    precio: 70000,
    periodicidad: 'pago_unico',
    hour_rate: false,
    extra_costs: true,
  },
  {
    id: 'manual-marca',
    nombre: 'Manual de marca',
    categoria: 'Diseño',
    descripcion: 'Desarrollo de identidad visual y lineamientos de marca.',
    precio: 120000,
    periodicidad: 'pago_unico',
    hour_rate: false,
    extra_costs: false,
  },
]

// ── Helper: aclaraciones dinámicas según servicios seleccionados ──
export function getAclaraciones(serviciosSeleccionados: Servicio[]): string[] {
  const aclaraciones: string[] = []
  const ids = new Set(serviciosSeleccionados.map(s => s.id))
  const cats = new Set(serviciosSeleccionados.map(s => s.categoria))

  if (ids.has('consultoria-paga')) {
    aclaraciones.push(
      'Para obtener resultados medibles recomendamos contratar un mínimo de 3 sesiones de consultoría. Con una sola sesión es difícil lograr seguimiento y mejoras sostenidas en el tiempo.'
    )
  }
  if (cats.has('Automatizaciones')) {
    aclaraciones.push(
      'Los servicios de automatización tienen un costo mensual adicional por mantenimiento del servidor de la automatización, a definir según la complejidad de cada implementación.'
    )
  }
  if (cats.has('Redes y contenido')) {
    aclaraciones.push(
      'Los paquetes de producción de contenido tienen un cargo adicional de $100.000 ARS por mes en caso de que el cliente o sus representantes aparezcan en cámara.'
    )
  }
  if (ids.has('web-institucional') || ids.has('digital-medida')) {
    aclaraciones.push(
      'El desarrollo de sitio web no incluye hosting ni nombre de dominio. Estos costos son independientes y varían según el proveedor elegido por el cliente.'
    )
  }
  if (cats.has('Ecommerce')) {
    aclaraciones.push(
      'Los servicios de ecommerce no incluyen el costo de la plataforma (Empretienda, Tienda Nube u otras). Dicho costo es abonado directamente por el cliente a la plataforma.'
    )
  }
  if (serviciosSeleccionados.some(s => s.hour_rate)) {
    aclaraciones.push(
      'Los servicios con indicación "precio por hora" se facturan según las horas efectivamente trabajadas. El precio indicado es el valor base por hora.'
    )
  }

  // Siempre presentes
  aclaraciones.push(
    'Los costos de mantenimiento de servidores no están incluidos en el precio, como tampoco lo que se invierta en publicidad paga, ni en compra de dominios y hosting.'
  )
  aclaraciones.push(
    'Esta herramienta es un cotizador de referencia rápida y no constituye un presupuesto oficial. El precio final se define en el presupuesto y contrato formal.'
  )

  return aclaraciones
}

export function formatPrecio(precio: number): string {
  return `$ ${precio.toLocaleString('es-AR')}`
}