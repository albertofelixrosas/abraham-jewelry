# Cuestionario — Sitio web con catálogo + pedidos + dashboard admin

## 1. Visión general del proyecto
- ¿Cuál es el objetivo principal del sitio web? (mostrar catálogo, recibir pedidos, administrar ventas, generar reportes)
R. Mostrar catálogo, recibir pedidos, administrar ventas, generar reportes
- ¿El cliente quiere un sitio público para clientes con un catálogo visible y un panel privado exclusivamente para el administrador?
R. Si
- ¿Cuál es el valor más importante para el cliente? (ventas online, control de stock, facilidad de gestión, insights de negocios)
R. Todas (ventas online, control de stock, facilidad de gestión, insights de negocios)
- ¿Debe el sitio ser una tienda completa con pedidos desde que el cliente elige productos hasta la confirmación final?
R. Si

## 2. Usuarios y roles
- ¿Habrá dos grandes perfiles: clientes/visitantes y un super admin?
R. Como tal, los clientes no tendrían un usuario pero la pagina podría contar con un carrito de compra en la memoria del navegador, para no tener que forzar a los usuarios dar sus datos personales desde un principio. Solamente habría seguridad de usuario para que el administrador maestro pueda acceder y realizar sus labores como dueño (actualizar catagolo por ejemplo).
- ¿Deseas mantener solo un usuario administrador único para inicio, o prefieres preparar el proyecto para roles adicionales (empleados, contador, vendedor) en el futuro?
R. Solo quisiera para un solo usuario administrador unico
- ¿Los clientes podrán crear cuenta, o el pedido será solo como invitado/contacto de venta?
R. El pedido será solo como invitado/contacto de venta
- ¿Qué datos mínimos deben registrar los clientes al hacer un pedido? (nombre, email, teléfono, dirección, nota)
R. Nombre, teléfono y nota.

## 3. Funcionalidad del catálogo y experiencia cliente
- ¿Qué información debe mostrarse en cada producto? (`nombre`, `descripción`, `precio`, `stock`, `imágenes`, `categoría`, `variantes`, `estado`)
R. Exactamente, esa.
- ¿Necesita filtros por categoría, precio, tipo de producto o disponibilidad?
R. Si
- ¿Deseas un sistema de carrito y/o pedido pre-cargado que pueda reservar un pedido antes de finalizar?
R. Si
- ¿El cliente debe poder enviar mensajes o notas junto al pedido?
R. Si
- ¿El pedido puede generarse con productos preseleccionados desde una URL, plantilla o formulario interno?
R. Si

## 4. Flujo de pedidos y ventas
- ¿Cómo debe funcionar el flujo de pedido desde el catálogo hasta la confirmación?
  - Ejemplo: agregar al carrito → revisar pedido → completar datos → confirmar.
R. Sí, ese flujo es correcto
- ¿Necesitas estados de pedido/venta como `pendiente`, `confirmado`, `pagado`, `cancelado`, `entregado`?
R. Si, sería lo ideal
- ¿El sistema debe descontar stock automáticamente al confirmar el pedido?
R. Si
- ¿Deseas registrar pedidos como ventas con detalle de ítems, totales, impuestos y descuento?
R. Si
- ¿El cliente debe recibir confirmación por email o solo el administrador recibe aviso interno?
R. Solo el administrador recibe aviso interno

## 5. Dashboard del administrador y reporting
- ¿Qué información desea ver en el dashboard principal? (ventas totales, ingresos, egresos, productos más vendidos, stock bajo)
R. Ventas totales, ingresos, egresos, productos más vendidos, stock bajo
- ¿Qué métricas son prioritarias? (ingresos diarios/semanales/mensuales, número de pedidos, margen, productos top)
R. Ingresos diarios/semanales/mensuales, número de pedidos, margen, productos top
- ¿Necesita gráficos tipo pastel, barras, líneas o tablas con resumen rápido?
R. Si
- ¿Debe existir un historial de ventas con filtros por fecha, cliente, estado de pedido y categoría de producto?
R. Si
- ¿Quieres exportar datos a CSV/PDF desde el dashboard?
R. Si

