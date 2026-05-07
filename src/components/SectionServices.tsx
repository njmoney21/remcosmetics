import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Clock, Plus } from 'lucide-react';
import React, { useState, useMemo } from 'react';

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
    label: 'Gesichts- & Körperbehandlungen',
    services: [
      { name: 'Aquafacial Classic', duration: '1h.', price: '109 €' },
      { name: 'Aquafacial Special', duration: '1h. 20 min.', price: '129 €' },
      { name: 'Aquafacial Teenie bis 14', duration: '45 min.', price: '69 €' },
      { name: 'Aquafacial Anti-Aging', duration: '1h. 30 min.', price: '139 €' },
      { name: 'Aquafacial Rücken', duration: '1h. 15 min.', price: '139 €' },
      { name: 'Microneedling Classic', duration: '1h.', price: '109 €' },
      { name: 'Microneedling Special', duration: '1h. 15 min.', price: '139 €' },
      { name: 'Kombi Aquafacial & Microneedling', duration: '1h. 30 min.', price: '169 €' },
      { name: 'LED-Lichttherapie (Zusätzlich auch zu jeder Behandlung buchbar)', duration: '10 min.', price: '15 €' },
    ],
  },
  {
    id: 'wimpern',
    label: 'Wimpernbehandlungen',
    services: [
      { name: 'Lashlifting inkl. Keratinöl + Färben', duration: '1h.', price: '65 €' },
      { name: 'Wimpern färben', duration: '20 min.', price: '15 €' },
      { name: 'Kombi Lash & Browlifting', duration: '1h. 15 min.', price: '105 €' },
    ],
  },
  {
    id: 'augenbrauen',
    label: 'Augenbrauenbehandlungen',
    services: [
      { name: 'Browlifting inkl. Keratinöl + Färben', duration: '1h.', price: '60 €' },
      { name: 'Augenbrauen färben', duration: '20 min.', price: '15 €' },
      { name: 'Augenbrauen nachzupfen', duration: '20 min.', price: '15 €' },
      { name: 'Augenbrauen modellieren', duration: '35 min.', price: '25 €' },
      { name: 'Wow Brows', duration: '45 min.', price: '30 €' },
    ],
  },
  {
    id: 'beratung',
    label: 'Kosmetische Beratung',
    services: [
      { name: 'Hautpflegeberatung + Analyse', duration: '30 min.', price: '10 €' },
      { name: 'Beratung Lash & Browlifting', duration: '30 min.', price: '10 €' },
      { name: 'Kopfhautpflege Beratung + Analyse', duration: '30 min.', price: '10 €' },
      { name: 'Beratung Make-Up', duration: '30 min.', price: '10 €' },
    ],
  },
  {
    id: 'pakete',
    label: 'Kosmetikpakete',
    services: [
      { name: 'Aquafacial & Lashlifting inkl. Keratinöl und Färben', duration: '2h.', price: '154 €' },
      { name: 'Aquafacial & Browlifting inkl. Keratinöl und Färben', duration: '1h. 45 min.', price: '149 €' },
      { name: 'Microneedling & Lashlifting inkl. Keratinöl und Färben', duration: '2h.', price: '154 €' },
      { name: 'Microneedling & Browlifting inkl. Keratinöl und Färben', duration: '1h. 45 min.', price: '149 €' },
    ],
  },
  {
    id: 'massagen',
    label: 'Massagen',
    services: [
      { name: 'Head-Spa Basic', duration: '45 min.', price: '99 €' },
      { name: 'Head-Spa Deluxe', duration: '1h. 30 min.', price: '135 €' },
      { name: 'Head-Spa Kids', duration: '30 min.', price: '60 €' },
    ],
  },
  {
    id: 'makeup',
    label: 'Make-Up',
    services: [
      { name: 'Tages Make-Up', duration: '1h.', price: '60 €' },
      { name: 'Abend Make-Up', duration: '1h. 30 min.', price: '100 €' },
      { name: 'Special Make-Up', duration: '1h. 30 min.', price: '140 €' },
      { name: 'Braut Make-Up', duration: '2h.', price: '190 €' },
      { name: 'Probe Make-Up', duration: '2h.', price: '90 €' },
    ],
  },
];

