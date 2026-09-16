/**
 * Tabs — used to switch between a section's Listing and Registration views.
 * tabs: [{ key, label }]
 */
export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 border-b border-border">
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={[
              'px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors',
              isActive
                ? 'border-brass text-ink'
                : 'border-transparent text-text-secondary hover:text-ink-soft',
            ].join(' ')}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
