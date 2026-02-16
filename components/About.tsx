import React from 'react';

const About: React.FC = () => {
    return (
        <section className="py-20 bg-[#050505] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">

                    {/* Image Section */}
                    <div className="w-full md:w-1/2 relative group">
                        <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full max-w-md mx-auto overflow-hidden rounded-sm border border-white/10">
                            <img
                                src="/barbeiro2.jpeg"
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
                        <h2 className="text-white/60 uppercase tracking-[0.3em] text-[11px] sm:text-xs mb-4 font-bold">Conheça o Barbeiro</h2>
                        <h3 className="font-serif text-4xl sm:text-5xl text-white mb-6 uppercase leading-tight">Gabriel Kaiky</h3>

                        <div className="space-y-6 text-gray-400 font-medium leading-relaxed text-base sm:text-lg">
                            <p>
                                Com mais de 3 anos de experiência no mercado, Gabriel Kaiky, o "Biel do Corte",
                                é referência em cortes e atendimento de qualidade na região.
                            </p>
                            <p>
                                Nosso foco é oferecer um serviço técnico de alto nível, unindo precisão no corte
                                e um ambiente confortável para nossos clientes.
                            </p>
                            <p className="italic border-l-2 border-white/10 pl-4 md:border-l-0 md:pl-0">
                                "Trabalho para entregar o melhor resultado em cada atendimento. Qualidade e
                                satisfação do cliente são minha prioridade."
                            </p>
                        </div>

                        {/* Signature or Quote */}
                        <div className="mt-12 pt-8 border-t border-white/10">
                            <p className="font-serif text-white/80 text-2xl uppercase tracking-tighter">
                                Qualidade e compromisso com seu visual.
                            </p>
                            <div className="mt-6 flex items-center justify-center md:justify-start gap-4">
                                <div className="h-[1px] w-12 bg-white/30"></div>
                                <span className="text-[11px] uppercase tracking-widest text-white/60 font-bold">Biel do Corte</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
