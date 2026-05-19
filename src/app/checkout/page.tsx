'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import Button from '@/components/button';
import { useCart } from '@/context/cart-context';
import { formatCurrency, generateOrderId } from '@/lib/utils';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalAmount, clearCart } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isValid = useMemo(() => name.trim().length > 0 && phone.trim().length > 0 && items.length > 0, [name, phone, items.length]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) return;

    const orderId = generateOrderId();
    const order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customerName: name.trim(),
      customerPhone: phone.trim(),
      customerEmail: email.trim() || null,
      note: note.trim(),
      items,
      total: totalAmount,
      status: 'pendiente'
    };

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('jewelry-pos-last-order', JSON.stringify(order));
    }
    clearCart();
    setSubmitted(true);
    router.push(`/order-confirmation/${orderId}`);
  };

  return (
    <main className="min-h-screen bg-gray-50 text-slate-950">
      <section className="mx-auto w-[min(1120px,calc(100%-2rem))] py-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-lg shadow-slate-200/50">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-4xl font-semibold text-slate-950">Checkout</h1>
              <p className="mt-2 max-w-2xl text-slate-600">
                Completa los datos para crear tu pedido guest. El email es opcional.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Total del pedido</p>
              <p className="mt-3 text-3xl font-semibold text-slate-950">{formatCurrency(totalAmount)}</p>
              <p className="mt-2 text-sm text-slate-600">{items.length} artículos seleccionados</p>
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Nombre completo</label>
                <input
                  className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-950 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Teléfono</label>
                <input
                  className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-950 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Correo electrónico (opcional)</label>
                <input
                  className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-950 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Nota del pedido</label>
                <textarea
                  className="min-h-[120px] w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-950 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                />
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button type="submit" disabled={!isValid}>
                  Confirmar pedido
                </Button>
                <Link href="/cart" className="text-sm font-medium text-amber-600 transition hover:text-amber-700">
                  Volver al carrito
                </Link>
              </div>
              {!items.length && <p className="text-sm text-red-600">Agrega productos al carrito antes de finalizar.</p>}
            </form>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-100">
              <h2 className="text-xl font-semibold text-slate-950">Resumen del pedido</h2>
              <div className="mt-6 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-4 text-sm text-slate-700">
                    <span>{item.name} x {item.quantity}</span>
                    <span>{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
