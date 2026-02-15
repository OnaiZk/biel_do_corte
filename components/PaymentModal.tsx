import React, { useState, useEffect } from 'react';
import { useMutation, useAction } from 'convex/react';
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
    const [isLoading, setIsLoading] = useState(true);
    const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isPaid, setIsPaid] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const createPreference = useAction(api.mercadopago.createPreference);
    const updatePaymentStatus = useMutation(api.appointments.updatePaymentStatus);

    // Parse price string "R$ 35,00" to number 35
    const parsePrice = (priceStr: string): number => {
        const cleaned = priceStr.replace(/[^\d,]/g, '').replace(',', '.');
        return parseFloat(cleaned) || 0;
    };

    // Create MP preference when modal opens
    useEffect(() => {
        if (!isOpen) return;

        const initPayment = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const price = parsePrice(servicePrice);
                if (price <= 0) {
                    setError('Preço inválido');
                    return;
                }

                const result = await createPreference({
                    title: `Biel do Corte - ${serviceName}`,
                    price,
                    appointmentId: appointmentId as string,
                });

                // Use sandbox URL in development, production URL otherwise
                setCheckoutUrl(result.initPoint || result.sandboxInitPoint || null);
            } catch (err) {
                console.error('Error creating MP preference:', err);
                setError('Erro ao criar pagamento. Tente novamente.');
            } finally {
                setIsLoading(false);
            }
        };

        initPayment();
    }, [isOpen, appointmentId, serviceName, servicePrice]);

    if (!isOpen) return null;

    const handlePayWithMP = () => {
        if (checkoutUrl) {
            window.open(checkoutUrl, '_blank');
        }
    };

    const handleCopyLink = () => {
        if (checkoutUrl) {
            navigator.clipboard.writeText(checkoutUrl);
            alert('Link de pagamento copiado!');
        }
    };

    // Manual confirmation (for when user returns from MP)
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
                        PAGAMENTO
                    </h2>
                    <h3 className="font-serif text-xl sm:text-2xl mb-6 text-center">
                        {serviceName}
                    </h3>

                    <div className="text-center mb-6">
                        <p className="text-3xl font-bold mb-2">{servicePrice}</p>
                        <p className="text-gray-500 text-xs uppercase tracking-wider">Valor Total</p>
                    </div>

                    {/* Loading state */}
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center py-12 gap-4">
                            <div className="h-8 w-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            <p className="text-gray-400 text-xs uppercase tracking-widest">
                                Preparando pagamento...
                            </p>
                        </div>
                    )}

                    {/* Error state */}
                    {error && !isLoading && (
                        <div className="text-center py-8">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <p className="text-red-400 text-sm mb-4">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="text-xs text-gray-400 underline hover:text-white transition-colors"
                            >
                                Tentar novamente
                            </button>
                        </div>
                    )}

                    {/* Checkout ready */}
                    {!isLoading && !error && checkoutUrl && (
                        <>
                            {/* Mercado Pago Logo & Info */}
                            <div className="flex justify-center mb-6">
                                <div className="w-48 h-24 bg-[#009EE3]/10 border border-[#009EE3]/30 flex flex-col items-center justify-center gap-2 rounded">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#009EE3" />
                                        <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="#009EE3" />
                                        <circle cx="12" cy="12" r="2" fill="#009EE3" />
                                    </svg>
                                    <span className="text-[#009EE3] text-[10px] font-bold uppercase tracking-wider">
                                        Mercado Pago
                                    </span>
                                </div>
                            </div>

                            {/* Pay button */}
                            <button
                                onClick={handlePayWithMP}
                                className="w-full bg-[#009EE3] text-white py-4 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-[#007BB5] active:scale-[0.98] transition-all mb-3 flex items-center justify-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                                    <line x1="1" y1="10" x2="23" y2="10" />
                                </svg>
                                Pagar com Mercado Pago
                            </button>

                            {/* Copy link */}
                            <button
                                onClick={handleCopyLink}
                                className="w-full border border-white/20 text-white py-3 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all mb-6 flex items-center justify-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                                </svg>
                                Copiar Link de Pagamento
                            </button>

                            {/* Instructions */}
                            <div className="border border-white/10 p-4 mb-6">
                                <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-3">
                                    Como funciona
                                </p>
                                <ol className="text-xs text-gray-400 space-y-2">
                                    <li className="flex gap-2">
                                        <span className="text-white">1.</span>
                                        Clique em "Pagar com Mercado Pago"
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-white">2.</span>
                                        Escolha seu método de pagamento (PIX, Cartão, Boleto)
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-white">3.</span>
                                        Complete o pagamento no Mercado Pago
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-white">4.</span>
                                        Seu agendamento será confirmado automaticamente
                                    </li>
                                </ol>
                            </div>

                            {/* Manual confirm for when user already paid */}
                            <div className="border-t border-white/10 pt-4">
                                <p className="text-[9px] text-gray-500 text-center mb-3 uppercase tracking-wider">
                                    Já fez o pagamento pelo Mercado Pago?
                                </p>
                                <button
                                    onClick={handleConfirmPayment}
                                    disabled={isProcessing}
                                    className="w-full border border-green-500/30 text-green-400 py-3 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-green-500/10 transition-all disabled:opacity-50"
                                >
                                    {isProcessing ? 'Confirmando...' : 'Já Paguei — Confirmar'}
                                </button>
                            </div>
                        </>
                    )}

                    <p className="text-[8px] text-gray-600 text-center mt-4 uppercase tracking-wider">
                        Pagamento seguro via Mercado Pago
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
