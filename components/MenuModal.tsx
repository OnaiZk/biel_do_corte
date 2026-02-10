
import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';

interface MenuModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose }) => {
    const services = useQuery(api.services.getServices);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/95 backdrop-blur-md"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-3xl mx-2 sm:mx-4 my-4 sm:my-8 bg-black border border-white/10"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 bg-black border-b border-white/10 p-4 sm:p-6 flex items-center justify-between z-10">
                    <div>
                        <h2 className="text-white/60 uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[9px] sm:text-[10px] mb-1">O CARDÁPIO</h2>
                        <h3 className="font-serif text-xl sm:text-2xl md:text-3xl">Serviços Exclusivos</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/5 transition-colors"
                        aria-label="Fechar"
                    >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                    <div className="space-y-5 sm:space-y-6">
                        {services === undefined ? (
                            <div className="py-12 flex flex-col items-center justify-center gap-3">
                                <div className="h-6 w-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                <span className="text-white/40 text-[10px] uppercase tracking-[0.2em]">Sincronizando Cardápio...</span>
                            </div>
                        ) : services.length === 0 ? (
                            <div className="py-12 text-center">
                                <p className="text-gray-500 font-serif italic mb-2">O cardápio está sendo atualizado.</p>
                                <p className="text-[9px] text-gray-600 uppercase tracking-widest">Confira novamente em instantes.</p>
                            </div>
                        ) : services.map((service) => (
                            <div
                                key={service._id}
                                className="group"
                            >
                                <div className="flex justify-between items-baseline border-b border-white/10 pb-2 mb-2">
                                    <h4 className="text-base sm:text-lg md:text-xl font-serif">{service.name}</h4>
                                    <span className="text-base sm:text-lg text-white font-medium ml-3 sm:ml-4">
                                        {service.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start text-[11px] sm:text-xs text-gray-500 leading-relaxed gap-1 sm:gap-0">
                                    <p className="sm:pr-4">{service.description}</p>
                                    <span className="uppercase tracking-wider sm:tracking-widest text-[8px] sm:text-[9px] whitespace-nowrap">{service.duration}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-black border-t border-white/10 p-4 sm:p-6">
                    <button
                        onClick={onClose}
                        className="w-full bg-white text-black py-3 sm:py-4 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-gray-100 active:scale-[0.98] transition-all"
                    >
                        Fechar Cardápio
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuModal;
