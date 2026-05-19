import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jewelry Point of Sale',
  description: 'Catálogo de joyas, checkout guest y panel admin con Next.js y Supabase',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
