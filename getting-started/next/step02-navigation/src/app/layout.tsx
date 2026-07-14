import type { Metadata } from 'next';
import Navbar from '../modules/core/components/Navbar';
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
        <Navbar />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}