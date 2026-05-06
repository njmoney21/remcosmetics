import { motion } from 'motion/react';
import React from 'react';
import { ParallaxShapes } from './Effects';

export const SectionDetails: React.FC = () => {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <ParallaxShapes />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <span className="text-spa-nude text-xs font-bold uppercase tracking-widest">Unsere Philosophie</span>
              <h2 className="text-4xl md:text-6xl font-serif font-light text-spa-stone leading-tight">
                Deine natürliche <br /> Ausstrahlung entfalten.
              </h2>
            </div>

            <div className="space-y-8">
              <DetailItem
                number="01"
                title="Individuelle Hautpflege"
                description="Jedes Gesicht ist einzigartig. Unsere erfahrenen Therapeutinnen analysieren deine Haut und erstellen ein persönliches Ritual für sichtbare, nachhaltige Ergebnisse."
              />
              <DetailItem
                number="02"
                title="Präzise Handwerkskunst"
                description="Von Wimpernverlängerungen, die deine Augen betonen, bis hin zu Make-up, das deine Persönlichkeit hervorhebt – wir achten auf die feinen Details, die den Unterschied machen."
              />
              <DetailItem
                number="03"
                title="Wohltuende Atmosphäre"
                description="Wir glauben, dass Schönheit mit innerer Ruhe beginnt. Unsere Spa-Atmosphäre ist sorgfältig gestaltet, um Entspannung und Wohlbefinden zu fördern."
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://picsum.photos/seed/spa-details/1200/1500"
                alt="Spa Innenraum"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <motion.div
              className="absolute -bottom-10 -left-10 p-8 bg-spa-white rounded-2xl shadow-xl border border-spa-nude/10 max-w-xs"
              whileHover={{ y: -5 }}
            >
              <p className="text-sm italic font-serif text-spa-stone/80">
                "Die Atmosphäre ist einzigartig. Ein wahres Refugium für Entspannung und Schönheit."
              </p>
              <p className="mt-4 text-[10px] uppercase tracking-widest font-bold">Kundenstimme</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const DetailItem: React.FC<{ number: string; title: string; description: string }> = ({ number, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group flex gap-8 border-b border-spa-nude/20 pb-8 last:border-0"
  >
    <span className="text-spa-nude font-serif italic text-2xl pt-1 opacity-50 group-hover:opacity-100 transition-opacity">
      {number}
    </span>
    <div className="space-y-2">
      <h3 className="text-xl font-medium text-spa-stone">{title}</h3>
      <p className="text-spa-stone/60 font-light leading-relaxed max-w-md">
        {description}
      </p>
    </div>
  </motion.div>
);
