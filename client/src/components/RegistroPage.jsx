import { useState, useEffect } from "react";
import { CircleAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ConsentModal from "./survey/ConsentModal";
import GeneralForm from "./survey/GeneralForm";
import ZonasExposicionForm from "./survey/ZonesForm";
import EnfermedadForm from "./survey/IllnessForm";
import AlimentosForm from "./survey/FoodForm";
import "../index.css";

export default function RegistroPage() {
  const [generalData, setGeneralData] = useState({});
  const [zonasData, setZonasData] = useState({});
  const [enfermedadData, setEnfermedadData] = useState({});
  const [alimentosData, setAlimentosData] = useState({});
  const [habitosSaludData, setHabitosSaludData] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [venipunctureAccepted, setVenipunctureAccepted] = useState(false);
  const [pacienteId, setPacienteId] = useState(null);
  const navigate = useNavigate();
  const totalSteps = 5;
  const API = "http://127.0.0.1:5000";

  const talleres = [
    {'id': 'taller1', 'value': 'Taller de carpintería', 'label': 'Taller de carpintería'},
    {'id': 'taller2', 'value': 'Taller mecánico', 'label': 'Taller mecánico'},
    {'id': 'taller3', 'value': 'Taller de cerámica o alfarería', 'label': 'Taller de cerámica o alfarería'},
    {'id': 'taller4', 'value': 'Taller de baterías', 'label': 'Taller de baterías'},
    {'id': 'taller5', 'value': 'Taller de latonería', 'label': 'Taller de latonería'},
    {'id': 'ninguntaller', 'value': 'Ninguna de las anteriores', 'label': 'Ninguna de las anteriores'}
  ];

  const industrias = [
    {'id': 'industria1', 'value': 'Fábrica de pinturas', 'label': 'Fábrica de pinturas'},
    {'id': 'industria2', 'value': 'Fábrica de resinas', 'label': 'Fábrica de resinas'},
    {'id': 'industria3', 'value': 'Fábrica de embutidos', 'label': 'Fábrica de embutidos'},
    {'id': 'industria4', 'value': 'Fábrica de aceites y/o lubricantes', 'label': 'Fábrica de aceites y/o lubricantes'},
    {'id': 'industria5', 'value': 'Fábrica de metales', 'label': 'Fábrica de metales'},
    {'id': 'industria6', 'value': 'Fábrica de productos químicos', 'label': 'Fábrica de productos químicos'},
    {'id': 'industria7', 'value': 'Complejo petroquímico', 'label': 'Complejo petroquímico'},
    {'id': 'industria8', 'value': 'Complejo gasífero', 'label': 'Complejo gasífero'},
    {'id': 'industria9', 'value': 'Termoeléctrica', 'label': 'Termoeléctrica'},
    {'id': 'ningunindustria', 'value': 'Ninguna de las anteriores', 'label': 'Ninguna de las anteriores'},
  ];

  const lugares = [
    {'id': 'lugar1', 'value': 'Imprentas', 'label': 'Imprentas'},
    {'id': 'lugar2', 'value': 'Estación de gasolina', 'label': 'Estación de gasolina'},
    {'id': 'lugar3', 'value': 'Llenadora de gas natural', 'label': 'Llenadora de gas natural'},
    {'id': 'lugar4', 'value': 'Rectificadora de motores', 'label': 'Rectificadora de motores'},
    {'id': 'lugar5', 'value': 'Bloqueras', 'label': 'Bloqueras'},
    {'id': 'lugar6', 'value': 'Vertederos', 'label': 'Vertederos'},
    {'id': 'lugar7', 'value': 'Ríos', 'label': 'Ríos'},
    {'id': 'lugar8', 'value': 'Riberas del lago de Valencia', 'label': 'Riberas del lago de Valencia'},
    {'id': 'lugar9', 'value': 'Canales', 'label': 'Canales'},
    {'id': 'lugar10', 'value': 'Playas', 'label': 'Playas'},
    {'id': 'ningunlugar', 'value': 'Ninguna de las anteriores', 'label': 'Ninguna de las anteriores'},
  ];

  const sintomas = [
    {'id': 'nauseas', 'value': 'Náuseas y/o vómitos', 'label': 'Náuseas y/o vómitos'},
        {'id': 'dolores_estomacales', 'value': 'Dolores estomacales', 'label': 'Dolores estomacales'},
        {'id': 'perdida_apetito', 'value': 'Pérdida de apetito', 'label': 'Pérdida de apetito'},
        {'id': 'estrenimiento', 'value': 'Estreñimiento', 'label': 'Estreñimiento'},
        {'id': 'ataques_nerviosos', 'value': 'Ataques nerviosos/ansiosos', 'label': 'Ataques nerviosos/ansiosos'},
        {'id': 'irritabilidad', 'value': 'Irritabilidad', 'label': 'Irritabilidad'},
        {'id': 'fatiga', 'value': 'Fatiga', 'label': 'Fatiga'},
        {'id': 'apatia', 'value': 'Apatía', 'label': 'Apatía'},
        {'id': 'falta_concentracion', 'value': 'Falta de concentración', 'label': 'Falta de concentración'},
        {'id': 'dificultades_respiratorias', 'value': 'Dificultades respiratorias', 'label': 'Dificultades respiratorias'},
        {'id': 'perdida_peso', 'value': 'Pérdida de peso', 'label': 'Pérdida de peso'},
        {'id': 'caida_cabello', 'value': 'Caída de cabello', 'label': 'Caída de cabello'},
        {'id': 'resequedad_piel', 'value': 'Resequedad en la piel', 'label': 'Resequedad en la piel'},
        {'id': 'incontinencia_nocturna', 'value': 'Incontinencia nocturna', 'label': 'Incontinencia nocturna'},
        {'id': 'Ninguna', 'value': 'Ninguna de las anteriores', 'label': 'Ninguna de las anteriores'},
  ]

  const patologias = [
    {'id': 'hipertension', 'value': 'Hipertensión', 'label': 'Hipertensión'},
        {'id': 'anemia', 'value': 'Anemia', 'label': 'Anemia'},
        {'id': 'cancer', 'value': 'Cáncer', 'label': 'Cáncer'},
        {'id': 'sindrome_fanconi', 'value': 'Síndrome de Fanconi', 'label': 'Síndrome de Fanconi'},
        {'id': 'nefritis_cronica', 'value': 'Nefritis crónica', 'label': 'Nefritis crónica'},
        {'id': 'gastritis', 'value': 'Gastritis', 'label': 'Gastritis'},
        {'id': 'toxicidad_reproductiva', 'value': 'Toxicidad reproductiva (Infertilidad, abortos espontáneos)', 'label': 'Toxicidad reproductiva (Infertilidad, abortos espontáneos)'},
        {'id': 'tdah', 'value': 'TDAH', 'label': 'TDAH'},
        {'id': 'Ninguna', 'value': 'Ninguna de las anteriores', 'label': 'Ninguna de las anteriores'},
    ]

  const steps = [
    { id: 1, title: "Datos Generales", description: "Información personal" },
    { id: 2, title: "Zonas de Exposición", description: "Lugares de exposición" },
    { id: 3, title: "Síntomas", description: "Síntomas experimentados" },
    { id: 4, title: "Hábitos Alimenticios", description: "Información dietética" },
    { id: 5, title: "Hábitos de Salud", description: "Estilo de vida" },
  ];

  useEffect(() => {
    setShowConsentModal(true);
  }, []);

  /** 🔧 Función reutilizable para enviar datos al backend **/
  const postData = async (url, data) => {
    try {
      const res = await fetch(`${API}${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || `Error ${res.status}`);

      return json;
    } catch (error) {
      console.error("❌ Error en postData:", error);
      alert(`Error: ${error.message}`);
      throw error;
    }
  };


  /** 🧭 Maneja el paso siguiente y guarda datos según el paso **/
  const handleNext = async () => {
    try {
      if (currentStep === 1) {
        // Paso 1: Datos Generales
        const generalPayload = {
          datos_generales: {
            nombre: generalData.nombre?.trim(),
            apellido: generalData.apellidos?.trim(),
            edad: parseInt(generalData.edad),
            sexo: generalData.sexo,
            sector: generalData.sector,
            zona: generalData.zona,
            direccion: generalData.direccion?.trim(),
            telefono: generalData.telefono?.trim(),
            email: generalData.email?.trim(),
            ocupacion: generalData.ocupacion?.trim(),
            institucion: generalData.institucion,
            venopuncion: !!generalData.venopuncion,
          },
        };

        const response = await postData(`/api/pacientes`, generalPayload);
        setPacienteId(response.paciente_id);
        console.log("✅ Paciente creado:", response);
      }

      if (currentStep === 2) {
        if (!pacienteId) {
          alert("⚠️ No se encontró el ID del paciente. Regrese al paso 1.");
          return;
        }

        // Función para obtener los valores basados en los IDs seleccionados
        const getSelectedValues = (options, formData) => {
          const selectedValues = [];
          
          options.forEach(option => {
            if (formData[option.id]) {
              selectedValues.push(option.value);
            }
          });
          
          return selectedValues;
        };

        const zonasPayload = {
          zonas_exposicion: {
            talleres: getSelectedValues(talleres, zonasData),
            industrias: getSelectedValues(industrias, zonasData),
            lugares: getSelectedValues(lugares, zonasData)
          }
        };

        console.log("📤 Enviando zonas payload:", zonasPayload);
        
        const response = await postData(`/api/pacientes/${pacienteId}/risk-zones`, zonasPayload);
        console.log("✅ Zonas guardadas:", response);
      }

      if (currentStep === 3) {
        if (!pacienteId) {
          alert("⚠️ No se encontró el ID del paciente. Regrese al paso 1.");
          return;
        }

        // Función para obtener los valores basados en los IDs seleccionados
        const getSelectedValues = (options, formData) => {
          const selectedValues = [];
          
          options.forEach(option => {
            if (formData[option.id]) {
              selectedValues.push(option.value);
            }
          });
          
          return selectedValues;
        };

        const enfermedadPayload = {
          antecedentes_patologicos: {
            sintomas: getSelectedValues(sintomas, enfermedadData),
            patologias: getSelectedValues(patologias, enfermedadData)
          }
        };

        console.log("📤 Enviando enfermedad payload:", enfermedadPayload);

        const response = await postData(`/api/pacientes/${pacienteId}/illness`, enfermedadPayload);
        console.log("✅ Enfermedad guardada:", response);
      }

      if (currentStep === 4) {
        if (!pacienteId) {
          alert("⚠️ No se encontró el ID del paciente. Regrese al paso 1.");
          return;
        }
        const alimentosPayload = { habitos_alimenticios: alimentosData };
        console.log("📤 Enviando alimentos payload:", alimentosPayload);
        const response = await postData(`/api/pacientes/${pacienteId}/food-habits`, alimentosPayload);
        console.log("✅ Hábitos alimenticios guardados:", response);
      }



            // Avanzar al siguiente paso
            if (currentStep < totalSteps) {
              setCurrentStep(currentStep + 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              navigate("/registro/confirmacion");
            }
          } catch (error) {
            console.error("❌ Error en handleNext:", error);
          }
        };

  const handleSubmit = () => {
    navigate("/registro/confirmacion");
  };

  const handleConsentAccept = () => {
    setVenipunctureAccepted(true);
    setConsentAccepted(true);
    setShowConsentModal(false);
  };

  return (
    <div className="container py-5">
      <ConsentModal
        show={showConsentModal}
        onAccept={handleConsentAccept}
        onCancel={() => navigate("/")}
        venipunctureAccepted={venipunctureAccepted}
        setVenipunctureAccepted={setVenipunctureAccepted}
        consentAccepted={consentAccepted}
        setConsentAccepted={setConsentAccepted}
      />

      {/* Header */}
      <header className="bg-dark border-bottom">
        <div className="container d-flex align-items-center justify-content-between py-2">
          <span className="h4 mb-0 fw-bold">HeavyApp</span>
          <span className="text-white mb-0">Paso {currentStep} de {totalSteps}</span>
        </div>
      </header>

      {/* Barra de progreso */}
      <div className="container my-3">
        <div className="progress" style={{ height: "8px" }}>
          <div className="progress-bar bg-danger" role="progressbar"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }} />
        </div>
      </div>

      {/* Formulario principal */}
      <div className="container py-4">
        <div className="card-shadow mx-auto" style={{ maxWidth: "600px" }}>
          <div className="card-body">
            <h2 className="card-title">{steps[currentStep - 1].title}</h2>
            <p className="card-text">{steps[currentStep - 1].description}</p>

            <div style={{ minHeight: "300px" }}>
              {currentStep === 1 && <GeneralForm data={generalData} onChange={setGeneralData} />}
              {currentStep === 2 && <ZonasExposicionForm 
                  data={zonasData} 
                  onChange={setZonasData}
                  taller={talleres}
                  fabrica={industrias}
                  lugares={lugares}
                />
              }
              {currentStep === 3 && <EnfermedadForm 
                  data={enfermedadData} 
                  onChange={setEnfermedadData}
                  sintomas={sintomas}
                  patologias={patologias}
              />}
              {currentStep === 4 && <AlimentosForm data={alimentosData} onChange={setAlimentosData} />}
            </div>

            <div className="d-flex justify-content-end mt-4">
              {currentStep === totalSteps ? (
                <button className="btn btn-success" onClick={handleSubmit}>Finalizar Registro</button>
              ) : (
                <button className="btn btn-danger" onClick={handleNext}>Siguiente</button>
              )}
            </div>
          </div>
        </div>
        <div className="text-center mt-3">Sus datos se guardan automáticamente</div>
      </div>
    </div>
  );
}
