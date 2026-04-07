# COnvenciones de Codigo

Es importante mantener el código limpio y organizado para facilitar su mantenimiento y escalabilidad. A continuación se
detallan algunas sugerencias y correcciones a realizar en el código para mejorar su calidad y coherencia.

## Estructura de Archivos para vistas

Cada vista puede tener **modales**, **componentes** específicos, **estilos** asociados o **mensajes/alertas**, pero
todos estos archivos deben estar organizados dentro de una carpeta específica para esa vista. Esto mejora la
organización y facilita la navegación por el proyecto.
Por ejemplo, para la vista de órdenes, podríamos tener la siguiente estructura:

```bash
src/
├── app/
│   ├── (dashboard)/
│   │   ├── admin/
│   │   │   ├── ordenes/
                ├── Modals/
                │   ├── FiltersOrderModal.tsx
                │   ├── EditOrderModal.tsx
                │   └── ...
                ├── Components/
                │   ├── OrderList.tsx
                │   ├── OrderItem.tsx
                │   └── ...
                ├── Messages/
                │   ├── OrderSuccessMessage.tsx
                │   ├── OrderErrorMessage.tsx
                │   └── ...
```

De esta manera se mantiene una estructura, además, es **importante** `no` anidar objetos o tipos, cada uno debe estar en
su propio archivo.

> Es importante notar que modales como el de `éxito`, `error`, `confirmación`, etc., pueden ser reutilizables en varias
> vistas, por lo que podrían estar en una carpeta común como `src/components/common/Modals/`, pensar en si el modal es
> específico de una vista o si puede ser reutilizado en varias partes del proyecto, si es lo segundo, entonces debería
> estar en una carpeta común.

## DTOs y tipos

Es **super** importante tener los DTOs bien definidos en su propio archivo, por ejemplo, para el contrato de crear
orden, crear un archivo `src/types/orders/dto/CreateOrder.dto.ts` con la definición del DTO. Buscar que coincidan en la
medida de lo posible con los DTOs del backend (entiendo que hay partes que requieren que yo los adapte, eso marcarlo
como pendiente).

El archivo `src/types/types.ts` debe contener solamente tipos globales o comunes a varias partes del proyecto, pero no
tipos específicos de una vista o funcionalidad, esos deben estar en su propio archivo dentro de la carpeta de esa vista
o funcionalidad, así como también las entidades o interfaces que representen modelos de datos específicos, como `Order`,
`Cliente`, `Prioridad`, etc., deben estar en archivos separados dentro de `src/types/models/`.

> Tipos que solo se usan en un componente específico y son muy simples, como por ejemplo un tipo para el estado local de
> un componente, pueden estar definidos dentro del mismo archivo del componente, pero si el tipo es más complejo,
> fundamental (representa una entidad de la base de datos) o se usa en varios lugares, debe estar en su propio archivo.

Un **DTO** es distinto a un **tipo**, y a su vez es distinto a una **entidad o modelo**:
| Concepto | Descripción | Ejemplo |
| --- | --- | --- |
| DTO (Data Transfer Object) | Es un objeto que se utiliza para transferir datos entre capas o sistemas, generalmente se
usa para definir la estructura de los datos que se envían o reciben en las llamadas a la API. | `CreateOrderDTO` que
define los campos necesarios para crear una orden. |
| Tipo (Type) | Es una definición de un tipo de dato en TypeScript, puede ser un alias de un tipo primitivo, una unión
de tipos, una intersección de tipos, etc. | `OrderFilter` que define los campos que se pueden usar para filtrar las
órdenes. |
| Entidad/Modelo | Es una representación de una entidad del dominio, generalmente corresponde a una tabla en la base de
datos, y se usa para definir la estructura de los datos que se manejan en la aplicación. | `Order` que representa una
orden con todos sus campos y relaciones. |

Cada uno debe estar debidamente definido en su propio archivo, y deben seguir una nomenclatura clara y consistente, por
ejemplo:

- DTOs: `src/types/[Entidad]/dto/[Nombre].dto.ts` (ej. `src/types/Order/dto/CreateOrder.dto.ts`)
- Tipos: `src/types/[Entidad]/[Nombre].type.ts` (ej. `src/types/Order/OrderFilter.type.ts`)
- Entidades/Modelos: `src/types/models/[Nombre].ts` o `src/types/[Entidad]/[Nombre].ts` (ej.
  `src/types/models/Order.ts`)

De esta manera podemos navegar fácilmente por el proyecto y encontrar rápidamente la definición de cada tipo, DTO o
modelo.

## Uso de enums