export const SectionServices: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('alle');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const filteredCategories = useMemo(() => {
    const base = activeTab === 'alle' ? categories : categories.filter((c) => c.id === activeTab);
    if (!searchQuery.trim()) return base;
    const q = searchQuery.toLowerCase();
    return base
      .map((cat) => ({
        ...cat,
        services: cat.services.filter((s) => s.name.toLowerCase().includes(q)),
      }))
      .filter((cat) => cat.services.length > 0);
  }, [activeTab, searchQuery]);

  const totalResults = filteredCategories.reduce((acc, c) => acc + c.services.length, 0);

  return (
    <section id="rituale" className="relative py-32 px-6 bg-spa-white overflow-hidden">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="text-spa-nude text-xs font-bold uppercase tracking-widest">Behandlungen & Preise</span>
          <h2 className="mt-3 text-4xl md:text-6xl font-serif font-light text-spa-stone leading-tight">
            Das biete ich an
          </h2>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mb-8"
        >
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-spa-stone/30 pointer-events-none" />
          <input
            type="text"
            placeholder="Service suchen"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3.5 rounded-2xl border border-spa-nude/30 bg-spa-white text-sm text-spa-stone placeholder-spa-stone/30 focus:outline-none focus:border-spa-nude transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-spa-stone/40 hover:text-spa-stone transition-colors"
              aria-label="Suche leeren"
            >
              <X size={16} />
            </button>
          )}
        </motion.div>

        {/* Category filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          <FilterTab
            label="Alle"
            count={categories.reduce((a, c) => a + c.services.length, 0)}
            active={activeTab === 'alle'}
            onClick={() => setActiveTab('alle')}
          />
          {categories.map((cat) => (
            <FilterTab
              key={cat.id}
              label={cat.label}
              count={cat.services.length}
              active={activeTab === cat.id}
              onClick={() => setActiveTab(cat.id)}
            />
          ))}
        </motion.div>

        {/* Service list */}
        <AnimatePresence mode="wait">
          {filteredCategories.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-spa-stone/40 py-16 text-sm"
            >
              Kein Service gefunden für „{searchQuery}"
            </motion.p>
          ) : (
            <motion.div
              key={activeTab + searchQuery}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-10"
            >
              {filteredCategories.map((category) => (
                <div key={category.id}>
                  {/* Category header */}
                  <div className="mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-spa-nude">
                      Kategorie
                    </span>
                    <div className="flex items-center gap-3 mt-1">
                      <h3 className="text-xl font-serif text-spa-stone">
                        {category.label}
                        <span className="ml-2 text-base font-light text-spa-stone/40">
                          ({category.services.length})
                        </span>
                      </h3>
                    </div>
                    <div className="mt-3 h-px bg-spa-nude/20" />
                  </div>

                  {/* Service rows */}
                  <div>
                    {category.services.map((service, idx) => (
                      <ServiceRow
                        key={idx}
                        service={service}
                        onDetails={() => setSelectedService(service)}
                      />
                    ))}
                  </div>
                </div>
              ))}

              {searchQuery && (
                <p className="text-[11px] text-spa-stone/30 uppercase tracking-widest text-center pt-4">
                  {totalResults} Ergebnis{totalResults !== 1 ? 'se' : ''} für „{searchQuery}"
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Details modal */}
      <AnimatePresence>
        {selectedService && (
          <DetailsModal service={selectedService} onClose={() => setSelectedService(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

/* ─── Sub-components ─────────────────────────────────────── */

const FilterTab: React.FC<{
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}> = ({ label, count, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-200 border ${
      active
        ? 'bg-spa-stone text-spa-white border-spa-stone'
        : 'bg-transparent text-spa-stone/50 border-spa-nude/30 hover:border-spa-nude hover:text-spa-stone'
    }`}
  >
    {label}
    <span className={`ml-1.5 ${active ? 'opacity-60' : 'opacity-40'}`}>({count})</span>
  </button>
);

const ServiceRow: React.FC<{ service: Service; onDetails: () => void }> = ({ service, onDetails }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
    className="flex items-center justify-between gap-4 py-4 border-b border-spa-nude/10 group hover:bg-spa-nude/5 -mx-3 px-3 rounded-xl transition-colors"
  >
    {/* Left: name + meta */}
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-spa-stone leading-snug">
        {service.name}
      </p>
      <div className="flex items-center gap-3 mt-1.5">
        <span className="flex items-center gap-1 text-[11px] text-spa-stone/50">
          <Clock size={10} className="text-spa-nude" />
          {service.duration}
        </span>
        <button
          onClick={onDetails}
          className="text-[11px] font-semibold text-spa-nude hover:text-spa-stone underline underline-offset-2 transition-colors"
        >
          Details
        </button>
      </div>
    </div>

    {/* Right: price + book button */}
    <div className="flex items-center gap-3 flex-shrink-0">
      <span className="text-sm font-semibold text-spa-stone">{service.price}</span>
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${service.name} buchen`}
        className="w-8 h-8 rounded-full border border-spa-nude/40 text-spa-stone flex items-center justify-center hover:bg-spa-stone hover:text-spa-white hover:border-spa-stone transition-all duration-200"
      >
        <Plus size={14} />
      </a>
    </div>
  </motion.div>
);

const DetailsModal: React.FC<{ service: Service; onClose: () => void }> = ({ service, onClose }) => (
  <>
    {/* Backdrop */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-spa-stone/40 backdrop-blur-sm z-40"
    />

    {/* Modal */}
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="fixed inset-x-4 bottom-8 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md z-50 bg-spa-white rounded-3xl shadow-2xl p-8"
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-8 h-8 rounded-full bg-spa-nude/10 flex items-center justify-center text-spa-stone hover:bg-spa-nude/20 transition-colors"
        aria-label="Schließen"
      >
        <X size={16} />
      </button>

      <span className="text-[10px] font-bold uppercase tracking-widest text-spa-nude">Behandlung</span>
      <h3 className="mt-2 text-2xl font-serif font-light text-spa-stone leading-snug">
        {service.name}
      </h3>

      <div className="mt-6 flex items-center gap-6">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] uppercase tracking-widest text-spa-stone/40">Dauer</span>
          <span className="text-sm font-medium text-spa-stone flex items-center gap-1.5">
            <Clock size={13} className="text-spa-nude" />
            {service.duration}
          </span>
        </div>
        <div className="w-px h-8 bg-spa-nude/20" />
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] uppercase tracking-widest text-spa-stone/40">Preis</span>
          <span className="text-lg font-semibold text-spa-stone">{service.price}</span>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-4 bg-spa-stone text-spa-white rounded-full text-xs font-bold uppercase tracking-widest text-center hover:bg-spa-stone/90 transition-colors"
        >
          Jetzt buchen
        </a>
        <button
          onClick={onClose}
          className="px-6 py-4 border border-spa-nude/40 text-spa-stone rounded-full text-xs font-bold uppercase tracking-widest hover:bg-spa-nude/10 transition-colors"
        >
          Schließen
        </button>
      </div>
    </motion.div>
  </>
);
