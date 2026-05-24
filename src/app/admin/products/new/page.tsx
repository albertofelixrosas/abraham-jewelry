"use client";

import { useState } from 'react';
import Link from 'next/link';
import AdminGuard from '@/components/admin-guard';
import Button from '@/components/button';
import { createProduct } from '@/lib/supabase-service';

type FormState = {
  name: string;
  description: string;
  price: string;
  category: string;
  sku: string;
  stock: string;
  image: string;
  alt: string;
};

export default function NewProductPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    description: '',
    price: '',
    category: '',
    sku: '',
    stock: '',
    image: '',
    alt: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function validate() {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = 'Nombre es requerido';
    if (!form.price || Number.isNaN(Number(form.price)) || Number(form.price) <= 0) next.price = 'Precio inválido';
    if (!form.stock || Number.isNaN(Number(form.stock)) || Number(form.stock) < 0) next.stock = 'Stock inválido';
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      category: form.category.trim() || 'General',
      sku: form.sku.trim() || null,
      stock: Number(form.stock),
      image: form.image.trim() || null,
      alt: form.alt.trim() || form.name.trim()
    };

    setSubmitting(true);
    try {
      const { productId, error } = await createProduct({
        name: payload.name,
        description: payload.description,
        price: payload.price,
        category: payload.category,
        sku: payload.sku,
        stock: payload.stock,
        image: payload.image,
        alt: payload.alt
      });

      if (error) {
        setMessage(`Error: ${error.message ?? String(error)}`);
      } else {
        setMessage('Producto creado correctamente.');
        setForm({ name: '', description: '', price: '', category: '', sku: '', stock: '', image: '', alt: '' });
      }
    } catch (err: any) {
      setMessage(`Error al crear: ${err?.message ?? String(err)}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AdminGuard>
      <main className="min-h-screen bg-gray-50 text-slate-950">
        <section className="mx-auto w-[min(1120px,calc(100%-2rem))] py-20">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-lg shadow-slate-200/50">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-semibold text-slate-950">Nuevo producto</h1>
                <p className="mt-2 text-slate-600">Formulario para añadir un nuevo artículo al catálogo.</p>
              </div>
              <div className="flex items-center gap-2">
                <Link href="/admin/products" className="text-sm text-slate-600 hover:underline">
                  Cancelar
                </Link>
              </div>
            </div>

            <form className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Nombre *</label>
                <input name="name" value={form.name} onChange={handleChange} className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3" />
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Categoría</label>
                <input name="category" value={form.category} onChange={handleChange} className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3" />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">Descripción</label>
                <textarea name="description" value={form.description} onChange={handleChange} className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3" rows={4} />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Precio *</label>
                <input name="price" value={form.price} onChange={handleChange} inputMode="decimal" className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3" />
                {errors.price && <p className="mt-1 text-xs text-red-600">{errors.price}</p>}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Stock *</label>
                <input name="stock" value={form.stock} onChange={handleChange} inputMode="numeric" className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3" />
                {errors.stock && <p className="mt-1 text-xs text-red-600">{errors.stock}</p>}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">SKU</label>
                <input name="sku" value={form.sku} onChange={handleChange} className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Imagen (URL)</label>
                <input name="image" value={form.image} onChange={handleChange} className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Alt (texto alternativo)</label>
                <input name="alt" value={form.alt} onChange={handleChange} className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3" />
              </div>

              <div className="sm:col-span-2">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Button type="submit" disabled={submitting}>{submitting ? 'Guardando...' : 'Crear producto'}</Button>
                    <Link href="/admin/products" className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-50">
                      Volver
                    </Link>
                  </div>
                  {message && <p className="text-sm text-slate-600">{message}</p>}
                </div>
              </div>
            </form>

            {form.image && (
              <div className="mt-6">
                <p className="mb-2 text-sm font-medium text-slate-700">Previsualización de imagen</p>
                <div className="w-48 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={form.image} alt={form.alt || form.name} className="h-48 w-full object-cover" />
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </AdminGuard>
  );
}
