import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lock } from 'lucide-react'

interface Props {
  onSuccess: () => void
}

export default function CotizadorLogin({ onSuccess }: Props) {
  const [usuario, setUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    setTimeout(() => {
      const validUser = import.meta.env.VITE_COTIZADOR_USER
      const validPass = import.meta.env.VITE_COTIZADOR_PASS
      if (usuario === validUser && contrasena === validPass) {
        onSuccess()
      } else {
        setError(true)
      }
      setLoading(false)
    }, 400)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <img src="/violetLogo.png" className="h-9 w-auto" alt="Logo" />
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Marketing KAI
          </span>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Lock className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground leading-none">Cotizador</p>
              <p className="text-xs text-muted-foreground mt-0.5">Acceso interno</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="usuario">Usuario</Label>
              <Input
                id="usuario"
                value={usuario}
                onChange={e => setUsuario(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contrasena">Contraseña</Label>
              <Input
                id="contrasena"
                type="password"
                value={contrasena}
                onChange={e => setContrasena(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg">
                Usuario o contraseña incorrectos.
              </p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Verificando...' : 'Ingresar'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}