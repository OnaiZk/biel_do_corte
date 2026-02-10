import React, { useState } from 'react';

interface BarberLoginProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const BarberLogin: React.FC<BarberLoginProps> = ({ isOpen, onClose, onSuccess }) => {
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Small delay for UX
        await new Promise(resolve => setTimeout(resolve, 300));

        const correctPin = import.meta.env.VITE_BARBER_PIN || '1234';

        if (pin === correctPin) {
            // Store session (expires on tab close)
            sessionStorage.setItem('barber_authenticated', 'true');
            setPin('');
            onSuccess();
        } else {
            setError('PIN incorreto. Tente novamente.');
            setPin('');
        }

        setIsLoading(false);
    };

    const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
        setPin(value);
        setError('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
            <div className="bg-[#0A0A0A] w-full max-w-md border border-white/10 shadow-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors z-10"
                >
                    ✕
                </button>

                <div className="p-8 md:p-12">
                    <div className="text-center mb-10">
                        <h2 className="text-white/60 uppercase tracking-[0.3em] text-[10px] mb-3">
                            ACESSO RESTRITO
                        </h2>
                        <h3 className="font-serif text-3xl text-white">
                            Painel do Barbeiro
                        </h3>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-3">
                                Digite o PIN de Acesso
                            </label>
                            <input
                                type="password"
                                inputMode="numeric"
                                value={pin}
                                onChange={handlePinChange}
                                placeholder="••••"
                                className="w-full bg-transparent border-b border-white/20 pb-3 text-center text-2xl tracking-[0.5em] focus:outline-none focus:border-white transition-colors placeholder:text-gray-700"
                                autoFocus
                            />
                        </div>

                        {error && (
                            <div className="text-center">
                                <span className="text-red-400 text-sm">{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={pin.length < 4 || isLoading}
                            className="w-full py-4 bg-white text-black uppercase tracking-[0.2em] text-[11px] font-medium hover:bg-gray-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="animate-spin h-4 w-4 border-2 border-black/30 border-t-black rounded-full"></span>
                                    Verificando...
                                </span>
                            ) : (
                                'Entrar'
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-[10px] text-gray-600 uppercase tracking-widest">
                            Área exclusiva para administração
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BarberLogin;
