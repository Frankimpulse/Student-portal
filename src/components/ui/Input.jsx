export default function Input({ label, hint, error, className = '', id, ...props }) {
  const inputId = id || props.name;
  return (
    <label className="block" htmlFor={inputId}>
      {label && (
        <span className="block text-sm font-medium text-text-primary mb-1.5">{label}</span>
      )}
      <input
        id={inputId}
        className={[
          'w-full rounded-md border bg-surface px-3 py-2 text-sm text-text-primary',
          'placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-brass',
          error ? 'border-oxblood' : 'border-border',
          className,
        ].join(' ')}
        {...props}
      />
      {error ? (
        <span className="block text-xs text-oxblood mt-1">{error}</span>
      ) : hint ? (
        <span className="block text-xs text-text-secondary mt-1">{hint}</span>
      ) : null}
    </label>
  );
}
