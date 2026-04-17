import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getConfig } from '@/utils/gastronomicos-storage'
import {
  MenuCategory,
  BadgeType,
  BADGE_CONFIG,
  HeaderConfig,
  HeaderPresetId,
} from '@/types/gastronomicos'
import { ArrowLeft, ExternalLink } from 'lucide-react'

function formatPrice(p: number) {
  return `$${p.toLocaleString('es-AR')}`
}

// ── Header presets ────────────────────────────────────────────────

function HeaderNoche({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        minHeight: 200,
        background: 'linear-gradient(160deg,#0f0921 0%,#1a0a2e 50%,#0d1218 100%)',
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/3 w-64 h-64 rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle,#7c3aed 0%,transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full blur-3xl opacity-15"
          style={{ background: 'radial-gradient(circle,#a855f7 0%,transparent 70%)' }}
        />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center py-14 px-6 text-center">
        <div className="text-4xl mb-3">🍽️</div>
        <h1
          className="text-3xl md:text-4xl font-bold text-white mb-2"
          style={{
            fontFamily: '"Playfair Display",Georgia,serif',
            textShadow: '0 0 40px rgba(168,85,247,0.3)',
          }}
        >
          {title}
        </h1>
        <p className="text-sm" style={{ color: '#c4b5fd' }}>{subtitle}</p>
      </div>
    </div>
  )
}

function HeaderSabor({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        minHeight: 200,
        background: 'linear-gradient(135deg,#111827 0%,#1f2937 100%)',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(124,58,237,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.07) 1px,transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center py-14 px-6 text-center">
        <div className="text-4xl mb-3">✨</div>
        <h1
          className="text-3xl md:text-4xl font-black text-white mb-3"
          style={{ letterSpacing: '-0.03em' }}
        >
          {title}
        </h1>
        <div className="flex items-center gap-3">
          <div
            className="h-px w-12"
            style={{ background: 'linear-gradient(90deg,transparent,#a855f7)' }}
          />
          <p className="text-xs uppercase tracking-widest" style={{ color: '#a78bfa' }}>
            {subtitle}
          </p>
          <div
            className="h-px w-12"
            style={{ background: 'linear-gradient(90deg,#a855f7,transparent)' }}
          />
        </div>
      </div>
    </div>
  )
}

function HeaderCampo({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        minHeight: 200,
        background: 'linear-gradient(160deg,#1c0f00 0%,#2d1a00 50%,#1a1000 100%)',
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl opacity-15"
          style={{ background: 'radial-gradient(circle,#f59e0b 0%,transparent 70%)' }}
        />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center py-14 px-6 text-center">
        <div className="text-4xl mb-3">🌿</div>
        <h1
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{
            fontFamily: '"Playfair Display",Georgia,serif',
            color: '#fde68a',
            textShadow: '0 0 30px rgba(245,158,11,0.2)',
          }}
        >
          {title}
        </h1>
        <p className="text-sm" style={{ color: '#d97706' }}>{subtitle}</p>
      </div>
    </div>
  )
}

const PRESET_MAP: Record<HeaderPresetId, React.FC<{ title: string; subtitle: string }>> = {
  noche: HeaderNoche,
  sabor: HeaderSabor,
  campo: HeaderCampo,
}

function CartaHeader({ config }: { config: HeaderConfig }) {
  if (config.mode === 'banner' && config.bannerUrl) {
    return (
      <div className="relative overflow-hidden" style={{ minHeight: 200 }}>
        <img
          src={config.bannerUrl}
          alt="Banner"
          className="w-full object-cover"
          style={{ minHeight: 200, maxHeight: 280 }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.75) 0%,transparent 60%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
          <h1
            className="text-3xl font-bold text-white"
            style={{ fontFamily: '"Playfair Display",Georgia,serif' }}
          >
            {config.title}
          </h1>
          <p className="text-sm mt-1" style={{ color: '#e5e7eb' }}>{config.subtitle}</p>
        </div>
      </div>
    )
  }
  const Preset = PRESET_MAP[config.preset] ?? HeaderNoche
  return <Preset title={config.title} subtitle={config.subtitle} />
}

