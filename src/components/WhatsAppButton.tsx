import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WhatsAppButton = () => {
  const handleClick = () => {
    window.open('https://wa.me/5491112345678?text=Hola!%20Quiero%20más%20información', '_blank');
  };

  return (
    <Button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-soft hover:shadow-lg transition-all p-0"
      size="icon"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={28} />
    </Button>
  );
};

export default WhatsAppButton;
