import Header from '@/components/common/Header/Header';
import Sidebar from '@/components/common/Sidebar/Sidebar';
import SidebarDrawer from '@/components/common/Sidebar/SidebarDrawer';
import ProductoBar from '@/components/common/ProductoBar/ProductoBar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">

      {/* Barra izquierda — navegación de miroservicos */}
      <Sidebar />

      {/* Columna central: header + contenido */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />

        <div className="flex flex-1 overflow-hidden">
          {/* menu deslizante*/}
          <SidebarDrawer />

          {/* Contenido de la página */}
          <main className="flex-1 bg-surface p-6 overflow-auto">
            {children}
          </main>

          {/* Barra derecha de producto activo */}
          <ProductoBar />
        </div>
      </div>

    </div>
  );
}
