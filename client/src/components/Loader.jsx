import "../index.css";

const Loader = () => (
  <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
    <div className="box"/>
    <span className="mt-4 text-danger fw-bold">Cargando encuesta...</span>
  </div>
);

const LoaderAlt = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950">
      <div className="box" />
      <span className="mt-8 text-red-500 font-bold text-lg md:text-xl animate-pulse">Cargando encuesta...</span>
    </div>
);

export default LoaderAlt;