'use client';

import type { ReactNode } from 'react';
import { AdminAuthProvider } from '@/context/admin-auth-context';
import AdminGuard from '@/components/admin-guard';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLoginPath = pathname === '/admin/login' || pathname?.startsWith('/admin/login');

  return (
    <AdminAuthProvider>
      {isLoginPath ? <>{children}</> : <AdminGuard>{children}</AdminGuard>}
    </AdminAuthProvider>
  );
}
