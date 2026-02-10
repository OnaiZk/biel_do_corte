
import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';

interface ServicesProps {
  onMenuClick: () => void;
}

const Services: React.FC<ServicesProps> = ({ onMenuClick }) => {
  const gallery = useQuery(api.gallery.getGallery);

  return (
    <div className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-white/60 uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[9px] sm:text-[10px] mb-2 sm:mb-3">O CARDÁPIO</h2>
        <h3 className="font-serif text-2xl sm:text-3xl md:text-5xl mb-4 sm:mb-6">Serviços Exclusivos</h3>
        <p className="text-gray-500 text-xs sm:text-sm font-light italic leading-relaxed max-w-xl mx-auto mb-6 sm:mb-10 px-2 sm:px-0">
          Oferecemos uma variedade de serviços para cuidar do seu visual.
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
                    <span className="text-white text-sm uppercase tracking-wider">Dreads + Fade</span>
                  </div>
                </div>
                <div className="group relative aspect-square overflow-hidden">
                  <img
                    src="/assets/cortes/corte3.jpg"
                    alt="Corte social"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm uppercase tracking-wider">Social</span>
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
          <p className="mt-8 font-serif text-lg italic text-gray-400">"A excelência não é um ato, mas um hábito."</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
