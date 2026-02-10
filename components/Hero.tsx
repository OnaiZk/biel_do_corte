
import React from 'react';

interface HeroProps {
  onBookClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-black">
      <div className="relative z-10 w-full px-4 sm:px-6 pt-24 pb-12 md:pt-20 md:pb-0 md:max-w-7xl md:mx-auto md:px-12">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* Texto à esquerda */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-white/60 uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[9px] sm:text-[10px] mb-3 sm:mb-4 animate-fade-in">
              BARBEARIA PROFISSIONAL
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-4 sm:mb-6 animate-fade-in">
              Estilo & <br />
              <span className="italic text-white">Atitude</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base md:text-xl max-w-xl mx-auto md:mx-0 mb-6 sm:mb-10 font-light leading-relaxed animate-fade-in px-2 sm:px-0" style={{ animationDelay: '0.2s' }}>
              Cortes modernos com a qualidade que você merece. Venha conhecer nosso trabalho e saia com um visual impecável.
            </p>

            <div className="flex flex-col gap-3 sm:gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <button
                onClick={onBookClick}
                className="bg-white text-black w-full px-6 sm:px-10 py-4 sm:py-5 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-gray-100 active:scale-95 transition-all"
              >
                Agendar Horário
              </button>
              <a
                href="https://wa.me/5511982151432"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/40 text-white w-full px-6 sm:px-10 py-4 sm:py-5 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-white/5 active:bg-white/10 transition-all text-center flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>

          {/* Foto do barbeiro - visível em todas as telas */}
          <div className="flex-1 flex justify-center items-center animate-fade-in mt-8 md:mt-0" style={{ animationDelay: '0.3s' }}>
            <div className="relative w-full max-w-[280px] sm:max-w-xs md:max-w-md">
              <div className="absolute -inset-4 bg-gradient-to-br from-white/10 to-transparent rounded-lg blur-xl"></div>
              <img
                src="/barbeiro.jpg"
                alt="Biel - Barbeiro Profissional"
                className="relative w-full h-auto object-cover rounded-lg grayscale md:hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
