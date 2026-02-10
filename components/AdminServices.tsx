import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Id } from '../convex/_generated/dataModel';

const AdminServices: React.FC = () => {
    const services = useQuery(api.services.getAllServices) || [];
    const saveService = useMutation(api.services.saveService);
    const toggleStatus = useMutation(api.services.toggleServiceStatus);
    const initServices = useMutation(api.services.initServices);

    const [editingId, setEditingId] = useState<Id<"services"> | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        duration: '',
        description: '',
        active: true
    });

    const handleEdit = (service: any) => {
        setEditingId(service._id);
        setFormData({
            name: service.name,
            price: service.price,
            duration: service.duration,
            description: service.description || '',
            active: service.active
        });
    };

    const handleCancel = () => {
        setEditingId(null);
        setFormData({ name: '', price: 0, duration: '', description: '', active: true });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await saveService({
                id: editingId || undefined,
                name: formData.name,
                price: parseFloat(formData.price.toString()),
                duration: formData.duration,
                description: formData.description,
                active: formData.active
            });
            handleCancel();
        } catch (error) {
            console.error("Error saving service:", error);
            alert("Erro ao salvar serviço");
        }
    };

    const handleInit = async () => {
        if (confirm("Isso irá criar os serviços padrão se a lista estiver vazia. Continuar?")) {
            const res = await initServices();
            alert(res);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h3 className="font-serif text-2xl text-white">Gerenciar Serviços</h3>
                <button
                    onClick={handleInit}
                    className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-white border border-white/10 px-3 py-1 bg-white/5 hover:bg-white/10"
                >
                    Restaurar Padrões
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-[#121212] p-6 border border-white/10 rounded-lg space-y-4">
                <h4 className="text-white text-sm uppercase tracking-widest mb-4">
                    {editingId ? 'Editar Serviço' : 'Novo Serviço'}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-500 text-xs uppercase tracking-widest mb-2">Nome</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-black border border-white/20 p-3 text-white text-sm focus:border-white transition-colors outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-500 text-xs uppercase tracking-widest mb-2">Preço (R$)</label>
                        <input
                            type="number"
                            step="0.01"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                            className="w-full bg-black border border-white/20 p-3 text-white text-sm focus:border-white transition-colors outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-500 text-xs uppercase tracking-widest mb-2">Duração</label>
                        <input
                            type="text"
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            className="w-full bg-black border border-white/20 p-3 text-white text-sm focus:border-white transition-colors outline-none"
                            placeholder="Ex: 30 min"
                            required
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-gray-500 text-xs uppercase tracking-widest mb-2">Descrição</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-black border border-white/20 p-3 text-white text-sm focus:border-white transition-colors outline-none resize-none h-20"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.active}
                            onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                            className="accent-white"
                        />
                        <span className="text-white text-sm">Ativo</span>
                    </label>
                </div>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="bg-white text-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors w-full sm:w-auto"
                    >
                        {editingId ? 'Atualizar' : 'Criar Serviço'}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="border border-white/20 text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors w-full sm:w-auto"
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            {/* List */}
            <div className="space-y-4">
                {services.map((service) => (
                    <div key={service._id} className="bg-[#121212] border border-white/10 p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <div className="flex items-center gap-3">
                                <h4 className="text-white font-medium">{service.name}</h4>
                                <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded ${service.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {service.active ? 'Ativo' : 'Inativo'}
                                </span>
                            </div>
                            <p className="text-gray-500 text-sm mt-1">{service.description}</p>
                            <div className="text-gray-400 text-xs mt-2 font-mono">
                                R$ {service.price.toFixed(2)} • {service.duration}
                            </div>
                        </div>

                        <div className="flex gap-2 w-full md:w-auto">
                            <button
                                onClick={() => handleEdit(service)}
                                className="flex-1 md:flex-none border border-white/20 text-white px-4 py-2 text-[10px] uppercase tracking-widest hover:bg-white/10"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => toggleStatus({ id: service._id, active: !service.active })}
                                className={`flex-1 md:flex-none border border-white/20 px-4 py-2 text-[10px] uppercase tracking-widest hover:bg-white/10 ${service.active ? 'text-red-400 hover:text-red-300' : 'text-green-400 hover:text-green-300'}`}
                            >
                                {service.active ? 'Desativar' : 'Ativar'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminServices;
