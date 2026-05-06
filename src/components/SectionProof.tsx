import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import React from 'react';
import { GridShimmer } from './Effects';

const testimonials = [
  {
    name: "Elena Richardson",
    handle: "elena_r",
    quote: "The lash extensions look so natural yet glamorous. I've been coming here for months and wouldn't go anywhere else.",
    rating: 4.9,
    avatar: "https://picsum.photos/seed/elena/100/100"
  },
  {
    name: "Marcus Vane",
    handle: "marcus_v",
    quote: "Exceptional facial ritual. The products used were clearly high-end, and my therapist was incredibly knowledgeable.",
    rating: 5.0,
    avatar: "https://picsum.photos/seed/marcus/100/100"
  },
  {
    name: "Sofia Bell",
    handle: "sofia_b",
    quote: "The brow lift changed my entire face. Perfectly precise and the environment is just so serene. Highly recommended.",
    rating: 4.8,
    avatar: "https://picsum.photos/seed/sofia/100/100"
  },
  {
    name: "Layla Chen",
    handle: "layla_c",
    quote: "Professional makeup that stayed flawless all night for my event. They really listen to what you want.",
    rating: 4.9,
    avatar: "https://picsum.photos/seed/layla/100/100"
  }
];

export const SectionProof: React.FC = () => {
  return (
    <section className="relative py-32 bg-spa-stone/5 overflow-hidden">
      <GridShimmer />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-3xl md:text-5xl font-serif text-spa-stone">Trusted by beauty lovers</h2>
          <p className="text-spa-stone/50 font-light max-w-xl mx-auto">
            Join thousands of satisfied clients who have found their sanctuary in our studio.
          </p>
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

const TestimonialCard: React.FC<{ name: string; handle: string; quote: string; rating: number; avatar: string; delay: number }> = ({ name, handle, quote, rating, avatar, delay }) => (
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
          <Star key={i} size={14} className={i < Math.floor(rating) ? "fill-spa-nude text-spa-nude" : "text-spa-stone/20"} />
        ))}
        <span className="ml-1 text-[10px] font-bold text-spa-stone/40">{rating}</span>
      </div>
      <div className="w-10 h-10 rounded-full overflow-hidden bg-spa-nude/10">
        <img src={avatar} alt={name} className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
      </div>
    </div>
    
    <p className="flex-grow text-sm text-spa-stone leading-relaxed font-light">
      "{quote}"
    </p>
    
    <div className="pt-4 border-t border-spa-nude/10">
      <h4 className="text-xs font-bold text-spa-stone">{name}</h4>
      <p className="text-[10px] text-spa-stone/40 uppercase tracking-widest">{handle}</p>
    </div>
  </motion.div>
);
