"use client";

import { useState } from 'react';
import { ThemeProvider } from './theme/ThemeProvider';
import AppShell from './components/layout/AppShell';
import Tabs from './components/ui/Tabs';
import HelpButton from './components/ui/HelpButton';
import Toast from './components/ui/Toast';
import SemesterGate from './components/ui/SemesterGate';

import Dashboard from './pages/Dashboard';
import CourseListing from './pages/CourseListing';
import CourseRegistration from './pages/CourseRegistration';
import ExamListing from './pages/ExamListing';
import ExamRegistration from './pages/ExamRegistration';
import WalletLedger from './pages/WalletLedger';
import WalletFunding from './pages/WalletFunding';
import Profile from './pages/Profile';
import Schedules from './pages/Schedules';
import AcademicCalendar from './pages/AcademicCalendar';

const SECTION_META = {
  dashboard: { title: 'Dashboard', subtitle: 'Welcome back' },
  courses: { title: 'Course Registration', subtitle: 'Manage your course enrollments' },
  exams: { title: 'Exam Registration', subtitle: 'Book and track your exam slots' },
  wallet: { title: 'Wallet', subtitle: 'Fund your wallet and review transactions' },
  profile: { title: 'Profile', subtitle: 'Your personal and academic details' },
  schedules: { title: 'Schedules', subtitle: 'Timetables and exam schedules' },
  calendar: { title: 'Academic Calendar', subtitle: 'Track and manage academic session milestones' },
};

