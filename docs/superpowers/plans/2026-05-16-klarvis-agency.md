# Klarvis Web Agency — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Klarvis agency website (React) and two Python CLI tools (lead scraper + cold email sender) for Nikola's web agency targeting small businesses in Bavaria.

**Architecture:** The project lives in a new `klarvis` repo at `C:\Users\nikol\Desktop\klarvis`. The website is a single-page React app with dark purple/black design. The Python tools live in `tools/` — scraper produces `leads.csv`, sender reads it and sends emails via Brevo SMTP.

**Tech Stack:** React 19, TypeScript, Vite 6, Tailwind CSS v4 (@tailwindcss/vite), Framer Motion (motion/react), Lucide React, Vitest, @testing-library/react, Python 3.10+, requests, beautifulsoup4, python-dotenv, pytest

---

## File Map

### Website

| File | Responsibility |
|------|----------------|
| `src/main.tsx` | React entry point |
| `src/App.tsx` | Assembles all sections in order |
| `src/index.css` | Tailwind v4 setup + dark/purple theme variables |
| `src/components/Navbar.tsx` | Fixed top nav: logo, links, CTA button, mobile hamburger |
| `src/components/SectionHero.tsx` | Purple gradient hero: headline, subline, two CTA buttons |
| `src/components/SectionLeistungen.tsx` | Two service cards: Website + Wartung |
| `src/components/SectionProcess.tsx` | 3-step process: Gespräch → Design → Launch |
| `src/components/SectionPortfolio.tsx` | remcosmetics case study card + link |
| `src/components/SectionPreise.tsx` | Two pricing tiers: 499€ + 37,99€/Mo |
| `src/components/SectionKontakt.tsx` | Contact form (Formspree) + contact details |
| `src/components/Footer.tsx` | Footer: logo, Impressum, Datenschutz, year |
| `src/tests/setup.ts` | Vitest global test setup |
| `src/tests/Navbar.test.tsx` | Tests: logo text, nav links, CTA button |
| `src/tests/SectionPreise.test.tsx` | Tests: correct prices, tier names |

### Python Tools

| File | Responsibility |
|------|----------------|
| `tools/scraper.py` | Queries Google Places API, filters leads by website quality, saves CSV |
| `tools/send_emails.py` | Reads CSV, sends personalised emails via Brevo SMTP, logs sent |
| `tools/.env.example` | Documents all required environment variables |
| `tools/tests/__init__.py` | Empty — marks tests as a package |
| `tools/tests/test_scraper.py` | Tests: `is_modern_website`, `build_lead_row` |
| `tools/tests/test_send_emails.py` | Tests: `build_subject`, `build_email_body`, `is_already_sent` |

---

## Task 1: Initialise project

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `.gitignore`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/tests/setup.ts`

- [ ] **Step 1: Create directory and init git**

```powershell
mkdir C:\Users\nikol\Desktop\klarvis
cd C:\Users\nikol\Desktop\klarvis
git init
```

- [ ] **Step 2: Scaffold Vite + React + TypeScript**

```powershell
npm create vite@latest . -- --template react-ts
```

- [ ] **Step 3: Install dependencies**

```powershell
npm install
npm install framer-motion lucide-react
npm install -D @tailwindcss/vite vitest @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 4: Configure Vite**

Replace `vite.config.ts`:
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    globals: true,
  },
})
```

- [ ] **Step 5: Configure TypeScript**

Replace `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true
  },
  "include": ["src"]
}
```

- [ ] **Step 6: Set up global CSS with Tailwind v4 theme**

Replace `src/index.css`:
```css
@import "tailwindcss";

@theme {
  --color-purple-950: #1a0533;
  --color-purple-900: #2e0854;
  --color-purple-600: #9333ea;
  --color-purple-400: #c084fc;
  --color-dark: #0a0a0a;
  --color-dark-100: #0f0f0f;
  --color-dark-200: #1a1a1a;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  background-color: #0a0a0a;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  margin: 0;
}
```

- [ ] **Step 7: Add Google Fonts to index.html**

In `index.html` inside `<head>`, add:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
<title>Klarvis — Webdesign für lokale Unternehmen</title>
```

- [ ] **Step 8: Create test setup file**

Create `src/tests/setup.ts`:
```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 9: Write placeholder App and main**

Replace `src/App.tsx`:
```tsx
export default function App() {
  return <div>Klarvis</div>
}
```

Replace `src/main.tsx`:
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

- [ ] **Step 10: Create .gitignore**

Create `.gitignore`:
```
node_modules/
dist/
.env
leads.csv
sent_log.csv
tools/__pycache__/
tools/tests/__pycache__/
*.pyc
```

- [ ] **Step 11: Verify dev server starts**

```powershell
npm run dev
```
Expected: Vite starts at `http://localhost:5173`. Browser shows dark page with "Klarvis" text.

