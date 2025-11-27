// import { Quote } from 'lucide-react';
// import { Card } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// const Cases = () => {
//   const consultingCases = [
//     {
//       client: 'Estudio Contable Fernández',
//       result: '+150% de consultas en 3 meses',
//       testimonial: 'La auditoría nos mostró exactamente qué estábamos haciendo mal. Ahora nos encuentran por Google.',
//     },
//     {
//       client: 'Tienda de Decoración Casa Bella',
//       result: 'Facturación online duplicada',
//       testimonial: 'Pasamos de vender solo en local a tener clientes de todo el país gracias a la estrategia digital.',
//     },
//     {
//       client: 'Personal Trainer Julia Rojas',
//       result: 'Agenda completa en 6 semanas',
//       testimonial: 'La combinación de web + redes funcionó increíble. Dejé de buscar clientes, ahora me buscan a mí.',
//     },
//   ];

//   const websiteCases = [
//     {
//       client: 'Buffet de Abogados Santos & Asociados',
//       result: 'Profesionalización completa',
//       testimonial: 'Ahora tenemos una presencia digital acorde a nuestro nivel profesional.',
//     },
//     {
//       client: 'Catering Las Delicias',
//       result: '+200% visitas mensuales',
//       testimonial: 'El sitio web posicionó en Google local y nos llenó de consultas.',
//     },
//     {
//       client: 'Consultora de RRHH Talento+',
//       result: 'Credibilidad instantánea',
//       testimonial: 'Los clientes corporativos nos toman más en serio desde que tenemos web profesional.',
//     },
//   ];

//   const appCases = [
//     {
//       client: 'Clínica Dental Sonrisas',
//       result: 'Sistema de turnos automatizado',
//       testimonial: 'Ya no perdemos tiempo coordinando turnos por teléfono. Todo online, 24/7.',
//     },
//     {
//       client: 'Distribuidora La Economía',
//       result: 'Dashboard de ventas en tiempo real',
//       testimonial: 'Ahora veo el estado del negocio desde mi celular en cualquier momento.',
//     },
//     {
//       client: 'Gimnasio FitZone',
//       result: 'App de seguimiento de alumnos',
//       testimonial: 'La app personalizada mejoró la retención de clientes un 40%.',
//     },
//   ];

//   const CaseCard = ({ caseItem }: { caseItem: any }) => (
//     <Card className="p-6 shadow-card hover:shadow-soft transition-all border-border/50">
 
//       <h4 className="text-lg font-bold mb-2">{caseItem.client}</h4>
//       <div className="text-primary font-semibold mb-3">{caseItem.result}</div>
//       <div className="relative">
//         <Quote className="absolute -top-2 -left-2 text-primary/20" size={24} />
//         <p className="text-muted-foreground text-sm italic pl-4">"{caseItem.testimonial}"</p>
//       </div>
//     </Card>
//   );

//   return (
//     <section id="cases" className="py-24 bg-secondary/30">
//       <div className="container mx-auto px-4">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold mb-4">
//               Casos de <span className="bg-gradient-primary bg-clip-text text-transparent">éxito</span>
//             </h2>
//             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//               Resultados reales de clientes que confiaron en nosotros
//             </p>
//           </div>

//           <Tabs defaultValue="consulting" className="w-full">
//             <TabsList className="grid w-full grid-cols-3 mb-12 max-w-2xl mx-auto">
//               <TabsTrigger value="consulting">Consultoría</TabsTrigger>
//               <TabsTrigger value="websites">Sitios Web</TabsTrigger>
//               <TabsTrigger value="apps">Aplicaciones</TabsTrigger>
//             </TabsList>

//             <TabsContent value="consulting">
//               <div className="grid md:grid-cols-3 gap-6">
//                 {consultingCases.map((caseItem, index) => (
//                   <CaseCard key={index} caseItem={caseItem} />
//                 ))}
//               </div>
//             </TabsContent>

//             <TabsContent value="websites">
//               <div className="grid md:grid-cols-3 gap-6">
//                 {websiteCases.map((caseItem, index) => (
//                   <CaseCard key={index} caseItem={caseItem} />
//                 ))}
//               </div>
//             </TabsContent>

