import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppShell({
  active,
  onNavigate,
  studentName,
  studentId,
  title,
  subtitle,
  actions,
  children,
}) {
  return (
    <div className="flex h-screen bg-bg font-body">
      <Sidebar active={active} onNavigate={onNavigate} studentName={studentName} studentId={studentId} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar title={title} subtitle={subtitle} actions={actions} studentName={studentName} studentId={studentId} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
