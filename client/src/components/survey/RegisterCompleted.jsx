import { CheckCircle, Mail, Send } from "lucide-react"

export default function RegisterCompleted() {
  return (
    <div className="text-center animate-fade-in-up">
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-green-500/10 rounded-full animate-scale-in">
          <CheckCircle className="text-green-500" size={64} />
        </div>
      </div>

      <h1 className="text-3xl font-bold text-white mb-3">Registro Completado</h1>

      <p className="text-zinc-300 mb-8 max-w-2xl mx-auto">
        Su información ha sido recibida exitosamente. Si aceptó donar la muestra de sangre, será contactado por nuestro
        equipo para coordinar la toma de muestra.
      </p>

      <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-6 text-left space-y-4">
        <h2 className="text-xl font-semibold text-white mb-4">Próximos pasos:</h2>

        <ul className="space-y-3 text-zinc-300">
          <li className="flex items-start gap-3">
            <span className="text-red-500 mt-1">•</span>
            <span className="text-sm">
              Recibirá un correo de confirmación en las próximas 24 horas confirmando que todos sus datos están
              correctos
            </span>
          </li>

          <li className="flex items-start gap-3">
            <span className="text-red-500 mt-1">•</span>
            <span className="text-sm">
              La fecha, el lugar y el horario de la toma de muestras se comunicarán por correo
            </span>
          </li>

          <li className="flex items-start gap-3">
            <span className="text-red-500 mt-1">•</span>
            <span className="text-sm">
              Los resultados pueden tardar un poco en ser entregados, recuerde que este es un proyecto de investigación
            </span>
          </li>

          <li className="flex items-start gap-3">
            <span className="text-red-500 mt-1">•</span>
            <span className="text-sm">
              Si desea cancelar su cita, puede hacerlo a través de nuestro correo electrónico:{" "}
              <a
                href="mailto:Heavy_Research@gmail.com"
                className="text-red-500 hover:text-red-400 inline-flex items-center gap-1 transition-colors"
              >
                <Mail size={14} />
                Heavy_Research@gmail.com
              </a>
            </span>
          </li>

          <li className="flex items-start gap-3">
            <span className="text-red-500 mt-1">•</span>
            <span className="text-sm">
              También puede contactarnos a través de nuestro canal de telegram:{" "}
              <a
                href="https://t.me/Heavy_Research"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:text-red-400 inline-flex items-center gap-1 transition-colors"
              >
                <Send size={14} />
                @Heavy_Research
              </a>
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}