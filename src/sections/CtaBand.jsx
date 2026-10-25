import { ArrowRight, Clock3, MessagesSquare, ShieldCheck } from 'lucide-react';
import Button from '../components/Button';
import Magnetic from '../components/motion/Magnetic';
import Reveal from '../components/motion/Reveal';

/**
 * CtaBand — conversion moment right before the footer.
 * The customer has seen work, services and process — this answers
 * "why start now, and what happens when I click?" in one glance.
 */
export default function CtaBand() {
  return (
    <section aria-label="Start a project with Team Nexora" className="section-container">
      <Reveal type="scale">
        <div
          className="relative overflow-hidden rounded-[24px] border border-border px-6 py-12 sm:px-12 sm:py-16 text-center"
          style={{
            background:
              'radial-gradient(720px 340px at 18% 0%, color-mix(in srgb, var(--accent) 26%, transparent), transparent 65%),' +
              'radial-gradient(640px 320px at 85% 110%, color-mix(in srgb, var(--primary) 20%, transparent), transparent 65%),' +
              'var(--surface)',
          }}
        >
          <Reveal type="mask">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.7rem] font-bold text-fg leading-[1.12] tracking-tight max-w-2xl mx-auto">
              Have an idea? Let&apos;s turn it into something <span className="text-primary">your customers love.</span>
            </h2>
          </Reveal>
          <Reveal type="fade-up" delay={0.12}>
            <p className="text-fg-muted text-[15px] sm:text-base leading-relaxed max-w-xl mx-auto mt-4">
              Tell us what you want to build. You&apos;ll get an honest scope, a clear price direction and a plan — no pressure, no obligation.
            </p>
          </Reveal>
          <Reveal type="fade-up" delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Magnetic strength={0.25}>
                <Button href="#contact" size="lg" className="rounded-full shadow-lg">
                  Start Your Project <ArrowRight size={18} />
                </Button>
              </Magnetic>
              <Button href="#work" variant="outline" size="lg" className="rounded-full">
                See Our Work First
              </Button>
            </div>
          </Reveal>
          <Reveal type="fade-in" delay={0.3}>
            <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[13px] text-fg-muted list-none p-0 m-0">
              <li className="inline-flex items-center gap-1.5"><Clock3 size={14} className="text-primary" /> Reply within 24 business hours</li>
              <li className="inline-flex items-center gap-1.5"><MessagesSquare size={14} className="text-primary" /> Free, no-obligation discussion</li>
              <li className="inline-flex items-center gap-1.5"><ShieldCheck size={14} className="text-primary" /> Your idea stays yours — always</li>
            </ul>
          </Reveal>
        </div>
      </Reveal>
    </section>
  );
}
