import { LoginForm } from './Components';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">

      {/* Panel izquierdo (oculto en movil) */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col items-center justify-center p-12 gap-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/Cistemsuiteblanco.svg" alt="Cistem Suite" className="w-[600px] h-auto object-contain" />
      </div>

      {/* Panel derecho — formulario */}
      <div className="flex-1 flex items-center justify-center p-8 bg-surface">
        <div className="w-full max-w-sm">

          {/* Logo visible solo en movil*/}
          <div className="flex justify-center items-center mb-8 lg:hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/cistemsuiteverde-cropped.svg" alt="Cistem Suite" className="h-36 w-auto object-contain" />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-ink">Iniciar sesión</h2>
            <p className="text-ink-muted text-sm mt-1">
              Ingresa tus credenciales para acceder al ecosistema
            </p>
          </div>

          <LoginForm />

        </div>
      </div>

    </div>
  );
}
