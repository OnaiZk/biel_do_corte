
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import BookingModal from './components/BookingModal';
import MenuModal from './components/MenuModal';
import Footer from './components/Footer';
import BarberDashboard from './components/BarberDashboard';
import BarberLogin from './components/BarberLogin';
import StyleConsultant from './components/StyleConsultant';
import Location from './components/Location';
import Testimonials from './components/Testimonials';
import ClientPortal from './components/ClientPortal';

const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBarberLoginOpen, setIsBarberLoginOpen] = useState(false);
  const [isBarberDashboardOpen, setIsBarberDashboardOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);

  // Check if already authenticated
  const checkAuth = () => sessionStorage.getItem('barber_authenticated') === 'true';

  // Handle admin access
  const handleAdminClick = () => {
    if (checkAuth()) {
      setIsBarberDashboardOpen(true);
    } else {
      setIsBarberLoginOpen(true);
    }
  };

  // Keyboard shortcut to open barber dashboard (Alt + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'a') {
        handleAdminClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-black text-[#E5E5E5] selection:bg-white selection:text-black">
      <Navbar
        onBookClick={() => setIsBookingOpen(true)}
        onPortalClick={() => setIsPortalOpen(true)}
      />

      <main>
        <Hero onBookClick={() => setIsBookingOpen(true)} />

        <About />

        <section id="services">
          <Services onMenuClick={() => setIsMenuOpen(true)} />
        </section>

        <section id="consultant" className="bg-[#121212] py-20">
          <StyleConsultant />
        </section>

        <Testimonials />
        <Location />
      </main>

      <Footer onAdminClick={handleAdminClick} />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onPortalOpen={() => setIsPortalOpen(true)}
      />

      <ClientPortal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
      />

      <BarberLogin
        isOpen={isBarberLoginOpen}
        onClose={() => setIsBarberLoginOpen(false)}
        onSuccess={() => {
          setIsBarberLoginOpen(false);
          setIsBarberDashboardOpen(true);
        }}
      />

      <BarberDashboard
        isOpen={isBarberDashboardOpen}
        onClose={() => setIsBarberDashboardOpen(false)}
      />

      <MenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </div>
  );
};

export default App;

