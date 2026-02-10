import React, { useState, useMemo } from 'react';
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";

import AdminGallery from './AdminGallery';
import AdminServices from './AdminServices';

interface BarberDashboardProps {
    isOpen: boolean;
    onClose: () => void;
}

type FilterPeriod = 'day' | 'week' | 'month' | 'gallery' | 'services';

const BarberDashboard: React.FC<BarberDashboardProps> = ({ isOpen, onClose }) => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [filterPeriod, setFilterPeriod] = useState<FilterPeriod>('day');

    // Calculate date range based on filter period
    const dateRange = useMemo(() => {
        const today = new Date(selectedDate + 'T12:00:00');
        let startDate: Date;
        let endDate: Date;

        if (filterPeriod === 'day') {
            startDate = today;
            endDate = today;
        } else if (filterPeriod === 'week') {
            const dayOfWeek = today.getDay();
            startDate = new Date(today);
            startDate.setDate(today.getDate() - dayOfWeek);
            endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 6);
        } else {
            startDate = new Date(today.getFullYear(), today.getMonth(), 1);
            endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        }

        return {
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
        };
    }, [selectedDate, filterPeriod]);

    const stats = useQuery(api.appointments.getDashboardStats, dateRange);
    const deleteAppointment = useMutation(api.appointments.deleteAppointment);
    const updateStatus = useMutation(api.appointments.updateAppointmentStatus);

    const handleDelete = async (id: Id<"appointments">) => {
        if (confirm('Deseja realmente excluir este agendamento?')) {
            try {
                await deleteAppointment({ id });
            } catch (error) {
                alert('Erro ao excluir agendamento');
            }
        }
    };

    const handleStatusChange = async (id: Id<"appointments">, status: 'completed' | 'cancelled' | 'pending') => {
        try {
            await updateStatus({ appointmentId: id, status });
        } catch (error) {
            alert('Erro ao atualizar status');
        }
    };

    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const getPeriodLabel = () => {
        if (filterPeriod === 'day') return 'Hoje';
        if (filterPeriod === 'week') return 'Esta Semana';
        return 'Este Mês';
    };

    const getStatusColor = (status: string | undefined) => {
        if (status === 'completed') return 'bg-green-500/20 text-green-400 border-green-500/30';
        if (status === 'cancelled') return 'bg-red-500/20 text-red-400 border-red-500/30';
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    };

    const getStatusLabel = (status: string | undefined) => {
        if (status === 'completed') return 'Concluído';
        if (status === 'cancelled') return 'Cancelado';
        return 'Pendente';
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
            <div className="bg-[#0A0A0A] w-full max-w-5xl border border-white/10 shadow-2xl relative h-[90vh] flex flex-col">
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors z-10"
                >
                    ✕
                </button>

                <div className="p-6 md:p-8 flex flex-col h-full overflow-hidden">
                    {/* Header */}
                    {/* Header */}
                    {filterPeriod === 'gallery' ? (
                        <div className="flex flex-col h-full overflow-hidden">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                <div>
                                    <h2 className="text-white/60 uppercase tracking-[0.3em] text-[10px] mb-1">PAINEL DO BARBEIRO</h2>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setFilterPeriod('day')}
                                            className="font-serif text-2xl md:text-3xl text-gray-500 hover:text-white transition-colors"
                                        >
                                            Financeiro
                                        </button>
                                        <button
                                            onClick={() => setFilterPeriod('gallery')}
                                            className="font-serif text-2xl md:text-3xl text-white transition-colors"
                                        >
                                            Galeria
                                        </button>
                                        <button
                                            onClick={() => setFilterPeriod('services')}
                                            className="font-serif text-2xl md:text-3xl text-gray-500 hover:text-white transition-colors"
                                        >
                                            Serviços
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto custom-scrollbar">
                                <AdminGallery />
                            </div>
                        </div>
                    ) : filterPeriod === 'services' ? (
                        <div className="flex flex-col h-full overflow-hidden">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                <div>
                                    <h2 className="text-white/60 uppercase tracking-[0.3em] text-[10px] mb-1">PAINEL DO BARBEIRO</h2>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setFilterPeriod('day')}
                                            className="font-serif text-2xl md:text-3xl text-gray-500 hover:text-white transition-colors"
                                        >
                                            Financeiro
                                        </button>
                                        <button
                                            onClick={() => setFilterPeriod('gallery')}
                                            className="font-serif text-2xl md:text-3xl text-gray-500 hover:text-white transition-colors"
                                        >
                                            Galeria
                                        </button>
                                        <button
                                            onClick={() => setFilterPeriod('services')}
                                            className="font-serif text-2xl md:text-3xl text-white transition-colors"
                                        >
                                            Serviços
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto custom-scrollbar">
                                <AdminServices />
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                <div>
                                    <h2 className="text-white/60 uppercase tracking-[0.3em] text-[10px] mb-1">PAINEL DO BARBEIRO</h2>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setFilterPeriod('day')}
                                            className="font-serif text-2xl md:text-3xl text-white transition-colors"
                                        >
                                            Financeiro
                                        </button>
                                        <button
                                            onClick={() => setFilterPeriod('gallery')}
                                            className="font-serif text-2xl md:text-3xl text-gray-500 hover:text-white transition-colors"
                                        >
                                            Galeria
                                        </button>
                                        <button
                                            onClick={() => setFilterPeriod('services')}
                                            className="font-serif text-2xl md:text-3xl text-gray-500 hover:text-white transition-colors"
                                        >
                                            Serviços
                                        </button>
                                    </div>
                                </div>


                                <div className="flex flex-wrap items-center gap-4">
                                    {/* Period Filter */}
                                    <div className="flex bg-[#121212] border border-white/10 rounded overflow-hidden">
                                        {(['day', 'week', 'month'] as FilterPeriod[]).map((period) => (
                                            <button
                                                key={period}
                                                onClick={() => setFilterPeriod(period)}
                                                className={`px-3 py-2 text-[10px] uppercase tracking-wider transition-all ${filterPeriod === period
                                                    ? 'bg-white text-black'
                                                    : 'text-gray-400 hover:text-white'
                                                    }`}
                                            >
                                                {period === 'day' ? 'Dia' : period === 'week' ? 'Semana' : 'Mês'}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Date Picker */}
                                    <input
                                        type="date"
                                        className="bg-[#121212] border border-white/10 px-3 py-2 focus:outline-none focus:border-white/30 transition-colors text-sm rounded inverted-scheme"
                                        value={selectedDate}
                                        onChange={e => setSelectedDate(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Statistics Cards */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
                                <div className="bg-[#121212] border border-white/10 p-4 md:p-5">
                                    <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Faturamento</div>
                                    <div className="text-xl md:text-2xl font-serif text-green-400">
                                        {stats ? formatCurrency(stats.totalRevenue) : '...'}
                                    </div>
                                    <div className="text-[9px] text-gray-600 mt-1">{getPeriodLabel()}</div>
                                </div>

                                <div className="bg-[#121212] border border-white/10 p-4 md:p-5">
                                    <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Atendimentos</div>
                                    <div className="text-xl md:text-2xl font-serif text-white">
                                        {stats?.completedCount ?? '...'}
                                    </div>
                                    <div className="text-[9px] text-gray-600 mt-1">Concluídos</div>
                                </div>

                                <div className="bg-[#121212] border border-white/10 p-4 md:p-5">
                                    <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Cancelamentos</div>
                                    <div className="text-xl md:text-2xl font-serif text-red-400">
                                        {stats?.cancelledCount ?? '...'}
                                    </div>
                                    <div className="text-[9px] text-gray-600 mt-1">{getPeriodLabel()}</div>
                                </div>

                                <div className="bg-[#121212] border border-white/10 p-4 md:p-5">
                                    <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Pendentes</div>
                                    <div className="text-xl md:text-2xl font-serif text-yellow-400">
                                        {stats?.pendingCount ?? '...'}
                                    </div>
                                    <div className="text-[9px] text-gray-600 mt-1">Aguardando</div>
                                </div>
                            </div>

                            {/* Appointments List */}
                            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4">
                                    Agendamentos ({stats?.appointments?.length || 0})
                                </div>

                                {stats === undefined ? (
                                    <div className="flex items-center justify-center py-20">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                    </div>
                                ) : stats.appointments.length === 0 ? (
                                    <div className="text-center py-20 text-gray-500">
                                        <p className="font-light">Nenhum agendamento neste período.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {stats.appointments.map((apt) => (
                                            <div
                                                key={apt._id}
                                                className={`group bg-[#121212] border p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${apt.status === 'cancelled'
                                                    ? 'border-red-500/20 opacity-60'
                                                    : apt.status === 'completed'
                                                        ? 'border-green-500/20'
                                                        : 'border-white/5 hover:border-white/20'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-4 md:gap-6 flex-1">
                                                    {/* Date & Time */}
                                                    <div className="text-center min-w-[60px]">
                                                        <div className="text-lg md:text-xl font-serif text-white/90">
                                                            {apt.time}
                                                        </div>
                                                        <div className="text-[9px] text-gray-600">
                                                            {new Date(apt.date + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                                                        </div>
                                                    </div>

                                                    {/* Client Info */}
                                                    <div className="space-y-1 flex-1">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <h4 className="text-white font-medium">{apt.clientName}</h4>
                                                            {/* Status Badge */}
                                                            <span className={`px-2 py-0.5 text-[8px] uppercase tracking-widest rounded border ${getStatusColor(apt.status)}`}>
                                                                {getStatusLabel(apt.status)}
                                                            </span>
                                                            {/* Payment Status */}
                                                            {apt.paymentStatus === 'paid' && (
                                                                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-[8px] uppercase tracking-widest rounded">
                                                                    PIX ✓
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-wider flex-wrap">
                                                            <span>{apt.serviceName}</span>
                                                            <span className="text-gray-700">•</span>
                                                            <span className="text-white/70">{apt.servicePrice}</span>
                                                            {apt.phone && (
                                                                <>
                                                                    <span className="text-gray-700">•</span>
                                                                    <a
                                                                        href={`https://wa.me/55${apt.phone.replace(/\D/g, '')}`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="hover:text-white transition-colors"
                                                                    >
                                                                        {apt.phone}
                                                                    </a>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex items-center gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                                    {apt.status !== 'completed' && apt.status !== 'cancelled' && (
                                                        <>
                                                            <button
                                                                onClick={() => handleStatusChange(apt._id, 'completed')}
                                                                className="px-3 py-1.5 bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors text-[10px] uppercase tracking-wider rounded"
                                                                title="Marcar como concluído"
                                                            >
                                                                ✓ Concluído
                                                            </button>
                                                            <button
                                                                onClick={() => handleStatusChange(apt._id, 'cancelled')}
                                                                className="px-3 py-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors text-[10px] uppercase tracking-wider rounded"
                                                                title="Marcar como cancelado"
                                                            >
                                                                ✗ Cancelar
                                                            </button>
                                                        </>
                                                    )}
                                                    {(apt.status === 'completed' || apt.status === 'cancelled') && (
                                                        <button
                                                            onClick={() => handleStatusChange(apt._id, 'pending')}
                                                            className="px-3 py-1.5 bg-white/10 text-gray-400 hover:bg-white/20 transition-colors text-[10px] uppercase tracking-wider rounded"
                                                        >
                                                            Desfazer
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDelete(apt._id)}
                                                        className="px-2 py-1.5 text-red-500/50 hover:text-red-500 transition-colors text-[10px] uppercase tracking-wider"
                                                    >
                                                        Excluir
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-2 text-[10px] text-gray-600 uppercase tracking-[0.2em]">
                                <span>
                                    Período: {dateRange.startDate} até {dateRange.endDate}
                                </span>
                                <span>Biel do Corte © 2026</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div >
    );
};

export default BarberDashboard;
