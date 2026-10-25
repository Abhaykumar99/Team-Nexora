import Reveal from './motion/Reveal';

/**
 * SectionHeader — consistent, customer-first section intro.
 * Eyebrow (what this is) → Mask-reveal title → plain-language benefit line.
 * Every section uses it so the page reads like one designed system,
 * but reveal types alternate (mask / clip) for variety.
 */
export default function SectionHeader({
  eyebrow, title, highlight, description, align = 'left', reveal = 'mask',
}) {
  const alignCls = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';
  return (
    <div className={`flex flex-col gap-3 mb-10 sm:mb-12 max-w-2xl ${alignCls}`}>
      {eyebrow && (
        <Reveal type="fade-up">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-2 border border-border text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal type={reveal}>
        <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-fg leading-[1.12] tracking-tight">
          {title} {highlight && <span className="text-primary">{highlight}</span>}
        </h2>
      </Reveal>
      {description && (
        <Reveal type="fade-up" delay={0.12}>
          <p className="text-fg-muted text-[15px] sm:text-base leading-relaxed max-w-[58ch]">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
