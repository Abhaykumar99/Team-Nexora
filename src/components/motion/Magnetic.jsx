import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMotionSafe, springs } from '../../lib/motion';

/**
 * Magnetic — child is gently pulled toward the cursor.
 * Transform-only, spring return. Disabled on touch + reduced motion.
 */
export default function Magnetic({ children, strength = 0.28, className = '' }) {
  const ref = useRef(null);
  const { allowComplexMotion } = useMotionSafe();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springs.magnetic);
  const springY = useSpring(y, springs.magnetic);

  if (!allowComplexMotion) return <span className={`inline-block ${className}`}>{children}</span>;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((e.clientX - (left + width / 2)) * strength);
    y.set((e.clientY - (top + height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.span>
  );
}
