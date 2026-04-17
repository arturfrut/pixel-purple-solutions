import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getConfig } from '@/utils/gastronomicos-storage'
import { GastroLink, LinkType } from '@/types/gastronomicos'

// ─────────────────────────────────────────────────────────────────
// FONT INJECTION
// ─────────────────────────────────────────────────────────────────
function useFonts() {
  useEffect(() => {
    const id = 'kai-fonts'
    if (document.getElementById(id)) return
    const link = document.createElement('link')
    link.id = id
    link.rel = 'stylesheet'
    link.href =
      'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap'
    document.head.appendChild(link)
  }, [])
}

// ─────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────
const SERIF = '"Cormorant Garamond", Georgia, serif'
const SANS  = '"DM Sans", sans-serif'

const SECTIONS = [
  { id: 'inicio',   label: 'Inicio'    },
  { id: 'menu',     label: 'Menú'      },
  { id: 'nosotros', label: 'Nosotros'  },
  { id: 'links',    label: 'Links'     },
  { id: 'horario',  label: 'Horario'   },
  { id: 'ubicacion',label: 'Ubicación' },
]

const HORARIO = [
  { dias: 'Lunes — Jueves', horas: '12:00 – 15:00 · 20:00 – 23:00' },
  { dias: 'Viernes',        horas: '12:00 – 15:00 · 20:00 – 00:00' },
  { dias: 'Sábado',         horas: '12:00 – 16:00 · 20:00 – 00:00' },
  { dias: 'Domingo',        horas: '12:00 – 16:00 · 20:00 – 23:00' },
]

const FEATURED_DISHES = [
  {
    name: 'Lomo a la pimienta',
    desc: 'Con salsa de pimienta verde y papas fritas',
    price: '$7.500',
    photo: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&w=400&h=300&fit=crop&q=80',
  },
  {
    name: 'Risotto de hongos',
    desc: 'Arroz arbóreo, hongos de estación, parmesano',
    price: '$5.200',
    photo: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&w=400&h=300&fit=crop&q=80',
  },
  {
    name: 'Tiramisú',
    desc: 'Café espresso, mascarpone, cacao amargo',
    price: '$2.200',
    photo: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&w=400&h=300&fit=crop&q=80',
  },
]

// ─────────────────────────────────────────────────────────────────
// LINK BUTTON  (same design as GastroLinks)
// ─────────────────────────────────────────────────────────────────
const LINK_STYLE: Record<LinkType, { iconBg: string; emoji: string; gradientStart: string }> = {
  pedidosya: { iconBg: '#FFCC00',   emoji: '🛵', gradientStart: '#FFCC00' },
  carta:     { iconBg: 'linear-gradient(135deg,#7c3aed,#a855f7)', emoji: '📋', gradientStart: '#7c3aed' },
  instagram: { iconBg: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', emoji: '📸', gradientStart: '#dc2743' },
  google:    { iconBg: '#4285F4',   emoji: '⭐', gradientStart: '#4285F4' },
  web:       { iconBg: 'rgba(75,85,99,0.9)', emoji: '🌐', gradientStart: '#4b5563' },
  whatsapp:  { iconBg: '#25D366',   emoji: '💬', gradientStart: '#25D366' },
}

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
        background: `linear-gradient(to right, ${cfg.gradientStart}38 0%, #0f0a1e 62%)`,
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 2px 14px rgba(0,0,0,0.35)',
        overflow: 'visible',
        cursor: 'pointer',
        flexShrink: 0,
      }}
    >
      <div
        className="flex-shrink-0 flex items-center justify-center rounded-full"
        style={{
          width: 58, height: 58,
          background: cfg.iconBg,
          fontSize: 26,
          boxShadow: '0 3px 12px rgba(0,0,0,0.4)',
          marginTop: -3, marginBottom: -3,
          zIndex: 1,
        }}
      >
        {cfg.emoji}
      </div>
      <span className="flex-1 text-left font-semibold" style={{ color: '#f3f4f6', fontSize: 15, fontFamily: SANS }}>
        {link.label}
      </span>
    </button>
  )
}

