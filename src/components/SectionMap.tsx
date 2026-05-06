import { motion } from 'motion/react';
import React from 'react';
import { MapPin } from 'lucide-react';

export const SectionMap: React.FC = () => {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-12"
        >
          <span className="text-spa-nude text-xs font-bold uppercase tracking-widest">Standort</span>
          <h2 className="text-3xl md:text-5xl font-serif text-spa-stone">Hier findest du uns</h2>
          <p className="flex items-center justify-center gap-2 text-spa-stone/50 font-light">
            <MapPin size={14} className="text-spa-nude" />
            Gabelsberger Str. 3, Mainburg, Deutschland
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="rounded-3xl overflow-hidden shadow-xl border border-spa-nude/10"
          style={{ height: '450px' }}
        >
          <iframe
            src="https://maps.google.com/maps?q=Gabelsberger+Str.+3,+84048+Mainburg,+Germany&output=embed&z=16"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Rem Cosmetics Studio Standort"
          />
        </motion.div>
      </div>
    </section>
  );
};
