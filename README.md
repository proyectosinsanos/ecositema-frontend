# Ecosistema — Cistem Labs

Shell frontend del ecosistema de microservicios de Cistem Labs. Actúa como contenedor principal que orquesta los productos y sus microservicios, cargando cada uno dentro de un `<iframe>` sin salir de la aplicación.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** con design tokens personalizados
- **Zustand** para estado global
- **General Sans** como fuente principal (local)
- **Material Symbols Outlined** para íconos

## Estructura del proyecto

```
src/
├── app/
│   ├── (auth)/                     # Login y recuperación de contraseña
│   │   ├── login/
│   │   │   └── Components/         # LoginForm
│   │   └── recuperar-contrasena/
│   │       ├── Components/         # RecuperarForm
│   │       └── restablecer/
│   │           └── Components/     # RestablecerForm
│   └── (dashboard)/                # Layout principal del ecosistema
│       └── dashboard/              # Página de dashboard (por producto activo)
├── components/
│   └── common/                     # index.ts — barrel de todos los componentes
│       ├── Header/                 # Header, UserMenu, Notifications
│       ├── Sidebar/                # Sidebar, SidebarDrawer
│       ├── Notifications/          # NotificationsDrawer
│       ├── ProductoBar/            # ProductoBar
│       ├── MicroservicioFrame.tsx  # Contenedor iframe para microservicios
│       └── MockInitializer.tsx     # Carga datos mock al montar
├── config/
│   └── microservicios.config.ts    # Catálogo de microservicios registrados
├── store/
│   ├── auth.store.ts               # Usuario, empresa, productos, microservicio activo
│   ├── ui.store.ts                 # Estado del sidebar y drawer de notificaciones
│   └── notificaciones.store.ts
├── types/
│   ├── models/                     # Entidades completas de BD (Usuario, Empresa, Producto…)
│   ├── Auth/dto/                   # DTOs de request: LoginDto, RecuperarContrasenaDto…
│   ├── Usuario/dto/                # Response DTOs: UsuarioSesionDto
│   ├── Empresa/
│   │   ├── EmpresaType.enum.ts
│   │   └── dto/                    # Response DTOs: EmpresaSesionDto
│   ├── Microservicio/              # Microservicio.type, MicroservicioKey.enum
│   └── Servicio/                   # ServicioName.enum
├── mocks/
│   └── mock.data.ts                # Datos mock para desarrollo
└── api/                            # Endpoints por recurso
```

Cada carpeta expone un `index.ts` (barrel file). Los imports siempre apuntan al directorio, nunca al archivo interno:

```ts
// correcto
import { useAuthStore } from '@/store';
import { LoginDto }     from '@/types/Auth';

// evitar
import { useAuthStore } from '@/store/auth.store';
import { LoginDto }     from '@/types/Auth/dto/Login.dto';
```

### Response DTOs vs Modelos

Los archivos en `types/models/` representan la entidad completa de BD. Los archivos en `types/[Entidad]/dto/` son proyecciones que el backend devuelve en endpoints específicos — solo los campos necesarios para ese caso de uso.

```ts
// Entidad completa (BD)
Usuario { id_usuario, name, last_name, email, id_empresa, last_seen, created, updated, deleted }

// Proyección de sesión (lo que devuelve /auth/me)
UsuarioSesionDto { id_usuario, name, last_name, email }
```

## Layout

```
┌─────────────────────────────────────────────────┐
│                    Header                       │
├──────┬─────────┬──────────────────┬───────┬─────┤
│      │ Sidebar │                  │Notif  │Prod │
│Side  │ Drawer  │   <iframe> o     │Drawer │Bar  │
│bar   │ (menú   │   dashboard      │       │     │
│      │ micro)  │                  │       │     │
└──────┴─────────┴──────────────────┴───────┴─────┘
```

- **Sidebar** — íconos de microservicios del producto activo
- **SidebarDrawer** — menú de navegación interno del microservicio activo (o rutas del ecosistema si no hay ninguno)
- **MicroservicioFrame** — renderiza `<iframe>` con el frontend del microservicio, o los `children` de Next.js si no hay microservicio activo
- **ProductoBar** — selector de producto activo (lado derecho)
- **NotificationsDrawer** — bandeja de notificaciones (lado derecho)

## Variables de entorno

```bash
NEXT_PUBLIC_USE_MOCKS=true   # Activa datos mock para desarrollo

# URL de cada microservicio (se agregan conforme se integran)
NEXT_PUBLIC_URL_MICROSERVICIO_CISTEM_VISION=http://localhost:3001
```

## Agregar un nuevo microservicio

1. Agregar la key en `src/types/Microservicio/MicroservicioKey.enum.ts`
2. Agregar el mismo valor en `src/types/Servicio/ServicioName.enum.ts` (espejo para la BD)
3. Registrarlo en `src/config/microservicios.config.ts` con su `label`, `icono`, `url` y `menu`
4. Agregar la variable de entorno `NEXT_PUBLIC_URL_MICROSERVICIO_<KEY>` en `.env.local`
5. Asignarlo al producto correspondiente en el backend (o en el mock)

## Modo mock

Con `NEXT_PUBLIC_USE_MOCKS=true` el `MockInitializer` carga usuario, empresa, productos y notificaciones desde `src/mocks/mock.data.ts`, sin necesidad de backend.

## Desarrollo

```bash
npm install
npm run dev
```