function PortalContent() {
  const [active, setActive] = useState('dashboard');
  const [courseTab, setCourseTab] = useState('listing');
  const [examTab, setExamTab] = useState('listing');
  const [walletTab, setWalletTab] = useState('listing');
  // 'not_registered' | 'pending' | 'registered' — gates access to courses/exams
  const [semesterStatus, setSemesterStatus] = useState('not_registered');
  const [toast, setToast] = useState(null);
  const [registeredCourses, setRegisteredCourses] = useState([
    { id: 1, code: 'CSC 402', title: 'Distributed Systems', units: 3, year: '2025/2026', semester: 'First', status: 'Enrolled' },
    { id: 2, code: 'CSC 415', title: 'Machine Learning', units: 3, year: '2025/2026', semester: 'First', status: 'Enrolled' },
  ]);

  const [activity, setActivity] = useState([
    { id: 'a1', text: 'Registered for CSC 402 — Distributed Systems', tone: 'success', tag: 'Course', timestamp: '2026-07-18 09:12' },
    { id: 'a2', text: 'Registered for CSC 415 — Machine Learning', tone: 'success', tag: 'Course', timestamp: '2026-07-18 09:12' },
    { id: 'a3', text: 'Exam slot booked for CSC 402', tone: 'success', tag: 'Exam', timestamp: '2026-07-20 11:03' },
  ]);
  const logActivity = (entries) => setActivity((prev) => [...entries, ...prev]);

  const [walletBalance, setWalletBalance] = useState(24500);
  const [transactions, setTransactions] = useState([
    { id: 't1', datetime: '2026-07-18 14:32', desc: 'Exam fee — MTH 301', amount: '-₦2,500', type: 'debit' },
    { id: 't2', datetime: '2026-07-15 09:07', desc: 'Wallet funding — Card', amount: '+₦15,000', type: 'credit' },
    { id: 't3', datetime: '2026-07-02 16:45', desc: 'Course fee — CSC 415', amount: '-₦5,000', type: 'debit' },
  ]);

  const now = () => new Date().toISOString().slice(0, 16).replace('T', ' ');

  const [profile, setProfile] = useState({
    name: 'Amina Yusuf',
    studentId: 'NOU183045921',
    email: 'amina.yusuf@uni.edu.ng',
    phone: '+234 801 234 5678',
    department: 'Computer Science',
    level: '300 Level',
    session: '2025/2026',
    verified: true,
  });

  const handleProfileSave = (updated) => {
    setProfile(updated);
    logActivity([{ id: `act-profile-${Date.now()}`, text: 'Profile details updated', tone: 'brass', tag: 'Profile', timestamp: now() }]);
    setToast('Profile updated successfully');
  };

  const handleCourseDrop = (course) => {
    setRegisteredCourses((prev) => prev.filter((c) => c.id !== course.id));
    logActivity([{ id: `act-drop-${course.id}`, text: `Dropped ${course.code} — ${course.title}`, tone: 'danger', tag: 'Course', timestamp: now() }]);
    setToast(`Dropped ${course.code} successfully`);
  };

 const handleCourseSubmit = ({ courses }) => {
  const newEntries = courses.map((c, i) => ({
    id: `${Date.now()}-${i}`,
    code: c.code.replace(/([A-Z]+)(\d+)/, '$1 $2'),
    title: c.title,
    units: c.units,
    year: '2025/2026',
    semester: 'First',
    status: 'Pending Approval',
  }));
  setRegisteredCourses((prev) => [...prev, ...newEntries]);
  logActivity(newEntries.map((c) => ({
    id: `act-${c.id}`,
    text: `Registered for ${c.code} — ${c.title}`,
    tone: 'success',
    tag: 'Course',
    timestamp: now(),
  })));
  setToast(`Registered ${newEntries.length} course${newEntries.length !== 1 ? 's' : ''} successfully`);
};

  const [registeredExams, setRegisteredExams] = useState([
 { id: 1, code: 'CSC 402', title: 'Distributed Systems', year: '2025/2026', semester: 'First', status: 'Registered' }, 
]);

  

  const handleWalletFund = ({ amount, methodLabel }) => {
    const id = `t-${Date.now()}`;
    setWalletBalance((prev) => prev + amount);
    setTransactions((prev) => [
      { id, datetime: now(), desc: `Wallet funding — ${methodLabel}`, amount: `+₦${amount.toLocaleString()}`, type: 'credit' },
      ...prev,
    ]);
    logActivity([{ id: `act-${id}`, text: `Wallet funded — ₦${amount.toLocaleString()}`, tone: 'brass', tag: 'Wallet', timestamp: now() }]);
    setToast('Wallet funded successfully');
    setWalletTab('listing');
  };
  const handleExamSubmit = ({ courses }) => {
  const newEntries = courses.map((c, i) => ({
    id: `${Date.now()}-${i}`,
    code: c.code,
    title: c.title,
    year: '2025/2026',
    semester: 'First',
    status: 'Registered',
  }));
  setRegisteredExams((prev) => [...prev, ...newEntries]);
  logActivity(newEntries.map((e) => ({
    id: `act-${e.id}`,
    text: `Registered for exam — ${e.code}`,
    tone: 'success',
    tag: 'Exam',
    timestamp: now(),
  })));
  setToast(`Registered ${newEntries.length} course${newEntries.length !== 1 ? 's' : ''} for exams successfully`);
};

 const handleSemesterRegistrationComplete = ({ fee }) => {
  const id = `t-${Date.now()}`;
  setWalletBalance((prev) => prev - fee);
  setTransactions((prev) => [
    { id, datetime: now(), desc: 'Semester registration fee', amount: `-₦${fee.toLocaleString()}`, type: 'debit' },
    ...prev,
  ]);
  setSemesterStatus('registered');
  logActivity([{ id: `act-${id}`, text: 'Semester registration completed', tone: 'success', tag: 'Semester', timestamp: now() }]);
  setToast('Semester registration complete');
};

const goToFundWallet = () => {
  setActive('wallet');
  setWalletTab('fund');
};

  const meta = SECTION_META[active];

  return (
    <AppShell
      active={active}
      onNavigate={setActive}
      studentName={profile.name}
      studentId={profile.studentId}
      title={meta.title}
      subtitle={meta.subtitle}
    >
      {active === 'dashboard' && (
  <Dashboard
    registeredCoursesCount={registeredCourses.length}
    examsScheduledCount={registeredExams.length}
    walletBalance={walletBalance}
    activity={activity}
  />
)}
      {active === 'courses' && (
  <div className="space-y-4">
    <Tabs
      tabs={[{ key: 'listing', label: 'Listing' }, { key: 'register', label: 'Registration' }]}
      active={courseTab}
      onChange={setCourseTab}
    />
    {courseTab === 'listing' ? (
      <CourseListing courses={registeredCourses} onRegister={() => setCourseTab('register')} onDrop={handleCourseDrop} />
    ) : (
      <SemesterGate
        status={semesterStatus}
        session="2025/2026"
        semester="First"
        level="300 Level"
        walletBalance={walletBalance}
        onRegisterComplete={handleSemesterRegistrationComplete}
        onFundWallet={goToFundWallet}
      >
        <CourseRegistration onSubmit={handleCourseSubmit} onDone={() => setCourseTab('listing')} registeredCodes={registeredCourses.map((c) => c.code.replace(' ', ''))} profile={profile} />
      </SemesterGate>
    )}
  </div>
)}
{active === 'exams' && (
  <div className="space-y-4">
    <Tabs
      tabs={[{ key: 'listing', label: 'Listing' }, { key: 'register', label: 'Registration' }]}
      active={examTab}
      onChange={setExamTab}
    />
    {examTab === 'listing' ? (
      <ExamListing exams={registeredExams} onRegister={() => setExamTab('register')} />
    ) : (
      <SemesterGate
        status={semesterStatus}
        session="2025/2026"
        semester="First"
        level="300 Level"
        walletBalance={walletBalance}
        onRegisterComplete={handleSemesterRegistrationComplete}
        onFundWallet={goToFundWallet}
      >
        <ExamRegistration onSubmit={handleExamSubmit} onDone={() => setExamTab('listing')} registeredCourses={registeredCourses.filter((c) => !registeredExams.some((e) => e.code === c.code))} />
      </SemesterGate>
    )}
  </div>
)}

      {active === 'wallet' && (
        <div className="space-y-4">
          <Tabs
            tabs={[{ key: 'listing', label: 'Listing' }, { key: 'fund', label: 'Fund Wallet' }]}
            active={walletTab}
            onChange={setWalletTab}
          />
          {walletTab === 'listing' ? (
            <WalletLedger balance={walletBalance} transactions={transactions} onFund={() => setWalletTab('fund')} />
          ) : (
            <WalletFunding onSubmit={handleWalletFund} />
          )}
        </div>
      )}
      

      {active === 'profile' && <Profile student={profile} semesterStatus={semesterStatus} onSave={handleProfileSave} />}

      {active === 'schedules' && <Schedules />}

      {active === 'calendar' && <AcademicCalendar onNavigate={setActive} />}

      <HelpButton />
      <Toast message={toast} onDismiss={() => setToast(null)} />
    </AppShell>
  );
}

export default function PortalApp() {
  return (
    <ThemeProvider>
      <PortalContent />
    </ThemeProvider>
  );
}
