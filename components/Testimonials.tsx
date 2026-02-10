
import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Testimonials: React.FC = () => {
    const [ref, isVisible] = useIntersectionObserver();
    const reviews = useQuery(api.reviews.getReviews) || [];
    const createReview = useMutation(api.reviews.createReview);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', content: '', rating: 5 });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.content) return;

        setIsSubmitting(true);
        try {
            await createReview({
                clientName: formData.name,
                content: formData.content,
                rating: formData.rating,
            });
            setFormData({ name: '', content: '', rating: 5 });
            setIsModalOpen(false);
        } catch (error) {
            console.error("Erro ao enviar avaliação:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div ref={ref} className={`py-20 px-6 md:px-12 bg-black border-t border-white/5 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-white/60 uppercase tracking-[0.3em] text-[10px] mb-3">DEPOIMENTOS</h2>
                    <h3 className="font-serif text-3xl md:text-5xl mb-6">O Que Dizem Nossos Clientes</h3>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-xs uppercase tracking-widest text-[#D4AF37] border border-[#D4AF37]/30 px-6 py-3 hover:bg-[#D4AF37] hover:text-black transition-all"
                    >
                        Deixar uma Avaliação
                    </button>
                </div>

                {reviews.length === 0 ? (
                    <div className="text-center text-gray-500 italic py-12">
                        Seja o primeiro a deixar seu feedback!
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {reviews.map((item, index) => (
                            <div
                                key={item._id}
                                className="bg-[#0A0A0A] p-8 border border-white/5 hover:border-white/20 transition-all duration-500 group"
                            >
                                <div className="flex gap-1 mb-4 text-[#D4AF37]">
                                    {[...Array(item.rating)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6 italic">"{item.content}"</p>
                                <div>
                                    <h4 className="text-white font-medium text-sm uppercase tracking-wide">{item.clientName}</h4>
                                    <p className="text-gray-600 text-xs mt-1">
                                        {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal de Avaliação */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
                    <div className="bg-[#0A0A0A] w-full max-w-md border border-white/10 p-8 shadow-2xl relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white"
                        >
                            ✕
                        </button>

                        <h3 className="font-serif text-2xl text-center mb-6">Sua Avaliação</h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Seu Nome</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-black border border-white/20 p-3 text-sm focus:border-white transition-colors outline-none"
                                    placeholder="Seu nome"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Nota</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, rating: star })}
                                            className={`w-8 h-8 flex items-center justify-center border ${formData.rating >= star ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-white/20 text-gray-500'}`}
                                        >
                                            {star}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Comentário</label>
                                <textarea
                                    value={formData.content}
                                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full bg-black border border-white/20 p-3 text-sm focus:border-white transition-colors outline-none h-32 resize-none"
                                    placeholder="Conte sua experiência..."
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-white text-black py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-gray-200 transition-colors disabled:opacity-50"
                            >
                                {isSubmitting ? 'Enviando...' : 'Enviar Avaliação'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Testimonials;
