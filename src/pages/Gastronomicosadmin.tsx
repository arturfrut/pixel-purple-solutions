import { useState } from 'react'
import {
  getConfig,
  saveConfig,
  resetConfig,
} from '@/utils/gastronomicos-storage'
import {
  RestaurantConfig,
  MenuCategory,
  MenuItem,
  GastroLink,
  LinkType,
  BadgeType,
  BADGE_CONFIG,
  HeaderConfig,
  HeaderPresetId,
} from '@/types/gastronomicos'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
  LogOut,
  Plus,
  Trash2,
  Save,
  QrCode,
  Printer,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Lock,
} from 'lucide-react'

// ── Auth mock ─────────────────────────────────────────────────────
const MOCK_USER = 'admin'
const MOCK_PASS = 'kai2024'

// ── Link meta ─────────────────────────────────────────────────────
const LINK_META: Record<LinkType, { emoji: string; name: string }> = {
  pedidosya: { emoji: '🛵', name: 'Pedidos Ya' },
  carta:     { emoji: '📋', name: 'Ver Carta' },
  instagram: { emoji: '📸', name: 'Instagram' },
  google:    { emoji: '⭐', name: 'Calificanos en Google' },
  web:       { emoji: '🌐', name: 'Sitio Web' },
  whatsapp:  { emoji: '💬', name: 'WhatsApp' },
}

// ── Header preset config ──────────────────────────────────────────
const PRESETS: { id: HeaderPresetId; label: string; emoji: string; bg: string }[] = [
  {
    id: 'noche',
    label: 'Noche Porteña',
    emoji: '🌙',
    bg: 'linear-gradient(135deg,#0f0921,#1a0a2e)',
  },
  {
    id: 'sabor',
    label: 'Sabor Urbano',
    emoji: '✨',
    bg: 'linear-gradient(135deg,#111827,#1f2937)',
  },
  {
    id: 'campo',
    label: 'Casa de Campo',
    emoji: '🌿',
    bg: 'linear-gradient(135deg,#1c0f00,#2d1a00)',
  },
]

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

// ── Input style helper ────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  background: 'rgba(0,0,0,0.3)',
  border: '1px solid rgba(124,58,237,0.2)',
  color: '#f3f4f6',
}
const inputStyleSm: React.CSSProperties = { ...inputStyle, fontSize: 12 }

