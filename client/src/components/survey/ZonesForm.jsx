import { useState } from "react"

export default function ZonasExposicionForm({ data, onChange, taller, fabrica, lugares }) {

  const handleChange = (id, value) => {
    onChange({ ...data, [id]: value });
  
  };

  return (
    <form>
      <label className="form-label">¿Reside cerca o frecuenta a uno o más de los siguientes lugares?</label>
      
      <hr className="border-t border-white my-4" />
      
      {/* Sección Talleres */}
        <h2 className="text-lg font-semibold mb-4">Talleres</h2>
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
      
      <hr className="border-t border-white my-4" />
      
      {/* Sección Fábricas */}

        <h2 className="text-lg font-semibold mb-4">Fabricas</h2>
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
      
      <hr className="border-t border-white my-4" />
      
      {/* Sección Zonas de Exposición */}
        <h2 className="text-lg font-semibold mb-4">Zonas de Exposición</h2>
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
    </form>
  )
};
