# Team Nexora — Official Website

Premium, customer-first website for **Team Nexora**, a digital studio building websites,
full-stack web applications, UI/UX design, brand identity and e-commerce for businesses,
startups and individuals.

React 19 · Vite · Tailwind CSS v4 · framer-motion. Four switchable studio themes,
agency-grade motion system, WCAG-conscious and fast on budget phones.

See **MOTION_PLAN.md** (audit + per-section motion plan) and **ANIMATION_UPGRADE.md**
(what changed, library decisions, QA results).

---

## 🚀 Getting Started

```bash
npm install     # Node.js 18+
npm run dev     # http://localhost:5173
npm run lint    # eslint — must stay clean
npm run build   # production bundle in dist/
npm run preview # preview the production build
```

Contact form (optional): copy `.env.example` to `.env` and set
`VITE_FORM_ENDPOINT` to your Formspree / Web3Forms endpoint.
**No fake success:** without an endpoint the form honestly tells the visitor
the message was not sent.

---

## ⭐ Do this first — make it yours (5 minutes)

1. **`src/config/site.js`** — fill `email`, `whatsapp`, `phone` and social links.
   Empty values are hidden automatically; while empty, the Contact section shows
   a placeholder note your customers should never see in production.
2. **`src/data/projects.js`** — replace the 4 placeholder projects with real work
   (schema documented at the top of the file).
3. **`src/data/team.js`** — replace placeholder members with your real team.
4. **`src/data/services.js`** — each service has `bestFor` + `includes` fields;
   keep them in plain customer language — they are what sells the service.

---

## 🎨 Themes — one rule

Four themes in `src/styles/theme.css`, switchable from the navbar, persisted in
`localStorage` (`nx-theme`):

| Theme | Character |
|---|---|
| `midnight-studio` (default) | Obsidian & neon lime |
| `daylight-studio` | Warm cream & coral |
| `retro-sunset` | Deep violet & sunset pink |
| `forest-tech` | Emerald & mint |

> **Rule: hex colours live ONLY in `theme.css`.** Every component and
> `index.css` uses CSS variables (`var(--primary)`, `color-mix(in srgb,
> var(--accent) …)`) so every colour, glow and animation is correct in all
> 4 themes automatically. Switching themes cross-fades colours in 0.45s.

Typography: Space Grotesk (headings) · Inter (body).

---

## 🎬 Motion system

Everything animates from **`src/lib/motion.js`** — never hardcode easings/durations:

- Tokens: `easeOutExpo`, `easeInOut`, `duration {fast .25, base .6, slow 1}`, `springs`
- Variants: `fadeUp`, `fadeIn`, `scaleIn`, `maskReveal`, `wordReveal`, `clipReveal`, `slideFromRight`, `staggerContainer`
- `useReducedMotion()` / `useMotionSafe()` — heavy effects only when
  `(hover:hover) and (pointer:fine)` and no reduced-motion
- Wrappers (`src/components/motion/`): `Reveal` (mask/clip/fade-up/scale/slide),
  `Magnetic`, `TiltCard` (max 7°), `CustomCursor` (lazy-loaded)
- Only `transform` + `opacity` are ever animated. Reveals use `whileInView once:true`.
- Project modal and custom cursor are code-split (`React.lazy`) — they load on demand.

Per-section plan and design rationale: **MOTION_PLAN.md**.

---

## 📂 Project Structure

```text
src/
├── lib/motion.js            # Shared motion system (tokens, variants, hooks)
├── components/
│   ├── motion/              # Reveal, Magnetic, TiltCard, CustomCursor
│   ├── Navbar.jsx           # Scroll progress, scroll-spy, theme popover, mobile menu
│   ├── ProjectModal.jsx     # Accessible case-study modal (focus trap, lazy-loaded)
│   ├── SectionHeader.jsx    # Eyebrow + benefit headline for every section
│   ├── Preloader.jsx        # First-visit intro (≤0.9s, session only)
│   ├── Marquee.jsx          # Ticker with pause/play button
│   ├── Button.jsx · Card.jsx · Badge.jsx
├── sections/
│   ├── Hero.jsx             # Word-mask headline, aurora parallax, trust row
│   ├── FeaturedProjects.jsx # Filter (layout-animated) + parallax cards + modal
│   ├── Services.jsx         # Best-for / includes / per-service CTA
│   ├── About.jsx · Team.jsx
│   ├── HowWeWork.jsx        # Scroll-drawn timeline, steps activate in sequence
│   ├── CtaBand.jsx          # Conversion band before Contact
│   ├── Contact.jsx          # Form progress, char counter, trust reassurance
│   └── Footer.jsx           # Giant wordmark, nav, services
├── hooks/                   # useTheme (4 themes), useScrollSpy, useFadeIn
├── data/                    # projects.js · services.js · team.js
├── config/site.js           # ⭐ contact, socials, nav — fill this in
└── styles/theme.css         # ⭐ the ONLY place hex colours may live
```

---

## ♿ Accessibility & Performance

- `prefers-reduced-motion` fully respected (global CSS + `MotionConfig` + JS gate):
  transforms drop away, marquee stops, content simply appears.
- Skip-to-content link, visible focus rings, focus traps (modal + mobile menu),
  Escape closes dialogs, marquee is pausable (WCAG 2.2.2).
- Verified with headless Chromium: 360 / 768 / 1440px, zero horizontal overflow,
  zero JS errors, all 4 themes, filters, modal and form validation — see
  **ANIMATION_UPGRADE.md** and `qa-screenshots/`.