- [ ] **Step 12: Commit**

```powershell
git add .
git commit -m "chore: init Klarvis project with Vite + React + Tailwind v4"
```

---

## Task 2: Navbar

**Files:**
- Create: `src/components/Navbar.tsx`
- Create: `src/tests/Navbar.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `src/tests/Navbar.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import Navbar from '../components/Navbar'

test('renders logo text', () => {
  render(<Navbar />)
  expect(screen.getByText('Klarvis')).toBeInTheDocument()
})

test('renders all nav links', () => {
  render(<Navbar />)
  expect(screen.getByText('Leistungen')).toBeInTheDocument()
  expect(screen.getByText('Portfolio')).toBeInTheDocument()
  expect(screen.getByText('Preise')).toBeInTheDocument()
  expect(screen.getByText('Kontakt')).toBeInTheDocument()
})

test('renders CTA link', () => {
  render(<Navbar />)
  const cta = screen.getAllByText('Jetzt anfragen')
  expect(cta.length).toBeGreaterThan(0)
})
```

- [ ] **Step 2: Run to confirm failure**

```powershell
npx vitest run src/tests/Navbar.test.tsx
```
Expected: FAIL — cannot find module `../components/Navbar`

- [ ] **Step 3: Implement Navbar**

Create `src/components/Navbar.tsx`:
```tsx
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Preise', href: '#preise' },
  { label: 'Kontakt', href: '#kontakt' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/90 backdrop-blur border-b border-dark-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-white font-extrabold text-xl tracking-tight">
          Klarvis<span className="text-purple-600">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-sm text-white/70 hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
          <a
            href="#kontakt"
            className="text-sm font-semibold bg-purple-600 hover:bg-purple-600/80 text-white px-4 py-2 rounded-full transition-colors"
          >
            Jetzt anfragen
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen(o => !o)} aria-label="Menü">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-dark-100 border-t border-dark-200 px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-white/80 hover:text-white text-sm">
              {l.label}
            </a>
          ))}
          <a
            href="#kontakt"
            onClick={() => setOpen(false)}
            className="bg-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-full text-center"
          >
            Jetzt anfragen
          </a>
        </div>
      )}
    </nav>
  )
}
```

- [ ] **Step 4: Run tests to confirm pass**

```powershell
npx vitest run src/tests/Navbar.test.tsx
```
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```powershell
git add src/components/Navbar.tsx src/tests/Navbar.test.tsx
git commit -m "feat: add Navbar with mobile hamburger"
```

---

## Task 3: SectionHero

**Files:**
- Create: `src/components/SectionHero.tsx`

- [ ] **Step 1: Implement SectionHero**

Create `src/components/SectionHero.tsx`:
```tsx
import { motion } from 'motion/react'

