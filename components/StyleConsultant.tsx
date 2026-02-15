
import React from 'react';

const StyleConsultant: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-white/60 uppercase tracking-[0.3em] text-[11px] sm:text-xs mb-4 font-bold">
                    Especialista
                </h2>
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-6 uppercase">
                    Consultoria de Estilo
                </h3>
                <p className="text-gray-400 font-medium leading-relaxed text-base sm:text-lg max-w-2xl mx-auto">
                    Não sabe qual corte combina mais com você? Nossa consultoria de visagismo analisa seu perfil
                    para encontrar o estilo perfeito que valoriza seus traços e personalidade.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="bg-[#1a1a1a] p-8 rounded-sm border border-white/5 hover:border-white/20 transition-colors duration-300">
                    <h4 className="text-white text-xl font-serif mb-4">Análise Facial</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Avaliamos o formato do seu rosto para sugerir cortes que harmonizem e destaquem seus melhores ângulos.
                    </p>
                </div>

                <div className="bg-[#1a1a1a] p-8 rounded-sm border border-white/5 hover:border-white/20 transition-colors duration-300">
                    <h4 className="text-white text-xl font-serif mb-4">Estilo de Vida</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Consideramos sua rotina e profissão para propor um visual prático e adequado ao seu dia a dia.
                    </p>
                </div>

                <div className="bg-[#1a1a1a] p-8 rounded-sm border border-white/5 hover:border-white/20 transition-colors duration-300">
                    <h4 className="text-white text-xl font-serif mb-4">Tendências</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Fique por dentro das novidades e adapte as tendências atuais ao seu estilo pessoal com nossa orientação.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StyleConsultant;
