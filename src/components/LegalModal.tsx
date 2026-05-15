import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, Instagram, MapPin, Facebook } from 'lucide-react';
import React from 'react';

export type LegalModalType = 'datenschutz' | 'agb' | 'kontakt' | null;

interface Props {
  type: LegalModalType;
  onClose: () => void;
}

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
  </svg>
);

const KontaktContent = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-serif font-light text-spa-stone mb-1">Kontakt</h2>
      <p className="text-xs text-spa-stone/40 uppercase tracking-widest">Rem Cosmetics · Mainburg</p>
    </div>

    <div className="space-y-4">
      <a href="tel:+491786244158"
        className="flex items-center gap-4 p-4 rounded-2xl bg-spa-nude/5 hover:bg-spa-nude/10 transition-colors group">
        <div className="w-9 h-9 rounded-xl bg-spa-nude/15 flex items-center justify-center text-spa-stone shrink-0">
          <Phone size={16} />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-spa-stone/35 font-medium">Telefon</p>
          <p className="text-sm text-spa-stone group-hover:text-spa-nude transition-colors">+49 178 6244158</p>
        </div>
      </a>

      <a href="https://www.instagram.com/remcosmetics_" target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-4 p-4 rounded-2xl bg-spa-nude/5 hover:bg-spa-nude/10 transition-colors group">
        <div className="w-9 h-9 rounded-xl bg-spa-nude/15 flex items-center justify-center text-spa-stone shrink-0">
          <Instagram size={16} />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-spa-stone/35 font-medium">Instagram</p>
          <p className="text-sm text-spa-stone group-hover:text-spa-nude transition-colors">@remcosmetics_</p>
        </div>
      </a>

      <a href="https://www.tiktok.com/@iremtyl44" target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-4 p-4 rounded-2xl bg-spa-nude/5 hover:bg-spa-nude/10 transition-colors group">
        <div className="w-9 h-9 rounded-xl bg-spa-nude/15 flex items-center justify-center text-spa-stone shrink-0">
          <TikTokIcon />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-spa-stone/35 font-medium">TikTok</p>
          <p className="text-sm text-spa-stone group-hover:text-spa-nude transition-colors">@iremtyl44</p>
        </div>
      </a>

      <a href="https://www.facebook.com/people/Remcosmetics-Mainburg/61565857885932/" target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-4 p-4 rounded-2xl bg-spa-nude/5 hover:bg-spa-nude/10 transition-colors group">
        <div className="w-9 h-9 rounded-xl bg-spa-nude/15 flex items-center justify-center text-spa-stone shrink-0">
          <Facebook size={16} />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-spa-stone/35 font-medium">Facebook</p>
          <p className="text-sm text-spa-stone group-hover:text-spa-nude transition-colors">Remcosmetics Mainburg</p>
        </div>
      </a>

      <div className="flex items-center gap-4 p-4 rounded-2xl bg-spa-nude/5">
        <div className="w-9 h-9 rounded-xl bg-spa-nude/15 flex items-center justify-center text-spa-stone shrink-0">
          <MapPin size={16} />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-spa-stone/35 font-medium">Adresse</p>
          <p className="text-sm text-spa-stone leading-relaxed">Gabelsberger Str. 3<br />84048 Mainburg, Deutschland</p>
        </div>
      </div>
    </div>
  </div>
);