export default function SectionHero() {
  return (
    <section
      className="min-h-screen flex items-center pt-16"
      style={{ background: 'linear-gradient(160deg, #2e0854 0%, #0a0a0a 60%)' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="text-purple-400 text-sm font-semibold uppercase tracking-widest mb-6">
            Mainburg · Ingolstadt · Bayern
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-white mb-6">
            Ihre Website.<br />
            <span className="text-purple-400">Professionell</span> &amp; lokal.
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-xl mb-10">
            Wir bauen moderne Websites für lokale Unternehmen in Bayern — schnell, mobilfreundlich und zu einem fairen Preis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#kontakt"
              className="inline-block bg-purple-600 hover:bg-purple-600/80 text-white font-semibold px-8 py-4 rounded-full transition-colors text-center"
            >
              Kostenlos anfragen →
            </a>
            <a
              href="#preise"
              className="inline-block border border-white/20 hover:border-white/50 text-white/70 hover:text-white font-semibold px-8 py-4 rounded-full transition-colors text-center"
            >
              Preise ansehen
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to App.tsx temporarily and verify visually**

Add `<SectionHero />` to `src/App.tsx` and run `npm run dev`. Check: purple gradient hero loads, headline visible, both CTA buttons present.

- [ ] **Step 3: Commit**

```powershell
git add src/components/SectionHero.tsx
git commit -m "feat: add SectionHero with purple gradient"
```

---

## Task 4: SectionLeistungen

**Files:**
- Create: `src/components/SectionLeistungen.tsx`

- [ ] **Step 1: Implement SectionLeistungen**

Create `src/components/SectionLeistungen.tsx`:
```tsx
import { Globe, Wrench } from 'lucide-react'
import { motion } from 'motion/react'

const services = [
  {
    Icon: Globe,
    title: 'Website',
    subtitle: 'Einmalige Erstellung',
    description: 'Individuelle, mobilfreundliche Website — von der Konzeption bis zum Launch. Schnell, modern und auf Ihre Kunden zugeschnitten.',
    features: ['Responsives Design', 'Schnelle Ladezeiten', 'SEO-Grundoptimierung', 'Kontaktformular'],
  },
  {
    Icon: Wrench,
    title: 'Wartung & Support',
    subtitle: 'Monatlich kündbar',
    description: 'Wir kümmern uns um Hosting, Sicherheit und Updates — damit Sie sich auf Ihr Geschäft konzentrieren können.',
    features: ['Hosting inklusive', 'Sicherheits-Updates', 'Inhaltspflege', 'Persönlicher Ansprechpartner'],
  },
]

export default function SectionLeistungen() {
  return (
    <section id="leistungen" className="py-24 bg-dark">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-purple-400 text-sm font-semibold uppercase tracking-widest mb-3">Leistungen</p>
          <h2 className="text-4xl font-extrabold text-white mb-16">Was wir anbieten</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map(({ Icon, title, subtitle, description, features }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="border border-dark-200 rounded-2xl p-8 bg-dark-100 hover:border-purple-600/40 transition-colors"
            >
              <Icon className="text-purple-400 mb-4" size={32} />
              <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
              <p className="text-purple-400/70 text-sm mb-4">{subtitle}</p>
              <p className="text-white/60 mb-6 leading-relaxed">{description}</p>
              <ul className="space-y-2">
                {features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-white/70 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify visually**

Check `npm run dev`: two cards render side by side, icons load, feature bullet list shows.

- [ ] **Step 3: Commit**

```powershell
git add src/components/SectionLeistungen.tsx
git commit -m "feat: add SectionLeistungen"
```

---

## Task 5: SectionProcess

**Files:**
- Create: `src/components/SectionProcess.tsx`

- [ ] **Step 1: Implement SectionProcess**

Create `src/components/SectionProcess.tsx`:
```tsx
import { motion } from 'motion/react'

const steps = [
  { number: '01', title: 'Gespräch', description: 'Wir besprechen Ihre Wünsche, Ziele und Zielgruppe — kostenlos und unverbindlich.' },
  { number: '02', title: 'Design & Entwicklung', description: 'Wir entwerfen und bauen Ihre Website — Sie sehen den Fortschritt zu jedem Schritt.' },
  { number: '03', title: 'Launch', description: 'Ihre Website geht online. Wir kümmern uns um Domain, Hosting und alles Technische.' },
]

export default function SectionProcess() {
  return (
    <section className="py-24 bg-dark-100">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-purple-400 text-sm font-semibold uppercase tracking-widest mb-3">Ablauf</p>
          <h2 className="text-4xl font-extrabold text-white mb-16">So funktioniert's</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map(({ number, title, description }, i) => (
            <motion.div
              key={number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="text-6xl font-extrabold text-purple-600/20 mb-4 select-none">{number}</div>
              <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
              <p className="text-white/60 leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify visually**

Check: 3 numbered steps with large faded step numbers, text readable on dark background.

- [ ] **Step 3: Commit**

```powershell
git add src/components/SectionProcess.tsx
git commit -m "feat: add SectionProcess (3-step how it works)"
```

---

## Task 6: SectionPortfolio

**Files:**
- Create: `src/components/SectionPortfolio.tsx`
- Add: `public/remcosmetics-preview.png`

- [ ] **Step 1: Take a screenshot of remcosmetics**

Run `npm run dev` in `C:\Users\nikol\Desktop\remcosmetics`, then screenshot the hero section in the browser. Save the file as `public/remcosmetics-preview.png` inside the klarvis project.

- [ ] **Step 2: Implement SectionPortfolio**

Create `src/components/SectionPortfolio.tsx`:
```tsx
import { motion } from 'motion/react'
import { ExternalLink } from 'lucide-react'

export default function SectionPortfolio() {
  return (
    <section id="portfolio" className="py-24 bg-dark">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-purple-400 text-sm font-semibold uppercase tracking-widest mb-3">Portfolio</p>
          <h2 className="text-4xl font-extrabold text-white mb-16">Unsere Arbeit</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border border-dark-200 rounded-2xl overflow-hidden bg-dark-100 hover:border-purple-600/40 transition-colors"
        >
          <div className="aspect-video bg-dark-200 overflow-hidden">
            <img
              src="/remcosmetics-preview.png"
              alt="remcosmetics Website Vorschau"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">remcosmetics</h3>
              <p className="text-white/60 text-sm">Kosmetikstudio · Mainburg, Bayern</p>
              <p className="text-white/50 text-sm mt-2">
                Komplette Website mit Buchungsmodal, Leistungsübersicht und Google Maps — auf Deutsch.
              </p>
            </div>
            <a
              href="https://remcosmetics.de"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-purple-600/50 hover:border-purple-600 text-purple-400 hover:text-purple-300 px-5 py-2.5 rounded-full transition-colors text-sm font-semibold whitespace-nowrap"
            >
              Live ansehen <ExternalLink size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verify visually**

Check: screenshot fills the card, business name and description visible, "Live ansehen" button renders.

- [ ] **Step 4: Commit**

```powershell
git add src/components/SectionPortfolio.tsx public/remcosmetics-preview.png
git commit -m "feat: add SectionPortfolio with remcosmetics case study"
```

---

## Task 7: SectionPreise

**Files:**
- Create: `src/components/SectionPreise.tsx`
- Create: `src/tests/SectionPreise.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `src/tests/SectionPreise.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import SectionPreise from '../components/SectionPreise'

test('shows website price', () => {
  render(<SectionPreise />)
  expect(screen.getByText(/499/)).toBeInTheDocument()
})

test('shows maintenance price', () => {
  render(<SectionPreise />)
  expect(screen.getByText(/37,99/)).toBeInTheDocument()
})

test('shows both tier names', () => {
  render(<SectionPreise />)
  expect(screen.getByText('Website')).toBeInTheDocument()
  expect(screen.getByText('Wartung & Support')).toBeInTheDocument()
})
```

- [ ] **Step 2: Run to confirm failure**

```powershell
npx vitest run src/tests/SectionPreise.test.tsx
```
Expected: FAIL — cannot find module

- [ ] **Step 3: Implement SectionPreise**

Create `src/components/SectionPreise.tsx`:
```tsx
import { motion } from 'motion/react'
import { Check } from 'lucide-react'

const tiers = [
  {
    name: 'Website',
    price: '499',
    period: 'einmalig',
    description: 'Ihre professionelle Website — einmalig erstellt, launch-ready.',
    features: [
      'Individuelles Design',
      'Mobilfreundlich (Responsive)',
      'Bis zu 5 Unterseiten',
      'Kontaktformular',
      'SEO-Grundoptimierung',
      'Launch & Einrichtung inklusive',
    ],
    cta: 'Website anfragen',
    highlight: false,
  },
  {
    name: 'Wartung & Support',
    price: '37,99',
    period: 'pro Monat',
    description: 'Wir kümmern uns um alles — Sie konzentrieren sich aufs Geschäft.',
    features: [
      'Hosting inklusive',
      'SSL-Zertifikat',
      'Sicherheits-Updates',
      'Inhaltspflege (bis 2h/Mo)',
      'Technischer Support',
      'Monatlich kündbar',
    ],
    cta: 'Wartung hinzufügen',
    highlight: true,
  },
]

export default function SectionPreise() {
  return (
    <section id="preise" className="py-24 bg-dark-100">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-purple-400 text-sm font-semibold uppercase tracking-widest mb-3">Preise</p>
          <h2 className="text-4xl font-extrabold text-white mb-4">Transparent & fair</h2>
          <p className="text-white/60 mb-16 max-w-xl">Keine versteckten Kosten. Kein Kleingedrucktes.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl">
          {tiers.map(({ name, price, period, description, features, cta, highlight }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`rounded-2xl p-8 flex flex-col ${
                highlight
                  ? 'bg-purple-600/10 border-2 border-purple-600'
                  : 'bg-dark border border-dark-200'
              }`}
            >
              <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl font-extrabold text-white">{price} €</span>
                <span className="text-white/50 text-sm mb-1">{period}</span>
              </div>
              <p className="text-white/60 text-sm mb-6 leading-relaxed">{description}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {features.map(f => (
                  <li key={f} className="flex items-start gap-3 text-white/70 text-sm">
                    <Check size={16} className="text-purple-400 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#kontakt"
                className={`text-center font-semibold py-3 px-6 rounded-full transition-colors text-sm ${
                  highlight
                    ? 'bg-purple-600 hover:bg-purple-600/80 text-white'
                    : 'border border-white/20 hover:border-white/50 text-white/80 hover:text-white'
                }`}
              >
                {cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run tests to confirm pass**

```powershell
npx vitest run src/tests/SectionPreise.test.tsx
```
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```powershell
git add src/components/SectionPreise.tsx src/tests/SectionPreise.test.tsx
git commit -m "feat: add SectionPreise (499€ + 37,99€/Mo)"
```

---

## Task 8: SectionKontakt

**Files:**
- Create: `src/components/SectionKontakt.tsx`

- [ ] **Step 1: Create a Formspree endpoint**

1. Go to https://formspree.io and sign up for a free account
2. Create a new form, set destination email to your address
3. Copy the form ID — it looks like `xabcdefg` from the URL `https://formspree.io/f/xabcdefg`

- [ ] **Step 2: Implement SectionKontakt**

Create `src/components/SectionKontakt.tsx` — replace `YOUR_FORMSPREE_ID` with your actual ID from Step 1, and `49XXXXXXXXXX` with your WhatsApp number (digits only, no spaces):
```tsx
import { useState } from 'react'
import { motion } from 'motion/react'
import { Mail, MessageSquare } from 'lucide-react'

export default function SectionKontakt() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) { setStatus('sent'); form.reset() }
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="kontakt" className="py-24 bg-dark">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-purple-400 text-sm font-semibold uppercase tracking-widest mb-3">Kontakt</p>
          <h2 className="text-4xl font-extrabold text-white mb-4">Lassen Sie uns reden</h2>
          <p className="text-white/60 mb-16 max-w-xl">Kostenlose Erstberatung — unverbindlich und unkompliziert.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-white/60 mb-2">Name *</label>
                <input name="name" required className="w-full bg-dark-100 border border-dark-200 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-600 transition-colors" placeholder="Max Mustermann" />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Firma</label>
                <input name="firma" className="w-full bg-dark-100 border border-dark-200 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-600 transition-colors" placeholder="Muster GmbH" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-2">E-Mail *</label>
              <input name="email" type="email" required className="w-full bg-dark-100 border border-dark-200 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-600 transition-colors" placeholder="max@beispiel.de" />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-2">Nachricht</label>
              <textarea name="nachricht" rows={4} className="w-full bg-dark-100 border border-dark-200 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-600 transition-colors resize-none" placeholder="Kurze Beschreibung Ihres Projekts..." />
            </div>
            <button
              type="submit"
              disabled={status === 'sending' || status === 'sent'}
              className="w-full bg-purple-600 hover:bg-purple-600/80 disabled:opacity-50 text-white font-semibold py-4 rounded-full transition-colors"
            >
              {status === 'sending' ? 'Wird gesendet…' : status === 'sent' ? 'Nachricht gesendet ✓' : 'Nachricht senden'}
            </button>
            {status === 'error' && (
              <p className="text-red-400 text-sm text-center">
                Etwas ist schiefgelaufen. Schreiben Sie uns direkt an hallo@klarvis.de
              </p>
            )}
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8 justify-center"
          >
            <div className="flex items-start gap-4">
              <Mail className="text-purple-400 flex-shrink-0 mt-1" size={22} />
              <div>
                <p className="text-white font-semibold mb-1">E-Mail</p>
                <a href="mailto:hallo@klarvis.de" className="text-white/60 hover:text-purple-400 transition-colors">
                  hallo@klarvis.de
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MessageSquare className="text-purple-400 flex-shrink-0 mt-1" size={22} />
              <div>
                <p className="text-white font-semibold mb-1">WhatsApp</p>
                <a href="https://wa.me/49XXXXXXXXXX" className="text-white/60 hover:text-purple-400 transition-colors">
                  Direkt schreiben →
                </a>
              </div>
            </div>
            <div className="border border-dark-200 rounded-2xl p-6 bg-dark-100">
              <p className="text-white/80 text-sm leading-relaxed">
                <span className="text-white font-semibold">Antwortzeit:</span> Wir melden uns in der Regel innerhalb von 24 Stunden bei Ihnen.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verify visually**

Check: form renders with 4 fields, send button works (submit → shows "Wird gesendet…"), contact info panel visible on the right.

- [ ] **Step 4: Commit**

```powershell
git add src/components/SectionKontakt.tsx
git commit -m "feat: add SectionKontakt with Formspree and contact details"
```

---

## Task 9: Footer

**Files:**
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Implement Footer**

Create `src/components/Footer.tsx`:
```tsx
export default function Footer() {
  return (
    <footer className="border-t border-dark-200 bg-dark py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
        <span className="font-bold text-white/70 text-lg">
          Klarvis<span className="text-purple-600">.</span>
        </span>
        <div className="flex gap-6">
          <a href="/impressum" className="hover:text-white transition-colors">Impressum</a>
          <a href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</a>
        </div>
        <span>© {new Date().getFullYear()} Klarvis</span>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```powershell
git add src/components/Footer.tsx
git commit -m "feat: add Footer"
```

---

## Task 10: Wire up App.tsx and final verification

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Assemble all sections**

Replace `src/App.tsx`:
```tsx
import Navbar from './components/Navbar'
import SectionHero from './components/SectionHero'
import SectionLeistungen from './components/SectionLeistungen'
import SectionProcess from './components/SectionProcess'
import SectionPortfolio from './components/SectionPortfolio'
import SectionPreise from './components/SectionPreise'
import SectionKontakt from './components/SectionKontakt'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <SectionHero />
      <SectionLeistungen />
      <SectionProcess />
      <SectionPortfolio />
      <SectionPreise />
      <SectionKontakt />
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Run all tests**

```powershell
npx vitest run
```
Expected: All tests PASS.

- [ ] **Step 3: Full visual walkthrough**

```powershell
npm run dev
```
Check each section: navbar fixed at top, scroll through hero → leistungen → process → portfolio → preise → kontakt → footer. Test mobile at 375px width — hamburger menu opens and closes.

- [ ] **Step 4: Production build**

```powershell
npm run build
```
Expected: no TypeScript errors, `dist/` folder created.

- [ ] **Step 5: Commit**

```powershell
git add src/App.tsx
git commit -m "feat: assemble full Klarvis website"
```

---

## Task 11: Python lead scraper

**Files:**
- Create: `tools/scraper.py`
- Create: `tools/.env.example`
- Create: `tools/tests/__init__.py`
- Create: `tools/tests/test_scraper.py`

- [ ] **Step 1: Install Python dependencies**

```powershell
pip install requests beautifulsoup4 python-dotenv pytest
```

- [ ] **Step 2: Create .env.example**

Create `tools/.env.example`:
```
GOOGLE_PLACES_API_KEY=your_google_places_api_key_here
```

- [ ] **Step 3: Write failing tests**

Create `tools/tests/__init__.py` (empty file).

Create `tools/tests/test_scraper.py`:
```python
import sys
sys.path.insert(0, '.')
from scraper import is_modern_website, build_lead_row

def test_no_viewport_is_not_modern():
    html = '<html><head></head><body>Hello</body></html>'
    assert is_modern_website(html) is False

def test_viewport_meta_is_modern():
    html = '<html><head><meta name="viewport" content="width=device-width"></head><body></body></html>'
    assert is_modern_website(html) is True

def test_build_lead_row_no_website():
    place = {'place_id': 'abc123', 'name': 'Bäckerei Müller', 'vicinity': 'Mainburg', 'formatted_phone_number': '+49 8751 1234'}
    row = build_lead_row(place, website=None)
    assert row['business_name'] == 'Bäckerei Müller'
    assert row['website'] == ''
    assert row['notes'] == 'keine Website'

def test_build_lead_row_old_website():
    place = {'place_id': 'def456', 'name': 'Metzgerei Huber', 'vicinity': 'Ingolstadt', 'formatted_phone_number': '+49 841 5678'}
    row = build_lead_row(place, website='http://metzgerei-huber.de', notes='veraltete Website')
    assert row['notes'] == 'veraltete Website'
```

- [ ] **Step 4: Run to confirm failure**

```powershell
cd tools
pytest tests/test_scraper.py -v
```
Expected: ImportError — `scraper` module not found

- [ ] **Step 5: Implement scraper.py**

Create `tools/scraper.py`:
```python
import argparse
import csv
import os
import time

import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv('GOOGLE_PLACES_API_KEY')
PLACES_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json'
DETAILS_URL = 'https://maps.googleapis.com/maps/api/place/details/json'

MAINBURG_LAT = 48.6333
MAINBURG_LNG = 11.7833

CATEGORIES = [
    'Friseur', 'Bäckerei', 'Metzgerei', 'Zahnarzt', 'Arzt',
    'Physiotherapie', 'Kosmetik', 'Reinigung', 'Autowerkstatt',
    'Blumenladen', 'Optiker', 'Steuerberater', 'Rechtsanwalt',
    'Restaurant', 'Café', 'Hotel', 'Zimmerei', 'Elektriker', 'Klempner',
]


def is_modern_website(html: str) -> bool:
    soup = BeautifulSoup(html, 'html.parser')
    return soup.find('meta', attrs={'name': 'viewport'}) is not None


def build_lead_row(place: dict, website: str | None, notes: str = '') -> dict:
    return {
        'place_id': place.get('place_id', ''),
        'business_name': place.get('name', ''),
        'category': place.get('_category', ''),
        'city': place.get('vicinity', ''),
        'phone': place.get('formatted_phone_number', ''),
        'email': '',
        'website': website or '',
        'notes': notes or ('keine Website' if not website else ''),
    }


def fetch_places(query: str, radius_m: int) -> list[dict]:
    params = {'query': query, 'location': f'{MAINBURG_LAT},{MAINBURG_LNG}', 'radius': radius_m, 'key': API_KEY, 'language': 'de'}
    results = []
    while True:
        r = requests.get(PLACES_URL, params=params, timeout=10)
        data = r.json()
        results.extend(data.get('results', []))
        next_token = data.get('next_page_token')
        if not next_token:
            break
        time.sleep(2)
        params = {'pagetoken': next_token, 'key': API_KEY}
    return results


def get_place_details(place_id: str) -> dict:
    params = {'place_id': place_id, 'fields': 'website,formatted_phone_number', 'key': API_KEY, 'language': 'de'}
    r = requests.get(DETAILS_URL, params=params, timeout=10)
    return r.json().get('result', {})


def check_website(url: str) -> str:
    try:
        r = requests.get(url, timeout=8, headers={'User-Agent': 'Mozilla/5.0'})
        return 'modern' if is_modern_website(r.text) else 'veraltete Website'
    except Exception:
        return 'Website nicht erreichbar'


def scrape(radius_km: int, output: str) -> None:
    radius_m = radius_km * 1000
    seen_ids: set[str] = set()
    leads: list[dict] = []

    for category in CATEGORIES:
        print(f'Searching: {category}')
        for place in fetch_places(f'{category} Bayern', radius_m):
            pid = place.get('place_id', '')
            if pid in seen_ids:
                continue
            seen_ids.add(pid)
            place['_category'] = category

            details = get_place_details(pid)
            website = details.get('website')
            place['formatted_phone_number'] = details.get('formatted_phone_number', '')

            if not website:
                leads.append(build_lead_row(place, website=None))
                print(f'  LEAD (no website): {place["name"]}')
            else:
                status = check_website(website)
                if status != 'modern':
                    leads.append(build_lead_row(place, website=website, notes=status))
                    print(f'  LEAD ({status}): {place["name"]}')
                else:
                    print(f'  skip (modern): {place["name"]}')
            time.sleep(0.1)

    fieldnames = ['place_id', 'business_name', 'category', 'city', 'phone', 'email', 'website', 'notes']
    with open(output, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(leads)
    print(f'\nDone. {len(leads)} leads saved to {output}')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--radius', type=int, default=25)
    parser.add_argument('--output', default='leads.csv')
    args = parser.parse_args()
    scrape(args.radius, args.output)
```

- [ ] **Step 6: Run tests to confirm pass**

```powershell
cd tools
pytest tests/test_scraper.py -v
```
Expected: PASS (4 tests)

- [ ] **Step 7: Set up Google Places API**

1. Go to https://console.cloud.google.com → create project "Klarvis"
2. Enable "Places API"
3. Create an API key under Credentials
4. Create `tools/.env` (gitignored) with: `GOOGLE_PLACES_API_KEY=your_actual_key`

- [ ] **Step 8: Test run**

```powershell
python scraper.py --radius 25 --output leads.csv
```
Expected: script runs, prints businesses found, creates `leads.csv`. Open the file and verify a few rows look correct.

- [ ] **Step 9: Commit**

```powershell
cd ..
git add tools/scraper.py tools/.env.example tools/tests/__init__.py tools/tests/test_scraper.py
git commit -m "feat: add lead scraper (Google Places API, 25km radius)"
```

---

## Task 12: Cold email sender

**Files:**
- Create: `tools/send_emails.py`
- Create: `tools/tests/test_send_emails.py`
- Modify: `tools/.env.example`

- [ ] **Step 1: Append Brevo credentials to .env.example**

Append to `tools/.env.example`:
```
BREVO_SMTP_USER=your_brevo_smtp_login
BREVO_SMTP_PASSWORD=your_brevo_smtp_password
SENDER_EMAIL=hallo@klarvis.de
SENDER_NAME=Nikola – Klarvis
```

Create a free Brevo account at https://app.brevo.com — SMTP credentials are under Account → SMTP & API. Add actual values to `tools/.env`.

- [ ] **Step 2: Write failing tests**

Create `tools/tests/test_send_emails.py`:
```python
import sys
sys.path.insert(0, '.')
from send_emails import build_subject, build_email_body, is_already_sent

def test_subject_contains_business_name():
    assert 'Bäckerei Müller' in build_subject('Bäckerei Müller')

def test_body_contains_business_name_and_city():
    body = build_email_body('Metzgerei Huber', 'Mainburg')
    assert 'Metzgerei Huber' in body
    assert 'Mainburg' in body

def test_body_contains_klarvis():
    assert 'Klarvis' in build_email_body('Test GmbH', 'Ingolstadt')

def test_body_contains_sender_name():
    assert 'Nikola' in build_email_body('Test GmbH', 'Ingolstadt')

def test_not_already_sent_with_no_log(tmp_path):
    log = str(tmp_path / 'sent_log.csv')
    assert is_already_sent('abc123', log) is False

def test_already_sent_if_in_log(tmp_path):
    log = tmp_path / 'sent_log.csv'
    log.write_text('place_id,sent_at\nabc123,2026-05-16\n')
    assert is_already_sent('abc123', str(log)) is True
```

- [ ] **Step 3: Run to confirm failure**

```powershell
cd tools
pytest tests/test_send_emails.py -v
```
Expected: ImportError — `send_emails` not found

- [ ] **Step 4: Implement send_emails.py**

Create `tools/send_emails.py`:
```python
import argparse
import csv
import os
import smtplib
import time
from datetime import date
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from dotenv import load_dotenv

load_dotenv()

SMTP_HOST = 'smtp-relay.brevo.com'
SMTP_PORT = 587
SMTP_USER = os.getenv('BREVO_SMTP_USER', '')
SMTP_PASS = os.getenv('BREVO_SMTP_PASSWORD', '')
SENDER_EMAIL = os.getenv('SENDER_EMAIL', 'hallo@klarvis.de')
SENDER_NAME = os.getenv('SENDER_NAME', 'Nikola – Klarvis')

_SUBJECT = 'Website für {business_name} — kurze Frage'

_BODY = """\
Hallo,

ich bin auf {business_name} in {city} aufmerksam geworden und wollte kurz nachfragen — haben Sie bereits eine eigene Website?

Ich bin Nikola von Klarvis, einer kleinen Webdesign-Agentur aus der Region. Wir bauen professionelle Websites für lokale Unternehmen in Bayern — schnell, mobilfreundlich und zu einem fairen Preis.

Ein aktuelles Beispiel unserer Arbeit: remcosmetics.de — ein Kosmetikstudio aus Mainburg.

Falls Sie Interesse haben: ich melde mich gerne kurz per Telefon oder schreibe Ihnen ein unverbindliches Angebot.

Viele Grüße,
Nikola
Klarvis · hallo@klarvis.de
"""


def build_subject(business_name: str) -> str:
    return _SUBJECT.format(business_name=business_name)


def build_email_body(business_name: str, city: str) -> str:
    return _BODY.format(business_name=business_name, city=city)


def is_already_sent(place_id: str, log_path: str) -> bool:
    if not os.path.exists(log_path):
        return False
    with open(log_path, newline='', encoding='utf-8') as f:
        return any(row['place_id'] == place_id for row in csv.DictReader(f))


def log_sent(place_id: str, log_path: str) -> None:
    write_header = not os.path.exists(log_path)
    with open(log_path, 'a', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=['place_id', 'sent_at'])
        if write_header:
            writer.writeheader()
        writer.writerow({'place_id': place_id, 'sent_at': date.today().isoformat()})


def send_email(to_email: str, subject: str, body: str) -> None:
    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = f'{SENDER_NAME} <{SENDER_EMAIL}>'
    msg['To'] = to_email
    msg.attach(MIMEText(body, 'plain', 'utf-8'))
    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASS)
        server.sendmail(SENDER_EMAIL, to_email, msg.as_string())


def run(input_csv: str, log_path: str, dry_run: bool = False) -> None:
    with open(input_csv, newline='', encoding='utf-8') as f:
        leads = list(csv.DictReader(f))

    sent = skipped = 0
    for lead in leads:
        email = lead.get('email', '').strip()
        if not email:
            print(f'  skip (no email): {lead["business_name"]}')
            skipped += 1
            continue
        if is_already_sent(lead['place_id'], log_path):
            print(f'  skip (already sent): {lead["business_name"]}')
            skipped += 1
            continue

        subject = build_subject(lead['business_name'])
        body = build_email_body(lead['business_name'], lead['city'])

        if dry_run:
            print(f'  DRY RUN — would send to {email}: {subject}')
        else:
            send_email(email, subject, body)
            log_sent(lead['place_id'], log_path)
            print(f'  Sent to {email}: {lead["business_name"]}')
            sent += 1
            time.sleep(1)

    print(f'\nDone. Sent: {sent}, Skipped: {skipped}')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--input', default='leads.csv')
    parser.add_argument('--log', default='sent_log.csv')
    parser.add_argument('--dry-run', action='store_true')
    args = parser.parse_args()
    run(args.input, args.log, args.dry_run)
```

- [ ] **Step 5: Run tests to confirm pass**

```powershell
cd tools
pytest tests/test_send_emails.py -v
```
Expected: PASS (6 tests)

- [ ] **Step 6: Dry-run test**

After `leads.csv` has at least one row with an email address:
```powershell
python send_emails.py --dry-run
```
Expected: prints `DRY RUN — would send to ...` for each lead with an email. Nothing actually sent.

- [ ] **Step 7: Commit**

```powershell
cd ..
git add tools/send_emails.py tools/.env.example tools/tests/test_send_emails.py
git commit -m "feat: add cold email sender with Brevo SMTP and duplicate guard"
```

---

## Self-Review

**Spec coverage:**
- ✅ Agency website — all 7 sections + footer, dark purple gradient design
- ✅ German language throughout
- ✅ Pricing: 499€ einmalig + 37,99€/Mo maintenance
- ✅ remcosmetics portfolio case study
- ✅ Formspree contact form
- ✅ Google Places API scraper, 25km radius around Mainburg
- ✅ Leads filtered by missing or outdated website
- ✅ `leads.csv` with all required columns
- ✅ Brevo SMTP email sender
- ✅ Personalised template (Firmenname, Stadt)
- ✅ Duplicate guard via `sent_log.csv`
- ✅ Signed Nikola · Klarvis

**Intentional placeholders** (require manual substitution before go-live):
- `YOUR_FORMSPREE_ID` in `SectionKontakt.tsx` — replace after creating Formspree account
- `49XXXXXXXXXX` in `SectionKontakt.tsx` — replace with your WhatsApp number

**Type consistency:** `build_lead_row`, `is_modern_website`, `build_email_body`, `build_subject`, `is_already_sent` are named consistently across implementation files and their tests.
