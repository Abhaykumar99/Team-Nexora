import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMotionSafe } from '../../lib/motion';

/**
 * CustomCursor — small follower ring.
 * Fixed 64px box; only `scale` + opacity animate (never width/height).
 * Grows over links/buttons, becomes a filled "View" disc over project cards.
 * Native cursor stays visible (safer usability). Desktop fine-pointer only.
 */
export default function CustomCursor() {
  const { allowComplexMotion } = useMotionSafe();
  const [type, setType] = useState('default'); // default | hover | view
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const x = useSpring(mouseX, { damping: 30, stiffness: 400, mass: 0.12 });
  const y = useSpring(mouseY, { damping: 30, stiffness: 400, mass: 0.12 });

  useEffect(() => {
    if (!allowComplexMotion) return undefined;
    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visibleRef.current) { visibleRef.current = true; setVisible(true); }
    };
    const onOver = (e) => {
      const t = e.target instanceof Element ? e.target : null;
      if (!t) return;
      if (t.closest('[data-cursor="view"]')) setType('view');
      else if (t.closest('a, button, select, input, textarea, [role="button"]')) setType('hover');
      else setType('default');
    };
    const onLeave = () => { visibleRef.current = false; setVisible(false); };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [allowComplexMotion, mouseX, mouseY]);

  if (!allowComplexMotion) return null;

  const scale = type === 'view' ? 1 : type === 'hover' ? 0.55 : 0.18;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[100] pointer-events-none flex items-center justify-center"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="w-16 h-16 rounded-full flex items-center justify-center border"
        style={{
          backgroundColor: type === 'view'
            ? 'var(--primary)'
            : 'color-mix(in srgb, var(--primary) 18%, transparent)',
          borderColor: 'var(--primary)',
        }}
        animate={{ scale }}
        transition={{ type: 'spring', stiffness: 380, damping: 26 }}
      >
        {type === 'view' && (
          <span className="font-heading text-[11px] font-bold tracking-widest uppercase" style={{ color: 'var(--primary-fg)' }}>
            View
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
