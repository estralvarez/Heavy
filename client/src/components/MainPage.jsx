import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import "../index.css";
import Header from "./Header";
import { FlaskConical, Droplets, NotepadText, Users } from "lucide-react";

const MainPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/registro");
    }, 5000); // Puedes ajustar el tiempo
  };
  if (loading === true) {
    // Loader ocupa toda la pantalla, ocultando el resto
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#23272b",
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <Header />
      {/* Hero Section */}
      <section
        className="container py-5"
        style={{ borderBottom: "2px solid #ffff" }}
      >
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h1>Análisis de Metales Pesados en Sangre</h1>
            <p className="lead mt-3">
              Registro de pacientes para pruebas especializadas de detección de
              metales pesados. Complete su información de manera segura y
              confidencial.
            </p>
            <div className="mt-4 d-flex flex-column flex-sm-row gap-3">
              {loading ? (
                <Loader />
              ) : (
                <>
                  <button
                    className="btn btn-danger btn-lg"
                    onClick={handleStart}
                  >
                    Iniciar Registro
                  </button>
                  <a href="#process" className="btn btn-outline-danger btn-lg">
                    Conocer el Proceso
                  </a>
                </>
              )}
            </div>
          </div>
          <div className="col-lg-6 d-flex justify-content-center">
            <div className="card-shadow" style={{ maxWidth: "22rem" }}>
              <div className="text-center">
                <FlaskConical className="me-2" size={50} color="#e45454" />
                <h3 className="mt-3 fw-semibold">Pruebas Certificadas</h3>
                <p>Análisis profesional con resultados confiables</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br></br>
      {/* Features Section */}
      <section
        id="about"
        className="container py-5"
        style={{ borderBottom: "2px solid #ffff" }}
      >
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold display-6">
              ¿Por qué realizar un análisis de Metales Pesados?
            </h2>
            <p className="lead mt-3">
              La exposición a metales pesados puede afectar su salud. Nuestro
              análisis ayuda a identificar niveles de exposición para así tomar
              medidas preventivas.
            </p>
          </div>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card-shadow h-100 text-center p-3">
                <div
                  className="rounded-circle bg-primary bg-opacity-10 d-flex justify-content-center align-items-center mx-auto mb-3"
                  style={{ width: 64, height: 64 }}
                >
                  <Droplets className="fs-1" size={50} color="#e45454" />
                </div>
                <h3 className="fw-semibold">Metales Pesados</h3>
                <p className="mt-4">
                  Se exploran los niveles de metales pesados en sangre,
                  incluyendo plomo, mercurio y cadmio. Y en el futuro otros metales
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card-shadow h-100 text-center p-3">
                <div
                  className="rounded-circle bg-primary bg-opacity-10 d-flex justify-content-center align-items-center mx-auto mb-3"
                  style={{ width: 64, height: 64 }}
                >
                  <NotepadText className="fs-1" size={50} color="#e45454" />
                </div>
                <h3 className="fw-semibold">Población y Muestra</h3>
                <p className="mt-4">
                  Se encuestará a la población escolar de distintos colegios del municipio San Diego,
                  Edo. Carabobo.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card-shadow h-100 text-center p-3">
                <div
                  className="rounded-circle bg-primary bg-opacity-10 d-flex justify-content-center align-items-center mx-auto mb-3"
                  style={{ width: 64, height: 64 }}
                >
                  <Users className="fs-1" size={50} color="#e45454" />
                </div>
                <h3 className="fw-semibold">Análisis y Resultados</h3>
                <p className="mt-4">
                  Contrastaremos los resultados de los análisis con los
                  indicadores registrados en esta encuesta.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold display-6">Proceso de Registro</h2>
            <p className="lead mt-3">
              Complete el formulario en 5 sencillos pasos. Su progreso se guarda
              automáticamente.
            </p>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div
                className="list-group"
                style={{
                  border: "1px solid #e45454",
                  borderRadius: "12px",
                  padding: "24px",
                  backgroundColor: "#23272b",
                }}
              >
                {[
                  {
                    num: 1,
                    title: "Datos Generales",
                    desc: "Información personal",
                  },
                  {
                    num: 2,
                    title: "Zonas de Exposición",
                    desc: "Cercania a fuentes de contaminación",
                  },
                  {
                    num: 3,
                    title: "Síntomas",
                    desc: "Síntomas o enfermedades prexistentes",
                  },
                  {
                    num: 4,
                    title: "Hábitos Alimenticios",
                    desc: "Información sobre su dieta alimenticia",
                  },
                  {
                    num: 5,
                    title: "Hábitos de Salud",
                    desc: "Estilo de vida y salud general",
                  },
                ].map((step, idx, arr) => (
                  <div
                    key={step.num}
                    className="list-group-item d-flex align-items-start"
                    style={{
                      backgroundColor: "#2c3034",
                      border: "none",
                      padding: "18px 0",
                      color: "#fff",
                      borderBottom:
                        idx < arr.length - 1 ? "1px solid #e45454" : "none",
                    }}
                  >
                    <div
                      className="rounded-circle d-flex justify-content-center align-items-center me-3 ms-2"
                      style={{
                        width: 44,
                        height: 44,
                        backgroundColor: "#e45454",
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "1.25rem",
                      }}
                    >
                      {step.num}
                    </div>
                    <div>
                      <h5
                        className="fw-semibold mb-1"
                        style={{ color: "#e45454" }}
                      >
                        {step.title}
                      </h5>
                      <p className="mb-0" style={{ color: "#ffffffff" }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                {loading ? (
                  <Loader />
                ) : (
                  <button
                    className="btn btn-danger btn-lg"
                    onClick={handleStart}
                  >
                    Comenzar Registro
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-5">
        <div className="container text-center">
          <p className="mb-0">
            &copy; 2025 HeavyApp. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
