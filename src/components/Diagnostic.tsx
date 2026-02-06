import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { CheckCircle, TrendingUp, Zap, Target, MessageCircle, ArrowRight } from 'lucide-react'

const Diagnostic = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)

  const questions = [
    // BLOQUE 1 - MARCA & MENSAJE
    {
      block: 'BLOQUE 1 — MARCA & MENSAJE',
      blockSubtitle: 'impacta Manual de Marca / Creación de Contenido',
      question: '¿Tu marca se ve coherente en todos tus canales digitales?',
      options: [
        'No, cada canal se ve distinto',
        'Más o menos, intento mantener una línea',
        'Bastante coherente, con algunas diferencias',
        'Totalmente coherente y reconocible'
      ]
    },
    {
      block: 'BLOQUE 1 — MARCA & MENSAJE',
      blockSubtitle: 'impacta Manual de Marca / Creación de Contenido',
      question: '¿Se entiende claramente qué vendés cuando alguien entra a tus redes o web?',
      options: [
        'No se entiende',
        'Se entiende si miran bastante',
        'Se entiende, pero podría ser más claro',
        'Se entiende en pocos segundos'
      ]
    },
    {
      block: 'BLOQUE 1 — MARCA & MENSAJE',
      blockSubtitle: 'impacta Manual de Marca / Creación de Contenido',
      question: '¿Tenés definida una propuesta de valor clara (por qué elegirte)?',
      options: [
        'No',
        'La tengo en la cabeza, pero no escrita',
        'Sí, pero no siempre la comunicamos',
        'Sí, clara y bien comunicada'
      ]
    },
    {
      block: 'BLOQUE 1 — MARCA & MENSAJE',
      blockSubtitle: 'impacta Manual de Marca / Creación de Contenido',
      question: '¿Tu negocio transmite profesionalismo y confianza online?',
      options: [
        'No',
        'A veces',
        'En general sí',
        'Totalmente'
      ]
    },
    // BLOQUE 2 - PÁGINA WEB & CONVERSIÓN
    {
      block: 'BLOQUE 2 — PÁGINA WEB & CONVERSIÓN',
      blockSubtitle: 'impacta Desarrollo Web / Ecommerce',
      question: '¿Tu negocio tiene página web?',
      options: [
        'No',
        'Sí, pero está desactualizada',
        'Sí, básica',
        'Sí, profesional y actualizada'
      ]
    },
    {
      block: 'BLOQUE 2 — PÁGINA WEB & CONVERSIÓN',
      blockSubtitle: 'impacta Desarrollo Web / Ecommerce',
      question: '¿Tu web tiene un objetivo claro?',
      options: [
        'No tiene un objetivo definido',
        'Solo muestra información',
        'Genera algunas consultas',
        'Convierte visitas en clientes'
      ]
    },
    {
      block: 'BLOQUE 2 — PÁGINA WEB & CONVERSIÓN',
      blockSubtitle: 'impacta Desarrollo Web / Ecommerce',
      question: '¿La información de tu negocio en Google está correcta y actualizada?',
      options: [
        'No aparezco o está mal',
        'Está incompleta',
        'Está correcta',
        'Está optimizada'
      ]
    },
    {
      block: 'BLOQUE 2 — PÁGINA WEB & CONVERSIÓN',
      blockSubtitle: 'impacta Desarrollo Web / Ecommerce',
      question: '¿Qué tan fácil es para un usuario contactarte o comprarte online?',
      options: [
        'Es difícil',
        'Se puede, pero no es claro',
        'Es bastante fácil',
        'Es muy claro y directo'
      ]
    },
    // BLOQUE 3 - REDES SOCIALES & CONTENIDO
    {
      block: 'BLOQUE 3 — REDES SOCIALES & CONTENIDO',
      blockSubtitle: 'impacta Community Manager / Creación de Contenido / Foto y Video',
      question: '¿Publicás contenido de forma constante?',
      options: [
        'No',
        'Publico cuando puedo',
        'Publico con cierta regularidad',
        'Tengo una planificación clara'
      ]
    },
    {
      block: 'BLOQUE 3 — REDES SOCIALES & CONTENIDO',
      blockSubtitle: 'impacta Community Manager / Creación de Contenido / Foto y Video',
      question: '¿Tu contenido tiene un objetivo definido?',
      options: [
        'No',
        'A veces',
        'La mayoría de las veces',
        'Siempre'
      ]
    },
    {
      block: 'BLOQUE 3 — REDES SOCIALES & CONTENIDO',
      blockSubtitle: 'impacta Community Manager / Creación de Contenido / Foto y Video',
      question: '¿Qué tipo de contenido predomina en tus redes?',
      options: [
        'Solo promociones',
        'Contenido repetitivo',
        'Contenido variado',
        'Contenido estratégico pensado para mi audiencia'
      ]
    },
    {
      block: 'BLOQUE 3 — REDES SOCIALES & CONTENIDO',
      blockSubtitle: 'impacta Community Manager / Creación de Contenido / Foto y Video',
      question: '¿Usás fotos y videos de buena calidad para vender?',
      options: [
        'No',
        'Uso lo que puedo',
        'A veces material profesional',
        'Material profesional pensado para venta'
      ]
    },
    {
      block: 'BLOQUE 3 — REDES SOCIALES & CONTENIDO',
      blockSubtitle: 'impacta Community Manager / Creación de Contenido / Foto y Video',
      question: '¿Tus redes generan interacción real?',
      options: [
        'Casi nada',
        'Poca interacción',
        'Interacción constante',
        'Comunidad activa'
      ]
    },
    // BLOQUE 4 - MÉTRICAS & ANÁLISIS
    {
      block: 'BLOQUE 4 — MÉTRICAS & ANÁLISIS',
      blockSubtitle: 'impacta Asesorías de Marketing Digital',
      question: '¿Medís resultados de tu marketing digital?',
      options: [
        'No',
        'Solo likes y seguidores',
        'Algunas métricas clave',
        'Métricas claras y accionables'
      ]
    },
    {
      block: 'BLOQUE 4 — MÉTRICAS & ANÁLISIS',
      blockSubtitle: 'impacta Asesorías de Marketing Digital',
      question: '¿Usás datos para tomar decisiones?',
      options: [
        'Nunca',
        'A veces',
        'Bastante seguido',
        'Siempre'
      ]
    },
    {
      block: 'BLOQUE 4 — MÉTRICAS & ANÁLISIS',
      blockSubtitle: 'impacta Asesorías de Marketing Digital',
      question: '¿Sabés qué canal digital te trae más clientes?',
      options: [
        'No',
        'Tengo una idea',
        'Más o menos',
        'Sí, con datos claros'
      ]
    },
    {
      block: 'BLOQUE 4 — MÉTRICAS & ANÁLISIS',
      blockSubtitle: 'impacta Asesorías de Marketing Digital',
      question: '¿Analizás qué contenidos funcionan mejor?',
      options: [
        'No',
        'Muy poco',
        'De vez en cuando',
        'De forma sistemática'
      ]
    },
    // BLOQUE 5 - ESCALABILIDAD & AUTOMATIZACIÓN
    {
      block: 'BLOQUE 5 — ESCALABILIDAD & AUTOMATIZACIÓN',
      blockSubtitle: 'impacta Soluciones Digitales / Ecommerce',
      question: '¿Tenés procesos digitales automatizados?',
      options: [
        'No',
        'Muy pocos',
        'Algunos',
        'Varios procesos automatizados'
      ]
    },
    {
      block: 'BLOQUE 5 — ESCALABILIDAD & AUTOMATIZACIÓN',
      blockSubtitle: 'impacta Soluciones Digitales / Ecommerce',
      question: '¿Tu marketing depende solo de vos?',
      options: [
        'Sí, hago todo yo',
        'En gran parte',
        'Lo delego parcialmente',
        'Está profesionalizado'
      ]
    },
    {
      block: 'BLOQUE 5 — ESCALABILIDAD & AUTOMATIZACIÓN',
      blockSubtitle: 'impacta Soluciones Digitales / Ecommerce',
      question: '¿Sentís que tu estructura digital acompaña el crecimiento del negocio?',
      options: [
        'No',
        'A veces',
        'En general sí',
        'Totalmente'
      ]
    }
  ]

  const levels = {
    avanzado: {
      icon: CheckCircle,
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      title: '🟢 NIVEL: AVANZADO',
      subtitle: 'Tu marketing acompaña el crecimiento del negocio',
      description: 'Tu negocio tiene una madurez digital alta. El marketing no es improvisado: responde a una estrategia clara y medible. Ahora el foco está en optimización, automatización y expansión.',
      whatHappens: [
        'Procesos claros',
        'Decisiones basadas en datos',
        'Marketing como inversión',
        'Búsqueda de diferenciación real'
      ],
      products: [
        { name: 'Despliegue de Ecommerce', emoji: '🛒' },
        { name: 'Soluciones digitales a medida', emoji: '⚙️' },
        { name: 'Asesorías estratégicas avanzadas', emoji: '🎯' }
      ],
      insight: 'Pequeñas mejoras pueden generar grandes ventajas competitivas.'
    },
    escalable: {
      icon: Zap,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      title: '🔵 NIVEL: ESCALABLE',
      subtitle: 'Tenés una base sólida y estás listo para crecer',
      description: 'Tu negocio ya tiene estructura digital. El desafío ahora no es empezar, sino optimizar, automatizar y escalar.',
      whatHappens: [
        'Buen contenido, pero sin explotar su potencial',
        'Métricas claras, pero poco accionadas',
        'Procesos manuales que consumen tiempo',
        'Necesidad de delegar y profesionalizar'
      ],
      products: [
        { name: 'Desarrollo de soluciones digitales', emoji: '🔧' },
        { name: 'Fotografía y video orientado a venta', emoji: '📸' },
        { name: 'Creación de contenido avanzada', emoji: '✨' }
      ],
      insight: 'Escalar no es hacer más, es hacerlo mejor.'
    },
    crecimiento: {
      icon: TrendingUp,
      iconColor: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      title: '🟡 NIVEL: EN CRECIMIENTO',
      subtitle: 'Tenés presencia, pero falta coherencia y dirección',
      description: 'Tu negocio ya está activo en el mundo digital, pero muchas acciones se hacen sin una estrategia clara. El esfuerzo está, pero los resultados no son consistentes.',
      whatHappens: [
        'Redes activas, pero sin planificación',
        'Contenido sin objetivo claro',
        'Web básica o poco optimizada',
        'Métricas que no se usan para decidir'
      ],
      products: [
        { name: 'Community Manager', emoji: '💬' },
        { name: 'Creación de contenido estratégica', emoji: '📝' },
        { name: 'Asesorías en marketing digital por nicho', emoji: '🎓' }
      ],
      insight: 'Cuando todo apunta al mismo objetivo, el marketing empieza a rendir.'
    },
    inicial: {
      icon: Target,
      iconColor: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      title: '🔴 NIVEL: INICIAL',
      subtitle: 'Tu presencia digital necesita una base sólida',
      description: 'Hoy tu negocio tiene una presencia digital muy limitada o desordenada. Esto hace que muchas oportunidades se pierdan antes de que el cliente siquiera te conozca. No significa que estés haciendo todo mal, sino que todavía no hay una estrategia clara ni una estructura mínima que acompañe el crecimiento del negocio.',
      whatHappens: [
        'Baja visibilidad online',
        'Dependencia casi total del boca en boca',
        'Dificultad para transmitir confianza digital',
        'Acciones aisladas sin resultados claros'
      ],
      products: [
        { name: 'Desarrollo de página web', emoji: '🌐' },
        { name: 'Manual de marca', emoji: '🎨' },
        { name: 'Asesorías en marketing digital por nicho', emoji: '🎓' }
      ],
      insight: 'Ordenar la base digital es el primer paso para empezar a crecer con intención.'
    }
  }

  const handleAnswer = (value: number) => {
    // Store the selected index, not the points
    setAnswers({ ...answers, [currentStep]: value })
    
    // Auto-advance
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        setShowResults(true)
      }
    }, 300)
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const getLevel = () => {
    // Calculate total score from selected indices
    // index 0 = 2 points, index 1 = 1 point, index 2/3 = 0 points
    const totalScore = Object.values(answers).reduce((sum, selectedIndex) => {
      const points = selectedIndex === 0 ? 2 : selectedIndex === 1 ? 1 : 0
      return sum + points
    }, 0)
    
    // Score ranges (0-40 total possible)
    if (totalScore >= 0 && totalScore <= 10) return levels.avanzado
    if (totalScore >= 11 && totalScore <= 20) return levels.escalable
    if (totalScore >= 21 && totalScore <= 30) return levels.crecimiento
    return levels.inicial
  }

  const handleWhatsApp = () => {
    const level = getLevel()
    const productList = level.products.map(p => p.name).join(', ')
    const message = `Hola! Hice el diagnóstico digital de KAI y mi nivel es: ${level.title}. Me gustaría consultar por: ${productList}`
    window.open(
      `https://wa.me/5492235068676?text=${encodeURIComponent(message)}`,
      '_blank'
    )
  }

  const restart = () => {
    setCurrentStep(0)
    setAnswers({})
    setShowResults(false)
  }

  // Check if we're starting a new block
  const isNewBlock = currentStep === 0 || questions[currentStep].block !== questions[currentStep - 1]?.block

  if (showResults) {
    const level = getLevel()
    const IconComponent = level.icon

    return (
      <section className='py-24'>
        <div className='container mx-auto px-4'>
          <div className='max-w-3xl mx-auto'>
            <Card className={`p-8 md:p-12 shadow-card border-2 ${level.borderColor} ${level.bgColor}/30`}>
              {/* Header */}
              <div className='text-center mb-8'>
                <IconComponent className={`${level.iconColor} mx-auto mb-4`} size={72} />
                <h2 className='text-3xl md:text-4xl font-bold mb-3'>{level.title}</h2>
                <h3 className='text-xl md:text-2xl font-semibold text-muted-foreground mb-4'>
                  {level.subtitle}
                </h3>
                <p className='text-lg text-muted-foreground leading-relaxed'>
                  {level.description}
                </p>
              </div>

              {/* What Happens Section */}
              <div className='bg-secondary/50 rounded-xl p-6 mb-8'>
                <h4 className='font-bold text-lg mb-4 text-center'>
                  ¿Qué suele pasar en este nivel?
                </h4>
                <ul className='space-y-2'>
                  {level.whatHappens.map((item, index) => (
                    <li key={index} className='flex items-start gap-3'>
                      <span className='text-primary mt-1'>•</span>
                      <span className='text-base'>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Products Section */}
              <div className='bg-white rounded-xl p-6 border-2 border-border mb-6'>
                <div className='flex items-center gap-2 justify-center mb-6'>
                  <ArrowRight className='text-primary' size={20} />
                  <h4 className='font-bold text-lg'>
                    En qué deberías enfocarte ahora:
                  </h4>
                </div>
                <div className='space-y-4'>
                  {level.products.map((product, index) => (
                    <div 
                      key={index}
                      className='flex items-center gap-3 p-4 bg-gradient-to-r from-primary/5 to-transparent rounded-lg border border-primary/20'
                    >
                      <span className='text-2xl'>{product.emoji}</span>
                      <span className='text-lg font-semibold'>{product.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insight */}
              <div className='text-center mb-8'>
                <p className='text-base italic text-muted-foreground'>
                  💡 {level.insight}
                </p>
              </div>

              {/* Actions */}
              <div className='flex flex-col gap-4'>
                <Button
                  size='lg'
                  onClick={handleWhatsApp}
                  className='rounded-full w-full text-lg'
                >
                  <MessageCircle className='mr-2' />
                  Agendar primera asesoría gratuita
                </Button>
                <Button
                  size='lg'
                  variant='outline'
                  onClick={restart}
                  className='rounded-full w-full'
                >
                  Reiniciar diagnóstico
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id='diagnostic' className='py-24 bg-secondary/30'>
      <div className='container mx-auto px-4'>
        <div className='max-w-2xl mx-auto'>
          {/* Header - only show on first question */}
          {currentStep === 0 && (
            <div className='text-center mb-12'>
              <h2 className='text-4xl md:text-5xl font-bold mb-4'>
                Diagnóstico{' '}
                <span className='bg-gradient-primary bg-clip-text text-transparent'>
                  digital
                </span>
              </h2>
              <p className='text-xl text-muted-foreground'>
                20 preguntas | Evaluación integral
              </p>
            </div>
          )}

          <Card className='p-8 md:p-12 shadow-card'>
            {/* Progress Bar */}
            <div className='mb-8'>
              <div className='flex justify-between items-center mb-2'>
                <span className='text-sm text-muted-foreground'>
                  Pregunta {currentStep + 1} de {questions.length}
                </span>
                <span className='text-sm font-medium text-primary'>
                  {Math.round(((currentStep + 1) / questions.length) * 100)}%
                </span>
              </div>
              <div className='w-full bg-secondary rounded-full h-2'>
                <div
                  className='bg-gradient-primary h-2 rounded-full transition-all duration-300'
                  style={{
                    width: `${((currentStep + 1) / questions.length) * 100}%`
                  }}
                />
              </div>
            </div>

            {/* Block Title - show when starting new block */}
            {isNewBlock && (
              <div className='mb-6 pb-6 border-b border-border'>
                <h3 className='text-2xl font-bold mb-2'>
                  {questions[currentStep].block}
                </h3>
                <p className='text-sm text-muted-foreground italic'>
                  {questions[currentStep].blockSubtitle}
                </p>
              </div>
            )}

            {/* Question */}
            <div className='mb-8'>
              <h4 className='text-xl font-bold mb-6'>
                {questions[currentStep].question}
              </h4>
            </div>

            {/* Options */}
            <div className='space-y-3 mb-8'>
              {questions[currentStep].options.map((option, index) => (
                <Button
                  key={index}
                  variant={answers[currentStep] === index ? 'default' : 'outline'}
                  onClick={() => handleAnswer(index)}
                  className='w-full h-auto py-4 px-6 rounded-lg text-left justify-start hover:scale-[1.02] transition-transform whitespace-normal'
                >
                  <span className='text-base leading-relaxed'>{option}</span>
                </Button>
              ))}
            </div>

            {/* Navigation */}
            <div className='flex gap-4'>
              {currentStep > 0 && (
                <Button
                  variant='outline'
                  onClick={handlePrevious}
                  className='w-full rounded-full'
                >
                  Anterior
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Diagnostic