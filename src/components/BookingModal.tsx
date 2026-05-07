import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Check, Clock, ArrowRight, Search } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { categories } from '../data/services';
import type { Service } from '../data/services';

/* ─── Locale helpers ─────────────────────────────────────── */
const DAYS_SHORT = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const DAYS_LONG = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
const MONTHS_DE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

const fmtLong = (d: Date) =>
  `${DAYS_LONG[d.getDay()]}, ${d.getDate()}. ${MONTHS_DE[d.getMonth()]} ${d.getFullYear()}`;

const isSameDay = (a: Date | null, b: Date) =>
  !!a && a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();

/* ─── Calendar helpers ───────────────────────────────────── */
function getNextAvailable(): Date {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(0, 0, 0, 0);
  while (d.getDay() === 0) d.setDate(d.getDate() + 1);
  return d;
}

function isAvailable(d: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d > today && d.getDay() !== 0;
}

function calendarDays(year: number, month: number) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const offset = (first.getDay() + 6) % 7;
  const days: { date: Date; inMonth: boolean }[] = [];
  for (let i = offset - 1; i >= 0; i--) days.push({ date: new Date(year, month, -i), inMonth: false });
  for (let d = 1; d <= last.getDate(); d++) days.push({ date: new Date(year, month, d), inMonth: true });
  const rem = (7 - (days.length % 7)) % 7;
  for (let d = 1; d <= rem; d++) days.push({ date: new Date(year, month + 1, d), inMonth: false });
  return days;
}

/* ─── Time slot helpers ──────────────────────────────────── */
const SLOTS_WD = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
const SLOTS_SA = ['09:00', '10:00', '11:00', '12:00', '13:00'];

function timeSlots(date: Date) {
  const slots = date.getDay() === 6 ? SLOTS_SA : SLOTS_WD;
  const seed = date.getDate() * 7 + date.getMonth() * 31;
  return slots.map((time, i) => ({ time, booked: (seed + i * 3) % 5 === 0 }));
}

