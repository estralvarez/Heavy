import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoaderAlt from "./Loader";
import About from "./About";
import Contact from "./Contact";
import { Header } from "./Header";
import { Droplets, NotepadText, Users, ArrowRight } from "lucide-react";
import landing from "../assets/landing.png";

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
      <LoaderAlt />
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto py-12 md:py-20 border-b border-zinc-800"      >
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="lg:w-1/2 px-4 md:px-6 space-y-6 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-red-500 leading-tight">
              Análisis de Metales Pesados en Sangre
            </h1>
            <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
              <strong className="text-red-400">HeavyApp</strong> forma parte de un proyecto de investigación que busca
              detectar los niveles de exposición a metales pesados en la población escolar de San Diego, Edo. Carabobo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {loading ? (
                <Loader />
              ) : (
                <>
                  <button
                    className="group bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-600/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    onClick={handleStart}
                  >
                    Iniciar Registro
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </button>
                  <a
                    href="#process"
                    className="border-2 border-red-600 text-red-500 hover:bg-red-600 hover:text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:scale-105 text-center"
                  >
                    Conocer el Proceso
                </a>
                </>
              )}
            </div>
          </div>
          {/* Image Section */}
          <div className="lg:w-1/2 flex justify-center px-4 md:px-6 animate-fade-in-up animate-delay-200">
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-red-900/20 rounded-full blur-3xl animate-pulse" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-red-600/30 shadow-2xl shadow-red-600/20 hover:scale-105 transition-transform duration-500">
                <img src={landing} alt="landing" className="object-cover w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="about" className="max-w-7xl mx-auto py-16 md:py-24 border-b border-zinc-800">
        <div className="px-4 md:px-6">
          <div className="text-center mb-16 space-y-4 animate-fade-in-up">
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-red-500">
              ¿Por qué realizar un análisis de Metales Pesados?
            </h2>
            <p className="text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
              La exposición a metales pesados puede afectar su salud de manera silenciosa. Nuestra investigación busca
              identificar niveles de exposición para así tomar medidas preventivas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Droplets,
                title: "Metales Pesados",
                desc: "Se exploran los niveles de metales pesados en sangre, incluyendo Plomo, Mercurio y Cadmio. Y en el futuro también otros metales de interés.",
                delay: "animate-delay-100",
              },
              {
                icon: NotepadText,
                title: "Población y Muestra",
                desc: "Se encuestará a la población escolar de distintos colegios del municipio San Diego, Edo. Carabobo.",
                delay: "animate-delay-200",
              },
              {
                icon: Users,
                title: "Análisis y Resultados",
                desc: "Contrastaremos los resultados de los análisis con los indicadores registrados en esta encuesta.",
                delay: "animate-delay-300",
              },
            ].map((feature, idx) => (
              <div key={idx} className={`group animate-fade-in-up ${feature.delay}`}>
                <div className="h-full bg-zinc-900 border border-red-600/20 rounded-2xl p-8 hover:border-red-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-red-600/10 hover:-translate-y-2">
                  <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-red-600/20 transition-colors duration-300 group-hover:scale-110">
                    <feature.icon size={32} className="text-red-500" />
                  </div>
                  <h3 className="font-semibold text-xl text-red-400 mb-4 text-center">{feature.title}</h3>
                  <p className="text-zinc-300 leading-relaxed text-center">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <About />
      {/* Process Section */}
      <section id="process" className="py-16 md:py-24 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16 space-y-4 animate-fade-in-up">
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-red-500">Proceso de Registro</h2>
            <p className="text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
              Complete el formulario en 5 sencillos pasos. Su progreso se guarda automáticamente.
            </p>
          </div>

          <div className="flex justify-center animate-fade-in-up animate-delay-200">
            <div className="w-full max-w-4xl">
              <div className="bg-zinc-900 border border-red-600/30 rounded-2xl p-6 md:p-8 shadow-2xl">
                {[
                  {
                    num: 1,
                    title: "Datos Generales",
                    desc: "Información personal y de contacto.",
                  },
                  {
                    num: 2,
                    title: "Zonas de Exposición",
                    desc: "Cercanía a fuentes de contaminación.",
                  },
                  {
                    num: 3,
                    title: "Síntomas y Enfermedades",
                    desc: "Síntomas y enfermedades preexistentes.",
                  },
                  {
                    num: 4,
                    title: "Hábitos Alimenticios",
                    desc: "Información sobre su dieta alimenticia.",
                  },
                  {
                    num: 5,
                    title: "Hábitos de Salud",
                    desc: "Estilo de vida y salud general.",
                  },
                ].map((step, idx, arr) => (
                  <div
                    key={step.num}
                    className={`flex items-start gap-4 md:gap-6 py-6 px-4 md:px-6 rounded-xl hover:bg-zinc-800/50 transition-all duration-300 ${
                      idx < arr.length - 1 ? "border-b border-red-600/20" : ""
                    }`}
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 font-bold text-xl md:text-2xl text-white shadow-lg shadow-red-600/30">
                      {step.num}
                    </div>
                    <div className="flex-1 pt-1">
                      <h5 className="font-semibold text-lg md:text-xl text-red-400 mb-2">{step.title}</h5>
                      <p className="text-zinc-300 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 text-center">
                <button
                  onClick={handleStart}
                  disabled={loading}
                  className="group bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-600/50 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
                >
                  Comenzar Registro
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Contact />

      {/* Footer */}
      <footer className="bg-zinc-900 border-t border-zinc-800 py-8 mt-12">
        <div className="max-w-7xl mx-auto text-center px-4 md:px-6">
          <p className="text-zinc-400">&copy; 2025 HeavyApp. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
