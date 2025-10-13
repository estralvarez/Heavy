import { CheckCircle } from "lucide-react";

export default function RegisterCompletd() {
    return (
        <div className="text-center mt-5">
            <CheckCircle className="text-success mb-3" size={50} />
            <h1>Registro completado</h1>
            <p className="mb-4">
                Su información ha sido recibida exitosamente. Si acepto donar la muestra de sangre,
                contactado por nuestro equipo para coordinar la toma de muestra.
            </p>
            <div className="card-shadow p-3 border rounded-3 transition-all mb-4">
                <h2>Próximos pasos:</h2>
                <ul className="list-disc list-inside text-white" style={{textAlign: "left"}}>
                    <li className="mb-2">Recibirá un correo de confirmación en las próximas 24 horas confirmando que todos sus datos estan correctos</li>
                    <li className="mb-2">La fecha, el lugar y el horario de la toma de muestras se comunicarán por correo</li>
                    <li className="mb-2">Los resultados pueden tardar un poco en ser entregados, recuerde que este es un proyecto de investigación</li>
                    <li className="mb-2">Si desea cancelar su cita, puede hacerlo a través de nuestro correo electrónico: <a href="mailto:Heavy_Research@gmail.com">Heavy_Research@gmail.com</a></li>
                    <li className="mb-2">Tambien puede contactarnos a través de nuestro canal de telegram: <a href="https://t.me/Heavy_Research">@Heavy_Research</a></li>
                </ul>
            </div>
        </div>
    )
}
