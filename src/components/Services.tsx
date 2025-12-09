import { useState } from 'react'
import { Globe, Code, BarChart3, Users, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import ServiceModal from './ServiceModal'

const Services = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null)

  const handleConsult = (message: string) => {
    window.open(
      `https://wa.me/5492235068676?text=${encodeURIComponent(message)}`,
      '_blank'
    )
  }

  const services = [
    {
      icon: BarChart3,
      title: 'Consultoría en Marketing Digital',
      description:
        'Detectá tus problemas y oportunidades con un análisis completo de tu presencia digital.',
      whatsappMessage: 'Hola, te escribo desde la web de Kai, te escribo para preguntarte por consultoría en marketing digital',
      featured: true,
      modalContent: {
        fullDescription:
          'Análisis integral de tu estrategia digital actual. Identificamos oportunidades de crecimiento y optimización para maximizar tus ventas y presencia online.',
        benefits: [
          'Consultoría Estratégica para mejorar tu presencia digital y acelerar resultados',
          'Branding empresarial',
          'Posicionamiento Web (SEO, google)',
          'Ayuda con Facebook Bussiness o Google business',
          'Gestionamos publicidad digital',
          'Asesoramiento en posibles herramientas digitales (Principalmente IA)'
        ],
        includes: [
          'PRIMER ENCUENTRO GRATUITO',
          'Proyecto personalizado',
          'Orientación y seguimiento de objetivos',
        ]
      }
    },
    {
      icon: Globe,
      title: 'Web Institucional',
      description:
        'Tu carta de presentación digital profesional. Sitio web de 3-5 secciones, diseño moderno y responsive.',
      whatsappMessage: 'Hola, te escribo desde la web de Kai, te escribo para preguntarte por una web institucional',
      featured: false,
      modalContent: {
        fullDescription:
          'Desarrollamos tu sitio web profesional con diseño moderno, optimizado para todos los dispositivos y preparado para convertir visitantes en clientes.',
        benefits: [
          'Diseño responsive (mobile, tablet, desktop)',
          'Optimización SEO básica',
          'Integración con redes sociales',
          'Formulario de contacto funcional',
          'Hosting y dominio por 1 año incluido'
        ],
        includes: [
          'Entre 3 y 5 secciones personalizadas',
          'hasta 3 rondas de revisiones',
          'Soporte técnico por 3 meses'
        ]
      }
    },
    {
      icon: Code,
      title: 'Soluciones digitales',
      description:
        'Todo el mundo usa IA y herramientas digitales ¿por qué vos no?, optimiza tus recursos y procesos con tecnología a medida.',
      whatsappMessage: 'Hola, te escribo desde la web de Kai, te escribo para preguntarte por soluciones digitales',
      featured: false,
      modalContent: {
        fullDescription:
          'Desarrollamos herramientas y automatizaciones personalizadas para optimizar tus procesos de negocio usando las últimas tecnologías.',
        benefits: [
          'Automatización de procesos repetitivos',
          'Integración de herramientas según tu necesidad',
          'Herramientas a medida',
          'APIs y conexiones entre sistemas'
        ],
        includes: [
          'Análisis de necesidades sin cargo',
          'Desarrollo a medida',
          'Capacitación del equipo',
          'Mantenimiento y actualizaciones'
        ]
      }
    },
    {
      icon: Users,
      title: 'Community Manager',
      description:
        'Construí y gestioná tu comunidad online con estrategias de contenido y publicidad en redes sociales.',
      whatsappMessage: 'Hola, te escribo desde la web de Kai, te escribo para preguntarte por community manager',
      featured: false,
      modalContent: {
        fullDescription:
          'Gestionamos tus redes sociales con contenido estratégico que conecta con tu audiencia y construye una comunidad leal alrededor de tu marca.',
        benefits: [
          'Creación de contenido',
          'Monitoreo de Marca',
          'Gestión de campañas',
          'Detección de oportunidades',
          'Estrategias'
        ],
        includes: [
          'Gestión diaria',
          'paquetes de publicaciones pautada',
          'Stories y contenido efímero',
          'Campañas publicitarias opcionales',
        ]
      }
    }
  ]

  // Reordenar servicios: en mobile destacado primero, en desktop destacado segundo
  const getOrderedServices = () => {
    const featuredIndex = services.findIndex(s => s.featured)

    const mobileOrder =
      featuredIndex === -1
        ? services
        : [
            services[featuredIndex],
            ...services.filter((_, i) => i !== featuredIndex)
          ]

    const desktopOrder = [...services]
    if (featuredIndex !== -1 && featuredIndex !== 1) {
      const featured = desktopOrder.splice(featuredIndex, 1)[0]
      desktopOrder.splice(1, 0, featured)
    }

    return { mobile: mobileOrder, desktop: desktopOrder }
  }

  const orderedServices = getOrderedServices()

  return (
    <>
      <section id='services' className='py-24'>
        <div className='container mx-auto px-4'>
          <div className='max-w-6xl mx-auto'>
            <div className='text-center mb-16'>
              <h2 className='text-4xl md:text-5xl font-bold mb-4'>
                Nuestros{' '}
                <span className='bg-gradient-primary bg-clip-text text-transparent'>
                  servicios
                </span>
              </h2>
              <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                Soluciones digitales diseñadas para impulsar tu negocio
              </p>
            </div>

            {/* Mobile view */}
            <div className='grid md:hidden gap-6'>
              {orderedServices.mobile.map((service, index) => (
                <Card
                  key={index}
                  className={`p-6 shadow-card hover:shadow-soft transition-all border-border/50 ${
                    service.featured ? 'ring-2 ring-primary/50 relative' : ''
                  }`}
                >
                  {service.featured && (
                    <div className='absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-medium'>
                      Destacado
                    </div>
                  )}
                  <div className='w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4'>
                    <service.icon className='text-white' size={24} />
                  </div>
                  <h3 className='text-xl font-bold mb-3'>{service.title}</h3>
                  <p className='text-muted-foreground mb-3 text-sm leading-relaxed'>
                    {service.description}
                  </p>

                  <Button
                    variant='outline'
                    className='w-full rounded-full'
                    onClick={() =>
                      setSelectedService(
                        services.findIndex(s => s.title === service.title)
                      )
                    }
                  >
                    <ArrowRight size={16} className='mr-2' />
                    Más Info!
                  </Button>
                </Card>
              ))}
            </div>

            {/* Desktop view with centered last row */}
            <div className='hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {orderedServices.desktop.map((service, index) => (
                <Card
                  key={index}
                  className={`p-6 shadow-card hover:shadow-soft transition-all border-border/50 w-full ${
                    service.featured ? 'ring-2 ring-primary/50 relative' : ''
                  } ${
                    orderedServices.desktop.length % 3 !== 0 &&
                    index === orderedServices.desktop.length - 1
                      ? 'lg:col-start-2'
                      : ''
                  }`}
                >
                  {service.featured && (
                    <div className='absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-medium'>
                      Destacado
                    </div>
                  )}
                  <div className='w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4'>
                    <service.icon className='text-white' size={24} />
                  </div>
                  <h3 className='text-xl font-bold mb-3'>{service.title}</h3>
                  <p className='text-muted-foreground mb-3 text-sm leading-relaxed'>
                    {service.description}
                  </p>

                  <Button
                    variant='outline'
                    className='w-full rounded-full'
                    onClick={() =>
                      setSelectedService(
                        services.findIndex(s => s.title === service.title)
                      )
                    }
                  >
                    <ArrowRight size={16} className='mr-2' />
                    Más Info!
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal Component */}
      {selectedService !== null && (
        <ServiceModal
          isOpen={selectedService !== null}
          onClose={() => setSelectedService(null)}
          icon={services[selectedService].icon}
          title={services[selectedService].title}
          content={services[selectedService].modalContent}
          onConsult={() => handleConsult(services[selectedService].whatsappMessage)}
        />
      )}
    </>
  )
}

export default Services