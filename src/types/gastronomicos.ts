export type BadgeType = 'vegetariano' | 'vegano' | 'sinTacc' | 'sinAzucar' | 'picante'

export const BADGE_CONFIG: Record<
  BadgeType,
  { label: string; color: string; bg: string; emoji: string }
> = {
  vegetariano: { label: 'Vegetariano', color: '#16a34a', bg: 'rgba(22,163,74,0.18)', emoji: '🥗' },
  vegano:      { label: 'Vegano',      color: '#15803d', bg: 'rgba(21,128,61,0.18)',  emoji: '🌱' },
  sinTacc:     { label: 'Sin TACC',    color: '#ca8a04', bg: 'rgba(202,138,4,0.18)', emoji: '🌾' },
  sinAzucar:   { label: 'Sin Azúcar',  color: '#0891b2', bg: 'rgba(8,145,178,0.18)', emoji: '💧' },
  picante:     { label: 'Picante',     color: '#dc2626', bg: 'rgba(220,38,38,0.18)', emoji: '🌶️' },
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  visible: boolean
  badges: BadgeType[]
  photo?: string
  pedidosYaLink?: string
}

export interface MenuCategory {
  id: string
  name: string
  items: MenuItem[]
}

export type LinkType = 'pedidosya' | 'carta' | 'instagram' | 'google' | 'web' | 'whatsapp'

export interface GastroLink {
  id: string
  type: LinkType
  label: string
  url: string
  active: boolean
}

export type HeaderPresetId = 'noche' | 'sabor' | 'campo'

export interface HeaderConfig {
  mode: 'preset' | 'banner'
  preset: HeaderPresetId
  bannerUrl?: string
  title: string
  subtitle: string
}

export interface RestaurantConfig {
  header: HeaderConfig
  pedidosYaGenericLink: string
  categories: MenuCategory[]
  links: GastroLink[]
}