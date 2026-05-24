'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase-client';

type AdminAuthContextValue = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<Error | null>;
  signOut: () => Promise<void>;
};

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let subscription: { unsubscribe: () => void } | null = null;

    const initAuth = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.getSession();
      if (!error && data?.session?.user) {
        setUser(data.session.user);
        // debug: show authenticated user id/email in console
        // Remove or comment out in production if desired
        // eslint-disable-next-line no-console
        console.debug('AdminAuthProvider: authenticated user', { id: data.session.user.id, email: data.session.user.email });
      }
      setLoading(false);

      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
        // eslint-disable-next-line no-console
        console.debug('AdminAuthProvider: auth state changed', { user: session?.user ? { id: session.user.id, email: session.user.email } : null });
      });

      subscription = listener?.subscription ?? null;
    };

    initAuth();

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      return new Error('Supabase no está configurado.');
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error ?? null;
  };

  const signOut = async () => {
    if (!supabase) {
      return;
    }
    await supabase.auth.signOut();
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, loading, signIn, signOut }),
    [user, loading]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}
