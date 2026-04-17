import { useEffect, useState } from 'react'
import { getConfig } from '@/utils/gastronomicos-storage'
import { GastroLink, LinkType } from '@/types/gastronomicos'

// ── Per-platform config ───────────────────────────────────────────
// gradientStart is the solid color used for left side of the background gradient
const LINK_STYLE: Record<
  LinkType,
  { iconBg: string; emoji: string; gradientStart: string }
> = {
  pedidosya: {
    iconBg: '#FFCC00',
    emoji: '🛵',
    gradientStart: '#FFCC00',
  },
  carta: {
    iconBg: 'linear-gradient(135deg,#7c3aed,#a855f7)',
    emoji: '📋',
    gradientStart: '#7c3aed',
  },
  instagram: {
    iconBg: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',
    emoji: '📸',
    gradientStart: '#dc2743',
  },
  google: {
    iconBg: '#4285F4',
    emoji: '⭐',
    gradientStart: '#4285F4',
  },
  web: {
    iconBg: 'rgba(75,85,99,0.9)',
    emoji: '🌐',
    gradientStart: '#4b5563',
  },
  whatsapp: {
    iconBg: '#25D366',
    emoji: '💬',
    gradientStart: '#25D366',
  },
}

// Groups control ordering and section labels
const GROUPS: { label: string | null; types: LinkType[] }[] = [
  { label: null,             types: ['carta', 'google']       },
  { label: 'Pedidos online', types: ['pedidosya']              },
  { label: 'Redes sociales', types: ['instagram', 'whatsapp'] },
  { label: null,             types: ['web']                    },
]

// ── Link button ───────────────────────────────────────────────────
// The icon circle is 58 px tall; the button is 50 px → icon overflows 4 px each side.
function LinkBtn({ link }: { link: GastroLink }) {
  const cfg = LINK_STYLE[link.type]
  const isInternal = link.url.startsWith('/')

  const handleClick = () => {
    if (isInternal) window.location.href = link.url
    else window.open(link.url, '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center transition-all duration-200 hover:scale-[1.02] active:scale-95"
      style={{
        height: 52,
        paddingLeft: 8,
        paddingRight: 24,
        gap: 14,
        borderRadius: 18,
        // background: left is platform colour at ~22% opacity, fades to dark page bg
        background: `linear-gradient(to right, ${cfg.gradientStart}38 0%, #0f0a1e 62%)`,
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 2px 14px rgba(0,0,0,0.35)',
        overflow: 'visible',   // lets icon bleed outside the button box
        cursor: 'pointer',
        flexShrink: 0,
      }}
    >
      {/* Icon — 58 px, overflows the 52 px button by 3 px top & bottom */}
      <div
        className="flex-shrink-0 flex items-center justify-center rounded-full"
        style={{
          width: 58,
          height: 58,
          background: cfg.iconBg,
          fontSize: 26,
          boxShadow: '0 3px 12px rgba(0,0,0,0.4)',
          // pull it vertically so it bleeds out of the button bounds
          marginTop: -3,
          marginBottom: -3,
          zIndex: 1,
        }}
      >
        {cfg.emoji}
      </div>

      {/* Label */}
      <span
        className="flex-1 text-left font-semibold"
        style={{ color: '#f3f4f6', fontSize: 15 }}
      >
        {link.label}
      </span>
    </button>
  )
}

// ── Page ──────────────────────────────────────────────────────────
export default function GastroLinks() {
  const [links, setLinks] = useState<GastroLink[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      const config = getConfig()
      setLinks(config.links.filter((l) => l.active))
      setLoading(false)
    }, 380)
    return () => clearTimeout(t)
  }, [])

  const displayGroups = GROUPS.map((g) => ({
    ...g,
    links: g.types
      .map((type) => links.find((l) => l.type === type))
      .filter(Boolean) as GastroLink[],
  })).filter((g) => g.links.length > 0)

  return (
    <div
      className="min-h-screen flex flex-col items-center px-4 py-12"
      style={{
        background: 'linear-gradient(160deg,#080812 0%,#0f0a1e 60%,#0a1020 100%)',
      }}
    >
      <div className="w-full max-w-sm">
        {/* Profile header */}
        <div className="text-center mb-9">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4"
            style={{
              background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
              boxShadow: '0 0 48px rgba(124,58,237,0.4)',
            }}
          >
            🍽️
          </div>
          <h1 className="text-xl font-bold text-white mb-1">Comidas KAI</h1>
          <p className="text-sm" style={{ color: '#9ca3af' }}>
            📍 Mar del Plata, Buenos Aires
          </p>
        </div>

        {/* Link groups */}
        {loading ? (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-14 rounded-2xl animate-pulse"
                style={{ background: 'rgba(124,58,237,0.08)' }}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {displayGroups.map((group, gi) => (
              <div key={gi}>
                {group.label && (
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-2.5 px-1"
                    style={{ color: '#4b5563' }}
                  >
                    {group.label}
                  </p>
                )}
                <div className="flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <LinkBtn key={link.id} link={link} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div
          className="mt-10 pt-6 text-center"
          style={{ borderTop: '1px solid rgba(124,58,237,0.12)' }}
        >
          <a
            href="https://marketingkai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs transition-opacity hover:opacity-70"
            style={{ color: '#6b7280' }}
          >
            Hecho con ❤️ por{' '}
            <span style={{ color: '#a78bfa' }}>Marketing KAI</span>
          </a>
        </div>
      </div>
    </div>
  )
}