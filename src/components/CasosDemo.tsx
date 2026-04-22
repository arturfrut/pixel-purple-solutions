import { useState } from 'react'
import { BadgeType, BADGE_CONFIG, CasoCard, NegocioTab, HowItWorksStep } from '@/types/casos-demo'
import { CARD_HUMANO, HOW_IT_WORKS, PROCESO_PASOS, NEGOCIOS } from '@/data/casos-demo-data'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

// ─────────────────────────────────────────────────────────────────
// BADGE CHIP — visual only, no click
// ─────────────────────────────────────────────────────────────────
function BadgeChip({ type, star }: { type: BadgeType; star?: boolean }) {
  const cfg = BADGE_CONFIG[type]
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${cfg.className}`}
    >
      <span>{cfg.emoji}</span>
      {cfg.label}
      {star && <span className="text-yellow-400 ml-0.5">★</span>}
    </span>
  )
}

// ─────────────────────────────────────────────────────────────────
// MODAL
// ─────────────────────────────────────────────────────────────────
function BadgeModal({
  caso,
  onClose,
}: {
  caso: CasoCard
  onClose: () => void
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="bg-card rounded-3xl shadow-soft border border-border w-full max-w-md p-6 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center text-xl flex-shrink-0">
              {caso.icon}
            </div>
            <h3 className="font-semibold text-foreground leading-snug">{caso.titulo}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 mt-0.5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Badge explanations */}
        <div className="flex flex-col gap-4">
          {caso.badges.map((badge) => {
            const cfg = BADGE_CONFIG[badge.type]
            return (
              <div key={badge.type} className="flex gap-3 items-start">
                <span
                  className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full border flex-shrink-0 ${cfg.className}`}
                >
                  <span>{cfg.emoji}</span>
                  {cfg.label}
                  {badge.star && <span className="text-yellow-400 ml-0.5">★</span>}
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed pt-0.5">
                  {badge.explanation}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// CASO CARD — clickable, opens modal
