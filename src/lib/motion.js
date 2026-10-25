import { useState, useEffect } from 'react';
import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';

/**
 * ─── Team Nexora — Shared Motion System ───
 * Every animation in the site comes from here so motion stays consistent.
 * Rules: animate transform + opacity only. Colours never live here.
 */

/* Easing tokens */
export const easeOutExpo = [0.16, 1, 0.3, 1];
export const easeInOut = [0.65, 0, 0.35, 1];
export const easeSmooth = [0.25, 0.1, 0.25, 1];

/* Duration tokens (seconds) */
export const duration = { fast: 0.25, base: 0.6, slow: 1.0 };

/* Spring presets */
export const springs = {
  snappy: { type: 'spring', stiffness: 350, damping: 25 },
  gentle: { type: 'spring', stiffness: 180, damping: 22 },
  bouncy: { type: 'spring', stiffness: 260, damping: 16 },
  magnetic: { type: 'spring', stiffness: 180, damping: 14, mass: 0.18 },
  progress: { stiffness: 120, damping: 26, restDelta: 0.001 },
};

/* Shared whileInView viewport — reveal once, never re-trigger */
export const viewportOnce = { once: true, margin: '-48px' };

const FINE_POINTER = '(hover: hover) and (pointer: fine)';
const REDUCED = '(prefers-reduced-motion: reduce)';

function useMedia(query, initial = false) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return initial;
    return window.matchMedia(query).matches;
  });
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    setMatches(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

/**
 * useReducedMotion wrapper (spec): if the user prefers reduced motion,
 * callers must drop transforms and keep a simple opacity fade (or nothing).
 * Combines framer-motion's hook with a live matchMedia listener so a
 * system-level change mid-session is honoured immediately.
 */
export function useReducedMotion() {
  const framer = useFramerReducedMotion();
  const media = useMedia(REDUCED, false);
  return Boolean(framer || media);
}

/**
 * useMotionSafe — central gate for heavy effects.
 * allowComplexMotion is true only on fine-pointer, non-reduced devices.
 * Budget Android / touch / reduced-motion get light reveals only.
 */
export function useMotionSafe() {
  const reducedMotion = useReducedMotion();
  const finePointer = useMedia(FINE_POINTER, false);
  const isTouch = !finePointer;
  return {
    reducedMotion,
    isTouch,
    isFinePointer: finePointer,
    allowComplexMotion: finePointer && !reducedMotion,
  };
}

/* When reduced, variants collapse to a plain opacity fade. */
export function safeVariant(variant, reducedMotion) {
  if (!reducedMotion) return variant;
  return {
    hidden: { opacity: 0 },
    visible: (custom = {}) => ({
      opacity: 1,
      transition: { duration: duration.fast, delay: custom.delay ?? 0 },
    }),
  };
}

/* ─── Reusable variants ─── */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom = {}) => ({
    opacity: 1,
    y: 0,
    transition: { duration: custom.duration ?? duration.base, delay: custom.delay ?? 0, ease: easeOutExpo },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (custom = {}) => ({
    opacity: 1,
    transition: { duration: custom.duration ?? duration.base, delay: custom.delay ?? 0, ease: easeSmooth },
  }),
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (custom = {}) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: custom.duration ?? duration.base, delay: custom.delay ?? 0, ease: easeOutExpo },
  }),
};

/* For text inside an overflow-hidden line wrapper */
export const maskReveal = {
  hidden: { y: '110%' },
  visible: (custom = {}) => ({
    y: '0%',
    transition: { duration: custom.duration ?? 0.85, delay: custom.delay ?? 0, ease: easeOutExpo },
  }),
};

/* Word-by-word headline word (parent staggers) */
export const wordReveal = {
  hidden: { y: '115%', rotate: 3 },
  visible: {
    y: '0%',
    rotate: 0,
    transition: { duration: 0.8, ease: easeOutExpo },
  },
};

export const clipReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
  visible: (custom = {}) => ({
    clipPath: 'inset(0 0% 0 0)',
    opacity: 1,
    transition: { duration: custom.duration ?? 0.8, delay: custom.delay ?? 0, ease: easeOutExpo },
  }),
};

export const slideFromRight = {
  hidden: { opacity: 0, x: 28 },
  visible: (custom = {}) => ({
    opacity: 1,
    x: 0,
    transition: { duration: custom.duration ?? duration.base, delay: custom.delay ?? 0, ease: easeOutExpo },
  }),
};

export const staggerContainer = (staggerChildren = 0.09, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren, delayChildren } },
});
