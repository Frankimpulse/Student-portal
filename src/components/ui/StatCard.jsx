import Card from './Card';

const TONE_BG = { ink: 'bg-ink text-text-on-ink', brass: 'bg-brass text-text-on-ink', forest: 'bg-forest text-text-on-ink', oxblood: 'bg-oxblood text-text-on-ink', amber: 'bg-amber text-text-on-ink' };

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
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${TONE_BG[tone]}`}>
          <Icon size={18} />
        </div>
      )}
    </Card>
  );
}
