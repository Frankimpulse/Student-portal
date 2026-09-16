const TONES = {
  neutral: 'bg-surface-raised text-text-secondary',
  success: 'bg-forest-soft text-forest',
  pending: 'bg-amber-soft text-amber',
  danger: 'bg-oxblood-soft text-oxblood',
  brass: 'bg-brass-soft text-brass',
};

export default function Badge({ children, tone = 'neutral', className = '' }) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold',
        TONES[tone],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}
