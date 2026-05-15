export interface Service {
  name: string;
  duration: string;
  price: string;
  description: string;
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
      {
        name: 'Aquafacial Classic',
        duration: '1h.',
        price: '109 €',
        description: 'Tiefenreinigung mit moderner Wasserstrahl-Technologie. Entfernt abgestorbene Hautzellen, reinigt verstopfte Poren und versorgt die Haut gleichzeitig mit wertvollen Wirkstoffen. Das Ergebnis: sofort strahlende, saubere und frische Haut.',
      },
      {
        name: 'Aquafacial Special',
        duration: '1h. 20 min.',
        price: '129 €',
        description: 'Das Classic-Programm erweitert um einen intensiven Hyaluron-Booster und gezielte Aufbaupflege. Spendet der Haut langanhaltende Feuchtigkeit, glättet feine Linien und verleiht ein ebenmäßiges, strahlendes Hautbild.',
      },
      {
        name: 'Aquafacial Teenie bis 14',
        duration: '45 min.',
        price: '69 €',
        description: 'Sanfte Tiefenreinigung speziell entwickelt für junge Haut bis 14 Jahre. Reinigt die Poren behutsam, reduziert Unreinheiten und Mitesser und vermittelt gleichzeitig ein gesundes Hautbewusstsein.',
      },
      {
        name: 'Aquafacial Anti-Aging',
        duration: '1h. 30 min.',
        price: '139 €',
        description: 'Intensiv-Kur gegen Falten und Hautalterung. Kombiniert die reinigende Kraft des Aquafacials mit hochwirksamen Anti-Aging-Seren und speziellen Massagetechniken für sichtbar straffere, jüngere Haut.',
      },
      {
        name: 'Aquafacial Rücken',
        duration: '1h. 15 min.',
        price: '139 €',
        description: 'Das bewährte Aquafacial-Verfahren gezielt für den Rücken. Ideal bei Unreinheiten, verstopften Poren und unebener Rückenhaut. Reinigt tief, pflegt intensiv und hinterlässt eine sichtbar glattere Haut.',
      },
      {
        name: 'Microneedling Classic',
        duration: '1h.',
        price: '109 €',
        description: 'Feine Mikro-Kanäle aktivieren die körpereigene Kollagenproduktion auf natürliche Weise. Verfeinert das Hautbild, reduziert sichtbare Poren, mildert Narben und verbessert die Hautelastizität nachhaltig.',
      },
      {
        name: 'Microneedling Special',
        duration: '1h. 15 min.',
        price: '139 €',
        description: 'Erweitertes Microneedling mit hochkonzentriertem Wirkstoff-Serum direkt in die Haut eingearbeitet. Liefert intensivere Ergebnisse bei Pigmentflecken, Aknenarben, feinen Linien und unebener Textur.',
      },
      {
        name: 'Kombi Aquafacial & Microneedling',
        duration: '1h. 30 min.',
        price: '169 €',
        description: 'Die Synergie beider Spitzenbehandlungen in einer Session. Zuerst tiefe Reinigung und Hydration durch Aquafacial, dann gezielter Kollagen-Boost durch Microneedling – für maximale Hauterneuerung und ein strahlendes Ergebnis.',
      },
      {
        name: 'LED-Lichttherapie (auch zu jeder Behandlung buchbar)',
        duration: '10 min.',
        price: '15 €',
        description: 'Gezielte Lichtimpulse beruhigen gereizte Haut, fördern die Regeneration und straffen das Gewebe. Perfekt als ergänzende Behandlung buchbar – wirkt entzündungshemmend und beschleunigt die Heilung nach intensiven Behandlungen.',
      },
    ],
  },
  {
    id: 'wimpern',
    label: 'Wimpernbehandlungen',
    services: [
      {
        name: 'Lashlifting inkl. Keratinöl + Färben',
        duration: '1h.',
        price: '65 €',
        description: 'Hebt und schwenkt deine natürlichen Wimpern dauerhaft nach oben – für einen ausdrucksstarken, offenen Blick ganz ohne Mascara. Keratinöl pflegt und stärkt die Wimpernstruktur, das Färben intensiviert den natürlichen Effekt. Hält 6–8 Wochen.',
      },
      {
        name: 'Wimpern färben',
        duration: '20 min.',
        price: '15 €',
        description: 'Verleiht deinen Wimpern eine satte, tiefe Farbe und intensiviert deinen Blick ganz ohne Mascara. Schnell, unkompliziert und sofort sichtbar – ideal zur Auffrischung zwischen den Lifting-Terminen.',
      },
      {
        name: 'Kombi Lash & Browlifting',
        duration: '1h. 15 min.',
        price: '105 €',
        description: 'Das perfekte Duo für einen frischen, wachen Blick. Lashlifting für natürlich geschwungene Wimpern und Browlifting für definierte, gepflegte Augenbrauen – beides in einer Behandlung. Hält 6–8 Wochen.',
      },
    ],
  },
  {
    id: 'augenbrauen',
    label: 'Augenbrauenbehandlungen',
    services: [
      {
        name: 'Browlifting inkl. Keratinöl + Färben',
        duration: '1h.',
        price: '60 €',
        description: 'Fixiert die Augenbrauenhaare in einer aufgerichteten, volleren Form für einen definierten Look. Keratinöl pflegt und stärkt jeden einzelnen Haar, das Färben verleiht die gewünschte Intensität. Hält 6–8 Wochen.',
      },
      {
        name: 'Augenbrauen färben',
        duration: '20 min.',
        price: '15 €',
        description: 'Verleiht deinen Augenbrauen eine kräftige, natürliche Farbe passend zu deinem Haar- und Hautton. Für einen definierten Rahmen um deine Augen – ganz ohne tägliches Nachzeichnen.',
      },
      {
        name: 'Augenbrauen nachzupfen',
        duration: '20 min.',
        price: '15 €',
        description: 'Präzises Nachzupfen zur Pflege und Erhaltung deiner bestehenden Brauenform. Entfernt unerwünschte Haare und hält deine Augenbrauen immer ordentlich und gepflegt.',
      },
      {
        name: 'Augenbrauen modellieren',
        duration: '35 min.',
        price: '25 €',
        description: 'Professionelles Neugestalten der Augenbrauen nach deiner individuellen Gesichtsform. Symmetrisches Zupfen, Waxen oder Fädeln für eine harmonische, zu dir passende Brauenform.',
      },
      {
        name: 'Wow Brows',
        duration: '45 min.',
        price: '30 €',
        description: 'Das vollständige Brow-Styling-Paket: Modellieren, Färben und Pflegen in einem. Für perfekt definierte Augenbrauen, die deinen gesamten Blick enchantern. Das Rundum-Sorglos-Paket für traumhafte Brauen.',
      },
    ],
  },
  {
    id: 'beratung',
    label: 'Kosmetische Beratung',
    services: [
      {
        name: 'Hautpflegeberatung + Analyse',
        duration: '30 min.',
        price: '10 €',
        description: 'Individuelle Analyse deines Hauttyps und Hautzustands mit persönlicher Pflegeempfehlung. Du erhältst maßgeschneiderte Tipps für deine tägliche Pflegeroutine und lernst, welche Produkte und Inhaltsstoffe wirklich zu deiner Haut passen.',
      },
      {
        name: 'Beratung Lash & Browlifting',
        duration: '30 min.',
        price: '10 €',
        description: 'Persönliche Erstberatung zu Lash- und Browlifting. Wir klären gemeinsam welche Methode zu deinem Typ passt, was du vor und nach der Behandlung beachten musst und welches Ergebnis du realistisch erwarten kannst.',
      },
      {
        name: 'Kopfhautpflege Beratung + Analyse',
        duration: '30 min.',
        price: '10 €',
        description: 'Gründliche Analyse der Kopfhaut und Haarstruktur mit individuellen Empfehlungen. Ideal bei Problemen wie Schuppen, trockener Kopfhaut, Haarausfall oder strapaziertem Haar.',
      },
      {
        name: 'Beratung Make-Up',
        duration: '30 min.',
        price: '10 €',
        description: 'Persönliche Make-Up-Beratung mit Farb- und Stilempfehlungen passend zu deiner Haut, deinen Augen und deinem Gesichtstyp. Lerne die richtigen Techniken und Produkte für deinen individuellen Look kennen.',
      },
    ],
  },
  {
    id: 'pakete',
    label: 'Kosmetikpakete',
    services: [
      {
        name: 'Aquafacial & Lashlifting inkl. Keratinöl und Färben',
        duration: '2h.',
        price: '154 €',
        description: 'Das ultimative Verwöhnpaket: Strahlend reine, tief gepflegte Haut durch Aquafacial und natürlich geschwungene, intensive Wimpern durch Lashlifting. Zwei Highlights in einer entspannten Session zu einem attraktiven Kombipreis.',
      },
      {
        name: 'Aquafacial & Browlifting inkl. Keratinöl und Färben',
        duration: '1h. 45 min.',
        price: '149 €',
        description: 'Tiefe Gesichtsreinigung und Hydration durch Aquafacial kombiniert mit definierten, gepflegten Augenbrauen durch Browlifting. Ein vollständiges Beauty-Erlebnis für Haut und Brauen in einer Sitzung.',
      },
      {
        name: 'Microneedling & Lashlifting inkl. Keratinöl und Färben',
        duration: '2h.',
        price: '154 €',
        description: 'Intensiver Kollagen-Boost für eine verfeinerte Haut durch Microneedling plus perfekt geschwungene Wimpern durch Lashlifting. Für ein rundum frisches, ausgeruhtes Erscheinungsbild.',
      },
      {
        name: 'Microneedling & Browlifting inkl. Keratinöl und Färben',
        duration: '1h. 45 min.',
        price: '149 €',
        description: 'Effektive Hauterneuerung und Kollagenaufbau durch Microneedling, ergänzt durch gepflegte, definierte Augenbrauen durch Browlifting. Ein kraftvolles Anti-Aging-Kombipaket für Haut und Augenpartie.',
      },
    ],
  },
  {
    id: 'massagen',
    label: 'Massagen',
    services: [
      {
        name: 'Head-Spa Basic',
        duration: '45 min.',
        price: '99 €',
        description: 'Eine tiefenentspannende Kopfmassage mit intensiv pflegender Haarmaske und Haarkur. Revitalisiert die Kopfhaut, fördert die Durchblutung und schenkt spürbare Entspannung von Kopf bis Nacken.',
      },
      {
        name: 'Head-Spa Deluxe',
        duration: '1h. 30 min.',
        price: '135 €',
        description: 'Das vollständige Head-Spa-Erlebnis: Kopfmassage, Haarmaske, Haarkur und Dampftherapie. Zusätzlich eine Kopf-, Nacken- und Schultermassage, ein Kopfhautpeeling, eine spezielle Gesichtsmaske und eine abschließende Massage mit warmen Ölen. Pures Wohlbefinden.',
      },
      {
        name: 'Head-Spa Kids',
        duration: '30 min.',
        price: '60 €',
        description: 'Eine sanfte, kindgerechte Kopfmassage mit pflegender Behandlung speziell für jüngere Gäste. Entspannend, fürsorglich und spielerisch – für kleine Köpfe, die auch mal verwöhnt werden möchten.',
      },
    ],
  },
  {
    id: 'makeup',
    label: 'Make-Up',
    services: [
      {
        name: 'Tages Make-Up',
        duration: '1h.',
        price: '60 €',
        description: 'Natürliches, frisches Make-Up für den Alltag, Arbeit oder ein entspanntes Treffen. Abgestimmt auf deinen Hautton und persönlichen Stil für einen gepflegten, strahlenden Look, der den ganzen Tag hält.',
      },
      {
        name: 'Abend Make-Up',
        duration: '1h. 30 min.',
        price: '100 €',
        description: 'Ausdrucksstarkes Make-Up für besondere Abendanlässe, Feiern oder Restaurantbesuche. Intensivere Farben und professionelle Techniken für einen eleganten, langanhaltenden Glamour-Look.',
      },
      {
        name: 'Special Make-Up',
        duration: '1h. 30 min.',
        price: '140 €',
        description: 'Aufwendiges, maßgeschneidertes Make-Up für besondere Ereignisse wie Fotoshootings, Galas, Bühnenauftritte oder thematische Anlässe. Mit hochwertigen Produkten für maximale Wirkung und Haltbarkeit.',
      },
      {
        name: 'Braut Make-Up',
        duration: '2h.',
        price: '190 €',
        description: 'Das perfekte Make-Up für den schönsten Tag deines Lebens. Sorgfältig abgestimmt auf dein Brautkleid, den Stil der Feier und deinen persönlichen Wunschlook. Langanhaltend, fotogen und unvergesslich.',
      },
      {
        name: 'Probe Make-Up',
        duration: '2h.',
        price: '90 €',
        description: 'Testsitzung für deinen Braut- oder Event-Look vor dem großen Tag. Wir entwickeln gemeinsam deinen Wunsch-Look, testen Farben und Techniken – damit du am wichtigen Tag genau weißt, was dich erwartet.',
      },
    ],
  },
];
