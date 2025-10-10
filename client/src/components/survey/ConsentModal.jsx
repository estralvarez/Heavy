import { CircleAlert } from "lucide-react";

export default function ConsentModal({ 
  show, 
  onAccept, 
  onCancel,  
  consentAccepted, 
  setConsentAccepted 
}) {
  if (!show) return null;

  return (
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
          <div className="modal-header" style={{ borderBottom: "1px solid #e45454" }}>
            <h5 className="modal-title d-flex align-items-center gap-2" style={{ color: "#e45454" }}>
              <CircleAlert size={20} /> Consentimiento Informado
            </h5>
          </div>
          <div className="modal-body" style={{ overflowY: "auto", maxHeight: "60vh" }}>
            <p>
              Por favor, lea cuidadosamente la siguiente información antes
              de proceder con el registro.
            </p>
            <h6 className="fw-bold text-danger">Propósito del Registro</h6>
            <p>
              Este formulario recopila información personal y médica como
              complemento del análisis de metales pesados.
            </p>
            <h6 className="fw-bold text-danger">Uso de la Información</h6>
            <p>
              Los datos proporcionados serán utilizados exclusivamente
              para fines académicos y de investigación.
            </p>
            <h6 className="fw-bold text-danger">Confidencialidad</h6>
            <p>
              Sus datos serán tratados de forma confidencial según las
              normas de bioética de la Universidad de Carabobo.
            </p>
            <h6 className="fw-bold text-danger">Derechos del Paciente</h6>
            <p>
              Puede solicitar información o eliminar sus datos en cualquier momento.
            </p>
            <h6 className="fw-bold text-danger">Participación en la Venopunción</h6>
            <p>
              La venopunción es voluntaria. Puede llenar el registro incluso si decide no donar muestra.
            </p>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="consent"
                checked={consentAccepted}
                onChange={() => setConsentAccepted(!consentAccepted)}
              />
              <label className="form-check-label" htmlFor="consent">
                He leído y comprendo la información anterior y doy mi consentimiento informado.
              </label>
            </div>
          </div>
          <div className="modal-footer" style={{ borderTop: "1px solid #e45454" }}>
            <button className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
            <button
              className="btn btn-danger"
              style={{ background: "#e45454", border: "none" }}
              onClick={onAccept}
              disabled={!consentAccepted}
            >
              Aceptar y Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
