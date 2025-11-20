import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import WhyWebsite from '@/components/WhyWebsite';
import AdvancedSolutions from '@/components/AdvancedSolutions';
import Cases from '@/components/Cases';
import Diagnostic from '@/components/Diagnostic';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Diagnostic />
      <About />
      <Services />
      <WhyWebsite />
      <AdvancedSolutions />
      <Cases />
      <Contact />
      <Footer />
      {/* <WhatsAppButton /> */}
    </div>
  );
};

export default Index;
