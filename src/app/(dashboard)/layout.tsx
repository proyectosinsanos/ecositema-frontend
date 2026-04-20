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
    <div className="flex flex-col h-screen overflow-hidden">
      <SessionInitializer />
      <SocketInitializer />

      {/* Header — ancho completo */}
      <Header />

      {/* Fila inferior: sidebar + contenido + drawers + producto bar */}
      <div className="flex flex-1 overflow-hidden">

        {/* Barra izquierda — microservicios del producto activo */}
        <Sidebar />

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
  );
}
