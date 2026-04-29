# Backend Integration — Ecosistema Frontend

Documento de referencia para la integración entre el frontend del ecosistema y sus backends. Incluye todos los contratos de API, sockets y postMessage.

---

## Arquitectura general

```
CistemVision Backend ──HTTP──► Backend Ecosistema ──socket ALERT──► Frontend Ecosistema
                                                                           │
                                                        ┌──────────────────┤
                                                        │                  │
                                              postMessage NAVIGATE    postMessage CISTEM_AUTH
                                                        │                  │
                                                        ▼                  ▼
                                                   iframe CistemVision Frontend
```

---

## 1. Backend Ecosistema

**Variable de entorno:** `NEXT_PUBLIC_API_BASE_URL`
**Definición de endpoints:** `src/api/auth.endpoints.ts`, `src/api/notificaciones.endpoints.ts`

---

### Auth

#### `POST /auth/login`
**Archivo:** `src/api/auth.endpoints.ts` · `src/types/Auth/dto/Login.dto.ts`

**Request:**
```typescript
// src/types/Auth/dto/Login.dto.ts
{
  email:    string;
  password: string;
}
```

**Response:**
```typescript
// src/types/Auth/dto/Sesion.dto.ts
{
  usuario: {
    id_usuario: number;
    name:       string;
    last_name:  string;
    email:      string;
  };
  empresa: {
    id_empresa: number;
    name:       string;
    type:       string; // EmpresaType enum
  };
  productos: {
    id_producto:    number;
    nombre:         string;
    microservicios: string[]; // MicroservicioKey[]
  }[];
}
```

---

#### `POST /auth/logout`
**Archivo:** `src/api/auth.endpoints.ts`

Sin body. Invalida la sesión activa.

---

#### `GET /auth/me`
**Archivo:** `src/api/auth.endpoints.ts`

**Response:** mismo objeto `SesionDto` del login.

---

#### `POST /auth/refresh`
**Archivo:** `src/api/auth.endpoints.ts`
**Usado en:** `src/components/common/SocketInitializer.tsx` (eliminado), `src/app/(auth)/login/`

Refresca el access token mediante cookie. Retorna:
```json
{ "access_token": "string" }
```

---

#### `POST /auth/recuperar-contrasena`
**Archivo:** `src/api/auth.endpoints.ts` · `src/types/Auth/dto/RecuperarContrasena.dto.ts`

**Request:**
```typescript
{ email: string; }
```

---

#### `POST /auth/restablecer-contrasena`
**Archivo:** `src/api/auth.endpoints.ts` · `src/types/Auth/dto/RestablecerContrasena.dto.ts`

**Request:**
```typescript
{
  token:    string;
  password: string;
}
```

---

#### `POST /auth/iframe-token`
**Archivo:** `src/api/auth.endpoints.ts` · `src/components/common/MicroservicioFrame.tsx`

> **TODO:** Pendiente de implementar en el backend.

Genera un token efímero para autenticar el iframe del microservicio. El frontend lo llama al cargar el iframe y lo envía vía postMessage.

**Response:**
```json
{ "token": "string" }
```

---

### Notificaciones (Ecosistema)

#### `POST /notificaciones`
**Usado por:** backends de microservicios para enviar alertas al ecosistema.

El backend ecosistema recibe este POST y emite el evento `ALERT` por socket a los frontends conectados.

**Request:**
```typescript
// Acordado con todos los microservicios
{
  uuid:     string;
  title:    string;
  message:  string;
  producto: string;  // ej: "AI-CistemGas"
  servicio: string;  // ej: "CistemVision"
  fecha:    Date;
  is_read:  boolean; // siempre false al crear
}
```

---

#### `GET /notificaciones`
**Archivo:** `src/api/notificaciones.endpoints.ts`

Retorna el historial de notificaciones del usuario autenticado.

**Response:** `Notificacion[]`

---

#### `PATCH /notificaciones/:id/leida`
**Archivo:** `src/api/notificaciones.endpoints.ts`

Marca una notificación individual como leída.

---

#### `PATCH /notificaciones/leer-todas`
**Archivo:** `src/api/notificaciones.endpoints.ts`

Marca todas las notificaciones del usuario como leídas.

---

### Socket

**Archivo:** `src/lib/socket.ts` · `src/components/common/SocketInitializer.tsx`
**URL:** `NEXT_PUBLIC_API_BASE_URL`

#### Conexión

Al autenticarse, el frontend emite:
```typescript
socket.emit('join_room', { id: id_usuario, module: 'ECOSYSTEM' });
```

#### Eventos que el backend debe emitir

