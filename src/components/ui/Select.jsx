export default function Select({ label, hint, error, options = [], className = '', id, ...props }) {
  const selectId = id || props.name;
  return (
    <label className="block" htmlFor={selectId}>
      {label && (
        <span className="block text-sm font-medium text-text-primary mb-1.5">{label}</span>
      )}
      <select
        id={selectId}
        className={[
          'w-full rounded-md border bg-surface px-3 py-2 text-sm text-text-primary',
          'focus:outline-none focus:ring-2 focus:ring-brass',
          error ? 'border-oxblood' : 'border-border',
          className,
        ].join(' ')}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error ? (
        <span className="block text-xs text-oxblood mt-1">{error}</span>
      ) : hint ? (
        <span className="block text-xs text-text-secondary mt-1">{hint}</span>
      ) : null}
    </label>
  );
}
