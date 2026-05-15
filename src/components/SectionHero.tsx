import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import React from 'react';
import { useBooking } from '../context/BookingContext';

export const SectionHero: React.FC = () => {
  const { open } = useBooking();

  return (
    <section className="relative min-h-screen bg-spa-cream overflow-hidden flex flex-col items-center">

      {/* Subtle grain */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.035 }}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* Text block */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-40 pb-0 text-center flex flex-col items-center gap-7">

        <motion.p
          className="text-[10px] uppercase tracking-[0.35em] text-spa-stone/35 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Gabelsberger Str. 3 · Mainburg · Deutschland
        </motion.p>

        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-serif font-light leading-[1.07] tracking-tight text-spa-stone"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
        >
          Schön sein darf sich<br />
          <motion.span
            className="italic text-spa-nude"
            animate={{ opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            gut anfühlen.
          </motion.span>
        </motion.h1>

        <motion.p
          className="max-w-md text-sm md:text-base text-spa-stone/55 font-light leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
        >
          Gesichtsbehandlungen, Wimpern und Make-up – mit echtem Handwerk und Herzblut gemacht.
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-3 flex-wrap"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.38 }}
        >
          <motion.button
            onClick={open}
            whileHover={{ scale: 1.04, boxShadow: '0 6px 24px rgba(44,26,26,0.18)' }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-7 py-3 bg-spa-stone text-spa-white rounded-full text-xs font-semibold uppercase tracking-widest"
          >
            Termin buchen
            <ArrowRight size={14} />
          </motion.button>

          <motion.a
            href="#behandlungen"
            whileHover={{ scale: 1.03 }}
            className="px-7 py-3 rounded-full border border-spa-stone/15 text-spa-stone/55 text-xs font-semibold uppercase tracking-widest hover:border-spa-nude hover:text-spa-nude transition-colors duration-200"
          >
            Behandlungen
          </motion.a>
        </motion.div>

      </div>

      {/* Floating masked image below text */}
      <motion.div
        className="relative z-0 mt-14 flex justify-center w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.5, ease: 'easeOut' }}
      >
        <img
          src="/studio-front.png"
          alt="Rem Cosmetics Studio"
          className="w-72 sm:w-[340px] md:w-[420px] lg:w-[500px] h-auto"
          style={{
            maskImage:
              'radial-gradient(ellipse 76% 80% at 50% 46%, black 20%, rgba(0,0,0,0.7) 42%, rgba(0,0,0,0.2) 60%, transparent 74%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 76% 80% at 50% 46%, black 20%, rgba(0,0,0,0.7) 42%, rgba(0,0,0,0.2) 60%, transparent 74%)',
          }}
        />
      </motion.div>
    </section>
  );
};
