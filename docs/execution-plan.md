# Plan de ejecución

## Objetivo
Definir los pasos necesarios para completar el proyecto de frontend de punto de venta para joyería, incluyendo las tareas de diseño, integración, seguridad y despliegue.

## Checklist de avances

### 1. Estructura y diseño base
- [x] Mantener y revisar el diseño blanco/negro con acentos dorados.
- [x] Validar las rutas básicas de la aplicación (`/`, `/products`, `/cart`, `/checkout`, `/order-confirmation/[id]`, `/admin`).
- [x] Agregar layout común con navbar y footer global.
- [x] Crear componentes reutilizables para tarjetas de producto, botones y formularios.

### 2. Catálogo y carrito
- [x] Implementar la lista de productos en `/products`.
- [x] Añadir filtros por categoría y búsqueda básica.
- [x] Desarrollar la lógica del carrito en el navegador (localStorage/sessionStorage).
- [x] Mostrar resumen del carrito y cantidades.

### 3. Checkout guest
- [x] Crear formulario de checkout con campos obligatorios:
  - `customer_name`
  - `customer_phone`
  - `note`
  - `customer_email` opcional
- [x] Añadir validación de datos en UI.
- [x] Preparar la creación de pedido con items y total.

### 4. Administración básica
- [ ] Implementar login de admin con Supabase Auth (email/password).
- [ ] Configurar la ruta `/admin` y protegerla solo para admins.
- [ ] Crear vistas internas de admin:
  - Productos
  - Pedidos
  - Egresos
  - Reportes básicos
- [ ] Añadir acciones de CRUD para productos.
- [ ] Añadir vistas de detalle y actualización de pedidos.

### 5. Datos y backend-as-a-service
- [ ] Configurar Supabase con las tablas propuestas en `docs/database-schema.sql`.
- [ ] Aplicar RLS en Supabase para proteger datos sensibles.
- [ ] Establecer reglas de acceso público y admin:
  - lectura pública de productos/categorías
  - creación guest de pedidos limitada
  - acceso admin a pedidos, egresos y productos
- [ ] Configurar Supabase Storage para imágenes de producto y comprobantes.

### 6. Integración y lógica de negocio
- [ ] Conectar frontend con Supabase para leer productos.
- [ ] Crear pedidos desde checkout guest en Supabase.
- [ ] Implementar descuento automático de stock al confirmar pedido.
- [ ] Registrar order_items y totales correctamente.
- [ ] Añadir control de estados de pedido.

### 7. Seguridad y validaciones
- [ ] No exponer claves sensibles en el frontend.
- [ ] Usar solo la `anon` key para el cliente.
- [ ] Añadir validaciones adicionales en la base de datos para pedidos.
- [ ] Proteger uploads de Storage para que solo admin pueda escribir.
- [ ] Revisar todas las políticas RLS con pruebas.

### 8. Calidad y lanzamiento
- [x] Agregar README con instrucciones y estado del proyecto.
- [x] Mantener la documentación actualizada en `docs/`.
- [x] Probar el flujo completo desde catálogo hasta confirmación de pedido.
- [ ] Preparar el despliegue en Vercel.
- [x] Verificar build de producción y corregir warnings o errores.

## Notas
- La parte más crítica es la integración de Supabase y las reglas de seguridad, porque el proyecto no tendrá backend propio.
- Este plan asume que la UI actual seguirá evolucionando sobre la base ya implementada.
- Si se quiere acelerar, es recomendable concentrarse primero en el catálogo, carrito, checkout guest y la protección del admin.

## Cambio de alcance: enfoque en Admin
- **Decisión:** Este repositorio queda centrado exclusivamente en la aplicación de administración (panel de control / punto de venta para empleados/admins). La parte pública de catálogo y tienda del cliente se extraerá a un proyecto independiente.
- **Consecuencias inmediatas:**
  - Las rutas y componentes bajo `src/app/products`, `src/app/cart`, `src/app/checkout`, `src/app/order-confirmation` y páginas públicas relacionadas se consideran candidatos para mover al nuevo repositorio.
  - El contenido en `src/app/admin` se convierte en el foco principal de desarrollo, pruebas y despliegue.
  - Componentes reutilizables y lógica de negocio que deban compartirse pueden extraerse a una librería compartida (`packages/ui` o similar) o publicarse como paquete interno.