//             <TabsContent value="apps">
//               <div className="grid md:grid-cols-3 gap-6">
//                 {appCases.map((caseItem, index) => (
//                   <CaseCard key={index} caseItem={caseItem} />
//                 ))}
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Cases;
import { useState } from 'react';
import { Quote, ExternalLink, Sparkles, MessageCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const Cases = () => {
  const [showPromoModal, setShowPromoModal] = useState(false);

  const handleWhatsAppPromo = () => {
    const message = 'Hola! Me interesa aprovechar la promoción de sitios web a precio reducido 🚀';
    window.open(
      `https://wa.me/5491112345678?text=${encodeURIComponent(message)}`,
      '_blank'
    );
    setShowPromoModal(false);
  };

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
      client: 'Gimnasio Mar del Plata',
      url: 'https://www.gimnasioMardelPlata.com',
      image: 'https://via.placeholder.com/400x300/3b82f6/ffffff?text=Gimnasio+Mar+del+Plata',
      isLive: true,
    },
    {
      client: 'Próximamente',
      url: null,
      image: 'https://via.placeholder.com/400x300/6366f1/ffffff?text=Pr%C3%B3ximamente',
      isLive: false,
    },
    {
      client: 'Próximamente',
      url: null,
      image: 'https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Pr%C3%B3ximamente',
      isLive: false,
    },
  ];

  const appCases = [
    {
      client: 'Sistema de turnos con calendario',
      result: 'Una pantalla simple para que tus clientes reserven online.',
      testimonial: 'Ya no perdemos tiempo coordinando turnos por teléfono. Todo online, 24/7.',
    },
    {
      client: 'Chatbot entrenado',
      result: 'Para contestar tus mensajes y preguntas frecuentes automáticamente.',
      testimonial: 'Estoy ahorrando muchísimo tiempo que puedo aprovechar con mi familia',
    },
    {
      client: 'Sistema de cobros mensuales',
      result: 'A travez de mercado pago con una tabla que muestra el estado de tus alumnos',
      testimonial: 'La app personalizada mejoró la retención de clientes un 40%.',
    },
  ];

  const CaseCard = ({ caseItem }: { caseItem: any }) => (
    <Card className="p-6 shadow-card hover:shadow-soft transition-all border-border/50">
      <h4 className="text-lg font-bold mb-2">{caseItem.client}</h4>
      <div className="text-primary font-semibold mb-3">{caseItem.result}</div>
      <div className="relative">
        <Quote className="absolute -top-2 -left-2 text-primary/20" size={24} />
        <p className="text-muted-foreground text-sm italic pl-4">"{caseItem.testimonial}"</p>
      </div>
    </Card>
  );

  const WebsiteCard = ({ website }: { website: any }) => {
    const handleClick = () => {
      if (website.isLive && website.url) {
        window.open(website.url, '_blank');
      } else {
        setShowPromoModal(true);
      }
    };

    return (
      <Card className="overflow-hidden shadow-card hover:shadow-soft transition-all border-border/50 group cursor-pointer">
        <div 
          className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/10 to-secondary"
          onClick={handleClick}
        >
          <img
            src={website.image}
            alt={website.client}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {!website.isLive && (
            <div className="absolute inset-0 bg-gradient-primary/80 flex items-center justify-center">
              <div className="text-center text-white">
                <Sparkles className="mx-auto mb-2" size={32} />
                <p className="text-lg font-bold">Próximamente</p>
                <p className="text-sm mt-1">Click para más info</p>
              </div>
            </div>
          )}
          {website.isLive && (
            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink size={20} className="text-primary" />
            </div>
          )}
        </div>
        <div className="p-4">
          <h4 className="text-lg font-bold mb-2">{website.client}</h4>
          {website.url && (
            <a
              href={website.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary text-sm hover:underline flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              {website.url.replace('https://', '').replace('www.', '')}
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </Card>
    );
  };

  const PromoModal = () => (
    <Dialog open={showPromoModal} onOpenChange={setShowPromoModal}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
            <Sparkles className="text-white" size={32} />
          </div>
          <DialogTitle className="text-2xl font-bold">
            ¡Oferta de Lanzamiento! 🚀
          </DialogTitle>
          <DialogDescription className="text-base">
            Estamos comenzando nuestro servicio de desarrollo web y queremos que seas parte de nuestros primeros casos de éxito.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="bg-gradient-primary/10 rounded-lg p-6 border-2 border-primary/20">
            <h4 className="font-bold text-xl mb-3 text-center">
              Precio Super Reducido
            </h4>
            <p className="text-center text-muted-foreground mb-4">
              Obtén tu sitio web profesional con todos los beneficios incluidos a un precio especial de lanzamiento.
            </p>
            <div className='flex justify-center mb-4'>

            <div className="space-y-2 flex flex-col">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>Diseño profesional y responsive</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>Optimización SEO incluida</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>Hosting y dominio por 1 año</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>Soporte técnico incluido</span>
              </div>
            </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Esta oferta es limitada para los primeros clientes. ¡No pierdas la oportunidad de tener tu sitio web profesional a un precio increíble!
            </p>
          </div>

          <Button
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
            size="lg"
            onClick={handleWhatsAppPromo}
          >
            <MessageCircle size={20} className="mr-2" />
            Consultar por WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
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
                  {websiteCases.map((website, index) => (
                    <WebsiteCard key={index} website={website} />
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

      <PromoModal />
    </>
  );
};

export default Cases;