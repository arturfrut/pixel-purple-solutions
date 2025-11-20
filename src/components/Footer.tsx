import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary/30 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4">
          <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            KAI Digital
          </div>
          <p className="text-muted-foreground">
            Marketing digital para emprendedores que quieren crecer
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>Hecho con</span>
            <Heart className="text-primary fill-primary" size={16} />
            <span>por KAI</span>
          </div>
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} KAI Digital. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
