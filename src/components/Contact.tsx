import { Mail, Phone, MapPin, MessageCircle, Instagram, Linkedin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Hola! Soy ${formData.name}
Email: ${formData.email}
Teléfono: ${formData.phone}
Mensaje: ${formData.message}`;
    window.open(`https://wa.me/5491112345678?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    
    toast({
      title: 'Redirigiendo a WhatsApp',
      description: 'Te vamos a responder a la brevedad',
    });
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Hablemos de tu <span className="bg-gradient-primary bg-clip-text text-transparent">proyecto</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Estamos listos para ayudarte a crecer digitalmente
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Contactanos</h3>
                <div className="space-y-4">
                  <a 
                    href="https://wa.me/5491112345678" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MessageCircle className="text-white" size={24} />
                    </div>
                    <div>
                      <div className="font-medium">WhatsApp</div>
                      <div className="text-muted-foreground">+54 9 11 1234-5678</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 rounded-xl">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Mail className="text-white" size={24} />
                    </div>
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-muted-foreground">contacto@kaidigital.com</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-xl">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <MapPin className="text-white" size={24} />
                    </div>
                    <div>
                      <div className="font-medium">Ubicación</div>
                      <div className="text-muted-foreground">Buenos Aires, Argentina</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-4">Seguinos en redes</h4>
                <div className="flex gap-4">
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <Instagram className="text-white" size={24} />
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <Linkedin className="text-white" size={24} />
                  </a>
                </div>
              </div>

              <Card className="p-6 bg-gradient-primary text-white">
                <h4 className="font-bold text-xl mb-2">Horarios de atención</h4>
                <p className="text-white/90">Lunes a Viernes: 9:00 - 18:00</p>
                <p className="text-white/90">Sábados: 9:00 - 13:00</p>
                <p className="text-sm mt-2 text-white/80">Respondemos WhatsApp 24/7</p>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="p-8 shadow-card">
              <h3 className="text-2xl font-bold mb-6">Envianos un mensaje</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Tu email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder="Tu teléfono"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Contanos sobre tu proyecto..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="rounded-lg"
                  />
                </div>
                <Button type="submit" className="w-full rounded-full" size="lg">
                  <MessageCircle className="mr-2" />
                  Enviar por WhatsApp
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
