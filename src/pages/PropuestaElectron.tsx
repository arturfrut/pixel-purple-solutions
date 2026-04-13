import { useState } from 'react'
import {
    Globe,
    MessageCircle,
    Bot,
    Users,
    ArrowRight,
    X,
    ExternalLink,
    Sparkles,
    Bell,
    Radio,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const WHATSAPP_NUMBER = '5492236028317'

const openWhatsApp = (message: string) => {
    window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
        '_blank'
    )
}

interface ModalContent {
    fullDescription: string
    benefits: string[]
    includes: string[]
    note?: string
}

interface Service {
    icon: React.ElementType
    title: string
    description: string
    modalContent: ModalContent
    whatsappMessage: string
    tag?: string
}

interface ServiceModalProps {
    isOpen: boolean
    onClose: () => void
    service: Service
}

const ServiceModal = ({ isOpen, onClose, service }: ServiceModalProps) => {
    if (!isOpen) return null
    const Icon = service.icon

    return (
        <div
            className='fixed inset-0 z-50 flex items-center justify-center p-4'
            style={{ background: 'rgba(0,0,0,0.45)' }}
            onClick={onClose}
        >
            <div
                className='bg-background rounded-2xl shadow-soft w-full max-w-lg max-h-[85vh] overflow-y-auto border border-border'
                onClick={e => e.stopPropagation()}
            >
                <div className='p-6'>
                    <div className='flex items-start justify-between mb-5'>
                        <div className='flex items-center gap-3'>
                            <div className='w-11 h-11 bg-gradient-primary rounded-xl flex items-center justify-center shrink-0'>
                                <Icon className='text-white' size={22} />
                            </div>
                            <h2 className='text-xl font-bold leading-tight'>{service.title}</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className='text-muted-foreground hover:text-foreground transition-colors ml-4 mt-1'
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <p className='text-muted-foreground text-sm leading-relaxed mb-5'>
                        {service.modalContent.fullDescription}
                    </p>

                    <div className='mb-5'>
                        <h3 className='text-sm font-semibold mb-3 text-foreground uppercase tracking-wide'>
                            Beneficios
                        </h3>
                        <ul className='space-y-2'>
                            {service.modalContent.benefits.map((b, i) => (
                                <li key={i} className='flex items-start gap-2 text-sm text-muted-foreground'>
                                    <span className='w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0' />
                                    {b}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='mb-5'>
                        <h3 className='text-sm font-semibold mb-3 text-foreground uppercase tracking-wide'>
                            Incluye
                        </h3>
                        <ul className='space-y-2'>
                            {service.modalContent.includes.map((inc, i) => (
                                <li key={i} className='flex items-start gap-2 text-sm text-muted-foreground'>
                                    <span className='w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0' />
                                    {inc}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {service.modalContent.note && (
                        <div className='bg-secondary rounded-lg px-4 py-3 mb-5'>
                            <p className='text-xs text-secondary-foreground leading-relaxed'>
                                <span className='font-semibold'>Nota: </span>
                                {service.modalContent.note}
                            </p>
                        </div>
                    )}

                    <Button
                        className='w-full rounded-full'
                        onClick={() => openWhatsApp(service.whatsappMessage)}
                    >
                        Consultar por este servicio
                        <ExternalLink size={15} className='ml-2' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

const services: Service[] = [
    {
        icon: Globe,
        title: 'Nueva Web',
        tag: 'Recomendado',
        description:
            'Imagen moderna para un local con historia. Conservás todo el sistema actual, pero con una presentación que genera confianza desde el primer click.',
        whatsappMessage:
            'Hola! Te escribo desde la propuesta de Marketing Kai para Electron. Me interesa hablar sobre el servicio de nueva web.',
        modalContent: {
            fullDescription:
                'Electron tiene 45 años de trayectoria, pero su web actual no lo refleja. Una nueva web no reemplaza lo que funciona — lo potencia. El sistema de estado de reparaciones se mantiene, pero integrado de forma accesible y visualmente coherente. Además, pasás de http a https, eliminando el cartel de "sitio no seguro" que aleja clientes.',
            benefits: [
                'Imagen moderna que refleja la solidez y experiencia del local',
                'Acceso directo y claro al estado de reparación (sin tener que saber la URL exacta)',
                'Certificado HTTPS: el cartel de "sitio no seguro" desaparece',
                'Información presentada de forma amigable y ordenada',
                'Dominio propio (electronmdp.com.ar o electron.com.ar) bien posicionado en Google',
                'Diseño responsive: se ve bien en celular, tablet y computadora',
            ],
            includes: [
                'Diseño y desarrollo de la web completa',
                'Integración con el sistema de reparaciones actual',
                'Certificado SSL (HTTPS)',
                'Optimización básica de SEO',
                'Hosting y dominio por 1 año',
                'Hasta 3 rondas de revisiones',
            ],
            note:
                'Para aprovechar al máximo el posicionamiento actual y conservar el dominio existente, es ideal coordinar con el desarrollador actual. Si eso no es posible, igualmente se puede construir una web nueva con dominio propio.',
        },
    },
    {
        icon: MessageCircle,
        title: 'Automatización de Aviso por WhatsApp',
        description:
            'Cuando el pedido está listo, un solo click en el sistema dispara un mensaje de WhatsApp automático al cliente. Sin copiar, sin buscar el número, sin perder tiempo.',
        whatsappMessage:
            'Hola! Te escribo desde la propuesta de Marketing Kai para Electron. Me interesa el servicio de automatización de aviso por WhatsApp.',
        modalContent: {
            fullDescription:
                'Hoy, avisar que una reparación está lista implica buscar el número, abrir WhatsApp y escribir el mensaje. Con esta automatización, ese proceso se reduce a un botón dentro del sistema que ya usan. El mensaje sale solo, al cliente correcto, con el texto adecuado.',
            benefits: [
                'Ahorro real de tiempo en la operación diaria',
                'Menos errores: no se confunde el número ni el pedido',
                'El cliente recibe el aviso más rápido',
                'Mejora la percepción del servicio sin esfuerzo extra',
                'Implementación rápida sin cambiar cómo trabajan hoy',
            ],
            includes: [
                'Integración del botón de aviso en el CRM actual',
                'Mensaje automático personalizable',
                'Pruebas y ajustes',
                'Capacitación de uso',
            ],
            note:
                'Para implementar esto es necesario coordinar con el desarrollador del sistema actual y tener acceso a la API de WhatsApp Business.',
        },
    },
    {
        icon: Bot,
        title: 'Chatbot con IA',
        description:
            'Un asistente que responde 24/7, consulta el estado de reparaciones, deriva a una persona cuando hace falta y te libera de estar pendiente del celular todo el tiempo.',
        whatsappMessage:
            'Hola! Te escribo desde la propuesta de Marketing Kai para Electron. Me interesa el servicio de chatbot con IA.',
        modalContent: {
            fullDescription:
                'Un chatbot inteligente integrado a WhatsApp que atiende las consultas más frecuentes de forma automática: horarios, preguntas sobre el servicio, estado de la reparación. Cuando el cliente lo necesita, puede pedir hablar con una persona y el chat se transfiere. Esto significa que solo intervenís cuando realmente es necesario.',
            benefits: [
                'Atención 24/7 sin estar conectado permanentemente',
                'El cliente puede consultar el estado de su reparación sin llamar',
                'Solo intervenís cuando hay algo que el bot no puede resolver',
                'Mejora la experiencia del cliente y la imagen del local',
                'Escalable: se le pueden agregar funciones con el tiempo',
            ],
            includes: [
                'Desarrollo e integración del chatbot en WhatsApp',
                'Respuestas automáticas a preguntas frecuentes',
                'Consulta de estado de reparación por número de ticket',
                'Derivación a humano cuando el cliente lo solicita',
                'Aviso automático cuando el pedido está listo',
                'Configuración y pruebas',
            ],
            note:
                'Para la consulta de estado de reparación en tiempo real, es necesario coordinar con el desarrollador actual para acceder a los datos del sistema.',
        },
    },
    {
        icon: Users,
        title: 'Gestión de Redes Sociales',
        description:
            'Electron ya tiene una posición privilegiada. Las redes sociales bien manejadas multiplican eso. Nosotros nos ocupamos de todo para que vos solo te enfoques en el local.',
        whatsappMessage:
            'Hola! Te escribo desde la propuesta de Marketing Kai para Electron. Me interesa hablar sobre la gestión de redes sociales.',
        modalContent: {
            fullDescription:
                'Un local con 45 años de trayectoria tiene algo que los nuevos no pueden comprar: confianza y experiencia. Las redes sociales son la forma de comunicar eso al mundo digital. Sabemos que gestionarlas lleva tiempo y conocimiento — por eso nos encargamos nosotros, de forma profesional y con estrategia, para que puedas delegarlas completamente.',
            benefits: [
                'Presencia digital activa sin dedicarle tiempo vos',
                'Contenido estratégico que refleja la experiencia del local',
                'Mayor alcance y nuevos clientes potenciales',
                'Crecimiento progresivo y medible',
                'Posibilidad de campañas publicitarias segmentadas',
            ],
            includes: [
                'Estrategia de contenido personalizada',
                'Publicaciones periódicas en las redes acordadas',
                'Stories y contenido efímero',
                'Monitoreo y respuesta a comentarios',
                'Informe mensual de resultados',
                'Campañas de publicidad pagas (opcional, según presupuesto)',
            ],
            note:
                'Ofrecemos distintos paquetes con entrada progresiva, adaptados a lo que quieran invertir. Se puede empezar pequeño y escalar.',
        },
    },
]

const bonusCards = [
    {
        icon: Bell,
        title: 'Recordatorio automático de retiro',
        description:
            'Si un cliente no retiró su reparación en cierta cantidad de días, el sistema le manda un mensaje automático recordándoselo. Menos artículos acumulados, mejor gestión.',
    },
    {
        icon: Radio,
        title: 'Lista de difusión para ventas',
        description:
            'Electron vende electrodomésticos recuperados. Con esta herramienta podés seleccionar una lista de contactos (hoteles, negocios, etc.) y mandarles el mismo mensaje a todos a la vez: "Tengo esta heladera, ¿te interesa?".',
    },
]

const PropuestaElectron = () => {
    const [selectedService, setSelectedService] = useState<number | null>(null)

    return (
        <div className='min-h-screen bg-background'>
            {/* Header */}
            <header className='sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/50'>
                <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
                    <div
                        className='flex items-center gap-2 text-xl font-bold bg-gradient-primary bg-clip-text text-transparent cursor-pointer'
                        onClick={() => window.open('/', '_self')}
                    >            <img src='/violetLogo.png' className='h-9 w-auto' alt='Marketing Kai' />
                        Marketing KAI
                    </div>
                    <Button
                        variant='outline'
                        className='rounded-full text-sm'
                        onClick={() => window.open('/', '_self')}
                    >
                        <ExternalLink size={14} className='mr-2' />
                        Ir al sitio
                    </Button>
                </div>
            </header>

            {/* Hero */}
            <section className='py-20 px-4' style={{ background: 'var(--gradient-hero)' }}>
                <div className='container mx-auto max-w-3xl text-center'>
                    <div className='inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-6'>
                        <Sparkles size={14} />
                        Propuesta personalizada
                    </div>
                    <h1 className='text-4xl md:text-5xl font-bold mb-5 leading-tight'>
                        Pensada especialmente{' '}
                        <span className='bg-gradient-primary bg-clip-text text-transparent'>
                            para Electron
                        </span>
                    </h1>
                    <p className='text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8'>
                        Hola Lorena, esta propuesta fue elaborada por Marketing Kai teniendo en cuenta
                        la realidad y el potencial específico de tu local. Cada servicio que ves acá
                        fue pensado para ustedes.
                    </p>
                    <p className='text-sm text-muted-foreground'>
                        Cualquier duda, podés escribirnos directamente.
                    </p>
                </div>
            </section>

            {/* Services */}
            <section className='py-20 px-4'>
                <div className='container mx-auto max-w-6xl'>
                    <div className='text-center mb-14'>
                        <h2 className='text-3xl md:text-4xl font-bold mb-3'>
                            Servicios{' '}
                            <span className='bg-gradient-primary bg-clip-text text-transparent'>
                                recomendados
                            </span>
                        </h2>
                        <p className='text-muted-foreground max-w-xl mx-auto'>
                            Seleccionamos lo que más valor puede aportarle a Electron hoy.
                        </p>
                    </div>

                    <div className='grid md:grid-cols-2 gap-6'>
                        {services.map((service, index) => {
                            const Icon = service.icon
                            return (
                                <Card
                                    key={index}
                                    className={`p-6 shadow-card hover:shadow-soft transition-all border-border/50 flex flex-col ${service.tag ? 'ring-2 ring-primary/50 relative' : ''
                                        }`}
                                >
                                    {service.tag && (
                                        <div className='absolute -top-3 left-6 bg-gradient-primary text-white px-4 py-1 rounded-full text-xs font-medium'>
                                            {service.tag}
                                        </div>
                                    )}
                                    <div className='flex items-start gap-4 mb-4'>
                                        <div className='w-11 h-11 bg-gradient-primary rounded-xl flex items-center justify-center shrink-0'>
                                            <Icon className='text-white' size={22} />
                                        </div>
                                        <h3 className='text-lg font-bold leading-tight pt-1'>{service.title}</h3>
                                    </div>
                                    <p className='text-muted-foreground text-sm leading-relaxed flex-1 mb-5'>
                                        {service.description}
                                    </p>
                                    <Button
                                        variant='outline'
                                        className='rounded-full w-full'
                                        onClick={() => setSelectedService(index)}
                                    >
                                        <ArrowRight size={15} className='mr-2' />
                                        Ver detalle
                                    </Button>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Bonus section */}
            <section className='py-12 px-4 pb-20'>
                <div className='container mx-auto max-w-6xl'>
                    <div className='text-center mb-10'>
                        <div className='inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-4'>
                            <Sparkles size={14} />
                            Ideas extra
                        </div>
                        <h2 className='text-2xl font-bold mb-2'>Bonus: ideas para seguir creciendo</h2>
                        <p className='text-muted-foreground text-sm max-w-lg mx-auto'>
                            Estas ideas surgieron pensando en Electron específicamente. Son complementos que
                            se pueden agregar más adelante.
                        </p>
                    </div>

                    <div className='grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto'>
                        {bonusCards.map((bonus, i) => {
                            const Icon = bonus.icon
                            return (
                                <Card key={i} className='p-5 border-border/40 border-dashed shadow-none'>
                                    <div className='flex items-center gap-3 mb-3'>
                                        <div className='w-9 h-9 bg-secondary rounded-lg flex items-center justify-center shrink-0'>
                                            <Icon className='text-primary' size={18} />
                                        </div>
                                        <h3 className='text-sm font-semibold leading-tight'>{bonus.title}</h3>
                                    </div>
                                    <p className='text-xs text-muted-foreground leading-relaxed'>
                                        {bonus.description}
                                    </p>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <footer className='border-t border-border/50 py-12 px-4 bg-muted/30'>
                <div className='container mx-auto max-w-2xl text-center'>
                    <p className='text-muted-foreground text-sm mb-2'>
                        Esta propuesta fue elaborada por
                    </p>
                    <div className='flex items-center justify-center gap-2 font-bold text-lg bg-gradient-primary bg-clip-text text-transparent mb-6'>
                        <img src='/violetLogo.png' className='h-7 w-auto' alt='Marketing Kai' />
                        Marketing KAI
                    </div>
                    <p className='text-muted-foreground text-sm mb-6 max-w-md mx-auto'>
                        ¿Querés hablar sobre alguno de estos servicios o tenés alguna pregunta? Escribinos por WhatsApp.
                    </p>
                    <Button
                        className='rounded-full px-8'
                        onClick={() =>
                            openWhatsApp(
                                'Hola! Estoy viendo la propuesta de Marketing Kai para Electron y quiero hacer una consulta.'
                            )
                        }
                    >
                        Hablar con Artur de Marketing Kai
                        <ExternalLink size={15} className='ml-2' />
                    </Button>
                </div>
            </footer>

            {/* Modal */}
            {selectedService !== null && (
                <ServiceModal
                    isOpen={true}
                    onClose={() => setSelectedService(null)}
                    service={services[selectedService]}
                />
            )}
        </div>
    )
}

export default PropuestaElectron