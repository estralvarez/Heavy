import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ConsentModal from "./survey/ConsentModal";
import GeneralForm from "./survey/GeneralForm";
import ZonasExposicionForm from "./survey/ZonesForm";
import EnfermedadForm from "./survey/IllnessForm";
import AlimentosForm from "./survey/FoodForm";
import SaludForm from "./survey/HealthForm";
import RegisterCompleted from "./survey/RegisterCompleted";
import "../index.css";

export default function RegistroPage() {
  const [generalData, setGeneralData] = useState({});
  const [zonasData, setZonasData] = useState({});
  const [enfermedadData, setEnfermedadData] = useState({});
  const [alimentosData, setAlimentosData] = useState({});
  const [habitosSaludData, setHabitosSaludData] = useState({});
  const [currentStep, setCurrentStep] = useState(6);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [venipunctureAccepted, setVenipunctureAccepted] = useState(false);
  const [pacienteId, setPacienteId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const totalSteps = 6;
  const API = import.meta.env.VITE_API_URL || 
    (process.env.NODE_ENV === 'production' 
      ? "https://heavyapi.onrender.com" 
      : "http://127.0.0.1:5000");

  // Memoized constants to prevent unnecessary re-renders
  const talleres = useMemo(() => [
    {'id': 'taller1', 'value': 'Taller de carpintería', 'label': 'Taller de carpintería'},
    {'id': 'taller2', 'value': 'Taller mecánico', 'label': 'Taller mecánico'},
    {'id': 'taller3', 'value': 'Taller de cerámica o alfarería', 'label': 'Taller de cerámica o alfarería'},
    {'id': 'taller4', 'value': 'Taller de baterías', 'label': 'Taller de baterías'},
    {'id': 'taller5', 'value': 'Taller de latonería', 'label': 'Taller de latonería'},
    {'id': 'ninguntaller', 'value': 'Ninguna de las anteriores', 'label': 'Ninguna de las anteriores'}
  ], []);

  const industrias = useMemo(() => [
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
  ], []);

  const lugares = useMemo(() => [
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
  ], []);

  const sintomas = useMemo(() => [
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
    {'id': 'ninguna_sintoma', 'value': 'Ninguna de las anteriores', 'label': 'Ninguna de las anteriores'},
  ], []);

  const patologias = useMemo(() => [
    {'id': 'hipertension', 'value': 'Hipertensión', 'label': 'Hipertensión'},
    {'id': 'anemia', 'value': 'Anemia', 'label': 'Anemia'},
    {'id': 'cancer', 'value': 'Cáncer', 'label': 'Cáncer'},
    {'id': 'sindrome_fanconi', 'value': 'Síndrome de Fanconi', 'label': 'Síndrome de Fanconi'},
    {'id': 'nefritis_cronica', 'value': 'Nefritis crónica', 'label': 'Nefritis crónica'},
    {'id': 'gastritis', 'value': 'Gastritis', 'label': 'Gastritis'},
    {'id': 'toxicidad_reproductiva', 'value': 'Toxicidad reproductiva (Infertilidad, abortos espontáneos)', 'label': 'Toxicidad reproductiva (Infertilidad, abortos espontáneos)'},
    {'id': 'tdah', 'value': 'TDAH', 'label': 'TDAH'},
    {'id': 'ninguna_patologia', 'value': 'Ninguna de las anteriores', 'label': 'Ninguna de las anteriores'},
  ], []);

  const transporte = useMemo(() => [
    {'id': 'caminar', 'value': 'Caminar', 'label': 'Caminar'},
    {'id': 'vehiculo', 'value': 'Vehículo', 'label': 'Vehículo'},
    {'id': 'transporte_publico', 'value': 'Transporte público', 'label': 'Transporte público'},
    {'id': 'metro', 'value': 'Metro', 'label': 'Metro'}
  ], []);

  const suplementos = useMemo(() => [
    {'id': 'suplemento_multivitaminico', 'value': 'Suplemento multivitamínico', 'label': 'Suplemento multivitamínico'},
    {'id': 'suplemento_dietetico', 'value': 'Suplemento dietético', 'label': 'Suplemento dietético'},
    {'id': 'suplemento_proteico', 'value': 'Suplemento proteico', 'label': 'Suplemento proteico'},
    {'id': 'producto_naturista', 'value': 'Producto naturista', 'label': 'Producto naturista'},
    {'id': 'ninguno_productos', 'value': 'Ninguno de los anteriores', 'label': 'Ninguno de los anteriores'}
  ], []);

  const agua = useMemo(() => [
    {'id': 'agua_pozo', 'value': 'Agua de pozo profundo', 'label': 'Agua de pozo profundo'},
    {'id': 'agua_filtrada', 'value': 'Agua filtrada', 'label': 'Agua filtrada'},
    {'id': 'agua_embotellada', 'value': 'Agua mineral embotellada', 'label': 'Agua mineral embotellada'}
  ], []);

  const steps = useMemo(() => [
    { id: 1, title: "Datos Generales", description: "Información personal" },
    { id: 2, title: "Zonas de Exposición", description: "Lugares de exposición" },
    { id: 3, title: "Síntomas y Antecedentes", description: "Síntomas experimentados y antecedentes patológicos" },
    { id: 4, title: "Hábitos Alimenticios", description: "Información dietética" },
    { id: 5, title: "Hábitos de Salud", description: "Estilo de vida" },
    { id: 6, title: "Registro Completado", description: "Su información ha sido registrada exitosamente" },
  ], []);

  // Utility function to extract selected values from form data
  const getSelectedValues = useCallback((options, formData) => {
    return options
      .filter(option => formData[option.id] === true)
      .map(option => option.value);
  }, []);


  useEffect(() => {
    setShowConsentModal(true);
  }, []);

  // Scroll to top whenever the current step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  // Optimized API call function with loading state management
  const postData = useCallback(async (url, data) => {
    setIsLoading(true);
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
      alert(`Error: ${error.message}`);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [API]);


  // Optimized step handler with improved error handling
  const handleNext = useCallback(async () => {
    try {
      if (currentStep === 1) {
        // Step 1: General Data
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
            ocupacion_madre: generalData.ocupacion_madre?.trim(),
            ocupacion_padre: generalData.ocupacion_padre?.trim(),
            institucion: generalData.institucion,
            venopuncion: !!generalData.venopuncion,
          },
        };

        const response = await postData(`/api/pacientes`, generalPayload);
        setPacienteId(response.paciente_id);
      }

      if (currentStep === 2) {
        if (!pacienteId) {
          alert("⚠️ No se encontró el ID del paciente. Regrese al paso 1.");
          return;
        }

        const zonasPayload = {
          zonas_exposicion: {
            talleres: getSelectedValues(talleres, zonasData),
            industrias: getSelectedValues(industrias, zonasData),
            lugares: getSelectedValues(lugares, zonasData)
          }
        };
        
        await postData(`/api/pacientes/${pacienteId}/risk-zones`, zonasPayload);
      }

      if (currentStep === 3) {
        if (!pacienteId) {
          alert("⚠️ No se encontró el ID del paciente. Regrese al paso 1.");
          return;
        }

        const enfermedadPayload = {
          antecedentes_patologicos: {
            sintomas: getSelectedValues(sintomas, enfermedadData),
            patologias: getSelectedValues(patologias, enfermedadData),
            metal: enfermedadData.dignostico_anterior ? enfermedadData.metal_dignostico : ''
          }
        };

        await postData(`/api/pacientes/${pacienteId}/illness`, enfermedadPayload);
      }

      if (currentStep === 4) {
        if (!pacienteId) {
          alert("⚠️ No se encontró el ID del paciente. Regrese al paso 1.");
          return;
        }
        const alimentosPayload = { habitos_alimenticios: alimentosData };
        await postData(`/api/pacientes/${pacienteId}/food-habits`, alimentosPayload);
      }

      if (currentStep === 5) {
        if (!pacienteId) {
          alert("⚠️ No se encontró el ID del paciente. Regrese al paso 1.");
          return;
        }

        const saludPayload = {
          habitos_de_salud: {
            fuma: habitosSaludData.fuma,
            actividad: habitosSaludData.actividad,
            bombillos: habitosSaludData.bombillos,
            techo: habitosSaludData.techo,
            joyeria: habitosSaludData.joyeria,
            transporte: getSelectedValues(transporte, habitosSaludData),
            agua: getSelectedValues(agua, habitosSaludData),
            suplementos: getSelectedValues(suplementos, habitosSaludData)
          }
        };
        await postData(`/api/pacientes/${pacienteId}/health-habits`, saludPayload);
      }

      // Advance to next step
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        // Scroll is handled by useEffect when currentStep changes
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate("/registro");
      }
    } catch (error) {
      // Error is already handled in postData function
    }
  }, [currentStep, totalSteps, generalData, zonasData, enfermedadData, alimentosData, habitosSaludData, pacienteId, talleres, industrias, lugares, sintomas, patologias, transporte, agua, suplementos, getSelectedValues, postData, navigate]);

  const handleSubmit = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/");
  }, [navigate]);

  const handleConsentAccept = useCallback(() => {
    setVenipunctureAccepted(true);
    setConsentAccepted(true);
    setShowConsentModal(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    
    <div className="bg-zinc-950 min-h-screen pb-10">
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
      <header className="bg-zinc-900/95 backdrop-blur-sm border-b border-red-600/20 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4">
          <div className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-all duration-300 group cursor-pointer">
          <span className="text-2xl font-bold">HeavyApp</span>
        </div>
          <span className="text-white mb-0">
            Paso {currentStep} de {totalSteps}
          </span>
        </div>
      </header>

      {/* Barra de progreso */}
      <div className="max-w-7xl mx-auto flex items-center justify-center py-4">
        <div className="w-[80%] bg-gray-300 rounded-full h-2.5">
          <div
            className="bg-red-700 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>


      {/* Formulario principal */}
      <div className="w-[90%] mx-auto flex items-center justify-center mb-2">
        {currentStep < totalSteps ? (
          <div className="card-shadow mx-auto">
            <div className="p-6">
              <h2 className="text-red-500 text-2xl font-bold mb-4">{steps[currentStep - 1].title}</h2>
              <p className="text-white mb-4">{steps[currentStep - 1].description}</p>
              <hr className="border-red-600/20 border-2 my-4" />

              <div >

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
                {currentStep === 5 && <SaludForm 
                    data={habitosSaludData} 
                    onChange={setHabitosSaludData}
                    transporte={transporte}
                    suplementos={suplementos}
                    agua={agua}
                />}
              </div>
              <div className="flex justify-end mt-8">
                <button 
                  className="group bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 inline-flex items-center gap-2"
                  onClick={handleNext}
                  disabled={isLoading}
                >
                  {isLoading ? 'Guardando...' : 'Siguiente'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="card-shadow mx-auto max-w-2xl">
            <div className="p-6">
              <RegisterCompleted />
              <div className="flex justify-end mt-8">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? "Procesando..." : "Finalizar Registro"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {currentStep < totalSteps ? (
        <div className="text-center mt-1 py-2 text-gray-600">Sus datos NO se guardan automáticamente</div>
      ) : (
        <div className="text-center mt-1 py-2 text-green-500">Sus datos se guardaron satisfactoriamente</div>
      )}
    </div>
  );
}
