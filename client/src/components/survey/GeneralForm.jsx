import { useState, useEffect } from 'react';

export default function GeneralForm({ data, onChange }) {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
    
    // Validar inmediatamente después del cambio
    if (touched[field]) {
      validateField(field, value);
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, data[field]);
  };

  const validateField = (field, value) => {
    let error = '';

    switch (field) {
      case 'nombre':
        if (!value || value.trim() === '') {
          error = 'El nombre es requerido';
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
          error = 'El nombre solo puede contener letras y espacios';
        } else if (value.length < 2) {
          error = 'El nombre debe tener al menos 2 caracteres';
        }
        break;

      case 'apellidos':
        if (!value || value.trim() === '') {
          error = 'Los apellidos son requeridos';
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
          error = 'Los apellidos solo pueden contener letras y espacios';
        } else if (value.length < 2) {
          error = 'Los apellidos deben tener al menos 2 caracteres';
        }
        break;

      case 'edad':
        if (!value && value !== 0) {
          error = 'La edad es requerida';
        } else if (isNaN(value)) {
          error = 'La edad debe ser un número';
        } else if (value < 0 || value > 120) {
          error = 'La edad debe estar entre 0 y 120 años';
        }
        break;

      case 'sexo':
        if (!value) {
          error = 'El sexo es requerido';
        } else if (!["masculino", "femenino"].includes(value)) {
          error = 'Seleccione una opción válida';
        }
        break;

      case 'sector':
        if (!value) {
          error = 'El sector es requerido';
        }
        break;

      case 'zona':
        if (!value) {
          error = 'La zona es requerida';
        }
        break;

      case 'direccion':
        if (!value || value.trim() === '') {
          error = 'La dirección es requerida';
        } else if (value.length < 5) {
          error = 'La dirección debe ser más específica';
        }
        break;

      case 'telefono':
        if (!value) {
          error = 'El teléfono es requerido';
        } else {
          const phoneClean = value.toString().replace(/\D/g, '');
          if (!/^[0-9]{11}$/.test(phoneClean)) {
            error = 'El teléfono debe tener 10 dígitos';
          }
        }
        break;

      case 'email':
        if (!value) {
          error = 'El correo electrónico es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'El formato del correo no es válido';
        }
        break;

      case 'ocupacion':
        if (!value || value.trim() === '') {
          error = 'La ocupación es requerida';
        } else if (value.length < 2) {
          error = 'La ocupación debe ser más específica';
        }
        break;

      case 'institucion':
        if (!value) {
          error = 'La institución es requerida';
        }
        break;

      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [field]: error
    }));

    return !error;
  };

  const validateGeneralData = (data) => {
    const requiredFields = ['nombre', 'apellidos', 'edad', 'sexo', 'sector', 'zona', 'direccion', 'telefono', 'email', 'ocupacion', 'institucion'];
    let isValid = true;

    requiredFields.forEach(field => {
      if (!validateField(field, data[field])) {
        isValid = false;
      }
    });

    return isValid;
  };

  // Validar automáticamente cuando los datos cambian (para casos de carga inicial)
  useEffect(() => {
    // Marcar todos como tocados si queremos validación inmediata
    // setTouched({
    //   nombre: true, apellidos: true, edad: true, sexo: true,
    //   sector: true, zona: true, direccion: true, telefono: true,
    //   email: true, ocupacion: true, institucion: true
    // });
  }, []);

  const getInputClassName = (field) => {
    if (!touched[field]) return "form-control";
    return errors[field] ? "form-control is-invalid" : "form-control is-valid";
  };

  // Función para que el componente padre pueda validar
  const isValid = () => {
    return validateGeneralData(data);
  };

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
    <form>
      {/* Fila 1: Nombre y Apellidos (2 columnas iguales) */}
      <hr className="border-t border-white my-4" />
      <div className="row mb-3">
        <div className="col-6">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            id="nombre"
            className={getInputClassName('nombre')}
            value={data.nombre || ""}
            onChange={(e) => handleChange("nombre", e.target.value)}
            onBlur={() => handleBlur("nombre")}
            placeholder="Ingrese su nombre"
            required
          />
          {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
        </div>
        <div className="col-6">
          <label htmlFor="apellidos" className="form-label">
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
          {errors.apellidos && <div className="invalid-feedback">{errors.apellidos}</div>}
        </div>
      </div>

      {/* Fila 2: Edad y Sexo (2 columnas iguales) */}
      <div className="row mb-3">
        <div className="col-6">
          <label htmlFor="edad" className="form-label">
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
          {errors.edad && <div className="invalid-feedback">{errors.edad}</div>}
        </div>
        <div className="col-6">
          <label htmlFor="sexo" className="form-label">
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
          {errors.sexo && <div className="invalid-feedback">{errors.sexo}</div>}
        </div>
      </div>

      {/* Fila 3: Sector y Zona (2 columnas iguales) */}
      <div className="row mb-3">
        <div className="col-6">
          <label htmlFor="sector" className="form-label">
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
          {errors.sector && <div className="invalid-feedback">{errors.sector}</div>}
        </div>
        <div className="col-6">
          <label htmlFor="zona" className="form-label">
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
          {errors.zona && <div className="invalid-feedback">{errors.zona}</div>}
        </div>
      </div>

      {/* Fila 4: Dirección (1 columna de ancho completo) */}
      <div className="row mb-3">
        <div className="col-12">
          <label htmlFor="direccion" className="form-label">
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
          {errors.direccion && <div className="invalid-feedback">{errors.direccion}</div>}
        </div>
      </div>

      {/* Fila 5: Teléfono y Correo Electrónico (2 columnas iguales) */}
      <div className="row mb-3">
        <div className="col-6">
          <label htmlFor="telefono" className="form-label">
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
          {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
        </div>
        <div className="col-6">
          <label htmlFor="email" className="form-label">
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
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
      </div>

      {/* Fila 6: Ocupación (1 columna de ancho completo) */}
      <div className="row mb-3">
        <div className="col-12">
          <label htmlFor="ocupacion" className="form-label">
            Ocupación
          </label>
          <input
            id="ocupacion"
            className={getInputClassName('ocupacion')}
            value={data.ocupacion || ""}
            onChange={(e) => handleChange("ocupacion", e.target.value)}
            onBlur={() => handleBlur("ocupacion")}
            placeholder="Ingrese su ocupación"
            required
          />
          {errors.ocupacion && <div className="invalid-feedback">{errors.ocupacion}</div>}
        </div>
      </div>

      {/* Fila 7: Institución (1 columna de ancho completo) */}
      <div className="row mb-3">
        <div className="col-12">
          <label htmlFor="institucion" className="form-label">
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
          {errors.institucion && <div className="invalid-feedback">{errors.institucion}</div>}
        </div>
      </div>
      <div className="form-check mt-4">
        <input
          className="form-check-input"
          type="checkbox"
          id="venopuncion"
          checked={!!data.venopuncion}
          onChange={(e) => handleChange("venopuncion", e.target.checked)}
        />
        <label className="form-check-label" htmlFor="venopuncion">
          Acepto participar en la venopunción para la recolección de muestras.
        </label>
      </div>
    </form>
  );
}