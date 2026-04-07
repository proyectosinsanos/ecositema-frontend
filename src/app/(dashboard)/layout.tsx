import Header from '@/components/common/Header/Header';
import Sidebar from '@/components/common/Sidebar/Sidebar';
import SidebarDrawer from '@/components/common/Sidebar/SidebarDrawer';
import ProductoBar from '@/components/common/ProductoBar/ProductoBar';
import NotificationsDrawer from '@/components/common/Notifications/NotificationsDrawer';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">

      {/* Barra izquierda — microservicios del producto activo, altura completa */}
      <Sidebar />

      {/* Columna central: header + contenido */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />

        <div className="flex flex-1 overflow-hidden">

          {/* Drawer izquierdo — navegación */}
          <SidebarDrawer />

          {/* Contenido de la página */}
          <main className="flex-1 bg-surface p-6 overflow-auto">
            {children}
          </main>

          {/* Drawer derecho — notificaciones */}
          <NotificationsDrawer />

          {/* Barra derecha — productos */}
          <ProductoBar />

        </div>
      </div>

    </div>
  );
}
