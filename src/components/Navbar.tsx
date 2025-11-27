import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  const navItems = [
    { label: 'Inicio', id: 'hero' },
    { label: 'Nosotros', id: 'about' },
    { label: 'Servicios', id: 'services' },
    { label: 'Clientes', id: 'cases' },
    { label: 'Contacto', id: 'contact' }
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-soft'
          : 'bg-transparent'
      }`}
    >
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-center gap-2 text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent'>
            <img src='./violetLogo.png' className='h-10 w-auto' />
            KAI Digital
          </div>

          {/* Desktop Menu */}
          <div className='hidden md:flex items-center gap-8'>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className='text-foreground hover:text-primary transition-colors font-medium'
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection('contact')}
              className='rounded-full'
            >
              Diagnóstico Gratis
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className='md:hidden text-foreground'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className='md:hidden mt-4 pb-4 space-y-4'>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className='block w-full text-left text-foreground hover:text-primary transition-colors font-medium py-2'
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection('contact')}
              className='w-full rounded-full'
            >
              Diagnóstico Gratis
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