// ─────────────────────────────────────────────────────────────────
function CasoCardComponent({
  caso,
  onOpen,
}: {
  caso: CasoCard
  onOpen: (caso: CasoCard) => void
}) {
  const hasBadges = caso.badges.length > 0

  return (
    <div
      onClick={() => hasBadges && onOpen(caso)}
      className={`bg-card rounded-2xl p-5 border border-border shadow-card flex flex-col gap-3 transition-all duration-200 ${
        hasBadges
          ? 'hover:shadow-soft hover:-translate-y-0.5 cursor-pointer'
          : 'cursor-default'
      }`}
    >
      {/* Icon */}
      <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center text-xl flex-shrink-0">
        {caso.icon}
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="font-semibold text-sm text-foreground mb-1.5 leading-snug">
          {caso.titulo}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {caso.descripcion}
        </p>
      </div>

      {/* Badges + hint */}
      {hasBadges && (
        <div className="pt-1 border-t border-border">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {caso.badges.map((b) => (
              <BadgeChip key={b.type} type={b.type} star={b.star} />
            ))}
          </div>
          <p className="text-xs text-muted-foreground/60">
            Tocá la tarjeta para ver el detalle →
          </p>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// CARD HUMANO — fixed top card
// ─────────────────────────────────────────────────────────────────
function CardHumano() {
  return (
    <div className="rounded-2xl p-5 flex gap-4 items-start bg-violet-50 border border-violet-200 mb-3">
      <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center text-xl flex-shrink-0">
        {CARD_HUMANO.icon}
      </div>
      <div>
        <p className="font-semibold text-sm text-foreground mb-1">{CARD_HUMANO.titulo}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{CARD_HUMANO.descripcion}</p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// HOW IT WORKS
// ─────────────────────────────────────────────────────────────────
function HowItWorksSection({ steps }: { steps: HowItWorksStep[] }) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            Cómo funcionan
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Detrás de cada automatización
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <div
              key={step.label}
              className="bg-card rounded-2xl p-5 border border-border shadow-card flex flex-col gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground mb-1">{step.label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
// PROCESO
// ─────────────────────────────────────────────────────────────────
function ProcesoSection() {
  return (
    <section className="py-12 px-4 bg-secondary/40">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            Nuestro proceso
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Del primer mensaje al lanzamiento
          </h2>
          <p className="text-muted-foreground text-sm mt-2">
            En una semana el asistente está activo.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROCESO_PASOS.map((paso) => (
            <div
              key={paso.numero}
              className="bg-card rounded-2xl p-5 border border-border shadow-card flex flex-col gap-3"
            >
              <span className="text-2xl font-bold text-primary/25 font-mono">{paso.numero}</span>
              <div>
                <p className="font-semibold text-sm text-foreground mb-1">{paso.label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{paso.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
// DISCLAIMER
// ─────────────────────────────────────────────────────────────────
function DisclaimerSection() {
  return (
    <div className="rounded-2xl border border-violet-200 bg-violet-50 p-6 my-8 flex gap-4 items-start max-w-4xl mx-auto">
      <span className="text-2xl flex-shrink-0">💡</span>
      <div>
        <p className="font-semibold text-sm text-foreground mb-1">
          Estos son ejemplos, no un menú obligatorio
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          No hace falta implementar todo de golpe. Empezamos con los casos que más impacto tienen
          para tu negocio y vamos sumando. Si tenés un caso particular que no aparece acá,
          contanos: lo analizamos y vemos cómo automatizarlo.
        </p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// CTA
// ─────────────────────────────────────────────────────────────────
function CTASection() {
  const waUrl =
    'https://wa.me/5492235068676?text=%F0%9F%91%8B+Hola%2C+quiero+consultar+sobre+una+automatizaci%C3%B3n+para+mi+negocio'

  return (
    <section className="py-20 px-4">
      <div
        className="max-w-2xl mx-auto text-center rounded-3xl p-10 border"
        style={{ background: 'var(--gradient-hero)', borderColor: 'hsl(270 20% 90%)' }}
      >
        <div className="text-4xl mb-4">🚀</div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          ¿Cuál es tu caso?
        </h2>
        <p className="text-muted-foreground text-sm mb-8 leading-relaxed max-w-md mx-auto">
          Contanos en qué parte de tu negocio perdés más tiempo respondiendo mensajes o
          coordinando cosas a mano. Lo analizamos gratis y te decimos qué se puede automatizar.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            asChild
            size="lg"
            className="rounded-xl font-semibold gap-2"
            style={{ background: '#25D366', color: '#fff' }}
          >
            <a href={waUrl} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Consultá tu caso por WhatsApp
            </a>
          </Button>
          <Button variant="outline" size="lg" className="rounded-xl font-semibold" asChild>
            <a href="mailto:hola@marketingkai.com">Escribinos por email</a>
          </Button>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
// BADGE LEGEND
// ─────────────────────────────────────────────────────────────────
function BadgeLegend() {
  return (
    <div className="flex flex-wrap gap-2 items-center justify-center mb-8">
      {(Object.keys(BADGE_CONFIG) as BadgeType[]).map((type) => (
        <BadgeChip key={type} type={type} />
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────
interface CasosDemoProps {
  negocios?: NegocioTab[]
  howItWorksSteps?: HowItWorksStep[]
}

export default function CasosDemo({
  negocios = NEGOCIOS,
  howItWorksSteps = HOW_IT_WORKS,
}: CasosDemoProps) {
  const [activeTab, setActiveTab] = useState(negocios[0]?.id ?? '')
  const [modalCaso, setModalCaso] = useState<CasoCard | null>(null)

  const activeNegocio = negocios.find((n) => n.id === activeTab) ?? negocios[0]

  return (
    <div className="min-h-screen bg-background">

      {/* Modal */}
      {modalCaso && (
        <BadgeModal caso={modalCaso} onClose={() => setModalCaso(null)} />
      )}

      {/* Hero */}
      <section
        className="py-20 px-4 text-center"
        style={{ background: 'var(--gradient-hero)' }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wider bg-secondary text-secondary-foreground">
            🤖 Automatizaciones con IA
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
            Ejemplos de{' '}
            <span className="text-primary">automatizaciones</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
            Casos reales que ya estamos implementando en distintos rubros.
            Elegí el que más se parece a tu negocio.
          </p>
        </div>
      </section>

      {/* Tab selector — sticky */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="max-w-4xl mx-auto flex gap-2 overflow-x-auto scrollbar-none pb-0.5">
          {negocios.map((negocio) => (
            <button
              key={negocio.id}
              onClick={() => setActiveTab(negocio.id)}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              style={
                activeTab === negocio.id
                  ? {
                      background: 'hsl(var(--primary))',
                      color: 'hsl(var(--primary-foreground))',
                      boxShadow: 'var(--shadow-soft)',
                    }
                  : {
                      background: 'hsl(var(--secondary))',
                      color: 'hsl(var(--secondary-foreground))',
                    }
              }
            >
              <span>{negocio.icon}</span>
              {negocio.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <section className="py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <BadgeLegend />
          <CardHumano />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
            {activeNegocio?.casos.map((caso) => (
              <CasoCardComponent
                key={caso.id}
                caso={caso}
                onOpen={setModalCaso}
              />
            ))}
          </div>
          <DisclaimerSection />
        </div>
      </section>

      {/* How it works */}
      <HowItWorksSection steps={howItWorksSteps} />

      {/* Proceso */}
      <ProcesoSection />

      {/* CTA */}
      <CTASection />

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 text-center">
        <p className="text-xs text-muted-foreground">
          Hecho con ❤️ por{' '}
          <a
            href="https://marketingkai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold hover:underline"
          >
            Marketing KAI
          </a>
        </p>
      </footer>
    </div>
  )
}