const DatenschutzContent = () => (
  <div className="space-y-6 text-sm text-spa-stone/70 leading-relaxed">
    <div>
      <h2 className="text-2xl font-serif font-light text-spa-stone mb-1">Datenschutzerklärung</h2>
      <p className="text-xs text-spa-stone/40 uppercase tracking-widest">Gem. Art. 13, 14 DSGVO · Stand: 2026</p>
    </div>

    <Section title="1. Verantwortlicher">
      <p>Verantwortliche im Sinne der Datenschutz-Grundverordnung (DSGVO) und des Bayerischen Datenschutzgesetzes (BayDSG) ist:</p>
      <address className="not-italic mt-2 p-4 bg-spa-nude/5 rounded-xl text-spa-stone/80">
        <strong className="text-spa-stone">Rem Cosmetics</strong><br />
        Gabelsberger Str. 3<br />
        84048 Mainburg, Deutschland<br />
        Telefon: +49 178 6244158<br />
        Instagram: @remcosmetics_
      </address>
    </Section>

    <Section title="2. Arten der verarbeiteten Daten">
      <p>Im Rahmen der Nutzung dieser Website werden folgende Daten verarbeitet:</p>
      <ul className="mt-2 space-y-1 list-disc list-inside">
        <li>Zugriffsdaten / Server-Logfiles (IP-Adresse, Datum, Uhrzeit, aufgerufene Seiten)</li>
        <li>Kommunikationsdaten bei Terminanfragen (Name, Telefonnummer, E-Mail, Terminwunsch)</li>
        <li>Standortdaten (nur bei Nutzung von Google Maps zur Anzeige der Studioposition)</li>
      </ul>
    </Section>

    <Section title="3. Zwecke und Rechtsgrundlagen der Verarbeitung">
      <p><strong className="text-spa-stone">Bereitstellung der Website</strong> (Art. 6 Abs. 1 lit. f DSGVO): Der Betrieb dieser Website und die Speicherung technisch notwendiger Logfiles erfolgt auf Basis unseres berechtigten Interesses an der sicheren und funktionsfähigen Darstellung des Webangebots.</p>
      <p className="mt-2"><strong className="text-spa-stone">Terminanfragen via WhatsApp</strong> (Art. 6 Abs. 1 lit. b DSGVO): Die Verarbeitung Ihrer Kontaktdaten zum Zweck der Terminvereinbarung erfolgt zur Durchführung vorvertraglicher Maßnahmen auf Ihren Wunsch hin.</p>
      <p className="mt-2"><strong className="text-spa-stone">Google Maps</strong> (Art. 6 Abs. 1 lit. f DSGVO): Einbindung von Google Maps zur Darstellung der Studiostandortes. Anbieter: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.</p>
    </Section>

    <Section title="4. Weitergabe an Dritte">
      <p>Eine Weitergabe Ihrer Daten an Dritte erfolgt nur, soweit dies für die Vertragserfüllung erforderlich ist oder Sie ausdrücklich eingewilligt haben. Dienstleister, die wir einsetzen:</p>
      <ul className="mt-2 space-y-1 list-disc list-inside">
        <li><strong className="text-spa-stone">Meta Platforms Ireland Limited</strong> (WhatsApp) — für Terminanfragen; Datenschutzrichtlinie: whatsapp.com/legal/privacy-policy</li>
        <li><strong className="text-spa-stone">Google Ireland Limited</strong> (Google Maps) — für die Standortanzeige; Datenschutzrichtlinie: policies.google.com/privacy</li>
      </ul>
    </Section>

    <Section title="5. Speicherdauer">
      <p>Ihre personenbezogenen Daten werden nur so lange gespeichert, wie es für die jeweiligen Zwecke erforderlich ist oder gesetzliche Aufbewahrungsfristen bestehen. Logfiles werden nach spätestens 7 Tagen gelöscht. Terminbezogene Daten werden nach Abwicklung des Termins gelöscht, sofern keine gesetzliche Aufbewahrungspflicht besteht.</p>
    </Section>

    <Section title="6. Ihre Rechte (Art. 15–22 DSGVO)">
      <p>Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:</p>
      <ul className="mt-2 space-y-1 list-disc list-inside">
        <li><strong className="text-spa-stone">Auskunftsrecht</strong> (Art. 15 DSGVO)</li>
        <li><strong className="text-spa-stone">Recht auf Berichtigung</strong> (Art. 16 DSGVO)</li>
        <li><strong className="text-spa-stone">Recht auf Löschung</strong> (Art. 17 DSGVO)</li>
        <li><strong className="text-spa-stone">Recht auf Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)</li>
        <li><strong className="text-spa-stone">Recht auf Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
        <li><strong className="text-spa-stone">Widerspruchsrecht</strong> (Art. 21 DSGVO)</li>
      </ul>
      <p className="mt-2">Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: <a href="tel:+491786244158" className="text-spa-nude hover:underline">+49 178 6244158</a></p>
    </Section>

    <Section title="7. Beschwerderecht bei der Aufsichtsbehörde">
      <p>Sie haben das Recht, sich bei der zuständigen Datenschutz-Aufsichtsbehörde zu beschweren. Die für Bayern zuständige Aufsichtsbehörde ist:</p>
      <address className="not-italic mt-2 p-4 bg-spa-nude/5 rounded-xl text-spa-stone/80">
        <strong className="text-spa-stone">Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)</strong><br />
        Promenade 18<br />
        91522 Ansbach<br />
        Tel.: +49 981 53-1300<br />
        poststelle@lda.bayern.de
      </address>
    </Section>

    <Section title="8. Datensicherheit">
      <p>Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt.</p>
    </Section>

    <Section title="9. Aktualität dieser Datenschutzerklärung">
      <p>Diese Datenschutzerklärung hat den Stand Mai 2026 und wird bei Bedarf aktualisiert, insbesondere bei Änderungen der gesetzlichen Anforderungen oder der eingesetzten Dienste.</p>
    </Section>
  </div>
);

