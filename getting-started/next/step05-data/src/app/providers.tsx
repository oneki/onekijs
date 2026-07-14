'use client';

import { App } from 'onekijs-next';
import settings from '../settings';

export default function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return <App settings={settings}>{children}</App>;
}