/* ─── Step 1 – Service picker ────────────────────────────── */
const Step1: React.FC<{ selected: Service | null; onSelect: (s: Service) => void }> = ({ selected, onSelect }) => {
  const [tab, setTab] = useState('alle');
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const base = tab === 'alle' ? categories : categories.filter(c => c.id === tab);
    if (!q.trim()) return base;
    const lq = q.toLowerCase();
    return base.map(c => ({ ...c, services: c.services.filter(s => s.name.toLowerCase().includes(lq)) })).filter(c => c.services.length > 0);
  }, [tab, q]);

  return (
    <div className="p-5 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-spa-stone/30 pointer-events-none" />
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Service suchen"
          className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-spa-nude/30 text-sm text-spa-stone placeholder-spa-stone/30 focus:outline-none focus:border-spa-nude transition-colors"
        />
        {q && <button onClick={() => setQ('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-spa-stone/30 hover:text-spa-stone"><X size={13} /></button>}
      </div>

      {/* Category tabs */}
      <div className="flex gap-1.5 flex-wrap">
        {[{ id: 'alle', label: 'Alle' }, ...categories].map(c => (
          <button key={c.id} onClick={() => setTab(c.id)}
            className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${tab === c.id ? 'bg-spa-stone text-white' : 'bg-spa-nude/10 text-spa-stone/60 hover:text-spa-stone'}`}>
            {c.label}
          </button>
        ))}
      </div>

      {/* Services */}
      <div className="space-y-5">
        {filtered.length === 0 && <p className="text-sm text-spa-stone/30 text-center py-6">Kein Ergebnis für „{q}"</p>}
        {filtered.map(cat => (
          <div key={cat.id}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-spa-nude mb-2">{cat.label}</p>
            {cat.services.map((s, i) => {
              const active = selected?.name === s.name;
              return (
                <button key={i} onClick={() => onSelect(s)}
                  className={`w-full flex items-center justify-between gap-3 py-3 px-3 rounded-xl mb-1 text-left border transition-all ${active ? 'border-spa-stone bg-spa-stone/5' : 'border-transparent hover:bg-spa-nude/5'}`}>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-spa-stone truncate">{s.name}</p>
                    <p className="text-[11px] text-spa-stone/40 flex items-center gap-1 mt-0.5"><Clock size={9} />{s.duration}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-sm font-semibold text-spa-stone">{s.price}</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${active ? 'border-spa-stone bg-spa-stone' : 'border-spa-nude/30'}`}>
                      {active && <Check size={10} className="text-white" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── Step 2 – Date picker ───────────────────────────────── */
const Step2: React.FC<{ selected: Date | null; onSelect: (d: Date) => void }> = ({ selected, onSelect }) => {
  const nextAvail = useMemo(() => getNextAvailable(), []);
  const today = useMemo(() => { const d = new Date(); d.setHours(0,0,0,0); return d; }, []);
  const [cal, setCal] = useState({ year: nextAvail.getFullYear(), month: nextAvail.getMonth() });
  const days = useMemo(() => calendarDays(cal.year, cal.month), [cal]);

  const canPrev = cal.year > today.getFullYear() || cal.month > today.getMonth();

  const prev = () => setCal(c => c.month === 0 ? { year: c.year - 1, month: 11 } : { ...c, month: c.month - 1 });
  const next = () => setCal(c => c.month === 11 ? { year: c.year + 1, month: 0 } : { ...c, month: c.month + 1 });

  const selectNext = () => {
    onSelect(new Date(nextAvail));
    setCal({ year: nextAvail.getFullYear(), month: nextAvail.getMonth() });
  };

  return (
    <div className="p-5 space-y-5">
      {/* Suggestion */}
      <div>
        <p className="text-[11px] text-spa-stone/40 mb-2 uppercase tracking-widest">Nächster freier Termin</p>
        <button onClick={selectNext}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl border transition-all ${isSameDay(selected, nextAvail) ? 'border-spa-stone bg-spa-stone text-white' : 'border-spa-nude/30 hover:border-spa-nude text-spa-stone'}`}>
          <span className="text-sm font-medium">{fmtLong(nextAvail)}</span>
          <span className={`text-[10px] font-bold uppercase tracking-widest ${isSameDay(selected, nextAvail) ? 'opacity-60' : 'text-spa-nude'}`}>Wählen</span>
        </button>
      </div>

      {/* Calendar */}
      <div className="rounded-2xl border border-spa-nude/20 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-spa-nude/5">
          <button onClick={prev} disabled={!canPrev} className={`p-1 rounded-lg hover:bg-spa-nude/20 transition-colors ${!canPrev ? 'opacity-20 cursor-not-allowed' : ''}`}>
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm font-semibold text-spa-stone">{MONTHS_DE[cal.month]} {cal.year}</span>
          <button onClick={next} className="p-1 rounded-lg hover:bg-spa-nude/20 transition-colors">
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-7 px-2 pt-2">
          {DAYS_SHORT.map(d => <div key={d} className="text-center text-[10px] font-bold text-spa-stone/30 pb-2">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-px px-2 pb-3">
          {days.map(({ date, inMonth }, i) => {
            const avail = isAvailable(date) && inMonth;
            const sel = isSameDay(selected, date);
            const isToday = isSameDay(today, date);
            return (
              <button key={i} onClick={() => avail && onSelect(new Date(date))} disabled={!avail}
                className={`aspect-square flex items-center justify-center rounded-full text-sm transition-all ${
                  sel ? 'bg-spa-stone text-white font-bold'
                  : isToday && inMonth ? 'border border-spa-nude text-spa-stone font-semibold'
                  : avail ? 'hover:bg-spa-nude/20 text-spa-stone cursor-pointer'
                  : 'text-spa-stone/20 cursor-not-allowed'
                }`}>
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
      <p className="text-[10px] text-spa-stone/30 text-center">Sonntags geschlossen</p>
    </div>
  );
};

/* ─── Step 3 – Time picker ───────────────────────────────── */
const Step3: React.FC<{ date: Date; service: Service; selected: string | null; onSelect: (t: string) => void }> = ({ date, service, selected, onSelect }) => {
  const slots = useMemo(() => timeSlots(date), [date]);
  return (
    <div className="p-5 space-y-5">
      <div className="p-3 rounded-2xl bg-spa-nude/10 flex gap-3 items-center">
        <div>
          <p className="text-xs font-semibold text-spa-stone">{service.name}</p>
          <p className="text-[11px] text-spa-stone/50">{fmtLong(date)}</p>
        </div>
      </div>
      <p className="text-sm font-medium text-spa-stone">Uhrzeit wählen</p>
      <div className="grid grid-cols-3 gap-2">
        {slots.map(({ time, booked }) => (
          <button key={time} onClick={() => !booked && onSelect(time)} disabled={booked}
            className={`py-3.5 rounded-xl text-sm font-medium transition-all ${
              selected === time ? 'bg-spa-stone text-white shadow-md'
              : booked ? 'bg-spa-nude/10 text-spa-stone/25 cursor-not-allowed'
              : 'border border-spa-nude/30 text-spa-stone hover:border-spa-stone hover:bg-spa-nude/10'
            }`}>
            {booked
              ? <span className="flex flex-col items-center gap-0.5"><span>{time}</span><span className="text-[9px] opacity-40 uppercase tracking-wider">Belegt</span></span>
              : time
            }
          </button>
        ))}
      </div>
    </div>
  );
};

/* ─── Step 4 – Checkout ──────────────────────────────────── */
interface FormState { vorname: string; nachname: string; phone: string; email: string; notes: string; }

const Step4: React.FC<{ service: Service; date: Date; time: string; form: FormState; setForm: React.Dispatch<React.SetStateAction<FormState>> }> = ({ service, date, time, form, setForm }) => {
  const field = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  return (
    <div className="p-5 space-y-5">
      {/* Summary */}
      <div className="p-4 rounded-2xl bg-spa-stone text-white space-y-1.5">
        <p className="text-[10px] uppercase tracking-widest opacity-50">Dein Termin</p>
        <p className="font-serif text-lg font-light leading-tight">{service.name}</p>
        <p className="text-sm opacity-70">{fmtLong(date)} · {time} Uhr · {service.price}</p>
      </div>

      {/* Form */}
      <div className="grid grid-cols-2 gap-3">
        {([
          ['vorname', 'Vorname *', 'text', 'Max', 'col-span-1'],
          ['nachname', 'Nachname', 'text', 'Muster', 'col-span-1'],
          ['phone', 'Telefon *', 'tel', '+49 178 …', 'col-span-1'],
          ['email', 'E-Mail', 'email', 'name@example.de', 'col-span-1'],
        ] as [keyof FormState, string, string, string, string][]).map(([key, label, type, placeholder, span]) => (
          <div key={key} className={span}>
            <label className="text-[10px] uppercase tracking-widest text-spa-stone/40 block mb-1">{label}</label>
            <input value={form[key]} onChange={field(key)} type={type} placeholder={placeholder}
              className="w-full px-3 py-2.5 rounded-xl border border-spa-nude/30 text-sm text-spa-stone placeholder-spa-stone/30 focus:outline-none focus:border-spa-stone transition-colors" />
          </div>
        ))}
        <div className="col-span-2">
          <label className="text-[10px] uppercase tracking-widest text-spa-stone/40 block mb-1">Anmerkungen</label>
          <textarea value={form.notes} onChange={field('notes')} rows={2} placeholder="Besondere Wünsche oder Hinweise …"
            className="w-full px-3 py-2.5 rounded-xl border border-spa-nude/30 text-sm text-spa-stone placeholder-spa-stone/30 focus:outline-none focus:border-spa-stone transition-colors resize-none" />
        </div>
      </div>
      <p className="text-[10px] text-spa-stone/30 text-center">* Pflichtfelder · Anfrage per WhatsApp</p>
    </div>
  );
};

/* ─── Main modal ─────────────────────────────────────────── */
const STEP_LABELS = ['Service', 'Datum', 'Zeit', 'Daten'];

const EMPTY_FORM: FormState = { vorname: '', nachname: '', phone: '', email: '', notes: '' };

export const BookingModal: React.FC = () => {
  const { isOpen, initialService, close } = useBooking();
  const [step, setStep] = useState(1);
  const [service, setService] = useState<Service | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  // Sync initial service when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialService) {
        setService(initialService);
        setStep(2);
      } else {
        setStep(1);
        setService(null);
      }
      setDate(null);
      setTime(null);
      setForm(EMPTY_FORM);
    }
  }, [isOpen, initialService]);

  const canNext = () => {
    if (step === 1) return !!service;
    if (step === 2) return !!date;
    if (step === 3) return !!time;
    if (step === 4) return !!form.vorname && !!form.phone;
    return false;
  };

  const handleNext = () => {
    if (step < 4) setStep(s => s + 1);
    else handleBook();
  };

  const handleBack = () => setStep(s => s - 1);

  const handleClose = () => close();

  const handleBook = () => {
    const name = `${form.vorname} ${form.nachname}`.trim();
    const msg = [
      'Hallo Rem Cosmetics! 🌸',
      '',
      'Ich möchte gerne einen Termin buchen:',
      '',
      `📋 Behandlung: ${service!.name} (${service!.duration}) – ${service!.price}`,
      `📅 Datum: ${fmtLong(date!)}`,
      `⏰ Uhrzeit: ${time} Uhr`,
      '',
      `👤 Name: ${name}`,
      `📞 Telefon: ${form.phone}`,
      form.email ? `✉️ E-Mail: ${form.email}` : '',
      form.notes ? `💬 Anmerkungen: ${form.notes}` : '',
    ].filter(l => l !== undefined && (l !== '' || l === '')).join('\n').replace(/\n{3,}/g, '\n\n');
    window.open(`https://wa.me/491786244158?text=${encodeURIComponent(msg)}`, '_blank');
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleClose} className="fixed inset-0 bg-spa-stone/50 backdrop-blur-sm z-50" />

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.97 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed inset-x-3 bottom-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl z-50 bg-spa-white rounded-t-3xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: '92vh' }}
          >
            {/* Header */}
            <div className="flex-shrink-0 px-5 pt-5 pb-4 border-b border-spa-nude/10">
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-bold uppercase tracking-widest text-spa-nude">Termin buchen</span>
                <button onClick={handleClose} className="w-8 h-8 rounded-full bg-spa-nude/10 flex items-center justify-center hover:bg-spa-nude/20 transition-colors">
                  <X size={15} />
                </button>
              </div>

              {/* Step indicator */}
              <div className="flex items-center">
                {STEP_LABELS.map((label, i) => {
                  const n = i + 1;
                  const done = step > n;
                  const active = step === n;
                  return (
                    <React.Fragment key={label}>
                      <div className="flex flex-col items-center gap-1 flex-shrink-0">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${done || active ? 'bg-spa-stone text-white' : 'bg-spa-nude/20 text-spa-stone/30'}`}>
                          {done ? <Check size={12} /> : n}
                        </div>
                        <span className={`text-[9px] uppercase tracking-wider whitespace-nowrap ${active ? 'text-spa-stone font-bold' : 'text-spa-stone/30'}`}>{label}</span>
                      </div>
                      {i < STEP_LABELS.length - 1 && (
                        <div className={`flex-1 h-px mx-1 mb-4 transition-colors ${done ? 'bg-spa-stone' : 'bg-spa-nude/20'}`} />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.18 }}>
                  {step === 1 && <Step1 selected={service} onSelect={setService} />}
                  {step === 2 && <Step2 selected={date} onSelect={setDate} />}
                  {step === 3 && date && service && <Step3 date={date} service={service} selected={time} onSelect={setTime} />}
                  {step === 4 && service && date && time && <Step4 service={service} date={date} time={time} form={form} setForm={setForm} />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 px-5 py-4 border-t border-spa-nude/10 flex gap-3">
              {step > 1 && (
                <button onClick={handleBack}
                  className="px-5 py-3 border border-spa-nude/30 text-spa-stone/70 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-spa-nude/10 transition-colors flex items-center gap-1.5 flex-shrink-0">
                  <ChevronLeft size={14} />Zurück
                </button>
              )}
              <button onClick={handleNext} disabled={!canNext()}
                className={`flex-1 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${canNext() ? 'bg-spa-stone text-white hover:bg-spa-stone/90' : 'bg-spa-nude/20 text-spa-stone/25 cursor-not-allowed'}`}>
                {step === 4 ? 'Termin anfragen via WhatsApp' : <><span>Weiter</span><ArrowRight size={13} /></>}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
