import { motion } from 'motion/react';
import { Eye, Sparkles, User, ArrowRight } from 'lucide-react';
import React from 'react';
import { AnimatedGradient, BeamTexture, ParticleDrift } from './Effects';

export const SectionHero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 px-6">
      <AnimatedGradient />
      <BeamTexture />
      <ParticleDrift />

      <div className="relative z-10 max-w-5xl w-full text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full border border-spa-nude text-spa-stone text-xs font-medium tracking-[0.2em] uppercase"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            Eine Oase für die Sinne
          </motion.span>

          <h1 className="text-6xl md:text-8xl font-serif font-light leading-[1.05] tracking-tight text-spa-stone">
            Handwerk in <br />
            <motion.span
              className="italic text-spa-nude"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              jedem Detail.
            </motion.span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-spa-stone/70 font-light leading-relaxed">
            Erlebe erstklassige Gesichtsbehandlungen, sorgfältige Wimpernverlängerungen und professionelle Make-up-Kunst in einem Raum, der für deine vollständige Entspannung gestaltet wurde.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(217, 197, 197, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-spa-stone text-spa-white rounded-full font-medium tracking-wide flex items-center gap-3 transition-shadow"
          >
            Termin buchen
            <ArrowRight size={18} />
          </motion.button>

          <div className="flex -space-x-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-12 h-12 rounded-full border-2 border-spa-white overflow-hidden bg-spa-nude/20">
                <img
                  src={`https://picsum.photos/seed/spa-face-${i}/100/100`}
                  alt="Kundin"
                  className="w-full h-full object-cover grayscale"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
            <div className="pl-4 flex flex-col justify-center text-left">
              <span className="text-xs font-semibold text-spa-stone">2.000+ zufriedene Kunden</span>
              <span className="text-[10px] text-spa-stone/50 uppercase tracking-widest">Bestätigte Ergebnisse</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-20 border-t border-spa-nude/20"
        >
          <NavItem icon={<Sparkles size={20} />} label="Gesichtsrituale" />
          <NavItem icon={<Eye size={20} />} label="Wimpern & Brauen" />
          <NavItem icon={<User size={20} />} label="Make-up Artist" />
          <NavItem icon={<ArrowRight size={20} />} label="SPA-Mitglieder" />
        </motion.div>
      </div>
    </section>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <motion.div
    whileHover="hover"
    className="flex flex-col items-center gap-3 cursor-pointer group"
  >
    <motion.div
      variants={{
        hover: { y: -5, color: '#D9C5C5' }
      }}
      className="p-4 rounded-2xl bg-spa-nude/5 text-spa-stone transition-colors group-hover:bg-spa-nude/10"
    >
      {icon}
    </motion.div>
    <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-spa-stone/60 group-hover:text-spa-stone">
      {label}
    </span>
  </motion.div>
);
