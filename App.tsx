
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
  const [paymentToast, setPaymentToast] = useState<string | null>(null);

  // Handle return from Mercado Pago checkout
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get('payment');

    if (paymentStatus === 'success') {
      setPaymentToast('Pagamento realizado com sucesso! ✓');
      // Clean URL params
      window.history.replaceState({}, '', window.location.pathname);
      setTimeout(() => setPaymentToast(null), 5000);
    } else if (paymentStatus === 'failure') {
      setPaymentToast('Pagamento não concluído. Tente novamente.');
      window.history.replaceState({}, '', window.location.pathname);
      setTimeout(() => setPaymentToast(null), 5000);
    } else if (paymentStatus === 'pending') {
      setPaymentToast('Pagamento pendente. Aguardando confirmação...');
      window.history.replaceState({}, '', window.location.pathname);
      setTimeout(() => setPaymentToast(null), 5000);
    }
  }, []);

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
      {/* Payment Toast Notification */}
      {paymentToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] animate-fade-in">
          <div className={`px-6 py-3 border shadow-2xl backdrop-blur-sm text-sm font-medium ${paymentToast.includes('sucesso')
              ? 'bg-green-500/20 border-green-500/40 text-green-300'
              : paymentToast.includes('pendente')
                ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300'
                : 'bg-red-500/20 border-red-500/40 text-red-300'
            }`}>
            {paymentToast}
          </div>
        </div>
      )}
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

