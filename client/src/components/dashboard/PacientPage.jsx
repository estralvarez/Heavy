import { useState } from "react";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";

// Datos de ejemplo
const pacientesData = [
  {
    id: "P001",
    nombrePaciente: "María González",
    nombreRepresentante: "Ana González",
    edad: 8,
    sexo: "F",
    telefono: "+58 412-1234567",
    email: "ana.gonzalez@email.com",
    sector: "Centro",
    zona: "Zona A",
    institucion: "Escuela Primaria Central",
    estados: ["muestra-aceptada", "datos-completos"],
  },
  {
    id: "P002",
    nombrePaciente: "Carlos Rodríguez",
    nombreRepresentante: "Pedro Rodríguez",
    edad: 10,
    sexo: "M",
    telefono: "+58 424-2345678",
    email: "pedro.rodriguez@email.com",
    sector: "Norte",
    zona: "Zona B",
    institucion: "Colegio San José",
    estados: ["muestra-aceptada", "en-riesgo"],
  },
  {
    id: "P003",
    nombrePaciente: "Sofía Martínez",
    nombreRepresentante: "Laura Martínez",
    edad: 7,
    sexo: "F",
    telefono: "+58 414-3456789",
    email: "laura.martinez@email.com",
    sector: "Sur",
    zona: "Zona C",
    institucion: "Escuela Bolivariana",
    estados: ["datos-completos"],
  },
  {
    id: "P004",
    nombrePaciente: "Juan Pérez",
    nombreRepresentante: "Carmen Pérez",
    edad: 9,
    sexo: "M",
    telefono: "+58 426-4567890",
    email: "carmen.perez@email.com",
    sector: "Este",
    zona: "Zona A",
    institucion: "Unidad Educativa Nacional",
    estados: ["muestra-aceptada", "en-riesgo", "datos-completos"],
  },
  {
    id: "P005",
    nombrePaciente: "Valentina López",
    nombreRepresentante: "Roberto López",
    edad: 6,
    sexo: "F",
    telefono: "+58 412-5678901",
    email: "roberto.lopez@email.com",
    sector: "Oeste",
    zona: "Zona B",
    institucion: "Jardín de Infancia",
    estados: ["muestra-aceptada"],
  },
  {
    id: "P006",
    nombrePaciente: "Diego Fernández",
    nombreRepresentante: "María Fernández",
    edad: 11,
    sexo: "M",
    telefono: "+58 424-6789012",
    email: "maria.fernandez@email.com",
    sector: "Centro",
    zona: "Zona C",
    institucion: "Liceo Bolivariano",
    estados: ["datos-completos", "en-riesgo"],
  },
];

const estadoBadges = {
  "muestra-aceptada": { label: "Muestra Aceptada", variant: "default" },
  "datos-completos": { label: "Datos Completos", variant: "secondary" },
  "en-riesgo": { label: "En Riesgo", variant: "destructive" },
};

export default function PacientPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtrar pacientes
  const pacientesFiltrados = pacientesData.filter((paciente) => {
    const matchSearch =
      paciente.nombrePaciente
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      paciente.nombreRepresentante
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      paciente.id.toLowerCase().includes(searchTerm.toLowerCase());

    return matchSearch;
  });

  // Paginación
  const totalPages = Math.ceil(pacientesFiltrados.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pacientesPaginados = pacientesFiltrados.slice(startIndex, endIndex);

  return (
    <div className="p-4 lg:p-8 space-y-8 bg-zinc-800 min-h-[calc(100vh-64px)]">
      {/* Filtros y búsqueda */}
      <div className="space-y-6">
        {/* Sección de búsqueda y filtros */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-2 text-zinc-300 mb-4">
            <Filter className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Búsqueda</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Búsqueda */}
            <div className="md:col-span-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, ID o representante..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-500"
                />
              </div>
            </div>
          </div>

          <div className="text-sm text-zinc-400 pt-2">
            Mostrando {pacientesFiltrados.length} de {pacientesData.length}{" "}
            pacientes
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-zinc-800 hover:bg-zinc-900">
                  <th className="text-zinc-300 font-semibold text-left px-4 py-3">
                    ID
                  </th>
                  <th className="text-zinc-300 font-semibold text-left px-4 py-3">
                    Paciente / Representante
                  </th>
                  <th className="text-zinc-300 font-semibold text-left px-4 py-3">
                    Edad
                  </th>
                  <th className="text-zinc-300 font-semibold text-left px-4 py-3">
                    Sexo
                  </th>
                  <th className="text-zinc-300 font-semibold text-left px-4 py-3">
                    Teléfono
                  </th>
                  <th className="text-zinc-300 font-semibold text-left px-4 py-3">
                    Email
                  </th>
                  <th className="text-zinc-300 font-semibold text-left px-4 py-3">
                    Institución
                  </th>
                  <th className="text-zinc-300 font-semibold text-left px-4 py-3">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {pacientesPaginados.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="text-center py-8 text-zinc-500">
                      No se encontraron pacientes con los filtros aplicados
                    </td>
                  </tr>
                ) : (
                  pacientesPaginados.map((paciente) => (
                    <tr
                      key={paciente.id}
                      onClick={() =>
                        (window.location.href = `/dashboard/pacientes/${paciente.id}`)
                      }
                      className="border-zinc-800 hover:bg-zinc-800/50 cursor-pointer transition-colors"
                    >
                      <td className="font-mono text-red-400 px-4 py-3">
                        {paciente.id}
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <div className="text-white font-medium">
                            {paciente.nombrePaciente}
                          </div>
                          <div className="text-sm text-zinc-400">
                            {paciente.nombreRepresentante}
                          </div>
                        </div>
                      </td>
                      <td className="text-zinc-300 px-4 py-3">
                        {paciente.edad} años
                      </td>
                      <td className="text-zinc-300 px-4 py-3">
                        {paciente.sexo}
                      </td>
                      <td className="text-zinc-300 font-mono text-sm px-4 py-3">
                        {paciente.telefono}
                      </td>
                      <td className="text-zinc-300 text-sm px-4 py-3">
                        {paciente.email}
                      </td>
                      <td className="text-zinc-300 text-sm px-4 py-3">
                        {paciente.institucion}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {paciente.estados.map((estado) => (
                            <span
                              key={estado}
                              className={`text-xs px-2 py-0.5 rounded ${
                                estadoBadges[estado].variant === "destructive"
                                  ? "bg-red-600 text-white"
                                  : estadoBadges[estado].variant === "secondary"
                                  ? "bg-zinc-700 text-zinc-100"
                                  : "bg-zinc-800 text-zinc-200"
                              }`}
                            >
                              {estadoBadges[estado].label}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          {pacientesFiltrados.length > 0 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800">
              <div className="text-sm text-zinc-400">
                Página {currentPage} de {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="border-zinc-800 text-zinc-300 hover:bg-zinc-800 disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Anterior
                </button>
                <button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="border-zinc-800 text-zinc-300 hover:bg-zinc-800 disabled:opacity-50"
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
