export interface Service {
  name: string;
  duration: string;
  price: string;
}

export interface Category {
  id: string;
  label: string;
  services: Service[];
}

export const categories: Category[] = [
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
      { name: 'LED-Lichttherapie (auch zu jeder Behandlung buchbar)', duration: '10 min.', price: '15 €' },
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
