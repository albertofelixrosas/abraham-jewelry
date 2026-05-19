import type { ReactNode } from 'react';

export default function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-[min(1120px,calc(100%-2rem))]">{children}</div>;
}
