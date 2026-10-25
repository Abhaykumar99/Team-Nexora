/**
 * Reusable Button component with smooth shimmer and tactile interaction.
 * Variants: primary, secondary, outline, ghost
 * Sizes: sm, md, lg
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  disabled = false,
  type = 'button',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold transition-[transform,opacity,background-color,border-color,color] duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-center select-none';

  const variants = {
    primary:
      'bg-primary text-primary-fg border border-primary hover:opacity-90 active:scale-95 btn-shimmer font-semibold shadow-sm',
    secondary:
      'bg-surface-2 text-fg border border-border hover:bg-border/60 hover:text-fg active:scale-95',
    outline:
      'bg-transparent border border-border text-fg hover:bg-surface-2 active:scale-95',
    ghost:
      'text-fg-muted hover:text-fg hover:bg-surface-2 active:scale-95',
  };

  const sizes = {
    sm: 'px-3.5 py-2 text-sm rounded-[10px]',
    md: 'px-5 py-2.5 text-[15px] rounded-[10px]',
    lg: 'px-6 py-3 text-base rounded-[12px]',
  };

  const classes = `${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
