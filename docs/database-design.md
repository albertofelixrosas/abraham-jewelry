# Diseño de base de datos — Jewelry Point of Sale

## Objetivo
Documento de referencia para el modelo de datos del proyecto: catálogo público, checkout guest, dashboard admin, y gestión de egresos.

## Tablas principales

### `categories`
- `id`: UUID
- `name`: texto
- `slug`: texto único
- `created_at`, `updated_at`

### `products`
- `id`: UUID
- `name`: texto
- `description`: texto
- `price`: numeric(12,2)
- `sku`: texto único
- `stock`: integer
- `category_id`: UUID opcional
- `active`: boolean
- `created_at`, `updated_at`

### `product_images`
- `id`: UUID
- `product_id`: UUID
- `url`: texto
- `alt`: texto
- `sort_order`: integer
- `created_at`

### `admin_users`
- `id`: UUID
- `auth_uid`: UUID opcional
- `email`: texto único
- `name`: texto
- `role`: texto (`admin`)
- `created_at`, `updated_at`

### `orders`
- `id`: UUID
- `created_at`, `updated_at`
- `status`: enum (`pendiente`, `confirmado`, `pagado`, `cancelado`, `entregado`)
- `customer_name`: texto
- `customer_email`: texto opcional
- `customer_phone`: texto
- `shipping_address`: texto opcional
- `note`: texto
- `total`: numeric(12,2)
- `payment_method`: texto
- `admin_notes`: texto opcional

### `order_items`
- `id`: UUID
- `order_id`: UUID
- `product_id`: UUID
- `quantity`: integer
- `unit_price`: numeric(12,2)
- `subtotal`: numeric(12,2)
- `created_at`

### `expenses`
- `id`: UUID
- `date`: date
- `amount`: numeric(12,2)
- `category`: texto
- `vendor`: texto
- `note`: texto
- `receipt_url`: texto
- `created_at`, `updated_at`

## Relación entre tablas
- Un producto pertenece a una categoría.
- Un producto puede tener varias imágenes.
- Un pedido contiene varios `order_items`.
- Cada línea de pedido referencia un producto.

## Notas de diseño
- `customer_email` es opcional para checkout guest.
- `stock` se descuenta al confirmar el pedido.
- El campo `category_id` en `products` mejora filtrado y organización.
- `admin_users.role` queda preparado para futuras extensiones de roles.

## Rutas sugeridas de Next.js
### Público
- `/`
- `/products/[slug]`
- `/cart`
- `/checkout`
- `/order-confirmation/[id]`

### Admin
- `/admin`
- `/admin/products`
- `/admin/products/new`
- `/admin/products/[id]`
- `/admin/orders`
- `/admin/orders/[id]`
- `/admin/expenses`
- `/admin/reports`

## Arquitectura recomendada
- Next.js App Router
- Server Components para consultas públicas y admin
- Client Components para carrito y formularios
- Supabase Auth para admin
- Supabase Storage para imágenes
- RLS para protección de datos admin
