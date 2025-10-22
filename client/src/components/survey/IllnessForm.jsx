import { CheckCircle } from "lucide-react";

export default function EnfermedadForm({ data, onChange, sintomas, patologias }) {

    const handleChange = (id, value) => {
        let newData = { ...data };
        
        // Lógica para manejar "Ninguna de las anteriores"
        if (id === 'ninguna_sintoma' && value) {
            // Si se selecciona "ninguna_sintoma", desmarcar todos los otros síntomas
            sintomas.forEach(item => {
                if (item.id !== 'ninguna_sintoma') {
                    newData[item.id] = false;
                }
            });
        } else if (id === 'ninguna_patologia' && value) {
            // Si se selecciona "ninguna_patologia", desmarcar todas las otras patologías
            patologias.forEach(item => {
                if (item.id !== 'ninguna_patologia') {
                    newData[item.id] = false;
                }
            });
        } else if (value && sintomas.some(item => item.id === id)) {
            // Si se selecciona cualquier síntoma, desmarcar "ninguna_sintoma"
            newData['ninguna_sintoma'] = false;
        } else if (value && patologias.some(item => item.id === id)) {
            // Si se selecciona cualquier patología, desmarcar "ninguna_patologia"
            newData['ninguna_patologia'] = false;
        }
        
        // Manejar el caso especial de intoxicación por metal
        if (id === 'dignostico_anterior') {
            if (value === 'si') {
                // Si selecciona "Sí", limpiar el campo de metal para que aparezca vacío
                newData['metal_dignostico'] = '';
            } else if (value === 'no') {
                // Si selecciona "No", poner "ninguno" como metal
                newData['metal_dignostico'] = 'ninguno';
            }
        }
        
        newData[id] = value;
        onChange(newData);
    };

    // Función para verificar si una sección tiene al menos una opción seleccionada
    const hasSelection = (items) => {
        return items.some(item => data[item.id]);
    };

    // Verificar si hay diagnóstico de intoxicación
    const hasDiagnostico = data.dignostico_anterior === 'si' || data.dignostico_anterior === 'no';

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

      <div className="space-y-3">
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

	return (
		<form className="space-y-6">
			{renderCheckboxGroup(
				"Síntomas",
				"¿Presenta alguno de los siguientes síntomas?",
				sintomas,
				hasSelection(sintomas),
			)}

			{renderCheckboxGroup(
				"Patologías",
				"¿Padece de alguna de estas patologías?",
				patologias,
				hasSelection(patologias),
			)}

			{/* Diagnóstico de Intoxicación */}
			<div
				className={`p-5 rounded-lg border-2 transition-all ${
				hasDiagnostico ? "bg-zinc-800/50 border-green-500" : "bg-zinc-900/50 border-zinc-700"
				}`}
			>
				<div className="flex items-center justify-between mb-3">
				<h3 className="text-lg font-semibold text-white">Diagnóstico de Intoxicación</h3>
				{hasDiagnostico && <CheckCircle className="text-green-500" size={20} />}
				</div>

				<p className="text-sm text-zinc-400 mb-4">¿Tiene algún diagnóstico previo sobre intoxicación por metal?</p>

				<div className="flex gap-4 mb-4">
				<label className="flex items-center gap-2 cursor-pointer">
					<input
					type="radio"
					name="dignostico_anterior"
					value="si"
					checked={data.dignostico_anterior === "si"}
					onChange={(e) => handleChange("dignostico_anterior", e.target.value)}
					className="w-4 h-4 border-zinc-600 bg-zinc-800 text-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-0 cursor-pointer"
					/>
					<span className="text-sm text-zinc-300">Sí</span>
				</label>

				<label className="flex items-center gap-2 cursor-pointer">
					<input
					type="radio"
					name="dignostico_anterior"
					value="no"
					checked={data.dignostico_anterior === "no"}
					onChange={(e) => handleChange("dignostico_anterior", e.target.value)}
					className="w-4 h-4 border-zinc-600 bg-zinc-800 text-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-0 cursor-pointer"
					/>
					<span className="text-sm text-zinc-300">No</span>
				</label>
				</div>

				{data.dignostico_anterior === "si" && (
				<div>
					<label htmlFor="metal_dignostico" className="block text-sm font-medium text-zinc-300 mb-2">
					Indique el metal:
					</label>
					<input
					id="metal_dignostico"
					type="text"
					value={data.metal_dignostico || ""}
					onChange={(e) => handleChange("metal_dignostico", e.target.value)}
					placeholder="Especifique el metal diagnosticado"
					className="w-full px-4 py-3 rounded-lg bg-zinc-800 border-2 border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
					/>
				</div>
				)}
			</div>
    	</form>
	)
};