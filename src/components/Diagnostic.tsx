// import { useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Card } from '@/components/ui/card'
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
// import { Label } from '@/components/ui/label'
// import { CheckCircle, AlertCircle, MessageCircle } from 'lucide-react'

// const Diagnostic = () => {
//   const [currentStep, setCurrentStep] = useState(0)
//   const [answers, setAnswers] = useState<Record<number, string>>({})
//   const [showResults, setShowResults] = useState(false)

//   const questions = [
//     {
//       question: '¿Tenés un sitio web?',
//       options: [
//         { value: 'yes', label: 'Sí, tengo un sitio web', score: 1 },
//         { value: 'no', label: 'No, solo redes sociales', score: -2 },
//         { value: 'outdated', label: 'Sí, pero está desactualizado', score: 0 }
//       ]
//     },
//     {
//       question: '¿Te encuentran en Google cuando buscan tu servicio?',
//       options: [
//         {
//           value: 'yes',
//           label: 'Sí, aparezco en los primeros resultados',
//           score: 2
//         },
//         { value: 'sometimes', label: 'A veces, pero no siempre', score: 0 },
//         { value: 'no', label: 'No, no me encuentran', score: -2 }
//       ]
//     },
//     {
//       question: '¿Qué tipo de negocio tenés?',
//       options: [
//         {
//           value: 'service',
//           label: 'Servicio profesional (consultoría, abogado, etc.)',
//           score: 0
//         },
//         { value: 'retail', label: 'Comercio o tienda', score: 0 },
//         { value: 'online', label: 'Negocio 100% online', score: 0 }
//       ]
//     },
//     {
//       question: '¿Usás redes sociales activamente?',
//       options: [
//         { value: 'yes', label: 'Sí, publico regularmente', score: 1 },
//         { value: 'sometimes', label: 'De vez en cuando', score: 0 },
//         { value: 'no', label: 'No, casi nunca', score: -1 }
//       ]
//     },
//     {
//       question: '¿Cuál es tu principal objetivo comercial?',
//       options: [
//         { value: 'leads', label: 'Conseguir más clientes', score: 0 },
//         { value: 'branding', label: 'Mejorar mi imagen profesional', score: 0 },
//         { value: 'sales', label: 'Vender más productos/servicios', score: 0 }
//       ]
//     }
//   ]

//   const handleAnswer = (value: string) => {
//     setAnswers({ ...answers, [currentStep]: value })
//   }

//   const handleNext = () => {
//     if (currentStep < questions.length - 1) {
//       setCurrentStep(currentStep + 1)
//     } else {
//       setShowResults(true)
//     }
//   }

//   const handlePrevious = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1)
//     }
//   }

//   const calculateScore = () => {
//     let score = 0
//     Object.entries(answers).forEach(([step, value]) => {
//       const question = questions[parseInt(step)]
//       const option = question.options.find(opt => opt.value === value)
//       if (option) score += option.score
//     })
//     return score
//   }

//   const getRecommendation = () => {
//     const score = calculateScore()
//     const hasWebsite = answers[0] === 'yes'

//     if (score >= 3) {
//       return {
//         level: 'success',
//         title: '¡Vas por buen camino!',
//         message:
//           'Tu presencia digital es sólida. Te recomendamos una auditoría para optimizar lo que ya tenés y llevarlo al siguiente nivel.',
//         service: 'Auditoría de Presencia Digital + Estrategia de optimización'
//       }
//     } else if (score >= 0) {
//       return {
//         level: 'warning',
//         title: 'Hay oportunidades de mejora',
//         message:
//           'Tenés base, pero hay aspectos que mejorar. Una consultoría puede ayudarte a identificar qué necesitás primero.',
//         service: 'Consultoría en Marketing Digital + Plan de acción'
//       }
//     } else {
//       if (!hasWebsite) {
//         return {
//           level: 'alert',
//           title: 'Es momento de dar el salto',
//           message:
//             'Necesitás establecer tu base digital. Un sitio web profesional + optimización para Google es tu prioridad.',
//           service: 'Web Institucional + Google My Business + Estrategia SEO'
//         }
//       }
//       return {
//         level: 'alert',
//         title: 'Necesitás mejorar tu visibilidad',
//         message:
//           'Tenés web pero no te encuentran. Te recomendamos trabajar en tu posicionamiento y presencia online.',
//         service: 'Auditoría completa + Estrategia de posicionamiento en Google'
//       }
//     }
//   }

