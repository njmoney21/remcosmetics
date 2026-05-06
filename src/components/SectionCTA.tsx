import { motion } from 'motion/react';
import { Calendar, Instagram, Phone } from 'lucide-react';
import React from 'react';

export const SectionCTA: React.FC = () => {
  return (
    <section className="relative py-32 px-6 overflow-hidden bg-spa-stone text-spa-white">
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 10% 20%, #D9C5C5 0%, transparent 40%), radial-gradient(circle at 90% 80%, #D9C5C5 0%, transparent 40%)`,
          }}
        />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-7xl font-serif font-light leading-tight">
            Ready to find your <br />
            <motion.span 
              className="italic text-spa-nude"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              inner glow?
            </motion.span>
          </h2>
          <p className="text-spa-white/60 font-light max-w-xl mx-auto">
            Book your appointment today and step into a world of tranquility and beauty artistry.
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <motion.button
            whileHover={{ scale: 1.05, background: "#D9C5C5", color: "#625959" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 border-2 border-spa-nude text-spa-nude rounded-full font-medium tracking-wide flex items-center gap-3 transition-colors"
          >
            <Calendar size={18} />
            Check Availability
          </motion.button>
        </div>

        <div className="pt-20 border-t border-spa-white/10 flex flex-col md:flex-row items-center justify-between gap-8 opacity-40">
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em]">
              <Phone size={14} />
              +49 178 6244158
            </span>
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em]">
              <Instagram size={14} />
              @remcosmetics_
            </span>
          </div>
          <p className="text-[10px] uppercase tracking-widest">
            © 2026 remcosmetics Artistry. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};
