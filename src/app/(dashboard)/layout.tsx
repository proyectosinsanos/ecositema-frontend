import Sidebar from '@/components/common/Sidebar/Sidebar';
import Header from '@/components/common/Header/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        <main className="flex-1 bg-surface p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
