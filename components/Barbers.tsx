
import React from 'react';
import { BARBERS } from '../constants';

const Barbers: React.FC = () => {
  return (
    <div className="py-20 px-6 md:px-12 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-gold uppercase tracking-[0.3em] text-[10px] mb-3">ARTESÃOS</h2>
          <h3 className="font-serif text-3xl md:text-5xl">Mestres Barbeiros</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {BARBERS.map((barber) => (
            <div key={barber.id} className="group">
              <div className="relative aspect-[4/5] mb-5 overflow-hidden bg-[#1A1A1A]">
                <img 
                  src={barber.image} 
                  alt={barber.name} 
                  className="w-full h-full object-cover grayscale brightness-75 transition-all duration-700 md:group-hover:grayscale-0 md:group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <p className="text-gold text-[9px] uppercase tracking-widest mb-1">Especialidade</p>
                  <p className="text-white text-sm font-medium">{barber.specialty}</p>
                </div>
              </div>
              <h4 className="font-serif text-2xl mb-1">{barber.name}</h4>
              <p className="text-gold text-[10px] uppercase tracking-widest mb-3">{barber.role}</p>
              <div className="flex items-center gap-2 text-gray-500 text-xs italic">
                <span>{barber.experience} de maestria</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Barbers;
