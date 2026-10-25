import { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import Reveal from '../components/motion/Reveal';
import { useMotionSafe } from '../lib/motion';
import { MessagesSquare, PenTool, Code2, Rocket } from 'lucide-react';

const steps = [
  {
    step: '01', icon: MessagesSquare, title: 'Discuss Requirements',
    description: 'We learn your goals, audience, timeline and constraints upfront.',
    yours: 'You do: one honest conversation. We do: listening, not selling.',
  },
  {
    step: '02', icon: PenTool, title: 'Plan and Design',
    description: 'We map the architecture, create wireframes, and design the look and flow.',
    yours: 'You see the design before we build — and approve it.',
  },
  {
    step: '03', icon: Code2, title: 'Develop and Test',
    description: 'We build in clean modular stages and test thoroughly across real devices.',
    yours: 'You get progress updates at every stage. No silence, no surprises.',
  },
  {
    step: '04', icon: Rocket, title: 'Launch and Support',
    description: 'We deploy to production, then stay on for optimizations and updates.',
    yours: 'You launch with us beside you — support continues after go-live.',
  },
];

function StepCard({ item, index, activeCount }) {
  const active = index < activeCount;
  const Icon = item.icon;
  return (
    <Reveal type="fade-up" delay={index * 0.08} className="h-full">
      <div
        className={`card-spotlight bg-surface border rounded-[16px] p-6 flex flex-col h-full transition-colors duration-500 ${
          active ? 'border-primary/70' : 'border-border'
        }`}
      >
        <motion.div
          animate={{ scale: active ? 1 : 0.92, opacity: active ? 1 : 0.55 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="w-12 h-12 rounded-full border-2 flex items-center justify-center font-heading font-bold text-sm mb-4 relative z-10"
          style={{
            borderColor: 'var(--primary)',
            backgroundColor: active ? 'var(--primary)' : 'var(--surface)',
            color: active ? 'var(--primary-fg)' : 'var(--primary)',
          }}
        >
          {item.step}
        </motion.div>
        <div className="flex items-center gap-2 mb-2">
          <Icon size={17} className="text-primary" />
          <h3 className="text-lg font-bold text-fg font-heading">{item.title}</h3>
        </div>
        <p className="text-fg-muted text-[14px] leading-relaxed">{item.description}</p>
        <p className="mt-3.5 pt-3.5 border-t border-border/70 text-[13px] leading-relaxed text-fg">
          {item.yours}
        </p>
      </div>
    </Reveal>
  );
}

export default function HowWeWork() {
  const containerRef = useRef(null);
  const { allowComplexMotion, reducedMotion } = useMotionSafe();
  const [activeCount, setActiveCount] = useState(reducedMotion ? steps.length : 0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 78%', 'end 55%'],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 25, restDelta: 0.001 });

  /* A step activates when the drawn line reaches it */
  useMotionValueEvent(smoothProgress, 'change', (v) => {
    if (reducedMotion) return;
    setActiveCount(Math.min(steps.length, Math.max(0, Math.floor(v * steps.length + 0.35))));
  });

  return (
    <section id="process" ref={containerRef} className="section-container relative">
      <SectionHeader
        eyebrow="How we work"
        title="A process with"
        highlight="no surprises"
        description="Four clear steps from first call to launch. You'll always know what is happening, what comes next, and what we need from you — which is very little."
        reveal="clip"
      />

      {/* Timeline track — line draws with scroll, a dot lights as each step activates.
          Standalone track (not threaded through cards) so alignment is exact at any width. */}
      <div aria-hidden="true" className="hidden lg:block relative mx-[12.5%] mb-10">
        <div className="h-[2px] w-full rounded-full" style={{ backgroundColor: 'var(--border)' }} />
        {allowComplexMotion && (
          <motion.div
            style={{ scaleX: smoothProgress, backgroundColor: 'var(--primary)' }}
            className="h-[2px] w-full rounded-full origin-left -mt-[2px]"
          />
        )}
        {steps.map((s2, i) => (
          <motion.span
            key={s2.step}
            animate={{ scale: i < activeCount ? 1 : 0.6, opacity: i < activeCount ? 1 : 0.4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="absolute top-1/2 w-3 h-3 rounded-full border-2"
            style={{
              left: `${(i / (steps.length - 1)) * 100}%`,
              marginLeft: '-6px',
              marginTop: '-5px',
              borderColor: 'var(--primary)',
              backgroundColor: i < activeCount ? 'var(--primary)' : 'var(--bg)',
            }}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
        {steps.map((item, index) => (
          <StepCard key={item.title} item={item} index={index} activeCount={activeCount} />
        ))}
      </div>
    </section>
  );
}
