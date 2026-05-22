import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { SectionHero } from './components/SectionHero';
import { SectionDetails } from './components/SectionDetails';
import { SectionServices } from './components/SectionServices';
import { SectionProof } from './components/SectionProof';
import { SectionFAQ } from './components/SectionFAQ';
import { SectionKontakt } from './components/SectionKontakt';
import { SectionMap } from './components/SectionMap';
import { SectionCTA } from './components/SectionCTA';
import { BookingModal } from './components/BookingModal';
import { CustomCursorProxy } from './components/Effects';
import { BookingProvider, useBooking } from './context/BookingContext';
import { LegalModal, LegalModalType } from './components/LegalModal';

const Logo: React.FC<{ className?: string }> = ({ className = 'h-14' }) => (
  <img src="/logo.png" alt="Rem Cosmetics" className={`${className} w-auto object-contain mix-blend-multiply`} />
);

const navItems = [
  {
    label: 'Rituale',
    href: '#rituale',
    title: 'Pflege-Rituale',
    description: 'Individuelle Hautpflege und Gesichtsbehandlungen für sichtbare, nachhaltige Ergebnisse.',
  },
  {
    label: 'Behandlungen',
    href: '#behandlungen',
    title: 'Alle Behandlungen',
    description: 'Wimpernverlängerungen, Aquafacial, HeadSpa, Make-up & mehr – das komplette Angebot.',
  },
  {
    label: 'Oase',
    href: '#oase',
    title: 'Das Studio',
    description: 'Eine Wohlfühl-Oase in Mainburg – gestaltet für deine vollständige Entspannung.',
  },
  {
    label: 'Journal',
    href: '#journal',
    title: 'Kundenstimmen',
    description: 'Was unsere Kundinnen sagen – über 154 verifizierte Bewertungen auf Google.',
  },
];

const Navbar: React.FC = () => {
  const { open } = useBooking();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-3 bg-white/80 backdrop-blur-xl border-b border-spa-nude/10' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.div whileHover={{ scale: 1.03 }} className="cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Logo className="h-14" />
        </motion.div>

        <div className="hidden md:flex items-center gap-12">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setActiveNav(item.label)}
              onMouseLeave={() => setActiveNav(null)}
            >
              <motion.a
                href={item.href}
                className="text-xs font-bold uppercase tracking-[0.2em] text-spa-stone/60 hover:text-spa-stone transition-colors relative group block py-2"
                whileHover={{ y: -2 }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-spa-nude transition-all duration-300 group-hover:w-full" />
              </motion.a>

              {/* Bridge to keep dropdown open while moving mouse */}
              <div className="absolute top-full left-0 w-full h-3" />

              <AnimatePresence>
                {activeNav === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-56 bg-spa-white rounded-2xl border border-spa-nude/20 shadow-xl shadow-spa-stone/10 p-5 z-50"
                  >
                    {/* notch */}
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-spa-white border-l border-t border-spa-nude/20 rotate-45" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-spa-nude mb-1">{item.title}</p>
                    <p className="text-xs text-spa-stone/60 leading-relaxed mb-3">{item.description}</p>
                    <a href={item.href} className="text-[10px] font-bold uppercase tracking-widest text-spa-stone hover:text-spa-nude transition-colors flex items-center gap-1">
                      Mehr entdecken <span>→</span>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <motion.button onClick={open} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-spa-stone text-spa-white rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-spa-stone/20">
            Termin buchen
          </motion.button>
        </div>

        <button className="md:hidden text-spa-stone p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-spa-nude/10 overflow-hidden">
            <div className="px-6 py-12 flex flex-col items-center gap-8">
              <Logo className="h-12" />
              {navItems.map((item) => (
                <a key={item.label} href={item.href} className="text-lg font-serif text-spa-stone"
                  onClick={() => setIsMobileMenuOpen(false)}>{item.label}</a>
              ))}
              <button onClick={() => { open(); setIsMobileMenuOpen(false); }}
                className="w-full py-4 bg-spa-stone text-white rounded-xl font-bold uppercase tracking-widest">
                Termin buchen
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

function AppInner() {
  const [legalModal, setLegalModal] = React.useState<LegalModalType>(null);

  return (
    <div className="relative overflow-x-hidden min-h-screen">
      <CustomCursorProxy />
      <Navbar />
      <BookingModal />
      <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />
      <main>
        <SectionHero />
        <div id="rituale"><SectionDetails /></div>
        <div id="behandlungen"><SectionServices /></div>
        <div id="journal"><SectionProof /></div>
        <SectionFAQ />
        <div id="oase"><SectionMap /></div>
        <SectionKontakt />
        <SectionCTA />
      </main>
      <footer className="py-12 px-6 flex justify-center border-t border-spa-nude/10">
        <div className="flex flex-col items-center gap-6">
          <Logo className="h-10" />
          <div className="flex gap-8">
            {(['Datenschutz', 'AGB', 'Kontakt'] as const).map(item => (
              <button key={item} onClick={() => setLegalModal(item.toLowerCase() as LegalModalType)}
                className="text-[10px] uppercase tracking-widest text-spa-stone/40 hover:text-spa-nude transition-colors cursor-pointer">
                {item}
              </button>
            ))}
          </div>
          <p className="text-[10px] uppercase tracking-widest text-spa-stone/25">© 2026 Rem Cosmetics · Alle Rechte vorbehalten</p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BookingProvider>
      <AppInner />
    </BookingProvider>
  );
}
