import { motion } from 'framer-motion';
import Reveal from '../components/motion/Reveal';
import { easeOutExpo } from '../lib/motion';

export default function About() {
  const values = [
    {
      title: 'Useful first',
      description: 'We build what solves your problem, not what merely looks complicated.',
    },
    {
      title: 'Clear communication',
      description: 'You know exactly what is happening at every stage of the design and engineering process.',
    },
    {
      title: 'Built to last',
      description: 'Clean code, modular architecture, and structured documentation so your product can scale reliably.',
    },
  ];

  return (
    <section id="about" className="section-band py-16 sm:py-24">
      <div className="section-container !py-0 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Left Column: Mission */}
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-2 border border-border text-[11px] font-bold uppercase tracking-[0.14em] text-primary mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" /> Who we are
          </span>
          <Reveal type="mask">
            <h2 className="text-3xl sm:text-4xl font-bold text-fg mb-4">
              A studio that treats your business <span className="text-primary">like its own</span>
            </h2>
          </Reveal>
          <Reveal type="fade-up" delay={0.1}>
            <p className="text-fg-muted text-[15px] sm:text-base leading-relaxed">
              We are a development team and digital studio that builds websites, web applications,
              and brand design for businesses, startups, and individuals. Our goal is simple: make
              useful digital products that are clear, fast, and easy to maintain.
            </p>
          </Reveal>
          <Reveal type="fade-up" delay={0.2}>
            <p className="text-fg-muted text-[15px] sm:text-base leading-relaxed mt-4">
              Every project we take on is an opportunity to solve real problems — not to chase trends
              or add complexity for its own sake.
            </p>
          </Reveal>
        </div>

        {/* Right Column: Values with accent border lines */}
        <div className="flex flex-col gap-5">
          {values.map((val, i) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: easeOutExpo }}
              className="val-card bg-surface/40 p-4 rounded-r-[12px] border-y border-r border-border/40 hover:border-accent/40 transition-colors"
            >
              <b className="block text-fg font-heading text-[16px] font-bold mb-1">
                {val.title}
              </b>
              <span className="text-fg-muted text-[14px] leading-relaxed">
                {val.description}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
