import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { easeOutExpo, useReducedMotion } from '../lib/motion';

/**
 * Preloader — first visit of the session only, max ~900ms.
 * Fixed overlay (zero CLS — content space is untouched underneath).
 * Skipped entirely for reduced motion.
 */
export default function Preloader() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined') return false;
    try { return !sessionStorage.getItem('nx-visited'); } catch { return false; }
  });

  useEffect(() => {
    if (!show) return undefined;
    try { sessionStorage.setItem('nx-visited', '1'); } catch { /* private mode */ }
    const t = setTimeout(() => setShow(false), reduced ? 60 : 880);
    return () => clearTimeout(t);
  }, [show, reduced]);

  return (
    <AnimatePresence>
      {show && !reduced && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-5"
          style={{ backgroundColor: 'var(--bg)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: easeOutExpo }}
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: easeOutExpo }}
            className="w-14 h-14 rounded-2xl flex items-center justify-center font-heading font-black text-2xl shadow-lg"
            style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-fg)' }}
          >
            N
          </motion.div>
          <div className="font-heading font-bold text-lg tracking-tight text-fg">
            Team <span className="text-primary">Nexora</span>
          </div>
          <div className="w-36 h-[3px] rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
            <motion.div
              className="h-full w-full origin-left rounded-full"
              style={{ backgroundColor: 'var(--primary)' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.75, ease: easeOutExpo }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