## 6. Gestión del catálogo por el administrador
- ¿Qué acciones debe poder realizar el admin sobre el catálogo? (crear, editar, eliminar productos, gestionar categorías, subir imágenes)
R. Crear, editar, eliminar productos, gestionar categorías, subir imágenes
- ¿Necesita variaciones de producto como tallas, colores o metadatos específicos?
R. No
- ¿Deseas manejar categorías o etiquetas para organizar los productos?
R. Si, por ejemplo: aretes, anillos, pulseras, etc.
- ¿El admin debe poder ver y editar el stock actual directamente desde el producto?
R. Si
- ¿Se requiere un listado de productos con búsqueda y filtros internos de administración?
R. Si

## 7. Pedidos y ventas en el panel admin
- ¿El admin debe poder ver, filtrar y actualizar el estado de cada pedido?
R. Si
- ¿Debe poder registrar pagos manuales o marcar pedidos como pagados desde el panel?
R. Si
- ¿Quieres un módulo de “pedido pre-cargado” donde el admin pueda preparar una orden y luego enviarla o confirmar la venta?
R. Si
- ¿Es necesario llevar un registro de clientes habituales y sus compras?
R. Si

## 8. Egresos / gastos y finanzas
- ¿Deseas un módulo de egresos para registrar gastos operativos, proveedores y otros desembolsos?
R. Si
- ¿Qué campos serán necesarios para egresos? (`fecha`, `monto`, `categoría`, `proveedor`, `nota`, `comprobante`)
R. Si
- ¿Necesitas reportes combinados de ingresos vs egresos para ver utilidades netas?
R. Si
- ¿Se deben agrupar los egresos por categoría o proyecto?
R. No

## 9. Modelo de datos clave
- Productos/catálogo
  - Campos mínimos: `id`, `nombre`, `descripcion`, `precio`, `sku`, `stock`, `imagenes`, `categoria`, `activo`
  R. Esos campos minimos son correctos
  - ¿Necesitas variaciones (`talla`, `color`, `material`) o basta un producto simple?
  R. Basta con un producto simple
- Pedidos/Ventas
  - Campos clave: `id`, `fecha`, `cliente_nombre`, `cliente_email`, `estado`, `total`, `items[]`, `metodo_pago`, `nota`
  R. Esos campos minimos son correctos
  - ¿Registrarás línea por línea con `producto_id`, `cantidad`, `precio_unitario`, `subtotal`?
  R. Si
- Clientes/contactos
  - ¿Registrarás datos de cliente para seguimiento? (`nombre`, `email`, `telefono`, `direccion`)
  R. Si, con estos datos
- Usuarios/Admin
  - ¿Qué datos mínimos debe tener el super admin? (`email`, `password`, `nombre`, `rol`)
  R. `email`, `password`, `nombre`, `rol` (ej. admin)
- Egresos
  - Campos mínimos: `id`, `fecha`, `monto`, `categoria`, `proveedor`, `nota`, `comprobante_url`
  R. `id`, `fecha`, `monto`, `categoria`, `proveedor`, `nota`, `comprobante_url`

## 10. Gestión de imágenes y assets
- ¿Qué tipos de imágenes manejarás? (productos, banners, logo, comprobantes)
R. Productos, banners, logo, comprobantes
- ¿Qué formatos y tamaños quieres soportar? (`.jpg`, `.png`, `.webp`, `.avif`, máximo MB)
R. `.jpg` y `.png`, y posiblemente las imagenes no pesen más de 1mb
- ¿Deseas subir imágenes directo desde el cliente a Supabase Storage o pasar por lógica de servidor?
R. Subir imágenes directo desde el cliente a Supabase Storage
- ¿Necesitas thumbnails automáticos o compresión en el upload?
R. Si, sería lo deseable
- ¿Quieres servir imágenes desde CDN pública o protegerlas con URLs firmadas?
R. Las imagenes del catalogo no tienen derecho de autor, no lo veo necesario
- ¿Registrar metadata como `alt`, `orden` o `autor` en la base de datos?
R. Si, podría ser necesario

