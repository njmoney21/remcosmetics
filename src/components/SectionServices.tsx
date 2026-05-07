import { motion, AnimatePresence } from 'motion/react';
import { Clock, Plus } from 'lucide-react';
import React, { useState } from 'react';

const BOOKING_URL = 'https://beautinda.de/artist/57OGofkBgqPo51sKUQs4J6YQeIY2';

interface Service {
  name: string;
  duration: string;
  price: string;
}

interface Category {
  id: string;
  label: string;
  services: Service[];
}

const categories: Category[] = [
  {
    id: 'gesicht',
    label: 'Gesicht & Körper',
    services: [
      { name: 'Aquafacial Classic', duration: '1h', price: '109 €' },
      { name: 'Aquafacial Special', duration: '1h 20min', price: '129 €' },
      { name: 'Aquafacial Teenie bis 14', duration: '45min', price: '69 €' },
      { name: 'Aquafacial Anti-Aging', duration: '1h 30min', price: '139 €' },
      { name: 'Aquafacial Rücken', duration: '1h 15min', price: '139 €' },
      { name: 'Microneedling Classic', duration: '1h', price: '109 €' },
      { name: 'Microneedling Special', duration: '1h 15min', price: '139 €' },
      { name: 'Kombi Aquafacial & Microneedling', duration: '1h 30min', price: '169 €' },
      { name: 'LED-Lichttherapie (auch zu jeder Behandlung buchbar)', duration: '10min', price: '15 €' },
    ],
  },
  {
    id: 'wimpern',
    label: 'Wimpern',
    services: [
      { name: 'Lashlifting inkl. Keratinöl + Färben', duration: '1h', price: '65 €' },
      { name: 'Wimpern färben', duration: '20min', price: '15 €' },
      { name: 'Kombi Lash & Browlifting', duration: '1h 15min', price: '105 €' },
    ],
  },
  {
    id: 'augenbrauen',
    label: 'Augenbrauen',
    services: [
      { name: 'Browlifting inkl. Keratinöl + Färben', duration: '1h', price: '60 €' },
      { name: 'Augenbrauen färben', duration: '20min', price: '15 €' },
      { name: 'Augenbrauen nachzupfen', duration: '20min', price: '15 €' },
      { name: 'Augenbrauen modellieren', duration: '35min', price: '25 €' },
      { name: 'Wow Brows', duration: '45min', price: '30 €' },
    ],
  },
  {
    id: 'makeup',
    label: 'Make-Up',
    services: [
      { name: 'Tages Make-Up', duration: '1h', price: '60 €' },
      { name: 'Abend Make-Up', duration: '1h 30min', price: '100 €' },
      { name: 'Special Make-Up', duration: '1h 30min', price: '140 €' },
      { name: 'Braut Make-Up', duration: '2h', price: '190 €' },
      { name: 'Probe Make-Up', duration: '2h', price: '90 €' },
    ],
  },
  {
    id: 'massagen',
    label: 'Massagen',
    services: [
      { name: 'Head-Spa Basic', duration: '45min', price: '99 €' },
      { name: 'Head-Spa Deluxe', duration: '1h 30min', price: '135 €' },
      { name: 'Head-Spa Kids', duration: '30min', price: '60 €' },
    ],
  },
  {
    id: 'pakete',
    label: 'Pakete',
    services: [
      { name: 'Aquafacial & Lashlifting inkl. Keratinöl und Färben', duration: '2h', price: '154 €' },
      { name: 'Aquafacial & Browlifting inkl. Keratinöl und Färben', duration: '1h 45min', price: '149 €' },
      { name: 'Microneedling & Lashlifting inkl. Keratinöl und Färben', duration: '2h', price: '154 €' },
      { name: 'Microneedling & Browlifting inkl. Keratinöl und Färben', duration: '1h 45min', price: '149 €' },
    ],
  },
  {
    id: 'beratung',
    label: 'Beratung',
    services: [
      { name: 'Hautpflegeberatung + Analyse', duration: '30min', price: '10 €' },
      { name: 'Beratung Lash & Browlifting', duration: '30min', price: '10 €' },
      { name: 'Kopfhautpflege Beratung + Analyse', duration: '30min', price: '10 €' },
      { name: 'Beratung Make-Up', duration: '30min', price: '10 €' },
    ],
  },
];

export const SectionServices: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('alle');

  const visibleCategories =
    activeTab === 'alle'
      ? categories
      : categories.filter((c) => c.id === activeTab);

  return (
    <section id="rituale" className="relative py-32 px-6 bg-spa-white overflow-hidden">
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div className="space-y-3">
            <span className="text-spa-nude text-xs font-bold uppercase tracking-widest">Das biete ich an</span>
            <h2 className="text-4xl md:text-6xl font-serif font-light text-spa-stone leading-tight">
              Behandlungen <br />
              <span className="italic text-spa-nude">& Preise.</span>
            </h2>
          </div>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-spa-stone text-spa-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-spa-stone/90 transition-colors whitespace-nowrap self-start md:self-auto"
          >
            Jetzt buchen
          </a>
        </motion.div>

        {/* Category filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {[{ id: 'alle', label: 'Alle' }, ...categories].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-200 ${
                activeTab === cat.id
                  ? 'bg-spa-stone text-spa-white'
                  : 'bg-spa-nude/10 text-spa-stone/60 hover:bg-spa-nude/20 hover:text-spa-stone'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Service categories */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-12"
          >
            {visibleCategories.map((category) => (
              <div key={category.id}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-spa-nude">
                    Kategorie
                  </span>
                  <div className="flex-1 h-px bg-spa-nude/20" />
                </div>
                <h3 className="text-lg font-serif text-spa-stone mb-4">{category.label}</h3>
                <div className="divide-y divide-spa-nude/10">
                  {category.services.map((service, idx) => (
                    <ServiceRow key={idx} service={service} />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 pt-10 border-t border-spa-nude/20 text-center"
        >
          <p className="text-spa-stone/50 font-light text-sm mb-6">
            Alle Preise inkl. MwSt. · Online-Buchung über unsere Plattform
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-5 bg-spa-stone text-spa-white rounded-full font-medium tracking-wide hover:bg-spa-stone/90 transition-colors"
          >
            Termin buchen
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const ServiceRow: React.FC<{ service: Service }> = ({ service }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className="group flex items-center justify-between gap-4 py-4 hover:bg-spa-nude/5 -mx-4 px-4 rounded-xl transition-colors"
  >
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-spa-stone group-hover:text-spa-stone truncate">
        {service.name}
      </p>
      <div className="flex items-center gap-1.5 mt-1">
        <Clock size={11} className="text-spa-nude flex-shrink-0" />
        <span className="text-[11px] text-spa-stone/50">{service.duration}</span>
      </div>
    </div>
    <div className="flex items-center gap-4 flex-shrink-0">
      <span className="text-sm font-semibold text-spa-stone">{service.price}</span>
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${service.name} buchen`}
        className="w-8 h-8 rounded-full bg-spa-nude/20 hover:bg-spa-stone hover:text-spa-white text-spa-stone flex items-center justify-center transition-all duration-200 group/btn"
      >
        <Plus size={14} />
      </a>
    </div>
  </motion.div>
);
