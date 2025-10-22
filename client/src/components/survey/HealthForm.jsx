import { CheckCircle } from "lucide-react";

export default function SaludForm({ data, onChange, transporte, suplementos, agua }) {
    
    const handleChange = (id, value) => {
        let newData = { ...data };
        
        // Lógica para manejar "Ninguno de los anteriores" en suplementos
        if (id === 'ninguno_productos' && value) {
            // Si se selecciona "ninguno_productos", desmarcar todos los otros suplementos
            suplementos.forEach(item => {
                if (item.id !== 'ninguno_productos') {
                    newData[item.id] = false;
                }
            });
        } else if (value && suplementos.some(item => item.id === id && item.id !== 'ninguno_productos')) {
            // Si se selecciona cualquier suplemento, desmarcar "ninguno_productos"
            newData['ninguno_productos'] = false;
        }
        
        newData[id] = value;
        onChange(newData);
    };

    // Funciones para verificar si una sección tiene al menos una opción seleccionada
    const hasSelection = (items) => {
        return items.some(item => data[item.id]);
    };

    // Verificar si las preguntas dicotómicas han sido respondidas
    const hasRespuestaFuma = data.fuma === 'True' || data.fuma === 'False';
    const hasRespuestaActividad = data.actividad === 'True' || data.actividad === 'False';
    const hasRespuestaBombillos = data.bombillos === 'True' || data.bombillos === 'False';
    const hasRespuestaTecho = data.techo === 'True' || data.techo === 'False';
    const hasRespuestaJoyeria = data.joyeria === 'True' || data.joyeria === 'False';
    const hasRespuestasDicotomicas = hasRespuestaFuma && hasRespuestaActividad && hasRespuestaBombillos && hasRespuestaTecho && hasRespuestaJoyeria;
    
    const renderCheckboxGroup = (
    title,
    description,
    items,
    hasSelected,
  ) => (
    <div
      className={`p-5 rounded-lg border-2 transition-all ${
        hasSelected ? "bg-zinc-800/50 border-green-500" : "bg-zinc-900/50 border-zinc-700"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {hasSelected && <CheckCircle className="text-green-500" size={20} />}
      </div>

      <p className="text-sm text-zinc-400 mb-4">{description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((item) => (
          <label key={item.id} className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={data[item.id] || false}
              onChange={(e) => handleChange(item.id, e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-0 cursor-pointer"
            />
            <span className="text-sm text-zinc-300 group-hover:text-white transition-colors select-none">
              {item.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  )

  const renderRadioQuestion = (question, fieldName) => (
    <div className="mb-6 last:mb-0">
      <p className="text-sm text-zinc-300 mb-3">{question}</p>
      <div className="flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={fieldName}
            value="True"
            checked={data[fieldName] === "True"}
            onChange={(e) => handleChange(fieldName, e.target.value)}
            className="w-4 h-4 border-zinc-600 bg-zinc-800 text-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-0 cursor-pointer"
          />
          <span className="text-sm text-zinc-300">Sí</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={fieldName}
            value="False"
            checked={data[fieldName] === "False"}
            onChange={(e) => handleChange(fieldName, e.target.value)}
            className="w-4 h-4 border-zinc-600 bg-zinc-800 text-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-0 cursor-pointer"
          />
          <span className="text-sm text-zinc-300">No</span>
        </label>
      </div>
    </div>
  )

  return (
    <form className="space-y-6">
      {renderCheckboxGroup(
        "Medio de Transporte",
        "¿Qué medio de transporte usa habitualmente?",
        transporte,
        hasSelection(transporte),
      )}

      {renderCheckboxGroup(
        "Productos y Suplementos",
        "¿Consume alguno de estos productos?",
        suplementos,
        hasSelection(suplementos),
      )}

      {renderCheckboxGroup("Tipo de Agua", "¿Qué tipo de agua suele consumir?", agua, hasSelection(agua))}

      {/* Hábitos de Salud */}
      <div
        className={`p-5 rounded-lg border-2 transition-all ${
          hasRespuestasDicotomicas ? "bg-zinc-800/50 border-green-500" : "bg-zinc-900/50 border-zinc-700"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Hábitos de Salud</h3>
          {hasRespuestasDicotomicas && <CheckCircle className="text-green-500" size={20} />}
        </div>

        <div className="space-y-6">
          {renderRadioQuestion("¿Ha estado expuesto al humo del cigarrillo en alguna de estas formas?", "fuma")}

          {renderRadioQuestion("¿Realiza usted actividad física o deportiva?", "actividad")}

          {renderRadioQuestion("¿En su hogar usan bombillos ahorradores como fuente de iluminación?", "bombillos")}

          {renderRadioQuestion("¿Su hogar tiene techo de asbestos?", "techo")}

          {renderRadioQuestion("¿Usa usted algún tipo de joyería?", "joyeria")}
        </div>
      </div>
    </form>
    )
}