// ── Page ──────────────────────────────────────────────────────────

// Fixed dimensions for item photos — same for every card
const PHOTO_SIZE = 96

export default function GastronomicasCarta() {
  const [categories, setCategories] = useState<MenuCategory[]>([])
  const [headerConfig, setHeaderConfig] = useState<HeaderConfig | null>(null)
  const [pedidosYaLink, setPedidosYaLink] = useState('')
  const [selectedCat, setSelectedCat] = useState('todos')
  const [activeBadge, setActiveBadge] = useState<BadgeType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      const cfg = getConfig()
      setCategories(cfg.categories)
      setHeaderConfig(cfg.header)
      setPedidosYaLink(cfg.pedidosYaGenericLink)
      setLoading(false)
    }, 300)
    return () => clearTimeout(t)
  }, [])

  // Badges present in at least one visible item
  const allVisible = categories.flatMap((c) => c.items.filter((i) => i.visible))
  const presentBadges = (Object.keys(BADGE_CONFIG) as BadgeType[]).filter((b) =>
    allVisible.some((i) => i.badges.includes(b))
  )

  // Filtered sections
  const displaySections = loading
    ? []
    : categories
        .filter((c) => selectedCat === 'todos' || c.id === selectedCat)
        .map((c) => ({
          ...c,
          items: c.items.filter(
            (i) =>
              i.visible &&
              (activeBadge === null || i.badges.includes(activeBadge))
          ),
        }))
        .filter((c) => c.items.length > 0)

  const showCategoryHeader = selectedCat === 'todos' || activeBadge !== null

  return (
    <div className="min-h-screen" style={{ background: '#080812' }}>
      {/* Visual header */}
      {!loading && headerConfig && <CartaHeader config={headerConfig} />}

      {/* PedidosYa CTA */}
      {!loading && pedidosYaLink && (
        <div className="px-4 pt-4 max-w-2xl mx-auto">
          <a href={pedidosYaLink} target="_blank" rel="noopener noreferrer">
            <button
              className="w-full h-12 rounded-2xl flex items-center justify-center gap-2 font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
              style={{
                background: '#FFCC00',
                color: '#1a1a00',
                boxShadow: '0 4px 20px rgba(255,204,0,0.25)',
              }}
            >
              <span className="text-lg">🛵</span>
              Pedir por Pedidos Ya
              <ExternalLink className="h-4 w-4 opacity-50" />
            </button>
          </a>
        </div>
      )}

      {/* Sticky navigation */}
      {!loading && (
        <div
          className="sticky top-0 z-20 pt-3 pb-1 px-4"
          style={{
            background: 'rgba(8,8,18,0.94)',
            backdropFilter: 'blur(14px)',
            borderBottom: '1px solid rgba(124,58,237,0.12)',
          }}
        >
          {/* Back + title */}
          <div className="max-w-2xl mx-auto flex items-center gap-3 mb-3">
            <Link to="/gastronomicos">
              <button className="p-1.5 rounded-lg" style={{ color: '#a78bfa' }}>
                <ArrowLeft className="h-5 w-5" />
              </button>
            </Link>
            <span className="text-white font-semibold text-sm">Nuestra Carta</span>
          </div>

          {/* Category tabs */}
          <div className="max-w-2xl mx-auto flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[{ id: 'todos', name: 'Todos' }, ...categories].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className="flex-shrink-0 px-4 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200"
                style={
                  selectedCat === cat.id
                    ? {
                        background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
                        color: '#fff',
                        boxShadow: '0 4px 14px rgba(124,58,237,0.4)',
                      }
                    : {
                        background: 'rgba(124,58,237,0.1)',
                        color: '#c4b5fd',
                        border: '1px solid rgba(124,58,237,0.2)',
                      }
                }
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Badge filters */}
          {presentBadges.length > 0 && (
            <div className="max-w-2xl mx-auto flex gap-2 overflow-x-auto pb-2 mt-1.5 scrollbar-none">
              {presentBadges.map((badge) => {
                const cfg = BADGE_CONFIG[badge]
                const active = activeBadge === badge
                return (
                  <button
                    key={badge}
                    onClick={() => setActiveBadge(active ? null : badge)}
                    className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium transition-all duration-200"
                    style={
                      active
                        ? { background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}` }
                        : {
                            background: 'rgba(55,65,81,0.45)',
                            color: '#9ca3af',
                            border: '1px solid rgba(75,85,99,0.3)',
                          }
                    }
                  >
                    <span>{cfg.emoji}</span>
                    {cfg.label}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Items */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-28 rounded-2xl animate-pulse"
                style={{ background: 'rgba(124,58,237,0.08)' }}
              />
            ))}
          </div>
        ) : displaySections.length === 0 ? (
          <div className="text-center py-20" style={{ color: '#6b7280' }}>
            No hay ítems para mostrar.
          </div>
        ) : (
          <div className="space-y-8">
            {displaySections.map((section) => (
              <div key={section.id}>
                {showCategoryHeader && (
                  <h2
                    className="text-xl font-bold text-white mb-4"
                    style={{ fontFamily: '"Playfair Display",Georgia,serif' }}
                  >
                    {section.name}
                  </h2>
                )}
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 p-4 rounded-2xl"
                      style={{
                        background: 'rgba(124,58,237,0.07)',
                        border: '1px solid rgba(124,58,237,0.15)',
                        // align-items: stretch so text column fills card height
                        alignItems: 'stretch',
                      }}
                    >
                      {/*
                       * Text column
                       * Uses flex-col so a flex-1 spacer can push
                       * price + badges to the very bottom.
                       */}
                      <div className="flex-1 flex flex-col min-w-0">
                        {/* Top: name + description */}
                        <h3 className="font-semibold text-white leading-snug mb-1">
                          {item.name}
                        </h3>
                        {item.description && (
                          <p
                            className="text-sm leading-relaxed"
                            style={{ color: '#9ca3af' }}
                          >
                            {item.description}
                          </p>
                        )}

                        {/* Spacer — pushes price + badges to bottom */}
                        <div style={{ flex: 1, minHeight: 8 }} />

                        {/* Bottom: price then badges */}
                        <span
                          className="text-base font-bold"
                          style={{ color: '#a78bfa' }}
                        >
                          {formatPrice(item.price)}
                        </span>

                        {item.badges.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {item.badges.map((badge) => {
                              const bcfg = BADGE_CONFIG[badge]
                              return (
                                <span
                                  key={badge}
                                  className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium"
                                  style={{
                                    background: bcfg.bg,
                                    color: bcfg.color,
                                    border: `1px solid ${bcfg.color}40`,
                                  }}
                                >
                                  {bcfg.emoji} {bcfg.label}
                                </span>
                              )
                            })}
                          </div>
                        )}
                      </div>

                      {/*
                       * Photo — fixed PHOTO_SIZE × PHOTO_SIZE.
                       * align-self: flex-start keeps it anchored to the
                       * top of the card regardless of card height.
                       */}
                      {item.photo && (
                        <img
                          src={item.photo}
                          alt={item.name}
                          style={{
                            width: PHOTO_SIZE,
                            height: PHOTO_SIZE,
                            flexShrink: 0,
                            objectFit: 'cover',
                            borderRadius: 12,
                            alignSelf: 'flex-start',
                            border: '1px solid rgba(124,58,237,0.2)',
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        className="py-8 text-center text-xs"
        style={{
          color: '#4b5563',
          borderTop: '1px solid rgba(124,58,237,0.1)',
        }}
      >
        Precios en pesos argentinos · Carta sujeta a disponibilidad
        <br />
        <span style={{ color: '#6b7280' }}>Hecho con ❤️ por </span>
        <a
          href="https://marketingkai.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium transition-opacity hover:opacity-80"
          style={{ color: '#a78bfa' }}
        >
          Marketing KAI
        </a>
      </footer>
    </div>
  )
}