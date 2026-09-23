import { BookOpen, Wallet, ClipboardCheck, GraduationCap, Image as ImageIcon } from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import Card, { CardHeader } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

export default function Dashboard({
  studentName = 'Student',
  registeredCoursesCount = 0,
  examsScheduledCount = 0,
  walletBalance = 0,
  activity = [],
}) {
  const firstName = studentName.split(' ')[0];

  return (
    <div className="space-y-6">
      {/* Welcome banner with picture placeholder */}
      <div className="relative overflow-hidden rounded-2xl border border-border card-shadow bg-ink">
        <div className="hero-texture absolute inset-0" aria-hidden="true" />
        <div className="relative flex items-center justify-between gap-6 px-7 py-8">
          <div>
            <p className="text-brass text-xs uppercase tracking-widest font-semibold mb-2">2025/2026 Academic Session</p>
            <h2 className="font-display text-2xl sm:text-3xl text-text-on-ink font-semibold">Welcome back, {firstName}</h2>
            <p className="text-text-on-ink/70 text-sm mt-2 max-w-md">
              Here's where things stand across your courses, exams and wallet this semester.
            </p>
          </div>
          
          <div className="hidden sm:flex w-40 h-28 shrink-0 rounded-xl border-2 border-dashed border-brass/50 bg-white/5 items-center justify-center text-brass/70">
            <div className="text-center">
              <Image>
                src="\src\app\"
              </Image>
              <span className="text-[10px] uppercase tracking-wide">Campus Photo</span>
            </div>
          </div>
        </div>
      </div>

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
