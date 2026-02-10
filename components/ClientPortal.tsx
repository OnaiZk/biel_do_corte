import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { useUser } from "@clerk/clerk-react";
import { Id } from '../convex/_generated/dataModel';
import PaymentModal from './PaymentModal';

interface ClientPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ClientPortal: React.FC<ClientPortalProps> = ({ isOpen, onClose }) => {
  const { user } = useUser();
  const [selectedAppointment, setSelectedAppointment] = useState<{
    id: Id<"appointments">;
    serviceName: string;
    servicePrice: string;
  } | null>(null);

  const appointments = useQuery(
    api.appointments.getAppointmentsByUser
  );

  const cancelAppointment = useMutation(api.appointments.deleteAppointment);

  if (!isOpen) return null;

  const today = new Date().toISOString().split('T')[0];

  const futureAppointments = appointments?.filter(apt => apt.date >= today) || [];
  const pastAppointments = appointments?.filter(apt => apt.date < today) || [];

  const handleCancel = async (id: Id<"appointments">) => {
    if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
      await cancelAppointment({ id });
    }
  };

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const getStatusBadge = (status: string) => {
    if (status === 'paid') {
      return (
        <span className="px-2 py-1 text-[8px] sm:text-[9px] uppercase tracking-wider bg-green-500/20 text-green-400 border border-green-500/30">
          Pago
        </span>
      );
    }
    return (
      <span className="px-2 py-1 text-[8px] sm:text-[9px] uppercase tracking-wider bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
        Pendente
      </span>
    );
  };

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-sm">
        <div className="bg-[#0A0A0A] w-full max-w-2xl border border-white/20 shadow-2xl relative max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-5 sm:right-5 text-gray-500 hover:text-white transition-colors z-10 p-1"
          >
            ✕
          </button>

          <div className="p-5 sm:p-8 md:p-10">
            <h2 className="text-white/60 uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[9px] sm:text-[10px] mb-2 sm:mb-3 text-center">
              PORTAL DO CLIENTE
            </h2>
            <h3 className="font-serif text-2xl sm:text-3xl mb-6 sm:mb-8 text-center">
              Meus Agendamentos
            </h3>

            {!user ? (
              <p className="text-gray-500 text-sm text-center py-6">
                Faça login para ver seus agendamentos.
              </p>
            ) : (
              <>
                {/* Future Appointments */}
                <div className="mb-8">
                  <h4 className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 mb-4 border-b border-white/10 pb-2">
                    Próximos Agendamentos
                  </h4>

                  {futureAppointments.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-6">
                      Você não tem agendamentos futuros.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {futureAppointments.map((apt) => (
                        <div
                          key={apt._id}
                          className="border border-white/10 p-4 hover:border-white/20 transition-colors"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm">{apt.serviceName}</span>
                                {getStatusBadge(apt.paymentStatus)}
                              </div>
                              <p className="text-gray-500 text-xs">
                                {formatDate(apt.date)} às {apt.time} • {apt.servicePrice}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              {apt.paymentStatus === 'pending' && (
                                <button
                                  onClick={() => setSelectedAppointment({
                                    id: apt._id,
                                    serviceName: apt.serviceName,
                                    servicePrice: apt.servicePrice,
                                  })}
                                  className="px-3 py-2 text-[9px] sm:text-[10px] uppercase tracking-wider bg-white text-black hover:bg-gray-100 transition-colors"
                                >
                                  Pagar
                                </button>
                              )}
                              <button
                                onClick={() => handleCancel(apt._id)}
                                className="px-3 py-2 text-[9px] sm:text-[10px] uppercase tracking-wider border border-red-500/50 text-red-400 hover:bg-red-500/10 transition-colors"
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Past Appointments */}
                {pastAppointments.length > 0 && (
                  <div>
                    <h4 className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 mb-4 border-b border-white/10 pb-2">
                      Histórico
                    </h4>
                    <div className="space-y-2 opacity-60">
                      {pastAppointments.slice(0, 5).map((apt) => (
                        <div
                          key={apt._id}
                          className="border border-white/5 p-3"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-sm">{apt.serviceName}</span>
                              <p className="text-gray-600 text-xs">
                                {formatDate(apt.date)} às {apt.time}
                              </p>
                            </div>
                            {getStatusBadge(apt.paymentStatus)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {selectedAppointment && (
        <PaymentModal
          isOpen={!!selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          appointmentId={selectedAppointment.id}
          serviceName={selectedAppointment.serviceName}
          servicePrice={selectedAppointment.servicePrice}
        />
      )}
    </>
  );
};

export default ClientPortal;