| Evento | Payload | Descripción |
|--------|---------|-------------|
| `ALERT` | `NotificacionDto` | Nueva notificación para el usuario |

**Payload `ALERT`:**
```typescript
{
  uuid:     string;
  title:    string;
  message:  string;
  producto: string;
  servicio: string;
  fecha:    Date;
  is_read:  boolean;
}
```

---

## 2. Backend Microservicio (CistemVision y futuros)

**Variable de entorno:** `NEXT_PUBLIC_URL_MICROSERVICIO_CISTEM_VISION`
**Usado en:** `src/config/microservicios.config.ts` · `src/components/common/Sidebar/SidebarDrawer.tsx`

---

### `GET /menu`
**Archivo:** `src/config/microservicios.config.ts` · `src/components/common/Sidebar/SidebarDrawer.tsx`

El sidebar del ecosistema consume este endpoint al abrir el microservicio para renderizar las pestañas dinámicamente.

> No requiere autenticación.

**Response:**
```typescript
// src/types/Microservicio/Microservicio.type.ts
{
  label: string;  // texto visible en el sidebar
  icono: string;  // nombre del ícono en Material Symbols Outlined
  link:  string;  // ruta interna del microservicio, ej: "/evidencia"
}[]
```

**Ejemplo:**
```json
[
  { "label": "Home",      "icono": "home",          "link": "/" },
  { "label": "Cámaras",   "icono": "camera_indoor", "link": "/camaras" },
  { "label": "Evidencia", "icono": "videocam",       "link": "/evidencia" }
]
```

> Íconos disponibles en [Material Symbols Outlined](https://fonts.google.com/icons).
> El primer elemento es la ruta activa por defecto al abrir el microservicio.

---

### `GET /notificaciones`
**Usado en:** frontend de CistemVision — `src/api/notificaciones.api.ts`

Retorna el historial de notificaciones del usuario. El frontend lo llama al inicializarse.

**Response:** `NotificacionDto[]`

---

### `POST /notificaciones/read/:uuid`
**Usado en:** frontend de CistemVision — `src/api/notificaciones.api.ts`

Marca la notificación con ese `uuid` como leída.

---

### Enviar notificación al ecosistema

Cuando ocurre un evento relevante, el backend del microservicio hace HTTP al backend ecosistema:

```
POST {ECOSYSTEM_BACKEND_URL}/notificaciones
```

**Body:**
```json
{
  "uuid":     "generado en tu BD",
  "title":    "Intrusión detectada",
  "message":  "Se detectó movimiento en zona restringida",
  "producto": "AI-CistemGas",
  "servicio": "CistemVision",
  "fecha":    "2026-04-29T18:00:00.000Z",
  "is_read":  false
}
```

#### Valores por microservicio

| Microservicio | `producto` | `servicio` |
|---|---|---|
| CistemVision | `"AI-CistemGas"` | `"CistemVision"` |

> Estos valores deben enviarse exactamente como están.

---

## 3. Contrato postMessage (Ecosistema ↔ iframe)

**Archivo:** `src/components/common/MicroservicioFrame.tsx` · `src/types/Auth/dto/IframeAuth.dto.ts`

Comunicación directa entre el ecosistema frontend y el iframe del microservicio. No pasa por ningún backend.

---

### Ecosistema → iframe: autenticación

Se envía al cargar el iframe (`onLoad`).

```typescript
// src/types/Auth/dto/IframeAuth.dto.ts
{
  type:    'CISTEM_AUTH';
  token:   string;
  usuario: {
    id_usuario: number;
    name:       string;
    last_name:  string;
    email:      string;
  };
}
```

---

### Ecosistema → iframe: navegación

Se envía cuando el usuario hace click en una pestaña del sidebar o en una notificación con link.

**Archivo:** `src/components/common/MicroservicioFrame.tsx` (vía `navegacion` en `auth.store.ts`)

```typescript
{
  type: 'NAVIGATE';
  link: string; // ruta interna, ej: "/evidencia"
}
```

El iframe lo recibe en `NavigationListener.tsx` y llama a `router.push(link)`.

---

### iframe → Ecosistema: token expirado

El iframe lo emite cuando recibe un 401 y el refresh falla.

```typescript
{
  type:   'TOKEN_EXPIRED';
  source: 'cistem-vision';
}
```

---

## 4. Variables de entorno requeridas

| Variable | Descripción | Ejemplo |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | URL del backend ecosistema | `http://localhost:3000` |
| `NEXT_PUBLIC_URL_MICROSERVICIO_CISTEM_VISION` | URL del frontend de CistemVision | `http://localhost:4000` |
