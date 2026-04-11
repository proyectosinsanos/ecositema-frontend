import { Suspense } from 'react';
import { RestablecerForm } from './Components';

export default function RestablecerContrasenaPage() {
  return (
    <div className="min-h-screen flex">

      {/* Panel izquierdo (oculto en movile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col items-center justify-center p-12 gap-6">
        <div className="text-center text-text-inverse">
          {/* TODO: Reemplazar con logo de Cistem Labs */}
          <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-[40px] text-white">hub</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Cistem Labs</h1>
          <p className="text-white/60 text-base max-w-xs">
            Ecosistema de microservicios
          </p>
        </div>
      </div>

      {/* Panel derecho — formulario */}
      <div className="flex-1 flex items-center justify-center p-8 bg-bg">
        <div className="w-full max-w-sm">

          {/* Logo visible solo en movil */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <span className="material-symbols-outlined text-primary text-[28px]">hub</span>
            <span className="text-xl font-bold text-primary">Cistem Labs</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-text">Nueva contraseña</h2>
            <p className="text-text-muted text-sm mt-1">
              Elige una contraseña segura para tu cuenta
            </p>
          </div>

          <Suspense fallback={<div className="h-10 rounded-md bg-surface animate-pulse" />}>
            <RestablecerForm />
          </Suspense>

        </div>
      </div>

    </div>
  );
}
