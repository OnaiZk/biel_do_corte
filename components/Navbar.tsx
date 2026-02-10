
import React, { useState, useEffect } from 'react';
import { UserButton, useUser, useAuth, SignInButton } from "@clerk/clerk-react";

interface NavbarProps {
  onBookClick: () => void;
  onPortalClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onBookClick, onPortalClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-3 sm:px-6 md:px-12 ${isScrolled ? 'bg-black/95 backdrop-blur-md border-b border-white/10 py-2 sm:py-3' : 'bg-transparent py-3 sm:py-5'
      }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <img
            src="/logo.jpg"
            alt="Biel do Corte"
            className="h-10 sm:h-12 md:h-14 w-auto"
          />
          <span className="font-serif text-sm sm:text-lg md:text-xl tracking-[0.05em] sm:tracking-[0.1em]">BIEL DO CORTE</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={onPortalClick}
            className="text-white/60 hover:text-white px-3 py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest transition-colors"
          >
            Meus Agendamentos
          </button>

          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <SignInButton mode="modal">
              <button className="text-white/60 hover:text-white px-3 py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest transition-colors">
                Entrar
              </button>
            </SignInButton>
          )}

          <button
            onClick={onBookClick}
            className="bg-white text-black px-4 sm:px-6 py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest hover:bg-gray-100 active:scale-95 transition-all whitespace-nowrap"
          >
            Agendar
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
