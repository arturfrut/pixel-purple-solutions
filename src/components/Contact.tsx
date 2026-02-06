import { Mail, MapPin, MessageCircle, Instagram } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

const Contact = () => {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const whatsappMessage = `Hola, soy ${formData.name} y te escribo sobre: ${formData.message}`
    window.open(
      `https://wa.me/5492235068676?text=${encodeURIComponent(whatsappMessage)}`,
      '_blank'
    )

    toast({
      title: 'Redirigiendo a WhatsApp',
      description: 'Te vamos a responder a la brevedad'
    })
  }

  return (
    <section id='contact' className='py-24'>
      <div className='container mx-auto px-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold mb-4'>
              Hablemos de tu{' '}
              <span className='bg-gradient-primary bg-clip-text text-transparent'>
                proyecto
              </span>
            </h2>
            <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
              Estamos listos para ayudarte a crecer digitalmente
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-12'>
            {/* Contact Info */}
            <div className='space-y-8'>
              <div>
                <h3 className='text-2xl font-bold mb-6'>Contactanos</h3>
                <div className='space-y-4'>
                  <a
                    href='https://wa.me/5492235068676'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors group'
                  >
                    <div className='w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform'>
                      <MessageCircle className='text-white' size={24} />
                    </div>
                    <div>
                      <div className='font-medium'>WhatsApp</div>
                      <div className='text-muted-foreground'>
                        +54 9 223 5068676
                      </div>
                    </div>
                  </a>

                  <div className='flex items-center gap-4 p-4 rounded-xl'>
                    <div className='w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center'>
                      <Mail className='text-white' size={24} />
                    </div>
                    <div>
                      <div className='font-medium'>Email</div>
                      <div className='text-muted-foreground'>
                        contacto@marketingkai.com
                      </div>
                    </div>
                  </div>

                  <div className='flex items-center gap-4 p-4 rounded-xl'>
                    <div className='w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center'>
                      <MapPin className='text-white' size={24} />
                    </div>
                    <div>
                      <div className='font-medium'>Ubicación</div>
                      <div className='text-muted-foreground'>
                        Buenos Aires, Argentina
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className='font-bold mb-4'>Seguinos en redes</h4>
                <div className='flex gap-4'>
                  <a
                    href='https://instagram.com/marketingkai.ok'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-3 group'
                  >
                    <div className='w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform'>
                      <Instagram className='text-white' size={24} />
                    </div>
                    <span className='font-medium text-foreground group-hover:text-primary transition-colors'>
                      @marketingkai.ok
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className='p-8 shadow-card flex flex-col'>
              <h3 className='text-2xl font-bold mb-6'>Envianos un mensaje</h3>
              <form
                onSubmit={handleSubmit}
                className='flex flex-col flex-1 gap-4'
              >
                <div>
                  <Input
                    placeholder='Tu nombre'
                    value={formData.name}
                    onChange={e =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className='rounded-lg'
                  />
                </div>

                <div className='flex-1 flex flex-col'>
                  <Textarea
                    placeholder='Contanos sobre tu proyecto...'
                    value={formData.message}
                    onChange={e =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    className='rounded-lg flex-1 resize-none'
                  />
                </div>
                <Button type='submit' className='w-full rounded-full' size='lg'>
                  <MessageCircle className='mr-2' />
                  Enviar por WhatsApp
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
