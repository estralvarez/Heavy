import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FlaskConical, Lock, AlertCircle, User } from "lucide-react"

export default function LoginPage() {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Simulación de autenticación - reemplazar con lógica real
    setTimeout(() => {
      if (user && password) {
        navigate("/dashboard")
      } else {
        setError("Por favor, ingrese usuario y contraseña")
        setLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-red-600/10 flex items-center justify-center border border-red-600/20">
              <FlaskConical size={32} className="text-red-500" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-red-500 mb-2">HeavyApp</h1>
        </div>

        {/* Formulario de login (sin dependencia de @radix-ui) */}
        <div className="bg-zinc-900 border-red-600/20 shadow-2xl shadow-red-600/5 animate-fade-in-up animate-delay-100 rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-zinc-800">
            <h2 className="text-2xl text-center text-red-400 font-semibold">Iniciar Sesión</h2>
            <p className="text-zinc-400 mt-1">
              Si no eres Sacha, Daniel o Anais, no deberias estar aquí.{" "}
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault()
                  navigate("/")
                }}
                className="text-red-500 hover:text-red-400 transition-colors"
              >
                Por favor, regresa al inicio
              </a>
            </p>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-start gap-2 bg-red-950/50 border border-red-600/50 p-3 rounded-md">
                  <AlertCircle className="h-4 w-4 text-red-400 mt-0.5" />
                  <div className="text-zinc-200 text-sm">{error}</div>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="usuario" className="text-zinc-300 block">
                  Usuario
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
                  <input
                    id="usuario"
                    type="text"
                    placeholder="usuario"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className="w-full pl-10 bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:border-red-600 rounded-md py-3"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-zinc-300 block">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:border-red-600 rounded-md py-3"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 text-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50 rounded-md disabled:opacity-50"
              >
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}