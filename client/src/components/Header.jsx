import "../index.css";
import { FlaskConical } from "lucide-react";

const HeaderForm = () => {
  return (
    <header className="bg-dark border-bottom">
      <div className="container d-flex align-items-center justify-content-between py-3">
        <div className="d-flex align-items-center gap-2">
          <FlaskConical className="me-2" size={32} />
          <span className="h4 mb-0 fw-bold">HeavyApp</span>
        </div>
      </div>
    </header>
  );
};

const Header = () => {
  return (
    <header className="bg-dark border-bottom">
      <div className="container d-flex align-items-center justify-content-between py-3">
        <div className="d-flex align-items-center gap-2">
          <FlaskConical className="me-2" size={32} />
          <span className="h4 mb-0 fw-bold">HeavyApp</span>
        </div>
        <nav className="d-none d-md-flex align-items-center gap-4">
          <a href="#about" className="text-white text-decoration-none px-2">
            Acerca de
          </a>
          <a href="#process" className="text-white text-decoration-none px-2">
            Proceso
          </a>
          <a href="#contact" className="text-white text-decoration-none px-2">
            Contacto
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
HeaderForm;
