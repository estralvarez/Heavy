import { useState } from "react"
import { FlaskConical, Users, FileText, BarChart3, Menu, X } from "lucide-react"
import { Link, Outlet, NavLink, useLocation } from "react-router-dom"

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { pathname } = useLocation()

  let title = "Dashboard"
  let subtitle = "Monitoreo de Metales Pesados"
  if (pathname === "/dashboard" || pathname === "/dashboard/") {
    title = "Dashboard"
    subtitle = "Monitoreo de Metales Pesados"
  } else if (pathname.startsWith("/dashboard/pacientes")) {
    title = "Pacientes"
    subtitle = "Listado y gestión de pacientes"
  } else if (pathname.startsWith("/dashboard/analisis")) {
    title = "Análisis"
    subtitle = "Visualizaciones y reportes estadísticos"
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-zinc-900 border-r border-red-600/20 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-red-600/20">
            <Link to="/" className="flex items-center gap-3 text-red-500 hover:text-red-400 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-red-600/10 flex items-center justify-center border border-red-600/20 group-hover:bg-red-600/20 transition-colors">
                <FlaskConical size={24} />
              </div>
              <span className="text-xl font-bold">HeavyApp</span>
            </Link>
          </div>

          {/* Navegación */}
          <nav className="flex-1 p-4 space-y-2">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg ${
                  isActive
                    ? "bg-red-600/10 text-red-400 border border-red-600/20 font-medium"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all duration-200"
                }`
              }
            >
              <BarChart3 size={20} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/dashboard/pacientes"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg ${
                  isActive
                    ? "bg-red-600/10 text-red-400 border border-red-600/20 font-medium"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all duration-200"
                }`
              }
            >
              <Users size={20} />
              <span>Lista de Pacientes</span>
            </NavLink>

            <NavLink
              to="/dashboard/analisis"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg ${
                  isActive
                    ? "bg-red-600/10 text-red-400 border border-red-600/20 font-medium"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all duration-200"
                }`
              }
            >
              <FileText size={20} />
              <span>Análisis Estadísticos</span>
            </NavLink>
          </nav>

          {/* Footer del sidebar */}
          <div className="p-4 border-t border-red-600/20">
            <div className="text-xs text-zinc-500 text-center">
              <p>Usuario: Admin</p>
              <button className="text-red-500 hover:text-red-400 text-xs mt-2">
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay para móvil */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Contenido principal */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-zinc-900/95 backdrop-blur-sm border-b border-red-600/20 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden text-white"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div>
                <h1 className="text-2xl font-bold text-red-500">{title}</h1>
                <p className="text-sm text-zinc-400">{subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-white">Administrador</p>
              </div>
            </div>
          </div>
        </header>

        {/* Contenido del dashboard */}
        <Outlet />
        
      </main>
    </div>
  )
}