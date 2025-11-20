import { Code2, Database, Zap, BarChart, Workflow, Settings } from 'lucide-react';
import { Card } from '@/components/ui/card';
import solutionsBg from '@/assets/solutions-bg.jpg';

const AdvancedSolutions = () => {
  const solutions = [
    {
      icon: Code2,
      title: 'Aplicaciones personalizadas',
      description: 'Desarrollamos herramientas web únicas para tu negocio',
    },
    {
      icon: Database,
      title: 'Sistemas a medida',
      description: 'Gestión de inventarios, CRM, facturación y más',
    },
    {
      icon: Zap,
      title: 'Integraciones',
      description: 'Conectamos tus herramientas y automatizamos procesos',
    },
    {
      icon: BarChart,
      title: 'Dashboards',
      description: 'Visualización de datos en tiempo real para tomar mejores decisiones',
    },
    {
      icon: Workflow,
      title: 'Automatizaciones',
      description: 'Ahorrá tiempo automatizando tareas repetitivas',
    },
    {
      icon: Settings,
      title: 'Soluciones escalables',
      description: 'Sistemas que crecen con tu empresa',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={solutionsBg} 
          alt="Soluciones digitales" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Soluciones digitales{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">avanzadas</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Para PyMES que necesitan profesionalizar y optimizar sus procesos digitales
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {solutions.map((solution, index) => (
              <Card 
                key={index} 
                className="p-6 shadow-card hover:shadow-soft transition-all border-border/50 bg-card/80 backdrop-blur-sm"
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <solution.icon className="text-white" size={24} />
                </div>
                <h4 className="text-lg font-bold mb-2">{solution.title}</h4>
                <p className="text-muted-foreground text-sm">{solution.description}</p>
              </Card>
            ))}
          </div>

          <Card className="p-8 md:p-12 bg-gradient-primary text-white shadow-soft">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h3 className="text-3xl font-bold">¿Tenés una idea o necesidad específica?</h3>
              <p className="text-lg text-white/90">
                Si tu negocio necesita una herramienta digital que no existe o querés optimizar procesos internos, 
                podemos crear la solución perfecta para vos.
              </p>
              <div className="pt-4">
                <a
                  href="https://wa.me/5491112345678?text=Hola!%20Quiero%20consultar%20sobre%20soluciones%20personalizadas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors"
                >
                  Consultanos tu proyecto
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AdvancedSolutions;
