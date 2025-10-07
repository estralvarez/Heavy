import { useState, useEffect } from "react";
import { CircleAlert } from "lucide-react";
import { useNavigate} from "react-router-dom";
import GeneralForm from "./survey/GeneralForm";
import "../index.css";

export default function RegistroPage() {
  const [generalData, setGeneralData] = useState({});
  const [zonasData, setZonasData] = useState({});
  const [sintomasData, setSintomasData] = useState({});
  const [habitosAlimenticiosData, setHabitosAlimenticiosData] = useState({});
  const [habitosSaludData, setHabitosSaludData] = useState({});
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [venipunctureAccepted, setVenipunctureAccepted] = useState(false);
  const [pacienteId, setPacienteId] = useState(null);
  const totalSteps = 5;

  // ...steps y lógica de guardado igual...
  const steps = [
    { id: 1, title: "Datos Generales", description: "Información personal" },
    { id: 2, title: "Zonas de Exposición", description: "Lugares de exposición" },
    { id: 3, title: "Síntomas", description: "Síntomas experimentados" },
    { id: 4, title: "Hábitos Alimenticios", description: "Información dietética" },
    { id: 5, title: "Hábitos de Salud", description: "Estilo de vida" },
  ]

  useEffect(() => {
    // Simula carga y consentimiento
    setShowConsentModal(false);
  }, []);

const API = "http://127.0.0.1:5000";

const handleNext = async () => {
  if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  window.scrollTo({ top: 0, behavior: "smooth" });
  
  if (currentStep === 1) {
    try {
      // Validar los datos antes de enviar
      if (!validateGeneralData(generalData)) {
        alert('Por favor, corrige los errores en el formulario antes de continuar');
        return;
      }

      const requestData = {
        datos_generales: {
          nombre: generalData.nombre.trim(),
          apellido: generalData.apellidos.trim(), // Asegúrate que coincida con el backend
          edad: parseInt(generalData.edad),
          sexo: generalData.sexo,
          sector: generalData.sector,
          zona: generalData.zona,
          direccion: generalData.direccion.trim(),
          telefono: generalData.telefono.trim(),
          email: generalData.email.trim(),
          ocupacion: generalData.ocupacion.trim(),
          institucion: generalData.institucion
        }
      };

      console.log("📤 Enviando datos:", requestData);

      const res = await fetch(`${API}/api/pacientes`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(requestData)
      });

      const responseData = await res.json();
      
      if (!res.ok) {
        throw new Error(responseData.error || `Error ${res.status}`);
      }

      setPacienteId(responseData.paciente_id);
      console.log("✅ Paciente creado exitosamente");
      
    } catch (error) {
      console.error("❌ Error completo:", error);
      alert(`Error: ${error.message}`);
    }
  }
};

  const handleSubmit = () => {
    // Guardar datos y redirigir
    navigate("/registro/confirmacion");
  };

  const handleConsentAccept = () => {
    setVenipunctureAccepted(true);
    setConsentAccepted(true);
    setShowConsentModal(false);
  };

  return (
    <div className="container py-5">
    {/* Modal de consentimiento */}
        {showConsentModal && (
          <div
            className="modal show d-block"
            tabIndex="-1"
            style={{ background: "rgba(44,48,52,0.85)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
            <div
              className="modal-content"
              style={{
                background: "#2c3034",
                color: "#fff",
                border: "2px solid #e45454",
                maxHeight: "80vh",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                className="modal-header"
                style={{ borderBottom: "1px solid #e45454" }}
              >
                <h5
                className="modal-title d-flex align-items-center gap-2"
                style={{ color: "#e45454" }}
                >
                <CircleAlert size={20} style={{ color: "#e45454" }} />
                Consentimiento Informado
                </h5>
              </div>
              <div
                className="modal-body"
                style={{
                overflowY: "auto",
                maxHeight: "60vh",
                }}
              >
                <p className="mb-3" style={{ color: "#fff" }}>
                Por favor, lea cuidadosamente la siguiente información antes
                de proceder con el registro.
                </p>
                <div className="mb-3">
                <h6 className="fw-bold" style={{ color: "#e45454" }}>
                  Propósito del Registro
                </h6>
                <p>
                  Este formulario recopila información personal y médica como
                  complemento del análisis de metales pesados.
                </p>
                </div>
                <div className="mb-3">
                <h6 className="fw-bold" style={{ color: "#e45454" }}>
                  Uso de la Información
                </h6>
                <p>
                  Los datos proporcionados serán utilizados exclusivamente
                  para fines académicos y de investigación. Su información
                  será tratada de manera confidencial y protegida según lo
                  establecido en el Reglamento de la Comisión Permanente de
                  Bioética y Bioseguridad de la Universidad de Carabobo.
                </p>
                </div>
                <div className="mb-3">
                <h6 className="fw-bold" style={{ color: "#e45454" }}>
                  Confidencialidad
                </h6>
                <p>
                  Toda la información recopilada será almacenada de forma
                  segura y solo será accesible por personal autorizado. Sus
                  datos no serán compartidos con terceros sin su
                  consentimiento explícito.
                </p>
                </div>
                <div className="mb-3">
                <h6 className="fw-bold" style={{ color: "#e45454" }}>
                  Derechos del Paciente
                </h6>
                <p>
                  Usted tiene derecho a obtener información sobre los
                  resultados de sus análisis, así como a solicitar la
                  corrección o eliminación de sus datos en cualquier momento.
                </p>
                </div>
                <div className="mb-3">
                <h6 className="fw-bold" style={{ color: "#e45454" }}>
                  Participación en la Venopunción
                </h6>
                <p>
                  La venopunción es un procedimiento seguro y comúnmente
                  utilizado para la recolección de muestras de sangre. Su
                  participación es completamente voluntaria, puede llenar el
                  registro incluso si decide no proporcionar la muestra de
                  sangre.
                </p>
                </div>
                <div className="mb-3">
                <h6 className="fw-bold" style={{ color: "#e45454" }}>
                  Protocolo del analisis de metales pesados
                </h6>
                <p>
                  Si decide participar, un profesional de la salud capacitado
                  realizará el procedimiento siguiendo estrictos protocolos de
                  higiene y seguridad para minimizar cualquier riesgo. A
                  través del registro se seleccionará al azar a los pacientes
                  que participarán en la venopunción.
                </p>
                </div>
                <div className="mb-3">
                <h6 className="fw-bold" style={{ color: "#e45454" }}>
                  Contacto
                </h6>
                <p>
                  Si tiene alguna pregunta o inquietud sobre este formulario o
                  el manejo de sus datos o el análisis de metales pesados, no
                  dude en contactarnos a través de nuestro correo electrónico:
                  contacto@heavyapp.com
                </p>
                </div>
                <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="venipuncture"
                  checked={venipunctureAccepted}
                  onChange={() =>
                    setVenipunctureAccepted(!venipunctureAccepted)
                  }
                />
                <label className="form-check-label" htmlFor="venipuncture">
                  Acepto participar en la venopunción para la recolección de
                  muestras.
                </label>
                </div>
                <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="consent"
                  checked={consentAccepted}
                  onChange={() => setConsentAccepted(!consentAccepted)}
                />
                <label className="form-check-label" htmlFor="consent">
                  He leído y comprendo la información anterior, y conforme doy
                  mi consentimiento para que mis datos sean recopilados y
                  utilizados según lo descrito.
                </label>
                </div>
              </div>
              <div
                className="modal-footer"
                style={{ borderTop: "1px solid #e45454" }}
              >
                <button
                className="btn btn-secondary"
                onClick={() => navigate("/")}
                >
                Cancelar
                </button>
                <button
                className="btn btn-danger"
                style={{ background: "#e45454", border: "none" }}
                onClick={handleConsentAccept}
                disabled={!consentAccepted}
                >
                Aceptar y Continuar
                </button>
              </div>
            </div>
            </div>
          </div>
        )}
      <header className="bg-dark border-bottom">
        <div className="container d-flex align-items-center justify-content-between py-2">
          <span className="h4 mb-0 fw-bold">HeavyApp</span>
          <span className="text-white mb-0">
            Paso {currentStep} de {totalSteps}
          </span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="container my-3">
        <div className="progress" style={{ height: "8px" }}>
          <div
            className="progress-bar bg-danger"
            role="progressbar"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-4">
        <div className="card-shadow mx-auto" style={{ maxWidth: "600px" }}>
          <div className="card-body">
            <h2 className="card-title">{steps[currentStep - 1].title}</h2>
            <p className="card-text">{steps[currentStep - 1].description}</p>
            <div style={{ minHeight: "300px" }}>
            {currentStep === 1 && (
              <GeneralForm data={generalData} onChange={setGeneralData} />
            )}
            {/* Agrega los demás formularios aquí cuando los tengas */}
            {/* {currentStep === 2 && <ZonasExposicionForm ... />} */}
            {/* {currentStep === 3 && <SintomasForm ... />} */}
            {/* {currentStep === 4 && <HabitosAlimenticiosForm ... />} */}
            {/* {currentStep === 5 && <HabitosSaludForm ... />} */}
          </div>
            <div className="d-flex justify-content-end mt-4">
              {currentStep === totalSteps ? (
                <button className="btn btn-success" onClick={handleSubmit}>
                  Finalizar Registro
                </button>
              ) : (
                <button className="btn btn-danger" onClick={handleNext}>
                  Siguiente
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="text-center mt-3">
          Sus datos se guardan automáticamente
        </div>
      </div>
    </div>
  );
}