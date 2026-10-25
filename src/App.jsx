import { useEffect, useState, lazy, Suspense } from 'react';
import { MotionConfig, AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useTheme } from './hooks/useTheme';
import Navbar from './components/Navbar';
import Marquee from './components/Marquee';
import Preloader from './components/Preloader';
import Hero from './sections/Hero';
import FeaturedProjects from './sections/FeaturedProjects';
import Services from './sections/Services';
import About from './sections/About';
import Team from './sections/Team';
import HowWeWork from './sections/HowWeWork';
import Contact from './sections/Contact';
import CtaBand from './sections/CtaBand';
import Footer from './sections/Footer';
/* Lazy: cursor is a desktop-only enhancement, never blocks first paint */
const CustomCursor = lazy(() => import('./components/motion/CustomCursor'));
import { easeOutExpo } from './lib/motion';

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#home"
          initial={{ opacity: 0, y: 14, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.9 }}
          transition={{ duration: 0.25, ease: easeOutExpo }}
          className="fixed bottom-5 right-5 z-[90] w-11 h-11 rounded-full flex items-center justify-center shadow-xl border border-border"
          style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-fg)' }}
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const { theme, setTheme, themes } = useTheme();

  /* Cursor-following spotlight for .card-spotlight — rAF-throttled,
     transform/vars only, no layout work per frame. */
  useEffect(() => {
    let raf = 0;
    let lastEvent = null;
    const apply = () => {
      raf = 0;
      const card = lastEvent?.target?.closest?.('.card-spotlight');
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${lastEvent.clientX - rect.left}px`);
        card.style.setProperty('--my', `${lastEvent.clientY - rect.top}px`);
      }
    };
    const onMove = (e) => {
      lastEvent = e;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    /* reducedMotion="user" — framer-motion globally honours the OS setting */
    <MotionConfig reducedMotion="user">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Preloader />
      <Suspense fallback={null}>
        <CustomCursor />
      </Suspense>
      <Navbar theme={theme} setTheme={setTheme} themes={themes} />
      <main id="main-content">
        <Hero />
        <Marquee />
        <FeaturedProjects />
        <Services />
        <About />
        <Team />
        <HowWeWork />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </MotionConfig>
  );
}
