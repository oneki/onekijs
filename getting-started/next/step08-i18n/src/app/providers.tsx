'use client';

import { App } from 'onekijs-next';
import ErrorBoundary from '../modules/core/components/ErrorBoundary';
import settings from '../settings';

export default function Providers({
  children,
  initialLocale,
}: Readonly<{
  children: React.ReactNode;
  initialLocale: string;
}>) {
  return (
    <App settings={settings} initialLocale={initialLocale} ErrorBoundaryComponent={ErrorBoundary}>
      {children}
    </App>
  );
}
