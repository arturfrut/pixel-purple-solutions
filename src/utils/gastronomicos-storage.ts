import { RestaurantConfig } from '@/types/gastronomicos'
import { mockConfig } from '@/data/gastronomicos-mock'

const STORAGE_KEY = 'comidas-kai-config'

/** Migrate data saved with the old schema to the current shape */
function migrateConfig(raw: any): RestaurantConfig {
  const categories = (raw.categories ?? []).map((cat: any) => ({
    ...cat,
    items: (cat.items ?? []).map((item: any) => ({
      id: item.id,
      name: item.name ?? '',
      description: item.description ?? '',
      price: item.price ?? 0,
      // available → visible (old field name support)
      visible: item.visible !== undefined
        ? item.visible
        : item.available !== undefined
          ? item.available
          : true,
      badges: item.badges ?? [],
      photo: item.photo ?? undefined,
      pedidosYaLink: item.pedidosYaLink ?? undefined,
    })),
  }))

  // strip any legacy rappi links that may be stored
  const links = (raw.links ?? []).filter((l: any) => l.type !== 'rappi')

  return {
    header: raw.header ?? mockConfig.header,
    pedidosYaGenericLink:
      raw.pedidosYaGenericLink ?? mockConfig.pedidosYaGenericLink,
    categories,
    links,
  }
}

export const getConfig = (): RestaurantConfig => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return migrateConfig(JSON.parse(stored))
  } catch {
    // ignore parse errors
  }
  return mockConfig
}

export const saveConfig = (config: RestaurantConfig): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
  } catch {
    // ignore quota errors
  }
}

export const resetConfig = (): void => {
  localStorage.removeItem(STORAGE_KEY)
}