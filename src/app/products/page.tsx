import Link from 'next/link';

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-slate-950">
      <section className="mx-auto w-[min(1120px,calc(100%-2rem))] py-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-lg shadow-slate-200/50">
          <h1 className="text-4xl font-semibold text-slate-950">Catálogo de productos</h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            Aquí irá la vista de catálogo público con los productos disponibles, filtros de categoría y botones para agregar al carrito.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="/" className="inline-flex rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400">
              Volver al inicio
            </Link>
            <Link href="/cart" className="inline-flex rounded-full border border-slate-300 bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:border-slate-400">
              Ver carrito
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
