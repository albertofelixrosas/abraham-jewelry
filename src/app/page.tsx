import Link from 'next/link';
import { FiShoppingCart, FiUser, FiPackage } from 'react-icons/fi';

const features = [
  {
    title: 'Catálogo público',
    description: 'Presenta productos, categorías y filtros para ver tu colección de joyería.',
    icon: FiPackage,
  },
  {
    title: 'Checkout guest',
    description: 'Compra sin registro, solo con nombre, teléfono y nota opcional.',
    icon: FiShoppingCart,
  },
  {
    title: 'Dashboard admin',
    description: 'Administra productos, pedidos y egresos desde un panel privado.',
    icon: FiUser,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 text-slate-950">
      <section className="border-b border-slate-200 bg-white py-24">
        <div className="mx-auto flex w-[min(1120px,calc(100%-2rem))] flex-col gap-10 text-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-600">Joyas | Punto de venta</p>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              Catálogo online y panel administrativo con estilo clásico.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600">
              Una tienda elegante para tu joyería con checkout guest, control de stock y panel de administración.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/products"
              className="inline-flex rounded-full bg-amber-500 px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
            >
              Ver catálogo
            </Link>
            <Link
              href="/admin"
              className="inline-flex rounded-full border border-slate-300 bg-slate-950 px-8 py-3 text-sm font-semibold text-white transition hover:border-slate-400"
            >
              Panel admin
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(1120px,calc(100%-2rem))] py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article key={feature.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/60">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-slate-950">
                  <Icon size={20} />
                </div>
                <h2 className="mt-6 text-xl font-semibold text-slate-950">{feature.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
