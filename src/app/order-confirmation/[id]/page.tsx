'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { formatCurrency } from '@/lib/utils';

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  note: string;
  items: OrderItem[];
  total: number;
  status: string;
};

export default function OrderConfirmationPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('jewelry-pos-last-order');
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as Order;
      if (parsed.id === id) {
        setOrder(parsed);
      }
    } catch {
      setOrder(null);
    }
  }, [id]);

  return (
    <main className="min-h-screen bg-gray-50 text-slate-950">
      <section className="mx-auto w-[min(1120px,calc(100%-2rem))] py-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-lg shadow-slate-200/50">
          {!order ? (
            <div className="space-y-6">
              <h1 className="text-4xl font-semibold text-slate-950">Orden no encontrada</h1>
              <p className="text-slate-600">
                No se encontró la orden solicitada. Si acabas de completar un checkout, vuelve a intentarlo desde el carrito.
              </p>
              <Link href="/" className="inline-flex rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400">
                Volver al inicio
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.2em] text-amber-600">Orden confirmada</p>
                <h1 className="text-4xl font-semibold text-slate-950">Gracias por tu compra, {order.customerName}.</h1>
                <p className="text-slate-600">
                  Tu pedido {order.id} ha sido registrado en estado <span className="font-semibold text-slate-900">{order.status}</span>.
                </p>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Datos del cliente</p>
                  <div className="mt-4 space-y-3 text-slate-700">
                    <p><span className="font-semibold text-slate-900">Nombre:</span> {order.customerName}</p>
                    <p><span className="font-semibold text-slate-900">Teléfono:</span> {order.customerPhone}</p>
                    {order.customerEmail && <p><span className="font-semibold text-slate-900">Email:</span> {order.customerEmail}</p>}
                    <p><span className="font-semibold text-slate-900">Nota:</span> {order.note || 'Sin nota'}</p>
                  </div>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Resumen</p>
                  <div className="mt-4 space-y-3 text-slate-700">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between gap-4">
                        <span>{item.name} x {item.quantity}</span>
                        <span>{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 border-t border-slate-200 pt-4 text-right text-xl font-semibold text-slate-950">
                    Total: {formatCurrency(order.total)}
                  </div>
                </div>
              </div>
              <Link href="/" className="inline-flex rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400">
                Volver al inicio
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
