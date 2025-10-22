import { useState } from "react";
import "../index.css";
// Se importa Menu y X para el toggle del menú móvil
import { FlaskConical, Menu, X } from "lucide-react"; 

// --- Componente HeaderForm ---
const HeaderForm = () => {
  return (
    // Se usa 'border-border-light' definida en index.css para consistencia
    <header className="bg-zinc-900/95 backdrop-blur-sm border-b border-red-600/20 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center py-4 px-4">
        {/* Se usa text-accent-red para el color del icono y texto */}
        <div className="flex items-center gap-2 text-accent-red"> 
          <FlaskConical size={32} />
          <span className="text-2xl font-bold">HeavyApp</span>
        </div>
      </div>
    </header>
  );
};
// --- Componente Header ---
const Header = () => {
  const [isOpen, setIsOpen] = useState(false); 
  return (
    <header className="sticky top-0 z-50 bg-zinc-900/95 backdrop-blur-sm border-b border-red-600/20 shadow-lg"> 
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 md:px-6">
        
        {/* Logo/Brand */}
        <div className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-all duration-300 group cursor-pointer">
          <FlaskConical size={32} className="group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-2xl font-bold">HeavyApp</span>
        </div>

        {/* Botón de Menú (Hamburger) - Visible solo en móvil */}
        <button
          className="md:hidden text-white p-2 hover:bg-red-600/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navegación Principal (Desktop) */}
        <nav className="hidden md:flex space-x-6">
          {[
            { href: "#about", label: "El Análisis" },
            { href: "#us", label: "Nosotros" },
            { href: "#process", label: "Proceso" },
            { href: "#contact", label: "Contacto" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white hover:text-red-500 transition-colors duration-300 py-2 px-3 rounded-lg hover:bg-red-600/10 font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Menú Desplegable para Móviles con animación */}
      <nav
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        } bg-zinc-900 border-t border-red-600/20`}
      >
        <div className="flex flex-col space-y-1 px-4 py-3">
          {[
            { href: "#about", label: "Acerca de" },
            { href: "#process", label: "Proceso" },
            { href: "#contact", label: "Contacto" },
            { href: "#nosotros", label: "Nosotros" },
          ].map((link) => (
            <a
              key={link.href}
              onClick={() => setIsOpen(false)}
              href={link.href}
              className="text-white block p-3 rounded-lg hover:text-red-500 hover:bg-red-600/10 transition-all duration-300 font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};

export { Header, HeaderForm };