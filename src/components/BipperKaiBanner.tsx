'use client'

import { useState } from 'react'
import { ChevronDown, ExternalLink } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const BipperKaiBanner = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section className='py-8 bg-secondary/20'>
      <div className='container mx-auto px-4'>
        <Card
          className={`
            max-w-5xl mx-auto overflow-hidden shadow-card border-border/50 
            transition-all duration-300 cursor-pointer
            ${isExpanded ? 'shadow-soft' : 'hover:shadow-soft'}
          `}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Sección colapsada - siempre visible */}
          <div className='p-6 md:p-8'>
            <div className='flex items-start gap-4 md:gap-6'>
              {/* Logo */}
              <div className='flex-shrink-0'>
                <div className='w-16 h-16 md:w-20 md:h-20 rounded-xl bg-primary/10 flex items-center justify-center p-3'>
                  <img
                    src='./BipperKaiLogo.png'
                    alt='Bipper Kai Logo'
                    className='w-full h-full object-contain'
                  />
                </div>
              </div>

              {/* Contenido */}
              <div className='flex-1 min-w-0'>
                <div className='flex items-start justify-between gap-4'>
                  <div>
                    <h3 className='text-2xl md:text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent'>
                      Bipper Kai
                    </h3>
                    <p className='text-muted-foreground text-sm md:text-base'>
                      Un bipper digital que avisa a tus clientes cuando su
                      pedido está listo. Ideal para restaurantes, cafés y
                      locales con filas.
                    </p>
                  </div>

                  {/* Icono expandir */}
                  <div className='flex-shrink-0'>
                    <div
                      className={`
                        w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center
                        transition-transform duration-300
                        ${isExpanded ? 'rotate-180' : ''}
                      `}
                    >
                      <ChevronDown className='text-primary' size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sección expandida */}
          <div
            className={`
              overflow-hidden transition-all duration-300 ease-in-out
              ${isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}
            `}
          >
            <div className='px-6 md:px-8 pb-6 md:pb-8 border-t border-border/50 pt-6'>
              <div className='space-y-6'>
                {/* Descripción expandida */}
                <div className='bg-gradient-primary/5 rounded-lg p-6'>
                  <h4 className='font-semibold text-lg mb-3'>
                    ¿Por qué Bipper Kai?
                  </h4>
                  <p className='text-muted-foreground leading-relaxed mb-4'>
                    <strong>Bipper Kai</strong> es un producto real creado por
                    Marketing Kai para resolver un problema concreto: avisar
                    pedidos sin gritar nombres ni usar dispositivos físicos.
                  </p>

                  <p className='text-muted-foreground leading-relaxed mb-4'>
                    Lo diseñamos, desarrollamos y pusimos en producción como una
                    solución simple, usable desde el celular y lista para usar
                    en cualquier local.
                  </p>

                  <p className='text-muted-foreground leading-relaxed'>
                    Además, funciona como una muestra clara de nuestro enfoque:
                    <strong>creamos productos digitales a medida</strong>,
                    pensados para el negocio y listos para usarse en el mundo
                    real.
                  </p>
                </div>

                {/* Botón CTA */}
                <div className='pt-2' onClick={e => e.stopPropagation()}>
                  <a
                    href='https://bipperkai.marketingkai.com/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='block'
                  >
                    <Button
                      size='lg'
                      className='w-full bg-gradient-primary hover:opacity-90 transition-opacity'
                    >
                      <ExternalLink className='mr-2' size={20} />
                      Ir a Bipper Kai
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

export default BipperKaiBanner
