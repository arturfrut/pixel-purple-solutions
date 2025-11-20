import { Users, Target, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import teamIllustration from '@/assets/team-illustration.jpg';

const About = () => {
  const values = [
    {
      icon: Users,
      title: 'Equipo joven y dinámico',
      description: 'Somos Artur, Elo y Mercedes: profesionales apasionados por el marketing digital y el desarrollo web.',
    },
    {
      icon: Target,
      title: 'Enfoque personalizado',
      description: 'Entendemos las necesidades de emprendedores y pequeñas empresas porque somos como vos.',
    },
    {
      icon: Sparkles,
      title: 'Resultados medibles',
      description: 'No vendemos humo: te mostramos datos concretos y mejoras reales en tu presencia digital.',
    },
  ];

  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Quiénes <span className="bg-gradient-primary bg-clip-text text-transparent">somos</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Una agencia de marketing digital formada por profesionales jóvenes que entienden las necesidades del emprendedor moderno
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img 
                src={teamIllustration} 
                alt="Equipo de trabajo" 
                className="rounded-2xl shadow-card w-full"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold">Tu aliado digital</h3>
              <p className="text-lg text-muted-foreground">
                Sabemos lo que es arrancar un proyecto desde cero. Por eso creamos soluciones digitales accesibles, 
                efectivas y diseñadas específicamente para negocios en crecimiento.
              </p>
              <p className="text-lg text-muted-foreground">
                No somos una agencia corporativa tradicional: somos tu equipo de confianza que habla tu idioma 
                y entiende tus desafíos.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="p-6 shadow-card hover:shadow-soft transition-all border-border/50">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="text-white" size={24} />
                </div>
                <h4 className="text-xl font-bold mb-2">{value.title}</h4>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
