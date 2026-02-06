import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useEmblaCarousel from 'embla-carousel-react'
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Instagram,
  MessageCircle,
  Quote,
  Sparkles
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

// Helper para extraer el ID del post de Instagram y crear URL de embed
const getInstagramEmbedUrl = (postUrl: string) => {
  // Limpiar el URL de parámetros y embed
  const cleanUrl = postUrl.split('?')[0].split('/embed')[0]

  // Buscar el ID del post (funciona para /p/ y /reel/)
  const match = cleanUrl.match(/\/(p|reel)\/([^\/]+)/)

  if (match) {
    const postId = match[2]
    return `https://www.instagram.com/p/${postId}/embed/`
  }
  return null
}

// Componente de Embed de Instagram usando iframe
const InstagramPost = ({
  url,
  className = ''
}: {
  url: string
  className?: string
}) => {
  const embedUrl = getInstagramEmbedUrl(url)
  const [isLoaded, setIsLoaded] = useState(false)

  if (!embedUrl) return null

  return (
    <div className={`relative ${className}`}>
      {!isLoaded && (
        <div className='absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg'>
          <div className='animate-pulse'>
            <Instagram className='text-primary/40' size={48} />
          </div>
        </div>
      )}
      <iframe
        src={embedUrl}
        className='w-full border-0 rounded-lg overflow-hidden'
        style={{ minHeight: '500px' }}
        scrolling='no'
        allowTransparency
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  )
}

