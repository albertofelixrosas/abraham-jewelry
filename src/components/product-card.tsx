import Image from 'next/image';
import type { Product } from '@/types/product';
import Button from '@/components/button';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50 transition hover:-translate-y-1 hover:shadow-slate-300/40">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">{product.category}</span>
          <span className="text-sm font-semibold text-slate-900">SKU {product.sku}</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-950">{product.name}</h2>
          <p className="text-sm leading-6 text-slate-600">{product.description}</p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-semibold text-slate-950">${product.price.toFixed(2)}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Stock disponible: {product.stock}</p>
          </div>
          <Button type="button">Agregar al carrito</Button>
        </div>
      </div>
    </article>
  );
}
