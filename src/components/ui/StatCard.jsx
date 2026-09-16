import Card from './Card';

export default function StatCard({ label, value, hint, icon: Icon, tone = 'ink' }) {
  const toneClass = { ink: 'text-ink', brass: 'text-brass', forest: 'text-forest', oxblood: 'text-oxblood', amber: 'text-amber' }[tone];

  return (
    <Card className="flex items-start justify-between">
      <div>
        <p className="text-xs uppercase tracking-wide text-text-secondary font-medium">{label}</p>
        <p className={`ledger-num text-2xl font-semibold mt-2 ${toneClass}`}>{value}</p>
        {hint && <p className="text-xs text-text-secondary mt-1">{hint}</p>}
      </div>
      {Icon && (
        <div className={`p-2 rounded-md bg-surface-raised ${toneClass}`}>
          <Icon size={18} />
        </div>
      )}
    </Card>
  );
}
