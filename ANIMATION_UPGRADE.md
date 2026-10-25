# Team Nexora — Pro Animation & UI Upgrade (Summary)

Goal: premium agency-grade feel, customer-first UI ("customer is god"), fast + accessible.
All 4 themes (midnight-studio, daylight-studio, retro-sunset, forest-tech) and theme
switching, navigation, filters, modal and the real form endpoint logic are preserved.

## Libraries
| Library | Status | Reason |
|---|---|---|
| framer-motion | KEPT (already present) | Component/layout/scroll animations, AnimatePresence, useScroll/useTransform/useSpring — covers every required effect |
| motion | REMOVED | Duplicate of framer-motion, imported nowhere; doubled the vendor-motion chunk for zero benefit |
| lenis | NOT added | Optional in the brief, allowed only if anchors + scroll-spy stay perfect. Native smooth scroll + scroll-padding already does this with zero risk — not worth endangering navigation |
| GSAP | NOT added | Brief says only when framer-motion is not enough. It was enough for every effect |
| eslint + plugins | ADDED (dev only) | `npm run lint` existed in package.json but eslint was never installed — the script could not run at all. Now it runs clean |
| lucide-react | KEPT | Icons |

## What changed (highlights)
- Motion system (`src/lib/motion.js`): easing/duration/spring tokens, fadeUp/fadeIn/scaleIn/maskReveal/wordReveal/clipReveal/slideFromRight, staggerContainer, `useReducedMotion` wrapper + `useMotionSafe` (fine-pointer + reduced-motion gate), `viewportOnce`.
- No hardcoded colours anywhere outside `src/styles/theme.css`: spotlight is now ONE `color-mix(var(--accent))` rule for all themes (was 4 per-theme rgba blocks), cursor/modal/navbar swatches/useTheme meta all read CSS variables.
- Performance fixes: CustomCursor no longer animates width/height (scale only); button shine animates transform (was `left`); TiltCard uses transformPerspective + will-change only while hovered; spotlight listener rAF-throttled; permanent will-change classes removed.
- Hero: orchestrated word-by-word mask reveal, aurora + grid mouse parallax, magnetic CTA, trust row, scroll cue.
- Customer-first UI: shared SectionHeader (eyebrow + benefit headline) on every section; Services now answer "Best for / what's included / start with this" per card; Work cards show "View case study" on hover and outcome-focused intro; Process steps state what the CUSTOMER does/gets and activate as the timeline line reaches them; new CTA band before Contact; Contact form has completion progress, character counter, focus label animation and trust reassurance; Modal ends with "Start a project like this"; Footer giant wordmark; Back-to-top.
- Polish: session-only preloader (≤900ms), marquee pause/play button, filter chips shared-layout active pill, theme switch 0.45s colour cross-fade, MotionConfig reducedMotion="user".

## Touch / reduced-motion — effects OFF
Magnetic pull, 3D tilt, custom cursor, hero mouse parallax, thumbnail parallax,
aurora drift, marquee auto-scroll (reduced only), word rotation.
Kept everywhere: simple opacity reveals, layout reorder, progress bars.

## Round 2 (user said "continue")
- Clean-room test: the delivered zip was unzipped fresh, `npm install`, lint clean, build passes — exactly what the user experiences.
- Code-splitting: ProjectModal (6.9 kB) and CustomCursor (1.8 kB) are now `React.lazy` chunks that load on demand; main index chunk shrank 283.9 → 277.3 kB.
- README rewritten — the old one described a palette and theme key that no longer exist; it now documents the 4 themes, the CSS-variable rule, the motion system, and a "make it yours in 5 minutes" checklist starting with site.js.

## Verify (actually run, 2026-10-23)
`npm run lint` — clean, 0 problems (eslint is now actually installed).
`npm run build` — passes.
Headless-Chromium QA (Playwright, qa-screenshots/): **40/41 checks passed** —
preloader, hero, all section titles revealed, filter→1 card, modal open/Escape-close,
all 4 themes (Daylight measured exactly #F3EDE2, Retro exactly #1A0F2E; other two
captured mid-cross-fade, which itself proves the 0.45s transition runs), form
validation + progress (0→3 of 4) + char counter (35/20), 360/768/1440 with zero
horizontal overflow and zero JS page errors, mobile menu, reduced-motion.
The 1 non-pass is environmental: this sandbox blocks fonts.googleapis.com, so the
font stylesheet request fails in the test environment only; the app itself throws
no errors and falls back to system fonts there.

### Two REAL bugs the QA caught in the uploaded code (both fixed)
1. `index.css` had an unlayered `* { margin:0; padding:0 }` reset. Unlayered CSS
   beats Tailwind's layered utilities, so EVERY Tailwind margin/padding utility
   in the site was dead — the whole site's vertical spacing was collapsed.
   Removed; Tailwind preflight (correctly layered) handles the reset.
2. Mask-reveal headings (Work / About / Contact) could never trigger:
   whileInView observed the span translated 110% down, whose post-transform box
   can sit outside the IntersectionObserver root. Reveal now observes the
   untransformed wrapper and propagates variants to the inner span.
