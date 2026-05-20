# Jewelry Point of Sale

Frontend de punto de venta para una joyería con catálogo público, carrito guest y dashboard administrativo.

## Descripción

Sitio web construido con Next.js, TypeScript y Tailwind CSS. El proyecto está diseñado para funcionar como frontend principal sin backend propio, apoyándose en una futura integración con Supabase para datos, autenticación y almacenamiento.

## Características principales

- Catálogo público de productos
- Carrito de compra en el navegador
- Checkout como invitado (guest) con campos básicos
- Dashboard administrativo para gestionar productos, pedidos y egresos
- Diseño blanco/negro con acentos dorados y tonos grises
- Base de documentación y esquema de datos en la carpeta `docs/`

## Tecnologías

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- React Icons
- Supabase (planeado como backend-as-a-service)

## Estructura de rutas

- `/` — Página de inicio
- `/products` — Catálogo público
- `/cart` — Carrito de compras
- `/checkout` — Checkout guest
- `/order-confirmation/[id]` — Confirmación de pedido
- `/admin` — Panel administrativo

## Documentación

La documentación del proyecto se encuentra en la carpeta `docs/`:

- `docs/project-plan.md` — Plan general del proyecto y arquitectura.
- `docs/database-design.md` — Diseño del modelo de datos.
- `docs/database-schema.sql` — Script SQL del esquema de base de datos.
- `docs/preguntas.md` — Cuestionario y respuestas del proyecto.

## Cómo ejecutar

Instala dependencias y ejecuta el servidor de desarrollo:

```bash
npm install
npm run dev
```

Abre `http://localhost:3000` en el navegador.

## Variables de entorno

Copia `.env.example` a `.env` y completa las variables con tu proyecto de Supabase:

```bash
cp .env.example .env
```

- `NEXT_PUBLIC_SUPABASE_URL` — URL de tu proyecto Supabase.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — clave pública anon de Supabase.

## Build

Genera la versión de producción:

```bash
npm run build
```

## Notas

- El frontend actual está preparado para un MVP rápido.
- La integración con Supabase ya está esbozada con un cliente `supabase-js` y login admin en `/admin/login`.
- La integración con Supabase debe configurarse con `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- El campo `customer_email` en pedidos es opcional para soportar checkout completamente guest.

## Estado actual

El proyecto compila correctamente y cuenta con la estructura base de UI, carrito, checkout guest y panel admin. Falta completar el auth real y la sincronización de datos con Supabase.
