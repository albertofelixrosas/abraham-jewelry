import Link from 'next/link';

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-slate-950">
      <section className="mx-auto w-[min(1120px,calc(100%-2rem))] py-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-lg shadow-slate-200/50">
          <h1 className="text-4xl font-semibold text-slate-950">Checkout</h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            Formulario de checkout guest para capturar nombre, teléfono, nota y correo opcional.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="/cart" className="inline-flex rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400">
              Volver al carrito
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
