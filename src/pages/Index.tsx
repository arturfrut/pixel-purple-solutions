import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import WhyWebsite from '@/components/WhyWebsite'
import AdvancedSolutions from '@/components/AdvancedSolutions'
import Cases from '@/components/Cases/Cases'
import Diagnostic from '@/components/Diagnostic'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import BipperKaiBanner from '@/components/BipperKaiBanner'

const Index = () => {
  return (
    <div className='min-h-screen'>
      <Navbar />
      <Hero />
      <BipperKaiBanner />
      <About />
      <Services />
      <WhyWebsite />
      <AdvancedSolutions />
      <Cases />
      <Diagnostic />
      <Contact />
      <Footer />
      {/* <WhatsAppButton /> */}
    </div>
  )
}

export default Index
