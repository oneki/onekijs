import type { Metadata } from 'next';
import { Suspense } from 'react';
import Navbar from '../modules/core/components/Navbar';
import Providers from './providers';
import '../style.css';

export const metadata: Metadata = {
  title: 'My Store',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body>
        <Suspense fallback={null}>
          <Providers>
            <Navbar />
            <main className="container">{children}</main>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
