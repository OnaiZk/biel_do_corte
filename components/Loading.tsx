
import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999]">
            <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 border-t-2 border-white/20 rounded-full animate-spin"></div>
                <div className="absolute inset-2 border-t-2 border-white/60 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <img src="/logo.jpg" alt="Loading" className="w-12 h-12 rounded-full opacity-80" />
                </div>
            </div>
            <p className="text-white/40 uppercase tracking-[0.3em] text-[10px] animate-pulse">Carregando...</p>
        </div>
    );
};

export default Loading;
