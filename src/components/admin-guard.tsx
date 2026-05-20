'use client';

import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/context/admin-auth-context';

export default function AdminGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, loading } = useAdminAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 text-slate-950">
        <div className="mx-auto flex min-h-screen items-center justify-center p-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-lg shadow-slate-200/50 text-center">
            <p className="text-lg font-semibold text-slate-950">Verificando acceso administrativo...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
