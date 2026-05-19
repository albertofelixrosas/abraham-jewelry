import Link from 'next/link';

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-slate-950">
      <section className="mx-auto w-[min(1120px,calc(100%-2rem))] py-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-lg shadow-slate-200/50">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-semibold text-slate-950">Panel administrativo</h1>
              <p className="mt-2 max-w-2xl text-slate-600">
                Accede a las secciones del admin para gestionar catálogo, pedidos, egresos y reportes.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
              <p className="font-semibold text-slate-950">Estado actual</p>
              <p className="mt-2">Rutas admin creadas. Autenticación pendiente.</p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/admin/products" className="group rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white transition hover:border-slate-400 hover:bg-slate-800">
              <p className="text-sm uppercase tracking-[0.2em] text-amber-300">Productos</p>
              <p className="mt-4 text-xl font-semibold">Gestionar catálogo</p>
              <p className="mt-3 text-sm text-slate-300">Agregar, editar y eliminar productos.</p>
            </Link>
            <Link href="/admin/orders" className="group rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white transition hover:border-slate-400 hover:bg-slate-800">
              <p className="text-sm uppercase tracking-[0.2em] text-amber-300">Pedidos</p>
              <p className="mt-4 text-xl font-semibold">Ver pedidos</p>
              <p className="mt-3 text-sm text-slate-300">Revisar el estado y actualizar órdenes.</p>
            </Link>
            <Link href="/admin/egresos" className="group rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white transition hover:border-slate-400 hover:bg-slate-800">
              <p className="text-sm uppercase tracking-[0.2em] text-amber-300">Egresos</p>
              <p className="mt-4 text-xl font-semibold">Registrar gastos</p>
              <p className="mt-3 text-sm text-slate-300">Control de pagos y salidas de caja.</p>
            </Link>
            <Link href="/admin/reports" className="group rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white transition hover:border-slate-400 hover:bg-slate-800">
              <p className="text-sm uppercase tracking-[0.2em] text-amber-300">Reportes</p>
              <p className="mt-4 text-xl font-semibold">Análisis</p>
              <p className="mt-3 text-sm text-slate-300">Ventas, stock y desempeño del negocio.</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
