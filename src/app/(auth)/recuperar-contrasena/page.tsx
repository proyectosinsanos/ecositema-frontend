import { RecuperarForm } from './Components';

export default function RecuperarContrasenaPage() {
  return (
    <div className="min-h-screen flex">

      {/* Panel izquierdo (oculto en movil) */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col items-center justify-center p-12 gap-6">
        <div className="text-center text-primary-ink">
          {/* TODO: Reemplazar con logo de Cistem Labs */}
          <div className="w-20 h-20 rounded-2xl bg-primary-ink/10 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-[40px] text-primary-ink">hub</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Cistem Labs</h1>
          <p className="text-primary-ink/60 text-base max-w-xs">
            Ecosistema de microservicios
          </p>
        </div>
      </div>

      {/* Panel derecho — formulario */}
      <div className="flex-1 flex items-center justify-center p-8 bg-surface">
        <div className="w-full max-w-sm">

          {/* Logo visible solo en movil */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <span className="material-symbols-outlined text-primary-dark text-[28px]">hub</span>
            <span className="text-xl font-bold text-primary-dark">Cistem Labs</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-ink">Recuperar contraseña</h2>
            <p className="text-ink-muted text-sm mt-1">
              Te enviaremos un enlace para restablecer tu contraseña
            </p>
          </div>

          <RecuperarForm />

        </div>
      </div>

    </div>
  );
}
