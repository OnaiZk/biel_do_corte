
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Message } from '../types';

const StyleConsultant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "E aí! 👋 Me conta o que você tá pensando pro corte, que eu te ajudo a decidir." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `Você é um consultor de cortes da barbearia Biel do Corte. 
          Seu tom é casual, tranquilo e direto - como um amigo que manja de cortes.
          Responda SEMPRE em PORTUGUÊS (PT-BR). Use poucas palavras, mas seja simpático.
          Sugira estilos como Degradê, Navalhado, Social, Moicano, etc.
          O único barbeiro é o Biel. Não invente nomes de outros barbeiros.
          Evite respostas longas. Seja breve e útil.`,
          temperature: 0.8,
        },
      });

      const aiText = response.text || "Peço desculpas, meus sentidos criativos estão nublados no momento. Como mais posso ajudá-lo, Senhor?";
      setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Minhas desculpas, encontrei uma pequena interrupção. Por favor, tente novamente em breve." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-white/60 uppercase tracking-[0.3em] text-[10px] mb-3">GROOMING INTELIGENTE</h2>
        <h3 className="font-serif text-3xl md:text-5xl mb-4">Consultor de Estilo IA</h3>
        <p className="text-gray-500 max-w-lg mx-auto font-light text-sm">
          Receba uma recomendação personalizada de acordo com suas características únicas.
        </p>
      </div>

      <div className="bg-black border border-white/20 shadow-2xl rounded-sm overflow-hidden flex flex-col h-[500px]">
        <div className="p-4 border-b border-white/10 bg-[#0A0A0A] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
            <span className="text-[9px] uppercase tracking-widest text-white font-bold">Consultor Online</span>
          </div>
          <span className="text-[9px] uppercase tracking-widest text-gray-500">Biel do Corte</span>
        </div>

        <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-4 scroll-smooth">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-sm text-sm leading-relaxed ${msg.role === 'user'
                ? 'bg-white text-black font-medium'
                : 'bg-[#1A1A1A] text-gray-300 border border-white/5'
                }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[#1A1A1A] p-3 rounded-sm text-gray-500 text-[10px] italic">
                O Consultor está refletindo...
              </div>
            </div>
          )}
        </div>

        <div className="p-3 border-t border-white/10 bg-[#0A0A0A] flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ex: 'Tenho rosto oval e busco algo moderno...'"
            className="flex-grow bg-black border border-white/20 p-3 text-sm focus:outline-none focus:border-white/50 transition-colors placeholder:text-gray-700"
          />
          <button
            onClick={handleSend}
            disabled={isTyping}
            className="bg-white text-black px-4 text-[10px] font-bold uppercase tracking-widest disabled:opacity-50 hover:bg-gray-100 transition-colors"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default StyleConsultant;
