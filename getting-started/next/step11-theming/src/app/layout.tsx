import type { Metadata } from 'next';
import '@clr/city/css/index.css';
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
      <body>{children}</body>
    </html>
  );
}
