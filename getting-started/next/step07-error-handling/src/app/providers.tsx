'use client';

import { App } from 'onekijs-next';
import ErrorBoundary from '../modules/core/components/ErrorBoundary';
import NotificationCenter from '../modules/core/components/NotificationCenter';
import settings from '../settings';

export default function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <App settings={settings} ErrorBoundaryComponent={ErrorBoundary}>
      <NotificationCenter />
      {children}
    </App>
  );
}
