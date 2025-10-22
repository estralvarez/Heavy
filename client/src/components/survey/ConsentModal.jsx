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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/85 show d-block" tabIndex="-1" onClick={onCancel}>
      <div
        className="relative w-full max-w-2xl mx-4 bg-zinc-900 border-2 border-red-500 rounded-lg shadow-2xl max-h-[80vh] flex flex-col animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-6 py-4 border-b border-red-500">
          <CircleAlert className="text-red-500 flex-shrink-0" size={24} />
          <h2 className="text-xl font-bold text-red-500">Consentimiento Informado</h2>
        </div>
        {/* Body con scroll */}
        <div className="overflow-y-auto px-6 py-6 space-y-4 text-zinc-100">
          <p className="text-sm leading-relaxed">
            Por favor, lea cuidadosamente la siguiente información antes de proceder con el registro.
          </p>

          <div className="space-y-3">
            <div>
              <h3 className="font-bold text-red-400 mb-1">Propósito del Registro</h3>
              <p className="text-sm text-zinc-300">
                Este formulario recopila información personal y médica como complemento del análisis de metales pesados.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-red-400 mb-1">Uso de la Información</h3>
              <p className="text-sm text-zinc-300">
                Los datos proporcionados serán utilizados exclusivamente para fines académicos y de investigación.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-red-400 mb-1">Confidencialidad</h3>
              <p className="text-sm text-zinc-300">
                Sus datos serán tratados de forma confidencial según las normas de bioética de la Universidad de
                Carabobo.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-red-400 mb-1">Derechos del Paciente</h3>
              <p className="text-sm text-zinc-300">
                Puede solicitar información o eliminar sus datos en cualquier momento.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-red-400 mb-1">Participación en la Venopunción</h3>
              <p className="text-sm text-zinc-300">
                La venopunción es voluntaria. Puede llenar el registro incluso si decide no donar muestra.
              </p>
            </div>
          </div>

          {/* Checkbox de consentimiento */}
          <div className="flex items-start gap-3 pt-4">
            <input
              type="checkbox"
              id="consent"
              checked={consentAccepted}
              onChange={() => setConsentAccepted(!consentAccepted)}
              className="mt-1 w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-0 cursor-pointer"
            />
            <label htmlFor="consent" className="text-sm text-zinc-200 cursor-pointer select-none">
              He leído y comprendo la información anterior y doy mi consentimiento informado.
            </label>
          </div>
        </div>
        
        {/* Footer con botones */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-red-500">
          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onAccept}
            disabled={!consentAccepted}
            className="px-6 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Aceptar y Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
