import {
  Users,
  FileText,
  BarChart3,
  TrendingUp,
  Activity,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";

// Datos simulados de KPIs
const kpis = {
  totalEncuestas: 247,
  promedioPlomo: 2.3,
  promedioMercurio: 2.1,
  promedioCadmio: 1.5,
  alertasAltas: 12,
};

const limits = {
  plomo: 5, // μg/dL
  mercurio: 5, // μg/L
  cadmio: 1, // μg/L
};

const samples = {
  plomo: 235,
  mercurio: 241,
  cadmio: 238,
};

const MetalProgress = ({
  label,
  samples,
  value,
  limit,
  gradientClass,
  fixedWidth,
}) => {
  const renderBar = () => {
    if (fixedWidth) {
      return (
        <div
          className={`h-full ${
            gradientClass ||
            "bg-gradient-to-r from-green-600 via-blue-500 to-red-600"
          } ${fixedWidth}`}
        />
      );
    }

    const widthClass =
      value < limit ? "w-[33%]" : value < limit * 2 ? "w-[66%]" : "w-[100%]";
    const gradient =
      gradientClass ||
      (value < limit
        ? "bg-gradient-to-r from-green-600 to-yellow-500"
        : value < limit * 2
        ? "bg-gradient-to-r from-yellow-500 to-red-600"
        : "bg-gradient-to-r from-red-600 to-red-800");

    return <div className={`h-full ${gradient} ${widthClass}`} />;
  };

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-zinc-300">{label}</span>
        <span className="text-sm text-zinc-500">{samples} muestras</span>
      </div>
      <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
        {renderBar()}
      </div>
      <div className="flex justify-between text-xs text-zinc-500 mt-1">
        <span>Bajo</span>
        <span>Medio</span>
        <span>Alto</span>
      </div>
    </div>
  );
};

const CardData = ({ title, value, icon: Icon, colorClass }) => {
  // Determinar si la tarjeta es un promedio de algún metal
  const lower = (title || "").toLowerCase();
  const metalKey = lower.includes("plomo")
    ? "plomo"
    : lower.includes("mercurio")
    ? "mercurio"
    : lower.includes("cadmio")
    ? "cadmio"
    : null;

  // Color por defecto (usa el pasado por props para items no metal)
  let bg = colorClass || "bg-red-600";

  // Si es un metal y tenemos un valor numérico, ajustar color según límites
  if (
    metalKey &&
    typeof value === "number" &&
    limits &&
    limits[metalKey] != null
  ) {
    const lim = limits[metalKey];
    bg =
      value < lim
        ? "bg-green-600"
        : value < lim * 2
        ? "bg-yellow-500"
        : "bg-red-600";
  }
  return (
    <div className="bg-zinc-900 border-red-600/20 hover:border-red-600/40 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/10 rounded-lg overflow-hidden">
      <div className="p-4 flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${bg} text-white`}
        >
          <Icon size={24} />
        </div>
        <div>
          <p className="text-zinc-400 text-sm">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default function PanelPage() {
  return (
    <div className="p-4 lg:p-8 space-y-8 bg-zinc-800 min-h-[calc(100vh-64px)]">
      {/* KPIs principales */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* Total de Encuestas */}
        <CardData
          title="Total de Encuestas"
          value={kpis.totalEncuestas}
          icon={TrendingUp}
          colorClass="bg-red-600/50"
        />

        {/* Promedio Plomo */}
        <CardData
          title="Promedio Plomo"
          value={kpis.promedioPlomo}
          icon={Activity}
        />
        {/* Promedio Mercurio */}
        <CardData
          title="Promedio Mercurio"
          value={kpis.promedioMercurio}
          icon={Activity}
        />
        {/* Promedio Cadmio */}
        <CardData
          title="Promedio Cadmio"
          value={kpis.promedioCadmio}
          icon={Activity}
        />
      </div>

      {/* Alertas y resumen */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Alertas */}
        <div className="bg-zinc-900 border-red-600/20 lg:col-span-1 rounded-lg overflow-hidden">
          <div className="px-4 pt-4">
            <div className="text-red-400 flex items-center gap-2 text-lg font-semibold">
              <AlertTriangle size={20} />
              <span>Alertas Activas</span>
            </div>
            <p className="text-zinc-400">Pacientes con niveles elevados</p>
          </div>
          <div className="p-4">
            <div className="text-5xl font-bold text-red-500 mb-4">
              {kpis.alertasAltas}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Plomo alto:</span>
                <span className="text-orange-500 font-semibold">7 casos</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Mercurio alto:</span>
                <span className="text-blue-500 font-semibold">3 casos</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Cadmio alto:</span>
                <span className="text-purple-500 font-semibold">2 casos</span>
              </div>
            </div>
            <button
              className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md"
              onClick={() => alert("Navegar a detalles de alertas")}
            >
              Ver Detalles
            </button>
          </div>
        </div>

        {/* Resumen de datos */}
        <div className="bg-zinc-900 border-red-600/20 lg:col-span-2 rounded-lg overflow-hidden">
          <div className="px-4 pt-4">
            <div className="text-red-400 text-lg font-semibold">
              Resumen de Análisis
            </div>
            <p className="text-zinc-400">Niveles por metal</p>
          </div>
          <div className="p-4">
            <div className="space-y-6">
              {/* Plomo */}
              <MetalProgress
                label="Plomo"
                samples={samples.plomo}
                value={kpis.promedioPlomo}
                limit={limits.plomo}
              />
              {/* Mercurio */}
              <MetalProgress
                label="Mercurio"
                samples={samples.mercurio}
                value={kpis.promedioMercurio}
                limit={limits.mercurio}
              />
              {/* Cadmio */}
              <MetalProgress
                label="Cadmio"
                samples={samples.cadmio}
                value={kpis.promedioCadmio}
                limit={limits.cadmio}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="bg-zinc-900 border-red-600/20 rounded-lg overflow-hidden">
        <div className="px-4 pt-4">
          <div className="text-red-400 text-lg font-semibold">
            Acciones Rápidas
          </div>
          <p className="text-zinc-400">
            Accede a las funciones principales del sistema
          </p>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/dashboard/pacientes"
              className="w-full h-24 flex flex-col gap-2 border border-red-600/20 hover:bg-red-600/10 hover:border-red-600/40 text-zinc-300 hover:text-white items-center justify-center rounded-md"
            >
              <Users size={24} />
              <span>Ver Pacientes</span>
            </Link>

            <Link
              to="/dashboard/analisis"
              className="w-full h-24 flex flex-col gap-2 border border-red-600/20 hover:bg-red-600/10 hover:border-red-600/40 text-zinc-300 hover:text-white items-center justify-center rounded-md"
            >
              <BarChart3 size={24} />
              <span>Análisis Estadísticos</span>
            </Link>

            <button className="w-full h-24 flex flex-col gap-2 border border-red-600/20 hover:bg-red-600/10 hover:border-red-600/40 text-zinc-300 hover:text-white items-center justify-center rounded-md">
              <FileText size={24} />
              <span>Generar Reporte</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
