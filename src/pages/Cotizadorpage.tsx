import { useState } from 'react'
import CotizadorLogin from '@/components/cotizador/Cotizadorlogin'
import CotizadorEditor from '@/components/cotizador/Cotizadoreditor'
import CotizadorPreview from '@/components/cotizador/Cotizadorpreview'
import { CotizadorFormData } from '@/types/cotizador'

type View = 'login' | 'editor' | 'preview'

function emptyForm(): CotizadorFormData {
  return {
    vendedorIdx: null,
    clienteNombre: '',
    tipoNegocio: '',
    tipoNegocioOtro: '',
    descripcionLocal: '',
    fechaInicio: null,
    cotizaciones: [
      {
        id: Math.random().toString(36).slice(2, 9),
        nombre: 'Propuesta A',
        serviciosIds: [],
      },
    ],
  }
}

export default function CotizadorPage() {
  const [view, setView] = useState<View>('login')
  const [formData, setFormData] = useState<CotizadorFormData>(emptyForm())

  const handleLogin = () => setView('editor')

  const handlePreview = (data: CotizadorFormData) => {
    setFormData(data)
    setView('preview')
  }

  const handleBackToEditor = () => setView('editor')

  const handleLogout = () => {
    setView('login')
    setFormData(emptyForm())
  }

  if (view === 'login') {
    return <CotizadorLogin onSuccess={handleLogin} />
  }

  if (view === 'editor') {
    return (
      <CotizadorEditor
        initialData={formData}
        onPreview={handlePreview}
        onLogout={handleLogout}
      />
    )
  }

  return (
    <CotizadorPreview
      data={formData}
      onBack={handleBackToEditor}
    />
  )
}