import React, { useState, useMemo } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";

import PaymentModal from './PaymentModal';
import { Id } from '../convex/_generated/dataModel';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPortalOpen: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, onPortalOpen }) => {
  const { user } = useUser();
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastAppointmentId, setLastAppointmentId] = useState<Id<"appointments"> | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  // Fetch services from backend
  const services = useQuery(api.services.getServices) || [];

  // Form states - agora com multi-seleção
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('09:00');
  const [isLoading, setIsLoading] = useState(false);

  const createAppointment = useMutation(api.appointments.createAppointment);
  const bookedSlots = useQuery(api.appointments.getBookedSlots, { date });

  // Calcula os serviços selecionados e o total
  const selectedServices = useMemo(() => {
    return services.filter(s => selectedServiceIds.includes(s._id));
  }, [selectedServiceIds, services]);

  const totalPrice = useMemo(() => {
    return selectedServices.reduce((sum, s) => sum + s.price, 0);
  }, [selectedServices]);

  const totalPriceFormatted = totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const selectedServicesNames = selectedServices.map(s => s.name).join(' + ');

  // Toggle service selection
  const toggleService = (serviceId: string) => {
    setSelectedServiceIds(prev => {
      if (prev.includes(serviceId)) {
        return prev.filter(id => id !== serviceId);
      } else {
        return [...prev, serviceId];
      }
    });
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      console.log("Submit failed: No user found");
      return;
    }

    if (selectedServiceIds.length === 0) {
      alert('Selecione pelo menos um serviço');
      return;
    }

    console.log("Starting booking process for:", user.fullName || user.username);
    setIsLoading(true);
    try {
      console.log("Calling createAppointment mutation...");
      const id = await createAppointment({
        clientName: user.fullName || user.username || "Cliente",
        phone: user.primaryPhoneNumber?.phoneNumber || "Sem telefone",
        serviceId: selectedServiceIds.join(','), // Store IDs
        serviceName: selectedServicesNames,
        servicePrice: totalPriceFormatted,
        date,
        time,
        paymentStatus: 'pending'
      });
      console.log("Booking successful! ID:", id);
      setLastAppointmentId(id);
      setIsSuccess(true);
      // Clear selection after success if needed, but we typically close modal or show success
    } catch (error: unknown) {
      console.error("Booking error:", error);
      alert(error instanceof Error ? error.message : 'Erro ao agendar');
    } finally {
      setIsLoading(false);
      console.log("Booking process finished (loading set to false)");
    }
  };

  if (isSuccess) {
    return (
      <>
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-sm">
          <div className="bg-[#0A0A0A] w-full max-w-md border border-white/20 shadow-2xl relative p-8 md:p-12 text-center">
            <h2 className="text-white/60 uppercase tracking-[0.3em] text-[10px] mb-4">RESERVA CONCLUÍDA</h2>
            <h3 className="font-serif text-3xl mb-8">Agendado com sucesso!</h3>

            <p className="text-gray-400 text-sm mb-6">
              Sua reserva para <strong>{selectedServicesNames}</strong> em <strong>{date.split('-').reverse().join('/')}</strong> às <strong>{time}</strong> foi confirmada.
            </p>

            <p className="text-white text-lg font-bold mb-6">
              Total: {totalPriceFormatted}
            </p>

            {/* Opções de Pagamento */}
            <div className="mb-8">
              <h4 className="text-white/60 uppercase tracking-[0.2em] text-[9px] mb-4 text-center">Escolha como pagar</h4>

              <div className="space-y-3">
                {/* Opção PIX */}
                <button
                  onClick={() => setShowPayment(true)}
                  className="w-full bg-white text-black py-4 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6.5 12.5L12 18l5.5-5.5" />
                    <path d="M12 18V6M6.5 12.5L1 7M17.5 12.5L23 7M1 7l5.5 5.5M23 7l-5.5 5.5" />
                  </svg>
                  Pagar Agora via PIX
                </button>

                {/* Opção Presencial */}
                <button
                  onClick={onClose}
                  className="w-full border-2 border-white/40 text-white py-4 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21h18" />
                    <path d="M5 21V7l8-4v18" />
                    <path d="M19 21V11l-6-4" />
                    <path d="M9 9v.01" />
                    <path d="M9 12v.01" />
                    <path d="M9 15v.01" />
                    <path d="M9 18v.01" />
                  </svg>
                  Pagar na Barbearia
                </button>
              </div>

              <p className="text-gray-500 text-[9px] text-center mt-3 italic">
                Você pode pagar via PIX agora ou pessoalmente no dia do atendimento
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  onClose();
                  onPortalOpen();
                }}
                className="w-full border border-white/20 text-white py-3 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all"
              >
                Ver Meus Agendamentos
              </button>
            </div>
          </div>
        </div>

        {showPayment && lastAppointmentId && (
          <PaymentModal
            isOpen={showPayment}
            onClose={() => {
              setShowPayment(false);
              onClose();
            }}
            appointmentId={lastAppointmentId}
            serviceName={selectedServicesNames}
            servicePrice={totalPriceFormatted}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-sm overflow-y-auto">
        <div className="bg-[#0A0A0A] w-full max-w-2xl border border-white/20 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-5 sm:right-5 text-gray-500 hover:text-white transition-colors z-10 p-1"
          >
            ✕
          </button>

          <div className="p-6 sm:p-8 md:p-12">
            <h2 className="text-white/60 uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[11px] sm:text-xs mb-3 text-center font-bold">RESERVA</h2>
            <h3 className="font-serif text-3xl sm:text-4xl mb-8 sm:mb-12 text-center uppercase">Agende seu horário</h3>

            <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
              {/* Seleção de Serviços com Multi-Seleção */}
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-gray-500 mb-4 font-bold">
                  Selecione os Serviços (pode escolher mais de um)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                  {services === undefined ? (
                    <div className="col-span-2 text-center text-gray-500 py-8">
                      <div className="animate-pulse flex flex-col items-center gap-2">
                        <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        <span className="text-[10px] uppercase tracking-widest">Carregando serviços...</span>
                      </div>
                    </div>
                  ) : services.length === 0 ? (
                    <div className="col-span-2 text-center py-8 px-4 border border-dashed border-white/10">
                      <p className="text-gray-500 text-sm mb-2">Nenhum serviço disponível no momento.</p>
                      <p className="text-[10px] text-gray-600 uppercase tracking-widest leading-relaxed">
                        O barbeiro ainda não configurou os serviços ou todos estão desativados.
                      </p>
                    </div>
                  ) : services.map(service => (
                    <label
                      key={service._id}
                      className={`flex items-center gap-3 p-3 border cursor-pointer transition-all ${selectedServiceIds.includes(service._id)
                        ? 'border-white bg-white/10'
                        : 'border-white/20 hover:border-white/40'
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedServiceIds.includes(service._id)}
                        onChange={() => toggleService(service._id)}
                        className="w-4 h-4 accent-white"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm text-white block truncate">{service.name}</span>
                        <span className="text-xs text-gray-400">
                          {service.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Total */}
                <div className="mt-4 pt-4 border-t border-white/20 flex justify-between items-center">
                  <span className="text-white/60 uppercase tracking-widest text-[10px]">
                    {selectedServices.length} serviço(s) selecionado(s)
                  </span>
                  <span className="text-white text-lg font-bold">
                    Total: {totalPriceFormatted}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[9px] uppercase tracking-widest text-gray-500 mb-2">Data</label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white transition-colors text-sm cursor-pointer"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-widest text-gray-500 mb-2">Horário</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 pb-2 focus:outline-none focus:border-white transition-colors appearance-none text-sm cursor-pointer"
                  >
                    {['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'].map(t => (
                      <option
                        key={t}
                        value={t}
                        disabled={bookedSlots?.includes(t)}
                        className="bg-[#0A0A0A]"
                      >
                        {t} {bookedSlots?.includes(t) ? '(Ocupado)' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-end">
                <div className="w-full border-b border-white/10 pb-2 text-xs text-gray-400 italic">
                  <SignedIn>
                    Logado como: {user?.fullName || user?.username}
                  </SignedIn>
                  <SignedOut>
                    Você precisará entrar na sua conta.
                  </SignedOut>
                </div>
              </div>

              <div className="pt-4 sm:pt-6">
                <SignedIn>
                  <button
                    type="submit"
                    disabled={isLoading || selectedServiceIds.length === 0}
                    className="w-full bg-white text-black py-4 sm:py-5 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-gray-100 active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {isLoading ? 'Agendando...' : `Confirmar Reserva - ${totalPriceFormatted}`}
                  </button>
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button
                      type="button"
                      className="w-full bg-white text-black py-4 sm:py-5 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-gray-100 active:scale-[0.98] transition-all"
                    >
                      Entrar para Agendar
                    </button>
                  </SignInButton>
                </SignedOut>
                <p className="text-[8px] sm:text-[9px] text-gray-600 text-center mt-4 sm:mt-6 uppercase tracking-wider sm:tracking-widest">
                  Cancelamentos requerem 10h de antecedência.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
