import type { Metadata } from 'next';
import { CartProvider } from '@/context/cart-context';
import SiteFooter from '@/components/site-footer';
import SiteHeader from '@/components/site-header';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jewelry Point of Sale',
  description: 'Catálogo de joyas, checkout guest y panel admin con Next.js y Supabase',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-50 text-slate-950">
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
