import { motion, AnimatePresence } from 'motion/react';
import { Clock, Plus, X, ChevronDown } from 'lucide-react';
import React, { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import { categories } from '../data/services';
import type { Service } from '../data/services';
import { useBooking } from '../context/BookingContext';

export const SectionServices: React.FC = () => {
  const { open } = useBooking();
  const [activeTab, setActiveTab] = useState<string>('alle');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());

  const filteredCategories = useMemo(() => {
    const base = activeTab === 'alle' ? categories : categories.filter((c) => c.id === activeTab);
    if (!searchQuery.trim()) return base;
    const q = searchQuery.toLowerCase();
    return base
      .map((cat) => ({ ...cat, services: cat.services.filter((s) => s.name.toLowerCase().includes(q)) }))
      .filter((cat) => cat.services.length > 0);
  }, [activeTab, searchQuery]);

  const totalResults = filteredCategories.reduce((acc, c) => acc + c.services.length, 0);

  // Auto-expand when a specific tab is selected
  useEffect(() => {
    if (activeTab !== 'alle') {
      setOpenCategories(new Set([activeTab]));
    }
  }, [activeTab]);

  // Auto-expand all matching categories when searching
  useEffect(() => {
    if (searchQuery.trim()) {
      setOpenCategories(new Set(filteredCategories.map((c) => c.id)));
    }
  }, [searchQuery, filteredCategories]);

  const toggleCategory = (id: string) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <section id="rituale" className="relative py-32 px-6 bg-spa-white overflow-hidden">
      <div className="max-w-4xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="space-y-3">
            <span className="text-spa-nude text-xs font-bold uppercase tracking-widest">Behandlungen & Preise</span>
            <h2 className="text-4xl md:text-6xl font-serif font-light text-spa-stone leading-tight">
              Das biete ich an
            </h2>
          </div>
          <button
            onClick={() => open()}
            className="inline-flex items-center gap-2 px-8 py-4 bg-spa-stone text-spa-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-spa-stone/90 transition-colors whitespace-nowrap self-start md:self-auto"
          >
            Jetzt buchen
          </button>
        </motion.div>

        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="relative mb-8">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-spa-stone/30 pointer-events-none" />
          <input
            type="text"
            placeholder="Service suchen"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3.5 rounded-2xl border border-spa-nude/30 bg-spa-white text-sm text-spa-stone placeholder-spa-stone/30 focus:outline-none focus:border-spa-nude transition-colors"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-spa-stone/40 hover:text-spa-stone transition-colors" aria-label="Suche leeren">
              <X size={16} />
            </button>
          )}
        </motion.div>

        {/* Category tabs */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-wrap gap-2 mb-10">
          <FilterTab label="Alle" count={categories.reduce((a, c) => a + c.services.length, 0)} active={activeTab === 'alle'} onClick={() => setActiveTab('alle')} />
          {categories.map((cat) => (
            <FilterTab key={cat.id} label={cat.label} count={cat.services.length} active={activeTab === cat.id} onClick={() => setActiveTab(cat.id)} />
          ))}
        </motion.div>

        {/* List */}
        <AnimatePresence mode="wait">
          {filteredCategories.length === 0 ? (
            <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center text-spa-stone/40 py-16 text-sm">
              Kein Service gefunden für „{searchQuery}"
            </motion.p>
          ) : (
            <motion.div key={activeTab + searchQuery} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="space-y-3">
              {filteredCategories.map((category) => {
                const isOpen = openCategories.has(category.id);
                return (
                  <div key={category.id} className="border border-spa-nude/20 rounded-2xl overflow-hidden bg-spa-white">
                    {/* Accordion header */}
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left group hover:bg-spa-nude/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-spa-nude/70">Kategorie</span>
                        <h3 className="text-base font-serif text-spa-stone">
                          {category.label}
                          <span className="ml-2 text-sm font-light text-spa-stone/35">({category.services.length})</span>
                        </h3>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="text-spa-nude shrink-0"
                      >
                        <ChevronDown size={17} />
                      </motion.div>
                    </button>

                    {/* Collapsible services */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-2 border-t border-spa-nude/10">
                            {category.services.map((service, idx) => (
                              <ServiceRow key={idx} service={service} onDetails={() => setSelectedService(service)} onBook={() => open(service)} />
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              {searchQuery && (
                <p className="text-[11px] text-spa-stone/30 uppercase tracking-widest text-center pt-4">
                  {totalResults} Ergebnis{totalResults !== 1 ? 'se' : ''} für „{searchQuery}"
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="mt-16 pt-10 border-t border-spa-nude/20 text-center">
          <p className="text-spa-stone/50 font-light text-sm mb-6">Alle Preise inkl. MwSt.</p>
          <button onClick={() => open()} className="inline-flex items-center gap-2 px-10 py-5 bg-spa-stone text-spa-white rounded-full font-medium tracking-wide hover:bg-spa-stone/90 transition-colors">
            Termin buchen
          </button>
        </motion.div>
      </div>

      {/* Details modal */}
      <AnimatePresence>
        {selectedService && <DetailsModal service={selectedService} onClose={() => setSelectedService(null)} onBook={() => { setSelectedService(null); open(selectedService); }} />}
      </AnimatePresence>
    </section>
  );
};

const FilterTab: React.FC<{ label: string; count: number; active: boolean; onClick: () => void }> = ({ label, count, active, onClick }) => (
  <button onClick={onClick} className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-200 border ${active ? 'bg-spa-stone text-spa-white border-spa-stone' : 'bg-transparent text-spa-stone/50 border-spa-nude/30 hover:border-spa-nude hover:text-spa-stone'}`}>
    {label}<span className={`ml-1.5 ${active ? 'opacity-60' : 'opacity-40'}`}>({count})</span>
  </button>
);

const ServiceRow: React.FC<{ service: Service; onDetails: () => void; onBook: () => void }> = ({ service, onDetails, onBook }) => (
  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.3 }}
    className="flex items-center justify-between gap-4 py-4 border-b border-spa-nude/10 group hover:bg-spa-nude/5 -mx-3 px-3 rounded-xl transition-colors">
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-spa-stone leading-snug">{service.name}</p>
      <div className="flex items-center gap-3 mt-1.5">
        <span className="flex items-center gap-1 text-[11px] text-spa-stone/50"><Clock size={10} className="text-spa-nude" />{service.duration}</span>
        <button onClick={onDetails} className="text-[11px] font-semibold text-spa-nude hover:text-spa-stone underline underline-offset-2 transition-colors">Details</button>
      </div>
    </div>
    <div className="flex items-center gap-3 flex-shrink-0">
      <span className="text-sm font-semibold text-spa-stone">{service.price}</span>
      <button onClick={onBook} aria-label={`${service.name} buchen`}
        className="w-8 h-8 rounded-full border border-spa-nude/40 text-spa-stone flex items-center justify-center hover:bg-spa-stone hover:text-spa-white hover:border-spa-stone transition-all duration-200">
        <Plus size={14} />
      </button>
    </div>
  </motion.div>
);

const DetailsModal: React.FC<{ service: Service; onClose: () => void; onBook: () => void }> = ({ service, onClose, onBook }) => (
  <>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-spa-stone/40 backdrop-blur-sm z-40" />
    <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="fixed inset-x-4 bottom-8 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md z-50 bg-spa-white rounded-3xl shadow-2xl p-8">
      <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-spa-nude/10 flex items-center justify-center text-spa-stone hover:bg-spa-nude/20 transition-colors" aria-label="Schließen">
        <X size={16} />
      </button>
      <span className="text-[10px] font-bold uppercase tracking-widest text-spa-nude">Behandlung</span>
      <h3 className="mt-2 text-2xl font-serif font-light text-spa-stone leading-snug">{service.name}</h3>
      <div className="mt-6 flex items-center gap-6">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] uppercase tracking-widest text-spa-stone/40">Dauer</span>
          <span className="text-sm font-medium text-spa-stone flex items-center gap-1.5"><Clock size={13} className="text-spa-nude" />{service.duration}</span>
        </div>
        <div className="w-px h-8 bg-spa-nude/20" />
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] uppercase tracking-widest text-spa-stone/40">Preis</span>
          <span className="text-lg font-semibold text-spa-stone">{service.price}</span>
        </div>
      </div>
      <div className="mt-8 flex gap-3">
        <button onClick={onBook} className="flex-1 py-4 bg-spa-stone text-spa-white rounded-full text-xs font-bold uppercase tracking-widest text-center hover:bg-spa-stone/90 transition-colors">
          Jetzt buchen
        </button>
        <button onClick={onClose} className="px-6 py-4 border border-spa-nude/40 text-spa-stone rounded-full text-xs font-bold uppercase tracking-widest hover:bg-spa-nude/10 transition-colors">
          Schließen
        </button>
      </div>
    </motion.div>
  </>
);
