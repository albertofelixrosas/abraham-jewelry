import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: ReactNode;
};

const styles = {
  primary: 'bg-amber-500 text-slate-950 hover:bg-amber-400',
  secondary: 'bg-slate-950 text-white hover:bg-slate-800',
  ghost: 'border border-slate-300 bg-white text-slate-950 hover:bg-slate-100'
};

export default function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-amber-300',
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
