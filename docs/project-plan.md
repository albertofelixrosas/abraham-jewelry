# Plan del proyecto — Frontend sin backend tradicional

## Objetivo general
Crear un sitio web para una joyería que permita mostrar catálogo, recibir pedidos guest y administrar ventas desde un panel de administrador, sin desarrollar un backend propio.

## Alcance
- Catálogo público de productos.
- Carrito de compras en el navegador.
- Checkout guest sin cuenta de cliente obligatoria.
- Panel administrativo privado para el super admin.
- Gestión de productos, pedidos y egresos.
- Reportes básicos de ventas, ingresos y stock.
- Almacenamiento de imágenes y datos con un servicio BaaS.

## Contexto
El cliente quiere una solución rápida y efectiva donde el frontend sea la capa principal, sin invertir en un servidor propio. Esto se traduce en:
- Una experiencia de comercio con carrito y pedido guest.
- Administración centralizada para el dueño.
- Uso de infraestructura gestionada (ej. Supabase) para datos, auth y storage.

## Enfoque técnico
### Arquitectura
- Next.js con App Router.
- Frontend público en Vercel.
- Supabase como backend-as-a-service:
  - Auth para administrador.
  - Database para tablas de productos, pedidos, items, egresos.
  - Storage para imágenes de producto y comprobantes.
  - RLS para proteger el dashboard.
- No se construye un servidor API propio; el cliente accede directamente a Supabase.

### Beneficios
- Menor complejidad de desarrollo.
- Deploy más rápido.
- Menos mantenimiento operativo.
- Uso de autenticación y almacenamiento gestionado.

### Limitaciones y consideraciones
- El frontend necesita cuidar la seguridad de las credenciales y políticas de acceso en Supabase.
- La lógica de negocio debe diseñarse con reglas de seguridad en la base de datos y/o funciones edge si es necesario.
- El acceso a la administración debe restringirse al super admin único.
- El servicio BaaS se convierte en dependencia central del proyecto.

## Seguridad mínima recomendada
- No exponer la `service_role_key` ni ninguna credencial sensible en el frontend.
- Usar la `anon` key de Supabase solo para operaciones permitidas desde el cliente.
- Construir políticas RLS estrictas en todas las tablas relevantes.
  - Productos, categorías e imágenes: solo `SELECT` público.
  - `orders` y `order_items`: permitir `INSERT` desde cliente guest solo con restricciones claras y no permitir `UPDATE`/`DELETE` por usuarios anónimos.
  - `admin_users`, `expenses` y contenido administrativo: acceso únicamente para usuarios autenticados con rol `admin`.
- Para el checkout guest, validar en la base de datos que los pedidos se creen con campos obligatorios mínimos (`customer_name`, `customer_phone`, `total >= 0`, `status = 'pendiente'`).
- Las operaciones sensibles (cambio de estado, registro de egresos, creación/edición de productos) deben quedar bloqueadas para usuarios no autenticados.
- Configurar políticas de almacenamiento en Supabase Storage:
  - Imágenes públicas de catálogo: lectura pública.
  - Subidas y modificaciones de imágenes: solo admin autenticado.
  - Recibos o comprobantes pueden tener reglas más restrictivas si se desea.

### Recomendaciones adicionales
- Si se quiere mayor seguridad sin backend propio, se puede usar Supabase Edge Functions como capa de validación serverless para crear pedidos y controlar stock.
- Documentar claramente qué tablas son públicas y qué tablas son solo de admin.
- Mantener el frontend como cliente seguro, con lógica de validación en UI y en la base de datos.

## Objetivos funcionales
- Mostrar listado de productos con filtros por categoría y disponibilidad.
- Permitir agregar productos a carrito y revisar pedido.
- Completar el checkout con datos de cliente guest: nombre, teléfono, nota y email opcional.
- Registrar pedidos con líneas de items y totales.
- Descontar stock automáticamente al confirmar el pedido.
- Administrar productos, categorías, stock y pedidos desde un dashboard.
- Registrar egresos operativos y consultar reportes básicos.

## Objetivos no funcionales
- Ser un MVP viable para despliegue rápido.
- Mantener la interfaz en español.
- Soportar imágenes JPG/PNG de hasta ~1MB.
- Permitir despliegue en Vercel con Supabase hospedado.

## Estructura propuesta
### Rutas públicas
- `/` — catálogo
- `/products/[slug]` — detalle de producto
- `/cart` — carrito
- `/checkout` — checkout guest
- `/order-confirmation/[id]` — confirmación

### Rutas admin
- `/admin` — dashboard
- `/admin/products`
- `/admin/products/new`
- `/admin/products/[id]`
- `/admin/orders`
- `/admin/orders/[id]`
- `/admin/expenses`
- `/admin/reports`

## Nota final
Este plan documenta claramente la intención de no usar un backend propio y de aprovechar un servicio gestionado para la lógica de datos y autenticación. El resultado será un frontend completo y autónomo apoyado en infraestructura BaaS.
