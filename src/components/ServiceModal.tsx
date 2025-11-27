import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Check, MessageCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface ServiceModalContent {
  fullDescription: string
  benefits: string[]
  includes?: string[]
}

interface ServiceModalProps {
  isOpen: boolean
  onClose: () => void
  icon: LucideIcon
  title: string
  content: ServiceModalContent
  onConsult: () => void
}

const ServiceModal = ({
  isOpen,
  onClose,
  icon: Icon,
  title,
  content,
  onConsult
}: ServiceModalProps) => {
  const handleConsult = () => {
    onConsult()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <div className='w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center mb-4'>
            <Icon className='text-white' size={32} />
          </div>
          <DialogTitle className='text-2xl font-bold'>{title}</DialogTitle>
          <DialogDescription className='text-base'>
            {content.fullDescription}
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-6 mt-4'>
          {/* Beneficios */}
          <div>
            <h4 className='font-semibold text-lg mb-3 flex items-center gap-2'>
              <Check className='text-primary' size={20} />
              Beneficios principales
            </h4>
            <ul className='space-y-2'>
              {content.benefits.map((benefit, idx) => (
                <li key={idx} className='flex items-start gap-2 text-sm'>
                  <Check
                    className='text-primary mt-0.5 flex-shrink-0'
                    size={16}
                  />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Incluye */}
          {content.includes?.length > 0 && (
            <div className='bg-muted/50 rounded-lg p-4'>
              <h4 className='font-semibold text-lg mb-3'>¿Qué incluye?</h4>
              <ul className='space-y-2'>
                {content.includes.map((item, idx) => (
                  <li key={idx} className='flex items-start gap-2 text-sm'>
                    <Check
                      className='text-primary mt-0.5 flex-shrink-0'
                      size={16}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Botón de consulta */}
          <Button
            className='w-full bg-gradient-primary hover:opacity-90 transition-opacity'
            size='lg'
            onClick={handleConsult}
          >
            <MessageCircle size={20} className='mr-2' />
            Consultar por WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ServiceModal
