export type BadgeType =
  | 'dificilAMano'
  | 'generaVentas'
  | 'permiteCrecer'
  | 'evitaPerdidas'
  | 'estrategiaCreativa'

export const BADGE_CONFIG: Record<
  BadgeType,
  { label: string; emoji: string; className: string }
> = {
  dificilAMano:       { label: 'Difícil a mano',      emoji: '🖐️', className: 'bg-orange-50 text-orange-700 border-orange-200' },
  generaVentas:       { label: 'Genera ventas',        emoji: '💵', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  permiteCrecer:      { label: 'Permite crecimiento',  emoji: '📈', className: 'bg-violet-50 text-violet-700 border-violet-200' },
  evitaPerdidas:      { label: 'Evita pérdidas',       emoji: '🛡️', className: 'bg-blue-50 text-blue-700 border-blue-200' },
  estrategiaCreativa: { label: 'Estrategia creativa',  emoji: '💡', className: 'bg-amber-50 text-amber-700 border-amber-200' },
}

export interface CasoBadge {
  type: BadgeType
  explanation: string
  star?: boolean
}

export interface CasoCard {
  id: string
  icon: string
  titulo: string
  descripcion: string
  badges: CasoBadge[]
}

export interface NegocioTab {
  id: string
  label: string
  icon: string
  casos: CasoCard[]
}

export interface HowItWorksStep {
  label: string
  description: string
}