// ─────────────────────────────────────────────────────────────────
// PARALLAX STRIP  — full-bleed image, fixed on desktop, scroll on mobile
// ─────────────────────────────────────────────────────────────────
function ParallaxStrip({ url, height = 260, overlay = 'rgba(8,8,18,0.55)' }: { url: string; height?: number; overlay?: string }) {
  return (
    <div
      style={{
        width: '100%',
        height,
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',   // CSS parallax — disabled on mobile via media query below
        position: 'relative',
      }}
      className="parallax-strip"
    >
      <div style={{ position: 'absolute', inset: 0, background: overlay }} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// SCROLL-REVEAL HOOK
// ─────────────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.12 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// SECTION WRAPPER
// ─────────────────────────────────────────────────────────────────
type SectionProps = React.HTMLAttributes<HTMLElement> & {
  id: string;
};

function Section({ id, children, ...rest }: SectionProps) {
  return (
    <section id={id} {...rest}>
      {children}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// NAV
// ─────────────────────────────────────────────────────────────────
function Nav({ activeSection }: { activeSection: string }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* Desktop / top nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 hidden md:flex items-center justify-between px-8 py-4"
        style={{
          background: 'rgba(8,8,18,0.82)',
          backdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(124,58,237,0.12)',
        }}
      >
        <span style={{ fontFamily: SERIF, fontSize: 22, color: '#f3f4f6', fontWeight: 600, letterSpacing: '0.02em' }}>
          Comidas <span style={{ color: '#a855f7' }}>KAI</span>
        </span>
        <div className="flex items-center gap-6">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="text-sm font-medium transition-colors"
              style={{
                fontFamily: SANS,
                color: activeSection === s.id ? '#a78bfa' : '#9ca3af',
                background: 'none', border: 'none', cursor: 'pointer',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile floating bottom nav */}
      <div
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex md:hidden items-center gap-1 px-4 py-2.5 rounded-2xl"
        style={{
          background: 'rgba(15,10,30,0.92)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(124,58,237,0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          maxWidth: 'calc(100vw - 32px)',
        }}
      >
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
            style={{
              fontFamily: SANS,
              color: activeSection === s.id ? '#fff' : '#6b7280',
              background: activeSection === s.id ? 'linear-gradient(135deg,#7c3aed,#a855f7)' : 'transparent',
              border: 'none', cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
    </>
  )
}

// ─────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────
export default function GastronomicosLanding() {
  useFonts()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('inicio')
  const [links, setLinks] = useState<GastroLink[]>([])

  // Load links from config
  useEffect(() => {
    const cfg = getConfig()
    setLinks(cfg.links.filter((l) => l.active))
  }, [])

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveSection(id) },
        { threshold: 0.35 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  // Link groups (same order as GastroLinks page)
  const GROUPS = [
    { label: null,             types: ['carta', 'google']        as LinkType[] },
    { label: 'Pedidos online', types: ['pedidosya']              as LinkType[] },
    { label: 'Redes sociales', types: ['instagram', 'whatsapp']  as LinkType[] },
    { label: null,             types: ['web']                    as LinkType[] },
  ]
  const displayGroups = GROUPS.map((g) => ({
    ...g,
    links: g.types.map((t) => links.find((l) => l.type === t)).filter(Boolean) as GastroLink[],
  })).filter((g) => g.links.length > 0)

  return (
    <>
      {/* CSS for parallax disable on mobile + scrollbar-none */}
      <style>{`
        @media (max-width: 768px) {
          .parallax-strip { background-attachment: scroll !important; }
        }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { display: none; }
        body { scrollbar-width: none; }
      `}</style>

      <Nav activeSection={activeSection} />

      <div style={{ background: '#080812', fontFamily: SANS, color: '#f3f4f6', overflowX: 'hidden' }}>

        {/* ══════════════════════════════════════════════════════
            INICIO — hero with parallax bg
        ══════════════════════════════════════════════════════ */}
        <Section
          id="inicio"
          style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 24px',
            backgroundImage: `url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&w=1600&q=80)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
          className="parallax-strip"
        >
          {/* Dark overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(8,8,18,0.7) 0%, rgba(8,8,18,0.5) 50%, rgba(8,8,18,0.85) 100%)' }} />
          {/* Purple tint */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%, rgba(124,58,237,0.18) 0%, transparent 70%)' }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 640 }}>
            <p style={{ fontFamily: SANS, fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#a78bfa', marginBottom: 16, fontWeight: 500 }}>
              Mar del Plata · Buenos Aires
            </p>
            <h1 style={{
              fontFamily: SERIF,
              fontSize: 'clamp(4rem, 14vw, 9rem)',
              fontWeight: 300,
              lineHeight: 0.92,
              color: '#ffffff',
              marginBottom: 8,
              letterSpacing: '-0.01em',
            }}>
              Comidas
            </h1>
            <h1 style={{
              fontFamily: SERIF,
              fontSize: 'clamp(4rem, 14vw, 9rem)',
              fontWeight: 700,
              lineHeight: 0.92,
              fontStyle: 'italic',
              background: 'linear-gradient(135deg,#c084fc,#a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: 32,
            }}>
              KAI
            </h1>
            <p style={{ fontFamily: SANS, fontSize: 16, color: 'rgba(255,255,255,0.7)', marginBottom: 40, lineHeight: 1.6, fontWeight: 300 }}>
              Cocina de autor con ingredientes frescos de estación.<br />Reservá tu mesa o pedí donde estés.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/gastronomicos/carta')}
                className="transition-all hover:scale-105 active:scale-95"
                style={{
                  fontFamily: SANS, fontWeight: 600, fontSize: 14,
                  padding: '14px 28px', borderRadius: 14,
                  background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
                  color: '#fff', border: 'none', cursor: 'pointer',
                  boxShadow: '0 8px 28px rgba(124,58,237,0.45)',
                }}
              >
                Ver Carta
              </button>
              <button
                onClick={() => document.getElementById('links')?.scrollIntoView({ behavior: 'smooth' })}
                className="transition-all hover:scale-105 active:scale-95"
                style={{
                  fontFamily: SANS, fontWeight: 600, fontSize: 14,
                  padding: '14px 28px', borderRadius: 14,
                  background: 'rgba(255,255,255,0.08)',
                  color: '#e9d5ff', border: '1px solid rgba(167,139,250,0.35)', cursor: 'pointer',
                  backdropFilter: 'blur(8px)',
                }}
              >
                Links Rápidos ↓
              </button>
            </div>
          </div>

          {/* Scroll hint */}
          <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}
            className="animate-bounce">
            <div style={{ width: 24, height: 40, borderRadius: 12, border: '2px solid rgba(167,139,250,0.4)', display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
              <div style={{ width: 4, height: 10, borderRadius: 2, background: '#a78bfa' }} />
            </div>
          </div>
        </Section>

        {/* ══════════════════════════════════════════════════════
            PARALLAX STRIP 1
        ══════════════════════════════════════════════════════ */}
        <ParallaxStrip
          url="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&w=1600&q=80"
          height={200}
          overlay="rgba(8,8,18,0.72)"
        />

        {/* ══════════════════════════════════════════════════════
            MENÚ — 3 featured dishes
        ══════════════════════════════════════════════════════ */}
        <Section id="menu" style={{ padding: '88px 24px', background: '#080812' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <Reveal>
              <p style={{ fontFamily: SANS, fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#a78bfa', marginBottom: 12, fontWeight: 500, textAlign: 'center' }}>
                Nuestra propuesta
              </p>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2.4rem, 6vw, 4rem)', fontWeight: 400, textAlign: 'center', color: '#f3f4f6', marginBottom: 56, lineHeight: 1.1 }}>
                Platos que cuentan<br /><em>una historia</em>
              </h2>
            </Reveal>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              {FEATURED_DISHES.map((dish, i) => (
                <Reveal key={dish.name} delay={i * 100}>
                  <div
                    className="group transition-all duration-300 hover:-translate-y-1"
                    style={{ borderRadius: 20, overflow: 'hidden', background: 'rgba(124,58,237,0.07)', border: '1px solid rgba(124,58,237,0.15)', cursor: 'default' }}
                  >
                    <div style={{ height: 200, overflow: 'hidden' }}>
                      <img
                        src={dish.photo}
                        alt={dish.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                        className="group-hover:scale-105"
                      />
                    </div>
                    <div style={{ padding: '20px 20px 22px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                        <h3 style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 600, color: '#f3f4f6', lineHeight: 1.2 }}>{dish.name}</h3>
                        <span style={{ fontFamily: SANS, fontSize: 15, fontWeight: 700, color: '#a78bfa', flexShrink: 0, marginLeft: 12 }}>{dish.price}</span>
                      </div>
                      <p style={{ fontFamily: SANS, fontSize: 13, color: '#9ca3af', lineHeight: 1.5 }}>{dish.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={300}>
              <div style={{ textAlign: 'center', marginTop: 48 }}>
                <button
                  onClick={() => navigate('/gastronomicos/carta')}
                  className="transition-all hover:scale-105 active:scale-95"
                  style={{
                    fontFamily: SANS, fontWeight: 600, fontSize: 14,
                    padding: '14px 36px', borderRadius: 14,
                    background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
                    color: '#fff', border: 'none', cursor: 'pointer',
                    boxShadow: '0 8px 28px rgba(124,58,237,0.4)',
                  }}
                >
                  Ver carta completa →
                </button>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ══════════════════════════════════════════════════════
            PARALLAX STRIP 2
        ══════════════════════════════════════════════════════ */}
        <ParallaxStrip
          url="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&w=1600&q=80"
          height={220}
          overlay="rgba(8,8,18,0.6)"
        />

        {/* ══════════════════════════════════════════════════════
            NOSOTROS — story + ingredients
        ══════════════════════════════════════════════════════ */}
        <Section id="nosotros" style={{ padding: '88px 24px', background: 'linear-gradient(180deg,#080812 0%,#0f0a1e 100%)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            {/* Story */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 56, alignItems: 'center', marginBottom: 88 }}>
              <Reveal>
                <div>
                  <p style={{ fontFamily: SANS, fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#a78bfa', marginBottom: 16, fontWeight: 500 }}>
                    Nuestra historia
                  </p>
                  <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 400, color: '#f3f4f6', lineHeight: 1.15, marginBottom: 20 }}>
                    Cocina de autor,<br /><em style={{ color: '#c084fc' }}>alma propia</em>
                  </h2>
                  <p style={{ fontFamily: SANS, fontSize: 15, color: '#9ca3af', lineHeight: 1.8, marginBottom: 16, fontWeight: 300 }}>
                    Comidas KAI nació de la pasión por los ingredientes de estación y la cocina honesta. Cada plato es una conversación entre la técnica y el sabor, entre lo clásico y lo propio.
                  </p>
                  <p style={{ fontFamily: SANS, fontSize: 15, color: '#9ca3af', lineHeight: 1.8, fontWeight: 300 }}>
                    Trabajamos con productores locales de Mar del Plata y la región, priorizando la frescura sobre la escala. Lo que no está en temporada, no está en la carta.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={150}>
                <div style={{ borderRadius: 24, overflow: 'hidden', aspectRatio: '4/3', border: '1px solid rgba(124,58,237,0.2)' }}>
                  <img
                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&w=700&q=80"
                    alt="Cocina"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </Reveal>
            </div>

            {/* Ingredients / values */}
            <Reveal>
              <p style={{ fontFamily: SANS, fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#a78bfa', marginBottom: 40, fontWeight: 500, textAlign: 'center' }}>
                Nuestros alimentos
              </p>
            </Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
              {[
                { emoji: '🌿', title: 'Ingredientes frescos',   desc: 'Seleccionados a diario en mercados locales' },
                { emoji: '🥩', title: 'Carnes de calidad',      desc: 'Cortes seleccionados de proveedores de confianza' },
                { emoji: '🌾', title: 'Opciones sin TACC',      desc: 'Varios platos adaptados para celíacos' },
                { emoji: '🌱', title: 'Opciones vegetarianas',  desc: 'Propuestas vegetarianas y veganas en carta' },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 80}>
                  <div
                    style={{
                      padding: '28px 24px',
                      borderRadius: 18,
                      background: 'rgba(124,58,237,0.07)',
                      border: '1px solid rgba(124,58,237,0.15)',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: 32, marginBottom: 12 }}>{item.emoji}</div>
                    <h3 style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 600, color: '#f3f4f6', marginBottom: 8 }}>{item.title}</h3>
                    <p style={{ fontFamily: SANS, fontSize: 13, color: '#9ca3af', lineHeight: 1.5, fontWeight: 300 }}>{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        {/* ══════════════════════════════════════════════════════
            PARALLAX STRIP 3
        ══════════════════════════════════════════════════════ */}
        <ParallaxStrip
          url="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&w=1600&q=80"
          height={200}
          overlay="rgba(8,8,18,0.65)"
        />

        {/* ══════════════════════════════════════════════════════
            LINKS Y CONTACTO  ← star section
        ══════════════════════════════════════════════════════ */}
        <Section
          id="links"
          style={{
            padding: '88px 24px',
            background: 'linear-gradient(180deg,#0a0520 0%,#060310 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Ambient glow */}
          <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(124,58,237,0.12) 0%,transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: 520, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <Reveal>
              <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <p style={{ fontFamily: SANS, fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#a78bfa', marginBottom: 12, fontWeight: 500 }}>
                  Todo en un lugar
                </p>
                <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2.4rem, 6vw, 3.8rem)', fontWeight: 400, color: '#f3f4f6', lineHeight: 1.1, marginBottom: 16 }}>
                  Tus <em style={{ color: '#c084fc' }}>links</em><br />rápidos
                </h2>
                <p style={{ fontFamily: SANS, fontSize: 15, color: '#9ca3af', fontWeight: 300 }}>
                  Pedí, seguinos, calificanos o escribinos,<br />todo desde acá.
                </p>
              </div>
            </Reveal>

            {/* Link groups */}
            {displayGroups.length === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} style={{ height: 52, borderRadius: 18, background: 'rgba(124,58,237,0.08)', animation: 'pulse 2s infinite' }} />
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {displayGroups.map((group, gi) => (
                  <Reveal key={gi} delay={gi * 80}>
                    <div>
                      {group.label && (
                        <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.25em', color: '#4b5563', marginBottom: 10, paddingLeft: 4 }}>
                          {group.label}
                        </p>
                      )}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {group.links.map((link) => (
                          <LinkBtn key={link.id} link={link} />
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}

            {/* QR hint */}
            <Reveal delay={400}>
              <div
                style={{
                  marginTop: 36,
                  padding: '16px 20px',
                  borderRadius: 16,
                  background: 'rgba(124,58,237,0.08)',
                  border: '1px solid rgba(124,58,237,0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                }}
              >
                <span style={{ fontSize: 28 }}>📱</span>
                <div>
                  <p style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, color: '#c4b5fd', marginBottom: 2 }}>
                    ¿Preferís el QR?
                  </p>
                  <p style={{ fontFamily: SANS, fontSize: 12, color: '#6b7280', fontWeight: 300 }}>
                    Pedile al mozo el código QR de mesa para acceder a todos los links desde tu celular.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ══════════════════════════════════════════════════════
            HORARIO
        ══════════════════════════════════════════════════════ */}
        <Section id="horario" style={{ padding: '88px 24px', background: '#080812' }}>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <Reveal>
              <p style={{ fontFamily: SANS, fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#a78bfa', marginBottom: 12, fontWeight: 500, textAlign: 'center' }}>
                Cuando nos encontramos
              </p>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2.4rem, 6vw, 3.8rem)', fontWeight: 400, color: '#f3f4f6', textAlign: 'center', lineHeight: 1.1, marginBottom: 48 }}>
                Horarios
              </h2>
            </Reveal>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {HORARIO.map((row, i) => (
                <Reveal key={row.dias} delay={i * 60}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '18px 24px',
                      borderRadius: 14,
                      background: i % 2 === 0 ? 'rgba(124,58,237,0.07)' : 'transparent',
                      border: i % 2 === 0 ? '1px solid rgba(124,58,237,0.13)' : '1px solid transparent',
                      flexWrap: 'wrap',
                      gap: 8,
                    }}
                  >
                    <span style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 600, color: '#e9d5ff' }}>{row.dias}</span>
                    <span style={{ fontFamily: SANS, fontSize: 14, color: '#a78bfa', fontWeight: 400 }}>{row.horas}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={300}>
              <p style={{ fontFamily: SANS, fontSize: 13, color: '#6b7280', textAlign: 'center', marginTop: 24, fontWeight: 300 }}>
                Para reservas, escribinos por WhatsApp o Instagram.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* ══════════════════════════════════════════════════════
            PARALLAX STRIP 4
        ══════════════════════════════════════════════════════ */}
        <ParallaxStrip
          url="https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&w=1600&q=80"
          height={180}
          overlay="rgba(8,8,18,0.7)"
        />

        {/* ══════════════════════════════════════════════════════
            UBICACIÓN — map + address
        ══════════════════════════════════════════════════════ */}
        <Section id="ubicacion" style={{ padding: '88px 24px 64px', background: '#080812' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <Reveal>
              <p style={{ fontFamily: SANS, fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#a78bfa', marginBottom: 12, fontWeight: 500, textAlign: 'center' }}>
                Dónde estamos
              </p>
              <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2.4rem, 6vw, 3.8rem)', fontWeight: 400, color: '#f3f4f6', textAlign: 'center', lineHeight: 1.1, marginBottom: 48 }}>
                Encontranos
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <div style={{ borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(124,58,237,0.2)', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3143.0!2d-57.5553!3d-38.0023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDAwJzA4LjMiUyA1N8KwMzMnMTkuMSJX!5e0!3m2!1ses!2sar!4v1"
                  width="100%"
                  height="380"
                  style={{ border: 0, display: 'block', filter: 'grayscale(30%) invert(5%)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Comidas KAI"
                />
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginTop: 24 }}>
                {[
                  { emoji: '📍', label: 'Dirección', value: 'Av. Colón 1234\nMar del Plata' },
                  { emoji: '🕐', label: 'Abrimos hoy', value: '12:00 – 15:00\n20:00 – 23:00' },
                  { emoji: '📞', label: 'Teléfono', value: '+54 9 223 600-0000' },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      padding: '20px 22px',
                      borderRadius: 16,
                      background: 'rgba(124,58,237,0.07)',
                      border: '1px solid rgba(124,58,237,0.15)',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: 24, marginBottom: 8 }}>{item.emoji}</div>
                    <p style={{ fontFamily: SANS, fontSize: 11, color: '#6b7280', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 6 }}>{item.label}</p>
                    <p style={{ fontFamily: SERIF, fontSize: 16, color: '#e9d5ff', lineHeight: 1.4, whiteSpace: 'pre-line' }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ══════════════════════════════════════════════════════
            FOOTER
        ══════════════════════════════════════════════════════ */}
        <footer
          style={{
            padding: '32px 24px',
            textAlign: 'center',
            borderTop: '1px solid rgba(124,58,237,0.12)',
            background: '#080812',
          }}
        >
          <p style={{ fontFamily: SERIF, fontSize: 22, color: '#f3f4f6', marginBottom: 6, fontWeight: 600 }}>
            Comidas <span style={{ color: '#a855f7', fontStyle: 'italic' }}>KAI</span>
          </p>
          <p style={{ fontFamily: SANS, fontSize: 12, color: '#4b5563', marginBottom: 4 }}>
            © {new Date().getFullYear()} Comidas KAI · Mar del Plata
          </p>
          <p style={{ fontFamily: SANS, fontSize: 12, color: '#4b5563' }}>
            Hecho con ❤️ por{' '}
            <a href="https://marketingkai.com" target="_blank" rel="noopener noreferrer"
              style={{ color: '#a78bfa', textDecoration: 'none' }}>
              Marketing KAI
            </a>
          </p>
        </footer>

        {/* Bottom padding so mobile nav doesn't cover footer */}
        <div className="md:hidden" style={{ height: 72 }} />
      </div>
    </>
  )
}