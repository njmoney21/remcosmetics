import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';
import React from 'react';
import { useBooking } from '../context/BookingContext';

export const SectionHero: React.FC = () => {
  const { open } = useBooking();

  return (
    <section className="relative min-h-screen bg-spa-cream overflow-hidden flex flex-col items-center">

      {/* Subtle grain — matches the paper texture in the reference */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.035 }}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* Text block — upper portion of the hero */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-40 pb-0 text-center flex flex-col items-center gap-7">

        {/* Tiny location tag — like the reference */}
        <motion.p
          className="text-[10px] uppercase tracking-[0.35em] text-spa-stone/35 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Gabelsberger Str. 3 · Mainburg · Deutschland
        </motion.p>

        {/* Main headline — large serif, two lines, italic accent */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-serif font-light leading-[1.07] tracking-tight text-spa-stone"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
        >
          Handwerk in jedem<br />
          <motion.span
            className="italic text-spa-nude"
            animate={{ opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            Detail.
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="max-w-md text-sm md:text-base text-spa-stone/50 font-light leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
        >
          Erstklassige Gesichtsbehandlungen, Wimpernverlängerungen und Make-up-Kunst — gestaltet für deine vollständige Entspannung.
        </motion.p>

        {/* CTA buttons — smaller, lighter, like the reference */}
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

        {/* Rating badge */}
        <motion.a
          href="#journal"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          whileHover={{ scale: 1.02, boxShadow: '0 6px 24px rgba(44,26,26,0.08)' }}
          className="inline-flex items-center gap-4 px-5 py-3 bg-spa-white rounded-2xl shadow-sm border border-spa-stone/6 cursor-pointer"
        >
          {/* Star icon box */}
          <div className="w-9 h-9 rounded-xl bg-spa-stone flex items-center justify-center shrink-0">
            <Star size={16} className="fill-spa-white text-spa-white" />
          </div>

          {/* Rating */}
          <div className="flex flex-col items-start leading-none gap-1">
            <span className="text-xl font-bold text-spa-stone tracking-tight">4.9</span>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={10} className="fill-spa-nude text-spa-nude" />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-spa-stone/10" />

          {/* Count */}
          <div className="flex flex-col items-start leading-none gap-1">
            <span className="text-xl font-bold text-spa-stone tracking-tight">154</span>
            <span className="text-[11px] text-spa-nude font-medium">Bewertungen</span>
          </div>
        </motion.a>
      </div>

      {/* Floating masked image — large, centered, soft oval blend like the reference */}
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
