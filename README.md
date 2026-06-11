# six50.io

Marketing site for six50 solutions LLC — finance × intelligence.

Built with Next.js 16 (App Router), Tailwind CSS 4, GSAP (ScrollTrigger), and Three.js.

## Design system — "the ledger"

- **Palette:** ink `#0A0E14` base · paper `#EAE7DE` text · gold `#E8B44C` (financial rigor) · electric blue `#6BA8FF` (intelligent systems). Tokens live in `app/globals.css` under `@theme`.
- **Type:** Archivo (display/body) · Instrument Serif italic (accent words) · IBM Plex Mono (ledger labels, data, CTAs). Loaded via `next/font` in `app/layout.tsx`.
- **Signature interaction:** `components/ui/ParticleField.tsx` — a site-wide Three.js field. Clicking any non-interactive area sends a burst that snaps nearby particles into an ordered grid (gold/blue glow) before they decay back to drift. Chaos → order → entropy. Add `data-no-burst` to any element that should swallow clicks (forms already do).
- **Motion components:** `Reveal` (GSAP scroll reveal, also backs the legacy `FadeIn`), `Strike` (problem strike-through + fix annotation), `Venn` (scroll-scrubbed convergence), `Counter`, `Checklist`, `Magnetic`, `ScrollProgress`, `SpotlightCard`. All respect `prefers-reduced-motion`.
- **Section headers:** `LedgerHead` renders `001 / TITLE / annotation` rows.

## Getting started

```
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy

Push to `main` — Vercel builds automatically. Fonts are fetched from Google Fonts at build time.