//   const handleWhatsApp = () => {
//     const recommendation = getRecommendation()
//     const message = `Hola! Completé el diagnóstico digital y me recomendaron: ${recommendation.service}. Me gustaría más información.`
//     window.open(
//       `https://wa.me/5491112345678?text=${encodeURIComponent(message)}`,
//       '_blank'
//     )
//   }

//   const restart = () => {
//     setCurrentStep(0)
//     setAnswers({})
//     setShowResults(false)
//   }

//   if (showResults) {
//     const recommendation = getRecommendation()
//     const IconComponent =
//       recommendation.level === 'success' ? CheckCircle : AlertCircle
//     const iconColor =
//       recommendation.level === 'success'
//         ? 'text-green-500'
//         : recommendation.level === 'warning'
//         ? 'text-yellow-500'
//         : 'text-red-500'

//     return (
//       <section className='py-24'>
//         <div className='container mx-auto px-4'>
//           <div className='max-w-2xl mx-auto'>
//             <Card className='p-8 md:p-12 shadow-card text-center space-y-6'>
//               <IconComponent className={`${iconColor} mx-auto`} size={64} />
//               <h3 className='text-3xl font-bold'>{recommendation.title}</h3>
//               <p className='text-lg text-muted-foreground'>
//                 {recommendation.message}
//               </p>

//               <div className='bg-secondary/50 rounded-xl p-6 space-y-2'>
//                 <div className='text-sm font-medium text-muted-foreground'>
//                   Te recomendamos:
//                 </div>
//                 <div className='text-xl font-bold text-primary'>
//                   {recommendation.service}
//                 </div>
//               </div>

//               <div className='flex flex-col sm:flex-row gap-4 justify-center pt-4'>
//                 <Button
//                   size='lg'
//                   onClick={handleWhatsApp}
//                   className='rounded-full'
//                 >
//                   <MessageCircle className='mr-2' />
//                   Consultar por WhatsApp
//                 </Button>
//                 <Button
//                   size='lg'
//                   variant='outline'
//                   onClick={restart}
//                   className='rounded-full'
//                 >
//                   Reiniciar diagnóstico
//                 </Button>
//               </div>
//             </Card>
//           </div>
//         </div>
//       </section>
//     )
//   }

//   return (
//     <section id='diagnostic' className=' py-24 bg-secondary/30'>
//       <div className='container mx-auto px-4'>
//         <div className='max-w-2xl mx-auto'>
//           <div className='text-center mb-12'>
//             <h2 className='text-4xl md:text-5xl font-bold mb-4'>
//               Diagnóstico{' '}
//               <span className='bg-gradient-primary bg-clip-text text-transparent'>
//                 digital
//               </span>
//             </h2>
//             <p className='text-xl text-muted-foreground'>
//               Descubrí qué necesita tu negocio en 5 preguntas
//             </p>
//           </div>

//           <Card className='p-8 md:p-12 shadow-card'>
//             <div className='mb-8'>
//               <div className='flex justify-between items-center mb-2'>
//                 <span className='text-sm text-muted-foreground'>
//                   Pregunta {currentStep + 1} de {questions.length}
//                 </span>
//                 <span className='text-sm font-medium text-primary'>
//                   {Math.round(((currentStep + 1) / questions.length) * 100)}%
//                 </span>
//               </div>
//               <div className='w-full bg-secondary rounded-full h-2'>
//                 <div
//                   className='bg-gradient-primary h-2 rounded-full transition-all duration-300'
//                   style={{
//                     width: `${((currentStep + 1) / questions.length) * 100}%`
//                   }}
//                 />
//               </div>
//             </div>

//             <h3 className='text-2xl font-bold mb-6'>
//               {questions[currentStep].question}
//             </h3>

//             <RadioGroup
//               value={answers[currentStep]}
//               onValueChange={handleAnswer}
//               className='space-y-4'
//             >
//               {questions[currentStep].options.map(option => (
//                 <div key={option.value} className='flex items-center space-x-3'>
//                   <RadioGroupItem value={option.value} id={option.value} />
//                   <Label
//                     htmlFor={option.value}
//                     className='flex-1 cursor-pointer text-base py-3 px-4 rounded-lg hover:bg-secondary/50 transition-colors'
//                   >
//                     {option.label}
//                   </Label>
//                 </div>
//               ))}
//             </RadioGroup>

