import { motion } from 'motion/react';
import { Globe, Instagram, Facebook, Mail, Phone } from 'lucide-react';
import React from 'react';

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
  </svg>
);

const contacts = [
  {
    icon: <Globe size={18} />,
    label: 'Website',
    href: '/',
    display: 'remcosmetics.de',
  },
  {
    icon: <Instagram size={18} />,
    label: 'Instagram',
    href: 'https://www.instagram.com/remcosmetics_',
    display: '@remcosmetics_',
  },
  {
    icon: <TikTokIcon />,
    label: 'TikTok',
    href: 'https://www.tiktok.com/@iremtyl44',
    display: '@iremtyl44',
  },
  {
    icon: <Facebook size={18} />,
    label: 'Facebook',
    href: 'https://www.facebook.com/people/Remcosmetics-Mainburg/61565857885932/',
    display: 'Remcosmetics Mainburg',
  },
  {
    icon: <Mail size={18} />,
    label: 'E-Mail',
    href: 'mailto:info@remcosmetics.de',
    display: 'info@remcosmetics.de',
  },
  {
    icon: <Phone size={18} />,
    label: 'Telefon',
    href: 'tel:+491786244158',
    display: '+49 178 6244158',
  },
];

export const SectionKontakt: React.FC = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-spa-white rounded-3xl border border-spa-nude/20 p-10 shadow-sm"
        >
          <h2 className="text-2xl font-serif font-semibold text-spa-stone mb-8">Kontakt</h2>

          <div className="space-y-4">
            {contacts.map(({ icon, label, href, display }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 group"
              >
                <div className="w-9 h-9 rounded-xl bg-spa-nude/10 flex items-center justify-center text-spa-stone group-hover:bg-spa-nude/20 transition-colors shrink-0">
                  {icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-spa-stone/40 font-medium">{label}</span>
                  <span className="text-sm text-spa-stone group-hover:text-spa-nude transition-colors">{display}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
