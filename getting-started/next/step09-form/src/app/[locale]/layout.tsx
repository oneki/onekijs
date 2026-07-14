import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Navbar from '../../modules/core/components/Navbar';
import NotificationCenter from '../../modules/core/components/NotificationCenter';
import Providers from '../providers';

const locales = ['en', 'fr'] as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  return (
    <Suspense fallback={null}>
      <Providers initialLocale={locale}>
        <NotificationCenter />
        <Navbar />
        <main className="container">{children}</main>
      </Providers>
    </Suspense>
  );
}