## 11. Tecnologías y arquitectura
- ¿Se usará Next.js con App Router y Server Components para el sitio y dashboard?
R. Si
- ¿Prefieres renderizado híbrido? (páginas públicas SSG/ISR y dashboard en render server/client)
R. Si
- ¿Usarás Supabase Auth para el login del admin y posible registro de cliente?
R. Si
- ¿Estás cómodo usando Supabase Database + Storage + Auth + Edge Functions?
R. Si
- ¿Necesitamos políticas RLS para proteger datos del admin y posibles clientes?
R. Si
- ¿Planeas usar Supabase CLI o migraciones desde código?
R. Supabase CLI

## 12. Seguridad y acceso
- ¿Autenticación solo con email/password, o también quieres opción de OAuth/2FA?
R. Solo email y password
- ¿Debemos limitar el acceso al dashboard solo al super admin único?
R. Si
- ¿Quieres validaciones extras para uploads de imagen y límites de tamaño?
R. Solo limites de tamaño
- ¿Necesitas logs de actividad para saber quién creó/actualizó qué?
R. No

## 13. Internacionalización y localización
- ¿El sitio debe ser solo en español o también en otros idiomas?
R. Solo en español
- ¿Necesitas soporte para formatos de moneda y fecha configurables?
R. Solo se usaran pesos mexicanos, al menos por ahora, pues es un negocio pequeño

## 14. Despliegue y operaciones
- ¿Dónde planeas desplegar el frontend? (Vercel, Netlify, otro)
R. Vercel
- ¿Usarás Supabase como servicio hospedado o autogestionado?
R. Hospedado me interesa
- ¿Necesitas pipeline CI/CD con GitHub Actions y deploy previews?
R. No
- ¿Tienes dominio y certificado SSL listos?
R. No

## 15. Prioridades y roadmap
- ¿Qué funciones son MVP e imprescindibles para la primera versión?
  - Ejemplo MVP: catálogo público, carrito/pedido, login admin, dashboard básico, registro de ventas.
R. Catálogo público, carrito/pedido, login admin, dashboard básico, registro de ventas
- ¿Qué funciones pueden quedar para una segunda etapa? (multi-roles, notificaciones, exportes avanzados)
R. Multi-roles, notificaciones, exportes avanzados
- ¿Cuál es el plazo objetivo para el MVP?
R. Indefinido, pero precizo hacerlo lo más pronto posible

## 16. Entregables y documentación
- ¿Qué entregables quieres entregar al cliente? (código fuente, deploy en producción, manual de uso, demo en video)
R. Código fuente, deploy en producción
- ¿Necesitas instrucciones de setup para desarrollo local y producción?
R. Si, sería lo recomendable

## 17. Preguntas clave para definir ahora
- ¿Preferimos un sitio público con catálogo y checkout, o solo un sistema cerrado de pedidos internos?
R. Un sitio público con catálogo y checkout
- ¿Single admin user o roles ampliables desde el inicio?
R. Single admin user
- ¿El pedido debe poder pre-cargarse en el sitio y luego confirmarse/editarse?
R. Si
- ¿El administrador debe tener un dashboard con ventas, stock y registros de pedidos en una sola vista?
R. No, al menos no es una sola vista

---

### Siguiente paso recomendado
Responde estas preguntas clave:
1. ¿El cliente quiere catálogo público con pedidos en línea o solo un sitio privado interno?
R. Quiere ambas cosas
2. ¿Será un solo super admin o se planifica rol adicional desde el inicio?
R. Un solo super admin
3. ¿Qué campos mínimos quieres en `Productos`, `Pedidos/Ventas` y `Egresos`?
R. Acepto los campos mínimos sugeridos en el cuestionario y podemos dejar los datos estándar propuestos: productos con id/nombre/descripcion/precio/sku/stock/imagenes/categoria/activo; pedidos con id/fecha/cliente_nombre/cliente_email opcional/estado/total/items[]/metodo_pago/nota; egresos con id/fecha/monto/categoria/proveedor/nota/comprobante_url.
4. ¿Necesitas pedido pre-cargado en el sitio y stock automático al confirmar la venta?
R. Si

Con esas respuestas puedo diseñar el esquema SQL y el flujo exacto de Next.js + Supabase para el proyecto.