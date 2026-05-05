# Documento Técnico — Ecosistema Frontend
## Cistem Labs · Versión 0.1.0

---

## Tabla de Contenidos

1. [Descripción General](#1-descripción-general)
2. [Stack Tecnológico](#2-stack-tecnológico)
3. [Estructura del Proyecto](#3-estructura-del-proyecto)
4. [Arquitectura y Patrones de Diseño](#4-arquitectura-y-patrones-de-diseño)
5. [Rutas y Páginas](#5-rutas-y-páginas)
6. [Componentes Principales](#6-componentes-principales)
7. [Estado Global (Zustand)](#7-estado-global-zustand)
8. [Tipos y Modelos TypeScript](#8-tipos-y-modelos-typescript)
9. [Capa de API y Endpoints](#9-capa-de-api-y-endpoints)
10. [Comunicación en Tiempo Real (WebSocket)](#10-comunicación-en-tiempo-real-websocket)
11. [Comunicación entre Shell e Iframes (postMessage)](#11-comunicación-entre-shell-e-iframes-postmessage)
12. [Flujo de Autenticación](#12-flujo-de-autenticación)
13. [Flujo de Navegación a Microservicios](#13-flujo-de-navegación-a-microservicios)
14. [Flujo de Notificaciones](#14-flujo-de-notificaciones)
15. [Sistema de Design Tokens y Estilos](#15-sistema-de-design-tokens-y-estilos)
16. [Configuración de Microservicios](#16-configuración-de-microservicios)
17. [Variables de Entorno](#17-variables-de-entorno)
18. [Modo Mock (Desarrollo)](#18-modo-mock-desarrollo)
19. [Layout Visual](#19-layout-visual)
20. [Convenciones de Código](#20-convenciones-de-código)
21. [Tareas Pendientes (TODOs)](#21-tareas-pendientes-todos)
22. [Observaciones Técnicas](#22-observaciones-técnicas)

---

## 1. Descripción General

**ecosistema-frontend** es la **shell principal** del ecosistema de microservicios de Cistem Labs. Actúa como contenedor orquestador que:

- Gestiona la autenticación del usuario
- Carga y muestra microservicios dentro de `<iframe>` sin abandonar la aplicación
- Provee una barra lateral unificada de navegación entre productos y microservicios
- Distribuye notificaciones en tiempo real provenientes de cualquier microservicio
- Administra el contexto de sesión (usuario, empresa, productos) para toda la plataforma

La aplicación **no es un microservicio en sí misma**. Es el "sistema operativo" de la plataforma: el punto de entrada único para el usuario final que contiene y coordina todos los demás servicios.

---

## 2. Stack Tecnológico

| Tecnología | Versión | Rol en el Proyecto |
|---|---|---|
| **Next.js** | 14.2.5 | Framework React con App Router, SSR y manejo de rutas |
| **React** | ^18 | Librería base de UI |
| **TypeScript** | ^5 | Tipado estático estricto en todo el proyecto |
| **Tailwind CSS** | ^3.4.1 | Estilización utility-first con design tokens CSS |
| **Zustand** | ^5.0.12 | Gestión de estado global (auth, UI, notificaciones) |
| **Socket.IO Client** | (lib) | Comunicación WebSocket bidireccional con el servidor |
| **Material Symbols** | CDN | Librería de íconos vectoriales (Google) |
| **General Sans** | Local | Tipografía personalizada de la marca |
| **PostCSS** | ^8 | Procesamiento de CSS (requerido por Tailwind) |
| **pnpm** | — | Gestor de paquetes |

### Por qué este stack

- **Next.js 14 con App Router:** Permite layouts anidados y agrupación de rutas (grupos `(auth)`, `(dashboard)`), reduciendo boilerplate para estructuras que comparten layout.
- **Zustand sobre Redux/Context:** Mínimo boilerplate, no requiere providers adicionales, accesible desde cualquier parte sin prop drilling.
- **Tailwind con tokens CSS:** Separa los valores de diseño (colores, radios, sombras) en variables CSS, haciendo posible el dark mode sin lógica en JS.
- **Socket.IO:** Abstrae WebSocket con soporte de rooms, reconexión automática y eventos nombrados.

---

## 3. Estructura del Proyecto

```
ecosistema-frontend/
├── src/
│   ├── app/                          # Rutas y layouts (Next.js App Router)
│   │   ├── (auth)/                   # Grupo de rutas de autenticación
│   │   │   ├── login/
│   │   │   │   ├── Components/
│   │   │   │   │   ├── LoginForm.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── page.tsx
│   │   │   ├── recuperar-contrasena/
│   │   │   │   ├── Components/
│   │   │   │   │   ├── RecuperarForm.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── restablecer/
│   │   │   │   │   ├── Components/
│   │   │   │   │   │   ├── RestablecerForm.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/              # Grupo de rutas del panel principal
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── layout.tsx                # Layout raíz global (HTML, fuentes)
│   │   ├── page.tsx                  # Raíz → redirige a /login
│   │   └── globals.css               # Estilos globales y design tokens CSS
│   │
│   ├── components/
│   │   └── common/                   # Componentes compartidos del shell
│   │       ├── Header/
│   │       │   ├── Header.tsx
│   │       │   ├── Notifications.tsx
│   │       │   ├── UserMenu.tsx
│   │       │   └── index.ts
│   │       ├── Sidebar/
│   │       │   ├── Sidebar.tsx
│   │       │   ├── SidebarDrawer.tsx
│   │       │   └── index.ts
│   │       ├── Notifications/
│   │       │   ├── NotificationsDrawer.tsx
│   │       │   └── index.ts
│   │       ├── ProductoBar/
│   │       │   ├── ProductoBar.tsx
│   │       │   └── index.ts
│   │       ├── SocketInitializer.tsx
│   │       ├── MicroservicioFrame.tsx
│   │       ├── MockInitializer.tsx
│   │       └── index.ts
│   │
│   ├── api/                          # Endpoints de la API
│   │   ├── auth.endpoints.ts
│   │   ├── notificaciones.endpoints.ts
│   │   └── index.ts
│   │
│   ├── config/
│   │   ├── microservicios.config.ts  # Catálogo de microservicios registrados
│   │   └── index.ts
│   │
│   ├── store/                        # Estado global (Zustand)
│   │   ├── auth.store.ts
│   │   ├── ui.store.ts
│   │   ├── notificaciones.store.ts
│   │   └── index.ts
│   │
│   ├── types/                        # Definiciones TypeScript
│   │   ├── models/                   # Entidades de base de datos
│   │   │   ├── Usuario.ts
│   │   │   ├── Empresa.ts
│   │   │   ├── Producto.ts
│   │   │   ├── Servicio.ts
│   │   │   ├── Notificacion.ts
│   │   │   └── index.ts
│   │   ├── Auth/dto/                 # DTOs de autenticación
│   │   ├── Usuario/dto/              # DTOs de usuario
│   │   ├── Empresa/                  # DTOs y enum de empresa
│   │   ├── Microservicio/            # Tipos y enum de microservicios
│   │   └── Servicio/                 # Enum de servicios
│   │
│   ├── mocks/
│   │   ├── mock.data.ts              # Datos de desarrollo
│   │   └── index.ts
│   │
│   └── lib/
│       └── socket.ts                 # Cliente Socket.IO singleton
│
├── socket-server.js                  # Servidor WebSocket (Node.js)
├── public/fonts/                     # Fuentes locales General Sans
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── .env.example
└── package.json
```

---

## 4. Arquitectura y Patrones de Diseño

### 4.1 Micro Frontends mediante iframes

La decisión más importante de la arquitectura es el uso de **iframes** para integrar microservicios. Cada microservicio es una aplicación frontend independiente, desplegada en su propia URL. El shell los carga en un `<iframe>` dentro del área de contenido principal.

**Ventajas:**
- Aislamiento total (CSS, JS, errores) entre el shell y cada micro frontend
- Cada equipo puede desplegar su microservicio de forma independiente sin coordinar con el shell
- No hay conflictos de librerías ni de versiones de frameworks

**Desventajas/Consideraciones:**
- Comunicación entre el shell y el iframe debe hacerse por `postMessage` o WebSocket
- Cada iframe carga sus propios assets, lo que puede incrementar el tiempo de carga
- La autenticación debe delegarse desde el shell al microservicio (flujo AUTH_READY / AUTH_TOKEN)

### 4.2 Shell Application Pattern

El shell implementa el patrón **Application Shell**:

```
Shell (ecosistema-frontend)
  ├── Autenticación y sesión
  ├── Navegación global (Sidebar, Header)
  ├── Notificaciones unificadas
  ├── ProductoBar (selector de producto)
  └── Área de contenido
        └── <iframe src={microservicio.url} />
```

Todo el estado de sesión vive en el shell. Los microservicios son "tontos" en términos de autenticación: solicitan su token al shell a través del canal WebSocket.

### 4.3 Gestión de Estado con Zustand

Se utilizan tres stores independientes siguiendo el principio de responsabilidad única:

| Store | Responsabilidad |
|---|---|
| `useAuthStore` | Sesión del usuario, empresa, productos, microservicio activo |
| `useUiStore` | Estado de panels (sidebar abierto/cerrado, notificaciones abiertas) |
| `useNotificacionesStore` | Lista de notificaciones, marcar leídas, eliminar |

### 4.4 Grupos de Rutas Next.js

Se utilizan **route groups** de Next.js (`(auth)` y `(dashboard)`) para aplicar layouts distintos sin que los grupos aparezcan en la URL:

- `(auth)` → Layout centrado para formularios de autenticación
- `(dashboard)` → Layout completo con Header, Sidebar, Drawers

### 4.5 Design Token System

Los colores, espaciados y efectos visuales se definen como **variables CSS** en `globals.css` y se exponen como clases Tailwind a través de `tailwind.config.ts`. Esto permite dark mode sin lógica JavaScript adicional.

---

## 5. Rutas y Páginas

### Rutas Públicas (grupo `(auth)`)

| Ruta | Componente Clave | Descripción |
|---|---|---|
| `/` | `page.tsx` | Redirige automáticamente a `/login` |
| `/login` | `LoginForm` | Formulario de inicio de sesión (email + contraseña) |
| `/recuperar-contrasena` | `RecuperarForm` | Solicitud de enlace de recuperación vía email |
| `/recuperar-contrasena/restablecer?token=...` | `RestablecerForm` | Formulario para establecer nueva contraseña con validación en tiempo real |

### Rutas Privadas (grupo `(dashboard)`)

| Ruta | Descripción |
|---|---|
| `/dashboard` | Panel principal. Muestra el microservicio activo en iframe, o estadísticas si no hay ninguno seleccionado |

### Layouts

- **Layout Raíz** (`src/app/layout.tsx`): Define el HTML base, carga fuentes y Material Symbols. Incluye metadata global ("Ecosistema | Cistem Labs").
- **Layout Auth** (`src/app/(auth)/layout.tsx`): Wrapper limpio para formularios de autenticación.
- **Layout Dashboard** (`src/app/(dashboard)/layout.tsx`): Monta Header, Sidebar, SidebarDrawer, NotificationsDrawer, ProductoBar y el área de contenido principal. También monta `SocketInitializer` y `MockInitializer`.

---

## 6. Componentes Principales

### 6.1 Header

**Archivo:** `src/components/common/Header/Header.tsx`

Barra superior fija que contiene:

| Sección | Contenido |
|---|---|
| Izquierda | Nombre e inicial del producto activo (leído de `useAuthStore.productoActivo`) |
| Derecha | Botón de notificaciones (`Notifications.tsx`) y menú de usuario (`UserMenu.tsx`) |

**`Notifications.tsx`:** Botón con badge numérico que indica cuántas notificaciones no leídas hay. Al hacer click, llama a `toggleNotif()` en `useUiStore`.

**`UserMenu.tsx`:** Dropdown que muestra nombre completo, email del usuario y botón de logout. Al hacer logout llama al endpoint `LOGOUT`, limpia el store con `limpiar()` y redirige a `/login`.

---

### 6.2 Sidebar

**Archivo:** `src/components/common/Sidebar/Sidebar.tsx`

Barra vertical izquierda de 64px de ancho con fondo `--color-primary`. Contiene:

1. **Botón menú (hamburguesa):** Llama a `toggleSidebar()` para abrir/cerrar el SidebarDrawer.
2. **Íconos de microservicios:** Un ícono por cada microservicio registrado en el producto activo. Al hacer click, llama a `setMicroservicioActivo()`.
3. **Tooltips:** Al hacer hover sobre cada ícono aparece un tooltip con el nombre del microservicio.

---

### 6.3 SidebarDrawer

**Archivo:** `src/components/common/Sidebar/SidebarDrawer.tsx`

Panel expandible de 240px de ancho que aparece a la derecha del Sidebar. Muestra:

- **Si hay microservicio activo:** El menú interno del microservicio (ítems definidos en `microservicios.config.ts`). Al hacer click en un ítem, se envía un `postMessage` al iframe con `{ type: 'NAVIGATE', link: '...' }`.
- **Si no hay microservicio activo:** Rutas del ecosistema (actualmente solo `/dashboard`).

La apertura/cierre se controla con `useUiStore.sidebarOpen` y una transición CSS de 250ms.

---

### 6.4 ProductoBar

**Archivo:** `src/components/common/ProductoBar/ProductoBar.tsx`

Barra vertical derecha de 64px de ancho. Muestra un botón por cada producto asignado al usuario. Al hacer click en un producto:

1. `setProductoActivo(producto)`
2. Limpia el microservicio activo (`setMicroservicioActivo(null)`)

El primer producto se selecciona automáticamente en el montaje mediante `useEffect`.

---

### 6.5 NotificationsDrawer

**Archivo:** `src/components/common/Notifications/NotificationsDrawer.tsx`

Panel lateral de 320px que lista todas las notificaciones. Cada notificación muestra:

| Campo | Descripción |
|---|---|
| Punto azul | Indica que no ha sido leída |
| Ícono | Del microservicio de origen |
| Título y mensaje | Contenido de la alerta |
| Tiempo relativo | "hace 5m", "hace 2h", "hace 3d" |

**Acciones disponibles:**
- Click en notificación: marca como leída + activa microservicio + envía `postMessage NAVIGATE`
- Botón eliminar (×): elimina la notificación del store
- "Marcar todas como leídas": llama a `marcarTodasLeidas()`

---

### 6.6 MicroservicioFrame

**Archivo:** `src/components/common/MicroservicioFrame.tsx`

Componente que decide qué renderizar en el área principal:

```typescript
if (microservicioActivo) {
  return <iframe src={microservicioActivo.url} />;
} else {
  return <>{fallback}</>;
}
```

El iframe tiene `width: 100%` y `height: 100%` sobre el área disponible. El `fallback` es el contenido del dashboard (estadísticas, bienvenida, etc.).

---

### 6.7 SocketInitializer

**Archivo:** `src/components/common/SocketInitializer.tsx`

Componente cliente React (sin UI) que gestiona el ciclo de vida de la conexión WebSocket:

```
Montaje:
  Si usuario autenticado → connectSocket(usuario.id_usuario)

Eventos escuchados:
  AUTH_READY  → fetch token → emitir AUTH_TOKEN
  ALERT       → agregar notificación al store

Desmontaje:
  disconnectSocket()
```

Se monta en el layout del dashboard, por lo que el socket permanece conectado durante toda la sesión.

---

### 6.8 MockInitializer

**Archivo:** `src/components/common/MockInitializer.tsx`

Componente invisible que, cuando `NEXT_PUBLIC_USE_MOCKS=true`, carga datos ficticios en los stores de Zustand al montar. Permite trabajar en desarrollo sin necesidad de un backend activo.

Carga:
- `MOCK_USUARIO` → `setUsuario()`
- `MOCK_EMPRESA` → `setEmpresa()`
- `MOCK_PRODUCTOS` → `setProductos()`
- `MOCK_NOTIFICACIONES` → `setNotificaciones()`

---

## 7. Estado Global (Zustand)

### useAuthStore

**Archivo:** `src/store/auth.store.ts`

```typescript
interface AuthState {
  usuario: UsuarioSesionDto | null;
  empresa: EmpresaSesionDto | null;
  productos: Producto[];
  productoActivo: Producto | null;
  microservicioActivo: Microservicio | null;

  setUsuario(usuario: UsuarioSesionDto): void;
  setEmpresa(empresa: EmpresaSesionDto): void;
  setProductos(productos: Producto[]): void;
  setProductoActivo(producto: Producto): void;
  setMicroservicioActivo(microservicio: Microservicio | null): void;
  limpiar(): void; // Resetea todo (logout)
}
```

Este store es el núcleo del sistema. Cualquier componente puede leer `usuario`, `productoActivo` o `microservicioActivo` sin prop drilling.

---

### useUiStore

**Archivo:** `src/store/ui.store.ts`

```typescript
interface UiState {
  sidebarOpen: boolean;
  notifOpen: boolean;

  toggleSidebar(): void;
  closeSidebar(): void;
  toggleNotif(): void;
  closeNotif(): void;
}
```

Estado puramente visual. Los drawers reaccionan a estos valores con transiciones CSS.

---

### useNotificacionesStore

**Archivo:** `src/store/notificaciones.store.ts`

```typescript
interface NotificacionesState {
  notificaciones: Notificacion[];

  setNotificaciones(notificaciones: Notificacion[]): void;
  agregar(notificacion: Notificacion): void;
  marcarLeida(id: string): void;
  marcarTodasLeidas(): void;
  eliminar(id: string): void;
}
```

Alimentado tanto por el mock como por eventos WebSocket en producción.

---

## 8. Tipos y Modelos TypeScript

### 8.1 Modelos de Base de Datos (`src/types/models/`)

Representan las entidades tal como están en la base de datos.

**Usuario**
```typescript
interface Usuario {
  id_usuario: number;
  name: string;
  last_name: string;
  email: string;
  last_seen: string | null;
  id_empresa: number;
  created: string;
  updated: string;
  deleted: string | null;
}
```

**Empresa**
```typescript
interface Empresa {
  id_empresa: number;
  name: string;
  description: string;
  type: EmpresaType;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
```

**Producto**
```typescript
interface Producto {
  id_producto: number;
  nombre: string;
  microservicios: MicroservicioKey[];
}
```

**Notificacion**
```typescript
interface Notificacion {
  id: string;
  titulo: string;
  mensaje: string;
  leida: boolean;
  fecha: string; // ISO 8601
  microservicioKey?: MicroservicioKey;
  link?: string; // Ruta interna del microservicio
}
```

### 8.2 DTOs (`src/types/*/dto/`)

Proyecciones reducidas utilizadas en la sesión activa. Solo contienen los campos necesarios para la UI.

**UsuarioSesionDto** — Lo que el shell necesita del usuario:
```typescript
interface UsuarioSesionDto {
  id_usuario: number;
  name: string;
  last_name: string;
  email: string;
}
```

**EmpresaSesionDto** — Lo que el shell necesita de la empresa:
```typescript
interface EmpresaSesionDto {
  id_empresa: number;
  name: string;
  type: EmpresaType;
}
```

**LoginDto**
```typescript
interface LoginDto {
  email: string;
  password: string;
}
```

**RecuperarContrasenaDto** / **RestablecerContrasenaDto**
```typescript
interface RecuperarContrasenaDto { email: string; }

interface RestablecerContrasenaDto {
  token: string;
  password: string;
}
```

### 8.3 Tipos de Microservicio

**Microservicio** — Define un microservicio registrado en el sistema:
```typescript
interface MenuItemMicroservicio {
  label: string;
  icono: string;        // Material Symbols
  link: string;         // Ruta interna (para postMessage)
}

interface Microservicio {
  key: MicroservicioKey;
  label: string;
  icono: string;        // Material Symbols
  url: string;          // URL del micro frontend
  menu: MenuItemMicroservicio[];
}
```

### 8.4 Enums

| Enum | Valores | Uso |
|---|---|---|
| `MicroservicioKey` | `CISTEM_VISION = 'CistemVision'` | Identifica microservicios en stores, notificaciones y config |
| `ServicioName` | Espejo de `MicroservicioKey` | Identifica servicios en BD |
| `EmpresaType` | Por definir | Categoriza tipos de empresa |

---

## 9. Capa de API y Endpoints

Todos los endpoints están centralizados en `src/api/`. Se construyen a partir de `NEXT_PUBLIC_API_BASE_URL`.

### auth.endpoints.ts

```typescript
export const AUTH_ENDPOINTS = {
  LOGIN:                  `${BASE}/auth/login`,
  LOGOUT:                 `${BASE}/auth/logout`,
  ME:                     `${BASE}/auth/me`,
  RECUPERAR_CONTRASENA:   `${BASE}/auth/recuperar-contrasena`,
  RESTABLECER_CONTRASENA: `${BASE}/auth/restablecer-contrasena`,
};
```

### notificaciones.endpoints.ts

```typescript
export const NOTIFICACIONES_ENDPOINTS = {
  LISTAR:       `${BASE}/notificaciones`,
  MARCAR_LEIDA: (id: string) => `${BASE}/notificaciones/${id}/leida`,
  MARCAR_TODAS: `${BASE}/notificaciones/leer-todas`,
};
```

**Patrón de uso previsto:**
```typescript
// TODO: Reemplazar llamada mock con:
const res = await fetch(AUTH_ENDPOINTS.LOGIN, {
  method: 'POST',
  credentials: 'include',  // Para cookies HttpOnly
  body: JSON.stringify(dto),
});
```

La autenticación planteada usa **cookies HttpOnly** (no localStorage), por eso las llamadas incluyen `credentials: 'include'`.

---

## 10. Comunicación en Tiempo Real (WebSocket)

### 10.1 Servidor Socket.IO

**Archivo:** `socket-server.js`  
**Puerto:** 3001  
**Runtime:** Node.js

El servidor actúa como **broker de mensajes** entre el shell y los microservicios:

```
                  ┌──────────────┐
                  │ socket-server │
                  │    :3001      │
                  └──────┬───────┘
                         │
          ┌──────────────┼──────────────┐
          │              │              │
    ┌─────▼─────┐  ┌─────▼─────┐  ┌─────▼─────┐
    │   Shell    │  │  Micro 1  │  │  Micro 2  │
    │ (room: 1) │  │ (room: 1) │  │ (room: 1) │
    └───────────┘  └───────────┘  └───────────┘
```

**Eventos soportados:**

| Evento | Dirección | Descripción |
|---|---|---|
| `join` | Cliente → Servidor | Cliente solicita unirse a room con `{ room: userId }` |
| `AUTH_READY` | Microservicio → Servidor | Microservicio indica que necesita un token |
| `AUTH_TOKEN` | Shell → Servidor | Shell responde con el token de autenticación |
| `NAVIGATE` | Shell → Servidor | Shell solicita al microservicio navegar a una ruta |
| `ALERT` | Microservicio → Servidor | Microservicio emite una notificación al shell |

Cada usuario tiene su propia **room** identificada por su `userId`. Esto garantiza que los mensajes no se mezclen entre sesiones de distintos usuarios.

### 10.2 Cliente Socket.IO

**Archivo:** `src/lib/socket.ts`

Implementa el patrón **singleton** para mantener una sola conexión:

```typescript
let socket: Socket | null = null;

export function getSocket(): Socket | null { ... }

export function connectSocket(userId: number): Socket {
  if (socket?.connected) return socket;
  socket = io(SOCKET_URL);
  socket.emit('join', { room: userId });
  return socket;
}

export function disconnectSocket(): void {
  socket?.disconnect();
  socket = null;
}

export function navigateMicroservicio(userId: number, link: string): void {
  socket?.emit('NAVIGATE', { room: userId, link });
}

export function sendAuthToken(token: string, userId: number): void {
  socket?.emit('AUTH_TOKEN', { token, userId });
}
```

### 10.3 SocketInitializer — Ciclo de vida del socket

```
Usuario autenticado en /dashboard
          │
          ▼
  connectSocket(usuario.id_usuario)
          │
          ├──► on('AUTH_READY') ──► fetch /api/auth/token ──► sendAuthToken(token, userId)
          │
          └──► on('ALERT', data) ──► agregar({ ...data }) al notificaciones store
          │
  Usuario hace logout / componente desmonta
          │
          ▼
  disconnectSocket()
```

---

## 11. Comunicación entre Shell e Iframes (postMessage)

Además del WebSocket, el shell utiliza la **Web Messaging API** (`postMessage`) para comunicarse directamente con el iframe del microservicio activo.

### Mensajes que el shell envía al iframe

| type | Payload | Cuándo |
|---|---|---|
| `NAVIGATE` | `{ link: string }` | Click en ítem del SidebarDrawer o en notificación con link |

**Implementación en el shell:**
```typescript
const iframe = document.querySelector('iframe');
iframe?.contentWindow?.postMessage(
  { type: 'NAVIGATE', link: '/camaras' },
  microservicioActivo.url
);
```

### Lo que el microservicio debe implementar

Para integrarse correctamente con el shell, cada microservicio debe escuchar mensajes de tipo `NAVIGATE` y enrutar internamente:

```typescript
// Dentro del microservicio (ej. Next.js, Vite, etc.)
window.addEventListener('message', (event) => {
  if (event.origin !== SHELL_ORIGIN) return; // Seguridad
  if (event.data?.type === 'NAVIGATE') {
    router.push(event.data.link);
  }
});
```

---

## 12. Flujo de Autenticación

### Login

```
1. /login → LoginForm
         │
         ▼
2. fetch POST /auth/login  { email, password }
         │
         ▼
3. Backend → cookie HttpOnly + respuesta { usuario, empresa, productos }
         │
         ▼
4. setUsuario() + setEmpresa() + setProductos()  [useAuthStore]
         │
         ▼
5. router.push('/dashboard')
         │
         ▼
6. SocketInitializer.mount → connectSocket(usuario.id_usuario)
         │
         ▼
7. Microservicio carga en iframe → emite AUTH_READY
         │
         ▼
8. SocketInitializer → fetch /api/auth/token
         │
         ▼
9. sendAuthToken(token, userId)
         │
         ▼
10. Microservicio recibe AUTH_TOKEN y establece su sesión
```

### Logout

```
1. UserMenu → handleLogout()
         │
         ▼
2. fetch POST /auth/logout  (credentials: include)
         │
         ▼
3. useAuthStore.limpiar() → estado reseteado
         │
         ▼
4. router.push('/login')
         │
         ▼
5. SocketInitializer.unmount → disconnectSocket()
```

### Recuperación de contraseña

```
/recuperar-contrasena
  → Usuario ingresa email
  → fetch POST /auth/recuperar-contrasena
  → Backend envía email con link que contiene ?token=...

/recuperar-contrasena/restablecer?token=...
  → RestablecerForm valida requisitos en tiempo real
  → Usuario completa nueva contraseña
  → fetch POST /auth/restablecer-contrasena { token, password }
  → Redirige a /login
```

---

## 13. Flujo de Navegación a Microservicios

```
Usuario hace click en ícono de microservicio (Sidebar)
          │
          ▼
setMicroservicioActivo(microservicio)  [useAuthStore]
          │
          ▼
MicroservicioFrame detecta cambio → renderiza <iframe src={microservicio.url}>
          │
          ▼
SidebarDrawer muestra el menú del microservicio activo
          │
          ▼
Usuario hace click en ítem del menú
          │
          ▼
iframe.contentWindow.postMessage({ type: 'NAVIGATE', link }, origin)
          │
          ▼
Microservicio navega internamente a la ruta indicada
```

### Cambio de producto

```
Usuario hace click en botón de producto (ProductoBar)
          │
          ├──► setProductoActivo(producto)  [useAuthStore]
          └──► setMicroservicioActivo(null) [limpia iframe]
                    │
                    ▼
            Sidebar actualiza íconos con los microservicios del nuevo producto
```

---

## 14. Flujo de Notificaciones

### Recepción desde microservicio

```
Microservicio emite ALERT via Socket.IO
          │
          ▼
socket-server broadcast a room del userId
          │
          ▼
SocketInitializer on('ALERT') → agregar(notificacion) [useNotificacionesStore]
          │
          ▼
Header muestra badge incrementado (+1 no leída)
          │
          ▼
Usuario abre NotificationsDrawer → ve la nueva notificación
```

### Click en notificación

```
Usuario hace click en una notificación
          │
          ├──► marcarLeida(id)
          ├──► setMicroservicioActivo(microservicioOrigen)
          └──► Si tiene link: postMessage NAVIGATE al iframe
```

---

## 15. Sistema de Design Tokens y Estilos

### Variables CSS (globals.css)

```css
:root {
  /* Colores de marca */
  --color-primary:   #1a3a5c;   /* Azul oscuro */
  --color-secondary: #1d9e75;   /* Verde */
  --color-accent:    #d85a30;   /* Naranja */

  /* Fondos */
  --color-bg:        #f5f7fa;
  --color-surface:   #ffffff;

  /* Texto */
  --color-text:      #1a2738;
  --color-text-muted:#6b7280;

  /* Estados */
  --color-success:   #10b981;
  --color-warning:   #f59e0b;
  --color-error:     #ef4444;
  --color-info:      #3b82f6;

  /* Bordes */
  --color-border:    #e5e7eb;

  /* Tipografía */
  --font-sans: 'General Sans', sans-serif;
}
```

### Dark Mode

Activado con `[data-theme="dark"]` en el elemento `<html>`:

```css
[data-theme="dark"] {
  --color-bg:      #0f1923;
  --color-surface: #1a2738;
  --color-text:    #f9fafb;
  /* ... */
}
```

```typescript
// Para activar
document.documentElement.dataset.theme = 'dark';
// Para desactivar
delete document.documentElement.dataset.theme;
```

### Tailwind extendido (tailwind.config.ts)

```typescript
theme: {
  extend: {
    colors: {
      primary:   'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      accent:    'var(--color-accent)',
      bg:        'var(--color-bg)',
      surface:   'var(--color-surface)',
      // ...
    },
    borderRadius: {
      sm: '4px', md: '8px', lg: '12px', xl: '16px', full: '9999px',
    },
    transitionDuration: {
      fast: '150ms', normal: '250ms', slow: '400ms',
    },
  }
}
```

---

## 16. Configuración de Microservicios

**Archivo:** `src/config/microservicios.config.ts`

El catálogo de microservicios es un **array estático** que se actualiza cada vez que se incorpora un nuevo microservicio al ecosistema:

```typescript
export const MICROSERVICIOS: Microservicio[] = [
  {
    key:   MicroservicioKey.CISTEM_VISION,
    label: 'Cistem Vision',
    icono: 'videocam',   // Material Symbols
    url:   process.env.NEXT_PUBLIC_URL_MICROSERVICIO_CISTEM_VISION ?? '',
    menu: [
      { label: 'Home',      icono: 'home',          link: '/'          },
      { label: 'Cámaras',   icono: 'camera_indoor', link: '/camaras'   },
      { label: 'Evidencia', icono: 'videocam',      link: '/evidencia' },
    ],
  },
  // Agregar nuevos microservicios aquí
];
```

### Cómo agregar un nuevo microservicio

1. Agregar el valor al enum `MicroservicioKey`
2. Agregar la variable de entorno `NEXT_PUBLIC_URL_MICROSERVICIO_<KEY>` en `.env`
3. Agregar la entrada al array `MICROSERVICIOS` con su `key`, `label`, `icono`, `url` y `menu`
4. Asociar el `MicroservicioKey` a los productos que lo tendrán disponible (en datos del backend)

---

## 17. Variables de Entorno

| Variable | Tipo | Descripción |
|---|---|---|
| `NEXT_PUBLIC_USE_MOCKS` | `boolean` | Activa modo mock para desarrollo sin backend |
| `NEXT_PUBLIC_API_BASE_URL` | `string` | URL base del API Gateway o backend principal |
| `NEXT_PUBLIC_URL_MICROSERVICIO_CISTEM_VISION` | `string` | URL del micro frontend Cistem Vision |

**`.env.example` (plantilla):**
```env
NEXT_PUBLIC_USE_MOCKS=false
NEXT_PUBLIC_API_BASE_URL=https://api.ejemplo.com
NEXT_PUBLIC_URL_MICROSERVICIO_CISTEM_VISION=https://vision.ejemplo.com
```

**`.env.local` (desarrollo):**
```env
NEXT_PUBLIC_USE_MOCKS=true
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_URL_MICROSERVICIO_CISTEM_VISION=http://localhost:3002
```

> Todas las variables llevan prefijo `NEXT_PUBLIC_` porque son accedidas desde el cliente (browser). No se deben poner secretos con este prefijo.

---

## 18. Modo Mock (Desarrollo)

Cuando `NEXT_PUBLIC_USE_MOCKS=true`, el `MockInitializer` carga automáticamente:

| Mock | Valores |
|---|---|
| **MOCK_USUARIO** | id: 1, name: "Erick", last_name: "Báez", email: ebaez@cistemlabs.io |
| **MOCK_EMPRESA** | id: 1, name: "Cistem Labs", type: "TECNOLOGIA" |
| **MOCK_PRODUCTOS** | "Cistem GAS" (con CistemVision) y "Cistem Living" (sin microservicios) |
| **MOCK_NOTIFICACIONES** | 5 notificaciones de ejemplo (3 no leídas, 2 leídas) |

Los formularios de autenticación en modo mock omiten el fetch y cargan directamente estos datos. Esto permite iterar en la UI sin necesidad de tener el backend levantado.

---

## 19. Layout Visual

```
┌────────────────────────────────────────────────────────────────┐
│  Header (h-16, bg-surface, border-bottom)                      │
│  ← Nombre Producto         Notificaciones | Usuario →          │
├──────┬───────────┬──────────────────────────────┬──────────────┤
│      │           │                              │ Notif Drawer │
│ Side │ Sidebar   │  <iframe>                    │ (w-80)       │
│ bar  │ Drawer    │  microservicio activo         │              │
│(w-16)│ (w-60)    │  O                           │ Lista de     │
│      │           │  fallback / dashboard         │ notificac.   │
│ bg   │ bg-       │  bg-surface                  │              │
│primry│ surface   │  overflow-auto               │              │
│      │           │                              │              │
└──────┴───────────┴──────────────────────────────┴──────┬───────┘
                                                         │Producto│
                                                         │  Bar   │
                                                         │ (w-16) │
                                                         └────────┘
```

**Descripción de columnas:**

| Columna | Ancho | Contenido |
|---|---|---|
| Sidebar | 64px fijo | Íconos de microservicios (bg-primary) |
| SidebarDrawer | 0px / 240px | Menú expandible (toggle) |
| Área principal | flex-1 | Iframe del microservicio o contenido de bienvenida |
| NotificationsDrawer | 0px / 320px | Panel de notificaciones (toggle) |
| ProductoBar | 64px fijo | Selector de productos |

---

## 20. Convenciones de Código

### Estructura de archivos por vista

```
src/app/(dashboard)/admin/ordenes/
├── Modals/
│   └── EditOrderModal.tsx
├── Components/
│   └── OrderList.tsx
├── Messages/
│   └── EmptyState.tsx
└── page.tsx
```

### Nomenclatura

| Tipo | Convención | Ejemplo |
|---|---|---|
| DTO | `[Nombre].dto.ts` | `Login.dto.ts` |
| Tipo | `[Nombre].type.ts` | `Microservicio.type.ts` |
| Enum | `[Nombre].enum.ts` | `MicroservicioKey.enum.ts` |
| Modelo | `[Nombre].ts` | `Usuario.ts` |
| Endpoint | `[recurso].endpoints.ts` | `auth.endpoints.ts` |
| Store | `[recurso].store.ts` | `auth.store.ts` |
| Config | `[recurso].config.ts` | `microservicios.config.ts` |

### Barrel files (index.ts)

Cada directorio tiene un `index.ts` para exportar todo su contenido. Los imports se hacen desde el índice del módulo:

```typescript
// Correcto
import { useAuthStore } from '@/store';
import { LoginDto } from '@/types/Auth';

// Evitar
import { useAuthStore } from '@/store/auth.store';
```

### TODOs

Los puntos de integración con backend se marcan explícitamente:

```typescript
// TODO: Reemplazar con llamada real a la API
const mockResponse = { usuario: MOCK_USUARIO, ... };
```

---

## 21. Tareas Pendientes (TODOs)

| # | Área | Descripción |
|---|---|---|
| 1 | Autenticación | Reemplazar mocks en LoginForm, RecuperarForm, RestablecerForm con llamadas reales |
| 2 | SocketInitializer | Implementar endpoint `/api/auth/token` para obtener el token y enviarlo al microservicio |
| 3 | Dashboard | Implementar estadísticas/overview por producto cuando no hay microservicio activo |
| 4 | SidebarDrawer | Agregar más rutas del ecosistema (actualmente solo /dashboard) |
| 5 | EmpresaType | Definir valores del enum `EmpresaType` |
| 6 | Microservicios | Registrar los demás microservicios en config, enums y variables de entorno |
| 7 | Notificaciones | Llamadas reales a la API de notificaciones (listar, marcar leídas) |
| 8 | Sesión | Implementar persistencia de sesión con fetch a `/auth/me` al recargar |
| 9 | Seguridad | Validar `origin` en listeners de `postMessage` en el shell y en los microservicios |
| 10 | Socket.IO CORS | Cambiar `origin: '*'` por dominios específicos en producción |

---

## 22. Observaciones Técnicas

### Estado de sesión no persistente

El estado de Zustand vive en memoria. Si el usuario **recarga la página**, pierde la sesión y es redirigido a `/login`. La solución correcta es hacer un fetch a `AUTH_ENDPOINTS.ME` al montar el layout del dashboard para rehidratar el estado.

### Autenticación delegada

El flujo `AUTH_READY → AUTH_TOKEN` via WebSocket es el mecanismo por el cual el shell **delega la autenticación** a los microservicios. Cada microservicio debe implementar el listener de `AUTH_READY` desde su lado del socket para solicitar el token cuando su iframe se carga.

### Seguridad en postMessage

Actualmente el shell no valida el `origin` del evento al enviar/recibir postMessage. En producción esto debe restringirse:

```typescript
// Enviar solo al origen correcto
iframe.contentWindow?.postMessage(data, microservicioActivo.url);

// Recibir solo de orígenes confiables
window.addEventListener('message', (e) => {
  if (!ALLOWED_ORIGINS.includes(e.origin)) return;
  // ...
});
```

### Socket.IO CORS en servidor

```javascript
// socket-server.js — revisar antes de producción
const io = new Server(server, {
  cors: { origin: '*' }  // Cambiar por lista blanca de dominios
});
```

### Dependency de socket.io-client

La librería `socket.io-client` se usa en `src/lib/socket.ts` pero no aparece explícitamente en `package.json`. Debe verificarse que esté instalada o agregarla manualmente:

```bash
pnpm add socket.io-client
```

---

*Documento generado el 16 de abril de 2026 — Ecosistema Frontend v0.1.0 · Cistem Labs*
