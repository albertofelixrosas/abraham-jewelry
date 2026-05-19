import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex w-[min(1120px,calc(100%-2rem))] items-center justify-between py-4">
        <Link href="/" className="text-xl font-semibold tracking-tight text-slate-950">
          Jewelry POS
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-slate-700">
          <Link href="/products" className="transition hover:text-slate-950">
            Catálogo
          </Link>
          <Link href="/cart" className="transition hover:text-slate-950">
            Carrito
          </Link>
          <Link href="/checkout" className="transition hover:text-slate-950">
            Checkout
          </Link>
          <Link href="/admin" className="rounded-full border border-slate-300 bg-slate-950 px-4 py-2 text-white transition hover:bg-slate-800">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
