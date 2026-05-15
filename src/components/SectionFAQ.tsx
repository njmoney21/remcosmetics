import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp } from 'lucide-react';
import React, { useState } from 'react';

const faqs = [
  {
    question: 'Bin ich bei der Behandlung ganz alleine?',
    answer: 'Ja, wir sind ganz ungestört und alleine, damit du dich in einer ruhigen Atmosphäre vollkommen entspannen kannst.',
  },
  {
    question: 'Gibt es Parkmöglichkeiten in der Nähe des Studios?',
    answer: 'Ja, mein Studio ist gut erreichbar, und es gibt ausreichend Parkmöglichkeiten in der Nähe.',
  },
  {
    question: 'Kann ich meine Behandlung verschieben?',
    answer: 'Ja, das ist bis zu 48 Stunden vor deinem Termin möglich. Bitte melde dich rechtzeitig, wenn du den Termin ändern möchtest.',
  },
  {
    question: 'Kann man bei dir einen Gutschein kaufen?',
    answer: 'Ja, du kannst bei mir ganz einfach einen Gutschein kaufen, perfekt zum Verschenken oder für dich selbst!',
  },
  {
    question: 'Was ist der Unterschied zwischen HeadSpa und HeadSpa Special?',
    answer: 'HeadSpa ist eine entspannende Kopfmassage mit Haarmaske, Haarkur und Dampftherapie. Beim HeadSpa Special bekommst du zusätzlich eine Kopf-, Nacken- und Schultermassage, ein Kopfhautpeeling, eine spezielle Gesichtsmaske und eine Massage mit warmen Ölen.',
  },
  {
    question: 'Was soll ich vor der Behandlung beachten?',
    answer: 'Bitte erscheine ungeschminkt und ohne starke Pflegeprodukte auf der Haut, damit die Behandlung optimal wirken kann.',
  },
];

export const SectionFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-16"
        >
          <span className="text-spa-nude text-xs font-bold uppercase tracking-widest">FAQ</span>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-spa-stone">
            Häufige Fragen
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="border border-spa-nude/20 rounded-2xl overflow-hidden bg-spa-white"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 group"
              >
                <span className="font-semibold text-spa-stone text-sm md:text-base leading-snug">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 0 : 180 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="shrink-0 text-spa-nude"
                >
                  <ChevronUp size={18} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <p className="px-6 pb-5 text-sm text-spa-stone/60 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
