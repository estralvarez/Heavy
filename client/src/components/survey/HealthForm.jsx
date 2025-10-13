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
    
    return (
        <form>
            <hr className="border-t border-white my-4" />
            {/* Sección Medio de transporte */}
            <div className={`card-shadow p-3 border rounded-3 transition-all mb-4 ${
                hasSelection(transporte) ? 'border-success' : ''
            }`}>
                <div className="d-flex align-items-center mb-3">
                    <h2 className="text-lg font-semibold mb-0 flex-grow-1">Medio de Transporte</h2>
                    {hasSelection(transporte) && <CheckCircle className="text-success" size={20} />}
                </div>
                <label className="form-label">¿Qué medio de transporte usa habitualmente?</label>
                <div className="grid grid-cols-2 gap-4 mt-3">
                    {transporte.map((transporte) => (
                        <div key={transporte.id} className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id={`transporte-${transporte.id}`}
                                checked={data[transporte.id] || false}
                                onChange={(e) => {
                                    handleChange(transporte.id, e.target.checked);
                                }}
                            />
                            <label className="form-check-label" htmlFor={`transporte-${transporte.id}`}>
                                {transporte.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <hr className="border-t border-white my-4" />

            {/* Sección Productos/Suplementos */}
            <div className={`card-shadow p-3 border rounded-3 transition-all mb-4 ${
                hasSelection(suplementos) ? 'border-success' : ''
            }`}>
                <div className="d-flex align-items-center mb-3">
                    <h2 className="text-lg font-semibold mb-0 flex-grow-1">Productos y Suplementos</h2>
                    {hasSelection(suplementos) && <CheckCircle className="text-success" size={20} />}
                </div>
                <label className="form-label">¿Consume alguno de estos productos?</label>
                <div className="grid grid-cols-2 gap-4 mt-3">
                    {suplementos.map((suplemento) => (
                        <div key={suplemento.id} className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id={`producto-${suplemento.id}`}
                                checked={data[suplemento.id] || false}
                                onChange={(e) => {
                                    handleChange(suplemento.id, e.target.checked);
                                }}
                            />
                            <label className="form-check-label" htmlFor={`producto-${suplemento.id}`}>
                                {suplemento.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <hr className="border-t border-white my-4" />

            {/* Sección Agua */}
            <div className={`card-shadow p-3 border rounded-3 transition-all mb-4 ${
                hasSelection(agua) ? 'border-success' : ''
            }`}>
                <div className="d-flex align-items-center mb-3">
                    <h2 className="text-lg font-semibold mb-0 flex-grow-1">Tipo de Agua</h2>
                    {hasSelection(agua) && <CheckCircle className="text-success" size={20} />}
                </div>
                <label className="form-label">¿Qué tipo de agua suele consumir?</label>
                <div className="grid grid-cols-3 gap-4 mt-3">
                    {agua.map((agua) => (
                        <div key={agua.id} className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id={`agua-${agua.id}`}
                                checked={data[agua.id] || false}
                                onChange={(e) => {
                                    handleChange(agua.id, e.target.checked);
                                }}
                            />
                            <label className="form-check-label" htmlFor={`agua-${agua.id}`}>
                                {agua.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <hr className="border-t border-white my-4" />

            {/* Sección Preguntas dicotómicas */}
            <div className={`card-shadow p-3 border rounded-3 transition-all mb-4 ${
                hasRespuestasDicotomicas ? 'border-success' : ''
            }`}>
                <div className="d-flex align-items-center mb-3">
                    <h2 className="text-lg font-semibold mb-0 flex-grow-1">Hábitos de Salud</h2>
                    {hasRespuestasDicotomicas && <CheckCircle className="text-success" size={20} />}
                </div>
                
                {/* Pregunta 1: Exposición al humo */}
                <div className="mb-4">
                    <label className="form-label">
                        ¿Ha estado expuesto al humo del cigarrillo en alguna de estas formas?
                    </label>
                    <div className="d-flex gap-4 mt-2">
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                id="expuesto_humo_si"
                                name="fuma"
                                value="True"
                                checked={data.fuma === "True"}
                                onChange={(e) => handleChange("fuma", e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="expuesto_humo_si">Sí</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                id="expuesto_humo_no"
                                name="fuma"
                                value="False"
                                checked={data.fuma === "False"}
                                onChange={(e) => handleChange("fuma", e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="expuesto_humo_no">No</label>
                        </div>
                    </div>
                </div>

                {/* Pregunta 2: Actividad física */}
                <div className="mb-4">
                    <label className="form-label">
                        ¿Realiza usted actividad física o deportiva?
                    </label>
                    <div className="d-flex gap-4 mt-2">
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                id="actividad_fisica_si"
                                name="actividad"
                                value="True"
                                checked={data.actividad === "True"}
                                onChange={(e) => handleChange("actividad", e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="actividad_fisica_si">Sí</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                id="actividad_fisica_no"
                                name="actividad"
                                value="False"
                                checked={data.actividad === "False"}
                                onChange={(e) => handleChange("actividad", e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="actividad_fisica_no">No</label>
                        </div>
                    </div>
                </div>

                {/* Pregunta 3: Bombillos ahorradores */}
                <div className="mb-4">
                    <label className="form-label">
                        ¿En su hogar usan bombillos ahorradores como fuente de iluminación?
                    </label>
                    <div className="d-flex gap-4 mt-2">
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                id="bombillos_ahorradores_si"
                                name="bombillos"
                                value="True"
                                checked={data.bombillos === "True"}
                                onChange={(e) => handleChange("bombillos", e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="bombillos_ahorradores_si">Sí</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                id="bombillos_ahorradores_no"
                                name="bombillos"
                                value="False"
                                checked={data.bombillos === "False"}
                                onChange={(e) => handleChange("bombillos", e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="bombillos_ahorradores_no">No</label>
                        </div>
                    </div>
                </div>

                {/* Pregunta 4: Techo de asbestos */}
                <div className="mb-4">
                    <label className="form-label">
                        ¿Su hogar tiene techo de asbestos?
                    </label>
                    <div className="d-flex gap-4 mt-2">
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                id="techo_asbestos_si"
                                name="techo"
                                value="True"
                                checked={data.techo === "True"}
                                onChange={(e) => handleChange("techo", e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="techo_asbestos_si">Sí</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                id="techo_asbestos_no"
                                name="techo"
                                value="False"
                                checked={data.techo === "False"}
                                onChange={(e) => handleChange("techo", e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="techo_asbestos_no">No</label>
                        </div>
                    </div>
                </div>

                {/* Pregunta 5: Joyería */}
                <div className="mb-4">
                    <label className="form-label">
                        ¿Usa usted algún tipo de joyería?
                    </label>
                    <div className="d-flex gap-4 mt-2">
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                id="joyeria_si"
                                name="joyeria"
                                value="True"
                                checked={data.joyeria === "True"}
                                onChange={(e) => handleChange("joyeria", e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="joyeria_si">Sí</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                id="joyeria_no"
                                name="joyeria"
                                value="False"
                                checked={data.joyeria === "False"}
                                onChange={(e) => handleChange("joyeria", e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="joyeria_no">No</label>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="border-t border-white my-4" />
        </form>
    )
}