//             <div className='flex gap-4 mt-8'>
//               {currentStep > 0 && (
//                 <Button
//                   variant='outline'
//                   onClick={handlePrevious}
//                   className='flex-1 rounded-full'
//                 >
//                   Anterior
//                 </Button>
//               )}
//               <Button
//                 onClick={handleNext}
//                 disabled={!answers[currentStep]}
//                 className='flex-1 rounded-full'
//               >
//                 {currentStep === questions.length - 1
//                   ? 'Ver resultados'
//                   : 'Siguiente'}
//               </Button>
//             </div>
//           </Card>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Diagnostic
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { CheckCircle, AlertCircle, TrendingUp, MessageCircle, Lock } from 'lucide-react'

const Diagnostic = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [showProximamente, setShowProximamente] = useState(false)

  const steps = [
    {
      product: 'Webs institucionales',
      situations: [
        'La gente no conoce mi negocio más que por pasar por la puerta',
        'Cuando busco mi negocio en Google, no aparezco o aparece info desactualizada',
        'No tengo una web, me parece una tarea muy compleja',
        'Mi competencia tiene web profesional y yo solo redes sociales',
        'Pierdo clientes porque no transmito profesionalismo online'
      ]
    },
    {
      product: 'Consultorías de marketing digital',
      situations: [
        'No sé por dónde empezar con el marketing digital',
        'Invierto en publicidad pero no veo resultados claros',
        'No tengo una estrategia definida, voy improvisando',
        'Siento que mi competencia me está superando digitalmente',
        'No sé qué herramientas digitales realmente necesito'
      ]
    },
    {
      product: 'Soluciones digitales a medida',
      situations: [
        'Pierdo mucho tiempo en tareas manuales que podrían automatizarse',
        'Mis clientes me piden formas más fáciles de pagar o reservar',
        'Necesito un sistema específico que no existe en el mercado',
        'Quiero que mi negocio chico se vea más profesional y organizado',
        'Cometo errores frecuentes por hacer todo manual'
      ]
    },
    {
      product: 'Community Manager',
      situations: [
        'No tengo tiempo para mantener mis redes sociales activas',
        'Publico cuando me acuerdo, sin consistencia',
        'No sé qué contenido publicar para atraer clientes',
        'Mi presencia en redes es débil comparada con la competencia',
        'Quiero crecer en redes pero no sé cómo hacerlo profesionalmente'
      ]
    },
    {
      product: 'Creación de sistemas complejos',
      situations: [
        'Manejo todo con hojas de cálculo desorganizadas',
        'Necesito ver datos de mi negocio en tiempo real',
        'Quiero escalar pero mis procesos actuales no me lo permiten',
        'Necesito un dashboard o plataforma interna personalizada',
        'Tomo decisiones sin datos concretos, solo por intuición'
      ]
    }
  ]

  const handleAnswer = (value: number) => {
    setAnswers({ ...answers, [currentStep]: value })
    
    // Auto-advance to next step or show results
    setTimeout(() => {
      if (currentStep < steps.length - 1) {
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

  const getRecommendation = () => {
    // Sistema de puntuación paralelo
    const scores = {
      web: answers[0] || 0,
      consultoria: answers[1] || 0,
      soluciones: answers[2] || 0,
      community: answers[3] || 0,
      sistemas: answers[4] || 0
    }

    // Calcular necesidad de asesoría (suma total de problemas)
    const totalProblems = Object.values(scores).reduce((a, b) => a + b, 0)
    const needsConsultoria = scores.consultoria >= 2 || totalProblems >= 8

    // Identificar productos con alta necesidad (3 puntos = todas las situaciones)
    const highNeedProducts = []
    const mediumNeedProducts = []
    
    if (scores.web >= 2) {
      if (scores.web === 3) highNeedProducts.push('web')
      else mediumNeedProducts.push('web')
    }
    if (scores.soluciones >= 2) {
      if (scores.soluciones === 3) highNeedProducts.push('soluciones')
      else mediumNeedProducts.push('soluciones')
    }
    if (scores.community >= 2) {
      if (scores.community === 3) highNeedProducts.push('community')
      else mediumNeedProducts.push('community')
    }
    if (scores.sistemas >= 2) {
      if (scores.sistemas === 3) highNeedProducts.push('sistemas')
      else mediumNeedProducts.push('sistemas')
    }

    const productDetails = {
      web: {
        name: 'Web institucional',
        reason: 'para mejorar tu imagen, aparecer en Google y transmitir confianza'
      },
      soluciones: {
        name: 'Soluciones digitales a medida',
        reason: 'para ahorrar tiempo, reducir errores y modernizar la experiencia'
      },
      community: {
        name: 'Community Manager',
        reason: 'para contenido profesional, estrategia y crecimiento en redes'
      },
      sistemas: {
        name: 'Sistemas complejos',
        reason: 'para acelerar tiempos, reducir costos y tener control total con datos en tiempo real'
      }
    }

    // CASO 1: Va excelente en todo
    if (totalProblems <= 2) {
      return {
        level: 'success',
        title: '¡Excelente! Vas muy bien',
        message: 'Tu negocio está en muy buena forma digital. Siempre hay margen para optimizar y encontrar nuevas oportunidades.',
        products: [
          {
            name: 'Consultoría de marketing digital',
            reason: 'para descubrir mejoras estratégicas y potenciar lo que ya funciona'
          }
        ]
      }
    }

    // CASO 2: Necesita principalmente asesoría (muchos problemas dispersos o alta necesidad de consultoría)
    if (needsConsultoria && highNeedProducts.length === 0) {
      return {
        level: 'warning',
        title: 'Vemos que necesitás orientación estratégica',
        message: 'Tenés varios puntos por mejorar y lo ideal es empezar por definir un plan claro.',
        products: [
          {
            name: 'Consultoría de marketing digital',
            reason: 'para priorizar acciones, evitar errores costosos y obtener dirección clara'
          }
        ]
      }
    }

    // CASOS ESPECÍFICOS: 1 producto con alta necesidad
    if (highNeedProducts.length === 1 && mediumNeedProducts.length === 0) {
      const product = highNeedProducts[0]
      
      if (product === 'web') {
        return {
          level: 'alert',
          title: 'Tu presencia online necesita atención urgente',
          message: 'Tu negocio no está proyectando el profesionalismo que merece y eso te está haciendo perder clientes.',
          products: [
            {
              name: 'Web institucional',
              reason: 'para mejorar tu imagen, aparecer en Google y transmitir confianza'
            },
            {
              name: 'Consultoría de marketing digital',
              reason: 'para acompañar el proceso y optimizar tus resultados digitales'
            }
          ]
        }
      }
      
      if (product === 'soluciones') {
        return {
          level: 'alert',
          title: 'Estás perdiendo tiempo valioso con tareas manuales',
          message: 'Tenés procesos manuales que podrían automatizarse y herramientas que volverían tu negocio más atractivo.',
          products: [
            {
              name: 'Soluciones digitales a medida',
              reason: 'para ahorrar tiempo, reducir errores y modernizar la experiencia'
            },
            {
              name: 'Consultoría de marketing digital',
              reason: 'para elegir las herramientas correctas y maximizar impacto'
            }
          ]
        }
      }
      
      if (product === 'community') {
        return {
          level: 'alert',
          title: 'Tu presencia en redes necesita profesionalizarse',
          message: 'Estás perdiendo alcance, consistencia y oportunidades de atraer clientes.',
          products: [
            {
              name: 'Community Manager',
              reason: 'para contenido profesional, estrategia y crecimiento en redes'
            },
            {
              name: 'Consultoría de marketing digital',
              reason: 'para definir un plan integral de comunicación digital'
            }
          ]
        }
      }
      
      if (product === 'sistemas') {
        return {
          level: 'alert',
          title: 'Necesitás organización y control para poder escalar',
          message: 'Tus procesos actuales ya no alcanzan. Estás perdiendo tiempo y dinero en operación.',
          products: [
            {
              name: 'Sistemas complejos',
              reason: 'para acelerar tiempos, reducir costos y tener control total con datos en tiempo real'
            },
            {
              name: 'Consultoría de marketing digital',
              reason: 'para integrar la herramienta adecuada dentro de una estrategia completa'
            }
          ]
        }
      }
    }

    // CASO 4: Tiene 1 producto con alta necesidad + otros con necesidad media
    if (highNeedProducts.length === 1 && mediumNeedProducts.length > 0) {
      const mainProduct = productDetails[highNeedProducts[0]]
      const secondProduct = productDetails[mediumNeedProducts[0]]
      return {
        level: 'warning',
        title: 'Tenés oportunidades claras de mejora',
        message: 'Hay un área crítica que atender y otras que también podrían potenciar tu negocio.',
        products: [mainProduct, secondProduct]
      }
    }

    // CASO 5: Tiene 2 o más productos con alta necesidad
    if (highNeedProducts.length >= 2) {
      const p1 = productDetails[highNeedProducts[0]]
      const p2 = productDetails[highNeedProducts[1]]
      return {
        level: 'alert',
        title: 'Es momento de dar un salto digital importante',
        message: 'Tenés varias áreas que necesitan atención urgente. Lo mejor es abordarlas de manera estratégica.',
        products: [
          {
            name: 'Consultoría de marketing digital',
            reason: 'para crear un plan integral que priorice cada necesidad en el orden correcto'
          },
          p1,
          p2
        ]
      }
    }

    // CASO 6: Solo necesidades medias (puntajes de 2)
    if (mediumNeedProducts.length >= 1 && highNeedProducts.length === 0) {
      if (mediumNeedProducts.length === 1) {
        const product = productDetails[mediumNeedProducts[0]]
        return {
          level: 'success',
          title: 'Vas bien, pero podés mejorar',
          message: 'Tu negocio está encaminado, pero hay un área que podría impulsarte más.',
          products: [product]
        }
      } else {
        const p1 = productDetails[mediumNeedProducts[0]]
        const p2 = productDetails[mediumNeedProducts[1]]
        return {
          level: 'warning',
          title: 'Vas por buen camino con margen de mejora',
          message: 'Tenés varios aspectos que podrían optimizarse para crecer más rápido.',
          products: [p1, p2]
        }
      }
    }

    // CASO 7: Mix de problemas bajos
    if (totalProblems >= 3 && totalProblems <= 5) {
      return {
        level: 'success',
        title: 'Vas muy bien, pero siempre se puede mejorar',
        message: 'Estás en buen nivel digital. Una consultoría puede ayudarte a identificar las mejores oportunidades de crecimiento.',
        products: [
          {
            name: 'Consultoría de marketing digital',
            reason: 'para optimizar lo que ya hacés y encontrar nuevas oportunidades de crecimiento'
          }
        ]
      }
    }

    // CASO DEFAULT
    return {
      level: 'warning',
      title: 'Hay espacio para crecer',
      message: 'Tu presencia digital tiene potencial de mejora.',
      products: [
        {
          name: 'Consultoría de marketing digital',
          reason: 'para identificar exactamente qué necesitás y en qué orden implementarlo'
        }
      ]
    }
  }

  const handleWhatsApp = () => {
    const recommendation = getRecommendation()
    const productList = recommendation.products.map(p => p.name).join(', ')
    const message = `Hola! Completé el diagnóstico digital y me recomendaron: ${productList}. Me gustaría agendar mi primera asesoría gratuita.`
    window.open(
      `https://wa.me/5491112345678?text=${encodeURIComponent(message)}`,
      '_blank'
    )
  }

  const restart = () => {
    setCurrentStep(0)
    setAnswers({})
    setShowResults(false)
    setShowProximamente(false)
  }

  if (showResults) {
    const recommendation = getRecommendation()
    const IconComponent =
      recommendation.level === 'success' ? CheckCircle : 
      recommendation.level === 'warning' ? TrendingUp : AlertCircle
    const iconColor =
      recommendation.level === 'success'
        ? 'text-green-500'
        : recommendation.level === 'warning'
        ? 'text-yellow-500'
        : 'text-orange-500'

    return (
      <section className='py-24'>
        <div className='container mx-auto px-4'>
          <div className='max-w-2xl mx-auto'>
            <Card className='p-8 md:p-12 shadow-card text-center space-y-6'>
              <IconComponent className={`${iconColor} mx-auto`} size={64} />
              <h3 className='text-3xl font-bold'>{recommendation.title}</h3>
              <p className='text-lg text-muted-foreground'>
                {recommendation.message}
              </p>

              <div className='bg-secondary/50 rounded-xl p-6 space-y-4 text-left'>
                <div className='text-sm font-medium text-muted-foreground text-center mb-4'>
                  Te recomendamos:
                </div>
                {recommendation.products.map((product, index) => (
                  <div key={index} className='space-y-2'>
                    <div className='text-xl font-bold text-primary'>
                      {product.name}
                    </div>
                    <div className='text-base text-muted-foreground'>
                      {product.reason}
                    </div>
                    {index < recommendation.products.length - 1 && (
                      <div className='border-t border-border/50 my-3'></div>
                    )}
                  </div>
                ))}
              </div>

              <div className='flex flex-col gap-4 pt-4'>
                <Button
                  size='lg'
                  onClick={handleWhatsApp}
                  className='rounded-full w-full'
                >
                  <MessageCircle className='mr-2' />
                  Agendar primera asesoría gratuita
                </Button>
                <Button
                  size='lg'
                  variant='outline'
                  disabled
                  onClick={() => setShowProximamente(true)}
                  className='rounded-full w-full'
                >
                  <Lock className='mr-2' size={18} />
                  Diagnosticador avanzado
                </Button>
                {showProximamente && (
                  <Label className='text-red-500 text-center font-semibold'>
                    Próximamente...
                  </Label>
                )}
                <Button
                  size='lg'
                  variant='ghost'
                  onClick={restart}
                  className='rounded-full w-full mt-2'
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
          <div className='text-center mb-12'>
            <h2 className='text-4xl md:text-5xl font-bold mb-4'>
              Diagnóstico{' '}
              <span className='bg-gradient-primary bg-clip-text text-transparent'>
                digital
              </span>
            </h2>
            <p className='text-xl text-muted-foreground'>
              Descubrí qué necesita tu negocio en 5 pasos
            </p>
          </div>

          <Card className='p-8 md:p-12 shadow-card'>
            <div className='mb-8'>
              <div className='flex justify-between items-center mb-2'>
                <span className='text-sm text-muted-foreground'>
                  Paso {currentStep + 1} de {steps.length}
                </span>
                <span className='text-sm font-medium text-primary'>
                  {Math.round(((currentStep + 1) / steps.length) * 100)}%
                </span>
              </div>
              <div className='w-full bg-secondary rounded-full h-2'>
                <div
                  className='bg-gradient-primary h-2 rounded-full transition-all duration-300'
                  style={{
                    width: `${((currentStep + 1) / steps.length) * 100}%`
                  }}
                />
              </div>
            </div>

            <div className='mb-6'>
              <div className='text-sm font-medium text-primary mb-2'>
                {steps[currentStep].product}
              </div>
              <h3 className='text-2xl font-bold'>
                ¿Te identificás con alguna de estas situaciones?
              </h3>
            </div>

            <div className='bg-secondary/30 rounded-lg p-6 mb-8'>
              <ul className='space-y-3'>
                {steps[currentStep].situations.map((situation, index) => (
                  <li key={index} className='flex items-start gap-3'>
                    <span className='text-primary mt-1'>•</span>
                    <span className='text-base'>{situation}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className='space-y-3 mb-8'>
              <Label className='text-sm font-medium text-muted-foreground'>
                Seleccioná la opción que mejor te represente:
              </Label>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <Button
                  variant={answers[currentStep] === 0 ? 'default' : 'outline'}
                  onClick={() => handleAnswer(0)}
                  className='h-auto py-4 rounded-lg'
                >
                  No me sucede ninguna
                </Button>
                <Button
                  variant={answers[currentStep] === 1 ? 'default' : 'outline'}
                  onClick={() => handleAnswer(1)}
                  className='h-auto py-4 rounded-lg'
                >
                  Me suceden 1 o 2
                </Button>
                <Button
                  variant={answers[currentStep] === 2 ? 'default' : 'outline'}
                  onClick={() => handleAnswer(2)}
                  className='h-auto py-4 rounded-lg'
                >
                  Me suceden 3 o 4
                </Button>
                <Button
                  variant={answers[currentStep] === 3 ? 'default' : 'outline'}
                  onClick={() => handleAnswer(3)}
                  className='h-auto py-4 rounded-lg'
                >
                  Me suceden todas
                </Button>
              </div>
            </div>

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