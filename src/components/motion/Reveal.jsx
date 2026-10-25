import { motion } from 'framer-motion';
import {
  useMotionSafe, safeVariant, viewportOnce,
  fadeUp, fadeIn, scaleIn, maskReveal, clipReveal, slideFromRight,
} from '../../lib/motion';

const VARIANTS = {
  'fade-up': fadeUp,
  'fade-in': fadeIn,
  scale: scaleIn,
  clip: clipReveal,
  'slide-right': slideFromRight,
};

/**
 * Reveal — one wrapper for every scroll entrance.
 * Types give variety per section (never the same fade-up everywhere):
 * 'mask' | 'clip' | 'fade-up' | 'fade-in' | 'scale' | 'slide-right'
 * Reduced motion collapses everything to a short opacity fade.
 *
 * Mask note: whileInView must observe the UNTRANSFORMED wrapper, not the
 * translated inner span — IntersectionObserver uses the post-transform box,
 * so a child pushed 110% down can sit outside the root bounds and never
 * trigger. Variants propagate wrapper → inner, so the wrapper observes
 * and the inner animates.
 */
export default function Reveal({
  children, type = 'fade-up', delay = 0, duration, className = '', as = 'div', ...props
}) {
  const { reducedMotion } = useMotionSafe();

  if (type === 'mask') {
    return (
      <motion.span
        className={`block overflow-hidden pb-[0.08em] -mb-[0.08em] ${className}`}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        {...props}
      >
        <motion.span
          className="block"
          variants={safeVariant(maskReveal, reducedMotion)}
          custom={{ delay, duration }}
        >
          {children}
        </motion.span>
      </motion.span>
    );
  }

  const MotionTag = motion[as] || motion.div;
  const variant = safeVariant(VARIANTS[type] || fadeUp, reducedMotion);

  return (
    <MotionTag
      className={className}
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      custom={{ delay, duration }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
