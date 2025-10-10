import { useState } from "react"

export default function EnfermedadForm({ data, onChange, sintomas, patologias }) {


    const handleChange = (id, value) => {
		onChange({ ...data, [id]: value });
	};

	return (
		<form>
			<hr className="border-t border-white my-4" />
			
			{/* Sección Síntomas */}
				<h2 className="text-lg font-semibold mb-4">Síntomas</h2>
				<label className="form-label">¿Presenta alguno de los siguientes síntomas?</label>
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

			<hr className="border-t border-white my-4" />
			
			{/* Sección Patologías */}
				<h2 className="text-lg font-semibold mb-4">Patologías</h2>
				<label className="form-label">¿Padece de alguna de estas patologías?</label>
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
		</form>
	)
};