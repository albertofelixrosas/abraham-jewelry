'use client';

import Link from 'next/link';
import Button from '@/components/button';
import { useCart } from '@/context/cart-context';
import { formatCurrency } from '@/lib/utils';

export default function CartPage() {
  const { items, totalAmount, updateQuantity, removeFromCart, clearCart } = useCart();

  return (
    <main className="min-h-screen bg-gray-50 text-slate-950">
      <section className="mx-auto w-[min(1120px,calc(100%-2rem))] py-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-lg shadow-slate-200/50">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-semibold text-slate-950">Carrito</h1>
              <p className="mt-2 text-slate-600">Revisa los productos antes de continuar al checkout.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="ghost" onClick={() => clearCart()}>
                Vaciar carrito
              </Button>
              <Link
                href="/products"
                className="inline-flex rounded-full border border-slate-300 bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Seguir comprando
              </Link>
            </div>
          </div>

          {items.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600">
              <p className="text-lg font-medium">Tu carrito está vacío.</p>
              <p className="mt-3">Agrega productos desde el catálogo para continuar.</p>
            </div>
          ) : (
            <div className="mt-10 space-y-6">
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 text-sm text-slate-700">
                <div className="grid gap-4 border-b border-slate-200 bg-white p-4 font-semibold text-slate-900 md:grid-cols-[2fr_1fr_1fr_1fr]">
                  <div>Producto</div>
                  <div className="text-center">Precio</div>
                  <div className="text-center">Cantidad</div>
                  <div className="text-right">Total</div>
                </div>
                {items.map((item) => (
                  <div key={item.id} className="grid gap-4 border-b border-slate-200 p-4 md:grid-cols-[2fr_1fr_1fr_1fr]">
                    <div>
                      <p className="font-semibold text-slate-950">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.category} · SKU {item.sku}</p>
                    </div>
                    <div className="text-center">{formatCurrency(item.price)}</div>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="rounded-full border border-slate-300 bg-white px-3 py-1 text-slate-700 transition hover:border-slate-400"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        className="rounded-full border border-slate-300 bg-white px-3 py-1 text-slate-700 transition hover:border-slate-400"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-950">{formatCurrency(item.price * item.quantity)}</p>
                      <button
                        className="mt-2 text-xs font-medium text-amber-600 transition hover:text-amber-700"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Total</p>
                    <p className="text-3xl font-semibold text-slate-950">{formatCurrency(totalAmount)}</p>
                  </div>
                  <Link href="/checkout">
                    <Button type="button">Continuar al checkout</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
