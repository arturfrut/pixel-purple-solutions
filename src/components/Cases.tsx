import { Star, Quote } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Cases = () => {
  const consultingCases = [
    {
      client: 'Estudio Contable Fernández',
      result: '+150% de consultas en 3 meses',
      testimonial: 'La auditoría nos mostró exactamente qué estábamos haciendo mal. Ahora nos encuentran por Google.',
    },
    {
      client: 'Tienda de Decoración Casa Bella',
      result: 'Facturación online duplicada',
      testimonial: 'Pasamos de vender solo en local a tener clientes de todo el país gracias a la estrategia digital.',
    },
    {
      client: 'Personal Trainer Julia Rojas',
      result: 'Agenda completa en 6 semanas',
      testimonial: 'La combinación de web + redes funcionó increíble. Dejé de buscar clientes, ahora me buscan a mí.',
    },
  ];

  const websiteCases = [
    {
      client: 'Buffet de Abogados Santos & Asociados',
      result: 'Profesionalización completa',
      testimonial: 'Ahora tenemos una presencia digital acorde a nuestro nivel profesional.',
    },
    {
      client: 'Catering Las Delicias',
      result: '+200% visitas mensuales',
      testimonial: 'El sitio web posicionó en Google local y nos llenó de consultas.',
    },
    {
      client: 'Consultora de RRHH Talento+',
      result: 'Credibilidad instantánea',
      testimonial: 'Los clientes corporativos nos toman más en serio desde que tenemos web profesional.',
    },
  ];

  const appCases = [
    {
      client: 'Clínica Dental Sonrisas',
      result: 'Sistema de turnos automatizado',
      testimonial: 'Ya no perdemos tiempo coordinando turnos por teléfono. Todo online, 24/7.',
    },
    {
      client: 'Distribuidora La Economía',
      result: 'Dashboard de ventas en tiempo real',
      testimonial: 'Ahora veo el estado del negocio desde mi celular en cualquier momento.',
    },
    {
      client: 'Gimnasio FitZone',
      result: 'App de seguimiento de alumnos',
      testimonial: 'La app personalizada mejoró la retención de clientes un 40%.',
    },
  ];

  const CaseCard = ({ caseItem }: { caseItem: any }) => (
    <Card className="p-6 shadow-card hover:shadow-soft transition-all border-border/50">
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="text-accent fill-accent" size={16} />
        ))}
      </div>
      <h4 className="text-lg font-bold mb-2">{caseItem.client}</h4>
      <div className="text-primary font-semibold mb-3">{caseItem.result}</div>
      <div className="relative">
        <Quote className="absolute -top-2 -left-2 text-primary/20" size={24} />
        <p className="text-muted-foreground text-sm italic pl-4">"{caseItem.testimonial}"</p>
      </div>
    </Card>
  );

  return (
    <section id="cases" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Casos de <span className="bg-gradient-primary bg-clip-text text-transparent">éxito</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Resultados reales de clientes que confiaron en nosotros
            </p>
          </div>

          <Tabs defaultValue="consulting" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12 max-w-2xl mx-auto">
              <TabsTrigger value="consulting">Consultoría</TabsTrigger>
              <TabsTrigger value="websites">Sitios Web</TabsTrigger>
              <TabsTrigger value="apps">Aplicaciones</TabsTrigger>
            </TabsList>

            <TabsContent value="consulting">
              <div className="grid md:grid-cols-3 gap-6">
                {consultingCases.map((caseItem, index) => (
                  <CaseCard key={index} caseItem={caseItem} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="websites">
              <div className="grid md:grid-cols-3 gap-6">
                {websiteCases.map((caseItem, index) => (
                  <CaseCard key={index} caseItem={caseItem} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="apps">
              <div className="grid md:grid-cols-3 gap-6">
                {appCases.map((caseItem, index) => (
                  <CaseCard key={index} caseItem={caseItem} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Cases;
