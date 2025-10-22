import { CheckCircle } from "lucide-react";

export default function ZonasExposicionForm({ data, onChange, taller, fabrica, lugares }) {

  const handleChange = (id, value) => {
    let newData = { ...data };
    
    // Lógica para manejar "Ninguna de las anteriores"
    if (id === 'ninguntaller' && value) {
      // Si se selecciona "ninguntaller", desmarcar todos los otros talleres
      taller.forEach(item => {
        if (item.id !== 'ninguntaller') {
          newData[item.id] = false;
        }
      });
    } else if (id === 'ningunindustria' && value) {
      // Si se selecciona "ningunindustria", desmarcar todas las otras industrias
      fabrica.forEach(item => {
        if (item.id !== 'ningunindustria') {
          newData[item.id] = false;
        }
      });
    } else if (id === 'ningunlugar' && value) {
      // Si se selecciona "ningunlugar", desmarcar todos los otros lugares
      lugares.forEach(item => {
        if (item.id !== 'ningunlugar') {
          newData[item.id] = false;
        }
      });
    } else if (value) {
      // Si se selecciona cualquier otra opción, desmarcar "Ninguna de las anteriores" correspondiente
      if (taller.some(item => item.id === id)) {
        newData['ninguntaller'] = false;
      } else if (fabrica.some(item => item.id === id)) {
        newData['ningunindustria'] = false;
      } else if (lugares.some(item => item.id === id)) {
        newData['ningunlugar'] = false;
      }
    }
    
    newData[id] = value;
    onChange(newData);
  };

  // Función para verificar si una sección tiene al menos una opción seleccionada
  const hasSelection = (items) => {
    return items.some(item => data[item.id]);
  };

  const renderCheckboxGroup = (title, items, hasSelected) => (
    <div
      className={`p-5 rounded-lg border-2 transition-all ${
        hasSelected ? "bg-zinc-800/50 border-green-500" : "bg-zinc-900/50 border-zinc-700"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {hasSelected && <CheckCircle className="text-green-500" size={20} />}
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <label key={item.id} className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={data[item.id] || false}
              onChange={(e) => handleChange(item.id, e.target.checked)}
              className="rounded border-zinc-600 bg-zinc-800 text-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-0 cursor-pointer"
            />
            <span className="text-sm text-zinc-300 group-hover:text-white transition-colors select-none">
              {item.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  )

  return (
    <form className="space-y-6">
      <p className="text-zinc-200 text-sm mb-4">¿Reside cerca o frecuenta a uno o más de los siguientes lugares?</p>
      {renderCheckboxGroup("Talleres", taller, hasSelection(taller))}
      {renderCheckboxGroup("Fábricas", fabrica, hasSelection(fabrica))}
      {renderCheckboxGroup("Zonas de Exposición", lugares, hasSelection(lugares))}
    </form>
  )
};
