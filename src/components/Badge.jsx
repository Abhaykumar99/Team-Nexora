/**
 * Small badge component for tags, tech stack, categories.
 * Variants: default, primary, secondary
 */
export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-surface-2 text-fg-muted border-border',
    primary: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-secondary/10 text-secondary border-secondary/20',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-md border ${
        variants[variant] || variants.default
      } ${className}`}
    >
      {children}
    </span>
  );
}
