
import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Location: React.FC = () => {
    const [ref, isVisible] = useIntersectionObserver();

    return (
        <div id="location" ref={ref} className={`py-20 px-6 md:px-12 bg-[#050505] transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-white/60 uppercase tracking-[0.3em] text-[10px] mb-3">LOCALIZAÇÃO</h2>
                    <h3 className="font-serif text-3xl md:text-5xl mb-6">Onde Estamos</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-8 font-light">
                        Localizados no coração da cidade, oferecemos um ambiente confortável e exclusivo para você relaxar enquanto cuidamos do seu visual.
                        Fácil acesso e estacionamento disponível.
                    </p>

                    <div className="space-y-4 mb-8">
                        <div className="flex items-start gap-4">
                            <div className="bg-white/10 p-3 rounded-full">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-white font-medium mb-1">Endereço</h4>
                                <p className="text-gray-500 text-sm">Rua Lorenzo fiorentini, 145 - Extremo Leste<br />São Paulo - SP</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-white/10 p-3 rounded-full">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-white font-medium mb-1">Horário de Funcionamento</h4>
                                <p className="text-gray-500 text-sm">Terça a Domingo: 09:00 - 20:00<br />Segunda: Fechado</p>
                            </div>
                        </div>
                    </div>

                    <a
                        href="https://maps.google.com/?q=Rua+Lorenzo+Fiorentini,+145+-+Jardim+Pedra+Branca,+São+Paulo+-+SP"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-white text-black px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-all"
                    >
                        Abrir no Maps
                    </a>
                </div>

                <div className="h-[400px] w-full rounded-sm overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 relative group">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.974907106367!2d-46.4678847!3d-23.5693441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce66f5a3a7b3b3%3A0x8690a5a3a7b3b3!2sR.%20Lorenzo%20Fiorentini%2C%20145%20-%20Jardim%20Pedra%20Branca%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2003923-030!5e0!3m2!1spt-BR!2sbr!4v1709845000000!5m2!1spt-BR!2sbr"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="group-hover:scale-105 transition-transform duration-700"
                    ></iframe>
                    <div className="absolute inset-0 pointer-events-none border border-white/10"></div>
                </div>
            </div>
        </div>
    );
};

export default Location;
