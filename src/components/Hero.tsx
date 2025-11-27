import heroBg from '@/assets/hero-bg.jpg'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const Hero = () => {
  const scrollToServices = () => {
    const element = document.getElementById('services')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToDiagnostic = () => {
    const element = document.getElementById('diagnostic')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id='hero'
      className='relative min-h-screen flex items-center justify-center overflow-hidden'
    >
      {/* Background */}
      <div className='absolute inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-hero' />
        <img
          src={heroBg}
          alt='Hero background'
          className='w-full h-full object-cover opacity-30'
        />
      </div>

      {/* Content */}
      <div className='container mx-auto px-4 py-32 relative z-10'>
        <div className='max-w-4xl mx-auto text-center space-y-8'>
          <h1 className='text-5xl md:text-7xl font-bold leading-tight'>
            Tu presencia digital{' '}
            <span className='bg-gradient-primary bg-clip-text text-transparent'>
              comienza aquí
            </span>
          </h1>

          <p className='text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto'>
            Impulsamos tu negocio con marketing y webs que te inspiran y llevan
            mas adelante en un mundo digital{' '}
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center pt-4'>
            <Button
              size='lg'
              className='rounded-full text-lg px-8 shadow-soft hover:shadow-lg transition-all'
              onClick={scrollToDiagnostic}
            >
              Generar diagnóstico gratis
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='rounded-full text-lg px-8'
              onClick={scrollToServices}
            >
              Ver servicios
              <ArrowRight className='ml-2' />
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative gradient orbs */}
      <div className='absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl' />
      <div className='absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl' />
    </section>
  )
}

export default Hero
