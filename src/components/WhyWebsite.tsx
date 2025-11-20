import { Globe, Search, Shield, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

const WhyWebsite = () => {
  const reasons = [
    {
      icon: Globe,
      title: 'Tu hogar digital',
      description: 'Tu sitio web es el único espacio que controlás 100%. No dependés de algoritmos ni cambios de plataforma.',
    },
    {
      icon: Search,
      title: 'Aparecer en Google',
      description: 'Cuando alguien busca lo que ofrecés, tu web puede estar ahí. Las redes no aparecen en búsquedas.',
    },
    {
      icon: Shield,
      title: 'Credibilidad profesional',
      description: 'Una web transmite seriedad y confianza. Es tu carta de presentación disponible 24/7.',
    },
    {
      icon: TrendingUp,
      title: 'Información organizada',
      description: 'En tu web mostrás todo lo que hacés, de forma clara y completa. Sin límites de caracteres.',
    },
    {
      icon: Users,
      title: 'Complemento perfecto',
      description: 'Las redes atraen y generan comunidad. La web convierte y profesionaliza. Juntos son imbatibles.',
    },
    {
      icon: CheckCircle,
      title: 'Es tuya para siempre',
      description: 'Tu dominio, tu contenido, tus reglas. Nadie puede cerrar tu cuenta ni cambiar las condiciones.',
    },
  ];

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              ¿Por qué necesitás{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">un sitio web?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tu sitio web no compite con las redes sociales: las complementa
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-card mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">El sistema completo</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Globe className="text-white" size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Tu sitio web</h4>
                    <p className="text-muted-foreground text-sm">
                      Base sólida y profesional. Tu espacio central donde mostrás todo: servicios, portfolio, contacto. 
                      Aparecés en Google cuando te buscan.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="text-white" size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Tus redes sociales</h4>
                    <p className="text-muted-foreground text-sm">
                      Movimiento diario, comunidad activa, alcance rápido. Generás contenido que dirige tráfico a tu web. 
                      Construís relaciones con tu audiencia.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 p-6 bg-gradient-primary/10 rounded-xl border border-primary/20">
              <p className="text-center text-lg font-medium">
                🚀 <span className="font-bold">Redes + Web = Presencia digital completa</span>
              </p>
              <p className="text-center text-muted-foreground mt-2">
                Más confianza, más posicionamiento en Google, más conversiones
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((reason, index) => (
              <Card key={index} className="p-6 shadow-card hover:shadow-soft transition-all border-border/50">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <reason.icon className="text-white" size={24} />
                </div>
                <h4 className="text-xl font-bold mb-2">{reason.title}</h4>
                <p className="text-muted-foreground text-sm">{reason.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWebsite;
