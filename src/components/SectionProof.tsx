import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import React from 'react';
import { GridShimmer } from './Effects';

interface Testimonial {
  name: string;
  service: string;
  quote: string;
  date: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Anonym",
    service: "Aquafacial Classic",
    quote: "Tolles Aquafacial! Ich werde definitiv wieder kommen.",
    date: "März 2026",
    rating: 5.0,
  },
  {
    name: "Elisabeth",
    service: "Lashlifting inkl. Keratinöl + Färben",
    quote: "Super Arbeit und sehr sehr freundlich 😃",
    date: "März 2026",
    rating: 5.0,
  },
  {
    name: "Anonym",
    service: "Lashlifting inkl. Keratinöl + Färben",
    quote: "Wie immer top 👌🏻",
    date: "März 2026",
    rating: 5.0,
  },
  {
    name: "Elisabeth",
    service: "",
    quote: "Sehr angenehm und sehr entspannend! Irem arbeitet sehr gründlich und ist besonders einfühlsam.",
    date: "März 2026",
    rating: 5.0,
  },
];

const ratingCategories = [
  { label: 'Service', value: '4.9' },
  { label: 'Sauberkeit', value: '4.9' },
  { label: 'Pünktlichkeit', value: '4.9' },
];

export const SectionProof: React.FC = () => {
  return (
    <section className="relative py-32 bg-spa-stone/5 overflow-hidden">
      <GridShimmer />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-5xl font-serif text-spa-stone">Das sagen unsere Kundinnen</h2>
          <p className="text-spa-stone/50 font-light max-w-xl mx-auto">
            Über 154 verifizierte Bewertungen – überzeuge dich selbst.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <div className="flex items-center gap-3">
            <span className="text-5xl font-serif font-light text-spa-stone">4.9</span>
            <div className="flex flex-col gap-1">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="fill-spa-nude text-spa-nude" />
                ))}
              </div>
              <span className="text-xs text-spa-stone/50">154 Bewertungen</span>
            </div>
          </div>
          <div className="h-12 w-px bg-spa-nude/20 hidden sm:block" />
          <div className="flex gap-8 text-center">
            {ratingCategories.map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="text-lg font-medium text-spa-stone">{value}</span>
                <span className="text-[10px] uppercase tracking-widest text-spa-stone/40">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((t, idx) => (
            <TestimonialCard key={idx} {...t} delay={idx * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard: React.FC<Testimonial & { delay: number }> = ({ name, service, quote, date, delay }) => {
  const initials = name === 'Anonym' ? 'A' : name.charAt(0).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="p-8 bg-spa-white rounded-[2rem] shadow-sm border border-spa-nude/10 space-y-6 flex flex-col h-full"
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={14} className="fill-spa-nude text-spa-nude" />
          ))}
        </div>
        <div className="w-10 h-10 rounded-full bg-spa-nude/20 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-spa-stone">{initials}</span>
        </div>
      </div>

      <p className="flex-grow text-sm text-spa-stone leading-relaxed font-light">
        "{quote}"
      </p>

      <div className="pt-4 border-t border-spa-nude/10">
        <h4 className="text-xs font-bold text-spa-stone">{name}</h4>
        {service && (
          <p className="text-[10px] text-spa-nude font-medium mt-0.5">{service}</p>
        )}
        <p className="text-[10px] text-spa-stone/40 uppercase tracking-widest mt-1">{date}</p>
      </div>
    </motion.div>
  );
};