Si hay valores que se repiten y tienen un conjunto limitado de opciones, como por ejemplo los estados de una orden, **NO
HARDCODEAR** strings, usar `enums` para definir esos valores; esto mejora la legibilidad y escalabilidad. **Crear tipos
no está mal**, pero los enums tienen la ventaja de que son más fáciles de usar y entender. Los tipos son más flexibles,
pero están más orientados a definir operaciones o estructuras de datos, mientras que para el uso que se les está dando
en el proyecto, los enums son más adecuados.

Los enums comúnmente se crean siguiendo la siguiente nomenclatura: `src/types/[Tipo]/[Nombre].enum.ts` (ej.
`src/types/Order/OrderStatus.enum.ts`), los enums que hay en el backend por ejemplo son:

```typescript
export enum PrioridadEnum {
    CRITICO = 'Critical',
    ALTA = 'Alta',
    MEDIA = 'Media',
    BAJA = 'Muy baja',
    MUY_BAJA = 'Demasiado bajo',
}
```

Después, al usarlos en los componentes, se importan y se usan directamente, por ejemplo:

```typescript
import {PrioridadEnum} from 'src/types/Prioridad/Prioridad.enum.ts';

// Más claro que usar el valor directamente, además de que si se cambia el valor en el enum, se actualiza automáticamente en todos los lugares donde se use.
const prioridad = PrioridadEnum.CRITICO;
```

Esto es fundamental porque, por ejemplo, en el archivo `OrderTable.tsx` tenemos algo así:

```typescript
    if (s.includes('critico')) {
    return {label: 'Critico', cls: 'bg-[#921517] text-white'};
}
if (s.includes('alta') || s.includes('prioritario')) {
    return {label: 'Alto', cls: 'bg-[#E53838]/80 text-white'};
}
if (s.includes('media')) {
    return {label: 'Medio', cls: 'bg-[#E2C328]/80 text-white'};
}
if (s.includes('baja')) {
    return {label: 'Bajo', cls: 'bg-[#67A448]/80 text-white'};
}
if (s.includes('muy baja')) {
    return {label: 'Muy Bajo', cls: 'bg-[#36D279]/80 text-white'};
}
if (s.includes('demasiado baja')) {
    return {label: 'Demasiado Bajo', cls: 'bg-[#6DA2E3]/80 text-white'};
}
if (s.includes('no aplica')) {
    return {label: 'No aplica', cls: 'bg-[#898989]/80 text-white'};
}
```

Los roles en la base de datos (`StatusEnum`) son distintos, si usaramos enums solamente podemos modificar el archivo del
enum para cambiar el valor (o una función de mapeo, en su defecto), y se actualiza automáticamente en todos los lugares
donde se use, mientras que si usamos strings, tenemos que buscar y reemplazar en todo el código, lo cual es propenso a
errores y no es escalable.

Además, si cambiamos el archivo enum, va a dar error en los lugares donde se use el valor antiguo, lo cual es una
ventaja porque nos obliga a actualizar el código y no dejar valores obsoletos.

> Obviamente esto es un ejemplo, puede ser que en algunos casos no sea necesario usar enums, pero en general, para
> valores que se repiten y tienen un conjunto limitado de opciones, los enums son la mejor opción.

## Endpoints

Un poco relacionado con lo anterior, es importante tener los endpoints bien organizados, por ejemplo, crear un archivo
`src/api/endpoints/orders.ts`, no tenerlos todos mezclados en un solo archivo (como estan en `src/api/endpoints.ts`), no
es necesario que sea uno por cada recurso, pero si es recomendable tenerlos organizados por funcionalidad, por ejemplo
`src/api/usuarios.endpoints.ts`, `src/api/ordenes.endpoints.ts`, `src/api/clientes.endpoints.ts`, etc.

## Mocks

Dos mocks si estan en su propio archivo `mockNotifications.ts` y `mockOrders.ts`, como recomendación, estaría bien crear
una carpeta `src/mocks/`. Sin embargo, otros como `mockCategorias` están embebidos en el código.

No es que sea malo, pero los mocks son muy verbosos, y si están embebidos en el código, hacen que sea difícil de leer,
además de que si se quieren reutilizar en otros lugares, no se puede. Por eso es recomendable tenerlos en su propio
archivo, así se mantiene el código más limpio y organizado.

## Funciones auxiliares

Funciones que se usan en varios lugares, por ejemplo, la función
`formatDate` ([que se repite 4 veces, y al menos 3 de esas es prácticamente igual a mi vista](/doc/image.png)) del
archivo `ConfirmAssignOrderModal.tsx` que se usa para formatear fechas:

```typescript
  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'N/A';
        return date.toLocaleString('es-MX', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    } catch {
        return 'N/A';
    }
};
```

Estoy casi seguro que se va a usar en más partes del proyecto, por lo que podría estar en un archivo
`src/utils/formatDate.ts`. En caso de que sea algo específico de la vista de órdenes, podría estar en
`src/app/(dashboard)/admin/ordenes/utils/formatDate.ts`.

