import React from 'react';

const About: React.FC = () => {
    return (
        <section className="py-20 bg-[#050505] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">

                    {/* Image Section */}
                    <div className="w-full md:w-1/2 relative group">
                        <div className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden rounded-sm border border-white/10">
                            <img
                                src="/barbeiro.jpg"
                                alt="Biel do Corte"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                        </div>

                        {/* Decorative Box */}
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-white/20 hidden md:block -z-10"></div>
                        <div className="absolute -top-6 -left-6 w-32 h-32 border border-white/20 hidden md:block -z-10"></div>
                    </div>

                    {/* Text Section */}
                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <h2 className="text-white/60 uppercase tracking-[0.3em] text-[10px] sm:text-xs mb-4">SOBRE O BARBEIRO</h2>
                        <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-6">Gabriel Kaiky</h3>

                        <div className="space-y-6 text-gray-400 font-light leading-relaxed text-sm sm:text-base">
                            <p>
                                Com mais de 5 anos de experiência, Gabriel Kaiky, conhecido como "Biel do Corte",
                                transformou sua paixão pela barbearia em uma arte refinada. Especialista em cortes modernos
                                e visagismo, ele busca não apenas cortar cabelo, mas elevar a autoestima de cada cliente.
                            </p>
                            <p>
                                Sua trajetória começou de forma humilde, mas seu talento e dedicação o levaram a se tornar
                                uma referência na região. Biel combina técnicas clássicas com tendências contemporâneas,
                                garantindo um visual único e personalizado.
                            </p>
                            <p>
                                "Acredito que um bom corte é a moldura do rosto. Meu objetivo é proporcionar uma experiência
                                de excelência, onde cada detalhe conta."
                            </p>
                        </div>

                        {/* Signature or Quote */}
                        <div className="mt-10 pt-8 border-t border-white/10">
                            <p className="font-serif italic text-white/80 text-lg">
                                "Qualidade e estilo em cada detalhe."
                            </p>
                            <div className="mt-4 flex items-center justify-center md:justify-start gap-4">
                                <div className="h-[1px] w-12 bg-white/30"></div>
                                <span className="text-[10px] uppercase tracking-widest text-white/60">Biel do Corte</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