const AGBContent = () => (
  <div className="space-y-6 text-sm text-spa-stone/70 leading-relaxed">
    <div>
      <h2 className="text-2xl font-serif font-light text-spa-stone mb-1">Allgemeine Geschäftsbedingungen</h2>
      <p className="text-xs text-spa-stone/40 uppercase tracking-widest">Rem Cosmetics · Stand: 2026</p>
    </div>

    <Section title="§ 1 Geltungsbereich">
      <p>Diese AGB gelten für alle Dienstleistungen von Rem Cosmetics, Gabelsberger Str. 3, 84048 Mainburg (nachfolgend „Studio").</p>
    </Section>

    <Section title="§ 2 Terminvereinbarung">
      <p>Termine werden telefonisch, per WhatsApp oder über das Online-Buchungsformular vereinbart. Mit der Buchung erklärt sich die Kundin mit diesen AGB einverstanden.</p>
    </Section>

    <Section title="§ 3 Stornierung und Absage">
      <p>Stornierungen sind bis zu 48 Stunden vor dem vereinbarten Termin kostenfrei möglich. Bei späteren Absagen oder Nichterscheinen wird eine Ausfallgebühr von 50 % des Behandlungspreises berechnet.</p>
    </Section>

    <Section title="§ 4 Preise und Zahlung">
      <p>Alle Preise sind Endpreise inkl. gesetzlicher MwSt. Die Zahlung erfolgt direkt im Studio nach Abschluss der Behandlung (Bar oder EC-Karte).</p>
    </Section>

    <Section title="§ 5 Gesundheit und Kontraindikationen">
      <p>Die Kundin ist verpflichtet, das Studio vor der Behandlung über bekannte Allergien, Hauterkrankungen oder sonstige gesundheitliche Einschränkungen zu informieren. Das Studio haftet nicht für Schäden, die auf verschwiegene Kontraindikationen zurückzuführen sind.</p>
    </Section>

    <Section title="§ 6 Haftung">
      <p>Das Studio haftet nicht für Schäden, die durch falsche oder unvollständige Angaben der Kundin entstehen. Die Haftung ist auf grobe Fahrlässigkeit und Vorsatz beschränkt.</p>
    </Section>

    <Section title="§ 7 Anwendbares Recht">
      <p>Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist Mainburg.</p>
    </Section>
  </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div>
    <h3 className="text-xs font-bold uppercase tracking-widest text-spa-stone mb-2">{title}</h3>
    {children}
  </div>
);

const titles: Record<NonNullable<LegalModalType>, string> = {
  datenschutz: 'Datenschutz',
  agb: 'AGB',
  kontakt: 'Kontakt',
};

export const LegalModal: React.FC<Props> = ({ type, onClose }) => {
  return (
    <AnimatePresence>
      {type && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-spa-stone/40 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal panel */}
          <motion.div
            className="fixed inset-x-4 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 w-auto md:w-full md:max-w-xl bg-spa-white rounded-t-3xl md:rounded-3xl shadow-2xl max-h-[85vh] flex flex-col"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-spa-nude/15 shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-widest text-spa-stone/40">{titles[type]}</span>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-spa-nude/10 flex items-center justify-center text-spa-stone hover:bg-spa-nude/20 transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 px-6 py-6">
              {type === 'kontakt' && <KontaktContent />}
              {type === 'datenschutz' && <DatenschutzContent />}
              {type === 'agb' && <AGBContent />}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
