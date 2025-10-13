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

  return (
    <form>
      <label className="form-label">¿Reside cerca o frecuenta a uno o más de los siguientes lugares?</label>
      
      <hr className="border-t border-white my-4" />
      
      {/* Sección Talleres */}
      <div className={`card-shadow p-3 border rounded-3 transition-all mb-4 ${
        hasSelection(taller) ? 'border-success' : ''
      }`}>
        <div className="d-flex align-items-center mb-3">
          <h2 className="text-lg font-semibold mb-0 flex-grow-1">Talleres</h2>
          {hasSelection(taller) && <CheckCircle className="text-success" size={20} />}
        </div>
        {taller.map((tallerItem) => (
          <div key={tallerItem.id} className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id={`taller-${tallerItem.id}`}
              checked={data[tallerItem.id] || false}
              onChange={(e) => handleChange(tallerItem.id, e.target.checked)}
            />
            <label className="form-check-label" htmlFor={`taller-${tallerItem.id}`}>
              {tallerItem.label}
            </label>
          </div>
        ))}
      </div>
      
      <hr className="border-t border-white my-4" />
      
      {/* Sección Fábricas */}
      <div className={`card-shadow p-3 border rounded-3 transition-all mb-4 ${
        hasSelection(fabrica) ? 'border-success' : ''
      }`}>
        <div className="d-flex align-items-center mb-3">
          <h2 className="text-lg font-semibold mb-0 flex-grow-1">Fábricas</h2>
          {hasSelection(fabrica) && <CheckCircle className="text-success" size={20} />}
        </div>
        {fabrica.map((fabricaItem) => (
          <div key={fabricaItem.id} className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id={`fabrica-${fabricaItem.id}`}
              checked={data[fabricaItem.id] || false}
              onChange={(e) => handleChange(fabricaItem.id, e.target.checked)}
            />
            <label className="form-check-label" htmlFor={`fabrica-${fabricaItem.id}`}>
              {fabricaItem.label}
            </label>
          </div>
        ))}
      </div>
      
      <hr className="border-t border-white my-4" />
      
      {/* Sección Zonas de Exposición */}
      <div className={`card-shadow p-3 border rounded-3 transition-all mb-4 ${
        hasSelection(lugares) ? 'border-success' : ''
      }`}>
        <div className="d-flex align-items-center mb-3">
          <h2 className="text-lg font-semibold mb-0 flex-grow-1">Zonas de Exposición</h2>
          {hasSelection(lugares) && <CheckCircle className="text-success" size={20} />}
        </div>
        {lugares.map((lugarItem) => (
          <div key={lugarItem.id} className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id={`lugar-${lugarItem.id}`}
              checked={data[lugarItem.id] || false}
              onChange={(e) => handleChange(lugarItem.id, e.target.checked)}
            />
            <label className="form-check-label" htmlFor={`lugar-${lugarItem.id}`}>
              {lugarItem.label}
            </label>
          </div>
        ))}
      </div>
    </form>
  )
};
