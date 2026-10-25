# Team Nexora — Motion & UI Upgrade Plan (Audit + Plan)

## Audit of uploaded code (2026-10-23)
Base already had a partial motion attempt. Found and fixed:
- Hardcoded colours outside theme.css: spotlight rgba per-theme in index.css, CustomCursor rgba, Navbar theme swatch hex, useTheme meta hex map, Hero traffic-light Tailwind palette (rose/amber/emerald), Modal `bg-black/75`.
- CustomCursor animated `width`/`height` (banned by performance rules) and re-subscribed listeners on every visibility change.
- TiltCard set `will-change` permanently and used CSS `perspective` on the tilting element itself (does not tilt correctly).
- Button shimmer animated `left` (layout property).
- Duplicate animation deps: both `framer-motion` AND `motion` installed, `motion` imported nowhere — removed.
- No `useReducedMotion` wrapper by that name, no global `MotionConfig`, no preloader, filter chips had no shared-layout active pill, HowWeWork steps never "activated" as the line reached them.
- Customer/UI gaps: generic section headers with no eyebrow/hierarchy, no conversion CTA band, no trust/reassurance row in hero or form, services gave customers no "best for / includes" help to choose, form had no progress or character feedback, marquee could not be paused (a11y).

## Motion plan per section
| Section | Effect |
|---|---|
| Global | MotionConfig reducedMotion="user", theme-transition class (0.45s colour only), scroll progress spring bar, custom cursor (transform/scale only), session preloader ≤900ms, back-to-top |
| Hero | Orchestrated sequence: badge → word-by-word mask reveal headline → copy → CTAs → showcase card. Aurora orbs (var(--accent)/var(--primary)/var(--secondary)) + grid with mouse parallax. Magnetic primary CTA + shine sweep (transform). Trust row (reply in 24h, transparent process, you own everything). Animated showcase metrics. |
| Marquee | CSS transform marquee, hover pause + explicit pause/play button |
| Work | SectionHeader (clip reveal), filter chips with shared layoutId active pill, AnimatePresence popLayout reorder, thumbnail parallax 8–12% (scale 1.15 + y), hover "View case study" overlay, cursor="view" |
| Services | Stagger reveal, icon rotate/scale on hover, spotlight cards, per-service "Best for" + includes list + per-card CTA (customer decision help) |
| About | Mask heading, values slide-in from right (variety, not fade-up everywhere) |
| Team | Stagger + tilt (max 5deg) |
| Process | Scroll-drawn connecting line (scaleX + spring), each step activates (circle fills, card border) when line reaches it, vertical line on mobile |
| Contact | Focus underline bar (scaleX), label colour/float on focus, form progress bar, char counter, shake on error (transform x), submit loading→success/error morph, trust reassurance |
| Modal | Backdrop fade + spring scale/slide, staggered content, focus trap (kept) |
| CTA Band (new) | Customer-first conversion band before footer, gradient from theme vars, magnetic CTA |
| Navbar | Scroll progress, shared layoutId active pill + underline grow, theme popover, mobile menu stagger, theme swatches via local data-theme var (no hex) |
| Footer | Big wordmark, back-to-top |

## Rules honoured
- Colours: only CSS variables / color-mix(var(--…)) in components & index.css. Hex lives ONLY in src/styles/theme.css (the 4 theme definitions) — that is the single source of truth.
- Animate only transform & opacity. No width/height/top/left/box-shadow animation.
- Heavy effects gated by `(hover:hover) and (pointer:fine)` + reduced-motion via useMotionSafe / useReducedMotion.
- whileInView once:true everywhere. No Lenis (optional per brief; skipped to protect anchor links + scroll-spy — reason in final summary). No GSAP needed — framer-motion covered every effect.
