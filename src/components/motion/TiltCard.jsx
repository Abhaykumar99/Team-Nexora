import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMotionSafe } from '../../lib/motion';

/**
 * TiltCard — subtle 3D tilt (max 6–8°) with perspective.
 * transformPerspective does the perspective correctly (CSS `perspective`
 * on the tilting element itself does nothing). will-change is applied
 * only while the pointer is actually over the card.
 * Disabled on touch + reduced motion.
 */
export default function TiltCard({ children, maxTilt = 7, className = '', ...props }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const { allowComplexMotion } = useMotionSafe();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const spring = { stiffness: 220, damping: 20 };
  const smoothX = useSpring(rotateX, spring);
  const smoothY = useSpring(rotateY, spring);

  if (!allowComplexMotion) return <div className={className} {...props}>{children}</div>;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 2 * maxTilt);
    rotateX.set(-py * 2 * maxTilt);
    ref.current.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    ref.current.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };
  const reset = () => { rotateX.set(0); rotateY.set(0); setActive(false); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={reset}
      style={{
        rotateX: smoothX,
        rotateY: smoothY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
        willChange: active ? 'transform' : 'auto',
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