- **Tareas de migración:**
  - Marcar y documentar las rutas y componentes que se van a migrar.
  - Crear un plan de extracción para assets e imágenes (Supabase Storage o CDN).
  - Actualizar `README.md` y `docs/` indicando el nuevo scope y el repositorio destino para el cliente.

### Prioridad reajustada
- Priorizar items del checklist relacionados con `Administración básica`, `Datos y backend-as-a-service`, `Integración y lógica de negocio` y `Seguridad y validaciones`.
- Posponer o mover a otro repo los items enfocados exclusivamente al flujo de cliente (catalog, carrito, checkout) salvo que sean necesarios para pruebas de integración.

## Secciones faltantes (ampliación)

### 9. Hitos y cronograma
- **MVP (2 semanas):** Catálogo, carrito, checkout guest, creación de pedidos en Supabase, página de confirmación.
- **Admin mínimo (1 semana):** Login de admin, vistas de pedidos y productos (solo lectura/edición básica).
- **Seguridad y RLS (1 semana):** Implementar reglas RLS, pruebas y ajustes de Storage.
- **Despliegue y QA (1 semana):** Preparar entorno de staging, CI, tests E2E y despliegue a producción.

### 10. Pruebas y QA
- **Unitarias:** Cubrir utilidades y hooks (`utils.ts`, `supabase-service.ts`, contextos) con tests.
- **Integración:** Probar integración con Supabase usando datos de prueba (mock o proyecto de staging).
- **E2E:** Flujos críticos con Playwright/Playwright Test: añadir al carrito, checkout, creación de pedido, login admin.
- **Accesibilidad:** Revisar contraste, navegación por teclado y etiquetas ARIA principales.

### 11. Despliegue y CI/CD
- **Plataforma:** Vercel para frontend; usar proyecto de Supabase para BaaS.
- **Variables de entorno:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (solo en acciones seguras/no en Vercel frontend).
- **Build:** Comando: `npm run build`; output: carpeta `.next` (configurar en Vercel).
- **CI:** GitHub Actions para: lint, tests unitarios, build y E2E contra staging antes de merge a `main`.
- **Staging:** Deploy automático de ramas `develop`/`staging` y manual a `main` para producción.

### 12. Monitoreo, logging y errores
- **Errores frontend:** Integrar Sentry o similar para capturar errores JS en producción.
- **Logs Supabase:** Revisar logs y auditoría en Supabase para accesos y operaciones críticas.
- **Alertas:** Notificaciones por errores críticos y fallos en procesos de creación de pedidos.

### 13. Backups y migraciones
- **Backups:** Programar exportaciones regulares de la base de datos Supabase (snapshots) y almacenamiento de archivos.
- **Migraciones:** Mantener scripts SQL versionados para cambios de esquema en `docs/database-schema.sql` o carpeta `db/migrations`.

### 14. Datos de prueba y seed
- **Seed de productos:** Crear script `scripts/seed-products.ts` (o SQL) para poblar productos de prueba en staging.
- **Imágenes:** Usar versiones optimizadas y establecer convención de nombres en Storage.

### 15. Operaciones post-despliegue
- **Verificación:** Comprobar flujo de compra y creación de pedido en producción (un pedido de verificación).
- **Rollback:** Tener un plan de rollback (revertir commit y redeploy) y restaurar DB desde último snapshot si es necesario.

### 16. Criterios de aceptación
- **Funcional:** Usuario puede comprar sin crear cuenta y recibe confirmación de pedido.
- **Administración:** Admin puede ver y actualizar pedidos y productos desde `/admin`.
- **Seguridad:** RLS evita modificaciones desde el cliente para recursos restringidos.
- **Calidad:** Tests E2E pasan en CI y build de producción es exitoso.

### 17. Riesgos y mitigaciones
- **Exposición de claves:** Revisar variables de entorno y limitar uso de `service_role` solo en backend seguro.
- **Rendimiento:** Optimizar imágenes, lazy-loading y caches; usar CDN y política de caché en Vercel.
- **Errores en pagos (si aplica):** Implementar pruebas y manejo de fallos; mostrar estado claro al usuario.

### 18. Próximos pasos inmediatos
- Implementar integración básica con Supabase (lectura de productos).
- Añadir tests unitarios para `cart-context` y lógica de totales.
- Crear proyecto de staging en Supabase y script de seed.

---

Si quieres, puedo crear los archivos de scripts sugeridos (`scripts/seed-products.ts`, configuración de GitHub Actions, o un `playwright.config.ts`) y dejar PRs listas para revisión.
