/**
 * Reusable Card component with interactive cursor spotlight and elevation.
 * Variants: default, elevated, interactive
 */
export default function Card({
  children,
  variant = 'default',
  className = '',
  as: Tag = 'div',
  ...props
}) {
  const base = 'rounded-[14px] border border-border overflow-hidden bg-surface transition-all duration-300';

  const variants = {
    default: 'shadow-[var(--shadow-card)]',
    elevated: 'bg-surface-2 shadow-[var(--shadow-elevated)]',
    interactive:
      'card-spotlight shadow-[var(--shadow-card)]',
  };

  return (
    <Tag className={`${base} ${variants[variant] || variants.default} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
