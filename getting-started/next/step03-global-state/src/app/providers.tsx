'use client';

import { App } from 'onekijs-next';

export default function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return <App>{children}</App>;
}