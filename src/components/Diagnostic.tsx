import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { CheckCircle, AlertCircle, MessageCircle } from 'lucide-react'

const Diagnostic = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)

  const questions = [
    {
      question: '¿Tenés un sitio web?',
      options: [
        { value: 'yes', label: 'Sí, tengo un sitio web', score: 1 },
        { value: 'no', label: 'No, solo redes sociales', score: -2 },
        { value: 'outdated', label: 'Sí, pero está desactualizado', score: 0 }
      ]
    },
    {
      question: '¿Te encuentran en Google cuando buscan tu servicio?',
      options: [
        {
          value: 'yes',
          label: 'Sí, aparezco en los primeros resultados',
          score: 2
        },
        { value: 'sometimes', label: 'A veces, pero no siempre', score: 0 },
        { value: 'no', label: 'No, no me encuentran', score: -2 }
      ]
    },
    {
      question: '¿Qué tipo de negocio tenés?',
      options: [
        {
          value: 'service',
          label: 'Servicio profesional (consultoría, abogado, etc.)',
          score: 0
        },
        { value: 'retail', label: 'Comercio o tienda', score: 0 },
        { value: 'online', label: 'Negocio 100% online', score: 0 }
      ]
    },
    {
      question: '¿Usás redes sociales activamente?',
      options: [
        { value: 'yes', label: 'Sí, publico regularmente', score: 1 },
        { value: 'sometimes', label: 'De vez en cuando', score: 0 },
        { value: 'no', label: 'No, casi nunca', score: -1 }
      ]
    },
    {
      question: '¿Cuál es tu principal objetivo comercial?',
      options: [
        { value: 'leads', label: 'Conseguir más clientes', score: 0 },
        { value: 'branding', label: 'Mejorar mi imagen profesional', score: 0 },
        { value: 'sales', label: 'Vender más productos/servicios', score: 0 }
      ]
    }
  ]

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentStep]: value })
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const calculateScore = () => {
    let score = 0
    Object.entries(answers).forEach(([step, value]) => {
      const question = questions[parseInt(step)]
      const option = question.options.find(opt => opt.value === value)
      if (option) score += option.score
    })
    return score
  }

  const getRecommendation = () => {
    const score = calculateScore()
    const hasWebsite = answers[0] === 'yes'
    const foundOnGoogle = answers[1] === 'yes'

    if (score >= 3) {
      return {
        level: 'success',
        title: '¡Vas por buen camino!',
        message:
          'Tu presencia digital es sólida. Te recomendamos una auditoría para optimizar lo que ya tenés y llevarlo al siguiente nivel.',
        service: 'Auditoría de Presencia Digital + Estrategia de optimización'
      }
    } else if (score >= 0) {
      return {
        level: 'warning',
        title: 'Hay oportunidades de mejora',
        message:
          'Tenés base, pero hay aspectos que mejorar. Una consultoría puede ayudarte a identificar qué necesitás primero.',
        service: 'Consultoría en Marketing Digital + Plan de acción'
      }
    } else {
      if (!hasWebsite) {
        return {
          level: 'alert',
          title: 'Es momento de dar el salto',
          message:
            'Necesitás establecer tu base digital. Un sitio web profesional + optimización para Google es tu prioridad.',
          service: 'Web Institucional + Google My Business + Estrategia SEO'
        }
      }
      return {
        level: 'alert',
        title: 'Necesitás mejorar tu visibilidad',
        message:
          'Tenés web pero no te encuentran. Te recomendamos trabajar en tu posicionamiento y presencia online.',
        service: 'Auditoría completa + Estrategia de posicionamiento en Google'
      }
    }
  }

  const handleWhatsApp = () => {
    const recommendation = getRecommendation()
    const message = `Hola! Completé el diagnóstico digital y me recomendaron: ${recommendation.service}. Me gustaría más información.`
    window.open(
      `https://wa.me/5491112345678?text=${encodeURIComponent(message)}`,
      '_blank'
    )
  }

  const restart = () => {
    setCurrentStep(0)
    setAnswers({})
    setShowResults(false)
  }

  if (showResults) {
    const recommendation = getRecommendation()
    const IconComponent =
      recommendation.level === 'success' ? CheckCircle : AlertCircle
    const iconColor =
      recommendation.level === 'success'
        ? 'text-green-500'
        : recommendation.level === 'warning'
        ? 'text-yellow-500'
        : 'text-red-500'

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

              <div className='bg-secondary/50 rounded-xl p-6 space-y-2'>
                <div className='text-sm font-medium text-muted-foreground'>
                  Te recomendamos:
                </div>
                <div className='text-xl font-bold text-primary'>
                  {recommendation.service}
                </div>
              </div>

              <div className='flex flex-col sm:flex-row gap-4 justify-center pt-4'>
                <Button
                  size='lg'
                  onClick={handleWhatsApp}
                  className='rounded-full'
                >
                  <MessageCircle className='mr-2' />
                  Consultar por WhatsApp
                </Button>
                <Button
                  size='lg'
                  variant='outline'
                  onClick={restart}
                  className='rounded-full'
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
    <section id='diagnostic' className=' py-24 bg-secondary/30'>
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
              Descubrí qué necesita tu negocio en 5 preguntas
            </p>
          </div>

          <Card className='p-8 md:p-12 shadow-card'>
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

            <h3 className='text-2xl font-bold mb-6'>
              {questions[currentStep].question}
            </h3>

            <RadioGroup
              value={answers[currentStep]}
              onValueChange={handleAnswer}
              className='space-y-4'
            >
              {questions[currentStep].options.map(option => (
                <div key={option.value} className='flex items-center space-x-3'>
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label
                    htmlFor={option.value}
                    className='flex-1 cursor-pointer text-base py-3 px-4 rounded-lg hover:bg-secondary/50 transition-colors'
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className='flex gap-4 mt-8'>
              {currentStep > 0 && (
                <Button
                  variant='outline'
                  onClick={handlePrevious}
                  className='flex-1 rounded-full'
                >
                  Anterior
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={!answers[currentStep]}
                className='flex-1 rounded-full'
              >
                {currentStep === questions.length - 1
                  ? 'Ver resultados'
                  : 'Siguiente'}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Diagnostic
