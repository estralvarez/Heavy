import { Mail, Send, ArrowRight } from "lucide-react";

const Contact = () => {
    return (
        // Contact Section
        <section id="contact" className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-16 space-y-4 animate-fade-in-up">
                <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-red-500">Contáctanos</h2>
                <p className="text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
                ¿Tienes preguntas sobre el proyecto? Estamos aquí para ayudarte.
                </p>
            </div>

            <div className="max-w-2xl mx-auto">
                <div className="bg-zinc-900 border border-red-600/30 rounded-2xl p-8 md:p-12 shadow-2xl animate-fade-in-up animate-delay-200">
                <div className="space-y-8">
                    <div className="group">
                    <a
                        href="mailto:contacto@heavyapp.com"
                        className="flex items-center gap-6 p-6 bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-600/10"
                    >
                        <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center group-hover:bg-red-600/20 transition-colors duration-300 flex-shrink-0">
                        <Mail size={32} className="text-red-500" />
                        </div>
                        <div className="flex-1">
                        <h3 className="font-semibold text-xl text-red-400 mb-2">Correo Electrónico</h3>
                        <p className="text-zinc-300 break-all">contacto@heavyapp.com</p>
                        </div>
                        <ArrowRight
                        size={24}
                        className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
                        />
                    </a>
                    </div>

                    <div className="group">
                    <a
                        href="https://t.me/heavyapp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-6 p-6 bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-600/10"
                    >
                        <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center group-hover:bg-red-600/20 transition-colors duration-300 flex-shrink-0">
                        <Send size={32} className="text-red-500" />
                        </div>
                        <div className="flex-1">
                        <h3 className="font-semibold text-xl text-red-400 mb-2">Telegram</h3>
                        <p className="text-zinc-300">@heavyapp</p>
                        </div>
                        <ArrowRight
                        size={24}
                        className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
                        />
                    </a>
                    </div>
                </div>

                <div className="mt-10 pt-8 border-t border-red-600/20">
                    <p className="text-center text-zinc-400 leading-relaxed">
                    Respondemos todas las consultas en un plazo de 24-48 horas hábiles.
                    </p>
                </div>
                </div>
            </div>
            </div>
        </section>
    );
};

export default Contact;