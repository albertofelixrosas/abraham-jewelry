# Plan para proyecto del cliente (catálogo/tienda)

Este documento describe el plan recomendado para extraer la parte pública (catálogo, carrito, checkout, order confirmation) a un proyecto independiente.

## Objetivo
Crear un repositorio separado que aloje la tienda pública (frontend para clientes), manteniendo integración con Supabase como BaaS y posibilitando releases independientes.

## Estructura sugerida
- `src/` - aplicación Next.js (rutas públicas, páginas de productos, carrito, checkout)
- `components/` - componentes UI específicos del cliente
- `packages/ui/` (opcional) - librería compartida si se desea compartir componentes con admin
- `scripts/seed-products.ts` - script de seed para poblar staging
- `docs/` - documentación del proyecto cliente

## Pasos de migración
1. Auditar y listar todos los archivos relacionados con el flujo público en el repo actual (`src/app/products`, `src/app/cart`, `src/app/checkout`, `src/app/order-confirmation`, imágenes públicas).
2. Extraer componentes reutilizables a `packages/ui` (si se opta por monorepo) o copiarlos al nuevo repo.
3. Migrar assets e imágenes a Storage o CDN y actualizar URLs.
4. Crear proyecto en Supabase para staging del cliente (o usar el mismo proyecto con esquemas/roles separados según conveniencia).
5. Configurar CI/CD y deploy (Vercel) para el nuevo repo.

## Checklist inicial
- [ ] Crear repositorio `jewelry-point-of-sale-client` (o `shop`)
- [ ] Copiar/extraer rutas y componentes públicos
- [ ] Implementar `scripts/seed-products.ts` y poblar staging
- [ ] Configurar variables de entorno en Vercel
- [ ] Añadir tests E2E para los flujos de compra
- [ ] Documentar diferencias con el repo de admin

## Opciones de organización
- **Repositorio separado (recomendado):** Repos separados para admin y cliente — despliegues independientes, responsabilidades claras.
- **Monorepo (alternativa):** Ambos proyectos en un monorepo con `packages/ui` compartido — facilita compartir componentes, pero añade complejidad en CI.

## Timeline sugerido
- Preparación y auditoría: 1-2 días
- Extracción y seed: 2-3 días
- Tests y CI: 2 días
- Deploy a staging: 1 día

## Notas
- Mantener una lista de componentes compartidos y una estrategia para actualizaciones (versionado semántico o publicación interna).
- Si el admin necesita datos del cliente para pruebas, configurar entornos separados o utilizar datasets de prueba.

---

Cuando quieras, puedo:
- Generar `scripts/seed-products.ts` en este repo como base.
- Crear un template de `README.md` y `package.json` para el nuevo repo cliente.
- Preparar un workflow de GitHub Actions para CI del nuevo repo.
