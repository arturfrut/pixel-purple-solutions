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
  ClipboardList,
  ExternalLink,
  Instagram,
  MessageCircle,
  Quote,
  Sparkles
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { appCases, consultingCases, contentCreationCases, websiteCases } from './casesData'

const getInstagramEmbedUrl = (postUrl: string) => {
  const cleanUrl = postUrl.split('?')[0].split('/embed')[0]
  const match = cleanUrl.match(/\/(p|reel)\/([^\/]+)/)
  if (match) {
    const postId = match[2]
    return `https://www.instagram.com/p/${postId}/embed/`
  }
  return null
}

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

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

  const CaseCard = ({ caseItem }: { caseItem }) => (
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

  const WebsiteCard = ({ website }: { website }) => {
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
                {/* Descripción - solo mostrar si no está vacía */}
                {content.description && (
                  <p className='text-muted-foreground leading-relaxed'>
                    {content.description}
                  </p>
                )}

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
      const scrollTarget = app.scrollTo
      if (scrollTarget) {
        scrollToSection(scrollTarget)
      } else if (app.link) {
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
                    ) : app.icon === 'clipboard' ? (
                      <ClipboardList className='w-full h-full text-primary' />
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
                {(app.link || app.scrollTo) && (
                  <Button
                    variant='default'
                    className='w-full bg-gradient-primary hover:opacity-90 transition-opacity'
                    onClick={handleLinkClick}
                  >
                    <ExternalLink className='mr-2' size={18} />
                    {app.scrollTo ? 'Ir al diagnóstico' : `Ir a ${app.name}`}
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
