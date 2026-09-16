import { BookOpen, Wallet, ClipboardCheck, GraduationCap } from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import Card, { CardHeader } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

export default function Dashboard({
  registeredCoursesCount = 0,
  examsScheduledCount = 0,
  walletBalance = 0,
  activity = [],
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Registered Courses" value={String(registeredCoursesCount)} hint="This semester" icon={BookOpen} tone="ink" />
        <StatCard label="Exams Registered" value={String(examsScheduledCount)} hint="Registered so far" icon={ClipboardCheck} tone="brass" />
        <StatCard label="Wallet Balance" value={`₦${walletBalance.toLocaleString()}`} hint="Available balance" icon={Wallet} tone="forest" />
        <StatCard label="CGPA" value="4.32" hint="As of last semester" icon={GraduationCap} tone="ink" />
      </div>

      <Card>
        <CardHeader title="Recent Activity" subtitle="Latest actions across your registry record" />
        {activity.length === 0 ? (
          <p className="text-sm text-text-secondary py-4 text-center">No activity yet — register a course, book an exam, or fund your wallet to see it here.</p>
        ) : (
          <ul className="divide-y divide-border">
            {activity.slice(0, 8).map((item) => (
              <li key={item.id} className="flex items-center justify-between py-3 gap-4">
                <div>
                  <span className="text-sm text-text-primary">{item.text}</span>
                  {item.timestamp && <p className="ledger-num text-xs text-text-secondary mt-0.5">{item.timestamp}</p>}
                </div>
                <Badge tone={item.tone}>{item.tag}</Badge>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
