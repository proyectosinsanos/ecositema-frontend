import {
  Header,
  Sidebar,
  SidebarDrawer,
  ProductoBar,
  NotificationsDrawer,
  SessionInitializer,
  SocketInitializer,
  MicroservicioFrame,
} from '@/components/common';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <SessionInitializer />
      <SocketInitializer />

      {/* Barra izquierda — microservicios del producto activo, altura completa */}
      <Sidebar />

      {/* Columna central: header + contenido */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />

        <div className="flex flex-1 overflow-hidden">

          {/* Drawer izquierdo — navegación */}
          <SidebarDrawer />

          {/* Contenido de la página */}
          <main className="flex-1 overflow-hidden">
            <MicroservicioFrame fallback={children} />
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
