import React, { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Id } from '../convex/_generated/dataModel';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    appointmentId: Id<"appointments">;
    serviceName: string;
    servicePrice: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
    isOpen,
    onClose,
    appointmentId,
    serviceName,
    servicePrice,
}) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isPaid, setIsPaid] = useState(false);

    const updatePaymentStatus = useMutation(api.appointments.updatePaymentStatus);

    if (!isOpen) return null;

    // Generate a simple PIX code (simulation)
    const pixCode = `00020126580014br.gov.bcb.pix0136bieldocorte@pix.com5204000053039865802BR5913BIEL DO CORTE6008SAOPAULO62070503***6304`;

    const handleConfirmPayment = async () => {
        setIsProcessing(true);
        try {
            await updatePaymentStatus({
                appointmentId,
                paymentStatus: 'paid',
            });
            setIsPaid(true);
            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (error) {
            console.error('Error updating payment:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleCopyPix = () => {
        navigator.clipboard.writeText(pixCode);
        alert('Código PIX copiado!');
    };

    if (isPaid) {
        return (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm">
                <div className="bg-[#0A0A0A] w-full max-w-md border border-green-500/30 shadow-2xl p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                        <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="font-serif text-2xl mb-2 text-green-400">Pagamento Confirmado!</h3>
                    <p className="text-gray-400 text-sm">Seu agendamento está pago.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-sm">
            <div className="bg-[#0A0A0A] w-full max-w-md border border-white/20 shadow-2xl relative max-h-[95vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 sm:top-5 sm:right-5 text-gray-500 hover:text-white transition-colors z-10 p-1"
                >
                    ✕
                </button>

                <div className="p-5 sm:p-8">
                    <h2 className="text-white/60 uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[9px] sm:text-[10px] mb-2 text-center">
                        PAGAMENTO VIA PIX
                    </h2>
                    <h3 className="font-serif text-xl sm:text-2xl mb-6 text-center">
                        {serviceName}
                    </h3>

                    <div className="text-center mb-6">
                        <p className="text-3xl font-bold mb-2">{servicePrice}</p>
                        <p className="text-gray-500 text-xs uppercase tracking-wider">Valor Total</p>
                    </div>

                    {/* QR Code Placeholder */}
                    <div className="flex justify-center mb-6">
                        <div className="w-48 h-48 bg-white p-3 relative">
                            {/* Simple QR code pattern */}
                            <div className="w-full h-full bg-[#0A0A0A] relative grid grid-cols-11 grid-rows-11 gap-[2px] p-1">
                                {Array.from({ length: 121 }).map((_, i) => {
                                    const row = Math.floor(i / 11);
                                    const col = i % 11;
                                    // Create a pattern that looks like a QR code
                                    const isPositionMarker =
                                        (row < 3 && col < 3) ||
                                        (row < 3 && col > 7) ||
                                        (row > 7 && col < 3);
                                    const isRandom = Math.random() > 0.5;
                                    const isFilled = isPositionMarker || isRandom;
                                    return (
                                        <div
                                            key={i}
                                            className={`${isFilled ? 'bg-white' : 'bg-[#0A0A0A]'}`}
                                        />
                                    );
                                })}
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-white px-2 py-1 text-[8px] text-black font-bold">
                                    PIX
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PIX Copy Code */}
                    <div className="mb-6">
                        <p className="text-[9px] uppercase tracking-wider text-gray-500 mb-2 text-center">
                            Ou copie o código PIX
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={pixCode.substring(0, 30) + '...'}
                                readOnly
                                className="flex-1 bg-transparent border border-white/20 px-3 py-2 text-xs text-gray-400"
                            />
                            <button
                                onClick={handleCopyPix}
                                className="px-4 py-2 border border-white/20 text-xs hover:bg-white/5 transition-colors"
                            >
                                Copiar
                            </button>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="border border-white/10 p-4 mb-6">
                        <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-3">
                            Como pagar
                        </p>
                        <ol className="text-xs text-gray-400 space-y-2">
                            <li className="flex gap-2">
                                <span className="text-white">1.</span>
                                Abra o app do seu banco
                            </li>
                            <li className="flex gap-2">
                                <span className="text-white">2.</span>
                                Escolha pagar com PIX
                            </li>
                            <li className="flex gap-2">
                                <span className="text-white">3.</span>
                                Escaneie o QR Code ou cole o código
                            </li>
                            <li className="flex gap-2">
                                <span className="text-white">4.</span>
                                Confirme o pagamento
                            </li>
                        </ol>
                    </div>

                    {/* Confirm Button */}
                    <button
                        onClick={handleConfirmPayment}
                        disabled={isProcessing}
                        className="w-full bg-white text-black py-4 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-gray-100 active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        {isProcessing ? 'Processando...' : 'Já Fiz o Pagamento'}
                    </button>

                    <p className="text-[8px] text-gray-600 text-center mt-4 uppercase tracking-wider">
                        Clique acima após efetuar o pagamento
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
