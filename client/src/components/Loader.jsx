import "../index.css";

const Loader = () => (
  <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
    <div className="box"></div>
    <span className="mt-4 text-danger fw-bold">Cargando encuesta...</span>
  </div>
);

export default Loader;