const Cases = () => {
  const [showPromoModal, setShowPromoModal] = useState(false)

  const handleWhatsAppPromo = () => {
    const message =
      'Hola! Me interesa aprovechar la promoción de sitios web a precio reducido 🚀'
    window.open(
      `https://wa.me/5491112345678?text=${encodeURIComponent(message)}`,
      '_blank'
    )
    setShowPromoModal(false)
  }

  // Mock data para Creación de Contenido
  const contentCreationCases = [
    {
      id: 'fabiana-condesse',
      clientName: 'Fabiana Condesse',
      description:
        'Acompañamos a Fabiana en la construcción integral de su identidad digital, desarrollando un manual de marca completo, un logo profesional y una estética visual coherente para todas sus comunicaciones. Además, gestionamos sus redes sociales con contenido estratégico orientado al nicho inmobiliario, creando publicaciones que reflejan su estilo de trabajo, generan confianza y posicionan su expertise. También llevamos adelante la gestión de pauta publicitaria, optimizando campañas para aumentar su visibilidad y atraer potenciales compradores. El resultado: una marca sólida, clara y profesional, alineada a sus objetivos de crecimiento.',
      clientType: 'Asesora Inmobiliaria',
      instagramHandle: '@fabianacondesse',
      instagramPosts: [
        'https://www.instagram.com/p/DRPPotcjYfz/',
        'https://www.instagram.com/reel/DQrPoTnkv-L/',
        'https://www.instagram.com/reel/DQmGMMmjUsZ/',
        'https://www.instagram.com/reel/DRDkmGPjUU-/'
      ]
    },
    {
      id: 'pirka',
      clientName: 'Pirka',
      description:
        'Con Pirka trabajamos de manera integral para potenciar su presencia digital y comunicar el valor único de su marca. Desarrollamos y gestionamos contenido estratégico, acompañado de un profundo estudio de su nicho para conectar con su audiencia desde una estética y un mensaje auténticos. Creamos piezas con storytelling, priorizando la calidad visual y conceptual para transmitir el espíritu de la marca y generar impacto real. Además, llevamos adelante la gestión de pauta publicitaria para ampliar su alcance y atraer nuevos clientes. Acompañamos el seguimiento del manual de marca, optimizamos su página web para mejorar la experiencia de navegación y realizamos fotografías de producto que resaltan la calidad y el diseño de cada prenda. El resultado: una comunicación coherente, potente y emocional, alineada a la identidad de Pirka.',
      clientType: 'Indumentaria de diseño',
      instagramHandle: '@pirka.indumentaria',
      instagramPosts: [
        'https://www.instagram.com/reel/DPWnaXwETld/',
        'https://www.instagram.com/reel/DPlyXR3EWWE/',
        'https://www.instagram.com/reel/DPuEf9JD0xu/',
        'https://www.instagram.com/reel/DQxVJvDD0Fw/'
      ]
    },
    {
      id: 'sur-real',
      clientName: 'Sur Real',
      description:
        'Sur Real es una marca de indumentaria para bailar tango con presencia en Argentina y Miami, enfocada en un nicho altamente específico y apasionado. Nuestro trabajo se orientó a fortalecer su identidad en ambos mercados, conectando con bailarines, escuelas y amantes del tango que buscan prendas que acompañen el movimiento con estética y comodidad. Desarrollamos y gestionamos sus redes sociales con una estrategia cuidadosamente diseñada para su audiencia, creando contenido visual, informativo y emocional que refleja el espíritu tanguero de la marca. Complementamos esta estrategia con pauta publicitaria segmentada, optimizando campañas para llegar a potenciales clientes tanto en Argentina como en Estados Unidos. Además, colaboramos con la marca en diseño gráfico, creación de banners, piezas de merchandising y asesoramiento integral, asegurando una identidad visual coherente y profesional. El resultado: una presencia digital elegante, consistente y con proyección internacional, alineada al ADN de Sur Real y a las necesidades de su comunidad.',
      clientType: 'Indumentaria para tango',
      instagramHandle: '@surreal.tango',
      instagramPosts: [
        'https://www.instagram.com/reel/DPC9W46DCdB/',
        'https://www.instagram.com/reel/DPMhuqwETqF/',
        'https://www.instagram.com/reel/DO02aYCkaR-/',
        'https://www.instagram.com/reel/DPC9W46DCdB/'
      ]
    },
    {
      id: 'ibel-villarreal',
      clientName: 'Estudio Ibel Villarreal',
      description:
        'Estudio Ibel Villarreal es un espacio de formación y creación artística en Mar del Plata. Para ellos realizamos cobertura de eventos, capturando momentos clave de sus presentaciones y muestras, y producimos reels de convocatoria que transmiten la energía, emoción y pasión que caracteriza al estudio. Generamos contenido emocional e impactante para sus redes sociales, pensado para inspirar, atraer nuevos alumnos y fortalecer el vínculo con su comunidad. Es un cliente con el que trabajamos de manera eventual, pero con excelentes resultados y una relación de trabajo sólida y satisfactoria.',
      clientType: 'Estudio de danza',
      instagramHandle: '@estudio.ibelvillarreal',
      instagramPosts: [
        'https://www.instagram.com/reel/DPITf2cDeHn/',
        'https://www.instagram.com/reel/DPExV4EidHo/',
        'https://www.instagram.com/reel/DMdEM8MsK12/',
        'https://www.instagram.com/reel/DMO9VO_MV59/'
      ]
    },
    {
      id: 'papelitos-box',
      clientName: 'Papelitos Box',
      description:
        'Papelitos Box es una marca joven que está creciendo paso a paso, ofreciendo cajas temáticas que incluyen materiales de librería, útiles escolares y artículos para la oficina o la facultad. Acompañamos a la empresa desde sus primeros días, construyendo una identidad visual clara, fresca y reconocible. Desarrollamos su manual de marca y su logo, sentando las bases estéticas y comunicacionales para su crecimiento. Creamos y gestionamos contenido para sus redes sociales, con piezas pensadas para atraer a estudiantes, profesionales y amantes de la papelería. Además, administramos su pauta publicitaria, optimizando la llegada a nuevos públicos y potenciando sus ventas iniciales. También realizamos fotografía de producto, destacando la calidad, variedad y presentación de cada caja. El resultado: una marca coherente, con personalidad propia y lista para seguir expandiéndose en un mercado que valora lo visual, lo práctico y lo creativo.',
      clientType: 'Artículos de librería',
      instagramHandle: '@papelitosbox',
      instagramPosts: [
        'https://www.instagram.com/reel/DRj-lHDkR7C/',
        'https://www.instagram.com/reel/DRfkxSkkf3N/',
        'https://www.instagram.com/p/DRhp0PWkbFd/',
        'https://www.instagram.com/p/DRhY9kZkWpE/'
      ]
    },
    {
      id: 'ramiro-podesta',
      clientName: 'Ramiro Podestá',
      description:
        'Creación de contenido audiovisual para bailarín profesional de tango, capturando la esencia y expresión artística de sus presentaciones.',
      clientType: 'Bailarín de tango',
      instagramHandle: '@ramiropodesta',
      instagramPosts: [
        'https://www.instagram.com/reel/DLOS9S4Ohu8/',
        'https://www.instagram.com/reel/DK-ivw3J3rW/',
        'https://www.instagram.com/reel/DO2bGcuDGuj/',
        'https://www.instagram.com/reel/DO2mWujjQWJ/'
      ]
    }
  ]

  const consultingCases = [
    {
      client: 'Coso!',
      result: '+150% de consultas en 3 meses',
      testimonial:
        'La auditoría nos mostró exactamente qué estábamos haciendo mal. Ahora nos encuentran por Google.'
    },
    {
      client: 'Tienda de Decoración Casa Bella',
      result: 'Facturación online duplicada',
      testimonial:
        'Pasamos de vender solo en local a tener clientes de todo el país gracias a la estrategia digital.'
    },
    {
      client: 'Personal Trainer Julia Rojas',
      result: 'Agenda completa en 6 semanas',
      testimonial:
        'La combinación de web + redes funcionó increíble. Dejé de buscar clientes, ahora me buscan a mí.'
    }
  ]

  const websiteCases = [
    {
      client: 'Oferta de Lanzamiento',
      subtitle: 'Primeros clientes - Precio especial',
      url: null,
      image: 'https://via.placeholder.com/400x300/8b5cf6/ffffff?text=',
      isLive: false
    },
    {
      client: 'Oferta de Lanzamiento',
      subtitle: 'Primeros clientes - Precio especial',
      url: null,
      image: 'https://via.placeholder.com/400x300/9333ea/ffffff?text=',
      isLive: false
    },
    {
      client: 'Oferta de Lanzamiento',
      subtitle: 'Primeros clientes - Precio especial',
      url: null,
      image: 'https://via.placeholder.com/400x300/a855f7/ffffff?text=',
      isLive: false
    }
  ]

  const appCases = [
    {
      id: 'bipper-kai',
      name: 'Bipper Kai',
      shortDescription:
        'Un bipper digital que avisa a tus clientes cuando su pedido está listo. Ideal para restaurantes, cafés y locales con filas.',
      longDescription:
        'Bipper Kai es un producto real creado por Marketing Kai para resolver un problema concreto: avisar pedidos sin gritar nombres ni usar dispositivos físicos. Lo diseñamos, desarrollamos y pusimos en producción como una solución simple, usable desde el celular y lista para usar en cualquier local. Además, funciona como una muestra clara de nuestro enfoque: creamos productos digitales a medida, pensados para el negocio y listos para usarse en el mundo real.',
      icon: 'image',
      imagePath: './BipperKaiLogo.png',
      link: 'https://bipperkai.marketingkai.com/'
    },
    {
      id: 'chatbot-eventos',
      name: 'Chatbot para Eventos Culturales',
      shortDescription:
        'Asistente virtual que responde consultas sobre programación, horarios y reservas de eventos culturales en tiempo real.',
      longDescription:
        'Desarrollamos un chatbot inteligente para un centro cultural que automatiza la atención al público. Responde preguntas sobre la cartelera, horarios de funciones, disponibilidad de entradas y gestiona reservas. El bot está integrado con WhatsApp e Instagram, permitiendo que los visitantes obtengan información instantánea sin necesidad de llamar por teléfono.',
      icon: 'message-square',
      link: null
    }
  ]

  const CaseCard = ({ caseItem }: { caseItem: any }) => (
    <Card className='p-6 shadow-card hover:shadow-soft transition-all border-border/50'>
      <h4 className='text-lg font-bold mb-2'>{caseItem.client}</h4>
      <div className='text-primary font-semibold mb-3'>{caseItem.result}</div>
      <div className='relative'>
        <Quote className='absolute -top-2 -left-2 text-primary/20' size={24} />
        <p className='text-muted-foreground text-sm italic pl-4'>
          "{caseItem.testimonial}"
        </p>
      </div>
    </Card>
  )

  const WebsiteCard = ({ website }: { website: any }) => {
    const handleClick = () => {
      if (website.isLive && website.url) {
        window.open(website.url, '_blank')
      } else {
        setShowPromoModal(true)
      }
    }

    return (
      <Card className='overflow-hidden shadow-card hover:shadow-soft transition-all border-border/50 group cursor-pointer'>
        <div
          className='relative aspect-video overflow-hidden bg-gradient-to-br from-primary/10 to-secondary'
          onClick={handleClick}
        >
          <img
            src={website.image}
            alt={website.client}
            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
          />
          {!website.isLive && (
            <div className='absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center'>
              <div className='text-center text-white'>
                <Sparkles className='mx-auto mb-3' size={40} />
                <p className='text-xl font-bold mb-1'>{website.client}</p>
                <p className='text-sm opacity-90'>{website.subtitle}</p>
              </div>
            </div>
          )}
          {website.isLive && (
            <div className='absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity'>
              <ExternalLink size={20} className='text-primary' />
            </div>
          )}
        </div>
        <div className='p-4'>
          <h4 className='text-lg font-bold mb-2'>{website.client}</h4>
          {website.url && (
            <a
              href={website.url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary text-sm hover:underline flex items-center gap-1'
              onClick={e => e.stopPropagation()}
            >
              {website.url.replace('https://', '').replace('www.', '')}
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </Card>
    )
  }

  const ContentCreationCard = ({
    content
  }: {
    content: (typeof contentCreationCases)[0]
  }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
      loop: false,
      align: 'start'
    })
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
    const cardRef = useRef<HTMLDivElement>(null)

    // Intersection Observer for lazy loading
    useEffect(() => {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setIsVisible(true)
            }
          })
        },
        { threshold: 0.1 }
      )

      if (cardRef.current) {
        observer.observe(cardRef.current)
      }

      return () => {
        if (cardRef.current) {
          observer.unobserve(cardRef.current)
        }
      }
    }, [])

    // Embla carousel setup
    useEffect(() => {
      if (!emblaApi) return

      const onSelect = () => {
        setSelectedIndex(emblaApi.selectedScrollSnap())
      }

      setScrollSnaps(emblaApi.scrollSnapList())
      emblaApi.on('select', onSelect)
      onSelect()

      return () => {
        emblaApi.off('select', onSelect)
      }
    }, [emblaApi])

    const scrollPrev = () => emblaApi?.scrollPrev()
    const scrollNext = () => emblaApi?.scrollNext()
    const scrollTo = (index: number) => emblaApi?.scrollTo(index)

    const handleInstagramClick = () => {
      window.open(
        `https://instagram.com/${content.instagramHandle.replace('@', '')}`,
        '_blank'
      )
    }

    return (
      <div ref={cardRef}>
        <AccordionItem value={content.id} className='border-none'>
          <Card className='overflow-hidden shadow-card hover:shadow-soft transition-all border-border/50'>
            <AccordionTrigger className='px-6 py-4 hover:no-underline [&[data-state=open]]:border-b [&[data-state=open]]:border-border/50'>
              <div className='flex items-start gap-4 w-full text-left'>
                {/* Preview cerrado - solo visible cuando está cerrado */}
                <div className='shrink-0 w-20 h-28 md:w-28 md:h-36 rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-secondary'>
                  {isVisible ? (
                    <div className='w-full h-full relative'>
                      <iframe
                        src={
                          getInstagramEmbedUrl(content.instagramPosts[0]) || ''
                        }
                        className='absolute inset-0 w-[400px] h-[600px] border-0 scale-[0.2] md:scale-[0.25] origin-top-left pointer-events-none'
                        scrolling='no'
                        allowTransparency
                      />
                    </div>
                  ) : (
                    <div className='w-full h-full flex items-center justify-center'>
                      <Instagram className='text-primary/40' size={32} />
                    </div>
                  )}
                </div>

                <div className='flex-1'>
                  <div className='flex items-start justify-between gap-2'>
                    <div>
                      <h4 className='text-lg font-bold mb-1'>
                        {content.clientName}
                      </h4>
                      <span className='inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full'>
                        {content.clientType}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className='px-6 pb-6'>
              <div className='space-y-6 pt-4'>
                {/* Descripción */}
                <p className='text-muted-foreground leading-relaxed'>
                  {content.description}
                </p>

                {/* Carrusel de posts */}
                <div className='relative group'>
                  <div className='overflow-hidden' ref={emblaRef}>
                    <div className='flex gap-4'>
                      {content.instagramPosts.map((postUrl, index) => (
                        <div
                          key={index}
                          className='flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%]'
                        >
                          {isVisible ? (
                            <InstagramPost url={postUrl} />
                          ) : (
                            <div className='w-full aspect-square flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg'>
                              <div className='animate-pulse'>
                                <Instagram
                                  className='text-primary/40'
                                  size={48}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Navegación del carrusel */}
                  {content.instagramPosts.length > 1 && (
                    <>
                      <button
                        onClick={scrollPrev}
                        className='absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-2 transition-all opacity-0 group-hover:opacity-100'
                        aria-label='Previous'
                      >
                        <ChevronLeft className='text-primary' size={20} />
                      </button>
                      <button
                        onClick={scrollNext}
                        className='absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-2 transition-all opacity-0 group-hover:opacity-100'
                        aria-label='Next'
                      >
                        <ChevronRight className='text-primary' size={20} />
                      </button>

                      {/* Dots indicator */}
                      <div className='flex justify-center gap-2 mt-4'>
                        {scrollSnaps.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => scrollTo(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              index === selectedIndex
                                ? 'bg-primary w-6'
                                : 'bg-primary/30 hover:bg-primary/50'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Botón Ver en Instagram */}
                <Button
                  variant='outline'
                  className='w-full'
                  onClick={handleInstagramClick}
                >
                  <Instagram className='mr-2' size={18} />
                  Ver en Instagram {content.instagramHandle}
                </Button>
              </div>
            </AccordionContent>
          </Card>
        </AccordionItem>
      </div>
    )
  }

  const AppCard = ({ app }: { app: (typeof appCases)[0] }) => {
    const [isVisible, setIsVisible] = useState(false)
    const cardRef = useRef<HTMLDivElement>(null)

    // Intersection Observer for lazy loading
    useEffect(() => {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setIsVisible(true)
            }
          })
        },
        { threshold: 0.1 }
      )

      if (cardRef.current) {
        observer.observe(cardRef.current)
      }

      return () => {
        if (cardRef.current) {
          observer.unobserve(cardRef.current)
        }
      }
    }, [])

    const handleLinkClick = () => {
      if (app.link) {
        window.open(app.link, '_blank')
      }
    }

    return (
      <div ref={cardRef}>
        <AccordionItem value={app.id} className='border-none'>
          <Card className='overflow-hidden shadow-card hover:shadow-soft transition-all border-border/50'>
            <AccordionTrigger className='px-6 py-4 hover:no-underline [&[data-state=open]]:border-b [&[data-state=open]]:border-border/50'>
              <div className='flex items-start gap-4 w-full text-left'>
                {/* Ícono/Imagen */}
                <div className='flex-shrink-0'>
                  <div className='w-16 h-16 md:w-20 md:h-20 rounded-xl bg-primary/10 flex items-center justify-center p-3'>
                    {app.icon === 'image' && app.imagePath ? (
                      <img
                        src={app.imagePath}
                        alt={`${app.name} Logo`}
                        className='w-full h-full object-contain'
                      />
                    ) : (
                      <MessageCircle className='w-full h-full text-primary' />
                    )}
                  </div>
                </div>

                <div className='flex-1'>
                  <h4 className='text-lg font-bold mb-2'>{app.name}</h4>
                  <p className='text-sm text-muted-foreground'>
                    {app.shortDescription}
                  </p>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className='px-6 pb-6'>
              <div className='space-y-6 pt-4'>
                {/* Descripción larga */}
                <p className='text-muted-foreground leading-relaxed'>
                  {app.longDescription}
                </p>

                {/* Botón (solo si tiene link) */}
                {app.link && (
                  <Button
                    variant='default'
                    className='w-full bg-gradient-primary hover:opacity-90 transition-opacity'
                    onClick={handleLinkClick}
                  >
                    <ExternalLink className='mr-2' size={18} />
                    Ir a {app.name}
                  </Button>
                )}
              </div>
            </AccordionContent>
          </Card>
        </AccordionItem>
      </div>
    )
  }

  const PromoModal = () => (
    <Dialog open={showPromoModal} onOpenChange={setShowPromoModal}>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <div className='w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center mb-4'>
            <Sparkles className='text-white' size={32} />
          </div>
          <DialogTitle className='text-2xl font-bold'>
            ¡Oferta de Lanzamiento! 🚀
          </DialogTitle>
          <DialogDescription className='text-base'>
            Estamos comenzando nuestro servicio de desarrollo web y queremos que
            seas parte de nuestros primeros casos de éxito.
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-6 mt-4'>
          <div className='bg-gradient-primary/10 rounded-lg p-6 border-2 border-primary/20'>
            <h4 className='font-bold text-xl mb-3 text-center'>
              Precio Super Reducido
            </h4>
            <p className='text-center text-muted-foreground mb-4'>
              Obtén tu sitio web profesional con todos los beneficios incluidos
              a un precio especial de lanzamiento.
            </p>
            <div className='flex justify-center mb-4'>
              <div className='space-y-2 flex flex-col'>
                <div className='flex items-center gap-2 text-sm'>
                  <div className='w-2 h-2 rounded-full bg-primary'></div>
                  <span>Diseño profesional y responsive</span>
                </div>
                <div className='flex items-center gap-2 text-sm'>
                  <div className='w-2 h-2 rounded-full bg-primary'></div>
                  <span>Optimización SEO incluida</span>
                </div>
                <div className='flex items-center gap-2 text-sm'>
                  <div className='w-2 h-2 rounded-full bg-primary'></div>
                  <span>Hosting y dominio por 1 año</span>
                </div>
                <div className='flex items-center gap-2 text-sm'>
                  <div className='w-2 h-2 rounded-full bg-primary'></div>
                  <span>Soporte técnico incluido</span>
                </div>
              </div>
            </div>
          </div>

          <div className='text-center'>
            <p className='text-sm text-muted-foreground mb-4'>
              Esta oferta es limitada para los primeros clientes. ¡No pierdas la
              oportunidad de tener tu sitio web profesional a un precio
              increíble!
            </p>
          </div>

          <Button
            className='w-full bg-gradient-primary hover:opacity-90 transition-opacity'
            size='lg'
            onClick={handleWhatsAppPromo}
          >
            <MessageCircle size={20} className='mr-2' />
            Consultar por WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )

  return (
    <>
      <section id='cases' className='py-24 bg-secondary/30'>
        <div className='container mx-auto px-4'>
          <div className='max-w-6xl mx-auto'>
            <div className='text-center mb-16'>
              <h2 className='text-4xl md:text-5xl font-bold mb-4'>
                Casos de{' '}
                <span className='bg-gradient-primary bg-clip-text text-transparent'>
                  éxito
                </span>
              </h2>
              <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                Resultados reales de clientes que confiaron en nosotros
              </p>
            </div>

            <Tabs defaultValue='content-creation' className='w-full'>
              <TabsList className='grid w-full grid-cols-2 md:grid-cols-4 mb-12 max-w-3xl mx-auto'>
                <TabsTrigger value='content-creation'>
                  Creación de Contenido
                </TabsTrigger>
                <TabsTrigger value='apps'>Aplicaciones</TabsTrigger>
                <TabsTrigger value='websites'>Sitios Web</TabsTrigger>
                <TabsTrigger value='consulting'>Consultoría</TabsTrigger>
              </TabsList>

              <TabsContent value='content-creation'>
                <Accordion type='single' collapsible className='space-y-4'>
                  {contentCreationCases.map(content => (
                    <ContentCreationCard key={content.id} content={content} />
                  ))}
                </Accordion>
              </TabsContent>

              <TabsContent value='apps'>
                <Accordion type='single' collapsible className='space-y-4'>
                  {appCases.map(app => (
                    <AppCard key={app.id} app={app} />
                  ))}
                </Accordion>
              </TabsContent>

              <TabsContent value='websites'>
                <div className='grid md:grid-cols-3 gap-6'>
                  {websiteCases.map((website, index) => (
                    <WebsiteCard key={index} website={website} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value='consulting'>
                <div className='grid md:grid-cols-3 gap-6'>
                  {consultingCases.map((caseItem, index) => (
                    <CaseCard key={index} caseItem={caseItem} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <PromoModal />
    </>
  )
}

export default Cases
