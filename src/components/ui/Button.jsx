const VARIANTS = {
  primary: 'bg-brass text-text-on-ink hover:brightness-110 border border-brass',
  brass: 'bg-brass text-text-on-ink hover:brightness-110 border border-brass',
  outline: 'bg-surface text-text-primary border border-border-strong hover:bg-surface-raised',
  ghost: 'bg-transparent text-text-secondary hover:bg-surface-raised border border-transparent',
  danger: 'bg-surface text-oxblood border border-oxblood hover:bg-oxblood-soft',
};

const SIZES = {
  sm: 'text-sm px-3.5 py-1.5',
  md: 'text-sm px-4.5 py-2.5',
  lg: 'text-base px-5 py-3',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  disabled = false,
  className = '',
  ...props
}) {
  return (
    <button
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-full font-semibold',
        'transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        VARIANTS[variant],
        SIZES[size],
        className,
      ].join(' ')}
      {...props}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}
