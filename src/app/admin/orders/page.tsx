import Link from 'next/link';

export default function AdminOrdersPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-slate-950">
      <section className="mx-auto w-[min(1120px,calc(100%-2rem))] py-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-lg shadow-slate-200/50">
          <h1 className="text-4xl font-semibold text-slate-950">Gestión de pedidos</h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            Aquí se mostrará la lista de pedidos, estados y acciones de actualización para el restaurante.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/admin" className="rounded-full border border-slate-300 bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              Volver al panel admin
            </Link>
            <button type="button" className="rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400">
              Ver pedidos pendientes (pendiente)
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
