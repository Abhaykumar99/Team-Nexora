import { useState } from 'react';
import { Pause, Play } from 'lucide-react';

const WORDS = [
  'React 19', 'Full-Stack Web Apps', 'Tailwind CSS', 'UI/UX Design Systems',
  'E-commerce Stores', 'Brand Identity', 'Next.js', 'TypeScript',
  'SEO & Core Web Vitals', 'REST & GraphQL APIs',
];

/**
 * Marquee — transform-only infinite ticker.
 * Pauses on hover, and has an explicit pause/play button because
 * auto-playing motion longer than 5s must be pausable (WCAG 2.2.2).
 */
export default function Marquee() {
  const [paused, setPaused] = useState(false);
  const repeated = [...WORDS, ...WORDS];

  return (
    <div className="marq relative" data-paused={paused || undefined}>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-32 z-10" style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }} aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-32 z-10" style={{ background: 'linear-gradient(to left, var(--bg), transparent)' }} aria-hidden="true" />

      <div className="mt" aria-hidden="true">
        {repeated.map((word, index) => (
          <span key={index}>
            <span style={{ color: 'var(--secondary)', opacity: 0.65, fontSize: '0.8rem' }}>✦</span>
            <span>{word}</span>
          </span>
        ))}
      </div>
      <span className="sr-only">{WORDS.join(', ')}</span>

      <button
        type="button"
        onClick={() => setPaused((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full border border-border bg-surface text-fg-muted hover:text-fg hover:border-primary flex items-center justify-center transition-colors cursor-pointer"
        aria-label={paused ? 'Play scrolling ticker' : 'Pause scrolling ticker'}
      >
        {paused ? <Play size={13} /> : <Pause size={13} />}
      </button>
    </div>
  );
}
