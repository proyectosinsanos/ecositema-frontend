import Header from '@/components/common/Header/Header';
import Sidebar from '@/components/common/Sidebar/Sidebar';
import SidebarDrawer from '@/components/common/Sidebar/SidebarDrawer';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">

      {/* Barra de íconos — altura completa de la pantalla */}
      <Sidebar />

      {/* Columna derecha: header arriba, drawer + contenido abajo */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />

        <div className="flex flex-1 overflow-hidden">
          {/* Drawer — empuja el contenido cuando está abierto */}
          <SidebarDrawer />

          {/* Contenido de la página */}
          <main className="flex-1 bg-surface p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>

    </div>
  );
}