## Funciones largas

Si hay funciones muy largas, complejas, y que no son necesarias para entender el flujo principal del componente, es
recomendable extraerlas a funciones auxiliares. Por ejemplo, en `OrderTable.tsx`, toda la lógica de ordenamiento podría
estar en un archivo aparte `src/app/(dashboard)/admin/ordenes/utils/sorting.ts`, pues todo eso está relacionado:

```typescript
type SortDir = 'none' | 'asc' | 'desc';
type
    SortKey =
    | 'fecha'
    | 'folio'
    | 'cliente'
    | 'categoria'
    | 'sucursal'
    | 'severidad';


const cycleSort = (key: SortKey) => {
    setSort((prev) => {
        if (prev.key !== key) return {key, dir: 'asc'};
        const next: SortDir =
            prev.dir === 'none' ? 'asc' : prev.dir === 'asc' ? 'desc' : 'none';
        return {key, dir: next};
    });
};

const sortedOrders = useMemo(() => {
    if (sort.dir === 'none') return orders;

    const dirFactor = sort.dir === 'asc' ? 1 : -1;

    const getValue = (o: OrderListRow) => {
        switch (sort.key) {
            case 'fecha':
                return new Date(o.fecha_creacion).getTime();
            case 'folio':
                return o.idOrden ?? '';
            case 'cliente':
                return o.Cliente ?? '';
            case 'categoria':
                return o.Categoria ?? '';
            case 'sucursal':
                return o.Sucursal ?? '';
            case 'severidad':
                return o.Prioridad ?? '';
            default:
                return '';
        }
    };

    const copy = [...orders];

    copy.sort((a, b) => {
        const av = getValue(a);
        const bv = getValue(b);

        if (typeof av === 'number' && typeof bv === 'number') {
            return (av - bv) * dirFactor;
        }

        return (
            String(av).localeCompare(String(bv), 'es', {sensitivity: 'base'}) *
            dirFactor
        );
    });

    return copy;
}, [orders, sort.key, sort.dir]);
```

Y todo ese código podría quitarse directamente del componente principal (aunque en este caso ese código ni siquiera
debería existir porque eso es lógica de back, pero es un ejemplo de función larga que se podría extraer a un archivo
aparte para mantener el componente más limpio y enfocado en la UI).

## Llamada de API

Marcar con un comentario `TODO` cada parte del código donde se espere una llamada a la API, para que sea más fácil de
identificar y completar posteriormente, por ejemplo:

```typescript
// TODO: Reemplazar con llamada real a la API
const fetchOrders = async (filters: OrderFilter) => {
    // Simulación de llamada a la API
    return new Promise<Order[]>((resolve) => {
        setTimeout(() => {
            resolve(mockOrders);
        }, 1000);
    });
};
```

> Soy consciente de que faltan endpoints, por ejemplo el de la intersección usuario-cliente para desplegar el select en
> la creación de orden, usar mocks, pero es importante dejarlo marcado con el `TODO`.

## Eliminar lógica de LocalStorage para Refresh Token

Actualmente, el código tiene lógica para manejar el refresh token usando localStorage, lo cual no es seguro ni
recomendable. Es importante eliminar eso, yo me encargo del manejo de cookies y refresh token, pero es importante que el
código del frontend no tenga lógica relacionada con eso, para evitar confusiones y problemas de seguridad.

## Resumen

- [ ] Organizar archivos por vistas y funcionalidades (modales, componentes, estilos, mensajes, etc. dentro de la
  carpeta de cada vista).
- [ ] Crear archivos dedicados para DTOs, tipos y modelos, siguiendo una nomenclatura clara y consistente.
- [ ] Usar enums para valores que se repiten y tienen un conjunto limitado de opciones.
- [ ] Organizar los endpoints en archivos separados por funcionalidad.
- [ ] Extraer los mocks a archivos separados para limpiar código.
- [ ] Extraer funciones reutilizables a archivos de utilidades para mantener el código limpio y organizado.
- [ ] Extraer funciones largas o complejas a archivos de utilidades para mantener los componentes limpios y enfocados en
  la UI.
- [ ] Marcar con `TODO` las partes del código donde se esperan llamadas a la API para facilitar su identificación y
  posterior implementación.
- [ ] Eliminar cualquier lógica relacionada con el manejo de refresh token y localStorage para mejorar la seguridad.

## Importante

Nada de esto son reglas rígidas, mucho depende del contexto, y de las necesidades específicas de cada
componente/clase/vista, pero en general, seguir estas recomendaciones va a ayudar a mantener el código más limpio,
organizado y fácil de mantener a largo plazo.