import Link from 'next/link';

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-slate-950">
      <section className="mx-auto w-[min(1120px,calc(100%-2rem))] py-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-lg shadow-slate-200/50">
          <h1 className="text-4xl font-semibold text-slate-950">Panel administrativo</h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            Vista inicial del dashboard para administrar productos, pedidos y egresos. Aquí se integrará la autenticación de Super Admin y las secciones internas.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Link href="#" className="rounded-2xl border border-slate-200 bg-slate-950 px-6 py-5 text-left transition hover:border-slate-400">
              <p className="text-sm text-slate-300">Productos</p>
              <p className="mt-3 text-xl font-semibold text-white">Gestionar catálogo</p>
            </Link>
            <Link href="#" className="rounded-2xl border border-slate-200 bg-slate-950 px-6 py-5 text-left transition hover:border-slate-400">
              <p className="text-sm text-slate-300">Pedidos</p>
              <p className="mt-3 text-xl font-semibold text-white">Ver y actualizar</p>
            </Link>
            <Link href="#" className="rounded-2xl border border-slate-200 bg-slate-950 px-6 py-5 text-left transition hover:border-slate-400">
              <p className="text-sm text-slate-300">Egresos</p>
              <p className="mt-3 text-xl font-semibold text-white">Registrar gastos</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
