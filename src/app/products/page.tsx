import ProductCard from '@/components/product-card';
import { products } from '@/data/products';

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-slate-950">
      <section className="mx-auto w-[min(1120px,calc(100%-2rem))] py-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-lg shadow-slate-200/50">
          <h1 className="text-4xl font-semibold text-slate-950">Catálogo de productos</h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            Explora nuestra colección de joyería y agrega tus piezas favoritas al carrito.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
