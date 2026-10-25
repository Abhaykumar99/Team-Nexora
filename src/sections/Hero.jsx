import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Button from '../components/Button';
import Magnetic from '../components/motion/Magnetic';
import {
  useMotionSafe, easeOutExpo, wordReveal, staggerContainer, duration,
} from '../lib/motion';
import {
  ArrowRight, Sparkles, CheckCircle2, Zap, ShieldCheck, Layers, ChevronDown, Clock3, Handshake, KeyRound,
} from 'lucide-react';

const LINE_1 = ['We', 'Build', 'Digital', 'Experiences'];
const LINE_2 = ['That', 'Move', 'Businesses', 'Forward.'];

function WordLine({ words, className = '' }) {
  return (
    <span className="block" aria-hidden="true">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-top">
          <motion.span variants={wordReveal} className={`inline-block ${className}`}>
            {word}
          </motion.span>
          {i < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
        </span>
      ))}
    </span>
  );
}

const fadeItem = (reduced) => ({
  hidden: { opacity: 0, y: reduced ? 0 : 22 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.base, ease: easeOutExpo } },
});

export default function Hero() {
  const containerRef = useRef(null);
  const { allowComplexMotion, reducedMotion } = useMotionSafe();
  const item = fadeItem(reducedMotion);

  /* Mouse parallax — background moves a few px, content stays calm */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 45, damping: 18 });
  const sy = useSpring(my, { stiffness: 45, damping: 18 });
  const orbX = useTransform(sx, (v) => v * 26);
  const orbY = useTransform(sy, (v) => v * 20);
  const gridX = useTransform(sx, (v) => v * -10);
  const gridY = useTransform(sy, (v) => v * -8);

  const handleMouseMove = (e) => {
    if (!allowComplexMotion) return;
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden"
    >
      {/* ── Aurora background (theme vars only, transform-only drift) ── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div style={{ x: orbX, y: orbY }} className="absolute inset-0">
          <div
            className="aurora-orb absolute -top-36 left-1/2 -translate-x-1/2 w-[720px] h-[480px] rounded-full blur-[130px]"
            style={{ background: 'radial-gradient(ellipse, var(--accent) 0%, transparent 68%)', opacity: 0.22 }}
          />
          <div
            className="aurora-orb-slow absolute top-1/3 -left-24 w-[460px] h-[460px] rounded-full blur-[110px]"
            style={{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)', opacity: 0.15 }}
          />
          <div
            className="aurora-orb absolute -bottom-40 right-0 w-[380px] h-[380px] rounded-full blur-[110px]"
            style={{ background: 'radial-gradient(circle, var(--secondary) 0%, transparent 70%)', opacity: 0.1 }}
          />
        </motion.div>
        <motion.div
          style={{ x: gridX, y: gridY }}
          className="absolute -inset-6 opacity-[0.04]"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(var(--fg-muted) 1px, transparent 1px), linear-gradient(90deg, var(--fg-muted) 1px, transparent 1px)',
              backgroundSize: '56px 56px',
              maskImage: 'radial-gradient(ellipse 75% 60% at 50% 38%, black, transparent)',
              WebkitMaskImage: 'radial-gradient(ellipse 75% 60% at 50% 38%, black, transparent)',
            }}
          />
        </motion.div>
      </div>

      <div className="section-container !py-0 relative z-10 text-center">
        {/* One orchestrated sequence — badge, headline, copy, CTAs, proof, card */}
        <motion.div
          variants={staggerContainer(0.09, 0.08)}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          <motion.div variants={item} className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-2/80 backdrop-blur border border-border text-xs sm:text-sm font-medium text-fg-muted">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping" />
                <span className="relative inline-flex rounded-full w-2 h-2 bg-primary" />
              </span>
              <Sparkles size={14} className="text-primary" />
              <span>Accepting new projects — websites, web apps &amp; brands</span>
            </div>
          </motion.div>

          <h1
            className="text-[2.55rem] leading-[1.06] sm:text-6xl md:text-7xl font-bold text-fg tracking-tight mb-6"
            aria-label="We Build Digital Experiences That Move Businesses Forward."
          >
            <motion.span variants={staggerContainer(0.07, 0.05)} className="block">
              <WordLine words={LINE_1} />
            </motion.span>
            <motion.span variants={staggerContainer(0.07, 0.32)} className="block">
              <WordLine words={LINE_2} className="text-primary" />
            </motion.span>
          </h1>

          <motion.p variants={item} className="text-lg sm:text-xl text-fg-muted max-w-2xl mx-auto mb-9 leading-relaxed">
            Your customers judge your business in seconds. We design and build fast, beautiful
            digital products that earn their trust — and turn visits into enquiries, orders and growth.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-4">
            <Magnetic strength={0.25}>
              <Button href="#contact" size="lg" className="rounded-full shadow-lg">
                Start Your Project <ArrowRight size={18} />
              </Button>
            </Magnetic>
            <Button href="#work" variant="outline" size="lg" className="rounded-full bg-surface/50 backdrop-blur-sm">
              See Our Work
            </Button>
          </motion.div>

          {/* Trust row — promises the site itself already makes, nothing invented */}
          <motion.ul variants={item} className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-fg-muted list-none p-0 m-0">
            <li className="inline-flex items-center gap-1.5"><Clock3 size={14} className="text-primary" /> Reply within 24 hours</li>
            <li className="inline-flex items-center gap-1.5"><Handshake size={14} className="text-primary" /> Transparent process, no surprises</li>
            <li className="inline-flex items-center gap-1.5"><KeyRound size={14} className="text-primary" /> You own your site &amp; code</li>
          </motion.ul>

          {/* Showcase card */}
          <motion.div
            variants={item}
            className="w-full max-w-3xl mt-14 rounded-2xl border border-border bg-surface/85 backdrop-blur-xl p-5 sm:p-7 shadow-2xl text-left relative overflow-hidden"
          >
            <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg, var(--primary), var(--accent), var(--secondary))' }} />
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--error)', opacity: 0.85 }} />
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--secondary)', opacity: 0.85 }} />
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--success)', opacity: 0.85 }} />
                <span className="ml-2 text-xs font-mono text-fg-muted/80 hidden sm:inline">nexora-studio.app/overview</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-primary font-medium">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Production Ready
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-5">
              {[
                { icon: Zap, tone: 'text-primary', label: 'Performance', value: 'Fast by default', sub: 'Sub-second loads your visitors feel' },
                { icon: Layers, tone: 'text-secondary', label: 'Full-Stack', value: 'End-to-End', sub: 'Web apps, APIs, stores & dashboards' },
                { icon: ShieldCheck, tone: 'text-accent', label: 'Quality', value: 'WCAG AA', sub: 'Accessible, tested, clean code' },
              ].map((m) => (
                <div key={m.label} className="p-3.5 rounded-xl bg-surface-2 border border-border">
                  <div className={`flex items-center gap-2 ${m.tone} text-xs font-semibold uppercase tracking-wider mb-1`}>
                    <m.icon size={14} /> {m.label}
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-heading text-fg">{m.value}</div>
                  <div className="text-xs text-fg-muted mt-0.5">{m.sub}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/60">
              <span className="text-xs text-fg-muted font-medium inline-flex items-center gap-1"><CheckCircle2 size={13} className="text-primary" /> Core Stack:</span>
              {['React 19', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Node.js', 'Figma Systems'].map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-md border border-border bg-surface-2 text-fg font-medium">{t}</span>
              ))}
            </div>
          </motion.div>

          <motion.a
            variants={item}
            href="#work"
            className="mt-10 inline-flex flex-col items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-fg-muted hover:text-primary transition-colors"
            aria-label="Scroll down to see our work"
          >
            Explore
            <motion.span animate={reducedMotion ? undefined : { y: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
              <ChevronDown size={16} />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
