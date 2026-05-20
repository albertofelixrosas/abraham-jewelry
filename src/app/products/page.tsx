"use client";

import { useEffect, useMemo, useState } from 'react';
import ProductCard from '@/components/product-card';
import { products as localProducts } from '@/data/products';
import { fetchProductsFromSupabase, hasSupabase } from '@/lib/supabase-service';
import type { Product } from '@/types/product';

export default function ProductsPage() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [products, setProducts] = useState<Product[]>(localProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = useMemo(
    () => ['Todos', ...Array.from(new Set(products.map((product) => product.category)))],
    [products]
  );

  useEffect(() => {
    if (!hasSupabase) return;

    setLoading(true);
    setError(null);

    fetchProductsFromSupabase()
      .then((data) => {
        if (data.length > 0) {
          setProducts(data);
        }
      })
      .catch((fetchError) => {
        console.error(fetchError);
        setError('No se pudieron cargar los productos desde Supabase. Usando datos locales.');
      })
      .finally(() => setLoading(false));
  }, [hasSupabase]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
      const normalizedQuery = query.trim().toLowerCase();
      const matchesQuery =
        normalizedQuery.length === 0 ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery) ||
        product.sku.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [query, selectedCategory]);

  return (
    <main className="min-h-screen bg-gray-50 text-slate-950">
      <section className="mx-auto w-[min(1120px,calc(100%-2rem))] py-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-lg shadow-slate-200/50">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-semibold text-slate-950">Catálogo de productos</h1>
              <p className="mt-2 max-w-2xl text-slate-600">
                Explora nuestra colección de joyería y agrega tus piezas favoritas al carrito.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
              <label className="relative block">
                <span className="sr-only">Buscar productos</span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar por nombre, descripción o SKU"
                  className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-950 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                />
              </label>
              <div className="flex items-center gap-3 overflow-x-auto rounded-3xl border border-slate-200 bg-slate-50 p-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      selectedCategory === category
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-white text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <p>{hasSupabase ? 'Catálogo conectado a Supabase.' : 'Modo local activado: datos de ejemplo.'}</p>
            {loading && <p className="text-slate-500">Cargando productos desde Supabase...</p>}
            {error && <p className="text-red-600">{error}</p>}
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-lg shadow-slate-200/50">
          <p className="text-sm text-slate-600">
            {filteredProducts.length} producto{filteredProducts.length === 1 ? '' : 's'} encontrado{filteredProducts.length === 1 ? '' : 's'}.
          </p>
          <p className="text-sm text-slate-500">Categoría: {selectedCategory}</p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600">
            <p className="text-lg font-medium">No se encontraron productos con esos filtros.</p>
            <p className="mt-2">Prueba otra categoría o ajusta la búsqueda.</p>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
