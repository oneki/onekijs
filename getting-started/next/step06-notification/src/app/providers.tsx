'use client';

import { App } from 'onekijs-next';
import NotificationCenter from '../modules/core/components/NotificationCenter';
import settings from '../settings';

export default function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <App settings={settings}>
      <NotificationCenter />
      {children}
    </App>
  );
}
