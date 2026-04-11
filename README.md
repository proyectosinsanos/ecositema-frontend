oye en que formato envío los servicios para que el front sepa cuales son# Ecosistema — Cistem Labs

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
│   ├── (auth)/             # Login y recuperación de contraseña
│   └── (dashboard)/        # Layout principal del ecosistema
│       └── dashboard/      # Página de dashboard (por producto activo)
├── components/
│   └── common/
│       ├── Header/         # Header, UserMenu, Notifications
│       ├── Sidebar/        # Sidebar de microservicios, SidebarDrawer de navegación
│       ├── Notifications/  # NotificationsDrawer
│       ├── ProductoBar/    # Barra lateral de productos
│       └── MicroservicioFrame.tsx  # Contenedor iframe para microservicios
├── config/
│   └── microservicios.config.ts   # Catálogo de microservicios registrados
├── store/
│   ├── auth.store.ts       # Usuario, empresa, productos, microservicio activo
│   ├── ui.store.ts         # Estado del sidebar y drawer de notificaciones
│   └── notificaciones.store.ts
├── types/
│   ├── models/             # Entidades (Usuario, Empresa, Producto, Notificacion)
│   └── Microservicio/      # Tipo, enum de keys
├── mocks/
│   └── mock.data.ts        # Datos mock para desarrollo
└── api/                    # Endpoints por recurso
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
2. Registrarlo en `src/config/microservicios.config.ts` con su `label`, `icono`, `url` y `menu`
3. Agregar la variable de entorno `NEXT_PUBLIC_URL_MICROSERVICIO_<KEY>`
4. Asignarlo al producto correspondiente en el backend (o en el mock)

## Modo mock

Con `NEXT_PUBLIC_USE_MOCKS=true` el `MockInitializer` carga usuario, empresa, productos y notificaciones desde `src/mocks/mock.data.ts`, sin necesidad de backend.

## Desarrollo

```bash
npm install
npm run dev
```
