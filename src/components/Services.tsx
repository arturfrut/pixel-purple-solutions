import { Globe, Code, Search, BarChart3, Users, MapPin, Sparkles, MessageCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Services = () => {
  const handleConsult = (service: string) => {
    const message = `Hola! Quiero consultar sobre: ${service}`;
    window.open(`https://wa.me/5491112345678?text=${encodeURIComponent(message)}`, '_blank');
  };

  const services = [
    {
      icon: Globe,
      title: 'Web Institucional Simple',
      description: 'Tu carta de presentación digital profesional. Sitio web de 3-5 secciones, diseño moderno y responsive.',
      examples: 'Ideal para: consultoras, profesionales independientes, pequeños comercios',
      featured: false,
    },
    {
      icon: Code,
      title: 'Micro Aplicaciones',
      description: 'Herramientas web personalizadas para resolver necesidades específicas de tu negocio.',
      examples: 'Calculadoras, formularios avanzados, sistemas de turnos, dashboards',
      featured: false,
    },
    {
      icon: Sparkles,
      title: 'Auditoría de Presencia Digital',
      description: 'Análisis completo de tu situación actual: web, redes, Google, competencia. Informe con plan de acción.',
      examples: 'Detectamos oportunidades perdidas y te mostramos el camino exacto a seguir',
      featured: true,
    },
    {
      icon: Search,
      title: 'Posicionamiento en Google',
      description: 'Estrategia SEO para que te encuentren cuando buscan lo que ofrecés.',
      examples: 'Palabras clave, contenido optimizado, mejoras técnicas, seguimiento mensual',
      featured: false,
    },
    {
      icon: BarChart3,
      title: 'Consultoría en Marketing Digital',
      description: 'Te ayudamos a definir tu estrategia digital completa: desde la web hasta las redes sociales.',
      examples: 'Sesiones 1 a 1, planes personalizados, seguimiento de resultados',
      featured: false,
    },
    {
      icon: Users,
      title: 'Community Manager',
      description: 'Gestión profesional de tus redes sociales: contenido, diseño, calendario y respuesta a mensajes.',
      examples: 'Instagram, Facebook, LinkedIn - Contenido planificado que vende',
      featured: false,
    },
    {
      icon: MapPin,
      title: 'Optimización Google My Business',
      description: 'Configuración y optimización de tu perfil de negocio en Google para aparecer en búsquedas locales.',
      examples: 'Más visibilidad local, reseñas gestionadas, fotos profesionales',
      featured: false,
    },
  ];

  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Nuestros <span className="bg-gradient-primary bg-clip-text text-transparent">servicios</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Soluciones digitales diseñadas para impulsar tu negocio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className={`p-6 shadow-card hover:shadow-soft transition-all border-border/50 ${
                  service.featured ? 'ring-2 ring-primary/50 relative' : ''
                }`}
              >
                {service.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Destacado
                  </div>
                )}
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
                  {service.description}
                </p>
                <p className="text-sm text-primary/80 mb-4 italic">
                  {service.examples}
                </p>
                <Button 
                  variant="outline" 
                  className="w-full rounded-full"
                  onClick={() => handleConsult(service.title)}
                >
                  <MessageCircle size={16} className="mr-2" />
                  Consultar
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
