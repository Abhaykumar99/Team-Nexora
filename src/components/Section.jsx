import { useFadeIn } from '../hooks/useFadeIn';

/**
 * Reusable Section wrapper with title, subtitle, and fade-in animation.
 */
export default function Section({
  id,
  title,
  subtitle,
  children,
  className = '',
  ...props
}) {
  const ref = useFadeIn();

  return (
    <section id={id} className={`section-container ${className}`} {...props}>
      <div ref={ref} className="fade-in-section">
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && (
              <h2 className="text-3xl sm:text-4xl font-bold text-fg mb-3">{title}</h2>
            )}
            {subtitle && (
              <p className="text-fg-muted max-w-2xl mx-auto text-lg">{subtitle}</p>
            )}
            <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-primary" aria-hidden="true" />
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
