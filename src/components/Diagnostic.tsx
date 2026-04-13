import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  CheckCircle,
  TrendingUp,
  Zap,
  Target,
  MessageCircle,
  ArrowRight,
  ChevronRight
} from 'lucide-react'

const Diagnostic = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [showBlockResult, setShowBlockResult] = useState(false)
  const [completedBlockIndex, setCompletedBlockIndex] = useState<number | null>(
    null
  )
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
      question:
        '¿Se entiende claramente qué vendés cuando alguien entra a tus redes o web?',
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
      question:
        '¿Tenés definida una propuesta de valor clara (por qué elegirte)?',
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
      options: ['No', 'A veces', 'En general sí', 'Totalmente']
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
        'No tengo web o no tiene un objetivo definido',
        'Solo muestra información',
        'Genera algunas consultas',
        'Convierte visitas en clientes'
      ]
    },
    {
      block: 'BLOQUE 2 — PÁGINA WEB & CONVERSIÓN',
      blockSubtitle: 'impacta Desarrollo Web / Ecommerce',
      question:
        '¿La información de tu negocio en Google está correcta y actualizada?',
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
      question:
        '¿Qué tan fácil es para un usuario contactarte o comprarte online?',
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
      blockSubtitle:
        'impacta Community Manager / Creación de Contenido / Foto y Video',
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
      blockSubtitle:
        'impacta Community Manager / Creación de Contenido / Foto y Video',
      question: '¿Tu contenido tiene un objetivo definido?',
      options: ['No', 'A veces', 'La mayoría de las veces', 'Siempre']
    },
    {
      block: 'BLOQUE 3 — REDES SOCIALES & CONTENIDO',
      blockSubtitle:
        'impacta Community Manager / Creación de Contenido / Foto y Video',
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
      blockSubtitle:
        'impacta Community Manager / Creación de Contenido / Foto y Video',
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
      blockSubtitle:
        'impacta Community Manager / Creación de Contenido / Foto y Video',
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
      options: ['Nunca', 'A veces', 'Bastante seguido', 'Siempre']
    },
    {
      block: 'BLOQUE 4 — MÉTRICAS & ANÁLISIS',
      blockSubtitle: 'impacta Asesorías de Marketing Digital',
      question: '¿Sabés qué canal digital te trae más clientes?',
      options: ['No', 'Tengo una idea', 'Más o menos', 'Sí, con datos claros']
    },
    {
      block: 'BLOQUE 4 — MÉTRICAS & ANÁLISIS',
      blockSubtitle: 'impacta Asesorías de Marketing Digital',
      question: '¿Analizás qué contenidos funcionan mejor?',
      options: ['No', 'Muy poco', 'De vez en cuando', 'De forma sistemática']
    },
    // BLOQUE 5 - ESCALABILIDAD & AUTOMATIZACIÓN
    {
      block: 'BLOQUE 5 — ESCALABILIDAD & AUTOMATIZACIÓN',
      blockSubtitle: 'impacta Soluciones Digitales / Ecommerce',
      question: '¿Tenés procesos digitales automatizados?',
      options: ['No', 'Muy pocos', 'Algunos', 'Varios procesos automatizados']
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
      question:
        '¿Sentís que tu estructura digital acompaña el crecimiento del negocio?',
      options: ['No', 'A veces', 'En general sí', 'Totalmente']
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
      description:
        'Tu negocio tiene una madurez digital alta. El marketing no es improvisado: responde a una estrategia clara y medible. Ahora el foco está en optimización, automatización y expansión.',
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
      description:
        'Tu negocio ya tiene estructura digital. El desafío ahora no es empezar, sino optimizar, automatizar y escalar.',
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
      description:
        'Tu negocio ya está activo en el mundo digital, pero muchas acciones se hacen sin una estrategia clara. El esfuerzo está, pero los resultados no son consistentes.',
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
      insight:
        'Cuando todo apunta al mismo objetivo, el marketing empieza a rendir.'
    },
    inicial: {
      icon: Target,
      iconColor: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      title: '🔴 NIVEL: INICIAL',
      subtitle: 'Tu presencia digital necesita una base sólida',
      description:
        'Hoy tu negocio tiene una presencia digital muy limitada o desordenada. Esto hace que muchas oportunidades se pierdan antes de que el cliente siquiera te conozca. No significa que estés haciendo todo mal, sino que todavía no hay una estrategia clara ni una estructura mínima que acompañe el crecimiento del negocio.',
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
      insight:
        'Ordenar la base digital es el primer paso para empezar a crecer con intención.'
    }
  }

  const blockResults = [
    {
      blockIndex: 0,
      blockName: 'BLOQUE 1 — MARCA & MENSAJE',
      variants: {
        high: {
          title: 'Marca poco clara',
          description:
            'Hoy tu marca no transmite una idea clara ni consistente. Para alguien que te conoce por primera vez, cuesta entender qué hacés, qué ofrecés y por qué debería confiar en vos.',
          improvements: [
            'Definí en una frase simple qué vendés y a quién',
            'Unificá colores, tipografías y tono en todos tus canales',
            'Revisá tu bio y portada como si fueras un cliente nuevo'
          ],
          cta: 'Si querés una mirada externa para ordenar esto, en KAI podemos acompañarte.'
        },
        medium: {
          title: 'Mensaje inconsistente',
          description:
            'Hay una idea de marca, pero no siempre se comunica igual. El mensaje cambia según el canal o el momento, y eso debilita el impacto y la recordación.',
          improvements: [
            'Escribí tu propuesta de valor y usala como guía',
            'Revisá si tus posteos y tu web dicen lo mismo',
            'Definí 2–3 mensajes clave y repetilos con intención'
          ],
          cta: 'A veces pequeños ajustes de mensaje hacen una gran diferencia.'
        },
        low: {
          title: 'Marca clara y coherente',
          description:
            'Tu marca se entiende y transmite profesionalismo. Hay coherencia y una identidad reconocible, lo cual genera confianza.',
          improvements: [
            'Documentá tu identidad para no perder consistencia',
            'Ajustá el mensaje según cada canal sin perder esencia'
          ],
          cta: 'Si en algún momento querés llevar la marca un paso más allá, estamos.'
        }
      }
    },
    {
      blockIndex: 1,
      blockName: 'BLOQUE 2 — PÁGINA WEB & CONVERSIÓN',
      variants: {
        high: {
          title: 'Web ausente o débil',
          description:
            'Tu presencia web hoy no acompaña al negocio. Eso hace que muchas personas interesadas no den el siguiente paso o directamente se vayan.',
          improvements: [
            'Definí un único objetivo claro para tu web',
            'Asegurate de que contactarte sea inmediato',
            'Actualizá la info básica en Google'
          ],
          cta: 'Una web clara suele destrabar muchos problemas de ventas.'
        },
        medium: {
          title: 'Web poco efectiva',
          description:
            'Tenés web, pero no está cumpliendo del todo su función. Informa, pero no guía ni convierte de forma consistente.',
          improvements: [
            'Revisá llamados a la acción visibles',
            'Simplificá textos y jerarquizá la información',
            'Probá el recorrido como si fueras un cliente'
          ],
          cta: 'Optimizar lo que ya existe suele ser más simple de lo que parece.'
        },
        low: {
          title: 'Web clara y funcional',
          description:
            'Tu web cumple un rol claro y acompaña al proceso comercial. Es fácil entender qué hacer y cómo avanzar.',
          improvements: [
            'Medí qué hacen los usuarios dentro de la web',
            'Testeá mejoras pequeñas de conversión'
          ],
          cta: 'Cuando la base está bien, optimizar es donde aparece el crecimiento.'
        }
      }
    },
    {
      blockIndex: 2,
      blockName: 'BLOQUE 3 — REDES SOCIALES & CONTENIDO',
      variants: {
        high: {
          title: 'Contenido sin estrategia',
          description:
            'Hoy las redes están más en modo presencia que en modo herramienta. El contenido no sigue un objetivo claro ni genera interacción real.',
          improvements: [
            'Definí para qué publicás antes de crear contenido',
            'Armá un calendario simple y realista',
            'Alterná venta, valor y cercanía'
          ],
          cta: 'Con un poco de orden, las redes pueden empezar a jugar a favor.'
        },
        medium: {
          title: 'Presencia irregular',
          description:
            'Hay constancia y esfuerzo, pero falta una estrategia clara detrás. El contenido funciona a veces, pero no de forma predecible.',
          improvements: [
            'Analizá qué posteos generan más respuesta',
            'Repetí formatos que ya sabés que funcionan',
            'Pensá cada post con un objetivo concreto'
          ],
          cta: 'Alinear contenido y objetivos suele cambiar el resultado.'
        },
        low: {
          title: 'Contenido estratégico',
          description:
            'Tus redes tienen planificación, intención y generan interacción. Se nota una estrategia detrás del contenido.',
          improvements: [
            'Profundizá en formatos que conviertan mejor',
            'Usá datos para ajustar la estrategia'
          ],
          cta: 'Cuando el contenido funciona, el desafío es escalarlo.'
        }
      }
    },
    {
      blockIndex: 3,
      blockName: 'BLOQUE 4 — MÉTRICAS & ANÁLISIS',
      variants: {
        high: {
          title: 'Decisiones a ciegas',
          description:
            'Hoy el marketing se mueve más por intuición que por datos. Eso dificulta saber qué funciona y qué no.',
          improvements: [
            'Elegí 3 métricas clave y seguí solo esas',
            'Anotá resultados una vez por mes',
            'Relacioná acciones con consultas o ventas'
          ],
          cta: 'Medir no es complejo, pero sí cambia todo.'
        },
        medium: {
          title: 'Datos poco usados',
          description:
            'Medís algunas cosas, pero no siempre las usás para decidir. Hay información, pero no termina de transformarse en acción.',
          improvements: [
            'Revisá métricas antes de cambiar estrategias',
            'Compará resultados entre meses',
            'Definí qué significa un buen resultado'
          ],
          cta: 'Cuando los datos guían, el marketing se vuelve más predecible.'
        },
        low: {
          title: 'Métricas claras',
          description:
            'Usás datos para entender qué pasa y tomar decisiones. Eso te da ventaja frente a muchos negocios.',
          improvements: [
            'Automatizá reportes simples',
            'Profundizá en métricas de conversión'
          ],
          cta: 'Con datos claros, optimizar es el siguiente paso lógico.'
        }
      }
    },
    {
      blockIndex: 4,
      blockName: 'BLOQUE 5 — ESCALABILIDAD & AUTOMATIZACIÓN',
      variants: {
        high: {
          title: 'Estructura frágil',
          description:
            'Hoy el crecimiento depende demasiado de vos. Eso limita cuánto podés escalar sin agotarte.',
          improvements: [
            'Listá tareas repetitivas y buscá simplificarlas',
            'Documentá procesos básicos',
            'Probá automatizar un solo punto del negocio'
          ],
          cta: 'Ordenar procesos libera tiempo y energía.'
        },
        medium: {
          title: 'Crecimiento limitado',
          description:
            'Hay algo de delegación y estructura, pero todavía cuesta escalar sin fricción. El sistema acompaña a medias.',
          improvements: [
            'Detectá cuellos de botella digitales',
            'Automatizá respuestas o presupuestos frecuentes',
            'Separá tareas operativas de estratégicas'
          ],
          cta: 'Escalar suele ser más estructura que esfuerzo.'
        },
        low: {
          title: 'Base escalable',
          description:
            'Tu estructura digital acompaña el crecimiento. No todo depende de vos y eso es clave.',
          improvements: [
            'Optimizá procesos existentes',
            'Pensá automatizaciones orientadas a venta'
          ],
          cta: 'Con una base sólida, el foco pasa a optimizar.'
        }
      }
    }
  ]

  const getBlockVariant = (blockIndex: number): 'high' | 'medium' | 'low' => {
    const indices = questions
      .map((_, i) => i)
      .filter(i => questionBlockMap[i] === blockIndex)
    const maxScore = indices.length * 2
    const actual = indices.reduce((sum, i) => {
      const a = answers[i]
      return sum + (a === undefined ? 0 : a === 0 ? 2 : a === 1 ? 1 : 0)
    }, 0)
    const pct = maxScore > 0 ? (actual / maxScore) * 100 : 0
    if (pct >= 67) return 'high'
    if (pct >= 34) return 'medium'
    return 'low'
  }

  const handleContinueFromBlock = () => {
    setShowBlockResult(false)
    setCurrentStep(currentStep + 1)
  }

  const handleWhatsAppBlock = () => {
    const message = `Hola! Estaba haciendo el diagnóstico digital de KAI y quería consultar.`
    window.open(
      `https://wa.me/5492235068676?text=${encodeURIComponent(message)}`,
      '_blank'
    )
  }

  const questionBlockMap = questions.map((_, i) => {
    let blockIdx = 0
    for (let j = 1; j <= i; j++) {
      if (questions[j].block !== questions[j - 1].block) blockIdx++
    }
    return blockIdx
  })

  const handleAnswer = (value: number) => {
    const newAnswers = { ...answers, [currentStep]: value }
    setAnswers(newAnswers)

    const isLastQuestion = currentStep === questions.length - 1
    const isLastInBlock =
      isLastQuestion ||
      questions[currentStep + 1].block !== questions[currentStep].block

    setTimeout(() => {
      if (isLastQuestion) {
        setShowResults(true)
      } else if (isLastInBlock) {
        setCompletedBlockIndex(questionBlockMap[currentStep])
        setShowBlockResult(true)
      } else {
        setCurrentStep(currentStep + 1)
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
    setShowBlockResult(false)
    setCompletedBlockIndex(null)
  }

  // Check if we're starting a new block
  const isNewBlock =
    currentStep === 0 ||
    questions[currentStep].block !== questions[currentStep - 1]?.block

  if (showResults) {
    const level = getLevel()
    const IconComponent = level.icon

    return (
      <section id='diagnostic' className='py-24'>
        <div className='container mx-auto px-4'>
          <div className='max-w-3xl mx-auto'>
            <Card
              className={`p-8 md:p-12 shadow-card border-2 ${level.borderColor} ${level.bgColor}/30`}
            >
              {/* Header */}
              <div className='text-center mb-8'>
                <IconComponent
                  className={`${level.iconColor} mx-auto mb-4`}
                  size={72}
                />
                <h2 className='text-3xl md:text-4xl font-bold mb-3'>
                  {level.title}
                </h2>
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
                      <span className='text-lg font-semibold'>
                        {product.name}
                      </span>
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

  if (showBlockResult && completedBlockIndex !== null) {
    const block = blockResults[completedBlockIndex]
    const variant = getBlockVariant(completedBlockIndex)
    const result = block.variants[variant]
    const isLastBlock = completedBlockIndex === blockResults.length - 1

    return (
      <section className='py-24 bg-secondary/30'>
        <div className='container mx-auto px-4'>
          <div className='max-w-2xl mx-auto'>
            <Card className='p-8 md:p-12 shadow-card'>
              {/* Header del bloque */}
              <div className='mb-6 pb-6 border-b border-border'>
                <p className='text-sm text-muted-foreground mb-1'>
                  {block.blockName}
                </p>
                <h3 className='text-2xl font-bold'>{result.title}</h3>
              </div>

              {/* Descripción */}
              <p className='text-base text-muted-foreground leading-relaxed mb-6'>
                {result.description}
              </p>

              {/* Mejoras */}
              <div className='bg-secondary/50 rounded-xl p-6 mb-6'>
                <h4 className='font-semibold mb-4 text-sm uppercase tracking-wide text-muted-foreground'>
                  Lo que podés mejorar
                </h4>
                <ul className='space-y-3'>
                  {result.improvements.map((item: string, i: number) => (
                    <li key={i} className='flex items-start gap-3'>
                      <ChevronRight
                        size={16}
                        className='text-primary mt-1 shrink-0'
                      />{' '}
                      <span className='text-base'>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA suave */}
              <p className='text-sm text-muted-foreground italic mb-8 text-center'>
                {result.cta}
              </p>

              {/* Acciones */}
              <div className='flex flex-col gap-3'>
                {!isLastBlock && (
                  <Button
                    size='lg'
                    onClick={handleContinueFromBlock}
                    className='rounded-full w-full'
                  >
                    Continuar diagnóstico
                  </Button>
                )}
                <Button
                  size='lg'
                  variant='outline'
                  onClick={handleWhatsAppBlock}
                  className='rounded-full w-full'
                >
                  <MessageCircle className='mr-2' />
                  Quiero que me ayuden
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
                  variant={
                    answers[currentStep] === index ? 'default' : 'outline'
                  }
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
