"use client";

import { useState } from 'react';
import AdminGuard from '@/components/admin-guard';
import Button from '@/components/button';
import { createCategory } from '@/lib/supabase-service';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewCategoryPage() {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  function validate() {
    if (!name.trim()) return 'Nombre es requerido';
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) return setError(v);

    setSubmitting(true);
    try {
      const { categoryId, error: createErr } = await createCategory(name, slug || undefined);
      if (createErr) {
        setError(createErr.message ?? String(createErr));
      } else {
        // After creating a category, go to new product page so user can continue
        router.push('/admin/products/new');
      }
    } catch (err: any) {
      setError(err?.message ?? String(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AdminGuard>
      <main className="min-h-screen bg-gray-50 text-slate-950">
        <section className="mx-auto w-[min(800px,calc(100%-2rem))] py-20">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold">Nueva categoría</h1>
                <p className="mt-1 text-sm text-slate-600">Crea una categoría para organizar los productos.</p>
              </div>
              <div>
                <Link href="/admin/products" className="text-sm text-slate-600 hover:underline">Volver</Link>
              </div>
            </div>

            <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Nombre *</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Slug (opcional)</label>
                <input value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3" />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <div className="mt-2 flex items-center gap-4">
                <Button type="submit" disabled={submitting}>{submitting ? 'Creando...' : 'Crear categoría'}</Button>
                <Link href="/admin/products" className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-50">Cancelar</Link>
              </div>
            </form>
          </div>
        </section>
      </main>
    </AdminGuard>
  );
}
