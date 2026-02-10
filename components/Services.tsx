
import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';

interface ServicesProps {
  onMenuClick: () => void;
}

const Services: React.FC<ServicesProps> = ({ onMenuClick }) => {
  const gallery = useQuery(api.gallery.getGallery);

  return (
    <div className="py-16 sm:py-20 px-6 sm:px-12 bg-black">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-white/60 uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[11px] sm:text-xs mb-3 sm:mb-4 font-bold">Nossos Serviços</h2>
        <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-6 sm:mb-8 uppercase">Escolha seu Corte</h3>
        <p className="text-gray-500 text-sm sm:text-base font-medium leading-relaxed max-w-xl mx-auto mb-8 sm:mb-12 px-2 sm:px-0">
          Confira as opções de serviços disponíveis e agende seu horário.
        </p>

        <button
          onClick={onMenuClick}
          className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-4 sm:py-5 border border-white/30 hover:border-white hover:bg-white hover:text-black transition-all duration-300 text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em]"
        >
          <span>Ver Cardápio Completo</span>
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>

        {/* Galeria de Cortes */}
        <div className="mt-10 sm:mt-16">
          <h4 className="text-white/60 uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[9px] sm:text-[10px] mb-6 sm:mb-8">Nossos Trabalhos</h4>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
            {gallery && gallery.length > 0 ? (
              gallery.slice(0, 8).map((item) => (
                <div key={item._id} className="group relative aspect-square overflow-hidden bg-[#121212]">
                  <img
                    src={item.url || "/placeholder.jpg"}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm uppercase tracking-wider">{item.title}</span>
                  </div>
                </div>
              ))
            ) : (
              // Fallback para imagens estáticas se a galeria estiver vazia
              <>
                <div className="group relative aspect-square overflow-hidden">
                  <img
                    src="/assets/cortes/corte1.jpg"
                    alt="Corte platinado"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm uppercase tracking-wider">Platinado</span>
                  </div>
                </div>
                <div className="group relative aspect-square overflow-hidden">
                  <img
                    src="/assets/cortes/corte2.jpg"
                    alt="Dreads com fade"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm uppercase tracking-wider">Americano</span>
                  </div>
                </div>
                <div className="group relative aspect-square overflow-hidden">
                  <img
                    src="/assets/cortes/corte3.jpg"
                    alt="Corte social"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm uppercase tracking-wider">Penteado</span>
                  </div>
                </div>
                <div className="group relative aspect-square overflow-hidden">
                  <img
                    src="/assets/cortes/corte4.jpg"
                    alt="Degradê com risco"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm uppercase tracking-wider">Degradê</span>
                  </div>
                </div>
              </>
            )}
          </div>
          <p className="mt-8 font-serif text-xl uppercase tracking-tighter text-gray-400">Qualidade e compromisso com seu visual.</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
