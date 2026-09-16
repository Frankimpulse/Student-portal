export default function Card({ children, className = '', padded = true, ...props }) {
  return (
    <div
      className={[
        'card-shadow bg-surface border border-border rounded-2xl',
        padded ? 'p-5' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="font-display font-semibold text-lg text-text-primary">{title}</h3>
        {subtitle && <p className="text-sm text-text-secondary mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