// ── Header config editor ──────────────────────────────────────────
function HeaderConfigEditor({
  config,
  onChange,
}: {
  config: HeaderConfig
  onChange: (h: HeaderConfig) => void
}) {
  const handleBanner = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (evt) =>
      onChange({ ...config, mode: 'banner', bannerUrl: evt.target?.result as string })
    reader.readAsDataURL(file)
  }

  return (
    <div
      className="rounded-2xl p-5 mb-5"
      style={{ background: 'rgba(124,58,237,0.07)', border: '1px solid rgba(124,58,237,0.18)' }}
    >
      <p className="text-sm font-semibold text-white mb-4">🖼️ Apariencia del header</p>

      {/* Preset grid + banner option */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {PRESETS.map((p) => {
          const active = config.mode === 'preset' && config.preset === p.id
          return (
            <button
              key={p.id}
              onClick={() => onChange({ ...config, mode: 'preset', preset: p.id })}
              className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all"
              style={
                active
                  ? { background: 'rgba(124,58,237,0.25)', border: '2px solid #a855f7' }
                  : { background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(124,58,237,0.15)' }
              }
            >
              <div
                className="w-full h-9 rounded-lg flex items-center justify-center text-lg"
                style={{ background: p.bg }}
              >
                {p.emoji}
              </div>
              <span className="text-xs text-white text-center leading-tight">{p.label}</span>
            </button>
          )
        })}

        {/* Banner */}
        <label
          className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all cursor-pointer"
          style={
            config.mode === 'banner'
              ? { background: 'rgba(124,58,237,0.25)', border: '2px solid #a855f7' }
              : { background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(124,58,237,0.15)' }
          }
        >
          <div
            className="w-full h-9 rounded-lg overflow-hidden flex items-center justify-center"
            style={
              config.mode === 'banner' && config.bannerUrl
                ? {}
                : { border: '1px dashed rgba(124,58,237,0.3)' }
            }
          >
            {config.mode === 'banner' && config.bannerUrl ? (
              <img src={config.bannerUrl} className="w-full h-full object-cover" />
            ) : (
              <span className="text-lg">🖼️</span>
            )}
          </div>
          <span className="text-xs text-white text-center leading-tight">Banner propio</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleBanner} />
        </label>
      </div>

      {/* Title + Subtitle */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <p className="text-xs mb-1" style={{ color: '#9ca3af' }}>Título</p>
          <Input
            value={config.title}
            onChange={(e) => onChange({ ...config, title: e.target.value })}
            className="h-8 text-sm"
            style={inputStyle}
          />
        </div>
        <div>
          <p className="text-xs mb-1" style={{ color: '#9ca3af' }}>Subtítulo</p>
          <Input
            value={config.subtitle}
            onChange={(e) => onChange({ ...config, subtitle: e.target.value })}
            className="h-8 text-sm"
            style={inputStyle}
          />
        </div>
      </div>
    </div>
  )
}

// ── Category card ─────────────────────────────────────────────────
function CategoryCard({
  category,
  onUpdate,
  onDelete,
}: {
  category: MenuCategory
  onUpdate: (c: MenuCategory) => void
  onDelete: () => void
}) {
  const [expanded, setExpanded] = useState(true)
  const [newItemName, setNewItemName] = useState('')
  const [catName, setCatName] = useState(category.name)
  const [editingCat, setEditingCat] = useState(false)

  const updateItem = (id: string, patch: Partial<MenuItem>) =>
    onUpdate({
      ...category,
      items: category.items.map((i) => (i.id === id ? { ...i, ...patch } : i)),
    })

  const deleteItem = (id: string) =>
    onUpdate({ ...category, items: category.items.filter((i) => i.id !== id) })

  const toggleBadge = (itemId: string, badge: BadgeType) => {
    const item = category.items.find((i) => i.id === itemId)
    if (!item) return
    const badges = item.badges.includes(badge)
      ? item.badges.filter((b) => b !== badge)
      : [...item.badges, badge]
    updateItem(itemId, { badges })
  }

  const handlePhotoUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    itemId: string
  ) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (evt) =>
      updateItem(itemId, { photo: evt.target?.result as string })
    reader.readAsDataURL(file)
  }

  const addItem = () => {
    if (!newItemName.trim()) return
    const newItem: MenuItem = {
      id: uid(),
      name: newItemName.trim(),
      description: '',
      price: 0,
      visible: true,
      badges: [],
    }
    onUpdate({ ...category, items: [...category.items, newItem] })
    setNewItemName('')
  }

  return (
    <div
      className="rounded-2xl overflow-hidden mb-4"
      style={{
        background: 'rgba(124,58,237,0.07)',
        border: '1px solid rgba(124,58,237,0.18)',
      }}
    >
      {/* Category header */}
      <div className="flex items-center gap-3 px-5 py-4">
        {editingCat ? (
          <div className="flex items-center gap-2 flex-1">
            <Input
              value={catName}
              onChange={(e) => setCatName(e.target.value)}
              className="h-8 text-sm"
              style={inputStyle}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onUpdate({ ...category, name: catName })
                  setEditingCat(false)
                }
              }}
              autoFocus
            />
            <Button
              size="sm"
              onClick={() => {
                onUpdate({ ...category, name: catName })
                setEditingCat(false)
              }}
              style={{ background: '#7c3aed', color: '#fff' }}
            >
              OK
            </Button>
          </div>
        ) : (
          <button
            className="flex-1 text-left font-semibold text-white hover:text-purple-300 transition-colors"
            onClick={() => setEditingCat(true)}
            title="Clic para editar nombre"
          >
            {category.name}
            <span className="ml-2 text-xs font-normal" style={{ color: '#6b7280' }}>
              ({category.items.length})
            </span>
          </button>
        )}
        <button onClick={() => setExpanded(!expanded)} style={{ color: '#a78bfa' }}>
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        <button
          onClick={onDelete}
          style={{ color: '#6b7280' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#f87171')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7280')}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Items */}
      {expanded && (
        <div className="px-4 pb-5">
          {category.items.length === 0 ? (
            <p className="text-sm mb-4" style={{ color: '#6b7280' }}>
              Sin ítems. Agregá uno abajo.
            </p>
          ) : (
            <div className="space-y-3 mb-4">
              {category.items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl p-4"
                  style={{
                    background: 'rgba(0,0,0,0.25)',
                    border: '1px solid rgba(124,58,237,0.12)',
                  }}
                >
                  {/* Row 1: Name · Price · Visible · Delete */}
                  <div className="grid grid-cols-[1fr_auto_auto_auto] gap-2 items-center mb-2">
                    <Input
                      value={item.name}
                      onChange={(e) => updateItem(item.id, { name: e.target.value })}
                      placeholder="Nombre"
                      className="h-8 text-sm"
                      style={inputStyle}
                    />
                    <div className="relative flex items-center">
                      <span className="absolute left-2 text-sm" style={{ color: '#9ca3af' }}>
                        $
                      </span>
                      <Input
                        type="number"
                        value={item.price}
                        onChange={(e) =>
                          updateItem(item.id, { price: Number(e.target.value) })
                        }
                        className="h-8 text-sm pl-5 w-24"
                        style={inputStyle}
                      />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Switch
                        checked={item.visible}
                        onCheckedChange={(v) => updateItem(item.id, { visible: v })}
                      />
                      <span
                        className="text-xs w-12"
                        style={{ color: item.visible ? '#86efac' : '#9ca3af' }}
                      >
                        {item.visible ? 'Visible' : 'Oculto'}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteItem(item.id)}
                      style={{ color: '#6b7280' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#f87171')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7280')}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Row 2: Description */}
                  <Input
                    value={item.description}
                    onChange={(e) =>
                      updateItem(item.id, { description: e.target.value })
                    }
                    placeholder="Descripción (opcional)"
                    className="h-8 text-sm mb-2"
                    style={inputStyle}
                  />

                  {/* Row 3: Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {(Object.keys(BADGE_CONFIG) as BadgeType[]).map((badge) => {
                      const bcfg = BADGE_CONFIG[badge]
                      const active = item.badges.includes(badge)
                      return (
                        <button
                          key={badge}
                          onClick={() => toggleBadge(item.id, badge)}
                          className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-all"
                          style={
                            active
                              ? {
                                  background: bcfg.bg,
                                  color: bcfg.color,
                                  border: `1px solid ${bcfg.color}`,
                                }
                              : {
                                  background: 'rgba(55,65,81,0.4)',
                                  color: '#6b7280',
                                  border: '1px solid rgba(75,85,99,0.3)',
                                }
                          }
                        >
                          {bcfg.emoji} {bcfg.label}
                        </button>
                      )
                    })}
                  </div>

                  {/* Row 4: Photo */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs flex-shrink-0" style={{ color: '#6b7280' }}>
                      📷
                    </span>
                    <Input
                      value={item.photo ?? ''}
                      onChange={(e) =>
                        updateItem(item.id, {
                          photo: e.target.value || undefined,
                        })
                      }
                      placeholder="URL de imagen..."
                      className="h-7 text-xs flex-1"
                      style={inputStyleSm}
                    />
                    <label
                      className="cursor-pointer px-2 py-1 rounded-lg text-xs flex-shrink-0 transition-colors"
                      style={{
                        background: 'rgba(124,58,237,0.2)',
                        color: '#c4b5fd',
                        border: '1px solid rgba(124,58,237,0.3)',
                      }}
                    >
                      Subir
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handlePhotoUpload(e, item.id)}
                      />
                    </label>
                    {item.photo && (
                      <img
                        src={item.photo}
                        alt=""
                        className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                        style={{ border: '1px solid rgba(124,58,237,0.3)' }}
                      />
                    )}
                  </div>

                  {/* Row 5: PedidosYa link */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs flex-shrink-0" style={{ color: '#6b7280' }}>
                      🛵
                    </span>
                    <Input
                      value={item.pedidosYaLink ?? ''}
                      onChange={(e) =>
                        updateItem(item.id, {
                          pedidosYaLink: e.target.value || undefined,
                        })
                      }
                      placeholder="Link Pedidos Ya (opcional, si no usa el general)"
                      className="h-7 text-xs"
                      style={inputStyleSm}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add item */}
          <div className="flex gap-2">
            <Input
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Nombre del nuevo ítem..."
              className="h-9 text-sm flex-1"
              style={inputStyle}
              onKeyDown={(e) => e.key === 'Enter' && addItem()}
            />
            <Button
              size="sm"
              onClick={addItem}
              disabled={!newItemName.trim()}
              className="h-9"
              style={{
                background: 'rgba(124,58,237,0.25)',
                color: '#c4b5fd',
                border: '1px solid rgba(124,58,237,0.4)',
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Tab Carta ─────────────────────────────────────────────────────
function TabCarta({
  config,
  onChange,
}: {
  config: RestaurantConfig
  onChange: (c: RestaurantConfig) => void
}) {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    saveConfig(config)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-white">Gestión de Carta</h2>
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() =>
              onChange({
                ...config,
                categories: [
                  ...config.categories,
                  { id: uid(), name: 'Nueva categoría', items: [] },
                ],
              })
            }
            style={{
              background: 'rgba(124,58,237,0.2)',
              color: '#c4b5fd',
              border: '1px solid rgba(124,58,237,0.35)',
            }}
          >
            <Plus className="h-4 w-4 mr-1" />
            Categoría
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            style={{
              background: saved
                ? '#16a34a'
                : 'linear-gradient(135deg,#7c3aed,#a855f7)',
              color: '#fff',
            }}
          >
            <Save className="h-4 w-4 mr-1" />
            {saved ? '¡Guardado!' : 'Guardar'}
          </Button>
        </div>
      </div>

      {/* PedidosYa generic link */}
      <div
        className="rounded-2xl p-4 mb-4"
        style={{
          background: 'rgba(255,204,0,0.06)',
          border: '1px solid rgba(255,204,0,0.2)',
        }}
      >
        <p className="text-xs mb-1.5" style={{ color: '#9ca3af' }}>
          🛵 Link general de Pedidos Ya (se usa en todos los ítems sin link propio)
        </p>
        <Input
          value={config.pedidosYaGenericLink}
          onChange={(e) =>
            onChange({ ...config, pedidosYaGenericLink: e.target.value })
          }
          placeholder="https://www.pedidosya.com.ar/..."
          className="h-9 text-sm"
          style={inputStyle}
        />
      </div>

      {/* Header config */}
      <HeaderConfigEditor
        config={config.header}
        onChange={(header) => onChange({ ...config, header })}
      />

      {/* Categories */}
      {config.categories.length === 0 ? (
        <div
          className="rounded-2xl p-12 text-center"
          style={{
            background: 'rgba(124,58,237,0.05)',
            border: '1px dashed rgba(124,58,237,0.25)',
          }}
        >
          <p style={{ color: '#6b7280' }}>No hay categorías. Agregá una para empezar.</p>
        </div>
      ) : (
        config.categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            onUpdate={(updated) =>
              onChange({
                ...config,
                categories: config.categories.map((c) =>
                  c.id === cat.id ? updated : c
                ),
              })
            }
            onDelete={() =>
              onChange({
                ...config,
                categories: config.categories.filter((c) => c.id !== cat.id),
              })
            }
          />
        ))
      )}
    </div>
  )
}

// ── Tab Links ─────────────────────────────────────────────────────
function TabLinks({
  config,
  onChange,
}: {
  config: RestaurantConfig
  onChange: (c: RestaurantConfig) => void
}) {
  const [saved, setSaved] = useState(false)

  const updateLink = (id: string, patch: Partial<GastroLink>) =>
    onChange({
      ...config,
      links: config.links.map((l) => (l.id === id ? { ...l, ...patch } : l)),
    })

  const handleSave = () => {
    saveConfig(config)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-white">Gestión de Links</h2>
        <Button
          size="sm"
          onClick={handleSave}
          style={{
            background: saved
              ? '#16a34a'
              : 'linear-gradient(135deg,#7c3aed,#a855f7)',
            color: '#fff',
          }}
        >
          <Save className="h-4 w-4 mr-1" />
          {saved ? '¡Guardado!' : 'Guardar cambios'}
        </Button>
      </div>

      <div className="space-y-3">
        {config.links.map((link) => {
          const meta = LINK_META[link.type]
          return (
            <div
              key={link.id}
              className="rounded-2xl p-4"
              style={{
                background: link.active
                  ? 'rgba(124,58,237,0.08)'
                  : 'rgba(30,30,40,0.5)',
                border: link.active
                  ? '1px solid rgba(124,58,237,0.2)'
                  : '1px solid rgba(75,85,99,0.2)',
                opacity: link.active ? 1 : 0.55,
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl w-7 text-center flex-shrink-0">{meta.emoji}</span>
                <span
                  className="font-medium text-white flex-shrink-0"
                  style={{ minWidth: 160 }}
                >
                  {meta.name}
                </span>
                <Input
                  value={link.url}
                  onChange={(e) => updateLink(link.id, { url: e.target.value })}
                  className="flex-1 h-8 text-sm"
                  style={inputStyle}
                  placeholder="URL del link"
                />
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Switch
                    checked={link.active}
                    onCheckedChange={(v) => updateLink(link.id, { active: v })}
                  />
                  <span
                    className="text-xs w-14"
                    style={{ color: link.active ? '#86efac' : '#9ca3af' }}
                  >
                    {link.active ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-xs mt-4" style={{ color: '#6b7280' }}>
        Los links desactivados no aparecen en GastroLinks.
      </p>
    </div>
  )
}

// ── Tab QR ────────────────────────────────────────────────────────
function TabQR() {
  const gastroLinksUrl = `${window.location.origin}/gastronomicos/gastrolinks`
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=16&color=000000&bgcolor=ffffff&data=${encodeURIComponent(
    gastroLinksUrl
  )}`

  const handlePrint = () => {
    const win = window.open('', '_blank')
    if (!win) return
    win.document.write(`
      <html><head><title>QR Comidas KAI</title>
        <style>body{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;margin:0;font-family:sans-serif;background:#fff;}
        img{width:240px;height:240px;} h2{font-size:22px;margin-bottom:4px;} p{color:#555;font-size:13px;}</style>
      </head><body>
        <h2>Comidas KAI</h2>
        <p>Escaneá para ver nuestros links</p>
        <img src="${qrUrl}" />
        <p style="margin-top:12px;font-size:11px;color:#999">${gastroLinksUrl}</p>
        <script>window.onload=()=>setTimeout(()=>window.print(),500)</script>
      </body></html>`)
    win.document.close()
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-6">QR para GastroLinks</h2>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div
          className="rounded-3xl p-6 flex flex-col items-center gap-4 flex-shrink-0"
          style={{
            background: 'rgba(124,58,237,0.08)',
            border: '1px solid rgba(124,58,237,0.2)',
          }}
        >
          <div className="rounded-2xl overflow-hidden p-2" style={{ background: '#fff' }}>
            <img src={qrUrl} alt="QR" width={200} height={200} className="rounded-xl" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-white">Comidas KAI</p>
            <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>GastroLinks</p>
          </div>
        </div>

        <div className="flex-1">
          <div
            className="rounded-xl p-4 mb-5"
            style={{
              background: 'rgba(0,0,0,0.25)',
              border: '1px solid rgba(124,58,237,0.15)',
            }}
          >
            <p className="text-xs mb-1" style={{ color: '#6b7280' }}>URL destino</p>
            <p className="text-sm font-mono break-all" style={{ color: '#c4b5fd' }}>
              {gastroLinksUrl}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Button
              onClick={handlePrint}
              style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)', color: '#fff' }}
              className="justify-start"
            >
              <Printer className="h-4 w-4 mr-2" />
              Imprimir QR
            </Button>
            <Button
              onClick={() => window.open(qrUrl, '_blank')}
              variant="outline"
              className="justify-start"
              style={{
                borderColor: 'rgba(124,58,237,0.35)',
                color: '#c4b5fd',
                background: 'rgba(124,58,237,0.07)',
              }}
            >
              <QrCode className="h-4 w-4 mr-2" />
              Descargar imagen
            </Button>
          </div>
          <p className="text-xs mt-5" style={{ color: '#6b7280' }}>
            Imprimí este QR y colocalo en mesas o materiales del local.
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Login screen ──────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setTimeout(() => {
      if (user === MOCK_USER && pass === MOCK_PASS) {
        onLogin()
      } else {
        setError('Usuario o contraseña incorrectos.')
      }
      setLoading(false)
    }, 600)
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{
        background: 'linear-gradient(135deg,#080812 0%,#0f0a1e 50%,#0d1424 100%)',
      }}
    >
      <div
        className="w-full max-w-sm rounded-3xl p-8"
        style={{
          background: 'rgba(124,58,237,0.07)',
          border: '1px solid rgba(124,58,237,0.2)',
        }}
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{
            background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
            boxShadow: '0 0 32px rgba(124,58,237,0.4)',
          }}
        >
          <Lock className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-white text-center mb-1">Admin</h1>
        <p className="text-sm text-center mb-7" style={{ color: '#9ca3af' }}>
          Comidas KAI
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p className="text-sm mb-1" style={{ color: '#c4b5fd' }}>Usuario</p>
            <Input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="admin"
              className="h-10"
              style={inputStyle}
            />
          </div>
          <div>
            <p className="text-sm mb-1" style={{ color: '#c4b5fd' }}>Contraseña</p>
            <Input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="••••••••"
              className="h-10"
              style={inputStyle}
            />
          </div>
          {error && (
            <p
              className="text-sm rounded-lg px-3 py-2"
              style={{
                color: '#fca5a5',
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.2)',
              }}
            >
              {error}
            </p>
          )}
          <Button
            type="submit"
            className="w-full h-11 font-semibold"
            disabled={loading}
            style={{
              background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
              color: '#fff',
              boxShadow: '0 4px 20px rgba(124,58,237,0.35)',
            }}
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </Button>
        </form>
        <p className="text-xs text-center mt-4" style={{ color: '#4b5563' }}>
          Demo: admin / kai2024
        </p>
      </div>
    </div>
  )
}

// ── Main admin ────────────────────────────────────────────────────
const TABS = ['Carta', 'Links', 'QR'] as const
type TabName = (typeof TABS)[number]

export default function GastronomicosAdmin() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState<TabName>('Carta')
  const [config, setConfig] = useState<RestaurantConfig>(getConfig)

  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />

  const handleReset = () => {
    if (
      !confirm('¿Resetear la configuración al estado inicial? No se puede deshacer.')
    )
      return
    resetConfig()
    setConfig(getConfig())
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(135deg,#080812 0%,#0f0a1e 50%,#0d1424 100%)',
      }}
    >
      {/* Top bar */}
      <header
        className="sticky top-0 z-30 px-4 py-3"
        style={{
          background: 'rgba(8,8,18,0.9)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(124,58,237,0.15)',
        }}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
              style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)' }}
            >
              🍽️
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-none">Comidas KAI</p>
              <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>
                Panel de administración
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              title="Resetear configuración"
              className="p-2 rounded-xl"
              style={{ color: '#6b7280' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fbbf24')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7280')}
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={() => setLoggedIn(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm"
              style={{
                color: '#9ca3af',
                background: 'rgba(124,58,237,0.08)',
                border: '1px solid rgba(124,58,237,0.15)',
              }}
            >
              <LogOut className="h-3.5 w-3.5" />
              Salir
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div
        className="sticky z-20 px-4 py-3"
        style={{
          top: 57,
          background: 'rgba(8,8,18,0.88)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(124,58,237,0.1)',
        }}
      >
        <div className="max-w-4xl mx-auto flex gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-5 py-2 rounded-xl text-sm font-medium transition-all"
              style={
                activeTab === tab
                  ? {
                      background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
                      color: '#fff',
                      boxShadow: '0 4px 16px rgba(124,58,237,0.35)',
                    }
                  : {
                      background: 'rgba(124,58,237,0.08)',
                      color: '#c4b5fd',
                      border: '1px solid rgba(124,58,237,0.18)',
                    }
              }
            >
              {tab === 'Carta' && '📋 '}
              {tab === 'Links' && '🔗 '}
              {tab === 'QR' && '📱 '}
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {activeTab === 'Carta' && (
          <TabCarta config={config} onChange={setConfig} />
        )}
        {activeTab === 'Links' && (
          <TabLinks config={config} onChange={setConfig} />
        )}
        {activeTab === 'QR' && <TabQR />}
      </main>
    </div>
  )
}