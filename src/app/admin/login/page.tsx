'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/button';
import { useAdminAuth } from '@/context/admin-auth-context';

export default function AdminLoginPage() {
  const router = useRouter();
  const { signIn, loading } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');

    const error = await signIn(email, password);
    if (error) {
      setMessage(error.message ?? 'No se pudo iniciar sesión. Revisa tus credenciales.');
      return;
    }

    router.push('/admin');
  };

  return (
    <main className="min-h-screen bg-gray-50 text-slate-950">
      <section className="mx-auto w-[min(640px,calc(100%-2rem))] py-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-lg shadow-slate-200/50">
          <h1 className="text-4xl font-semibold text-slate-950">Login admin</h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            Inicia sesión con email y contraseña de administrador. Usa Supabase Auth para controlar acceso.
          </p>

          <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-950 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-950 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              />
            </div>
            {message && <p className="text-sm text-red-600">{message}</p>}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Button type="submit" disabled={loading}>
                {loading ? 'Validando...' : 'Iniciar sesión'}
              </Button>
              <Link href="/admin" className="text-sm font-medium text-amber-600 transition hover:text-amber-700">
                Volver al panel admin
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
