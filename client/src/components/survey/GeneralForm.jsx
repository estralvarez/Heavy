import { useState, useEffect } from 'react';

export default function GeneralForm({ data, onChange }) {
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })

    if (touched[field]) {
      validateField(field, value)
    }
  }

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    validateField(field, data[field])
  }

  const validateField = (field, value) => {
    let error = ""

    switch (field) {
      case "nombre":
        if (!value || value.trim() === "") {
          error = "El nombre es requerido"
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
          error = "El nombre solo puede contener letras y espacios"
        } else if (value.length < 2) {
          error = "El nombre debe tener al menos 2 caracteres"
        }
        break

      case "apellidos":
        if (!value || value.trim() === "") {
          error = "Los apellidos son requeridos"
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
          error = "Los apellidos solo pueden contener letras y espacios"
        } else if (value.length < 2) {
          error = "Los apellidos deben tener al menos 2 caracteres"
        }
        break

      case "edad":
        if (!value && value !== 0) {
          error = "La edad es requerida"
        } else if (isNaN(value)) {
          error = "La edad debe ser un número"
        } else if (value < 0 || value > 120) {
          error = "La edad debe estar entre 0 y 120 años"
        }
        break

      case "sexo":
        if (!value) {
          error = "El sexo es requerido"
        }
        break

      case "sector":
        if (!value) {
          error = "El sector es requerido"
        }
        break

      case "zona":
        if (!value) {
          error = "La zona es requerida"
        }
        break

      case "direccion":
        if (!value || value.trim() === "") {
          error = "La dirección es requerida"
        } else if (value.length < 5) {
          error = "La dirección debe ser más específica"
        }
        break

      case "telefono":
        if (!value) {
          error = "El teléfono es requerido"
        } else {
          const phoneClean = value.toString().replace(/\D/g, "")
          if (!/^[0-9]{11}$/.test(phoneClean)) {
            error = "El teléfono debe tener 11 dígitos"
          }
        }
        break

      case "email":
        if (!value) {
          error = "El correo electrónico es requerido"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "El formato del correo no es válido"
        }
        break

      case "ocupacion_madre":
      case "ocupacion_padre":
        if (!value || value.trim() === "") {
          error = "La ocupación es requerida"
        } else if (value.length < 2) {
          error = "La ocupación debe ser más específica"
        }
        break

      case "institucion":
        if (!value) {
          error = "La institución es requerida"
        }
        break
    }

    setErrors((prev) => ({ ...prev, [field]: error }))
    return !error
  }

  const getInputClassName = (field) => {
    const baseClasses =
      "w-full px-4 py-3 rounded-lg bg-zinc-800 border-2 text-white placeholder-zinc-500 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950"

    if (!touched[field]) {
      return `${baseClasses} border-zinc-700 focus:border-red-500 focus:ring-red-500/20`
    }

    return errors[field]
      ? `${baseClasses} border-red-500 focus:border-red-500 focus:ring-red-500/20`
      : `${baseClasses} border-green-500 focus:border-green-500 focus:ring-green-500/20`
  }

  const zonasPorSector = {
    norte_a: [
      "Pueblo de San Diego",
      "La Josefina I y II",
      "Las Mercedes",
      "Sabana del Medio",
      "La Cumaca",
      "Los Tamarindo",
      "San Francisco de Cupira",
      "La Lopera",
      "Minigranja San Diego",
      "El Polvero-Higuerote",
      "El Otro Lado",
      "Las Morochas I, II, III y IV",
      "La Cienaga",
      "Valle Fresco Norte",
      "La Ponderosa",
      "Las Trianas",
      "La Trinitarias",
      "Valle del Rey",
      "Villa Jardin",
      "Villas Monte Alban",
      "Desarrollos Taronk",
      "Desarrollos Temabeca",
      "Todai",
      "La Cruz de San Diego",
      "La Cruz de Aragua",
      "La Cruz de Valencia",
      "La Cruz de Guacara",
      "La Cruz de Bejuma",
      "La Cruz de Carlos Arvelo",
      "La Cruz de Miranda",
      "La Cruz de Montalban",
      "La Cruz de Diego",
      "Villas de San Diego",
    ],
    norte_b: [
      "Moteserino 1 y 2",
      "Santa Clara",
      "Divino Niño",
      "Bosqueserino",
      "Parqueserino",
      "Villaserino",
      "Contry Park",
      "El Remanso",
      "Villa Maporal",
      "Aves de Paraiso",
      "Urb. Tulipan",
      "Villas Paraiso I",
      "Los Faroles",
      "Valparaiso",
      "Los Frailes",
      "La Ciudadela",
      "Montemayor",
    ],
    centro_a: [
      "La Esmeralda",
      "Lomas de la Esmeralda",
      "Terrazas de San Diego",
    ],
    centro_b: [
      "Aseorivica",
      "Chalets Contry",
      "Las Gaviotas",
      "Los Andes",
      "Orion",
      "Los Anaucos",
      "Sansur",
      "Poblado de San Diego",
      "Valle Verde",
      "Yuma 26 y 27",
      "Yuma I y II",
      "Valle de Oro (Conj. Res. El Trapiche, El Tejar, Las Aldabas, Zaguan, La Estancia, La Querencia)",
      "Conj. Valles de San Diego",
    ],
    centro_c: ["El Morro I y II", "Terrazas de San Diego"],
    sur: [
      "Campo Solo",
      "Los Cedros",
      "Primero de Mayo-Los Proceres",
      "Colinas de San Diego",
      "El Paraiso",
      "Los Arales",
      "Magallanes",
      "Complejo de los Arales",
      "Laguana Villas",
      "Paso Real",
    ],
    industrial: [
      "Castillito",
      "Terrazas de Castillito",
      "Zona Industrial de San Diego",
      "Urb. Industria San Diego",
      "Castillete",
      "Mozanga",
      "Fundo La Union",
      "Big Low Center",
    ],
  };

  return (
    <form className="space-y-6">
      {/* Fila 1: Nombre y Apellidos (2 columnas iguales) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-zinc-300 mb-2">
            Nombre del paciente
          </label>
          <input
            id="nombre"
            className={getInputClassName('nombre')}
            value={data.nombre || ""}
            onChange={(e) => handleChange("nombre", e.target.value)}
            onBlur={() => handleBlur("nombre")}
            placeholder="Ingrese su nombre del paciente"
            required
          />
          {touched.nombre && errors.nombre && <p className="text-red-400 text-sm mt-1">{errors.nombre}</p>}
        </div>
        <div>
          <label htmlFor="apellidos" className="block text-sm font-medium text-zinc-300 mb-2">
            Apellidos
          </label>
          <input
            id="apellidos"
            className={getInputClassName('apellidos')}
            value={data.apellidos || ""}
            onChange={(e) => handleChange("apellidos", e.target.value)}
            onBlur={() => handleBlur("apellidos")}
            placeholder="Ingrese sus apellidos"
            required
          />
          {touched.apellidos && errors.apellidos && <p className="text-red-400 text-sm mt-1">{errors.apellidos}</p>}
        </div>
      </div>

      {/* Fila 2: Edad y Sexo (2 columnas iguales) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="edad" className="block text-sm font-medium text-zinc-300 mb-2">
            Edad
          </label>
          <input
            id="edad"
            type="number"
            className={getInputClassName('edad')}
            value={data.edad || ""}
            onChange={(e) => handleChange("edad", e.target.value)}
            onBlur={() => handleBlur("edad")}
            placeholder="Ingrese su edad"
            min="0"
            max="120"
            required
          />
          {touched.edad && errors.edad && <p className="text-red-400 text-sm mt-1">{errors.edad}</p>}
        </div>
        <div>
          <label htmlFor="sexo" className="block text-sm font-medium text-zinc-300 mb-2">
            Sexo
          </label>
          <select
            id="sexo"
            className={getInputClassName('sexo')}
            value={data.sexo || ""}
            onChange={(e) => handleChange("sexo", e.target.value)}
            onBlur={() => handleBlur("sexo")}
            required
          >
            <option value="">Seleccione</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
          {touched.sexo && errors.sexo && <p className="text-red-400 text-sm mt-1">{errors.sexo}</p>}
        </div>
      </div>

      {/* Fila 3: Sector y Zona (2 columnas iguales) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="sector" className="block text-sm font-medium text-zinc-300 mb-2">
            Sector
          </label>
          <select
            id="sector"
            className={getInputClassName('sector')}
            value={data.sector || ""}
            onChange={(e) => handleChange("sector", e.target.value)}
            onBlur={() => handleBlur("sector")}
            required
          >
            <option value="">Seleccione una opción</option>
            <option value="norte_a">Norte A</option>
            <option value="norte_b">Norte B</option>
            <option value="centro_a">Centro A</option>
            <option value="centro_b">Centro B</option>
            <option value="centro_c">Centro C</option>
            <option value="sur">Sur</option>
            <option value="industrial">Industrial</option>
          </select>
          {touched.sector && errors.sector && <p className="text-red-400 text-sm mt-1">{errors.sector}</p>}
        </div>
        <div>
          <label htmlFor="zona" className="block text-sm font-medium text-zinc-300 mb-2">
            Zona
          </label>
          <select
            id="zona"
            className={getInputClassName('zona')}
            value={data.zona || ""}
            onChange={(e) => handleChange("zona", e.target.value)}
            onBlur={() => handleBlur("zona")}
            required
            disabled={!data.sector}
          >
            <option value="">Seleccione una opción</option>
            {data.sector &&
              zonasPorSector[data.sector]?.map((zona) => (
                <option key={zona} value={zona}>
                  {zona}
                </option>
              ))}
          </select>
          {touched.zona && errors.zona && <p className="text-red-400 text-sm mt-1">{errors.zona}</p>}
        </div>
      </div>

      {/* Fila 4: Dirección (1 columna de ancho completo) */}
      <div>
        <div>
          <label htmlFor="direccion" className="block text-sm font-medium text-zinc-300 mb-2">
            Dirección
          </label>
          <input
            id="direccion"
            className={getInputClassName('direccion')}
            value={data.direccion || ""}
            onChange={(e) => handleChange("direccion", e.target.value)}
            onBlur={() => handleBlur("direccion")}
            placeholder="Calle, número"
            required
          />
          {touched.direccion && errors.direccion && <p className="text-red-400 text-sm mt-1">{errors.direccion}</p>}
        </div>
      </div>

      {/* Fila 5: Teléfono y Correo Electrónico (2 columnas iguales) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-zinc-300 mb-2">
            Teléfono
          </label>
          <input
            id="telefono"
            type="tel"
            className={getInputClassName('telefono')}
            value={data.telefono || ""}
            onChange={(e) => handleChange("telefono", e.target.value)}
            onBlur={() => handleBlur("telefono")}
            placeholder="04121234567"
            required
          />
          {touched.telefono && errors.telefono && <p className="text-red-400 text-sm mt-1">{errors.telefono}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
            Correo Electrónico
          </label>
          <input
            id="email"
            type="email"
            className={getInputClassName('email')}
            value={data.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            placeholder="correo@ejemplo.com"
            required
          />
          {touched.email && errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
        </div>
      </div>

      {/* Ocupación Madre y Padre */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="ocupacion_madre" className="block text-sm font-medium text-zinc-300 mb-2">
            Ocupación Madre
          </label>
          <input
            id="ocupacion_madre"
            className={getInputClassName('ocupacion_madre')}
            value={data.ocupacion_madre || ""}
            onChange={(e) => handleChange("ocupacion_madre", e.target.value)}
            onBlur={() => handleBlur("ocupacion_madre")}
            placeholder="Ingrese la ocupación de su madre"
            required
          />
          {touched.ocupacion_madre && errors.ocupacion_madre && (
            <p className="text-red-400 text-sm mt-1">{errors.ocupacion_madre}</p>
          )}
        </div>
        <div>
          <label htmlFor="ocupacion_padre" className="block text-sm font-medium text-zinc-300 mb-2">
            Ocupación Padre
          </label>
          <input
            id="ocupacion_padre"
            className={getInputClassName('ocupacion_padre')}
            value={data.ocupacion_padre || ""}
            onChange={(e) => handleChange("ocupacion_padre", e.target.value)}
            onBlur={() => handleBlur("ocupacion_padre")}
            placeholder="Ingrese la ocupación de su padre"
            required
          />
          {touched.ocupacion_padre && errors.ocupacion_padre && (
            <p className="text-red-400 text-sm mt-1">{errors.ocupacion_padre}</p>
          )}
        </div>  
      </div>
      

      {/* Fila 7: Institución (1 columna de ancho completo) */}
      <div>
        <div>
          <label htmlFor="institucion" className="block text-sm font-medium text-zinc-300 mb-2">
            Institución
          </label>
          <select
            id="institucion"
            className={getInputClassName('institucion')}
            value={data.institucion || ""}
            onChange={(e) => handleChange("institucion", e.target.value)}
            onBlur={() => handleBlur("institucion")}
            required
          >
            <option value="">Seleccione una opción</option>
            <option value="institucion_a">Institución A</option>
            <option value="institucion_b">Institución B</option>
            <option value="institucion_c">Institución C</option>
            <option value="institucion_d">Institución D</option>
          </select>
          {touched.institucion && errors.institucion && <p className="text-red-400 text-sm mt-1">{errors.institucion}</p>} 
        </div>
      </div>
      {/* Fila 8: Venopunción (checkbox) */}
      <div className="flex items-start gap-3 p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
        <input
          className="mt-1 w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-0 cursor-pointer"
          type="checkbox"
          id="venopuncion"
          checked={!!data.venopuncion}
          onChange={(e) => handleChange("venopuncion", e.target.checked)}
          
        />
        <label className="text-sm text-zinc-300 cursor-pointer select-none" htmlFor="venopuncion">
          Acepto participar en la venopunción para la recolección de muestras.
        </label>
      </div>
    </form>
  );
}