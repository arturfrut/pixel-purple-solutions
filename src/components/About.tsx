import { Users, Target, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/card'
import teamIllustration from '@/assets/team-illustration.jpg'

const About = () => {
  const values = [
    {
      icon: Users,
      title: 'Equipo joven y dinámico',
      description:
        'Somos Artur, Elo y Mercedes: profesionales apasionados por el marketing digital y el desarrollo web.'
    },
    {
      icon: Target,
      title: 'Enfoque personalizado',
      description:
        'Entendemos las necesidades de emprendedores y pequeñas empresas porque somos como vos.'
    },
    {
      icon: Sparkles,
      title: 'Resultados medibles',
      description:
        'No vendemos humo: te mostramos datos concretos y mejoras reales en tu presencia digital.'
    }
  ]

  return (
    <section id='about' className='py-24 bg-secondary/30'>
      <div className='container mx-auto px-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold mb-4'>
              Quiénes{' '}
              <span className='bg-gradient-primary bg-clip-text text-transparent'>
                somos
              </span>
            </h2>
            <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
              Una agencia de marketing digital formada por profesionales jóvenes
              que entienden las necesidades del emprendedor moderno
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-12 items-center mb-16'>
            <div>
              <img
                src={teamIllustration}
                alt='Equipo de trabajo'
                className='rounded-2xl shadow-card w-full'
              />
            </div>
            <div className='space-y-6'>
              <h3 className='text-3xl font-bold'>Tu aliado digital</h3>
              <p className='text-lg text-muted-foreground'>
                Transformamos tus problemas en impulsos de crecimiento.{' '}
              </p>
              <p className='text-lg text-muted-foreground'>
                Somos un equipo de confianza: una profesional de marketing que
                entiende tu mercado y un ingeniero que aplica IA y tecnología
                moderna para llevar tus procesos al siguiente nivel. Soluciones
                claras, útiles y accesibles para negocios pequeños y medianos.
              </p>
            </div>
          </div>


        </div>
      </div>
    </section>
  )
}

export default About
