# Klarvis Web Agency — Design Spec

**Date:** 2026-05-16  
**Author:** Nikola

---

## Overview

Build and launch **Klarvis**, a web agency specialising in websites and monthly maintenance for small local businesses within 25km of Mainburg, Bayern. The system consists of three parts: an agency website, an automated lead scraper, and a cold email sender.

---

## 1. Agency Website

### Stack
- React 19 + TypeScript, Vite 6, Tailwind CSS v4, Framer Motion
- Same stack as remcosmetics — existing developer familiarity

### Design
- **Colour scheme:** Dark purple gradient hero (`#2e0854` → `#0a0a0a`) with white text and purple accents (`#9333ea`, `#c084fc`)
- **Language:** German throughout
- **Layout:** Single-page, scroll-based

### Sections (in order)

| # | Section | Content |
|---|---------|---------|
| 1 | **Navbar** | "Klarvis" logo left; Leistungen, Portfolio, Preise, Kontakt links right; purple "Jetzt anfragen" CTA button |
| 2 | **Hero** | Headline: "Ihre Website. Professionell & lokal." Subline: "Mainburg · Ingolstadt · Bayern" CTA scrolls to Kontakt |
| 3 | **Leistungen** | Two cards: Website (einmalig) and Wartung & Support (monatlich) |
| 4 | **So funktioniert's** | 3-step process: 1. Gespräch → 2. Design & Entwicklung → 3. Launch |
| 5 | **Portfolio** | remcosmetics case study — screenshot + live link |
| 6 | **Preise** | Two pricing tiers (see Pricing below) |
| 7 | **Kontakt** | Form: Name, Firma, E-Mail, Nachricht. Also shows email + WhatsApp |
| 8 | **Footer** | Klarvis name, Impressum, Datenschutz links |

### Pricing

| Tier | Price | Description |
|------|-------|-------------|
| Website | 499 € (einmalig) | Custom responsive website, mobile-optimised, launch-ready |
| Wartung & Support | 37,99 €/Monat | Hosting, updates, security, support |

---

## 2. Python Lead Scraper

### Purpose
Automatically find small businesses near Mainburg that have no website or a poor one, and save them to a CSV for outreach.

### How It Works
1. Queries the **Google Places API** (Text Search endpoint) with business category keywords (e.g. "Friseur", "Bäckerei", "Zahnarzt", "Metzger", "Reinigung") within a **25km radius** of Mainburg, Bayern
2. For each result:
   - **No website listed on Google** → add to leads as `keine Website`
   - **Has website** → fetch the page, check for `<meta name="viewport">` and approximate build year; if missing/old → add as `veraltete Website`
   - **Modern website** → skip
3. Deduplicates by Google Place ID
4. Saves to `leads.csv`

### Output CSV Columns
`place_id, business_name, category, city, phone, email, website, notes`

### Usage
```bash
python scraper.py --radius 25 --output leads.csv
```

### Requirements
- Google Cloud account with Places API enabled (free $200/month credit covers hundreds of searches)
- Python 3.10+, packages: `requests`, `beautifulsoup4`, `python-dotenv`
- API key stored in `.env` as `GOOGLE_PLACES_API_KEY`

---

## 3. Cold Email Sender

### Purpose
Send personalised cold emails to leads from the CSV via Brevo (free tier: 300 emails/day).

### Email Template (German)

**Betreff:** Website für [Firmenname] — kurze Frage

> Hallo,
>
> ich bin auf [Firmenname] in [Stadt] aufmerksam geworden und wollte kurz nachfragen — haben Sie bereits eine eigene Website?
>
> Ich bin Nikola von **Klarvis**, einer kleinen Webdesign-Agentur aus der Region. Wir bauen professionelle Websites für lokale Unternehmen in Bayern — schnell, mobilfreundlich und zu einem fairen Preis.
>
> Ein aktuelles Beispiel unserer Arbeit: remcosmetics.de — ein Kosmetikstudio aus Mainburg.
>
> Falls Sie Interesse haben: ich melde mich gerne kurz per Telefon oder schreibe Ihnen ein unverbindliches Angebot.
>
> Viele Grüße,  
> Nikola  
> Klarvis · hallo@klarvis.de

### How It Works
1. Reads `leads.csv`
2. Skips any Place ID already in `sent_log.csv`
3. Fills `[Firmenname]` and `[Stadt]` from CSV
4. Sends via Brevo SMTP
5. Appends sent entry to `sent_log.csv` with timestamp

### Usage
```bash
python send_emails.py --input leads.csv --log sent_log.csv
```

### Requirements
- Brevo account (free, no credit card) — SMTP credentials in `.env`
- Custom sender domain: `hallo@klarvis.de` (requires domain + DNS setup)
- Python packages: `smtplib` (stdlib), `csv` (stdlib), `python-dotenv`

---

## File Structure

```
klarvis/                        ← new repo (separate from remcosmetics)
  src/                          ← React website
    App.tsx
    components/
      Navbar.tsx
      SectionHero.tsx
      SectionLeistungen.tsx
      SectionProcess.tsx
      SectionPortfolio.tsx
      SectionPreise.tsx
      SectionKontakt.tsx
      Footer.tsx
    index.css
  tools/                        ← Python scripts
    scraper.py
    send_emails.py
    .env.example
  leads.csv                     ← gitignored
  sent_log.csv                  ← gitignored
  .gitignore
  README.md
```

---

## Out of Scope (v1)

- CRM dashboard or lead tracking UI
- Automated follow-up email sequences
- SEO or ad services
- English-language outreach
- Multi-user access

---

## Success Criteria

- Agency website live and accessible via custom domain
- Scraper produces a valid `leads.csv` with 50+ local leads on first run
- Email sender delivers personalised emails without duplicates
- First client inquiry received within 4 weeks of launch
