import { useState } from "react";

// Suponiendo que este componente recibe 'data' y 'onChange' como props
// para manejar el estado desde un componente padre.
export default function AlimentosForm({ data, onChange }) {
  
  // Array de los alimentos sobre los que se preguntará
  const alimentos = [
    { id: "vegetales", label: "Vegetales (brócoli, espinaca, zanahoria, etc.)" },
    { id: "frutas", label: "Frutas (manzana, cambur, naranja, etc.)" },
    { id: "granos", label: "Granos (caraotas, lentejas, arvejas, etc.)" },
    { id: "carne_roja", label: "Carne roja (res, cerdo, etc.)" },
    { id: "carne_blanca", label: "Carne blanca (pollo, pavo, etc.)" },
    { id: "pescado", label: "Pescado" },
    { id: "enlatados", label: "Alimentos enlatados" },
    { id: "embutidos", label: "Alimentos embutidos (jamón, salchichas, etc.)" },
  ];

  // Opciones de frecuencia de consumo
  const opcionesFrecuencia = [
    { id: "nunca", label: "Nunca", value: 1 },
    { id: "rara_vez", label: "Rara vez", value: 2 },
    { id: "a_veces", label: "A veces", value: 3 },
    { id: "frecuentemente", label: "Frecuentemente", value: 4 },
    { id: "diario", label: "Diario", value: 5 },
  ];

  // Función para manejar los cambios en los radio buttons
  const handleChange = (alimentoId, frecuenciaLabel) => {
    onChange({ ...data, [alimentoId]: frecuenciaLabel });
  };

  return (
    <form>
      {/* Título y descripción más limpios */}
      <h2 className="text-lg font-semibold mb-2">Hábitos Alimenticios</h2>
      <p className="mb-3">
        Indique con qué frecuencia consume los siguientes tipos de alimentos.
      </p>

      {/* La escala se muestra una sola vez y de forma clara */}
      <div className="card bg-light border-secondary mb-4">
        <div className="card-body text-center p-2">
          <p className="mb-0 text-muted">
            <strong>Use la escala:</strong> 1 = Nunca, 2 = Rara vez, 3 = A veces, 4 = Frecuentemente, 5 = Diario
          </p>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              {/* Se le da más espacio a la columna de alimentos */}
              <th scope="col" style={{ width: '35%' }}>Alimento</th>
              
              {/* El encabezado de la tabla ahora usa solo los números de la escala */}
              {opcionesFrecuencia.map((opcion) => (
                <th key={opcion.id} scope="col" className="text-center">
                  {opcion.value} {/* Se muestra el número (ej: 1) en lugar del label ("Nunca") */}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {alimentos.map((alimento) => (
              <tr key={alimento.id}>
                {/* El texto del alimento ahora está alineado verticalmente */}
                <td>{alimento.label}</td>
                
                {opcionesFrecuencia.map((opcion) => (
                  <td key={opcion.id} className="text-center">
                    <div className="form-check d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={alimento.id}
                        id={`${alimento.id}-${opcion.id}`}
                        value={opcion.label}
                        checked={data[alimento.id] === opcion.label}
                        onChange={() => handleChange(alimento.id, opcion.label)}
                      />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </form>
  );
}