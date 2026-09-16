import '../portal-styles.css';

export const metadata = {
  title: 'Student Portal',
  description: 'Registry — student dashboard, courses, exams, wallet and profile',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
