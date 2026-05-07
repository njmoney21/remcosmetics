import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { SectionHero } from './components/SectionHero';
import { SectionDetails } from './components/SectionDetails';
import { SectionServices } from './components/SectionServices';
import { SectionProof } from './components/SectionProof';
import { SectionMap } from './components/SectionMap';
import { SectionCTA } from './components/SectionCTA';
import { CustomCursorProxy } from './components/Effects';

const Logo: React.FC<{ className?: string }> = ({ className = 'h-10' }) => (
  <img src="/logo.png" alt="Rem Cosmetics" className={`${className} w-auto object-contain`} />
);

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'py-3 bg-white/80 backdrop-blur-xl border-b border-spa-nude/10' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.div whileHover={{ scale: 1.03 }} className="cursor-pointer">
          <Logo className="h-10" />
        </motion.div>

        <div className="hidden md:flex items-center gap-12">
          {['Rituale', 'Behandlungen', 'Oase', 'Journal'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs font-bold uppercase tracking-[0.2em] text-spa-stone/60 hover:text-spa-stone transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-spa-nude transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
          <motion.a
            href="https://beautinda.de/artist/57OGofkBgqPo51sKUQs4J6YQeIY2"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-spa-stone text-spa-white rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-spa-stone/20"
          >
            Termin buchen
          </motion.a>
        </div>

        <button
          className="md:hidden text-spa-stone p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-spa-nude/10 overflow-hidden"
          >
            <div className="px-6 py-12 flex flex-col items-center gap-8">
              <Logo className="h-12" />
              {['Rituale', 'Behandlungen', 'Oase', 'Journal'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-lg font-serif text-spa-stone"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <a
                href="https://beautinda.de/artist/57OGofkBgqPo51sKUQs4J6YQeIY2"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-spa-stone text-white rounded-xl font-bold uppercase tracking-widest text-center block"
              >
                Termin buchen
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default function App() {
  return (
    <div className="relative overflow-x-hidden min-h-screen">
      <CustomCursorProxy />
      <Navbar />
      <main>
        <SectionHero />
        <SectionDetails />
        <SectionServices />
        <SectionProof />
        <SectionMap />
        <SectionCTA />
      </main>

      <footer className="py-12 px-6 flex justify-center border-t border-spa-nude/10">
        <div className="flex flex-col items-center gap-6">
          <Logo className="h-10" />
          <div className="flex gap-8">
            {['Datenschutz', 'AGB', 'Karriere', 'Kontakt'].map(item => (
              <a key={item} href="#" className="text-[10px] uppercase tracking-widest text-spa-stone/40 hover:text-spa-nude transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
