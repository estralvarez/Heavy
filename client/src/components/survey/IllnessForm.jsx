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

	return (
		<form>
			<hr className="border-t border-white my-4" />
			{/* Sección Síntomas */}
			<div className={`card-shadow p-3 border rounded-3 transition-all mb-4 ${
				hasSelection(sintomas) ? 'border-success' : ''
			}`}>
				<div className="d-flex align-items-center mb-3">
					<h2 className="text-lg font-semibold mb-0 flex-grow-1">Síntomas</h2>
					{hasSelection(sintomas) && <CheckCircle className="text-success" size={20} />}
				</div>
				<label className="form-label">¿Presenta alguno de los siguientes síntomas?</label>
				<hr className="border-t border-white my-1" />
				{sintomas.map((sintoma) => (
					<div key={sintoma.id} className="form-check mb-3">
						<input
							type="checkbox"
							className="form-check-input"
							id={`sintoma-${sintoma.id}`}
							checked={data[sintoma.id] || false}
							onChange={(e) => handleChange(sintoma.id, e.target.checked)}
						/>
						<label className="form-check-label" htmlFor={`sintoma-${sintoma.id}`}>
							{sintoma.label}
						</label>
					</div>
				))}
			</div>

			<hr className="border-t border-white my-4" />
			
			{/* Sección Patologías */}
			<div className={`card-shadow p-3 border rounded-3 transition-all mb-4 ${
				hasSelection(patologias) ? 'border-success' : ''
			}`}>
				<div className="d-flex align-items-center mb-3">
					<h2 className="text-lg font-semibold mb-0 flex-grow-1">Patologías</h2>
					{hasSelection(patologias) && <CheckCircle className="text-success" size={20} />}
				</div>
				<label className="form-label">¿Padece de alguna de estas patologías?</label>
				<hr className="border-t border-white my-1" />
				{patologias.map((patologia) => (
					<div key={patologia.id} className="form-check mb-3">
						<input
							type="checkbox"
							className="form-check-input"
							id={`patologia-${patologia.id}`}
							checked={data[patologia.id] || false}
							onChange={(e) => handleChange(patologia.id, e.target.checked)}
						/>
						<label className="form-check-label" htmlFor={`patologia-${patologia.id}`}>
							{patologia.label}
						</label>
					</div>	
				))}
			</div>
			{/* Sección Diagnóstico de Intoxicación por Metal */}
			<div className={`card-shadow p-3 border rounded-3 transition-all mb-4 ${
				hasDiagnostico ? 'border-success' : ''
			}`}>
				<div className="d-flex align-items-center mb-3">
					<h2 className="text-lg font-semibold mb-0 flex-grow-1">Diagnóstico de Intoxicación</h2>
					{hasDiagnostico && <CheckCircle className="text-success" size={20} />}
				</div>
				<label className="form-label">¿Tiene algún diagnóstico previo sobre intoxicación por metal?</label>
				<div className="d-flex gap-4 mb-3">
					<div className="form-check">
						<input
							type="radio"
							className="form-check-input"
							id="dignostico_anterior_si"
							name="dignostico_anterior"
							value="si"
							checked={data.dignostico_anterior === 'si'}
							onChange={(e) => handleChange('dignostico_anterior', e.target.value)}
						/>
						<label className="form-check-label" htmlFor="dignostico_anterior_si">
							Sí
						</label>
					</div>
					<div className="form-check">
						<input
							type="radio"
							className="form-check-input"
							id="dignostico_anterior_no"
							name="dignostico_anterior"
							value="no"
							checked={data.dignostico_anterior === 'no'}
							onChange={(e) => handleChange('dignostico_anterior', e.target.value)}
						/>
						<label className="form-check-label" htmlFor="dignostico_anterior_no">
							No
						</label>
					</div>
				</div>
				
				{/* Mostrar input de metal solo si selecciona "Sí" */}
				{data.dignostico_anterior === 'si' && (
					<div className="mb-3">
						<label htmlFor="metal_dignostico" className="form-label">Indique el metal:</label>
						<input
							type="text"
							className="form-control"
							id="metal_dignostico"
							value={data.metal_dignostico || ''}
							onChange={(e) => handleChange('metal_dignostico', e.target.value)}
							placeholder="Especifique el metal diagnosticado"
						/>
					</div>
				)}
			</div>
		</form>
	)
};