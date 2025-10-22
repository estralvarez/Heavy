import team from "../assets/team.png";


const About = () => {
    return (
        // Sección Acerca de Nosotros
        <section id="us" className="py-16 md:py-24 border-b border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="text-center mb-16 space-y-4 animate-fade-in-up">
                    <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-red-500">Nuestro Equipo</h2>
                    <p className="text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
                    Somos un equipo de estudiantes de la Licenciatura en Química, de la Facultad
                    Experimental de Ciencias y Tecnología de la Universidad de Carabobo, comprometido 
                    con la investigación científica y la salud pública.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    <div className="lg:w-1/2 animate-fade-in-up">
                    <div className="relative w-full max-w-md mx-auto aspect-square">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-red-900/20 rounded-2xl blur-2xl" />
                        <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-red-600/30 shadow-2xl shadow-red-600/20 bg-zinc-900 flex items-center justify-center hover:scale-105 transition-transform duration-500">
                        <div className="text-center p-8">
                            <img src={team} alt="team" className="object-cover w-full h-full" />
                        </div>
                        </div>
                    </div>
                    </div>

                    <div className="lg:w-1/2 space-y-6 animate-fade-in-up animate-delay-200">
                    <div className="bg-zinc-900 border border-red-600/20 rounded-2xl p-8 hover:border-red-600/40 transition-all duration-300">
                        <h3 className="text-2xl font-bold text-red-400 mb-4">¿Quiénes Somos?</h3>
                        <p className="text-zinc-300 leading-relaxed mb-4">
                        Somos un equipo de estudiantes, profesionales de la química y de la salud dedicados al estudio de la
                        exposición a metales pesados en poblaciones vulnerables.
                        </p>
                        <p className="text-zinc-300 leading-relaxed mb-4">
                        Nuestro proyecto busca generar datos científicos que permitan implementar políticas públicas de
                        prevención y protección de la salud en comunidades escolares del estado Carabobo.
                        </p>
                        <p className="text-zinc-300 leading-relaxed">
                        Trabajamos con rigor científico, ética profesional y un profundo compromiso con el bienestar de
                        nuestra comunidad.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-zinc-900 border border-red-600/20 rounded-xl p-6 text-center hover:border-red-600/40 transition-all duration-300 hover:-translate-y-1">
                        <div className="text-3xl font-bold text-red-500 mb-2">3</div>
                        <div className="text-zinc-400 text-sm">Estudiantes</div>
                        </div>
                        <div className="bg-zinc-900 border border-red-600/20 rounded-xl p-6 text-center hover:border-red-600/40 transition-all duration-300 hover:-translate-y-1">
                        <div className="text-3xl font-bold text-red-500 mb-2">5</div>
                        <div className="text-zinc-400 text-sm">Profesionales</div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;